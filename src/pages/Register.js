import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

import Api from "../variables/api";
import splash from "../images/splash.png";
import "./Register.css";

const initialValues = {
  email: "",
  username: "",
  fullname: "",
  mobile_Number: "",
  _package: "",
};

export default function Register() {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [visible, setVisible] = React.useState(true);
  const [validationErrors, setvalidationErrors] = React.useState({});
  const [isSubmitting, setisSubmitting] = React.useState(false);
  const [successMessage, setsuccessMessage] = React.useState("");

  let history = useHistory();

  const onDismiss = () => {
    setVisible(false);
    setvalidationErrors({});
    setErrorMessage("");
  };

  return (
    <>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light ">
          <div className="container">
            <a className="navbar-brand navs" href="#">
              ThriftWithK
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav  mb-2 mb-lg-0 ml-auto justify-content-end">
                <li className="nav-item">
                  <Link className="nav-link text-dark " to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/register">
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className="container">
        <div className="row g-3">
          <div className="col-md-6 img .d-none .d-md-block .d-lg-none">
            <img className="splash" src={splash} alt="splash" />
          </div>

          <div className="col-md-6 mt-4">
            
            <div className="form">
            <h3> Register </h3>
              {successMessage && successMessage !== "" && (
                <div
                  className="alert alert-success"
                  isOpen={visible}
                  toggle={onDismiss}
                  role="alert"
                >
                  {successMessage}
                </div>
              )}
              {errorMessage && errorMessage !== "" && (
                <div
                  className="alert alert-info"
                  isOpen={visible}
                  toggle={onDismiss}
                  role="alert"
                >
                  {errorMessage}
                </div>
              )}
              {validationErrors &&
                Object.entries(validationErrors).length >= 1 && (
                  <div
                    className="alert alert-info"
                    isOpen={visible}
                    role="alert"
                  >
                    <ul>
                      {Object.keys(validationErrors).map((keys, index) => {
                        return (
                          <li key={index} className="text-black-50">
                            {validationErrors[keys]}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

              <Formik
                initialValues={initialValues}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Email is required";
                  }
                  if (!values.username) {
                    errors.username = "Username is required";
                  }
                  if (!values.fullname) {
                    errors.fullname = "Fullname is required";
                  }
                  if (!values.mobile_number) {
                    errors.mobile_Number = "Mobile Number is required";
                  }
                  if (!values._package) {
                    errors._package = "You must pick a Package";
                  }
                  setvalidationErrors({ ...errors });
                  return errors;
                }}
                onSubmit={async (values) => {
                  setisSubmitting(true);
                  values = {
                    ...values,
                  };
                  const response = await Api.register(values);
                  if (response && response.status == 200) {
                    setsuccessMessage(response.msg);
                    history.push("/home");
                  } else {
                    setErrorMessage(response.msg);
                  }
                  setisSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  
                  <form className="row  g-3" onSubmit={handleSubmit}>
                    <div class="col-md-6">
                      <label for="inputEmail4" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="fullname" className="form-label">
                        Fullname
                      </label>
                      <input
                        type="name"
                        className="form-control"
                        name="fullname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fullname}
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="username" className="form-label">
                        Username
                      </label>
                      <input
                        type="username"
                        className="form-control"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                      />
                    </div>

                    <div className="col-md-6">
                      <label for="mobile" class="form-label">
                        Mobile Number
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="mobile_number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.mobile_number}
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="_package" class="form-label">
                        Select Package
                      </label>
                      <select
                        className="form-control"
                        id="_package"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values._package}
                      >
                        <option value="">Select A Package</option>
                        <option value="STANDARD">Standard</option>
                        <option value="PREMIUM">Premium</option>
                        <option value="PLATINUM">Platinum</option>
                        <option value="GOLD">Gold</option>
                        <option value="DIAMOND">Diamond</option>
                      </select>
                    </div>
                    <div class="col-12">
                      {isSubmitting ? (
                        <button
                          className="btn btn-primary"
                          type="button"
                          disabled
                        >
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Loading...
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-primary">
                          Register
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
