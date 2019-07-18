import React from "react";
import Disqus from "disqus-react";
// Alternatively, import specific members:
// import { DiscussionEmbed, CommentCount, CommentEmbed } from 'disqus-react';

class Comments extends React.Component {
  render() {
    const disqusShortname = "santblog2";
    const disqusConfig = {
      // this.props.article.url
      url: this.props.url,
      identifier: this.props.article.id,
      title: this.props.article.title
    };

    return (
      <div className="section bt-1 bg-grey">
        <div className="container">
          <div className="text-center p-5">COMMENTS HERE.</div>
          {/* <Disqus.CommentCount
            shortname={disqusShortname}
            config={disqusConfig}
          >
            Comments
          </Disqus.CommentCount> */}

          {/* <Disqus.CommentEmbed
          commentId={this.props.article.featuredComment}
          showMedia={true}
          height={160}
        /> */}

          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </div>
      </div>
    );
  }
}
export default Comments;
