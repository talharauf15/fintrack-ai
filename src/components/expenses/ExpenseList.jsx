import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa"; 
import {
  selectExpenses,
  deleteExpenseThunk,
  updateExpenseThunk,
} from "../../redux/expenseSlice";

const ExpenseList = () => {
  const expenses = useSelector(selectExpenses);
  const dispatch = useDispatch();

  const [editingExpense, setEditingExpense] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;

    try {
      await dispatch(deleteExpenseThunk(id)).unwrap();
    } catch (error) {
      console.error("❌ Failed to delete expense", error);
      alert("Failed to delete expense. Try again.");
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await dispatch(updateExpenseThunk({ id, payload: updatedData })).unwrap();
      setEditingExpense(null);
    } catch (err) {
      console.error("❌ Failed to update expense:", err);
    }
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📋 Expense List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500 italic">
                  No expenses found
                </td>
              </tr>
            ) : (
              expenses.map((exp) => (
                <React.Fragment key={exp.id}>
                  <tr className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 px-4">{exp.id}</td>
                    <td className="py-2 px-4">{exp.description}</td>
                    <td className="py-2 px-4">${exp.amount}</td>
                    <td className="py-2 px-4">{exp.category}</td>
                    <td className="py-2 px-4">
                      {new Date(exp.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 text-center flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(exp)}
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>

                  {/* Edit Form Row */}
                  {editingExpense?.id === exp.id && (
                    <tr>
                      <td colSpan="6" className="bg-gray-100 p-4">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdate(exp.id, editingExpense);
                          }}
                          className="flex gap-2 items-center"
                        >
                          <input
                            type="text"
                            value={editingExpense.description}
                            onChange={(e) =>
                              setEditingExpense({
                                ...editingExpense,
                                description: e.target.value,
                              })
                            }
                            className="border p-2 rounded w-1/3"
                          />
                          <input
                            type="number"
                            value={editingExpense.amount}
                            onChange={(e) =>
                              setEditingExpense({
                                ...editingExpense,
                                amount: e.target.value,
                              })
                            }
                            className="border p-2 rounded w-1/4"
                          />
                          <input
                            type="text"
                            value={editingExpense.category}
                            onChange={(e) =>
                              setEditingExpense({
                                ...editingExpense,
                                category: e.target.value,
                              })
                            }
                            className="border p-2 rounded w-1/4"
                          />
                          <button
                            type="submit"
                            className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingExpense(null)}
                            className="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </form>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
