import React, { FunctionComponent } from "react";
import { Header } from "antd/es/layout/layout";
import { Menu } from "antd";

const Navbar: FunctionComponent = () => {
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <Menu
        className="menu"
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
      >
        <Menu.Item key="1">Bitchain</Menu.Item>
        <Menu.Item key="2">Home</Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
