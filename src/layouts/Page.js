import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import "../assets/scss/Global.scss";

const Page = ({ children, userName = "" }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const mainClass = isHomePage ? "main" : "main bg-dark";

  return (
    <>
      <Header userName={userName} />
      <main role="main" aria-label="Main Content" className={mainClass}>
        {children}
      </main>
      <Footer />
    </>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  userName: PropTypes.string,
};

export default Page;
