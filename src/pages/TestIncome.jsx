// src/pages/TestIncome.js
import React, { useEffect } from "react";
import { listIncome, createIncome, getIncome, updateIncome, patchIncome, deleteIncome } from "../api/incomeAPI";

const TestIncome = () => {
  useEffect(() => {
    const testApis = async () => {
      try {
        // 1️⃣ Create new income
        const newIncome = await createIncome({
          amount: 10000,
          category: "Salary",
          description: "Test Salary",
          date: "2025-08-01",
        });
        console.log("✅ Created income:", newIncome);

        // 2️⃣ Get all incomes
        const incomes = await listIncome();
        console.log("✅ All incomes:", incomes);

        // 3️⃣ Get single income
        const income = await getIncome(newIncome.id);
        console.log("✅ Single income:", income);

        // 4️⃣ Update income (PUT)
        const updated = await updateIncome(newIncome.id, {
          amount: 12000,
          category: "Salary",
          description: "Updated Salary",
          date: "2025-08-15",
        });
        console.log("✅ Updated income:", updated);

        // 5️⃣ Partial update (PATCH)
        const patched = await patchIncome(newIncome.id, { amount: 15000 });
        console.log("✅ Patched income:", patched);

        // 6️⃣ Delete income
        const deleted = await deleteIncome(newIncome.id);
        console.log("✅ Deleted income:", deleted);
      } catch (error) {
        console.error("❌ Test failed:", error);
      }
    };

    testApis();
  }, []);

  return <h1>Testing Income APIs... (Check console)</h1>;
};

export default TestIncome;
