import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import AuthService from "./services/auth";
import ArticlesService from "./services/articles";
import NotificationsService from "./services/notification";

const Main = withRouter(props => (
  <App
    {...props}
    authServices={new AuthService()}
    articlesService={new ArticlesService()}
    notyService={new NotificationsService()}
  />
));

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
