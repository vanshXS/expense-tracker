/**
 * Formats a number as Indian Rupees (INR).
 * @param {number} value The number to format.
 * @returns {string} The formatted currency string (e.g., "₹5,000.00").
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(value);
};