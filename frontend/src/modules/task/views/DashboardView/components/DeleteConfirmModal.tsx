import { useState } from "react";
import { X, Trash2, Loader2, AlertCircle, AlertTriangle } from "lucide-react";
import { useDeleteTask } from "../../../hooks/useTasks";
import { getApiErrorMessage } from "@core/api/response";
import type { Task } from "../../../types";

interface DeleteConfirmModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteConfirmModal = ({
  task,
  isOpen,
  onClose,
}: DeleteConfirmModalProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const deleteTaskMutation = useDeleteTask();

  if (!isOpen || !task) return null;

  const handleDelete = async () => {
    setErrorMessage(null);
    try {
      await deleteTaskMutation.mutateAsync(task.id);
      onClose();
    } catch (err) {
      setErrorMessage(getApiErrorMessage(err, "Failed to delete task"));
    }
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-task-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-container modal-container--sm">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-title-with-icon">
              <span className="modal-icon-badge modal-icon-badge--danger">
                <AlertTriangle size={18} />
              </span>
              <h2 id="delete-task-title" className="modal-title">
                Delete Task
              </h2>
            </div>
            <p className="modal-subtitle">
              Are you sure you want to delete this task? This action cannot be undone.
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

        {/* Modal Body */}
        <div className="modal-body">
          {errorMessage && (
            <div className="modal-error" role="alert">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="delete-task-preview">
            <span className="delete-task-name">"{task.title}"</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onClose}
            disabled={deleteTaskMutation.isPending}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn--danger"
            onClick={handleDelete}
            disabled={deleteTaskMutation.isPending}
          >
            {deleteTaskMutation.isPending ? (
              <>
                <Loader2 size={16} className="btn-spinner" />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete Task
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
