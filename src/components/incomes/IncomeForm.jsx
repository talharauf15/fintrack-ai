import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createIncomeThunk } from "../../redux/incomeSlice";
import { askChatbot } from "../../api/chatbotAPI";

const IncomeForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
    category: "",
    ai_suggested_category: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Debouncing
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // AI category suggestion for income
  const getSuggestedCategory = async description => {
    if (!description.trim() || description.length < 3) return;

    setAiLoading(true);
    try {
      const prompt = `Based on this income description: "${description}", suggest the most appropriate category from these options: Salary,Business,Investment,Freelancing,Rental Income,Dividends,Interest,Capital Gains,Pension,Annuity,Social Security,Royalties,Gambling Winnings,Alimony,Child Support,Grants,Scholarship,Tax Refund,Sale of Assets,Gift,Inheritance,Other. Reply with only the category name.`;

      const response = await askChatbot(prompt);
      const suggestedCategory = response.advice;

      const categoryString =
        typeof suggestedCategory === "string"
          ? suggestedCategory
          : JSON.stringify(suggestedCategory);

      const validCategories = [
        "Salary",
        "Business",
        "Investment",
        "Freelancing",
        "Rental Income",
        "Dividends",
        "Interest",
        "Capital Gains",
        "Pension",
        "Annuity",
        "Social Security",
        "Royalties",
        "Gambling Winnings",
        "Alimony",
        "Child Support",
        "Grants",
        "Scholarship",
        "Tax Refund",
        "Sale of Assets",
        "Gift",
        "Inheritance",
        "Other",
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

  const debouncedGetCategory = useCallback(
    debounce(description => getSuggestedCategory(description), 2000),
    []
  );

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "description") {
      debouncedGetCategory(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await dispatch(createIncomeThunk(formData)).unwrap();
      setMessage("✅ Income added successfully!");
      setFormData({
        description: "",
        amount: "",
        date: "",
        category: "",
        ai_suggested_category: "",
      });
    } catch (error) {
      console.error("❌ Create income failed:", error);
      setMessage("❌ Failed to add income");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">➕ Add Income</h2>

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
            placeholder="e.g. Salary for August"
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
            placeholder="e.g. 10000"
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
            <option value="Salary">Salary</option>
            <option value="Business">Business</option>
            <option value="Investment">Investment</option>
            <option value="Freelancing">Freelancing</option>
            <option value="Rental Income">Rental Income</option>
            <option value="Dividends">Dividends</option>
            <option value="Interest">Interest</option>
            <option value="Capital Gains">Capital Gains</option>
            <option value="Pension">Pension</option>
            <option value="Annuity">Annuity</option>
            <option value="Social Security">Social Security</option>
            <option value="Royalties">Royalties</option>
            <option value="Gambling Winnings">Gambling Winnings</option>
            <option value="Alimony">Alimony</option>
            <option value="Child Support">Child Support</option>
            <option value="Grants">Grants</option>
            <option value="Scholarship">Scholarship</option>
            <option value="Tax Refund">Tax Refund</option>
            <option value="Sale of Assets">Sale of Assets</option>
            <option value="Gift">Gift</option>
            <option value="Inheritance">Inheritance</option>
            <option value="Other">Other</option>
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
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          {loading ? "Saving..." : "Add Income"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center font-medium text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default IncomeForm;
