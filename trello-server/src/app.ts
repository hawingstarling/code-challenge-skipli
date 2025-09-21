import express from 'express';
import cors from 'cors';
import { corsUrl } from './config';
import routes from './routes';
import helmet from 'helmet';
import { LIMIT_SIZE_REQUEST } from './constants';
import { NotFoundError } from './core/ApiError';
import { handlerGlobalException } from './middlewares/handlerGlobalException';
import path from 'path';

const app = express();

// Registry to set the security headers removes unsafe headers and adds new ones,
// including X-XSS-Protection, X-Content-Type-Options, Strict-Transport-Security,
app.use(helmet());
app.use(express.json({ limit: LIMIT_SIZE_REQUEST }));
app.use(
  express.urlencoded({ 
    limit: LIMIT_SIZE_REQUEST, 
    extended: true, 
    parameterLimit: 50000
  }),
);
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Global Error Handler Middleware
app.use(handlerGlobalException);

export default app;