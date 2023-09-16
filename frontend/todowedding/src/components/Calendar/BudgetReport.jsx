import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

const BudgetReport = () => {
  const [totalBudget, setTotalBudget] = useState(null);

  //userSeq 받아오기
  const token = useSelector((state) => state.Auth.token);
  const userSeq = token?.userSeq;

  useEffect(() => {
    const fetchTotalBudget = async () => {
      try {
        const response = await axios.post(`http://localhost:8085/member/total`, { userSeq });
        setTotalBudget(response.data);
        console.log('BudgetReport 결과 : ',response.data)
      } catch (error) {
        console.log('총 예산 불러오기 에러 : ', error);
      }
    };

    fetchTotalBudget();
  }, [userSeq]);
  
  return (
    <div>
      { totalBudget && (
          <>
            <p>총 예산 : {totalBudget.marry_total_budget}</p>
            <p>총 수입 : {totalBudget.income_total_cost}</p>
            <p>총 지출 : {totalBudget.budget_total_expense_cost}</p>
          </>
        )
      }
    </div>
  )
}

export default BudgetReport