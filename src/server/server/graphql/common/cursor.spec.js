import { expect } from 'chai';
import { generateCursor, parseCursor } from './cursor';

describe('cursor', function() {
  describe('generateCursor', function() {
    const cursor = generateCursor('someName', 1)
    it('is a string', function() {
      expect(cursor).to.be.a.string;
    })
    it('is the correct string', function() {
      expect(cursor).to.equal('eyJuYW1lIjoic29tZU5hbWUiLCJvZmZzZXQiOjF9') // Base64 for {'name': 'someName', 'offset': 1}
    })
  });

  describe('parseCursor', function() {
    describe('Valid input', function() {
      const cursor = parseCursor('eyJuYW1lIjoic29tZU5hbWUiLCJvZmZzZXQiOjF9') // Base64 for {'name': 'someName', 'offset': 1}
      it('is an object', function() {
        expect(cursor).to.be.an.object
      })
      it('has the correct keys', function() {
        expect(cursor).to.have.all.keys('name', 'offset')
      })
      it('has the correct name', function() {
        expect(cursor.name).to.equal('someName')
      })
      it('has the correct offset', function() {
        expect(cursor.offset).to.equal(1)
      })
    })
    describe('Invalid Input', function() {
      it('fails when the string is blank', function() {
        expect(() => {parseCursor('')}).to.throw()
      })
      it('fails when the string is not valid Base64', function() {
        expect(() => {parseCursor('1')}).to.throw()
      })
      it('fails when the decoded cursor doesnt contain an offset', function() {
        expect(() => {parseCursor('eyJuYW1lIjoic29tZU5hbWUifQo=')}).to.throw() // {"name":"someName"}
      })
      it('fails when the decoded cursor doesnt contain a name', function() {
        expect(() => {parseCursor('eyJvZmZzZXQiOjF9Cg==')}).to.throw() // {"offset":1}
      })
      it('fails when the decoded cursor contains extra fields', function() {
        expect(() => {parseCursor('eyJvZmZzZXQiOjEsICJuYW1lIjoic29tZU5hbWUiLCAib3RoZXIiOjF9Cg==')}).to.throw() // {"offset":1, "name":"someName", "other":1}
      })
    })
  })
})
