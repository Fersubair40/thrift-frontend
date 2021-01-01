import React from "react";
import { Link } from "react-router-dom";
import Api from "../variables/api";

import "./Home.css";

export default function Home() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const response = await Api.getUsers();
      if (response && response.status === 200) {
        setData(response.data.users);
        // console.log()
      }
    })();
  }, []);


  return (
    <div className="container ">
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
      <div className="mt-5 cards">
        <div className="row">
          {data.map((user) => {
            return (
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
                    <p className="card-text">Package: <span className="text-dark"> {user.package} </span> </p>
                    <p className="card-text">{user.Mobile_Number}</p>
                    <Link className="text-black" to={`/account/?userId=${user.slug}`} > View Transactions </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
