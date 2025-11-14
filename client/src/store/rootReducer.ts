import { combineReducers } from "@reduxjs/toolkit";
import TransactionState from "./transactionSlice";

const rootReducer = combineReducers({ transaction: TransactionState });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
