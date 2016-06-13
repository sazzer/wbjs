import { extractPaginationDetails } from './pagination';
import { generateCursor } from './common/cursor';
import { expect } from 'chai';
import sinon from 'sinon';

describe('pagination', function() {
  describe('extractPaginationDetails', function() {
    const request = {
      query: {

      }
    };

    describe('No pagination details', function() {
      let paginationDetails;
      before(function() {
        paginationDetails = extractPaginationDetails(request);
      })

      it('Returns the correct offset', function() {
        expect(paginationDetails.offset).to.equal(0);
      });
      it('Returns the correct count', function() {
        expect(paginationDetails.count).to.equal(10);
      });
      it('Doesn\'t return anything else', function() {
        expect(paginationDetails).to.have.all.keys('offset', 'count');
      });
    })
    describe('Offset pagination details', function() {
      let paginationDetails;
      before(function() {
        request.query = {
          offset: 20,
          count: 100
        };
        paginationDetails = extractPaginationDetails(request);
      })

      it('Returns the correct offset', function() {
        expect(paginationDetails.offset).to.equal(20);
      });
      it('Returns the correct count', function() {
        expect(paginationDetails.count).to.equal(100);
      });
      it('Doesn\'t return anything else', function() {
        expect(paginationDetails).to.have.all.keys('offset', 'count');
      });
    })
    describe('Page-based pagination details', function() {
      let paginationDetails;
      before(function() {
        request.query = {
          page: 2,
          count: 25
        };
        paginationDetails = extractPaginationDetails(request);
      })

      it('Returns the correct offset', function() {
        expect(paginationDetails.offset).to.equal(50);
      });
      it('Returns the correct count', function() {
        expect(paginationDetails.count).to.equal(25);
      });
      it('Doesn\'t return anything else', function() {
        expect(paginationDetails).to.have.all.keys('offset', 'count');
      });
    })
    describe('Cursor-pagination details', function() {
      let paginationDetails;
      before(function() {
        request.query = {
          cursor: generateCursor('test', 7),
          count: 5
        };
        paginationDetails = extractPaginationDetails(request);
      })

      it('Returns the correct offset', function() {
        expect(paginationDetails.offset).to.equal(8);
      });
      it('Returns the correct count', function() {
        expect(paginationDetails.count).to.equal(5);
      });
      it('Doesn\'t return anything else', function() {
        expect(paginationDetails).to.have.all.keys('offset', 'count');
      });
    })
    describe('Multiple pagination details', function() {
      it('Fails if both Offset and Page are provided', function() {
        request.query = {
          offset: 1,
          page: 1
        };
        expect(() => {extractPaginationDetails(request)}).to.throw
      });
      it('Fails if both Offset and Cursor are provided', function() {
        request.query = {
          cursor: generateCursor('test', 7),
          offset: 1
        };
        expect(() => {extractPaginationDetails(request)}).to.throw
      });
      it('Fails if both Page and Cursor are provided', function() {
        request.query = {
          cursor: generateCursor('test', 7),
          page: 1
        };
        expect(() => {extractPaginationDetails(request)}).to.throw
      });
      it('Fails if both all three or Offset, Page and Cursor are provided', function() {
        request.query = {
          cursor: generateCursor('test', 7),
          offset: 1,
          page: 1
        };
        expect(() => {extractPaginationDetails(request)}).to.throw
      });
    })
  })
})
