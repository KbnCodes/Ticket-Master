import React from "react";
import Home from "./component/common/Home";
import Login from "./component/users/Login";
import Register from "./component/users/Register";

import DepList from "./component/department/DepList";

import CustomerList from "./component/customers/List";
import AddCustomer from "./component/customers/AddCustomer";
import EditCustomer from "./component/customers/EditCustomer";
import ShowCustomer from "./component/customers/ShowCustomer";

import EmpList from "./component/employee/EmpList";
import AddEmp from "./component/employee/AddEmp";
import EmpShow from "./component/employee/EmpShow";
import EditEmp from "./component/employee/EditEmp";

import TicketList from "./component/ticket/TicketList";
import PrivateRoute from "./component/PrivateRoute/privateRoute";

import axios from "./config/axios";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

function handleClick() {
  axios
    .delete("/users/logout", {
      headers: {
        "x-auth": localStorage.getItem("authToken"),
      },
    })
    .then((response) => {
      alert(response.data.notice);
      localStorage.removeItem("authToken");
      window.location.href = "/";
    });
}

function App() {
  return (
    <BrowserRouter>
      <ul>
        {localStorage.getItem("authToken") ? (
          <div>
            <h2 style={{ textAlign: "center" }}>Ticket Master</h2>
            <Link to="/">Home</Link> |<Link to="/customers">Customers</Link> |
            <Link to="/department">Department</Link> |
            <Link to="/employee">Employee</Link> |
            <Link to="/ticket">TicketMaster</Link> |
            <Link to="#" onClick={handleClick}>
              logout
            </Link>
          </div>
        ) : (
          <div>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users/register">register</Link>
            </li>
            <li>
              <Link to="/users/login">login</Link>
            </li>
          </div>
        )}

        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/users/register" component={Register} />
          <Route path="/users/login" component={Login} />

          <PrivateRoute
            path="/customers"
            component={CustomerList}
            exact={true}
          />
          <PrivateRoute
            path="/customers/add"
            component={AddCustomer}
            exact={true}
          />
          <PrivateRoute path="/customers/edit/:id" component={EditCustomer} />
          <PrivateRoute path="/customers/:id" component={ShowCustomer} />

          <Route path="/department" component={DepList} exact={true} />

          <Route path="/employee" component={EmpList} exact={true} />
          <Route path="/employee/add" component={AddEmp} />
          <Route path="/employee/edit/:id" component={EditEmp} />
          <Route path="/employee/:id" component={EmpShow} />

          <Route path="/ticket" component={TicketList} />
        </Switch>
      </ul>
    </BrowserRouter>
  );
}

export default App;
