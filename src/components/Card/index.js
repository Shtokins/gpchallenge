import { useContext, useEffect } from "react";
import { AppContext } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  CARD_KEYS,
  HUMANIZED_CARD_KEYS,
  STATIC_BREADCRUMBS
} from "../../core/constants";
import { formatValue } from "../../core/helpers";
import { Alert } from "antd";

const Card = () => {
  const { selectedCard, getCard } = useContext(AppContext);
  const { cardID } = useParams();
  useEffect(() => {
    if (!selectedCard || selectedCard.cardID !== cardID) {
      getCard(cardID);
    }
  }, []);
  const navigate = useNavigate();

  const transactionsHandler = () => {
    const path =
      STATIC_BREADCRUMBS.cards.path + `/${selectedCard.cardID}/transactions`;
    navigate(path);
  };

  const list = selectedCard
    ? CARD_KEYS.filter((el, index) => !!index).map(key => (
        <div className="card-value-string" key={key}>
          <div className="name">{HUMANIZED_CARD_KEYS[key] || ""}:</div>
          <div className="value">{formatValue(selectedCard, key)}</div>
        </div>
      ))
    : null;

  return selectedCard ? (
    <div className="basic-component">
      <div className="view-name">Card:{" " + cardID}</div>
      <div className="card-info">{list}</div>
      <div className="link-button" onClick={() => transactionsHandler()}>
        Transactions
      </div>
    </div>
  ) : (
    <Alert message="Transaction not found" type="error" />
  );
};

export default Card;
