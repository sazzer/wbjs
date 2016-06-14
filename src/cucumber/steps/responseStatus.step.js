import { expect } from 'chai';
import { parseTall, parseOneTall } from './datatable';

const STATUS_CODE_MAP = {
  'Bad Request': 400,
  'Not Found': 404
}

const ERROR_RESPONSE_MAP = {
  'Status Code': {field: 'status', transformer: (value) => STATUS_CODE_MAP[value] || Number.parseInt(value)},
  'Error Code': {field: 'body.error'}
}

module.exports = function() {
  this.Then('I get a successful response', function() {
    return expect(this.lastResponse).to.eventually.have.property('status', 200);
  })

  this.Then('I get an error response with:', function(datatable) {
    const parsed = parseOneTall(datatable);

    return this.checkCompleteResponse(parsed, ERROR_RESPONSE_MAP);
  })
}
