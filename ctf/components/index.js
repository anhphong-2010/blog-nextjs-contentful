import _ from "lodash";
import importAll from "import-all.macro";

import DIContainer from "@utils/diContainer";

const layoutContainer = new DIContainer();

layoutContainer.loadDir([importAll.sync("./**/index.js")]);

export const resolve = (itemData) => {
  const componentName = _.get(itemData, "name");
  if (layoutContainer.has(componentName)) {
    return layoutContainer.get(componentName);
  }
  return null;
};

export const resolveLayout = resolve;
