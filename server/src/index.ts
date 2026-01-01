import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
// Chat / Conversations
app.get("/api/conversations", authenticateToken, async (req: any, res) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: { participants: { some: { id: req.user.id } } },
      include: {
        participants: {
          select: { id: true, name: true, avatar: true },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { updatedAt: "desc" },
    });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/conversations", authenticateToken, async (req: any, res) => {
  try {
    let { participantId } = req.body;

    if (participantId === "support") {
      const agent = await prisma.user.findFirst({
        where: { role: { in: ["ADMIN", "AGENT"] } },
      });
      if (!agent)
        return res.status(404).json({ message: "No support agents available" });
      participantId = agent.id;
    }

    const existing = await prisma.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { id: req.user.id } } },
          { participants: { some: { id: participantId } } },
        ],
      },
    });

    if (existing) return res.json(existing);

    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          connect: [{ id: req.user.id }, { id: participantId }],
        },
      },
    });
    res.json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get(
  "/api/conversations/:id/messages",
  authenticateToken,
  async (req: any, res) => {
    try {
      const messages = await prisma.message.findMany({
        where: { conversationId: req.params.id },
        orderBy: { createdAt: "asc" },
        include: { sender: { select: { id: true, name: true, avatar: true } } },
      });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

app.post(
  "/api/conversations/:id/messages",
  authenticateToken,
  async (req: any, res) => {
    try {
      const { content } = req.body;
      const message = await prisma.message.create({
        data: {
          content,
          senderId: req.user.id,
          conversationId: req.params.id,
        },
        include: { sender: { select: { id: true, name: true, avatar: true } } },
      });

      await prisma.conversation.update({
        where: { id: req.params.id },
        data: { updatedAt: new Date() },
      });

      res.json(message);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed (jpeg, jpg, png, webp)"));
    }
  },
});

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Zod Schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

const validate = (schema: any) => (req: any, res: any, next: any) => {
  try {
    schema.parse(req.body);
    next();
  } catch (e: any) {
    res.status(400).json(e.errors);
  }
};

// Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Routes

// Auth
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/register", validate(registerSchema), async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/auth/me", authenticateToken, async (req: any, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Upload Endpoint
app.post("/api/upload", authenticateToken, (req, res) => {
  upload.single("image")(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    } else if (err) {
      return res
        .status(400)
        .json({ message: "Invalid file", error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  });
});

// Properties
app.get("/api/properties/trending", async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      take: 5,
      orderBy: { views: "desc" }, // Real trending logic based on views
      include: { agent: { select: { id: true, name: true, avatar: true } } },
    });
    const formatted = properties.map((p) => ({
      ...p,
      location: JSON.parse(p.location),
      images: JSON.parse(p.images),
      features: p.features ? JSON.parse(p.features) : [],
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/properties/recommendations", async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { agent: { select: { id: true, name: true, avatar: true } } },
    });
    const formatted = properties.map((p) => ({
      ...p,
      location: JSON.parse(p.location),
      images: JSON.parse(p.images),
      features: p.features ? JSON.parse(p.features) : [],
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/properties", async (req, res) => {
  try {
    const { minPrice, maxPrice, type, bedrooms } = req.query;

    const where: any = {};
    if (minPrice)
      where.price = { ...where.price, gte: parseFloat(minPrice as string) };
    if (maxPrice)
      where.price = { ...where.price, lte: parseFloat(maxPrice as string) };
    if (type) where.type = type;
    if (bedrooms) where.bedrooms = parseInt(bedrooms as string);

    const properties = await prisma.property.findMany({
      where,
      include: {
        agent: { select: { id: true, name: true, avatar: true, email: true } },
      },
    });
    // Parse JSON fields
    const formattedProps = properties.map((p) => ({
      ...p,
      location: JSON.parse(p.location),
      images: JSON.parse(p.images),
      features: p.features ? JSON.parse(p.features) : [],
    }));
    res.json(formattedProps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Notifications
app.get("/api/notifications", authenticateToken, async (req: any, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Analytics
app.post("/api/analytics", async (req, res) => {
  try {
    const { event, details, userId, propertyId } = req.body;
    await prisma.analytics.create({
      data: {
        event,
        details: JSON.stringify(details),
        userId: userId || null,
        propertyId: propertyId || null,
      },
    });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Payments
app.post("/api/payments", authenticateToken, async (req: any, res) => {
  try {
    const { amount, propertyId } = req.body;
    const payment = await prisma.payment.create({
      data: {
        userId: req.user.id,
        amount,
        propertyId,
        status: "completed",
        method: "stripe",
        reference: "txn_" + Date.now(),
      },
    });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/properties/:id", async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
      include: {
        agent: { select: { id: true, name: true, avatar: true, email: true } },
      },
    });
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    res.json({
      ...property,
      location: JSON.parse(property.location),
      images: JSON.parse(property.images),
      features: property.features ? JSON.parse(property.features) : [],
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Start Server
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
