import React from "react";
import {
  Layout as AntdLayout,
  Menu,
  Breadcrumb,
  Dropdown,
  Avatar,
  message,
} from "antd";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import _ from "lodash";

import "./layout.less";
import { paths, admin_routeConfig, client_routeConfig } from "@router";
import { ReactComponent as Logo } from "@assets/images/logo.svg";
import { ReactComponent as Down } from "@assets/images/arrow-down.svg";
import { ReactComponent as Bell } from "@assets/images/bell.svg";
import { IConfig, admin_config, client_config } from "./sidebar-config";
import profilePic from "@assets/images/profile-pic.jpeg";
import { useBreadcrumbs, useTypedSelector } from "@hooks";
import { ErrorServices, loadRefreshToken, useLogoutMutation } from "@services";
import { checkPermission } from "@utils";

const { Header, Content, Sider } = AntdLayout;
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useTypedSelector(state => state.auth);
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const [onLogout] = useLogoutMutation();
  const { pathname } = useLocation();
  const history = useHistory();

  const config = window.location.pathname?.includes("client")
    ? client_config
    : admin_config;

  const getRoute = (path: string | Array<string>): string => {
    if (typeof path == "string") return path;
    else if (
      Array.isArray(path) &&
      path.includes(pathname) &&
      typeof pathname == "string"
    )
      return pathname;
    else return "";
  };

  const breadcrumbs = useBreadcrumbs(
    window.location.pathname?.includes("client")
      ? client_routeConfig
      : admin_routeConfig,
    {
      disableDefaults: true,
    }
  );
  const breadcrumbs_list = breadcrumbs.map(({ breadcrumb }) => breadcrumb);
  const breadcrumb = breadcrumbs_list
    ?.map((x: any) => x?.props?.children)
    [breadcrumbs_list.length - 1]?.split(" /");

  const onLogoutFromServer = async () => {
    try {
      await onLogout({ refresh: loadRefreshToken() }).unwrap();
      message.success(`User has been successfully logout`);
    } catch (error) {
      ErrorServices(error);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onLogoutFromServer}>
        Log out
      </Menu.Item>
    </Menu>
  );

  if (
    Object.values(paths.admin.auth).some(path =>
      window.location.pathname.includes(path as string)
    )
  )
    return <div>{children}</div>;

  return (
    <AntdLayout className="layout__container">
      <AntdLayout>
        <Sider width={200} className="layout__sider sider">
          <div className="sider__logo__container">
            <Logo />
          </div>
          {config?.map((config: IConfig, idx) => {
            return (
              <div className="sider__links__container" key={idx}>
                <NavLink
                  exact={true}
                  key={idx}
                  to={getRoute(config.path)}
                  className="sider__link"
                  activeClassName="sider__active"
                >
                  <div
                    className={`sider__icon__container ${
                      config?.client && "sider__icon__container--client"
                    }`}
                  >
                    <config.icon className="sider__link__icon" />
                  </div>
                  {config.title}
                </NavLink>
                {config.sub?.map((subLink: any, i: number) =>
                  checkPermission(subLink?.permission) ? (
                    <NavLink
                      key={i}
                      to={subLink.path || ""}
                      className="sider__sub__link"
                      activeClassName="sider__active"
                      onClick={() => subLink.path && history.push(subLink.path)}
                    >
                      <div
                        className={`sider__icon__container ${
                          config?.client && "sider__icon__container--client"
                        }`}
                      >
                        <subLink.icon className="sider__link__icon" />
                      </div>
                      {subLink.title}
                    </NavLink>
                  ) : null
                )}
              </div>
            );
          })}
        </Sider>
        <AntdLayout className="content__container">
          <Header className="layout__header">
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
                  <span className="profile__menu__user__name">{`${user?.first_name} ${user?.last_name}`}</span>
                  <span className="profile__menu__user__role">
                    {_.replace(_.startCase(_.toLower(user?.role)), "_", " ")}
                  </span>
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
