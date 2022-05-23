import * as React from "react";
import { FilterContext } from "./FilterProvider";

export const RepoChoice = () => {
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
