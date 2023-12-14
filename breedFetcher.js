const request = require('request');

const fetchBreedDescription = function(breedName, callback) {
  // if no breed name argument
  if(!breedName) {
    callback('Breed not found', null);
    return;
  }

  const catApi = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;
  // makes an HTTP req to the cat api, when finished the callback function is called
  request(catApi, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      const breedData = JSON.parse(body);
      const breedDescription = breedData[0].description;
      callback(null, breedDescription);
    } else {
      callback(error || `Error: ${response.statusCode}`, null);
    }
  });
};

module.exports = { fetchBreedDescription };
