import { useCallback, useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import TransactionFormModal from '../components/transactions/TransactionFormModal';
import { useToast } from '../hooks/useToast';
import transactionService from '../services/transactionService';
import { formatCurrency } from '../utils/currencyFormatter';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ title: '', type: '', category: '' });
  const { addToast } = useToast();

  // ✅ Fetch transactions with active filters
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v != null && v !== '')
      );
      const data = await transactionService.getAllTransactions(activeFilters);
      setTransactions(data || []);
    } catch (error) {
      console.error('Fetch error:', error);
      addToast({ type: 'error', message: 'Could not fetch transactions.' });
    } finally {
      setLoading(false);
    }
  }, [filters, addToast]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleAddClick = () => {
    setCurrentTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (transaction) => {
    setCurrentTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionService.deleteTransaction(id);
        addToast({ type: 'success', message: 'Transaction deleted.' });
        fetchTransactions();
      } catch (error) {
        console.error('Delete error:', error);
        addToast({ type: 'error', message: 'Could not delete transaction.' });
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSave = () => {
    setIsModalOpen(false);
    fetchTransactions();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold">Transactions</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
            A list of all your financial transactions.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={handleAddClick}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-hover focus:outline-none"
          >
            <FaPlus className="-ml-1 mr-2 h-5 w-5" />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4">
        <input
          type="text"
          name="title"
          placeholder="Filter by title..."
          value={filters.title}
          onChange={handleFilterChange}
          className="block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-primary focus:ring-primary sm:text-sm"
        />
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="">All Types</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
        <input
          type="text"
          name="category"
          placeholder="Filter by category..."
          value={filters.category}
          onChange={handleFilterChange}
          className="block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-primary focus:ring-primary sm:text-sm"
        />
        <button
          onClick={fetchTransactions}
          className="rounded-md bg-gray-200 dark:bg-gray-600 px-4 py-2 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-500"
        >
          Apply Filters
        </button>
      </div>

      {/* Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">Title</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold">Category</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold">Type</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold">Amount</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold">Date</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Edit</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-10">
                        <FaSpinner className="animate-spin h-8 w-8 mx-auto" />
                      </td>
                    </tr>
                  ) : transactions.length > 0 ? (
                    transactions.map((t) => (
                      <tr key={t.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">{t.title}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{t.category}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            t.type === 'INCOME'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {t.type}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatCurrency(t.amount)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {new Date(t.date).toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button onClick={() => handleEditClick(t)} className="p-1 text-primary hover:text-primary-hover mr-2"><FaEdit /></button>
                          <button onClick={() => handleDelete(t.id)} className="p-1 text-red-600 hover:text-red-800"><FaTrash /></button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-gray-500">No transactions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TransactionFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleFormSave}
          transaction={currentTransaction}
        />
      )}
    </div>
  );
};

export default Transactions;
