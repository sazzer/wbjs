module.exports = function() {
  this.When('I list worlds', function() {
    return this.request('get', '/api/worlds');
  });
}
