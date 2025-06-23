import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Create or get admin user
  const user = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'adminseeder@gmail.com',
      password: 'admin123', 
      name: 'Admin Seeder',
    },
  });

  // Seeder produk
  for (let i = 1; i <= 100; i++) {
    const categoryName = faker.commerce.department(); 
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(), 
        sku: faker.string.alphanumeric(8).toUpperCase(),
        description: faker.commerce.productDescription(),
        weight: faker.number.int({ min: 100, max: 1000 }),
        width: faker.number.int({ min: 5, max: 50 }), 
        length: faker.number.int({ min: 5, max: 50 }),
        height: faker.number.int({ min: 5, max: 50 }),
        price: faker.number.int({ min: 5000, max: 200000 }),
        image: faker.image.urlPicsumPhotos(),
        categoryName,
        CategoryId: faker.number.int({ min: 1, max: 10 }),
        userId: user.id,
      },
    });
  }

  console.log('✅ Seeder produk selesai!');
}

main()
  .catch((e) => {
    console.error('❌ Seeder error:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
