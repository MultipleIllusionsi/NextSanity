import React from "react";
import BlockContent from "@sanity/block-content-to-react";

import { urlFor } from "lib/api";
import HighlightCode from "./HighlightCode";

const serializers = {
  types: {
    code: ({ node: { language, code, filename } }) => (
      <HighlightCode language={language}>
        {code}
        <div className="code-filename">{filename}</div>
      </HighlightCode>
    ),
    image: ({ node: { asset, alt, position = "center" } }) => {
      return (
        <div className={`blog-image blog-image--${position}`}>
          <img src={urlFor(asset).height(300).fit("max").url()} alt="img" />
          <div className="image-alt">{alt}</div>
        </div>
      );
    },
  },
};

const BlogContent = ({ content }) => {
  return <BlockContent serializers={serializers} blocks={content} />;
};

export default BlogContent;
