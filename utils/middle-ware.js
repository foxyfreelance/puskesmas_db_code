import Cors from 'cors';

const cors = Cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
});

export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
