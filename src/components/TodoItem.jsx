import React from 'react';

export default function TodoItem({ todo, onDelete, onEdit, onToggleComplete, isEditing }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`card mb-3 ${isEditing ? 'border-warning shadow-sm' : ''} ${todo.completed ? 'bg-light' : ''}`}>
      <div className="card-body p-3">
        <div className="d-flex align-items-start">
          {/* Checkbox */}
          <div className="form-check me-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={todo.completed}
              onChange={onToggleComplete}
              id={`todo-${todo.id}`}
            />
          </div>

          {/* Todo Content */}
          <div className="flex-grow-1">
            <label 
              htmlFor={`todo-${todo.id}`}
              className={`form-check-label ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {todo.text}
            </label>
            {todo.createdAt && (
              <div className="mt-1">
                <small className="text-muted">
                  <i className="bi bi-clock"></i> {formatDate(todo.createdAt)}
                </small>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="btn-group" role="group">
            <button 
              onClick={onEdit}
              className={`btn btn-sm ${isEditing ? 'btn-warning' : 'btn-outline-warning'}`}
              title="تعديل المهمة"
              disabled={todo.completed}
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button 
              onClick={onDelete}
              className="btn btn-sm btn-outline-danger"
              title="حذف المهمة"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>

        {/* Editing indicator */}
        {isEditing && (
          <div className="mt-2">
            <small className="text-warning">
              <i className="bi bi-pencil-square"></i> جاري التعديل...
            </small>
          </div>
        )}

        {/* Completed indicator */}
        {todo.completed && (
          <div className="mt-2">
            <small className="text-success">
              <i className="bi bi-check-circle-fill"></i> مكتملة
            </small>
          </div>
        )}
      </div>
    </div>
  );
}