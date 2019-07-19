import React, { Component } from "react";
import PropTypes from "prop-types";
import Articles from "./Articles";
export default class UserArticle extends Component {
  state = {
    articles: [],
    loading: true
  };
  async componentDidMount() {
    const articles = await this.props.getUserArticles(this.props.token);

    this.setState({ articles, loading: false });
    this.props.setArticles(articles.data);
  }

  handlePagination = async url => {
    this.setState({ loading: true });
    const articles = await this.props.getUserArticles(this.props.token, url);

    this.setState({ articles, loading: false });
    this.props.setArticles(articles.data);
  };

  editArticle = article => {
    this.props.history.push(`/article/edit/${article.slug}`);
  };

  deleteArticle = async id => {
    await this.props.deleteArticle(id, this.props.token);

    // remove article from list.
    const articles = this.state.articles.data.filter(
      article => article.id !== id
    );
    this.setState({
      articles: {
        data: articles
      }
    });
  };
  render() {
    const { articles } = this.state;
    return (
      <Articles
        articles={articles.data}
        nextUrl={articles.nextUrl}
        prevUrl={articles.prevUrl}
        handlePagination={this.handlePagination}
        deleteArticle={this.deleteArticle}
        editArticle={this.editArticle}
        loading={this.state.loading}
      />
    );
  }
}

UserArticle.propTypes = {
  getUserArticles: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  setArticles: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
