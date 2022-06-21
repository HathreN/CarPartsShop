import * as Realm from 'realm-web';


export const APP_ID = 'partsshop-iqmiv';
export const app = new Realm.App({ id: APP_ID });
export let user;
// Function executed by the LOGIN button.
export async function login() {
  const credentials = Realm.Credentials.anonymous();
  try {
    user = await app.logIn(credentials);
    localStorage.setItem('UID', user.id)
    console.log('user zapisany')
  } catch (err) {
    console.error('Failed to log in', err);
  }
};

