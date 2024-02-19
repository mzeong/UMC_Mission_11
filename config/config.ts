import * as dotenv from "dotenv";
dotenv.config();

export const config = {
    development: {
        username: process.env.DB_USER_NAME || "root",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || "database_development",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: "mysql",
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    production: {
        username: process.env.DB_USER_NAME || "root",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || "database_production",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: "mysql",
    },
};
