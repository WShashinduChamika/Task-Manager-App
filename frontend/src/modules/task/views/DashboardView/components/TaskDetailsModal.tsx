import {
  X,
  Calendar,
  Clock,
  RefreshCw,
  AlertCircle,
  Pencil,
} from "lucide-react";
import type { Task } from "../../../types";

interface TaskDetailsModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (task: Task) => void;
}

const PRIORITY_LABELS: Record<string, string> = {
  LOW: "Low Priority",
  MEDIUM: "Medium Priority",
  HIGH: "High Priority",
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
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTimestamp = (isoDate: string): string => {
  return new Date(isoDate).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const TaskDetailsModal = ({
  task,
  isOpen,
  onClose,
  onEdit,
}: TaskDetailsModalProps) => {
  if (!isOpen || !task) return null;

  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-details-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-container">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 id="task-details-title" className="modal-title">
              Task Details
            </h2>
            <div className="task-details-badges">
              <span
                className={`task-badge task-badge--priority-${task.priority.toLowerCase()}`}
              >
                {PRIORITY_LABELS[task.priority]}
              </span>
              <span
                className={`task-badge task-badge--status-${task.status.toLowerCase().replace("_", "-")}`}
              >
                {STATUS_LABELS[task.status]}
              </span>
            </div>
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

        {/* Modal Body */}
        <div className="task-details-body">
          {/* Overdue Warning */}
          {overdue && (
            <div className="task-details-overdue-banner" role="alert">
              <AlertCircle size={18} />
              <div>
                <strong>Overdue Task</strong>
                <p>This task passed its due date on {formatDate(task.dueDate)}.</p>
              </div>
            </div>
          )}

          {/* Title */}
          <div className="task-details-section">
            <h3 className="task-details-heading">{task.title}</h3>
          </div>

          {/* Description */}
          <div className="task-details-section">
            <h4 className="task-details-label">Description</h4>
            <div className="task-details-description">
              {task.description ? (
                <p>{task.description}</p>
              ) : (
                <span className="task-details-no-desc">No description provided for this task.</span>
              )}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="task-details-grid">
            <div className="task-detail-item">
              <span className="task-detail-icon">
                <Calendar size={16} />
              </span>
              <div className="task-detail-content">
                <span className="task-detail-label">Due Date</span>
                <span className={`task-detail-value ${overdue ? "task-detail-value--overdue" : ""}`}>
                  {formatDate(task.dueDate)}
                </span>
              </div>
            </div>

            <div className="task-detail-item">
              <span className="task-detail-icon">
                <Clock size={16} />
              </span>
              <div className="task-detail-content">
                <span className="task-detail-label">Created At</span>
                <span className="task-detail-value">{formatTimestamp(task.createdAt)}</span>
              </div>
            </div>

            <div className="task-detail-item">
              <span className="task-detail-icon">
                <RefreshCw size={16} />
              </span>
              <div className="task-detail-content">
                <span className="task-detail-label">Last Updated</span>
                <span className="task-detail-value">{formatTimestamp(task.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          {onEdit && (
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => {
                onClose();
                onEdit(task);
              }}
            >
              <Pencil size={15} />
              <span>Edit Task</span>
            </button>
          )}
          <button
            type="button"
            className="btn btn--primary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
