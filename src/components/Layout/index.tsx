import { Layout as AntdLayout, Menu, Breadcrumb, Button } from "antd";

import "./layout.less";
import { ReactComponent as Logo } from "@assets/images/logo.svg";
import config from "./sidebar-config";

const { Header, Content, Sider } = AntdLayout;

const Layout = () => {
  return (
    <AntdLayout className="layout__container">
      <AntdLayout>
        <Sider width={200} className="layout__sider site-layout-background">
          <div className="sider__logo__container">
            <Logo />
          </div>
          {config.map((config, idx) => {
            return (
              <div className="sider__links__container" key={idx}>
                <Button
                  type="link"
                  className="sider__link"
                  icon={
                    <div className="sider__icon__container">
                      <config.icon className="sider__link__icon" />
                    </div>
                  }
                >
                  {config.title}
                </Button>
                {config.sub?.map((subLink, i) => (
                  <Button
                    key={i}
                    type="link"
                    className="sider__sub__link"
                    icon={
                      <div className="sider__icon__container">
                        <subLink.icon className="sider__link__icon" />
                      </div>
                    }
                  >
                    {subLink.title}
                  </Button>
                ))}
              </div>
            );
          })}
        </Sider>
        <AntdLayout style={{ padding: "0" }}>
          <Header className="layout__header"></Header>
          <Breadcrumb className="layout__breadcrumbs">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-content"
            style={{
              padding: "8px 24px 24px",
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
