import { expect } from 'chai'
import { name, somethingElse } from './second'

describe('second', function () {
  it('exports the correct name', function() {
    expect(name).to.equal('world');
  });
  it('exports the correct function', function() {
    expect(somethingElse()).to.equal('Hello');
  });

});
