import React from 'react';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light" dir="rtl">
      <div className="card shadow-lg p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card-body">
          <h1 className="text-primary mb-3">
            📝 قائمة المهام
          </h1>

          {/* <h3 className="mb-3">
            <i className="bi bi-card-checklist me-2"></i>
            قائمة المهام
          </h3> */}

          <TodoForm />

          {/* هنا يمكن عرض المهام لاحقًا */}
          <div className="mt-4">
            {/* مثال مهام */}
            <TodoItem todo={{ text: "مهمة 1" }} />
            <TodoItem todo={{ text: "مهمة 2" }} />
          </div>

          <hr />
          <p className="text-center text-muted mt-3">
            (💙React) تم الإنشاء باستخدام 
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;