import React, { Component } from "react";
import PropTypes from "prop-types";
import CreateArticleForm from "./CreateArticleForm";
import draftToHtml from "draftjs-to-html";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState
} from "draft-js";
export default class CreateArticle extends Component {
  state = {
    image: null,
    title: "",
    category: null,
    content: EditorState.createEmpty(),
    categories: [],
    errors: [],
    editing: false,
    article: null,
    submitting: false
  };
  handleEditorState = editorState => {
    this.setState({
      content: editorState
    });
  };
  async componentDidMount() {
    if (this.props.match.params.slug) {
      const article = this.props.articles.find(
        articleInArray => articleInArray.slug === this.props.match.params.slug
      );
      if (!article) {
        this.props.history.push("/user/articles");
        return;
      }

      const categories = await this.props.getArticleCategories();
      console.log(article);
      const blocksFromHTML = convertFromHTML(article.content);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );

      this.setState({
        editing: true,
        article,
        categories,
        title: article.title,
        category: article.category_id,
        content: EditorState.createWithContent(state)
      });
    } else {
      try {
        const categories = await this.props.getArticleCategories();
        this.setState({ categories });
      } catch (e) {
        console.log(e);
      }
    }
  }

  updateArticle = async event => {
    event.preventDefault();
    this.setState({ submitting: true });
    try {
      await this.props.updateArticle(
        {
          title: this.state.title,
          image: this.state.image,
          content: draftToHtml(
            convertToRaw(this.state.content.getCurrentContent())
          ),
          category: this.state.category
        },
        this.state.article,
        this.props.token
      );
      this.props.notyService.success("Article updated successfully.");

      this.props.history.push("/");
    } catch (errors) {
      console.log(errors);
      this.props.notyService.error(
        "Please check for errors.Something went wrong."
      );

      this.setState({ errors, submitting: false });
    }
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state);
    this.setState({ submitting: true });
    try {
      await this.props.createArticle(
        {
          title: this.state.title,
          content: draftToHtml(
            convertToRaw(this.state.content.getCurrentContent())
          ),
          category: this.state.category,
          image: this.state.image
        },
        this.props.token
      );
      this.props.notyService.success("Article created successfully.");
      this.props.history.push("/");
    } catch (errors) {
      console.log(errors);
      this.props.notyService.error(
        "Please check for errors. Something went wrong."
      );
      this.setState({ errors, submitting: false });
    }
  };
  render() {
    return (
      <CreateArticleForm
        handleInputChange={this.handleInputChange}
        categories={this.state.categories}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
        editing={this.state.editing}
        article={this.state.article}
        title={this.state.title}
        content={this.state.content}
        category={this.state.category}
        updateArticle={this.updateArticle}
        handleEditorState={this.handleEditorState}
        submitting={this.state.submitting}
      />
    );
  }
}

CreateArticle.propTypes = {
  getArticleCategories: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  updateArticle: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string
    }).isRequired
  }).isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      category: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired,
      created_at: PropTypes.string.isRequired
    })
  ),
  notyService: PropTypes.shape({
    success: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired
  }).isRequired
};

CreateArticle.defaultProps = {
  updateArticle: () => {},
  articles: []
};
