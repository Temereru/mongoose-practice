var mongoose = require('mongoose');
var qs = require('querystring');
var Schema = mongoose.Schema;

var personSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: String,
  age: {type: Number, min: 10}
});

var addressSchema = new Schema({
  city: String,
  street: String,
  apartment: Number
});

var Person = mongoose.model('Person', personSchema);


//var bob = new Person({firstName: 'Bob', lastName: 'Cohen', age: 30});
// var david = new Person({firstName: 'David', lastName: 'Smith', age: 25});
// var anna = new Person({firstName: 'anna', lastName: 'Smith', age: 27});
//var maria = new Person({firstName: 'maria', lastName: 'Smith', age: 10});
// var matt = new Person({firstName: 'matt', lastName: 'Smith', age: 15});

// console.log(david);

mongoose.connect('mongodb://localhost/peoples');


// bob.save();
// david.save();
// anna.save();
// maria.save();
// matt.save();

// Person.find(function(err, result){
//   console.log(result);
// });

// Person.find({age: 25}, function(err, result){
//   console.log(result);
// });

var http = require('http');

var hostname = 'localhost';
var port = 8080;
var ans = [];

http.createServer(function (request, response){
  response.setHeader('Access-Control-Allow-Origin', '*');
  if(request.method === 'POST'){
    var body = '';
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function() {
      var data = qs.parse(body);
      if(data.firstName){
        var fName = data.firstName;
      }else{
        response.writeHead(413, 'a parameter was not provided', {'Content-Type': 'text/html'});
        response.end('A first name was not provided');
      }
      if(data.lastName){
        var lName = data.lastName;
      }else{
        response.writeHead(413, 'a parameter was not provided', {'Content-Type': 'text/html'});
        response.end('A last name was not provided');
      }
      if(data.age){
        var age = data.age;
      }else{
        response.writeHead(413, 'a parameter was not provided', {'Content-Type': 'text/html'});
        response.end('An age was not provided');
      }
      var person = new Person({firstName: fName, lastName: lName, age: age});
      person.save();
      response.writeHead(200, { 'Content-Type': 'text/html' });
      var msg = {msg: 'the data was succesfully added'};
      response.end(JSON.stringify(msg));
    });
  }else{
    response.writeHead(200, { 'Content-Type': 'application/json' }); 
    Person.find(function(err, result){
      if(err) throw err;
      response.end(JSON.stringify(result));
    });
  }
}).listen(port, hostname, function (){
  console.log('Server running at http://' + hostname + ':' + port + '/');
});