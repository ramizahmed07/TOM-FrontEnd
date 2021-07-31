import React from "react";
import { Layout as AntdLayout, Menu, Breadcrumb, Dropdown, Avatar } from "antd";
import { NavLink, useLocation, useHistory } from "react-router-dom";

import "./layout.less";
import { Paths, routeConfig } from "@/router";
import { ReactComponent as Logo } from "@assets/images/logo.svg";
import { ReactComponent as Down } from "@assets/images/arrow-down.svg";
import { ReactComponent as Bell } from "@assets/images/bell.svg";
import config, { Config } from "./sidebar-config";
import profilePic from "@assets/images/profile-pic.jpeg";
import { useBreadcrumbs } from "@/hooks";

const { Header, Content, Sider } = AntdLayout;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const { pathname } = useLocation();
  const history = useHistory();

  const getRoute = (path: string | Array<string>): string => {
    if (typeof path == "string") {
      return path;
    } else if (
      Array.isArray(path) &&
      path.includes(pathname) &&
      typeof pathname == "string"
    ) {
      return pathname;
    } else {
      return "";
    }
  };
  const breadcrumbs = useBreadcrumbs(routeConfig, {
    disableDefaults: true,
  });
  const breadcrumbs_list = breadcrumbs.map(({ breadcrumb }) => breadcrumb);
  const breadcrumb = breadcrumbs_list
    ?.map((x: any) => x?.props?.children)
    [breadcrumbs_list.length - 1]?.split(" /");

  const menu = (
    <Menu>
      <Menu.Item key="1">Clicking me will not close the menu.</Menu.Item>
      <Menu.Item key="2">Clicking me will not close the menu also.</Menu.Item>
      <Menu.Item key="3">Clicking me will close the menu.</Menu.Item>
    </Menu>
  );

  if (
    Object.values(Paths.Auth).some(path =>
      window.location.pathname.includes(path)
    )
  )
    return <div>{children}</div>;

  return (
    <AntdLayout className="layout__container">
      <AntdLayout>
        <Sider width={200} className="layout__sider site-layout-background">
          <div className="sider__logo__container">
            <Logo />
          </div>
          {config.map((config: Config, idx) => {
            return (
              <div className="sider__links__container" key={idx}>
                <NavLink
                  key={idx}
                  to={getRoute(config.path)}
                  className="sider__link"
                  activeClassName="sider__sub__link--active"
                >
                  <div className="sider__icon__container">
                    <config.icon className="sider__link__icon" />
                  </div>
                  {config.title}
                </NavLink>
                {config.sub?.map((subLink: any, i: number) => (
                  <NavLink
                    key={i}
                    to={subLink.path || ""}
                    className="sider__sub__link"
                    activeClassName="sider__sub__link--active"
                    onClick={() =>
                      subLink.path && history.push(subLink.path)
                    }
                  >
                    <div className="sider__icon__container">
                      <subLink.icon className="sider__link__icon" />
                    </div>
                    {subLink.title}
                  </NavLink>
                ))}
              </div>
            );
          })}
        </Sider>
        <AntdLayout className='content__container'>
          <Header  className="layout__header">
            <div className="header__notif__icon__container">
              <Bell className="header__notif__icon" />
            </div>
            <div className="header__divider"></div>
            <Dropdown
              overlay={menu}
              onVisibleChange={open => setIsMenuVisible(open)}
              visible={isMenuVisible}
              trigger={["click"]}
            >
              <div className="profile__menu__toggle">
                <Avatar size={32} src={profilePic} />
                <div className="profile__menu__text__container">
                  <span className="profile__menu__user__name">Salman Ali</span>
                  <span className="profile__menu__user__role">Admin</span>
                </div>
                <div className="profile__menu__icon__container">
                  <Down className="profile__menu__icon" />
                </div>
              </div>
            </Dropdown>
          </Header>

          <Breadcrumb className="layout__breadcrumbs">
            {breadcrumb?.map((breadcrumb: string) => (
              <Breadcrumb.Item key={breadcrumb}>{breadcrumb}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Content
            className="site-layout-content"
            style={{
              padding: "8px 24px 24px",
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
