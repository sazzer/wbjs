import { expect } from 'chai';
import { ResultSet} from '../../../service/resultset';
import { pageInfoTranslator } from './pageInfo';

describe('PageInfo', function() {
  describe('pageInfoTranslator', function() {
    describe('Only Page', function() {
      const resultset = new ResultSet([1, 2, 3], 3, 0);
      const pageInfo = pageInfoTranslator(resultset);
      it('has the correct keys', function() {
        expect(pageInfo).to.have.all.keys('hasNextPage', 'hasPreviousPage', 'count', 'pageOffset');
      })
      it('has no previous page', function() {
        expect(pageInfo.hasPreviousPage).to.equal(false)
      })
      it('has no next page', function() {
        expect(pageInfo.hasNextPage).to.equal(false)
      })
      it('has the correct total count', function() {
        expect(pageInfo.count).to.equal(3)
      })
      it('has the correct offset', function() {
        expect(pageInfo.pageOffset).to.equal(0)
      })
    })

    describe('First Page', function() {
      const resultset = new ResultSet([1, 2, 3], 9, 0);
      const pageInfo = pageInfoTranslator(resultset);
      it('has the correct keys', function() {
        expect(pageInfo).to.have.all.keys('hasNextPage', 'hasPreviousPage', 'count', 'pageOffset');
      })
      it('has no previous page', function() {
        expect(pageInfo.hasPreviousPage).to.equal(false)
      })
      it('has a next page', function() {
        expect(pageInfo.hasNextPage).to.equal(true)
      })
      it('has the correct total count', function() {
        expect(pageInfo.count).to.equal(9)
      })
      it('has the correct offset', function() {
        expect(pageInfo.pageOffset).to.equal(0)
      })
    })

    describe('Second Page', function() {
      const resultset = new ResultSet([1, 2, 3], 9, 3);
      const pageInfo = pageInfoTranslator(resultset);
      it('has the correct keys', function() {
        expect(pageInfo).to.have.all.keys('hasNextPage', 'hasPreviousPage', 'count', 'pageOffset');
      })
      it('has a previous page', function() {
        expect(pageInfo.hasPreviousPage).to.equal(true)
      })
      it('has a next page', function() {
        expect(pageInfo.hasNextPage).to.equal(true)
      })
      it('has the correct total count', function() {
        expect(pageInfo.count).to.equal(9)
      })
      it('has the correct offset', function() {
        expect(pageInfo.pageOffset).to.equal(3)
      })
    })

    describe('Last Page', function() {
      const resultset = new ResultSet([1, 2, 3], 9, 6);
      const pageInfo = pageInfoTranslator(resultset);
      it('has the correct keys', function() {
        expect(pageInfo).to.have.all.keys('hasNextPage', 'hasPreviousPage', 'count', 'pageOffset');
      })
      it('has a previous page', function() {
        expect(pageInfo.hasPreviousPage).to.equal(true)
      })
      it('has no next page', function() {
        expect(pageInfo.hasNextPage).to.equal(false)
      })
      it('has the correct total count', function() {
        expect(pageInfo.count).to.equal(9)
      })
      it('has the correct offset', function() {
        expect(pageInfo.pageOffset).to.equal(6)
      })
    })
  })
})
