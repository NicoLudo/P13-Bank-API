import React, { useEffect, useState } from "react";
import Page from "../layouts/Page";
import AccountItem from "../components/AccountItem";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../redux/authSlice";
import "../assets/scss/pages/UserPage.scss";

const UserPage = () => {
  const dispatch = useDispatch();
  const { firstName, lastName, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ firstName: "", lastName: "" });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!firstName || !lastName) {
      dispatch(fetchUserProfile(token));
    } else {
      setFormData({ firstName, lastName });
    }
  }, [dispatch, firstName, lastName, token]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else {
      dispatch(updateUserProfile({ ...formData, token }));
      setEditMode(false);
    }
  };

  return (
    <Page>
      <header className="header">
      <h1>Welcome back,<br />{`${firstName?.trim() || ""} ${lastName?.trim() || ""}`}</h1>
        {editMode ? (
          <div className="edit-mode">
            {["firstName", "lastName"].map((field) => (
              <div key={field} className="input-group">
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`New ${field}`}
                  aria-label={`Enter new ${field}`}
                />
                {errors[field] && <span className="error-message">{errors[field]}</span>}
              </div>
            ))}
            <button onClick={handleSubmit}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setEditMode(true)} className="edit-button">Edit Name</button>
        )}
      </header>
      <h2 className="sr-only">Accounts</h2>
      <AccountItem
        title="Argent Bank Checking (x8349)"
        amount={2082.79}
        description="Available Balance"
        buttonText
      />
      <AccountItem
        title="Argent Bank Savings (x6712)"
        amount={10928.42}
        description="Available Balance"
        buttonText
      />
      <AccountItem
        title="Argent Bank Credit Card (x8349)"
        amount={184.30}
        description="Current Balance"
        buttonText
      />
    </Page>
  );
};

export default UserPage;
