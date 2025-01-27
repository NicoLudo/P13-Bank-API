import React from "react";
import PropTypes from "prop-types";
import "../assets/scss/components/AccountItem.scss";

const AccountItem = ({ title, amount, description, buttonText }) => (
  <section className="account">
    <div className="account-content-wrapper">
      <h3 className="account-title">{title}</h3>
      <p className="account-amount">${amount}</p>
      <p className="account-amount-description">{description}</p>
    </div>
    <div className="account-content-wrapper cta">
      <button
        className="transaction-button"
        aria-label={`View transactions for ${title}`}
      >
        View transactions
      </button>
    </div>
  </section>
);

AccountItem.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default AccountItem;
