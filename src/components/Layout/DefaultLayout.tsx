import React, { FunctionComponent } from "react";
import { Layout } from "antd";
import Navbar from "../Navbar/Navbar";
import { Footer } from "antd/es/layout/layout";

const DefaultLayout: FunctionComponent = ({ children }) => {
  return (
    <Layout>
      <Navbar />
      {children}
      {/*<Footer*/}
      {/*  style={{*/}
      {/*    position: "absolute",*/}
      {/*    bottom: 0,*/}
      {/*    width: "100%",*/}
      {/*    textAlign: "center",*/}
      {/*    backgroundColor: "#1890FF",*/}
      {/*    color: "#fff",*/}
      {/*    marginTop: 50,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Bitchain Exchange ©2021*/}
      {/*</Footer>*/}
    </Layout>
  );
};

export default DefaultLayout;
