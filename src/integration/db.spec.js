import { expect } from 'chai';
import { seed } from './db-seed';

describe('worlds/dao', function() {
  describe('find', function() {
    beforeEach(function() {
      const data = {
        worlds: [{
          id: 1,
          name: 'Discworld',
          version: 'abcd',
          created: new Date(),
          updated: new Date()
        }]
      };

      return seed(data);
    });

    it('works', function() {

    })
  })
})
