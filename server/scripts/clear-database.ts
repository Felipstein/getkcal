import { prisma } from '../src/database/prisma';

async function main() {
  console.info('cleaning database...');

  await prisma.meal.deleteMany();
  await prisma.consumption.deleteMany();
  await prisma.mealFood.deleteMany();
  await prisma.food.deleteMany();
  await prisma.bottle.deleteMany();
  await prisma.user.deleteMany();

  console.info('successfully database cleaned');
}

main();
