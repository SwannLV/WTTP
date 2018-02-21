var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 8080;
server.listen(port);
console.log('> Listening on port', port);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

// - THE S.T.A.T.E -
// Je pourrais faire beaucoup mieux oui, pour gérer le state, seul lieu de vérité, 
// avec peut être un redux côté back pour tracker les changements correctement
let state = {
  timestamp: Date.now(),
  pipeline: {
      cards: [
          { id: 0, text: "0 Paul Newman", col: 0 },
          { id: 1, text: "1 Michel Berger", col: 0 },
          { id: 2, text: "2 Jean René Godart", col: 0 },
          { id: 3, text: "3 Parker Lewis", col: 0 },
          { id: 4, text: "4 Steevie Wonder", col: 1 },
          { id: 5, text: "6 Hulk Hogan", col: 1 }
      ]
  }
}


io.on('connection', function(client) {  
  console.log('Client connected...');
  client.emit('change', state);


  client.on('join', function(data) {
    console.log('join', data);
  });

  // ON CHANGE
  client.on('change', function(data) {
    const now = Date.now();

    // BROADCAST THE CHANGE IF NEWER THAN EXISTING STATE
    if(now > state.timestamp){
      console.log('on change... broadcasting change', data);
      state = { timestamp: Date.now(), pipeline: data };
      client.broadcast.emit('change', state);
    }
    //IF OLDER: SEND GENTLE ERROR MESSAGE AND ROLLBACK THE CLIENT STATE TO THE CURRENT ONE
    else{
      console.log('ERROR');
      client.emit('canceled_change', { title: "Change canceled", message: "Somebody else changed the document sorry :)"});
      client.emit('change', state);
    }
  });


});

