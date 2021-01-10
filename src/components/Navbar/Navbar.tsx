import React, { FunctionComponent } from "react";
import { Header } from "antd/es/layout/layout";
import { Avatar, Badge, Menu, Image, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Navbar: FunctionComponent = () => {
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item key="1">
          <NavLink to="/">Bitchain</NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/">Home</NavLink>
        </Menu.Item>
        <span className="avatar-item">
          <span>
            <Tooltip title="Profile">
              <NavLink to="/profile">
                <Avatar icon={<UserOutlined />} />
              </NavLink>
            </Tooltip>
          </span>
        </span>
      </Menu>
    </Header>
  );
};

export default Navbar;
