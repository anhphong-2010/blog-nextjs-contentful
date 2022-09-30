import React from "react";
import _ from "lodash";
import Tag from "@components/Tag";

export function Tags(props) {
  const { tags } = props;
  return (
    <div className="flex flex-wrap space-x-reverse justify-start gap-3">
      {_.map(tags, (tag, index) => (
        <React.Fragment key={index}>
          <Tag tag={tag} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default Tags;
