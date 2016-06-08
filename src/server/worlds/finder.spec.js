import { expect } from 'chai';
import sinon from 'sinon';
import { findAllWorlds, __Rewire__ as RewireWorldFinder, __ResetDependency__ as ResetWorldFinder } from './finder';
import { World } from './world';
import moment from 'moment-timezone';
import { ResultSet } from '../service/resultset';

describe('worlds/finder', function() {
  describe('findAllWorlds', function() {
    const dao = {
      find: sinon.stub()
    };
    beforeEach(function() {
      RewireWorldFinder('find', dao.find);
    });
    afterEach(function() {
      ResetWorldFinder('find');
    });

    describe('No filters, no pagination requirements', function() {
      const resultset = new ResultSet([
        new World(123, 'Discworld', 'C573ABB3-87CD-4E87-8760-5C76D60156D6', moment(), moment())
      ], 2, 0);

      beforeEach(function() {
        dao.find.reset();
        dao.find.withArgs().returns(Promise.resolve(resultset));
      });
      afterEach(function() {
        expect(dao.find.callCount).to.equal(1);
      });
      it('Returns a ResultSet', function() {
        const results = findAllWorlds();
        return expect(results).to.eventually.be.instanceOf(ResultSet);
      });
      it('Returns the correct number of values', function() {
        const results = findAllWorlds();
        return expect(results).to.eventually.have.property('results').with.size(1);
      });
      it('Returns the correct resultset', function() {
        const results = findAllWorlds();
        return expect(results).to.eventually.equal(resultset);
      })
    });
  })

})
