import React from "react";
import { createRoot } from "react-dom/client";

import { FilterProvider } from "./FilterProvider";
import { RepoChoice } from "./RepoChoice";
import { GithubRepoProvider } from "./GithubRepoProvider";
import { GithubRepoInfo } from "./GithubRepoInfo";

export default function App() {
  return (
    <FilterProvider>
      <GithubRepoProvider>
        <RepoChoice />
        <GithubRepoInfo />
      </GithubRepoProvider>
    </FilterProvider>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
