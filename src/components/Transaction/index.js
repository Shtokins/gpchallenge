import { useContext, useEffect } from "react";
import { AppContext } from "../../store/appContext";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import {
  TRANSACTION_KEYS,
  HUMANIZED_TRANSACTION_KEYS,
  STATIC_BREADCRUMBS
} from "../../core/constants";
import { formatValue } from "../../core/helpers";
import { Alert } from "antd";

const Transaction = () => {
  const { selectedTransaction, getTransaction } = useContext(AppContext);
  const { transactionID } = useParams();
  useEffect(() => {
    if (!selectedTransaction) {
      getTransaction(transactionID);
    }
  }, []);
  const navigate = useNavigate();

  const cardHandler = cardID => {
    const path =
      STATIC_BREADCRUMBS.transactions.path + `/${transactionID}/${cardID}`;
    navigate(path);
  };

  const list = selectedTransaction
    ? TRANSACTION_KEYS.filter((el, index) => !!index).map(key => (
        <div className="card-value-string" key={key}>
          <div className="name">{HUMANIZED_TRANSACTION_KEYS[key] || ""}:</div>
          {key === "cardID" ? (
            <div
              className="value linked"
              onClick={() => cardHandler(selectedTransaction[key])}
            >
              {formatValue(selectedTransaction, key)}
            </div>
          ) : (
            <div className="value">{formatValue(selectedTransaction, key)}</div>
          )}
        </div>
      ))
    : null;

  return selectedTransaction ? (
    <div className="basic-component">
      <div className="view-name">Transaction:{" " + transactionID}</div>
      <div>
        <div className="card-info">{list}</div>
      </div>
    </div>
  ) : (
    <Alert message="Transaction not found" type="error" />
  );
};

export default Transaction;
