import React from "react";

export default function Banner({ backgroundImage, title, subTitle }) {
  return (
    <header
      class="header header-inverse"
      style={{
        backgroundImage: backgroundImage
      }}
      data-overlay="8"
    >
      <div class="container text-center">
        <div class="row">
          <div class="col-12 col-lg-8 offset-lg-2">
            <h1>{title}</h1>
            <p class="fs-20 opacity-70">{subTitle}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
