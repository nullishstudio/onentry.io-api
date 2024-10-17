import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        wallet_address: 'wallet_1',
        fullname: 'Alvin Okoro',
        username: 'Veri5ied',
        bio: 'Lorem ipsum dolor sit amet consectetur. Nunc nibh commodo suscipit volutpat a cursus vulputate. Urna gravida at eu sed. Imperdiet sed venenatis pellentesque mauris penatibus diam turpis quis. Quis leo sapien sed sit nam morbi sit.',
        avatarUrl: 'https://example.com/avatar1.jpg',
      },
      {
        wallet_address: 'wallet_2',
        fullname: 'John Doe',
        username: 'john_doe',
        bio: "This is John's bio",
        avatarUrl: 'https://example.com/avatar2.jpg',
      },
      {
        wallet_address: 'wallet_3',
        fullname: 'Jane Smith',
        username: 'jane_smith',
        bio: "This is Jane's bio",
        avatarUrl: 'https://example.com/avatar3.jpg',
      },
    ],
  });

  await prisma.avatar.createMany({
    data: [
      {
        avatarUrl: 'https://example.com/avatar1.jpg',
        userId: (
          await prisma.user.findFirst({
            where: { wallet_address: 'wallet_1' },
          })
        ).id,
      },
      {
        avatarUrl: 'https://example.com/avatar2.jpg',
        userId: (
          await prisma.user.findFirst({
            where: { wallet_address: 'wallet_2' },
          })
        ).id,
      },
      {
        avatarUrl: 'https://example.com/avatar3.jpg',
        userId: (
          await prisma.user.findFirst({
            where: { wallet_address: 'wallet_3' },
          })
        ).id,
      },
    ],
  });

  await prisma.social.createMany({
    data: [
      {
        name: 'Twitter',
        username: 'veri5ied_twitter',
        url: 'https://twitter.com/veri5ied',
        userId: (
          await prisma.user.findFirst({
            where: { wallet_address: 'wallet_1' },
          })
        ).id,
      },
      {
        name: 'LinkedIn',
        username: 'johndoe_linkedin',
        url: 'https://linkedin.com/in/johndoe',
        userId: (
          await prisma.user.findFirst({
            where: { wallet_address: 'wallet_2' },
          })
        ).id,
      },
    ],
  });

  await prisma.extraLinks.createMany({
    data: [
      {
        url: 'https://portfolio.com/veri5ied',
        title: 'Veri5ied Portfolio',
        description: 'Personal portfolio of Veri5ied.',
        userId: (
          await prisma.user.findFirst({
            where: { wallet_address: 'wallet_1' },
          })
        ).id,
      },
      {
        url: 'https://portfolio.com/johndoe',
        title: 'John Doe Portfolio',
        description: 'Personal portfolio of John Doe.',
        userId: (
          await prisma.user.findFirst({
            where: { wallet_address: 'wallet_2' },
          })
        ).id,
      },
    ],
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
