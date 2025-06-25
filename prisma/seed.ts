import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create some test users
  const user1 = await prisma.user.upsert({
    where: { email: 'test1@example.com' },
    update: {},
    create: {
      username: 'testuser1',
      email: 'test1@example.com',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'test2@example.com' },
    update: {},
    create: {
      username: 'testuser2',
      email: 'test2@example.com',
    },
  })

  console.log('✅ Seeding completed!')
  console.log('Created users:', { user1, user2 })
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 