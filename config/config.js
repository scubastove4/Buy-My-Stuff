require('dotenv').config()
module.exports = {
  development: {
    database: 'buy_my_stuff_development',
    dialect: 'postgres'
  },
  test: {
    database: 'buy_my_stuff_test',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}
