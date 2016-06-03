import { expect } from 'chai';
import { findAllWorlds, findWorldById } from './finder';
import { ResultSet } from '../service/resultset';

describe('worlds/finder', function() {
  describe('findAllWorlds', function() {
    describe('No filters, hard-coded data', function() {
      const results = findAllWorlds();
      it('Returns a ResultSet', function() {
        return expect(results).to.eventually.be.instanceOf(ResultSet);
      });
      it('Returns the correct values', function() {
        return expect(results).to.eventually.have.property('results').with.size(2);
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
