import React, { useState, useEffect, useRef } from "react";

export default function SearchPosts() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const focusSearch = useRef(null);

  const DTF = "https://api.dtf.ru/v/query=";

  const getPosts = async (query) => {
    const results = await fetch(`${DTF}${query}`, {
      headers: { accept: "application/json" }
    });
    const postsData = await results.json();
    return postsData.results;
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    let currentQuery = true;
    const controller = new AbortController();

    const loadPosts = async () => {
      if (!query) return setPosts([]);

      await sleep(350);
      if (currentQuery) {
        const posts = await getPosts(query, controller);
        setPosts(posts);
      }
    };
    loadPosts();

    return () => {
      currentQuery = false;
      controller.abort();
    };
  }, [query]);

  let PostComponents = posts.map((post, index) => {
    return (
      <ul>
        <li key={index}>{post.post}</li>
        <PostComponents />
      </ul>
    );
  });

  return (
    <>
      <div>
        <div id="search-form">
          <h4>Posts</h4>
          <input
            type="email"
            placeholder="Найти пост"
            ref={focusSearch}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>

        <p>{/* <PostComponents /> 1111 */}</p>
        <p>{posts} 1111</p>
      </div>
    </>
  );
}

//5034eecca8a48f0cbd47de84f3d816d44fccc256b5d9155935b4f2781844c218
//https://www.notion.so/API-TJ-vc-ru-DTF-3f5162d2cb184f6381ff82c085bbb3c0
