import dotenv from 'dotenv';
import fs from 'fs';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const env = process.env.NODE_ENV || 'development';

const envFile = env === 'production' ? '.env.production' : '.env';

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  console.warn(`Environment file ${envFile} not found.`);
}

// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const timezone = process.env.TZ;

export const app = process.env.APP_NAME;

export const corsUrl = process.env.CORS_URL;

export const logDirectory = process.env.LOG_DIR;

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID,
};

export const mailerConfig: SMTPTransport.Options = {
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE === "true",
  ignoreTLS: process.env.MAIL_IGNORE_TLS === "true",
  requireTLS: process.env.MAIL_REQUIRE_TLS === "false",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
};

export const MailDefaultName = process.env.MAIL_DEFAULT_NAME;
export const MailDefaultEmail = process.env.MAIL_DEFAULT_EMAIL;
