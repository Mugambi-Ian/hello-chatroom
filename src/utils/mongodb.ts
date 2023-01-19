import { Db, MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

let db: Db;
const loadDB = async () => {
  if (!db) {
    const uri = process.env.MONGODB_URI;
    const client = await new MongoClient(uri as string, {});
    const clientPromise: Promise<MongoClient> = client.connect();
    const c = await clientPromise;
    db = c.db('hello-chatroom');
  }
  return db;
};

export default loadDB;
