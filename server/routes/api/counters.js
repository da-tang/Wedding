var db = require('../../db');

module.exports = (app) => {
  app.get('/invitation/:ticket', (request, response) => {
    db.query('SELECT * FROM invite where ticket = $1', [request.params.ticket],(error, result) => {
      if (error) throw error;
      response.send(result);
    });
  });

  app.post('/invitation', function (request, response) {
    var input = request.body.input;
    var d = new Date();

    var datestring = d.getFullYear() + '-' + (d.getMonth()+1)  + "-" + (d.getDate()) + " " +
      d.getHours() + ":" + d.getMinutes();

    db.query('UPDATE invite SET guest=$1, guestname=$2, baby=$3, vegan=$4, other=$5, time=$6 where ticket =$7',
      [input.guest, input.guestName, input.baby, input.vegan, input.other, datestring, input.ticketNo],(error, result) => {
        if (error) throw error;
        response.send(result);
      });
  })
};
