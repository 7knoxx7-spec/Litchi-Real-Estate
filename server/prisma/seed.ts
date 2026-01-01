import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const MOCK_PROPERTIES = [
  {
    title: "بنت هاوس فاخر بإطلالة بانورامية على مرسى دبي",
    titleEn: "Luxury Penthouse with Panoramic Dubai Marina View",
    description: "اكتشف الفخامة الحقيقية في هذا البنت هاوس المصمم بذوق رفيع...",
    descriptionEn: "Discover true luxury in this exquisitely designed penthouse...",
    price: 450000,
    priceType: "yearly",
    type: "penthouse",
    bedrooms: 4,
    bathrooms: 5,
    area: 3500,
    location: JSON.stringify({
      emirate: "Dubai",
      area: "Dubai Marina",
      building: "Cayan Tower",
      address: "Cayan Tower, Dubai Marina, Dubai, UAE",
    }),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ]),
    isFeatured: true,
    agentName: "أحمد النعيمي",
    agentEmail: "ahmed@roomuae.com"
  },
  {
    title: "شقة عصرية مع إطلالة على برج خليفة - الخليج التجاري",
    titleEn: "Modern Apartment with Burj Khalifa View - Business Bay",
    description: "شقة مصممة بأسلوب عصري راقي في قلب الخليج التجاري...",
    descriptionEn: "Sophisticatedly designed modern apartment...",
    price: 180000,
    priceType: "yearly",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 3,
    area: 1400,
    location: JSON.stringify({
      emirate: "Dubai",
      area: "Business Bay",
      building: "Damac Maison Canal Views",
      address: "Damac Maison Canal Views, Business Bay, Dubai, UAE",
    }),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e1a3ecb4d0bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574691250077-03a929faece5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ]),
    isFeatured: true,
    agentName: "سارة المنصوري",
    agentEmail: "sara@roomuae.com"
  },
   {
    title: "فيلا أنيقة في الرانشيز العربية مع حديقة خاصة",
    titleEn: "Elegant Villa in Arabian Ranches with Private Garden",
    description: "فيلا فسيحة ومريحة تجمع بين الفخامة والدفء العائلي...",
    descriptionEn: "Spacious and comfortable villa combining luxury...",
    price: 320000,
    priceType: "yearly",
    type: "villa",
    bedrooms: 5,
    bathrooms: 6,
    area: 4200,
    location: JSON.stringify({
      emirate: "Dubai",
      area: "Arabian Ranches",
      building: "Mirador",
      address: "Mirador, Arabian Ranches, Dubai, UAE",
    }),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ]),
    isFeatured: false,
    agentName: "محمد الزهراني",
    agentEmail: "mohammed@roomuae.com"
  }
];

async function main() {
  console.log('Start seeding ...');

  // Create Admin User
  const adminHash = "$2a$10$X7.X/X7.X/X7.X/X7.X/X7.X/X7.X/X7.X/X7.X/X7.X/X7.X"; // Mock hash
  const admin = await prisma.user.upsert({
    where: { email: 'admin@roomuae.com' },
    update: {},
    create: {
      email: 'admin@roomuae.com',
      name: 'Admin User',
      password: adminHash,
      role: 'ADMIN',
    },
  });
  console.log('Created admin:', admin.email);

  for (const prop of MOCK_PROPERTIES) {
    const agent = await prisma.user.upsert({
      where: { email: prop.agentEmail },
      update: {},
      create: {
        email: prop.agentEmail,
        name: prop.agentName,
        password: adminHash, // Default password for agents
        role: 'AGENT',
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    });

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
        isFeatured: prop.isFeatured,
        agentId: agent.id,
      },
    });
    console.log(`Created property with id: ${property.id}`);
  }
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
