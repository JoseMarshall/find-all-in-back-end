import cors from 'cors';

const whitelist = [
  process.env.URL_ROOT,
  process.env.URL_DEV,
  ...process.env.ALLOWED_URLS!.split(';'),
]; // the array containing all url allowed by cors

const corsOptions = {
  origin(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} Not allowed by CORS`));
    }
  },
  methods: ['PUT', 'GET', 'POST', 'HEAD', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'csrf-token'],
  credentials: true,
};

export default cors(corsOptions);
