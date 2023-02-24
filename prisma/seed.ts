import { PrismaClient } from '@prisma/client';
// prisma/seed.ts

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 5; i++) {
    await prisma.user.create({
      data: {
        login: `test ${i * 10}`,
        password: '11',
      },
    });
  }
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
