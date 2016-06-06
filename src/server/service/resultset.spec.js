import { expect } from 'chai';
import { List } from 'immutable';
import { ResultSet } from './resultset';

describe('ResultSet', function() {
  describe('Valid construction', function() {
    const resultset = new ResultSet([1, 2, 3], 4, 5);

    it('Has the correct results', function() {
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
