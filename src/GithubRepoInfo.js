import * as React from "react";

import { GithubRepoContext } from "./GithubRepoProvider";

export function GithubRepoInfo() {
  const state = React.useContext(GithubRepoContext);

  const isLoading = state.status === "loading";
  const error = state.status === "error" ? state.error : false;

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  // here we know state.status == loaded
  const data = state.data;

  return (
    <div>
      <h1>
        <a href={data.html_url} target="_blank" rel="noopener noreferrer">
          {data.name}
        </a>
      </h1>
      <p>{data.description}</p>
      <strong>
        <span role="img" aria-label="eyes">
          👀
        </span>{" "}
        {data.subscribers_count}
      </strong>{" "}
      <strong>
        <span role="img" aria-label="stars">
          ✨
        </span>{" "}
        {data.stargazers_count}
      </strong>{" "}
      <strong>
        <span role="img" aria-label="forks">
          🍴
        </span>{" "}
        {data.forks_count}
      </strong>
      <div>{isLoading ? "Updating..." : ""}</div>
    </div>
  );
}
