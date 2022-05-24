import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema, Field, ID, ObjectType, Query, Resolver } from 'type-graphql';

@ObjectType()
export class Part{
  @Field(() => ID)
  name: string;
}

@Resolver(Part)
export class PartsResolver {
  @Query(() => [Part])
  parts(): Part[] {
    return [
      { name: "gwint" },
      { name: "gwint2"}
    ];
  }
}

const schema = await buildSchema({
  resolvers: [PartsResolver],
});

const server = new ApolloServer({
  schema,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default async function handler(req, res) {
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
}