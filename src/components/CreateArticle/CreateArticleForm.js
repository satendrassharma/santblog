import React from "react";
import PropTypes from "prop-types";
import Banner from "../Banner";
import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function CreateArticleForm({
  handleInputChange,
  handleSubmit,
  categories,
  errors,
  editing,
  article,
  title,
  content,
  category,
  updateArticle,
  handleEditorState,
  submitting
}) {
  return (
    <div>
      <Banner
        backgroundImage="url(/assets/img/bg-laptop.jpg)"
        title="Editing Article"
        subTitle=""
      />

      <main className="main-content">
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-12">
                <ul className="list-group">
                  {errors &&
                    errors.map(error => (
                      <li
                        key={error.message}
                        className="list-group-item text-danger"
                      >
                        {error.message}
                      </li>
                    ))}
                </ul>
                <form
                  className="p-30 bg-gray rounded"
                  method="POST"
                  data-form="mailer"
                  onSubmit={editing ? updateArticle : handleSubmit}
                >
                  <div className="row">
                    <div className="form-group col-md-12 my-5">
                      <input
                        type="file"
                        className="form-control"
                        name="image"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={handleInputChange}
                        value={title}
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <select
                        name="category"
                        className="form-control form-control-lg"
                        onChange={handleInputChange}
                        value={category || ""}
                      >
                        <option value>Select category</option>
                        {categories &&
                          categories.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <Editor
                      editorState={content}
                      onEditorStateChange={handleEditorState}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      className="btn btn-lg btn-primary"
                      type="submit"
                      disabled={submitting}
                    >
                      {submitting
                        ? "loading"
                        : editing
                        ? "Update article"
                        : "create article"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

CreateArticleForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired
    })
  ).isRequired,
  editing: PropTypes.bool.isRequired,
  article: PropTypes.shape({
    title: PropTypes.string.isRequired
  }),
  title: PropTypes.string.isRequired,
  content: PropTypes.objectOf(PropTypes.any).isRequired,
  category: PropTypes.number,
  updateArticle: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

CreateArticleForm.defaultProps = {
  article: null,
  category: null
};
