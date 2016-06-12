import { translateError } from './errors';
import { expect } from 'chai';
import Boom from 'boom';

describe('Errors', function() {
  describe('translateError', function() {
    describe('Translating a supported error', function() {
      class TeapotError {
        toBoom() {
          const response = Boom.create(418, 'Out of Tea Error');
          response.output.payload.error = 'OUT_OF_TEA';
          return response;
        }
      }
      const translated = translateError(new TeapotError());
      it('Is a Boom object', function() {
        expect(translated).to.have.deep.property('isBoom', true);
      });
      it('Has the correct status code', function() {
        expect(translated).to.have.deep.property('output.payload.statusCode', 418);
      });
      it('Has the correct error code', function() {
        expect(translated).to.have.deep.property('output.payload.error', 'OUT_OF_TEA');
      });
      it('Has the correct error message', function() {
        expect(translated).to.have.deep.property('output.payload.message', 'Out of Tea Error');
      });
    })
    describe('Translating an unexpected error', function() {
      const translated = translateError(new Error('Oops'));
      it('Is a Boom object', function() {
        expect(translated).to.have.deep.property('isBoom', true);
      });
      it('Has the correct status code', function() {
        expect(translated).to.have.deep.property('output.payload.statusCode', 500);
      });
      it('Has the correct error code', function() {
        expect(translated).to.have.deep.property('output.payload.error', 'INTERNAL_ERROR');
      });
      it('Has the correct error message', function() {
        expect(translated).to.have.deep.property('output.payload.message', 'An internal server error occurred');
      });
    })
  })
})
