import app from './app.js';
import { env } from './config/env.js';

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Ever After API running on port ${PORT} (${env.NODE_ENV})`);
});
