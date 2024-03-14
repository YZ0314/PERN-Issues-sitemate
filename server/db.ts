import { Pool } from 'pg';

const pool = new Pool({
    user: "yifanhe",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "perntissues"
});

export default pool;
