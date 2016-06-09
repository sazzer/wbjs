import { generateId, decodeId } from './id';
import { expect } from 'chai';

describe('ID', function() {
  describe('generateId', function() {
    const encoded = generateId('results', 5);
    it('Generates the correct string', function() {
      expect(encoded).to.equal('eyJ0eXBlIjoicmVzdWx0cyIsImlkIjo1fQ==');
    })
  })

  describe('decodeId', function() {
    describe('Valid ID', function() {
      const decoded = decodeId('eyJ0eXBlIjoicmVzdWx0cyIsImlkIjo1fQ==')
      it('Has the correct keys', function() {
        expect(decoded).to.have.all.keys('type', 'id');
      })
      it('Has the correct type', function() {
        expect(decoded).to.have.property('type', 'results');
      })
      it('Has the correct id', function() {
        expect(decoded).to.have.property('id', 5);
      })
    })

    describe('Invalid id', function() {
      it('Fails on an invalid string');
      it('Fails on an empty string');
      it('Fails if the decoded string contains extra fields');
      it('Fails if the decoded string is missing fields');
    })
  })
})
