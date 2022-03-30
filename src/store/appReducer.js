import * as t from "./actionTypes";

const handlers = {
  [t.CHANGE_BREADCRUMB]: (state, { payload }) => {
    return {
      ...state,
      currentBreadcrumbs: payload
    };
  },

  [t.GET_TRANSACTIONS_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      transactions: payload
    };
  },

  [t.GET_CARDS_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      cards: payload
    };
  },

  [t.SET_FILTERS]: (state, { payload }) => {
    return {
      ...state,
      filters: payload
    };
  },

  [t.SELECT_CARD]: (state, { payload: { selectedCard } }) => {
    return {
      ...state,
      selectedCard
    };
  },

  [t.SELECT_TRANSACTION]: (state, { payload: { selectedTransaction } }) => {
    return {
      ...state,
      selectedTransaction
    };
  },

  [t.GET_TRANSACTION_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      selectedTransaction: payload
    };
  },

  [t.GET_CARD_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      selectedCard: payload
    };
  },

  [t.GET_TRANSACTIONS_BY_CARD]: (state, { payload }) => {
    return {
      ...state,
      ...payload
    };
  },

  DEFAULT: state => state
};

export const appReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
