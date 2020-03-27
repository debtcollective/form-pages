import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import SEO from "./SEO";

import "../styles/main.scss";

const Layout = ({ title, children }) => {
  return (
    <>
      <SEO title={title} />
      <Header />
      <div id="main" className="main">
        {children}
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Layout;
