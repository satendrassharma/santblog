import React from "react";
import Disqus from "disqus-react";
import PropTypes from "prop-types";

class Comments extends React.Component {
  render() {
    const disqusShortname = "santblog2";
    const disqusConfig = {
      url: this.props.url,
      identifier: this.props.article.id,
      title: this.props.article.title
    };

    return (
      <div className="section bt-1 bg-grey">
        <div className="container">
          <div className="text-center p-5">COMMENTS HERE.</div>
          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string,
  title: PropTypes.string
};

export default Comments;
