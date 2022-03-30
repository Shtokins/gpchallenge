import React, { useReducer } from "react";
import { AppContext } from "./appContext";
import { appReducer } from "./appReducer";
import * as t from "./actionTypes";
import { STATIC_BREADCRUMBS } from "../core/constants";
import { getErrorMessage, getFilteredTransactions } from "../core/helpers";
import { transactions as mockedTransactions } from "../mockData/transactions";
import { cards as mockedCards } from "../mockData/cards";
import { initialState } from "./initialState";
import { VIEW_NAME as transactionsViewName } from "../components/Transactions";
import { VIEW_NAME as cardsViewName } from "../components/Cards";
import { debounce } from "throttle-debounce";

export const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const {
    currentBreadcrumbs,
    transactions,
    cards,
    selectedCardId,
    selectedTransactionId,
    filters,
    selectedCard,
    selectedTransaction
  } = state;

  const getTransactions = incomingFilters => {
    const operationalFilters = incomingFilters || filters[transactionsViewName];
    try {
      const response = getFilteredTransactions(
        mockedTransactions,
        operationalFilters
      );
      getTransactionsSuccess(response);
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message);
    }
  };

  const getTransactionsSuccess = payload => {
    dispatch({
      type: t.GET_TRANSACTIONS_SUCCESS,
      payload
    });
  };

  const getCards = async incomingFilters => {
    const operationalFilters = incomingFilters || filters[cardsViewName];
    try {
      const response = getFilteredTransactions(mockedCards, operationalFilters);
      getCardsSuccess(response);
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message);
    }
  };

  const getCardsSuccess = payload => {
    dispatch({
      type: t.GET_CARDS_SUCCESS,
      payload
    });
  };

  const setFilters = ({ name, value }, viewName) => {
    const newFilters = {
      ...filters,
      [viewName]: { ...filters[viewName], [name]: value }
    };
    dispatch({
      type: t.SET_FILTERS,
      payload: newFilters
    });
    getFilteredCallback(newFilters, viewName);
  };

  const getFilteredCallback = debounce(300, (newFilters, viewName) => {
    if (
      viewName === STATIC_BREADCRUMBS.transactions.key ||
      viewName === "specifiedTransactions"
    ) {
      getTransactions(newFilters[viewName]);
    } else {
      getCards(newFilters[viewName]);
    }
  });

  const changeBreadcrumb = payload => {
    dispatch({
      type: t.CHANGE_BREADCRUMB,
      payload
    });
  };

  const selectCard = (cardID, navigate) => {
    const path = STATIC_BREADCRUMBS.cards.path + `/${cardID}`;
    navigate(path);
    const selectedCard = cards.find(el => el.cardID === cardID);
    dispatch({
      type: t.SELECT_CARD,
      payload: { selectedCard }
    });
  };

  const selectTransaction = (transactionID, navigate, cardID) => {
    const path = cardID
      ? `${STATIC_BREADCRUMBS.cards.path}/${cardID}${STATIC_BREADCRUMBS.transactions.path}/${transactionID}`
      : `${STATIC_BREADCRUMBS.transactions.path}/${transactionID}`;
    navigate(path);
    const selectedTransaction = cards.find(el => el.cardID === transactionID);
    dispatch({
      type: t.SELECT_TRANSACTION,
      payload: { selectedTransaction }
    });
  };

  const getTransaction = transactionID => {
    try {
      const response = mockedTransactions.filter(
        el => el.transactionID === transactionID
      );
      getTransactionSuccess(response && response[0]);
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message);
    }
  };

  const getTransactionSuccess = payload => {
    dispatch({
      type: t.GET_TRANSACTION_SUCCESS,
      payload
    });
  };

  const getCard = cardID => {
    try {
      const response = mockedCards.filter(el => el.cardID === cardID);
      getCardSuccess(response && response[0]);
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message);
    }
  };

  const getCardSuccess = payload => {
    dispatch({
      type: t.GET_CARD_SUCCESS,
      payload
    });
  };

  const getTransactionsByCard = cardID => {
    try {
      let card;
      const payload = {};

      if (!selectedCard || selectedCard.cardID !== cardID) {
        card = mockedCards.find(el => el.cardID === cardID);
        payload.selectedCard = card;
      } else {
        card = selectedCard;
      }

      payload.filters = {
        ...filters,
        specifiedTransactions: {
          ...filters.specifiedTransactions,
          cardID: card.cardID,
          cardAccount: card.cardAccount
        }
      };

      payload.transactions = getFilteredTransactions(
        mockedTransactions,
        payload.filters.specifiedTransactions
      );

      dispatch({
        type: t.GET_TRANSACTIONS_BY_CARD,
        payload
      });
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentBreadcrumbs,
        transactions,
        cards,
        selectedCardId,
        selectedTransactionId,
        filters,
        selectedTransaction,
        selectedCard,
        getTransactions,
        getCards,
        setFilters,
        changeBreadcrumb,
        selectCard,
        selectTransaction,
        getTransaction,
        getCard,
        // openTransactionsForCard,
        getTransactionsByCard
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
