import React, { useState, useEffect } from 'react';

export default function TodoForm({ addTodo, currentTodo, onCancel }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (currentTodo) {
      setText(currentTodo.text);
    } else {
      setText('');
    }
  }, [currentTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      return;
    }
    addTodo(text);
    setText('');
  };

  const handleCancel = () => {
    setText('');
    onCancel();
  };

  return (
    <div className="todo-form mb-4">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder={currentTodo ? "تعديل المهمة..." : "أضف مهمة جديدة..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            maxLength={200}
          />
          <button 
            className={`btn ${currentTodo ? 'btn-success' : 'btn-primary'} btn-lg`} 
            type="submit"
            disabled={!text.trim()}
          >
            <i className={`bi ${currentTodo ? 'bi-check-lg' : 'bi-plus-lg'}`}></i>
            {currentTodo ? 'تحديث' : 'إضافة'}
          </button>
        </div>
        
        {currentTodo && (
          <div className="text-center">
            <button 
              type="button"
              onClick={handleCancel}
              className="btn btn-outline-secondary btn-sm"
            >
              <i className="bi bi-x-lg"></i> إلغاء التعديل
            </button>
          </div>
        )}
      </form>
      
      {text.length > 0 && (
        <div className="text-end">
          <small className="text-muted">{text.length}/200</small>
        </div>
      )}
    </div>
  );
}