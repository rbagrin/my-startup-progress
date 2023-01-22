import UselessFactsAPI from "./api/uselessfacts.api";
import MockDB from "./db/mock-db";

export interface MyDataSources {
  mockDB: MockDB;
  uselessFactsAPI: UselessFactsAPI;
}
