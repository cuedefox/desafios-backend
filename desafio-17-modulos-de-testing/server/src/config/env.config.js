import dotenv from 'dotenv';
import program from '../process.js';

const environment = program.opts().mode;
console.log("Modo Opt: ", program.opts().mode);

dotenv.config({
    path: environment === "production" ? "./src/config/.env.production" : "./src/config/.env.development"
})

export default {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    sessionSecret: process.env.SESSION_SECRET,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    environment: environment
}