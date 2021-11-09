import actionTypes from './action-types.js';

const contextReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.DELETE_TRANSACTION:
            return state.filter(transaction => transaction.id !== action.payload);
            
        case actionTypes.ADD_TRANSACTION:
            return [...state, action.payload];
        
        default:
            return state;
    }
}

export default contextReducer;