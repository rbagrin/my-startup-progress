import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import typeDefs from "./schema";

import MockDB from "./data-sources/db/mock-db";
import { DataSources } from "apollo-server-core/src/graphqlOptions";
import UselessFactsAPI from "./data-sources/api/uselessfacts.api";

const databaseConnection = new MockDB();
const uselessFactsAPI = new UselessFactsAPI();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      mockDB: databaseConnection,
      uselessFactsAPI,
    } as DataSources<object>;
  },
});

server.listen().then(() => {
  console.log(`
        🚀  Server is running!
        🔉  Listening on port 4000
        📭  Query at http://localhost:4000
    `);
});
