import React from "react";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GithubRepoInfo
        url={"https://api.github.com/repos/trptcolin/consistency_fail"}
      />
      <GithubRepoInfo
        url={"https://api.github.com/repos/functional-koans/clojure-koans"}
      />

      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

function GithubRepoInfo({ url }) {
  const { isLoading, error, data, isFetching } = useQuery(
    ["githubRepo", url],
    () =>
      axios.get(url).then((res) => {
        console.log(`fetched url: ${url}`);
        return res.data;
      })
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
