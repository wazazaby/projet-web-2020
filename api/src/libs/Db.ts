import { Pool, createPool } from 'mysql2/promise';

class Connection {
    public pool: Pool;

    public init (message?: string): void {
        const connection: Pool = createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME || '',
            waitForConnections: true,
            connectionLimit: 20,
            queueLimit: 0
        });

        this.pool = connection;
        console.log(message);
    }
}

export const Db: Connection = new Connection();