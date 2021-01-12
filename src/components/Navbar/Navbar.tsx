import React, { FunctionComponent } from "react";
import { Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Navbar: FunctionComponent = () => {
  return (
    <section id="intro" className="wrapper style1">
      <div id="logo">
        <h1>Bitchain - Buy & sell Crypto in minutes</h1>
        <p>Join the world's largest crypto exchange</p>
      </div>
      <nav id="nav">
        <ul>
          <li className="current">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="current">
            <NavLink to="/">
              <Tooltip title="Profile">
                <NavLink to="/profile">
                  <Avatar icon={<UserOutlined />} />
                </NavLink>
              </Tooltip>
            </NavLink>
          </li>
          <li className="current">
            <NavLink to="/">About</NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
