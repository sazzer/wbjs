import { generateCursor, decodeCursor, InvalidCursorError } from './cursor';
import { expect } from 'chai';

describe('Cursor', function() {
  describe('generateCursor', function() {
    const encoded = generateCursor('results', 5);
    it('Generates the correct string', function() {
      expect(encoded).to.equal('eyJ0eXBlIjoicmVzdWx0cyIsIm9mZnNldCI6NX0=');
    })
  })

  describe('decodeCursor', function() {
    describe('Valid cursor', function() {
      const decoded = decodeCursor('eyJ0eXBlIjoicmVzdWx0cyIsIm9mZnNldCI6NX0=')
      it('Has the correct keys', function() {
        expect(decoded).to.have.all.keys('type', 'offset');
      })
      it('Has the correct type', function() {
        expect(decoded).to.have.property('type', 'results');
      })
      it('Has the correct offset', function() {
        expect(decoded).to.have.property('offset', 5);
      })
    })

    describe('Invalid cursor', function() {
      it('Fails on an invalid string', function() {
        expect(() => {decodeCursor('thisIsAnInvalidString')}).to.throw(InvalidCursorError);
      });
      it('Fails on an empty string', function() {
        expect(() => {decodeCursor('')}).to.throw(InvalidCursorError);
      });
      it('Fails if the decoded string contains extra fields', function() {
        expect(() => {decodeCursor('eyJ0eXBlIjoicmVzdWx0cyIsIm9mZnNldCI6NSwiYW5zd2VyIjo0Mn0K')}).to.throw(InvalidCursorError); // {"type":"results","offset":5,"answer":42}
      });
      it('Fails if the decoded string is missing fields', function() {
        expect(() => {decodeCursor('eyJ0eXBlIjoicmVzdWx0cyJ9Cg==')}).to.throw(InvalidCursorError); // {"type":"results"}
        expect(() => {decodeCursor('eyJvZmZzZXQiOjV9Cg==')}).to.throw(InvalidCursorError); // {"offset":5}
      });
    })
  })
})
