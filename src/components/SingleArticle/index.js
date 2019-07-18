import React, { Component } from "react";
import Article from "./Article";
import Loading from "../Loading";
import Comments from "../Comments";
export default class SingleArticle extends Component {
  state = {
    article: {},
    loading: true
  };

  async componentDidMount() {
    let article = this.props.articles.find(
      article => article.slug === this.props.match.params.slug
    );

    if (article) {
      this.setState({ article, loading: false });
    } else {
      try {
        article = await this.props.getArticle(this.props.match.params.slug);
        this.setState({ article, loading: false });
      } catch (e) {
        console.log("error: ", e);
        if (e.status === 404) {
          this.props.history.push("/404");
        }
      }
    }
  }

  render() {
    const { loading } = this.state;
    // console.log(document.location);
    return (
      <>
        {loading && (
          <div className="text-center">
            <Loading />
          </div>
        )}
        {!loading && (
          <>
            <Article article={this.state.article} />
            <Comments
              article={this.state.article}
              url={document.location.href}
            />
          </>
        )}
      </>
    );
  }
}
