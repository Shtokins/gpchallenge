import { isEmpty } from "lodash";
import moment from "moment";
import currencyFormatter from "currency-formatter";
import {
  TRANSACTION_KEYS,
  CARD_KEYS,
  HUMANIZED_TRANSACTION_KEYS,
  HUMANIZED_CARD_KEYS,
  TRANSACTIONS_FILTERABLE_FIELDS,
  CARDS_FILTERABLE_FIELDS,
  STATIC_BREADCRUMBS,
  DATE_FIELDS,
  MONEY_FIELDS
} from "./constants";

export const getErrorMessage = error =>
  error.response?.data?.message ??
  error?.message ??
  "Error: something went wrong";

export const getFilteredTransactions = (list, filters) => {
  if (isEmpty(filters)) return list;
  return list.filter(el => {
    let filtered = true;
    Object.keys(filters).forEach(key => {
      if (
        filters[key] &&
        DATE_FIELDS[key] &&
        (moment(el[key]) > filters[key][1] || moment(el[key]) < filters[key][0])
      ) {
        filtered = false;
      } else if (key === "amount") {
        const entered = filters[key].replaceAll(",", ".");
        const value = el[key].toFixed(2).toString();
        if (!value.includes(entered)) {
          filtered = false;
        }
      } else if (
        filters[key] &&
        !DATE_FIELDS[key] &&
        !el[key].toString().toLowerCase().includes(filters[key].toLowerCase())
      ) {
        filtered = false;
      }
    });
    return filtered;
  });
};

export const getTransactionsColumns = () => {
  return TRANSACTION_KEYS.map(key => ({
    title: HUMANIZED_TRANSACTION_KEYS[key],
    dataIndex: key,
    key,
    filterable: TRANSACTIONS_FILTERABLE_FIELDS[key],
    align: "center",
    render: (_, record) => formatValue(record, key)
  }));
};

// const getTableRender = (key, text, record) => {
//   if (DATE_FIELDS[key]) return moment(text).format("LLL");
//   if (key === "status")
//     return (
//       <span className={text === "active" ? "active" : "alarmed"}>{text}</span>
//     );
//   if (MONEY_FIELDS[key]) {
//     return <strong>{formatAmount(text, record.currency)}</strong>;
//   }
//   return text;
// };

export const formatAmount = (text, currency) =>
  currencyFormatter.format(text, {
    code: currency,
    format: "%s %v"
  });

export const formatValue = (obj, key) => {
  if (MONEY_FIELDS[key]) {
    return (
      <div className="money-cell">{formatAmount(obj[key], obj.currency)}</div>
    );
  }
  if (DATE_FIELDS[key]) return moment(obj[key]).format("LLL");
  if (key === "status")
    return (
      <span className={obj[key] === "active" ? "active" : "alarmed"}>
        {obj[key]}
      </span>
    );
  return obj[key];
};

export const getCardsColumns = () => {
  return CARD_KEYS.map(key => ({
    title: HUMANIZED_CARD_KEYS[key],
    dataIndex: key,
    key,
    filterable: CARDS_FILTERABLE_FIELDS[key],
    align: "center",
    render: (_, record) => formatValue(record, key)
  }));
};

export const getBreadcrumbsFromPath = () => {
  const path = window.location.pathname.split("/");
  const breadcrumbs = ["home"];
  path.forEach(el => {
    if (STATIC_BREADCRUMBS[el]) {
      breadcrumbs.push(el);
    } else {
      return;
    }
  });
};

export const getUrlParams = pathname => {
  let transactionID;
  let cardID = pathname.split(STATIC_BREADCRUMBS.cards.path + "/")[1];
  if (cardID) cardID = cardID.split("/")[0];
  const transactionIDPath = pathname.split(
    STATIC_BREADCRUMBS.transactions.path + "/"
  )[1];
  if (transactionIDPath) transactionID = transactionIDPath.split("/")[0];
  if (transactionID && !cardID) {
    cardID = transactionIDPath.split("/")[1];
  }
  return { cardID, transactionID };
};
