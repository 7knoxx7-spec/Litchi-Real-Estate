import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const REAL_PROPERTIES = [
  {
    title: "بنت هاوس فاخر بإطلالة بانورامية على مرسى دبي",
    titleEn: "Luxury Penthouse with Panoramic Dubai Marina View",
    description: "اكتشف الفخامة الحقيقية في هذا البنت هاوس المصمم بذوق رفيع في برج كيان الشهير.",
    descriptionEn: "Discover true luxury in this exquisitely designed penthouse in the famous Cayan Tower.",
    price: 450000,
    priceType: "yearly",
    type: "penthouse",
    bedrooms: 4,
    bathrooms: 5,
    area: 3500,
    location: JSON.stringify({
      emirate: "Dubai",
      area: "Dubai Marina",
      address: "Cayan Tower, Dubai Marina",
      latitude: 25.0865,
      longitude: 55.1450
    }),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ]),
    isFeatured: true,
    features: JSON.stringify(["Gym", "Pool", "Parking", "Security", "View"]),
    agentEmail: "ahmed@roomuae.com"
  },
  {
    title: "شقة عصرية مع إطلالة على برج خليفة",
    titleEn: "Modern Apartment with Burj Khalifa View",
    description: "شقة مصممة بأسلوب عصري راقي في قلب الخليج التجاري، قريبة من دبي مول.",
    descriptionEn: "Sophisticatedly designed modern apartment in Business Bay, close to Dubai Mall.",
    price: 180000,
    priceType: "yearly",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 3,
    area: 1400,
    location: JSON.stringify({
      emirate: "Dubai",
      area: "Business Bay",
      address: "Damac Maison, Business Bay",
      latitude: 25.1870,
      longitude: 55.2630
    }),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e1a3ecb4d0bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ]),
    isFeatured: true,
    features: JSON.stringify(["Gym", "Parking", "Near Metro"]),
    agentEmail: "sara@roomuae.com"
  },
  {
    title: "فيلا عائلية في المرابع العربية",
    titleEn: "Family Villa in Arabian Ranches",
    description: "فيلا واسعة مع حديقة خاصة كبيرة، مثالية للعائلات.",
    descriptionEn: "Spacious villa with large private garden, perfect for families.",
    price: 320000,
    priceType: "yearly",
    type: "villa",
    bedrooms: 5,
    bathrooms: 6,
    area: 4200,
    location: JSON.stringify({
      emirate: "Dubai",
      area: "Arabian Ranches",
      address: "Al Reem 1, Arabian Ranches",
      latitude: 25.0560,
      longitude: 55.2480
    }),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ]),
    isFeatured: false,
    features: JSON.stringify(["Garden", "Maid Room", "Study"]),
    agentEmail: "mohammed@roomuae.com"
  },
  {
    title: "ستوديو أنيق في أبراج بحيرات الجميرا",
    titleEn: "Stylish Studio in JLT",
    description: "ستوديو مفروش بالكامل قريب من المترو.",
    descriptionEn: "Fully furnished studio close to metro station.",
    price: 65000,
    priceType: "yearly",
    type: "studio",
    bedrooms: 0,
    bathrooms: 1,
    area: 500,
    location: JSON.stringify({
      emirate: "Dubai",
      area: "JLT",
      address: "Cluster O, JLT",
      latitude: 25.0730,
      longitude: 55.1470
    }),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ]),
    isFeatured: false,
    features: JSON.stringify(["Furnished", "Metro Access"]),
    agentEmail: "ahmed@roomuae.com"
  },
  {
    title: "شقة غرفتين في جزيرة النخلة",
    titleEn: "2BR Apartment on Palm Jumeirah",
    description: "إطلالة بحرية خلابة مع دخول خاص للشاطئ.",
    descriptionEn: "Stunning sea view with private beach access.",
    price: 250000,
    priceType: "yearly",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 3,
    area: 1600,
    location: JSON.stringify({
      emirate: "Dubai",
      area: "Palm Jumeirah",
      address: "Shoreline Apartments, Palm Jumeirah",
      latitude: 25.1150,
      longitude: 55.1390
    }),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ]),
    isFeatured: true,
    features: JSON.stringify(["Beach Access", "Pool", "Gym"]),
    agentEmail: "sara@roomuae.com"
  },
    {
    title: "تاون هاوس في دبي هيلز",
    titleEn: "Townhouse in Dubai Hills",
    description: "مجمع سكني هادئ مع مساحات خضراء واسعة.",
    descriptionEn: "Quiet community with vast green spaces.",
    price: 210000,
    priceType: "yearly",
    type: "townhouse",
    bedrooms: 3,
    bathrooms: 4,
    area: 2800,
    location: JSON.stringify({
      emirate: "Dubai",
      area: "Dubai Hills",
      address: "Maple 2, Dubai Hills Estate",
      latitude: 25.1100,
      longitude: 55.2600
    }),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ]),
    isFeatured: true,
    features: JSON.stringify(["Park", "Pool", "Security"]),
    agentEmail: "mohammed@roomuae.com"
  }
];

async function main() {
  console.log('Start seeding ...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@roomuae.com' },
    update: {},
    create: {
      email: 'admin@roomuae.com',
      name: 'Admin User',
      password: passwordHash,
      role: 'ADMIN',
    },
  });

  // Agents
  const agents = [
    { email: "ahmed@roomuae.com", name: "أحمد النعيمي" },
    { email: "sara@roomuae.com", name: "سارة المنصوري" },
    { email: "mohammed@roomuae.com", name: "محمد الزهراني" }
  ];

  for (const a of agents) {
    await prisma.user.upsert({
      where: { email: a.email },
      update: {},
      create: {
        email: a.email,
        name: a.name,
        password: passwordHash,
        role: 'AGENT',
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    });
  }

  // Properties
  for (const prop of REAL_PROPERTIES) {
    const agent = await prisma.user.findUnique({ where: { email: prop.agentEmail } });
    if (!agent) continue;

    const property = await prisma.property.create({
      data: {
        title: prop.title,
        titleEn: prop.titleEn,
        description: prop.description,
        descriptionEn: prop.descriptionEn,
        price: prop.price,
        priceType: prop.priceType,
        type: prop.type,
        bedrooms: prop.bedrooms,
        bathrooms: prop.bathrooms,
        area: prop.area,
        location: prop.location,
        images: prop.images,
        features: prop.features,
        isFeatured: prop.isFeatured,
        agentId: agent.id,
      },
    });
    console.log(`Created property: ${prop.titleEn}`);

    // Create a Review
    await prisma.review.create({
      data: {
        rating: 5,
        comment: "Excellent property!",
        userId: admin.id,
        propertyId: property.id
      }
    });

    // Create a Payment Record (Simulated)
    await prisma.payment.create({
      data: {
        amount: 50.0,
        currency: "AED",
        status: "completed",
        method: "stripe",
        userId: agent.id,
        propertyId: property.id,
        reference: "txn_" + Math.random().toString(36).substring(7)
      }
    });
  }

  // Create Notifications for Admin
  await prisma.notification.create({
    data: {
      userId: admin.id,
      title: "New Property Listed",
      message: "Ahmed listed a new Penthouse in Dubai Marina.",
      type: "info"
    }
  });

  // Analytics
  await prisma.analytics.create({
    data: {
      event: "search",
      details: JSON.stringify({ query: "Dubai Marina" }),
      userId: admin.id
    }
  });

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });