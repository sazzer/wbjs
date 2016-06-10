import { expect } from 'chai';

module.exports = function() {
  this.Then('I get a successful response', function() {
    return expect(this.lastResponse).to.eventually.have.property('status', 200);
  })
}
