import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('DemoPass123!', 12);

  const user = await prisma.user.upsert({
    where: { email: 'demo@everafter.app' },
    update: {},
    create: {
      email: 'demo@everafter.app',
      passwordHash,
      role: 'ADMIN'
    }
  });

  await prisma.weddingProfile.upsert({
    where: { slug: 'demo' },
    update: {},
    create: {
      slug: 'demo',
      partner1Name: 'Layla',
      partner2Name: 'Omar',
      weddingDate: new Date('2018-06-15'),
      loveStory: 'A quiet story that began with coffee and certainty.',
      themeId: 'burgundy-gold',
      ownerId: user.id,
      memories: {
        create: [
          { date: 'March 2015', title: 'The beginning was quiet.', body: 'No thunder. No spectacle. Just two people who found it easy to be still together.', order: 0 },
          { date: 'December 2016', title: 'A promise, softly spoken.', body: 'We did not need grandeur. We needed certainty.', order: 1 },
          { date: 'June 2018', title: 'We became each other’s home.', body: 'The day was beautiful because it was real.', order: 2 }
        ]
      },
      galleryItems: {
        create: [
          { src: 'assets/images/gallery-1.svg', caption: 'Light on an ordinary morning', order: 0 },
          { src: 'assets/images/gallery-2.svg', caption: 'The day we said yes', order: 1 }
        ]
      },
      loveLetter: {
        create: {
          salutation: 'To the one I come home to,',
          paragraphs: ['There are things I have said to you a thousand times...', 'I do not measure our years in anniversaries...'],
          signature: 'Yours, in all the quiet ways'
        }
      },
      themeSettings: { create: {} },
      musicSettings: { create: { fileUrl: 'assets/music/ambient-romantic.mp3' } },
      sections: { create: {} }
    }
  });

  console.log('Database seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
