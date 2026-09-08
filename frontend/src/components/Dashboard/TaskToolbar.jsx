 
import {
    Search,
    SlidersHorizontal,
    ArrowUpDown,
    X,
} from "lucide-react";

const TaskToolbar = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
}) => {
    const clearFilters = () => {
        setSearchTerm("");
        setStatusFilter("all");
        setPriorityFilter("all");
        setSortBy("smart");
    };

    const hasFilters =
        searchTerm ||
        statusFilter !== "all" ||
        priorityFilter !== "all" ||
        sortBy !== "smart";

    return (
        <div className="task-toolbar">

            <div className="task-search">
                <Search size={18} />

                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(
                            e.target.value
                        )
                    }
                />

                {searchTerm && (
                    <button
                        type="button"
                        className="search-clear-button"
                        onClick={() =>
                            setSearchTerm("")
                        }
                        aria-label="Clear search"
                    >
                        <X size={15} />
                    </button>
                )}
            </div>

            <div className="task-filters">

                <div className="filter-control">
                    <SlidersHorizontal
                        size={16}
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                    >
                        <option value="all">
                            All Tasks
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="in_progress">
                            In Progress
                        </option>

                        <option value="completed">
                            Completed
                        </option>
                    </select>
                </div>

                <div className="filter-control">

                    <select
                        value={priorityFilter}
                        onChange={(e) =>
                            setPriorityFilter(
                                e.target.value
                            )
                        }
                    >
                        <option value="all">
                            All Priorities
                        </option>

                        <option value="high">
                            High
                        </option>

                        <option value="medium">
                            Medium
                        </option>

                        <option value="low">
                            Low
                        </option>
                    </select>

                </div>

                <div className="filter-control">

                    <ArrowUpDown
                        size={16}
                    />

                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(
                                e.target.value
                            )
                        }
                    >
                        <option value="smart">
                            Smart Sort
                        </option>

                        <option value="priority">
                            Priority
                        </option>

                        <option value="due_date">
                            Due Date
                        </option>

                        <option value="newest">
                            Newest
                        </option>

                        <option value="oldest">
                            Oldest
                        </option>
                    </select>

                </div>

                {hasFilters && (
                    <button
                        type="button"
                        className="clear-filters-button"
                        onClick={
                            clearFilters
                        }
                    >
                        <X size={15} />

                        Clear
                    </button>
                )}

            </div>
        </div>
    );
};

export default TaskToolbar;
 
