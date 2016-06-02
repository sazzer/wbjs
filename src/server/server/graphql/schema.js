import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';

import {ListWorldsQueryField} from './worlds/listWorlds';

const QueryRootType = new GraphQLObjectType({
    name: 'QueryRoot',
    fields: {
        worlds: ListWorldsQueryField
    }
});

export const schema = new GraphQLSchema({
    query: QueryRootType
});
