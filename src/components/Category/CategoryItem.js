import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function CategoryItem({ category }) {
  return (
    <Link to={`/category/${category.id}`}>
      <div
        className="alert alert-link"
        style={{ backgroundColor: "#eceeef", marginTop: "4px", color: "#555" }}
        role="alert"
      >
        {category.name}
      </div>
    </Link>
  );
}

CategoryItem.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })
};
