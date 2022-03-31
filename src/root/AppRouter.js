import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Transactions from "../components/Transactions";
import Transaction from "../components/Transaction";
import Cards from "../components/Cards";
import Card from "../components/Card";
import { STATIC_BREADCRUMBS } from "../core/constants";
import TopBar from "./TopBar";
import Breadcrumbs from "./Breadcrumbs";
import { Layout } from "antd";
const { Content } = Layout;

const AppRouter = () => {
  return (
    <Router>
      <TopBar />
      <Breadcrumbs />
      <Content>
        <Routes>
          <Route path="/" element={<Navigate to="/transactions" />} />
          <Route
            path={STATIC_BREADCRUMBS.transactions.path}
            element={<Transactions />}
          />
          <Route
            path={`${STATIC_BREADCRUMBS.transactions.path}/:transactionID`}
            element={<Transaction />}
          />
          <Route
            path={`${STATIC_BREADCRUMBS.transactions.path}/:transactionID/:cardID`}
            element={<Card />}
          />
          <Route path={STATIC_BREADCRUMBS.cards.path} element={<Cards />} />
          <Route
            path={`${STATIC_BREADCRUMBS.cards.path}/:cardID`}
            element={<Card />}
          />
          <Route
            path={`${STATIC_BREADCRUMBS.cards.path}/:cardID${STATIC_BREADCRUMBS.transactions.path}`}
            element={<Transactions />}
          />
          <Route
            path={`${STATIC_BREADCRUMBS.cards.path}/:cardID${STATIC_BREADCRUMBS.transactions.path}/:transactionID`}
            element={<Transaction />}
          />
        </Routes>
      </Content>
    </Router>
  );
};

export default AppRouter;
