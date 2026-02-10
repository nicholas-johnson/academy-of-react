import { useSelector, useDispatch } from "react-redux";
import { setFilter, selectFilter } from "../battleSlice";
import { STATUSES } from "../data/statuses";

export function FilterTabs() {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  return (
    <div className="filter-tabs">
      {["all", ...STATUSES].map((status) => (
        <button
          key={status}
          className={filter === status ? "tab active" : "tab"}
          onClick={() => handleFilterChange(status)}
        >
          {status}
        </button>
      ))}
    </div>
  );
}
