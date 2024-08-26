const { PrismaClient, Prisma } = require("@prisma/client");
const products = require("./products.json");

const prisma = new PrismaClient();

async function main() {
  const cresteProducts = await prisma.product.createMany({
    data: [...products],
    skipDuplicates: true,
  });
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

//node seed.js
