import React from "react";
import { Link } from "react-router-dom";
export default function RegisterForm({
  handleInputChange,
  handleSubmit,
  errors,
  loading
}) {
  return (
    <div
      class="mh-fullscreen bg-img center-vh p-20"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-girl.jpg)`
      }}
    >
      <div
        className="card card-shadowed p-50 w-400 mb-0"
        style={{ maxWidth: "100%" }}
      >
        <h5 className="text-uppercase text-center">Register</h5>
        <br />
        <br />
        <form className="form-type-material" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="name"
              onChange={handleInputChange}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Email address"
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
            <input
              type="password"
              className="form-control"
              placeholder="Password (confirm)"
              name="password_confirmation"
              onChange={handleInputChange}
            />
          </div>
          <br />
          <button
            className="btn btn-bold btn-block btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <hr className="w-30" />
        <p className="text-center text-muted fs-13 mt-20">
          Already have an account?
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
