import React, { Component } from "react";
import Welcomep from "./Welcomep";
export default class Welcome extends Component {
  state = {
    articles: {},
    loading: true
  };
  async componentDidMount() {
    const articles = await this.props.getArticles();

    this.setState({ articles, loading: false });
    this.props.setArticles(articles.data);
  }
  handlePagination = url => {
    this.setState({ loading: true }, async () => {
      const articles = await this.props.getArticles(url);
      this.setState({ articles, loading: false });
      this.props.setArticles(articles.data);
    });
  };
  render() {
    const { articles, loading } = this.state;
    return (
      <Welcomep
        articles={articles.data}
        nextUrl={articles.next_page_url}
        prevUrl={articles.prev_page_url}
        handlePagination={this.handlePagination}
        loading={this.state.loading}
      />
    );
  }
}
