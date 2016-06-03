import { expect } from 'chai';
import { ResultSet } from './resultset';
import { List } from 'immutable';

describe('ResultSet', function() {
  describe('Valid construction', function() {
    const resultset = new ResultSet([1, 2, 3], 4, 5);

    it('Has the correct results', function() {
      expect(resultset.results).is.an.instanceOf(List);
      expect(resultset.results).to.equal(List([1, 2, 3]));
    })
    it('Has the correct count', function() {
      expect(resultset.count).is.a.number;
      expect(resultset.count).to.equal(4);
    })
    it('Has the correct offset', function() {
      expect(resultset.count).is.a.number;
      expect(resultset.offset).to.equal(5);
    })
  })
})
