import React, { useState, useEffect } from 'react';

export default function TodoForm({ addTodo, currentTodo }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (currentTodo) {
      setText(currentTodo.text);
    }
  }, [currentTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form mb-3 d-flex">
      <input
        type="text"
        className="form-control"
        placeholder="أضف مهمة جديدة..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn btn-dark ms-2" type="submit">
        {currentTodo ? 'تحديث' : 'إضافة'}
      </button>
    </form>
  );
}
