import { expect } from 'chai';
import { findAllWorlds } from './finder';

describe('worlds/finder', function() {
  describe('findAllWorlds', function() {
    describe('No filters, hard-coded data', function() {
      const results = findAllWorlds();
      it('Returns the correct values', function() {
        return expect(results).to.eventually.have.length(1);
      });
    })
  })
})
