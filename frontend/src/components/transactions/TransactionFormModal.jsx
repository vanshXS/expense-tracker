import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/useToast';
import transactionService from '../../services/transactionService';

const TransactionFormModal = ({ isOpen, onClose, onSave, transaction }) => {
  const [formData, setFormData] = useState({
    title: '', amount: '', type: 'EXPENSE', category: '', date: new Date().toISOString().split('T')[0],
  });
  const { addToast } = useToast();
  const isEditing = !!transaction;

  useEffect(() => {
    if (isEditing) {
      setFormData({ ...transaction, amount: transaction.amount.toString() });
    } else {
      setFormData({
        title: '', amount: '', type: 'EXPENSE', category: '', date: new Date().toISOString().split('T')[0],
      });
    }
  }, [transaction, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, amount: parseFloat(formData.amount) };
    try {
      if (isEditing) {
        await transactionService.updateTransaction(transaction.id, payload);
        addToast({ type: 'success', message: 'Transaction updated.' });
      } else {
        await transactionService.addTransaction(payload);
        addToast({ type: 'success', message: 'Transaction added.' });
      }
      onSave();
    } catch (error) {
      addToast({ type: 'error', message: 'Could not save transaction.' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{isEditing ? 'Edit Transaction' : 'Add New Transaction'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">Title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-primary focus:ring-primary"/>
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium">Amount</label>
            <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-primary focus:ring-primary"/>
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium">Type</label>
            <select name="type" id="type" value={formData.type} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-primary focus:ring-primary">
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium">Category</label>
            <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} placeholder="e.g., Food, Salary" className="mt-1 w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-primary focus:ring-primary"/>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium">Date</label>
            <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-primary focus:ring-primary"/>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-hover">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionFormModal;