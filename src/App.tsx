import React from "react";
import "./App.css";
import { BackTop } from "antd";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import { Switch } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "jotai";

function App() {
  return (
    <>
      <Provider>
        <BrowserRouter>
          <Switch>
            <Route path="/profile" component={ProfilePage} />
            <Route path="/" exact component={LandingPage} />
          </Switch>
          <BackTop />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
