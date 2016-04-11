var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var beerSchema = new Schema({
  name: String,
  abv: Number,
  style: String
});

var Beer = mongoose.model('Beer', beerSchema);

var beer = new Beer({name: 'Midnight', abv: 5.2, style: 'Stout'});

mongoose.connect('mongodb://localhost/beers');

beer.save();