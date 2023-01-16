import * as trpcNext from '@trpc/server/adapters/next';
import { Db, ObjectId } from 'mongodb';
import { z } from 'zod';

import { publicProcedure, router } from '@/server/trpc';
import clientPromise, { PAGE_SIZE } from '@/utils/mongodb';

let db: Db;
const loadDB = async () => {
  const client = await clientPromise;
  db = client.db('hello-chatroom');
};
const appRouter = router({
  list: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ input }) => {
      if (!db) await loadDB();
      const pageCount = await db.collection('messages').countDocuments();
      const totalPages = Math.ceil(pageCount / PAGE_SIZE);
      const messages = await db
        .collection('messages')
        .find({})
        .sort({ timeStamp: -1 })
        .limit(PAGE_SIZE)
        .skip(input.page * PAGE_SIZE)
        .toArray();
      return { messages, hasMore: input.page < totalPages };
    }),
  add: publicProcedure
    .input(
      z.object({
        senderId: z.string(),
        message: z.string(),
        image: z.string().url().optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (!db) await loadDB();
      const doc = {
        ...input,
        timeStamp: new Date(),
        id: new ObjectId().toString(),
      };
      const message = await db.collection('messages').insertOne(doc);
      return {
        message,
      };
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      if (!db) await loadDB();
      const result = await db
        .collection('messages')
        .deleteOne({ id: input.id });
      return {
        result,
      };
    }),
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
