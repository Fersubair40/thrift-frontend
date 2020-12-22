import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import UserDetails from "./pages/UserDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/account" component={UserDetails} />
        <Route exact path="/home" component={Home} />
        <Redirect from="/" to="/home" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
