import { port } from './config';
import app from './app';

app
  .listen(3000, () => {
    console.log(`server running on port : ${3000}`);
  })
  .on('error', (e) => console.error(e));