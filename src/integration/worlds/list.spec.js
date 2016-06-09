import { expect } from 'chakram';
import chakram from 'chakram';
import moment from 'moment-timezone';
import { request } from '../request';
import { seed } from '../db-seed';

describe('/api/worlds', function() {
  before(function() {
    return seed({
      worlds: [{
        id: 1,
        name: 'Discworld',
        version: 'abcd',
        created: moment('2016-09-06T12:48:00Z'),
        updated: moment('2016-09-06T12:48:00Z')
      }]
    });
  });

  describe('List All', function() {
    let response;
    before(function() {
      response = request('get', '/api/worlds', {});
      return response;
    });

    it('Returned success', function() {
      return expect(response).to.have.status(200);
    })
    it('Returned the correct number of results',function() {
      return expect(response).to.have.json('pageInfo', {
        hasNextPage: false,
        hasPreviousPage: false,
        count: 1,
        pageOffset: 0
      });
    })
    it('Returned the correct results', function() {
      return expect(response).to.have.json('edges', function(edges) {
        expect(edges).to.have.length(1);
        expect(edges[0]).to.deep.equals({
          offset: 0,
          cursor: 'eyJ0eXBlIjoid29ybGRzIiwib2Zmc2V0IjowfQ==',
          resource: {
            id: 'id1',
            name: 'Discworld',
            created: '2016-09-06T12:48:00Z'
          }
        });
      });
    });
  });
});
