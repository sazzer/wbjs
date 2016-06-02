import { expect } from 'chai';
import { World } from './world';
import moment from 'moment-timezone';

describe('World', function() {
  describe('valid construction', function() {
    const created = moment().utc();
    const updated = moment().utc();
    const world = new World('123', 'My World', 'v1', created, updated);

    it('has the correct ID', function() {
      expect(world.id).to.equal('123');
    })
    it('has the correct name', function() {
      expect(world.name).to.equal('My World');
    })
    it('has the correct version', function() {
      expect(world.version).to.equal('v1');
    })
    it('has the correct created date', function() {
      expect(world.created).to.equal(created);
    })
    it('has the correct updated date', function() {
      expect(world.updated).to.equal(updated);
    })
  });
});
