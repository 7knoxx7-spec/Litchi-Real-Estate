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
const multer = require("multer");
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, uploadDir);
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req: any, file: any, cb: any) => {
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
app.post("/api/auth/login", async (req: any, res: any) => {
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

app.post(
  "/api/auth/register",
  validate(registerSchema),
  async (req: any, res: any) => {
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
  },
);

app.get("/api/auth/me", authenticateToken, async (req: any, res: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        favorites: { include: { property: true } },
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Parse property details in favorites
    const favorites = user.favorites.map((fav) => ({
      ...fav.property,
      location: JSON.parse(fav.property.location),
      images: JSON.parse(fav.property.images),
      features: fav.property.features ? JSON.parse(fav.property.features) : [],
    }));

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      favorites: favorites,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/auth/profile", authenticateToken, async (req: any, res: any) => {
  try {
    const { name, email, avatar } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, email, avatar },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/auth/password", authenticateToken, async (req: any, res: any) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid current password" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword },
    });
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Upload Endpoint
app.post("/api/upload", authenticateToken, (req: any, res: any) => {
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
app.get("/api/properties/trending", async (req: any, res: any) => {
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

app.get("/api/properties/recommendations", async (req: any, res: any) => {
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

app.get("/api/properties", async (req: any, res: any) => {
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

// Favorites
app.get("/api/favorites", authenticateToken, async (req: any, res: any) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      include: {
        property: {
          include: {
            agent: {
              select: { id: true, name: true, avatar: true, email: true },
            },
          },
        },
      },
      orderBy: { assignedAt: "desc" },
    });
    const formatted = favorites.map((f) => ({
      ...f.property,
      location: JSON.parse(f.property.location),
      images: JSON.parse(f.property.images),
      features: f.property.features ? JSON.parse(f.property.features) : [],
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/favorites", authenticateToken, async (req: any, res: any) => {
  try {
    const { propertyId } = req.body;
    await prisma.favorite.upsert({
      where: { userId_propertyId: { userId: req.user.id, propertyId } },
      update: {},
      create: { userId: req.user.id, propertyId },
    });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete(
  "/api/favorites/:propertyId",
  authenticateToken,
  async (req: any, res: any) => {
    try {
      await prisma.favorite.delete({
        where: {
          userId_propertyId: {
            userId: req.user.id,
            propertyId: req.params.propertyId,
          },
        },
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);
// Notifications
app.get("/api/notifications", authenticateToken, async (req: any, res: any) => {
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
app.post("/api/analytics", async (req: Request, res: Response) => {
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

app.get(
  "/api/analytics/reports",
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const totalViews = await prisma.analytics.count({
        where: { event: "view" },
      });
      const totalSearches = await prisma.analytics.count({
        where: { event: "search" },
      });

      const topProperties = await prisma.analytics.groupBy({
        by: ["propertyId"],
        where: { event: "view", propertyId: { not: null } },
        _count: { event: true },
        orderBy: { _count: { event: "desc" } },
        take: 5,
      });

      res.json({ totalViews, totalSearches, topProperties });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

app.get(
  "/api/analytics/export",
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const analytics = await prisma.analytics.findMany({
        orderBy: { createdAt: "desc" },
        take: 1000,
      });

      const csvRows = [
        ["ID", "Event", "Details", "User ID", "Property ID", "Date"].join(","),
      ];

      analytics.forEach((row) => {
        csvRows.push(
          [
            row.id,
            row.event,
            `"${row.details?.replace(/"/g, '""') || ""}"`,
            row.userId || "",
            row.propertyId || "",
            row.createdAt.toISOString(),
          ].join(","),
        );
      });

      res.header("Content-Type", "text/csv");
      res.attachment("analytics_report.csv");
      res.send(csvRows.join("\n"));
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

// Payments
app.post("/api/payments", authenticateToken, async (req: any, res: any) => {
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

// Reviews
app.get("/api/properties/:id/reviews", async (req: any, res: any) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { propertyId: req.params.id },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post(
  "/api/properties/:id/reviews",
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const { rating, comment } = req.body;
      const review = await prisma.review.create({
        data: {
          rating,
          comment,
          userId: req.user.id,
          propertyId: req.params.id,
        },
        include: {
          user: { select: { id: true, name: true, avatar: true } },
        },
      });
      res.json(review);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

app.get("/api/properties/:id", async (req: any, res: any) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
      include: {
        agent: { select: { id: true, name: true, avatar: true, email: true } },
      },
    });
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // Increment views and record analytics
    await prisma.property.update({
      where: { id: req.params.id },
      data: { views: { increment: 1 } },
    });
    await prisma.analytics.create({
      data: { event: "view", propertyId: req.params.id },
    });

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

// Social Sharing (OG Tags)
app.get("/api/share/:id", async (req: any, res: any) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
    });

    if (!property) return res.status(404).send("Property not found");

    const images = JSON.parse(property.images);
    const location = JSON.parse(property.location);
    const title = property.title;
    const description = `Check out this amazing property in ${location.city} for ${property.price} AED!`;
    const image = images[0] || "https://room-pro-adam.com/placeholder.jpg";
    // In production, this would be the actual domain
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:8080";
    const url = `${frontendUrl}/properties/${property.id}`;

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:url" content="${url}" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />
        <meta name="twitter:image" content="${image}" />
        <script>
          window.location.href = "${url}";
        </script>
      </head>
      <body>
        <h1>Redirecting...</h1>
        <p>If you are not redirected automatically, <a href="${url}">click here</a>.</p>
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Chat / Conversations
app.get("/api/conversations", authenticateToken, async (req: any, res: any) => {
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

app.post(
  "/api/conversations",
  authenticateToken,
  async (req: any, res: any) => {
    try {
      let { participantId } = req.body;

      if (participantId === "support") {
        const agent = await prisma.user.findFirst({
          where: { role: { in: ["ADMIN", "AGENT"] } },
        });
        if (!agent)
          return res
            .status(404)
            .json({ message: "No support agents available" });
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
  },
);

app.get(
  "/api/conversations/:id/messages",
  authenticateToken,
  async (req: any, res: any) => {
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
  async (req: any, res: any) => {
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

// Start Server
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
