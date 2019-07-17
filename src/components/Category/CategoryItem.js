import React from "react";
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
