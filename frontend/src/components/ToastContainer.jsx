// src/components/ToastContainer.jsx

const Toast = ({ message, type, onDismiss }) => {
  const baseClasses = 'w-full max-w-sm p-4 rounded-lg shadow-lg text-white flex justify-between items-center';
  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type] || typeClasses.info}`}>
      <span>{message}</span>
      <button onClick={onDismiss} className="ml-4 font-bold">&times;</button>
    </div>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onDismiss={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;