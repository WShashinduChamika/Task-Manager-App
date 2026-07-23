import { useState } from "react";
import { Search, AlertCircle, ArrowUpDown, Plus, Pencil } from "lucide-react";
import { useTasks } from "../../../hooks/useTasks";
import { CreateTaskModal } from "../components/CreateTaskModal";
import { EditTaskModal } from "../components/EditTaskModal";
import type { Task, TaskStatus } from "../../../types";

type FilterTab = "ALL" | TaskStatus;
type SortOption = "NEWEST" | "OLDEST" | "DUE_DATE";

const STATUS_TABS: { key: FilterTab; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "PENDING", label: "Pending" },
  { key: "IN_PROGRESS", label: "In Progress" },
  { key: "COMPLETED", label: "Completed" },
];

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: "NEWEST", label: "Newest Created" },
  { key: "OLDEST", label: "Oldest Created" },
  { key: "DUE_DATE", label: "Due Date" },
];

const PRIORITY_LABELS: Record<string, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const isOverdue = (dueDate: string, status: string): boolean => {
  if (status === "COMPLETED") return false;
  return new Date(dueDate) < new Date(new Date().setHours(0, 0, 0, 0));
};

const formatDate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getSortParams = (
  sort: SortOption,
): { sortBy: "createdAt" | "dueDate"; sortOrder: "asc" | "desc" } => {
  switch (sort) {
    case "NEWEST":
      return { sortBy: "createdAt", sortOrder: "desc" };
    case "OLDEST":
      return { sortBy: "createdAt", sortOrder: "asc" };
    case "DUE_DATE":
      return { sortBy: "dueDate", sortOrder: "asc" };
  }
};

const sortTaskList = (taskList: Task[], sort: SortOption): Task[] => {
  return [...taskList].sort((a, b) => {
    if (sort === "NEWEST") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sort === "OLDEST") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sort === "DUE_DATE") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });
};

export const DashboardTasksSection = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>("ALL");
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("NEWEST");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const sortParams = getSortParams(sortOption);
  const { tasks, isLoading, isError } = useTasks({
    limit: 100,
    ...sortParams,
  });

  const filtered = tasks.filter((task) => {
    const matchesStatus = activeTab === "ALL" || task.status === activeTab;
    const matchesSearch =
      search.trim() === "" ||
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description ?? "").toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const sortedAndFiltered = sortTaskList(filtered, sortOption);

  return (
    <section className="tasks-section" aria-label="Task list">
      <div className="tasks-section-header">
        <div className="tasks-section-title-group">
          <h2 className="tasks-section-title">My Tasks</h2>
          <span className="tasks-count-badge">{sortedAndFiltered.length} tasks</span>
        </div>
        <button
          type="button"
          id="create-task-open-btn"
          className="btn btn--primary btn--sm"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={16} />
          <span>Create Task</span>
        </button>
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <EditTaskModal
        task={editingTask}
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
      />

      <div className="tasks-controls">
        <div className="tasks-filter-tabs" role="tablist" aria-label="Filter tasks by status">
          {STATUS_TABS.map(({ key, label }) => (
            <button
              key={key}
              id={`tab-${key.toLowerCase()}`}
              role="tab"
              aria-selected={activeTab === key}
              className={`tasks-tab ${activeTab === key ? "tasks-tab--active" : ""}`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="tasks-right-controls">
          <div className="tasks-search-wrapper">
            <Search size={15} className="tasks-search-icon" aria-hidden="true" />
            <input
              id="tasks-search-input"
              type="search"
              placeholder="Search tasks…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="tasks-search-input"
              aria-label="Search tasks"
            />
          </div>

          <div className="tasks-sort-wrapper">
            <ArrowUpDown size={15} className="tasks-sort-icon" aria-hidden="true" />
            <select
              id="tasks-sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="tasks-sort-select"
              aria-label="Sort tasks"
            >
              {SORT_OPTIONS.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>


      {isLoading && (
        <div className="tasks-loading">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="task-row task-row--skeleton" />
          ))}
        </div>
      )}

      {isError && (
        <div className="tasks-error" role="alert">
          <AlertCircle size={18} />
          <span>Failed to load tasks. Please refresh the page.</span>
        </div>
      )}

      {!isLoading && !isError && sortedAndFiltered.length === 0 && (
        <div className="tasks-empty">
          <p className="tasks-empty-title">No tasks found</p>
          <p className="tasks-empty-sub">
            {search ? "Try a different search term." : "You have no tasks yet."}
          </p>
        </div>
      )}

      {!isLoading && !isError && sortedAndFiltered.length > 0 && (
        <div className="tasks-list" role="list">
          {sortedAndFiltered.map((task) => {
            const overdue = isOverdue(task.dueDate, task.status);
            return (
              <div
                key={task.id}
                role="listitem"
                className={`task-row ${overdue ? "task-row--overdue" : ""}`}
              >
                <span
                  className={`task-priority-bar task-priority-bar--${task.priority.toLowerCase()}`}
                  aria-label={`${PRIORITY_LABELS[task.priority]} priority`}
                />

                <div className="task-info">
                  <span className="task-title">{task.title}</span>
                  {task.description && (
                    <span className="task-description">{task.description}</span>
                  )}
                </div>

                <div className="task-badges">
                  <span
                    className={`task-badge task-badge--priority-${task.priority.toLowerCase()}`}
                    aria-label={`Priority: ${PRIORITY_LABELS[task.priority]}`}
                  >
                    {PRIORITY_LABELS[task.priority]}
                  </span>
                  <span
                    className={`task-badge task-badge--status-${task.status.toLowerCase().replace("_", "-")}`}
                    aria-label={`Status: ${STATUS_LABELS[task.status]}`}
                  >
                    {STATUS_LABELS[task.status]}
                  </span>
                </div>

                <div className="task-due-date">
                  <span
                    className={`task-due-date-label ${overdue ? "task-due-date-label--overdue" : ""}`}
                  >
                    {overdue && (
                      <AlertCircle size={12} aria-label="Overdue" />
                    )}
                    {formatDate(task.dueDate)}
                  </span>
                </div>

                <div className="task-actions">
                  <button
                    type="button"
                    className="task-action-btn"
                    onClick={() => setEditingTask(task)}
                    title="Edit task"
                    aria-label={`Edit task: ${task.title}`}
                  >
                    <Pencil size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

