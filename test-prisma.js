const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testPrisma() {
    try {
        console.log('Testing Prisma client...');
        
        // Test if classBase exists
        if (prisma.classBase) {
            console.log('✅ classBase model exists');
        } else {
            console.log('❌ classBase model does not exist');
        }
        
        // Test if classItems exists
        if (prisma.classItems) {
            console.log('✅ classItems model exists');
        } else {
            console.log('❌ classItems model does not exist');
        }
        
        // Test if classStatus exists
        if (prisma.classStatus) {
            console.log('✅ classStatus model exists');
        } else {
            console.log('❌ classStatus model does not exist');
        }
        
        console.log('Available models:', Object.keys(prisma));
        
    } catch (error) {
        console.error('Error testing Prisma:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testPrisma(); 