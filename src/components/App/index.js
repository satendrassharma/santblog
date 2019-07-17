import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Navbar from "../Navbar";
import Welcome from "../Welcome";
import Login from "../Login";
import Register from "../Register";
import CreateArticle from "../CreateArticle";
import Footer from "../Footer";
import SingleArticle from "../SingleArticle";
import UserArticle from "../UserArticle";
import RedirectIfAuth from "../RedirectIfAuth";
import Auth from "../Auth";
import Page404 from "../404page";
import Category from "../Category";
import CategoryArticles from "../Category/CategoryArticles";

export default class App extends Component {
  state = {
    authUser: null,
    articles: []
  };

  componentDidMount() {
    const user = localStorage.getItem("user");
    if (user) {
      this.setState({
        authUser: JSON.parse(user)
      });
    }
  }

  removeAuthUser = () => {
    localStorage.removeItem("user");
    this.setState({ authUser: null });
  };
  setArticles = articles => {
    this.setState({ articles });
  };
  setAuthUser = data => {
    this.setState(
      {
        authUser: data
      },
      () => {
        localStorage.setItem("user", JSON.stringify(data));
        this.props.history.push("/");
      }
    );
  };

  render() {
    const { pathname } = this.props.location;
    return (
      <div>
        {pathname !== "/login" &&
          pathname !== "/signup" &&
          pathname !== "/404" && (
            <Navbar
              authUser={this.state.authUser}
              removeAuthUser={this.removeAuthUser}
            />
          )}
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Welcome
                {...props}
                setArticles={this.setArticles}
                getArticles={this.props.articlesService.getArticles}
              />
            )}
          />
          <Auth
            path="/articles/create"
            component={CreateArticle}
            props={{
              getArticleCategories: this.props.articlesService
                .getArticleCategories,
              createArticle: this.props.articlesService.createArticle,
              token: this.state.authUser ? this.state.authUser.token : null,
              notyService: this.props.notyService
            }}
            isAuthenticated={this.state.authUser !== null}
          />
          <Auth
            path="/user/articles"
            component={UserArticle}
            props={{
              getUserArticles: this.props.articlesService.getUserArticles,
              setArticles: this.setArticles,
              deleteArticle: this.props.articlesService.deleteArticle,
              token: this.state.authUser ? this.state.authUser.token : null
            }}
            isAuthenticated={this.state.authUser !== null}
          />

          <RedirectIfAuth
            path="/login"
            component={Login}
            props={{
              setAuthUser: this.setAuthUser,
              loginUser: this.props.authServices.loginUser
            }}
            isAuthenticated={this.state.authUser !== null}
          />
          <RedirectIfAuth
            path="/signup"
            component={Register}
            props={{
              setAuthUser: this.setAuthUser,
              registerUser: this.props.authServices.registerUser
            }}
            isAuthenticated={this.state.authUser !== null}
          />
          <Auth
            path="/article/edit/:slug"
            component={CreateArticle}
            props={{
              getArticleCategories: this.props.articlesService
                .getArticleCategories,
              createArticle: this.props.articlesService.createArticle,
              token: this.state.authUser ? this.state.authUser.token : null,
              articles: this.state.articles,
              updateArticle: this.props.articlesService.updateArticle,
              notyService: this.props.notyService
            }}
            isAuthenticated={this.state.authUser !== null}
          />

          <Route
            path="/article/:slug"
            render={props => (
              <SingleArticle
                {...props}
                articles={this.state.articles}
                getArticle={this.props.articlesService.getArticle}
              />
            )}
          />
          <Route
            path="/categories"
            render={props => (
              <Category
                {...props}
                getArticleCategories={
                  this.props.articlesService.getArticleCategories
                }
              />
            )}
          />
          <Route
            path="/category/:slug"
            render={props => (
              <CategoryArticles
                {...props}
                getCategoryArticles={
                  this.props.articlesService.getCategoryArticles
                }
                setArticles={this.setArticles}
              />
            )}
          />
          <Route path="/404" component={Page404} />
          <Route render={() => <Redirect to="/404" />} />
        </Switch>
        {this.props.location.pathname !== "/login" &&
          this.props.location.pathname !== "/signup" && <Footer />}
      </div>
    );
  }
}
