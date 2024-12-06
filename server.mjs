import express from 'express';
import next from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Serve React build files (index.html and static assets) from the public folder
  server.use(express.static(path.join(__dirname, 'public')));

  // API route handling: Let Next.js handle API requests
  server.get('/api/*', (req, res) => {
    return handle(req, res); // Let Next.js handle API routes
  });

  // Handle React routing: all other requests will be handled by React (index.html)
  server.get('*', (req, res) => {
    return app.render(req, res, '/index.html');
  });

  // Start the server
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
