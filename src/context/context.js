import React, { useReducer, createContext } from 'react';
import contextReducer from './contextReducer.js';
import actionTypes from './action-types';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {

    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    // Action Creators:
    const deleteTransaction = (id) => dispatch({ type: actionTypes.DELETE_TRANSACTION, payload: id });
    const addTransaction = (transaction) => dispatch({ type: actionTypes.ADD_TRANSACTION, payload: transaction });

    const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);

    return (
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction,
            addTransaction,
            transactions,
            balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    );
}