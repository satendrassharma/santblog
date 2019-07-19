import React, { Component } from "react";
import PropTypes from "prop-types";
import CategoryArticle from "./CategoryArticle";
export default class CategoryArticles extends Component {
  state = {
    articles: [],
    category: { name: "" },
    loading: true
  };

  async componentDidMount() {
    console.log(this.props);
    const { slug } = this.props.match.params;
    const url = `https://react-blog-api.bahdcasts.com/api/articles/category/${slug}`;
    const res = await this.props.getCategoryArticles(url);
    this.setState({
      articles: res.articles,
      category: res.category,
      loading: false
    });
    this.props.setArticles(res.articles.data);
  }

  handlePagination = async url => {
    const res = await this.props.getCategoryArticles(url);
    this.setState({ articles: res.articles });
    this.props.setArticles(res.articles.data);
  };

  render() {
    return (
      <CategoryArticle
        category={this.state.category}
        loading={this.state.loading}
        articles={this.state.articles.data}
        nextUrl={this.state.articles.next_page_url}
        prevUrl={this.state.articles.prev_page_url}
        handlePagination={this.handlePagination}
      />
    );
  }
}

CategoryArticles.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired
    })
  }),
  getCategoryArticles: PropTypes.func.isRequired
};
