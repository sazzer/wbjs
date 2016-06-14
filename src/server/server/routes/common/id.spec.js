import { generateId, decodeId, InvalidIDError } from './id';
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
      it('Fails on an invalid string', function() {
        expect(() => {decodeId('thisIsAnInvalidString')}).to.throw(InvalidIDError);
      });
      it('Fails on an empty string', function() {
        expect(() => {decodeId('')}).to.throw(InvalidIDError);
      });
      it('Fails if the decoded string contains extra fields', function() {
        expect(() => {decodeId('eyJ0eXBlIjoicmVzdWx0cyIsImlkIjo1LCJhbnN3ZXIiOjQyfQo=')}).to.throw(InvalidIDError); // {"type":"results","id":5,"answer":42}
      });
      it('Fails if the decoded string is missing fields', function() {
        expect(() => {decodeId('eyJ0eXBlIjoicmVzdWx0cyJ9Cg==')}).to.throw(InvalidIDError); // {"type":"results"}
        expect(() => {decodeId('eyJpZCI6NX0K')}).to.throw(InvalidIDError); // {"id":5}
      });
    })
  })
})
