import * as Realm from 'realm-web';


export const APP_ID = 'partsshop-iqmiv';
export const ATLAS_SERVICE = 'mongodb-atlas';
export const app = new Realm.App({ id: APP_ID });
export let user;
// Function executed by the LOGIN button.
export async function login() {
  const credentials = Realm.Credentials.anonymous();
  try {
    user = await app.logIn(credentials);
  } catch (err) {
    console.error('Failed to log in', err);
  }
};

// Function executed by the "FIND 20 MOVIES" button.
export async function findMovies() {
  let collMovies;
  try {
    // Access the movies collection through MDB Realm & the readonly rule.
    const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
    collMovies = mongodb.db('Praktyki').collection('Parts');
  } catch (err) {
    document.getElementById('user').append('Need to login first.');
    console.error('Need to log in first', err);
    return;
  }
  // Retrieve 20 movie titles (only the titles thanks to the projection).
  const movies_titles = await collMovies.find({}, {
    'projection': {
      '_id': 0,
      'name': 1
    },
    'limit': 20
  });
  console.log(movies_titles);
  // Access the movies div and clear it.
  let movies_div = document.getElementById('movies');
  movies_div.innerText = '';
  // Loop through the 20 movie title and display them in the movies div.
  for (const movie of movies_titles) {
    let p = document.createElement('p');
    p.append(movie.name);
    movies_div.append(p);
  }
};

export async function findCategories() {
  try {
    const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
    let categories = mongodb.db("Praktyki").collection("Parts");
    const movies_titles = await categories.find({"isCategory": true}, {
      "projection": {
        "_id": 0,
        "name": 1,
        "image": 2,
        "category": 3,
        "id": 4

      },
      "limit": 20
    });
    return movies_titles;
  } catch (e) {
    console.log(e);
  }
};