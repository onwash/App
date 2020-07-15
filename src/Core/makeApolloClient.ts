import { getData } from "./asyncStore";

export const GRAPHQL_URL = 'http://localhost:3005/graphql'

export const apolloClientOptions = {
  uri: GRAPHQL_URL,
  request: async (operation:any) => {
    const token = await getData("token");
    operation.setContext({
      headers: {
        app: `onwaShapp`,
        authorization: token ? `JWT ${token}` : ""
      }
    });
  }
};