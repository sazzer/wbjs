import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';
import { Connection } from '../common/connection';
import { World, worldTranslator } from './world';
import { findAllWorlds } from '../../../worlds/finder';
import { pageInfoTranslator } from '../common/pageInfo';
import bunyan from 'bunyan';

const LOGGER = bunyan.createLogger({name: 'listWorlds'});

/**
 * Query Field for retrieving a list of worlds
 */
export const ListWorldsQueryField = {
  type: Connection(World),
  resolve: () => {
    return findAllWorlds()
      .then((worlds) => {
        LOGGER.info({worlds}, 'Retrieved worlds');
        return worlds;
      })
      .then((worlds) => {
        return {
          pageInfo: pageInfoTranslator(worlds),
          edges: worlds.results.map((world) => {
            return {
              resource: worldTranslator(world),
              cursor: 'abc',
              offset: 0
            }
          }).toJS()
        };
      })
      .then((worlds) => {
        LOGGER.info({worlds}, 'Retrieved worlds');
        return worlds;
      })
  }
}
