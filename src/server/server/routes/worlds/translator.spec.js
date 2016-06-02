import { expect } from 'chai';
import moment from 'moment-timezone';
import { World } from '../../../worlds/world';
import { toApi } from './translator';

describe('worlds/translator', function() {
  describe('toApi', function() {
    const world = new World('123', 'My World', 'v1', moment('2016-06-01T11:56:11Z'), moment('2016-06-02T11:56:11Z'));
    const translated = toApi(world);

    it('is the correct type', function() {
      expect(translated).to.be.an('object');
    })
    it('has the correct name', function() {
      expect(translated.name).to.be.a('string');
      expect(translated.name).to.equal('My World');
    })
    it('has the correct version', function() {
      expect(translated.version).to.be.a('string');
      expect(translated.version).to.equal('v1');
    })
    it('has the correct created date', function() {
      expect(translated.created).to.be.a('string');
      expect(translated.created).to.equal('2016-06-01T11:56:11Z');
    })
    it('has the correct updated date', function() {
      expect(translated.updated).to.be.a('string');
      expect(translated.updated).to.equal('2016-06-02T11:56:11Z');
    })
  });
});
