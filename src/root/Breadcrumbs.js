import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../store/appContext";
import { Breadcrumb } from "antd";
import { STATIC_BREADCRUMBS } from "../core/constants";
import { getUrlParams } from "../core/helpers";

const Breadcrumbs = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { currentBreadcrumbs, changeBreadcrumb } = useContext(AppContext);
  const onClick = (path, index) => {
    if (index) navigate(path);
  };

  const { cardID, transactionID } = getUrlParams(pathname);
  console.log(
    "=== ==> Breadcrumbs ==> cardID, transactionID",
    cardID,
    transactionID
  );

  useEffect(() => {
    const path = pathname.split("/");
    let currentPath = "";
    const breadcrumbs = ["home"];
    path.forEach(el => {
      if (el) currentPath += `/${el}`;
      if (el && STATIC_BREADCRUMBS[el]) {
        breadcrumbs.push({
          text: STATIC_BREADCRUMBS[el].text,
          path: currentPath
        });
      } else if (el && (el === cardID || el === transactionID)) {
        breadcrumbs.push({ text: el, path: currentPath });
      }
    });

    changeBreadcrumb(breadcrumbs);
  }, [pathname]);

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {currentBreadcrumbs.map((item, index) => {
        const text = STATIC_BREADCRUMBS[item]?.text ?? item.text;
        const path = STATIC_BREADCRUMBS[item]?.path ?? item.path;
        const isActive = index && index < currentBreadcrumbs.length - 1;
        return (
          <Breadcrumb.Item
            key={path}
            onClick={() => (isActive ? onClick(path, index) : null)}
            className={isActive ? "active" : ""}
          >
            {text}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
