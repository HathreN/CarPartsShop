import { findCategories, findMovies, login } from './data';

export default function Test() {

  return (
    <div>
      <button onClick={() => {login()}}>button1   </button>
      <button onClick={() => {findCategories()}}>sdasdas</button>
      <div id="movies">

      </div>
      <div id="user">

      </div>
    </div>
  );
}