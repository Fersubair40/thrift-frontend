import React from "react";
import { Link } from "react-router-dom";
import Api from "../variables/api";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./Home.css";

export default function Home() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [isSubmitting, setisSubmitting] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [validationErrors, setvalidationErrors] = React.useState({});
  const [msg, setMessage] = React.useState("");
  const [errors, setError] = React.useState("");

  React.useEffect(() => {
    (async () => {
      const response = await Api.getUsers();
      if (response && response.status === 200) {
        setData(response.data.users);
        // console.log()
        setLoading(false);
      }
    })();
  }, []);

  const toggle = () => {
    setDeleteModal(!deleteModal);
    window.location.reload(false);
  };

  const onSubmitDeposit = async () => {
    setisSubmitting(true);

    const response = await Api.deleteUser(username);
    if (response && response.status === 200) {
      setMessage(response.msg);
      window.location.reload(false);
    } else {
      setError(response.msg);
    }

    setisSubmitting(false);
  };

  return (
    <>
      <div className="container ">
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
                <li className="nav-item">
                <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => {
                      setDeleteModal(true)
                    }}
                  >
                    Delete Account
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {loading ? (
          <div className="text-center" style={{ marginTop: "9rem" }}>
            <div
              className="spinner-border"
              style={{ width: "5rem", height: "5rem" }}
              role="status"
            ></div>
          </div>
        ) : (
          <div className="mt-5 cards">
            <div className="row">
              {data && data.length >= 1 ? (
                data.map((user) => (
                  <React.Fragment key={user.slug}>
                    <div key={user.slug} className="col-sm-4 mb-2">
                      <div
                        className="card shadow-lg p-3 mb-5 rounded"
                        style={{ backgroundColor: "#fff0f0" }}
                      >
                        <div className="card-body">
                          <h3 className="card-title">{user.Account_Balance}</h3>
                          <h5 className="card-title">{user.FullName}</h5>
                          <h6 className="card-subtitle mb-2 text-dark">
                            Accoount Number:{" "}
                            <span className="font-weight-bold text-dark">
                              {user.Account_Number}
                            </span>
                          </h6>
                          <p className="card-text">
                            Package:{" "}
                            <span className="text-dark"> {user.package} </span>{" "}
                          </p>
                          <p className="card-text">{user.Mobile_Number}</p>
                          <Link
                            className="card-link"
                            to={`/account/?userId=${user.slug}`}
                          >
                            {" "}
                            View Transactions{" "}
                          </Link>
                          {/* <button
                            className="btn-danger mt-3"
                            type="button"
                            onClick={() => {
                              setDeleteModal(true);
                            }}
                          >
                            {" "}
                            Delete Account{" "}
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))
              ) : (
                <div className="container">
                  <p>You have not Addded Anyone Yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Modal isOpen={deleteModal}>
        <ModalHeader> Delete</ModalHeader>

        {msg && msg !== "" && (
          <div className="alert alert-info" role="alert">
            {msg}
          </div>
        )}

        {errors && errors !== "" && (
          <div className="alert alert-info" role="alert">
            {errors}
          </div>
        )}

        {validationErrors &&
          validationErrors["username"] &&
          Object.entries(validationErrors).length >= 1 && (
            <div className="alert alert-info" role="alert">
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
        <ModalBody>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="mb-3">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  if (!e.target.value) {
                    setvalidationErrors({
                      ...validationErrors,
                      username: "Username is required",
                    });
                  }
                  if (e.target.value) {
                    delete validationErrors["username"];
                  }
                  setUsername(e.target.value);
                }}
                value={username}
                onBlur={() => {
                  if (!username) {
                    setvalidationErrors({
                      ...validationErrors,
                      username: "Username is required",
                    });
                  }
                  if (username) {
                    delete validationErrors["username"];
                  }
                }}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          {isSubmitting ? (
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          ) : (
            <>
              <Button color="info" onClick={onSubmitDeposit}>
                Delete
              </Button>
              <Button color="danger" onClick={toggle}>
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
}
