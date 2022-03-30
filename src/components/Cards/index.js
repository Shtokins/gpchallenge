import { useContext, useEffect } from "react";
import { AppContext } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import Grid from "../../core/components/Grid";
import { STATIC_BREADCRUMBS } from "../../core/constants";
import { getCardsColumns } from "../../core/helpers";
export const VIEW_NAME = STATIC_BREADCRUMBS.cards.key;
const columns = getCardsColumns();
const Cards = () => {
  const {
    filters: { [VIEW_NAME]: viewFilters },
    getCards,
    cards,
    setFilters,
    selectCard
  } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    getCards();
  }, []);

  const setGridFilters = e => {
    setFilters(e, VIEW_NAME);
  };

  const onRowClick = cardID => {
    selectCard(cardID, navigate);
  };

  return (
    <div className="basic-component">
      <div className="view-name">{STATIC_BREADCRUMBS.cards.text}</div>
      <div className="grid-block">
        <Grid
          data={cards}
          columns={columns}
          filters={viewFilters}
          rowKey="cardID"
          setFilters={setGridFilters}
          onRowClick={onRowClick}
        />
      </div>
    </div>
  );
};

export default Cards;
