import React from "react";
import PropTypes from "prop-types";
import "../assets/scss/components/FeatureItem.scss";

const FeatureItem = ({ imgSrc, imgAlt, title, description }) => (
  <div className="feature-item">
    <img src={imgSrc} alt={imgAlt} className="feature-icon" />
    <h3 className="feature-item-title">{title}</h3>
    <p>{description}</p>
  </div>
);

FeatureItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureItem;
