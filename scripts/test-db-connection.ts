import { PrismaClient } from '@prisma/client';

async function testDatabaseConnection() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Testing database connection...');
    
    // Simple query to check connection
    await prisma.$queryRaw`SELECT 1+1 as result`;
    
    console.log('✅ Database connection successful!');
    
    // Optionally check for the tasks table
    try {
      const tableCount = await prisma.$queryRaw`
        SELECT COUNT(*) 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'tasks'
      `;
      
      // Output will depend on whether migration has been run
      console.log('📊 Database schema check:', 
        Array.isArray(tableCount) && tableCount.length > 0 
          ? 'Tasks table exists' 
          : 'Tasks table not found (run migrations first)');
    } catch (schemaError) {
      console.log('⚠️ Could not check for tables:', schemaError.message);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Please check your DATABASE_URL environment variable and ensure your database is running.');
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testDatabaseConnection()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });