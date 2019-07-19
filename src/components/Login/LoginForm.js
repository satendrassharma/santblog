import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function LoginForm({
  handleSubmit,
  handleInputChange,
  errors,
  loading
}) {
  return (
    <div
      className="mh-fullscreen bg-img center-vh p-20"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-girl.jpg)`
      }}
    >
      <div
        className="card card-shadowed p-50 w-400 mb-0"
        style={{ maxWidth: "100%" }}
      >
        <h5 className="text-uppercase text-center">Login</h5>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="email"
              name="email"
              onChange={handleInputChange}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <button
              className="btn btn-bold btn-block btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          </div>
        </form>
        <hr className="w-30" />
        <p className="text-center text-muted fs-13 mt-20">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired
};
