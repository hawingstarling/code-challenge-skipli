import { port } from './config';
import app from './app';
import logger from './core/Logger';

app
  .listen(3000, () => {
    logger.info(`server running on port : ${3000}`);
    console.info(`server running on port : ${port}`);
  })
  .on('error', (e) => {
    logger.error('Server error: ', e);
    console.error(e)
  });