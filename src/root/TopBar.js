import { Layout } from "antd";
import { STATIC_BREADCRUMBS } from "../core/constants";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
const { Header } = Layout;

const Topbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const redirect = area => {
    navigate(STATIC_BREADCRUMBS[area].path);
  };

  const selectedKeys =
    pathname === STATIC_BREADCRUMBS.transactions.path
      ? [STATIC_BREADCRUMBS.transactions.key]
      : pathname === STATIC_BREADCRUMBS.cards.path
      ? [STATIC_BREADCRUMBS.cards.key]
      : [];

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" selectedKeys={selectedKeys}>
        <Menu.Item
          key={STATIC_BREADCRUMBS.transactions.key}
          onClick={() => redirect(STATIC_BREADCRUMBS.transactions.key)}
        >
          {STATIC_BREADCRUMBS.transactions.text}
        </Menu.Item>
        <Menu.Item
          key={STATIC_BREADCRUMBS.cards.key}
          onClick={() => redirect(STATIC_BREADCRUMBS.cards.key)}
        >
          {STATIC_BREADCRUMBS.cards.text}
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Topbar;
