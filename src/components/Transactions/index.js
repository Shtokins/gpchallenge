import { useContext, useEffect } from "react";
import { AppContext } from "../../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "../../core/components/Grid";
import { STATIC_BREADCRUMBS } from "../../core/constants";
import { getTransactionsColumns } from "../../core/helpers";

export const VIEW_NAME = STATIC_BREADCRUMBS.transactions.key;

const columns = getTransactionsColumns();

const Transactions = () => {
  const {
    filters,
    getTransactions,
    transactions,
    setFilters,
    selectTransaction,
    getTransactionsByCard,
    currentBreadcrumbs
  } = useContext(AppContext);
  const { cardID } = useParams();

  const viewName = cardID ? "specifiedTransactions" : VIEW_NAME;

  const viewFilters = filters[viewName];

  useEffect;

  useEffect(() => {
    if (cardID) {
      getTransactionsByCard(cardID);
    } else {
      getTransactions();
    }
  }, [currentBreadcrumbs]);

  const navigate = useNavigate();

  const setGridFilters = e => {
    setFilters(e, viewName);
  };

  const onRowClick = transactionID => {
    selectTransaction(transactionID, navigate, cardID);
  };

  const disabledSearch = cardID ? { cardID: true, cardAccount: true } : {};

  return (
    <div className="basic-component">
      <div className="view-name">{STATIC_BREADCRUMBS.transactions.text}</div>
      <div className="grid-block">
        <Grid
          data={transactions}
          columns={columns}
          filters={viewFilters}
          rowKey="transactionID"
          setFilters={setGridFilters}
          onRowClick={onRowClick}
          disabledSearch={disabledSearch}
          pagination
        />
      </div>
    </div>
  );
};

export default Transactions;
