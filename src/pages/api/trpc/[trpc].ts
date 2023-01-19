import * as trpcNext from '@trpc/server/adapters/next';
import { Document, FindOptions, ObjectId } from 'mongodb';
import { z } from 'zod';

import { publicProcedure, router } from '@/server/trpc';
import { PAGE_SIZE } from '@/utils';
import loadDB from '@/utils/mongodb';

const appRouter = router({
  list: publicProcedure
    .input(z.object({ _id: z.string() }))
    .query(async ({ input }) => {
      const { _id: id } = input;
      const db = await loadDB();

      const options: FindOptions<Document> = {
        sort: { timeStamp: -1 },
        limit: PAGE_SIZE,
      };

      let find = {};
      if (id.length !== 0) find = { _id: { $lt: new ObjectId(id) } };

      const messages = await db
        .collection('messages')
        .find(find, options)
        .toArray();

      return messages;
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
      const db = await loadDB();
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
        _id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await loadDB();
      const result = await db
        .collection('messages')

        .deleteOne({ _id: new ObjectId(input._id) });
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
