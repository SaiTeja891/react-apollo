import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Database, Listing } from "../../../lib/types";
// import { listings} from '../listings';

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: Record<string, never>,
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      // for(let i=0;i<listings.length;i++){
      //     if(listings[i].id === id) {
      //         return listings.splice(i,1)[0];
      //     }
      // }
      const deleteResult = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });
      if (!deleteResult.value) {
        throw new Error("failed to delete listing");
      }
      return deleteResult.value;
    },
  },
  Listing: {
    id: (listing: Listing) => listing._id.toString(),
  },
};
