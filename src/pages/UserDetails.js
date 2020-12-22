import React from "react";
import Api from "../variables/api";

import "./Home.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export default function UserDetails() {
  const [data, setData] = React.useState([]);
  const [trandata, setTrandata] = React.useState([]);
  const [showDepositModal, setShowDepositModal] = React.useState(false);
  const [withdrawModal, showWithdrawModal] = React.useState(false);

  const [account_balance, setaccount_balance] = React.useState(parseInt(""));

  const [depositErrorMessage, setDepositErrorMessage] = React.useState("");
  const [validationErrors, setvalidationErrors] = React.useState({});
  const [isSubmitting, setisSubmitting] = React.useState(false);
  const [depositSuccessMessage, setDepositSuccessMessage] = React.useState("");

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const user_id = urlParams.get("userId");

  React.useEffect(() => {
    if (depositErrorMessage || depositSuccessMessage) {
      setTimeout(() => {
        setDepositErrorMessage("");
        setDepositSuccessMessage("");
      }, 5000);
    }
  }, [depositErrorMessage, depositSuccessMessage]);

  React.useEffect(() => {
    (async () => {
      const response = await Api.getOneUser(user_id);
      if (response && response.status === 200) {
        setData(response.data.data);
        setTrandata(response.data.data[0].transactions);
      }
    })();
  }, []);

  const toggle = () => {
    setShowDepositModal(!showDepositModal);
    showWithdrawModal(!withdrawModal);
    window.location.reload(false);
  };

  const onSubmitDeposit = async () => {
    setisSubmitting(true);

    const data = {
      account_balance,
    };

    const response = await Api.depost(user_id, data);
    if (response && response.status === 200) {
      setDepositSuccessMessage(response.msg);
      window.location.reload(false);
    } else {
      setDepositErrorMessage(response.msg);
    }

    setisSubmitting(false);
  };

  const onSubmitWitrhdraw = async () => {
    setisSubmitting(true);

    const data = {
      account_balance,
    };

    const response = await Api.withdraw(user_id, data);
    if (response && response.status === 200) {
      setDepositSuccessMessage(response.msg);
      window.location.reload(false);
    } else {
      setDepositErrorMessage(response.msg);
    }

    setisSubmitting(false);
  };

  return (
    <>
      <di className="container">
        <nav className="navbar navbar-expand-lg navbar-light ">
          <div className="container">
            <a className="navbar-brand navs" href="#">
              Navbar
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
              <ul className="navbar-nav  mb-2 mb-lg-0 ml-auto">
                <li className="nav-item marg">
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    onClick={() => {
                      setShowDepositModal(true);
                    }}
                  >
                    Deposit
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    onClick={() => {
                      showWithdrawModal(true);
                    }}
                  >
                    Withdraw
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </di>
      <div className="container">
        <div className="row\">
          {data.map((user) => {
            return (
              <div key={user.slug} className="col-md-6 mt-4">
                <div
                  className="shadow p-3 mb-5 rounded"
                  style={{ width: "100%", backgroundColor: "##525f7f" }}
                >
                  <div className="card-body">
                    <table className="table align-items-center">
                      <thead className="mb-5"> ACOOUNT INFOMATION </thead>
                      <tbody className="mt-5">
                        <tr>
                          <th>ACOOUNT NAME</th>
                          <td> {user.FullName} </td>
                          <td></td>
                        </tr>
                        <tr>
                          <th>ACCOUNT NUMBEr</th>
                          <td> {user.Account_Number} </td>
                          <td></td>
                        </tr>
                        <tr>
                          <th> ACOOUNT BALANCE </th>
                          <td> {user.Account_Balance} </td>
                          <td></td>
                        </tr>
                        <tr>
                          <th>Mobile Number </th>
                          <td> {user.Mobile_Number} </td>
                          <td></td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td> {user.email} </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div
              className="shadow p-3 mb-5 rounded"
              style={{ backgroundColor: "##525f7f" }}
            >
              <div className="card-body">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Amount</th>

                      {/* <th scope="col">Last</th> */}
                      <th className="marg" scope="col">
                        Transaction Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {trandata.map((tran, id) => {
                      return (
                        <tr key={id}>
                          <td> {tran.amount} </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td
                            className={`${
                              tran.transaction_type === "DEPOSIT"
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {" "}
                            {tran.transaction_type}{" "}
                          </td>
                          <td></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Modal isOpen={showDepositModal}>
          <ModalHeader>Deposit</ModalHeader>
          {depositSuccessMessage && depositSuccessMessage !== "" && (
            <div className="alert alert-success" role="alert">
              {depositSuccessMessage}
            </div>
          )}
          {depositErrorMessage && depositErrorMessage !== "" && (
            <div className="alert alert-success" role="alert">
              {depositErrorMessage}
            </div>
          )}
          {validationErrors &&
            validationErrors["account_balance"] &&
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
                <label for="exampleInputEmail1" className="mb-3">
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    if (!e.target.value) {
                      setvalidationErrors({
                        ...validationErrors,
                        account_balance: "Amount is required",
                      });
                    }
                    if (e.target.value) {
                      delete validationErrors["account_balance"];
                    }
                    setaccount_balance(e.target.value);
                  }}
                  value={account_balance}
                  onBlur={() => {
                    if (!account_balance) {
                      setvalidationErrors({
                        ...validationErrors,
                        account_balance: "Amount is required",
                      });
                    }
                    if (account_balance) {
                      delete validationErrors["account_balance"];
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
                <Button color="primary" onClick={onSubmitDeposit}>
                  Deposit
                </Button>
                <Button color="danger" onClick={toggle}>
                  Cancel
                </Button>
              </>
            )}
          </ModalFooter>
        </Modal>
      </div>

      <div className="container">
        <Modal isOpen={withdrawModal}>
          <ModalHeader>Deposit</ModalHeader>
          {depositSuccessMessage && depositSuccessMessage !== "" && (
            <div className="alert alert-info" role="alert">
              {depositSuccessMessage}
            </div>
          )}
          {depositErrorMessage && depositErrorMessage !== "" && (
            <div className="alert alert-info" role="alert">
              {depositErrorMessage}
            </div>
          )}
          {validationErrors &&
            validationErrors["account_balance"] &&
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
                <label for="exampleInputEmail1" className="mb-3">
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    if (!e.target.value) {
                      setvalidationErrors({
                        ...validationErrors,
                        account_balance: "Amount is required",
                      });
                    }
                    if (e.target.value) {
                      delete validationErrors["account_balance"];
                    }
                    setaccount_balance(e.target.value);
                  }}
                  value={account_balance}
                  onBlur={() => {
                    if (!account_balance) {
                      setvalidationErrors({
                        ...validationErrors,
                        account_balance: "Amount is required",
                      });
                    }
                    if (account_balance) {
                      delete validationErrors["account_balance"];
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
                <Button color="primary" onClick={onSubmitWitrhdraw}>
                  Withdraw
                </Button>
                <Button color="danger" onClick={toggle}>
                  Cancel
                </Button>
              </>
            )}
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
