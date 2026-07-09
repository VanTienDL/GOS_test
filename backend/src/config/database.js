const { Sequelize } = require('sequelize');

let sequelize;

// For deploying on cloud
if (process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Run locally (npm start or Docker compose)
  console.log('🔌 Kết nối Postgres Local...');
  
  sequelize = new Sequelize(
    process.env.DB_NAME || 'gos_thpt_2024',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '123456',
    {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      dialect: 'postgres',
      logging: false,
      native: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
}

module.exports = sequelize;