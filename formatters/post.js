import _ from "lodash";

export const postFormatter = {
  title: (itemData) => {
    return _.get(itemData, "title", "");
  },

  authorName: (itemData) => {
    return _.get(itemData, "author.name", "");
  },

  description: (itemData) => {
    return _.get(itemData, "description", "");
  },

  authorAvatar: (itemData) => {
    const name = postFormatter.authorName(itemData);
    if (!_.get(itemData, "author.avatar"))
      return `https://ui-avatars.com/api/?name=${name}`;
    return _.get(itemData, "author.avatar.url", "");
  },

  thumbnail: (itemData) => {
    if (!_.get(itemData, "thumbnail"))
      return "https://placehold.jp/30/DCDCDC/000000/400x200.png?text=ahphong+image";
    return _.get(itemData, "thumbnail.url", "");
  },
};

export default postFormatter;
