export const STATIC_BREADCRUMBS = {
  home: { text: "Home", path: "/transactions" },
  transactions: {
    key: "transactions",
    text: "Transactions",
    path: "/transactions"
  },
  cards: { key: "cards", text: "Cards", path: "/cards" }
};

export const AREAS_BY_ID = {
  transactionID: "transactions",
  cardID: "cards"
};

export const TRANSACTION_KEYS = [
  "transactionID",
  "cardAccount",
  "cardID",
  "amount",
  "currency",
  "transactionDate",
  "merchantInfo"
];

export const CARD_KEYS = [
  "cardID",
  "cardAccount",
  "maskedCardNumber",
  "expireDate",
  "currency",
  "balance",
  "status"
];

export const HUMANIZED_TRANSACTION_KEYS = {
  transactionID: "Transaction ID",
  cardAccount: "Card Account",
  cardID: "Card ID",
  amount: "Amount",
  currency: "Currency",
  transactionDate: "Transaction Date",
  merchantInfo: "Merchant Info"
};

export const HUMANIZED_CARD_KEYS = {
  cardID: "Card ID",
  cardAccount: "Card Account",
  maskedCardNumber: "Masked Card Number",
  expireDate: "Expire Date",
  currency: "Currency",
  balance: "Balance",
  status: "Status"
};

export const TRANSACTIONS_FILTERABLE_FIELDS = {
  transactionDate: true,
  currency: true,
  amount: true,
  cardID: true,
  cardAccount: true
};

export const CARDS_FILTERABLE_FIELDS = {
  cardID: true,
  cardAccount: true,
  currency: true,
  status: true
};

export const FILTER_ENUMS = {
  currency: ["AZN", "EUR", "USD"],
  status: ["active", "blocked"]
};

export const DATE_FIELDS = {
  transactionDate: true
};

export const MONEY_FIELDS = {
  amount: true,
  balance: true
};
