import React from "react";
import "./styles.css";
import Search from "./components/Search";
import PostsList from "./components/PostsList";

export default function App() {
  return (
    <div className="App">
      <Search />
      <PostsList />
    </div>
  );
}
