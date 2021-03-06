import { MongoClient } from "mongodb";
import { Booking, Database, Listing, User } from "../lib/types";
// const username = 'user_001';
// // const password = 'ZQAMWRU5Czi22PlX';
// const password = 'IUdpdMDktHefrGo0';
// const cluster = 'cluster0.keyhs';
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);
  const db = client.db("main");

  return {
    listings: db.collection<Listing>("listings"),
    users: db.collection<User>("users"),
    bookings: db.collection<Booking>("bookings"),
  };
};
