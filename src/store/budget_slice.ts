import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import Balance, { IBalance } from "../data/models/budget";

export const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    balance: <IBalance>{ total: 0, transactions: [] },
  },
  reducers: {
    updateBudget: (state, action) => {
      return {
        ...state,
        balance: {
          total: action.payload.total,
          transactions: action.payload.transactions,
        },
      };
    },
  },
});

export const { updateBudget } = budgetSlice.actions;
export const selectBudget = (state: RootState) => state.budget.balance;

export const budgetReducer = budgetSlice.reducer;
