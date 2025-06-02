import dotenv from "dotenv";
import path from "path";

// Load .env from the project root
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

console.log("ENV URL:", process.env.NEXT_PUBLIC_DB_CONNECTION_STRING);

/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.jsx",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://neondb_owner:npg_s2JS5gzVhTnO@ep-old-math-a5hqvjz1-pooler.us-east-2.aws.neon.tech/AI-Course-Generator?sslmode=require",
    },
};
