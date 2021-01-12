import { GithubFilled, LinkedinFilled } from "@ant-design/icons";
import React from "react";

const Footer: React.FC = () => {
  return (
    <section id="footer" className="wrapper style3" style={{ height: "auto" }}>
      <div className="title">About</div>
      <div className="container">
        <header className="style1">
          <h4>Created and designed by Faris Mecinovic</h4>
          <p>
            {new Date().getFullYear()} - All right reserved &copy;
            <br />
            <a href="https://www.github.com/farismecinovic" target="_blank">
              <GithubFilled />
            </a>
            <a
              href="https://www.linkedin.com/in/faris-mecinovic-744b67193/"
              target="_blank"
            >
              <LinkedinFilled style={{ marginLeft: 20 }} />
            </a>
          </p>
        </header>
      </div>
    </section>
  );
};

export default Footer;
