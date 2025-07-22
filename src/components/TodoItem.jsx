import React from 'react';

export default function TodoItem({ todo, onDelete, onEdit }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2 bg-light p-2 rounded shadow-sm">
      <span>{todo.text}</span>
      <div>
        <button onClick={onEdit} className="btn btn-sm btn-warning ms-2">
          <i className="bi bi-pencil"></i> تعديل
        </button>
        <button onClick={onDelete} className="btn btn-sm btn-danger">
          <i className="bi bi-trash"></i> حذف
        </button>
      </div>
    </div>
  );
}
