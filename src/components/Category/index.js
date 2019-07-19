import React, { Component } from "react";
import PropTypes from "prop-types";
import CategoryItem from "./CategoryItem";
import Banner from "../Banner";
export default class Category extends Component {
  state = {
    categories: []
  };

  async componentDidMount() {
    const data = await this.props.getArticleCategories();
    this.setState({ categories: data });
  }
  render() {
    return (
      <div>
        <Banner
          backgroundImage="url(/assets/img/bg-laptop.jpg)"
          title="Categories"
          subTitle=""
        />

        <div className="container">
          <div className="row">
            {this.state.categories.map(category => (
              <div className="col-12 col-md-4" key={category.id}>
                <CategoryItem category={category} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Category.propTypes = {
  getArticleCategories: PropTypes.func.isRequired
};
