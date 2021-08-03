import { Row } from "antd";
import { NavLink } from "react-router-dom";

import "./tabs.less";
import { TABS } from "./config";

const Tabs = () => {
  return (
    <Row>
      {TABS.map(({ id, path, title }) => (
        <NavLink
          className="tab"
          activeClassName="tab--active"
          key={id}
          to={path}
        >
          {title}
        </NavLink>
      ))}
    </Row>
  );
};

export default Tabs;
