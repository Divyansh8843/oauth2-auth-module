import dotenv from 'dotenv';
dotenv.config();
console.log('Environment variables loaded from .env file');
// Check critical variables
if (!process.env.GOOGLE_CLIENT_ID) {
    console.error('CRITICAL ERROR: GOOGLE_CLIENT_ID is missing!');
}
