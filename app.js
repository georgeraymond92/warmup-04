'use strict';
const util = require('util');
const superagent = require('superagent');

function fetchPeopleWithPromises() {
  // doo some things

  superagent.get('https://swapi.co/api/people/')
  .then(res => {
    // console.log(res.body);
    const urlArr = [];

    for(let i = 0; i < res.body.results.length; i++){
      urlArr.push(res.body.results[i].url);
    }
    let promiseArr = [];
    for(let i = 0; i < urlArr.length; i++){

      promiseArr.push(superagent.get(urlArr[i]));

    }

    Promise.all(promiseArr)
    .then( (result) => {
      // console.log("here are some words" , result);

      for(let i =0; i< result.length; i++){
        console.log(result[i].body.name)
      }
    }).catch(err => { if( err ) throw err })

    console.log(urlArr);
    
  })
};

fetchPeopleWithPromises()


