import _ from "lodash";

export const postFormatter = {
  title: (itemData) => {
    return _.get(itemData, "title", "");
  },

  description: (itemData) => {
    return _.get(itemData, "description", "");
  },

  thumbnail: (itemData) => {
    if (!_.get(itemData, "thumbnail"))
      return "https://placehold.jp/30/DCDCDC/000000/400x200.png?text=ahphong+image";
    return _.get(itemData, "thumbnail.url", "");
  },
};

export default postFormatter;
