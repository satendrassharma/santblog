import React from "react";
import { Link } from "react-router-dom";
import Banner from "../Banner";
import Article from "../Article";
import Loading from "../Loading";
export default function Welcomep({
  articles,
  nextUrl,
  prevUrl,
  handlePagination,
  loading
}) {
  return (
    <>
      <Banner
        backgroundImage="url(/assets/img/bg-gift.jpg)"
        title="Latest Blog Posts"
        subTitle="Read and get updated on how we progress."
      />

      {loading && <Loading />}
      {!loading && (
        <main className="main-content bg-gray">
          <div className="row">
            <div className="col-12 col-lg-6 offset-lg-3">
              {articles &&
                articles.map(article => (
                  <div key={article.id}>
                    <Article article={article} />
                    <hr />
                  </div>
                ))}

              <nav className="flexbox mb-50">
                <a
                  className={`btn btn-white ${prevUrl ? "" : "disabled"}`}
                  onClick={() => handlePagination(prevUrl)}
                >
                  <i className="ti-arrow-left fs-9 mr-4" /> Previous Post
                </a>
                <a
                  className={`btn btn-white ${nextUrl ? "" : "disabled"}`}
                  onClick={() => handlePagination(nextUrl)}
                >
                  Next Post
                  <i className="ti-arrow-right fs-9 ml-4" />
                </a>
              </nav>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
