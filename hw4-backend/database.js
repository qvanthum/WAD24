const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    database: "testWad",
    host: "localhost",
    port: "5432"
});

const execute = async(query) => {
    try {
        await pool.connect(); // create a connection
        await pool.query(query); // executes a query
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createTables = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        profile_pic_path VARCHAR(255),
        password VARCHAR(200) NOT NULL 
    );

    CREATE TABLE IF NOT EXISTS "posts" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        post_date DATE NOT NULL DEFAULT CURRENT_DATE,
        post_text VARCHAR(1000),
        likes INTEGER DEFAULT 0
    );
`;

execute(createTables).then(result => {
    if (result) {
        console.log('Tables were created');
    }
});

module.exports = pool;