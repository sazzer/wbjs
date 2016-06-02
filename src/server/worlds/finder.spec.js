import { expect } from 'chai';
import { findAllWorlds, findWorldById } from './finder';

describe('worlds/finder', function() {
  describe('findAllWorlds', function() {
    describe('No filters, hard-coded data', function() {
      const results = findAllWorlds();
      it('Returns the correct values', function() {
        return expect(results).to.eventually.have.length(1);
      });
    })
  })

  describe('findWorldById', function() {
    describe('With existing ID', function() {
      const result = findWorldById('123');
      it('Returns a value', function() {
        return result.should.be.fulfilled;
      })
    });
    describe('With unknown ID', function() {
      const result = findWorldById('456');
      it('Returns an error', function() {
        return result.should.be.rejected;
      })
    });
  });
})
