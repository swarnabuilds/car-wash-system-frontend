import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.DB_URI as string);
const db = client.db("car-wash-system");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
      user: {
       additionalFields: {
          role: {
              type: ["admin", "user", "branchManager"],
              input: false,
              defaultValue: "user",
            } 
        }
    },
  database: mongodbAdapter(db, {
    client,
  }),
});
