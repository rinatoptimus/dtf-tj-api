import React, { useState, useEffect } from "react";

const PostsList = () => {
  const [initialState, stateChanger] = useState([]);
  const API = "https://api.dtf.ru/v/timeline/gamedev/recent";
  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => stateChanger({ data }));
  }, [stateChanger]);

  const ListOfItems = (props) => {
    const { myData } = props;
    if (!myData || myData.length === 0) return <p>No repos!</p>;

    return (
      <ul>
        {myData.result.map((i) => {
          return <li key={i.id}>{i.title}</li>;
        })}
      </ul>
    );
  };

  return <ListOfItems myData={initialState.data} />;
};

export default PostsList;
