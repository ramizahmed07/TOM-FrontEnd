import { Row } from "antd";
import { NavLink, useParams } from "react-router-dom";

import "./tabs.less";
import { TABS } from "./config";

const Tabs = () => {
  const { company_id } = useParams<{ company_id: string }>();
  return (
    <Row>
      {TABS.map(({ id, path, title }) => (
        <NavLink
          exact={true}
          className="tab"
          activeClassName="tab--active"
          key={id}
          to={`${path.replace(":company_id", company_id)}`}
        >
          {title}
        </NavLink>
      ))}
    </Row>
  );
};

export default Tabs;
