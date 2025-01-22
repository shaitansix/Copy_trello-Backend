import pg from 'pg'
// import { HOST, DATABASE, DB_PORT, USER, PASSWORD } from './env.config.js'
import { DATABASE_URL } from './env.config.js'

// localhost
// export const pool = new pg.Pool({
//     host: HOST, 
//     database: DATABASE, 
//     port: DB_PORT, 
//     user: USER, 
//     password: PASSWORD
// })

// vercel
export const pool = new pg.Pool({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
})