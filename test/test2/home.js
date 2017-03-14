module.exports = {
  'Landing page' : function (client) {
    client
      .url('http://localhost:3333')
      .assert.title('JobAdvisor')
      .end();
        }
};
