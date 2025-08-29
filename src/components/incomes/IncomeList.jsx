import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIncomes,
  selectIncomeLoading,
  deleteIncomeThunk,
  updateIncomeThunk,
} from "../../redux/incomeSlice";
import { FaTrash, FaEdit } from "react-icons/fa";

const IncomeList = () => {



  const dispatch = useDispatch();
  const incomes = useSelector(selectIncomes) || [];
  const loading = useSelector(selectIncomeLoading);

  const [editingIncome, setEditingIncome] = useState(null);

  const handleDelete = async id => {
    if (!window.confirm("Are you sure you want to delete this income?")) return;
    dispatch(deleteIncomeThunk(id));
  };

    // Open edit row
    const handleEdit = (income) => {
      setEditingIncome({ ...income }); // clone to avoid mutating store
    };

      // Submit update -> dispatch thunk
  const handleUpdate = (e) => {
    e.preventDefault();
    const { id, ...payload } = editingIncome;
    dispatch(updateIncomeThunk({ id, payload }));
    setEditingIncome(null);
  };

  if (loading) {
    return (
      <div className="w-full bg-white shadow-lg rounded-xl p-6">
        <p className="text-center text-gray-600">Loading incomes...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">💰 Income List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 rounded-lg overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Source</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incomes.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No incomes found
                </td>
              </tr>
            ) : (
              incomes.map(inc => (
                <React.Fragment key={inc.id}>
                  {/* Normal Row */}
                  <tr className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 px-4">{inc.id}</td>
                    <td className="py-2 px-4">
                      {inc.source || inc.description}
                    </td>
                    <td className="py-2 px-4">${inc.amount}</td>
                    <td className="py-2 px-4">{inc.category}</td>
                    <td className="py-2 px-4">
                      {new Date(inc.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 text-center flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(inc)}
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(inc.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>

                  {/* Edit Form Row (only visible if editing this income) */}
                  {editingIncome?.id === inc.id && (
                    <tr>
                      <td colSpan="6" className="bg-gray-100 p-4">
                        <form
                          onSubmit={handleUpdate}
                          className="flex gap-2 items-center"
                        >
                          <input
                            type="text"
                            value={
                              editingIncome.source || editingIncome.description
                            }
                            onChange={e =>
                              setEditingIncome({
                                ...editingIncome,
                                source: e.target.value,
                              })
                            }
                            className="border p-2 rounded w-1/3"
                            placeholder="Source"
                          />
                          <input
                            type="number"
                            value={editingIncome.amount}
                            onChange={e =>
                              setEditingIncome({
                                ...editingIncome,
                                amount: e.target.value,
                              })
                            }
                            className="border p-2 rounded w-1/4"
                            placeholder="Amount"
                          />
                          <input
                            type="text"
                            value={editingIncome.category}
                            onChange={e =>
                              setEditingIncome({
                                ...editingIncome,
                                category: e.target.value,
                              })
                            }
                            className="border p-2 rounded w-1/4"
                            placeholder="Category"
                          />
                          <button
                            type="submit"
                            className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingIncome(null)}
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

export default IncomeList;