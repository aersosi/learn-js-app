/** @type {import('next').NextConfig} */

import path from "node:path";
import dotenv from "dotenv";
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env.local') });


const nextConfig = {
    reactStrictMode: false,
    env: {
        MASTER_KEY: process.env.MASTER_KEY,
    }
};

export default nextConfig;
