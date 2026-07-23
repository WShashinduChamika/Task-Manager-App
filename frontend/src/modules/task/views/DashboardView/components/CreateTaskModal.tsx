import { useState, type FormEvent } from "react";
import { X, Plus, Loader2, AlertCircle } from "lucide-react";
import { useCreateTask } from "../../../hooks/useTasks";
import { getApiErrorMessage } from "@core/api/response";
import type { TaskPriority, TaskStatus } from "../../../types";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTaskModal = ({ isOpen, onClose }: CreateTaskModalProps) => {
  const todayStr = new Date().toISOString().split("T")[0];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [status, setStatus] = useState<TaskStatus>("PENDING");
  const [dueDate, setDueDate] = useState(todayStr);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createTaskMutation = useCreateTask();

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setStatus("PENDING");
    setDueDate(todayStr);
    setErrorMessage(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage("Title is required");
      return;
    }

    if (!dueDate) {
      setErrorMessage("Due date is required");
      return;
    }

    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setErrorMessage("Due date cannot be earlier than today");
      return;
    }

    try {
      await createTaskMutation.mutateAsync({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        status,
        dueDate: new Date(dueDate).toISOString(),
      });

      handleClose();
    } catch (err) {
      setErrorMessage(getApiErrorMessage(err, "Failed to create task"));
    }
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-task-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="modal-container">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 id="create-task-title" className="modal-title">
              Create New Task
            </h2>
            <p className="modal-subtitle">
              Add a new task to your dashboard list.
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          {errorMessage && (
            <div className="modal-error" role="alert">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="task-title-input" className="form-label">
              Title <span className="form-required">*</span>
            </label>
            <input
              id="task-title-input"
              type="text"
              required
              maxLength={255}
              placeholder="e.g. Complete quarterly report"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-description-input" className="form-label">
              Description
            </label>
            <textarea
              id="task-description-input"
              rows={3}
              placeholder="Add details or notes about this task…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-priority-select" className="form-label">
                Priority
              </label>
              <select
                id="task-priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="form-select"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-status-select" className="form-label">
                Status
              </label>
              <select
                id="task-status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="form-select"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="task-duedate-input" className="form-label">
              Due Date <span className="form-required">*</span>
            </label>
            <input
              id="task-duedate-input"
              type="date"
              required
              min={todayStr}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={handleClose}
              disabled={createTaskMutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={createTaskMutation.isPending}
            >
              {createTaskMutation.isPending ? (
                <>
                  <Loader2 size={16} className="btn-spinner" />
                  Creating…
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Create Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
