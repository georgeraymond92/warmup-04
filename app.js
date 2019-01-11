'use strict';


// requireing superagent
const superagent = require('superagent');


// using promises
function fetchPeopleWithPromises() {

  superagent.get('https://swapi.co/api/people/')

  .then(res => {

    let urlArr = [];

    for(let i = 0; i < res.body.results.length; i++){

      urlArr.push(res.body.results[i].url);

    }

    let promiseArr = [];

    for(let i = 0; i < urlArr.length; i++){

      promiseArr.push(superagent.get(urlArr[i]));

    }

    Promise.all(promiseArr)
    .then( (result) => {

      for(let i =0; i< result.length; i++){
        console.log(result[i].body.name)
      }
    }).catch(err => { if( err ) throw err })

    
  })
};

// this is the asynch function 

const fetchPeolpleWithAsync = async () => {


  let peopleFromSwapi = await superagent.get('https://swapi.co/api/people/');
  let people = (peopleFromSwapi.body && peopleFromSwapi.body.results) || [];
  let peopleRequests = people.map( (person) => {

    return superagent.get(person.url);

  });

  let swapiNames = await Promise.all(peopleRequests)
    .then( people => {
      let names = [];

      for(let data of people) {
        names.push(data.body.name);
      }

      return names;

    });

    return swapiNames;
}


fetchPeopleWithPromises();

fetchPeolpleWithAsync();


