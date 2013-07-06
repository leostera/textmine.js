// Data generation
var faker = require('Faker');
var data = [];
var factor = 100*10;

for(var i=0; i<factor; i++) {
  data.push(faker.());
}

// Stemming (?)
var tfidf = require('./lib/textmining-js/tfidf.js');
var test_tfidf = new tfidf();
var tokenizer = require('./lib/stem/tokenizer.js');

for(var i=0; i<factor; i++) {
  if(data[i]) {
    test_tfidf.termFrequencyCount(tokenizer(data[i]));
  }
}
test_tfidf.directoryFrequencyCount();

// Mining
var m = require('./lib/textmining-js/mining');

var test_m = new m(5,test_tfidf.tfidf());
test_m.kmeans();
var labels = test_m.getLabel();
var clusters = test_m.getCluster();

for(var j=0; j<5; j++) {
  console.log(clusters[j]);
  for(var i=0; i<factor; i++) {
    if(labels[i] === j) {
      console.log(data[i],",",labels[i]);
    }
  }
  console.log("-------");
}
