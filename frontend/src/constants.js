
export const categories = [
    'Food', 'Transport', 'Housing', 'Utilities', 'Entertainment', 'Health', 
    'Social', 'Electronics', 'Gifts', 'Salary', 'Freelance', 'Investments', 'Part-time', 'Other'
];
export const expenseCategories = categories.filter(c => !['Salary', 'Freelance', 'Investments', 'Part-time'].includes(c));
export const incomeCategories = ['Salary', 'Freelance', 'Investments', 'Part-time', 'Other'];