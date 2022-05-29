import * as React from "react";
import { APP_ID } from "./_app";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export const FIND_PART = gql`
  query FindPart($query: PartQueryInput!) {
    part(query: $query) {
      _id
      name
      price
      image
      carBrand
    }
  }
`;
export default function Test(props) {
  const [searchText, setSearchText] = React.useState("The Matrix Reloaded");
  const { loading, data } = useQuery(FIND_PART, {
    variables: { query: { name: searchText } }
  });

  const part = data ? data.part : null;

  return (
    <div className="App">
      <h1>Find a Movie</h1>
      <span className="subheading">
        The app automatically searches as you type
      </span>
      <div className="title-input">
        <input
          className="fancy-input"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          type="text"
        />
      </div>
      {APP_ID === "<Your App ID>" ? (
        <div className="status important">
          Replace APP_ID with your App ID in index.js
        </div>
      ) : (
        !loading &&
        !part && <div className="status">No movie with that name!</div>
      )}
      {part && (
        <div key={part._id}>
          <h2>{part.name}</h2>
          <div>Year: {part.price}</div>
          <div>Runtime: {part.carBrand}</div>
          <br />
          <img alt={`Poster for ${part.name}`} src={part.image} />
        </div>
      )}
    </div>
  );
}