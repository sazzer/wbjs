module.exports = function() {
  this.registerHandler('BeforeFeatures', function(event, callback) {
    console.log('Starting the server');
    callback();
  });
  this.registerHandler('AfterFeatures', function(event, callback) {
    console.log('Stopping the server');
    callback();
  });
}
