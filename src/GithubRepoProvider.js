import * as React from "react";
import axios from "axios";

import { FilterContext } from "./FilterProvider";

export const GithubRepoContext = React.createContext(null);

export function GithubRepoProvider({ children }) {
  const { filters } = React.useContext(FilterContext);
  const [state, setState] = React.useState({ status: "init" });

  React.useEffect(() => {
    console.log(
      "running github useEffect hook for filters.repo:",
      filters.repo
    );
    if (filters.repo === "") {
      return;
    }
    const url = `https://api.github.com/repos/${filters.repo}`;
    setState({ status: "loading" });
    axios
      .get(url)
      .then((res) => {
        console.log(`fetched url: ${url}`);
        setState({ status: "loaded", data: res.data });
      })
      .catch((error) => setState({ status: "error", error }));
  }, [filters.repo]);

  if (!filters.repo || state.status === "init") {
    return <div>[Enter repo info]</div>;
  }

  return (
    <GithubRepoContext.Provider value={state}>
      {children}
    </GithubRepoContext.Provider>
  );
}
