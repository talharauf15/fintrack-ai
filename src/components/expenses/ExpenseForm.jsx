import React, { useState, useEffect, useCallback } from "react";
import { createExpense } from "../../api/expenseAPI";
import { askChatbot } from "../../api/chatbotAPI";

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Debouncing function for AI category suggestion
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // AI category suggestion function
  const getSuggestedCategory = async description => {
    if (!description.trim() || description.length < 3) return;

    setAiLoading(true);
    try {
      const prompt = `Based on this expense description: "${description}", suggest the most appropriate category from these options: Food,Transportation,Bills,Shopping,Health,Entertainment,Education,Rent,Utilities,Transportation,Taxes,Insurance,Debt Repayment,Childcare,Maintenance,Legal,Gifts & Donations,Pets,Miscellaneous. Reply with only the category name.`;
      const response = await askChatbot(prompt);
      console.log(response);

      // Extract category from response
      const suggestedCategory = response.advice ;
      
      // Ensure suggestedCategory is a string
      const categoryString = typeof suggestedCategory === 'string' 
        ? suggestedCategory 
        : JSON.stringify(suggestedCategory);
        
      const validCategories = [
        "Food",
        "Transportation",
        "Bills",
        "Shopping",
        "Health",
        "Entertainment",
        "Education",
        "Rent",
        "Utilities",
        "Taxes",
        "Insurance",
        "Debt Repayment",
        "Childcare",
        "Maintenance",
        "Legal",
        "Gifts & Donations",
        "Pets",
        "Miscellaneous",
      ];
      const matchedCategory = validCategories.find(cat =>
        categoryString.toLowerCase().includes(cat.toLowerCase())
      );

      if (matchedCategory) {
        setFormData(prev => ({
          ...prev,
          ai_suggested_category: matchedCategory,
        }));
      }
    } catch (error) {
      console.error("❌ AI category suggestion failed:", error);
    } finally {
      setAiLoading(false);
    }
  };

  // Debounced version of getSuggestedCategory
  const debouncedGetCategory = useCallback(
    debounce(description => getSuggestedCategory(description), 2000), 
    []
  );

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Trigger AI suggestion when description changes
    if (name === "description") {
      debouncedGetCategory(value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await createExpense(formData);
      setMessage("✅ Expense added successfully!");
      setFormData({
        description: "",
        amount: "",
        date: "",
        category: "",
        ai_suggested_category: "",
      });
    } catch (error) {
      setMessage("❌ Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">➕ Add Expense</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Uber ride to office"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. 500"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Education">Education</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Taxes">Taxes</option>
            <option value="Insurance">Insurance</option>
            <option value="Debt Repayment">Debt Repayment</option>
            <option value="Childcare">Childcare</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Legal">Legal</option>
            <option value="Gifts & Donations">Gifts & Donations</option>
            <option value="Pets">Pets</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>

        {/* AI Suggested Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            🤖 AI Suggested Category
            {aiLoading && (
              <span className="ml-2 text-blue-500 text-xs">Analyzing...</span>
            )}
          </label>
          <div className="mt-1 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            {aiLoading ? (
              <div className="flex items-center text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                <span className="text-sm">
                  AI is analyzing your description...
                </span>
              </div>
            ) : formData.ai_suggested_category ? (
              <div className="flex items-center justify-between">
                <span className="text-blue-700 font-medium">
                  {formData.ai_suggested_category}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData(prev => ({
                      ...prev,
                      category: prev.ai_suggested_category,
                    }))
                  }
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition"
                >
                  Use This
                </button>
              </div>
            ) : (
              <span className="text-gray-500 text-sm">
                Start typing a description to get AI suggestions
              </span>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          {loading ? "Saving..." : "Add Expense"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center font-medium text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default ExpenseForm;
