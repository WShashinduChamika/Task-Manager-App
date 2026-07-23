import { useState, useEffect, type FormEvent } from "react";
import { X, Save, Loader2, AlertCircle } from "lucide-react";
import { useUpdateTask } from "../../../hooks/useTasks";
import { getApiErrorMessage } from "@core/api/response";
import type { Task, TaskPriority, TaskStatus } from "../../../types";

interface EditTaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditTaskModal = ({
  task,
  isOpen,
  onClose,
}: EditTaskModalProps) => {
  const todayStr = new Date().toISOString().split("T")[0];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [status, setStatus] = useState<TaskStatus>("PENDING");
  const [dueDate, setDueDate] = useState(todayStr);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateTaskMutation = useUpdateTask();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description ?? "");
      setPriority(task.priority);
      setStatus(task.status);
      setDueDate(task.dueDate ? task.dueDate.split("T")[0] : todayStr);
      setErrorMessage(null);
    }
  }, [task, todayStr]);

  if (!isOpen || !task) return null;

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

    try {
      await updateTaskMutation.mutateAsync({
        id: task.id,
        dto: {
          title: title.trim(),
          description: description.trim() || undefined,
          priority,
          status,
          dueDate: new Date(dueDate).toISOString(),
        },
      });

      onClose();
    } catch (err) {
      setErrorMessage(getApiErrorMessage(err, "Failed to update task"));
    }
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-task-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-container">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 id="edit-task-title" className="modal-title">
              Edit Task
            </h2>
            <p className="modal-subtitle">
              Update task details and save your changes.
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
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
            <label htmlFor="edit-task-title-input" className="form-label">
              Title <span className="form-required">*</span>
            </label>
            <input
              id="edit-task-title-input"
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
            <label htmlFor="edit-task-description-input" className="form-label">
              Description
            </label>
            <textarea
              id="edit-task-description-input"
              rows={3}
              placeholder="Add details or notes about this task…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-task-priority-select" className="form-label">
                Priority
              </label>
              <select
                id="edit-task-priority-select"
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
              <label htmlFor="edit-task-status-select" className="form-label">
                Status
              </label>
              <select
                id="edit-task-status-select"
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
            <label htmlFor="edit-task-duedate-input" className="form-label">
              Due Date <span className="form-required">*</span>
            </label>
            <input
              id="edit-task-duedate-input"
              type="date"
              required
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
              onClick={onClose}
              disabled={updateTaskMutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={updateTaskMutation.isPending}
            >
              {updateTaskMutation.isPending ? (
                <>
                  <Loader2 size={16} className="btn-spinner" />
                  Saving…
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
