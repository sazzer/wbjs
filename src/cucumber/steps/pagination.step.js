import { expect } from 'chai';

module.exports = function() {
  this.Then(/I get (\d+) results?/, function(count) {
    return expect(this.lastResponse).to.eventually.have.deep.property('body.pageInfo.count', Number.parseInt(count));
  })

  this.Then('I have no next page', function() {
    return expect(this.lastResponse).to.eventually.have.deep.property('body.pageInfo.hasNextPage', false);
  })

  this.Then('I have no previous page', function() {
    return expect(this.lastResponse).to.eventually.have.deep.property('body.pageInfo.hasPreviousPage', false);
  })

  this.Then('I have a next page', function() {
    return expect(this.lastResponse).to.eventually.have.deep.property('body.pageInfo.hasNextPage', true);
  })

  this.Then('I have a previous page', function() {
    return expect(this.lastResponse).to.eventually.have.deep.property('body.pageInfo.hasPreviousPage', true);
  })
}
