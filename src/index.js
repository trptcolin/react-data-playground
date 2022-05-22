import React from "react";
import { createRoot } from "react-dom/client";

import axios from "axios";

const FilterContext = React.createContext(null);

const Filters = ({ children }) => {
  const [filters, setFilters] = React.useState({
    repo: "trptcolin/slowdb",
  });
  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

const RepoChoice = () => {
  const { filters, setFilters } = React.useContext(FilterContext);
  const [repo, setRepo] = React.useState(() => filters.repo);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (filters.repo !== repo) {
      setFilters({ ...filters, repo });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="repo">Repo:</label>
      <input
        value={repo}
        name="repo"
        type="text"
        onChange={(e) => setRepo(e.target.value)}
      />
      <button type="Submit">Submit</button>
    </form>
  );
};

export default function App() {
  return (
    <Filters>
      <GithubRepoProvider>
        <RepoChoice />
        <GithubRepoInfo />
      </GithubRepoProvider>
    </Filters>
  );
}

const GithubRepoContext = React.createContext(null);

function GithubRepoProvider({ children }) {
  const { filters } = React.useContext(FilterContext);
  const [state, setState] = React.useState({ status: "init" });

  React.useEffect(() => {
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
  }, [filters]);

  if (!filters.repo || state.status === "init") {
    return <div>[Enter repo info]</div>;
  }

  return (
    <GithubRepoContext.Provider value={state}>
      {children}
    </GithubRepoContext.Provider>
  );
}

function GithubRepoInfo() {
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
        <a href={data.html_url} target="_blank">
          {data.name}
        </a>
      </h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isLoading ? "Updating..." : ""}</div>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
