import actionTypes from './action-types.js';

let transactions;
const contextReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.DELETE_TRANSACTION:
            transactions = state.filter(transaction => transaction.id !== action.payload);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            return transactions;
            
        case actionTypes.ADD_TRANSACTION:
            transactions = [...state, action.payload];
            localStorage.setItem('transactions', JSON.stringify(transactions));
            return transactions;
        
        default:
            return state;
    }
}

export default contextReducer;