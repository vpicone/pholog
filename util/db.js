import mongoose from 'mongoose';
import { DATABASE_CONNECT_URI } from './config';

mongoose.connect(DATABASE_CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export default db;
