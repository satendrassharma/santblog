import React from "react";
import { Link } from "react-router-dom";
export default function Page404() {
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
        <img src={`${process.env.PUBLIC_URL}/assets/img/404.gif`} alt="..." />

        <p className="text-center text fs-13 mt-20">
          Go to home <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
}
