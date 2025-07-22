import React, { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

function Home() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add new todo or update existing one
  const addOrUpdateTodo = (text) => {
    if (editingTodo) {
      // Update existing todo
      setTodos(todos.map(todo => 
        todo.id === editingTodo.id 
          ? { ...todo, text: text.trim() }
          : todo
      ));
      setEditingTodo(null);
    } else {
      // Add new todo
      const newTodo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([newTodo, ...todos]);
    }
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    if (editingTodo && editingTodo.id === id) {
      setEditingTodo(null);
    }
  };

  // Start editing todo
  const startEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingTodo(null);
  };

  // Toggle todo completion
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  // Clear all completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Get statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 position-relative" dir="rtl" style={{ padding: '20px', width: '100vw', height: '100vh' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '700px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-primary mb-2">
              <i className="bi bi-journal-check"></i> تطبيق قائمة المهام
            </h1>
            <p className="text-muted">نظم مهامك وأنجز أهدافك</p>
          </div>

          {/* Statistics */}
          {totalTodos > 0 && (
            <div className="row text-center mb-4">
              <div className="col-4">
                <div className="bg-primary text-white rounded p-2">
                  <div className="h5 mb-1">{totalTodos}</div>
                  <small>المجموع</small>
                </div>
              </div>
              <div className="col-4">
                <div className="bg-success text-white rounded p-2">
                  <div className="h5 mb-1">{completedTodos}</div>
                  <small>مكتملة</small>
                </div>
              </div>
              <div className="col-4">
                <div className="bg-warning text-white rounded p-2">
                  <div className="h5 mb-1">{pendingTodos}</div>
                  <small>معلقة</small>
                </div>
              </div>
            </div>
          )}

          {/* Todo Form */}
          <TodoForm 
            addTodo={addOrUpdateTodo} 
            currentTodo={editingTodo}
            onCancel={cancelEdit}
          />

          {/* Action Buttons */}
          {completedTodos > 0 && (
            <div className="text-center mb-3">
              <button 
                onClick={clearCompleted}
                className="btn btn-outline-danger btn-sm"
              >
                <i className="bi bi-trash"></i> مسح المهام المكتملة ({completedTodos})
              </button>
            </div>
          )}

          {/* Todo List */}
          <div className="todo-list">
            {todos.length === 0 ? (
              <div className="text-center text-muted py-5">
                <i className="bi bi-clipboard-x display-1 text-muted"></i>
                <p className="mt-3">لا توجد مهام بعد</p>
                <p className="small">ابدأ بإضافة مهمتك الأولى أعلاه</p>
              </div>
            ) : (
              todos.map(todo => (
                <TodoItem 
                  key={todo.id}
                  todo={todo}
                  onDelete={() => deleteTodo(todo.id)}
                  onEdit={() => startEditTodo(todo)}
                  onToggleComplete={() => toggleComplete(todo.id)}
                  isEditing={editingTodo && editingTodo.id === todo.id}
                />
              ))
            )}
          </div>

          {/* Footer */}
          <hr />
          <p className="text-center text-muted mt-3 mb-0">
            <i className="bi bi-heart-fill text-danger"></i> تم الإنشاء باستخدام React + Vite
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;