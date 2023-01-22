import { RandomFact } from "./uselessfacts.interface";

import { RESTDataSource } from "apollo-datasource-rest";

export default class UselessFactsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://uselessfacts.jsph.pl";
  }

  async getRandomFact(): Promise<RandomFact> {
    return this.get<RandomFact>("/random.json?language=en");
  }
}
