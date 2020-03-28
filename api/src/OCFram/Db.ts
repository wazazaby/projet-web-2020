import { Pool, createPool } from 'mysql2/promise';

class Connection {
    public pool: Pool;

    async init (): Promise<void> {
        const connection: Pool = await createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        console.log('DB running...');
        this.pool = connection;
    }
}

export const Db = new Connection();