const config = {
  development: {
    client: 'pg',
    connection: {
      database: 'whitecat',
      password: process.env.DB_PASSWORD,
      user:     process.env.DB_USER,
    }
  },
};

export default config
