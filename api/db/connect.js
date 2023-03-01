import mysql from 'mysql2'

import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.MYSQL_HOST,
  user            : process.env.MYSQL_USER,
  password        : process.env.MYSQL_PASS,
  database        : process.env.MYSQL_DB
}).promise();

export default pool;