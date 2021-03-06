import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import importAll from "import-all.macro";
import { hexToCSSFilter } from "hex-to-css-filter";

const svgs = importAll.sync("./svgs/*.svg");

const svgsx = {};

export const allSvgs = {};
export const allIcons = [];

const processIcons = () => {
  [svgsx, svgs].map((icons) => {
    return _.map(icons, (data, key) => {
      const iconName = key.split("/").pop().split(".")[0];
      allSvgs[iconName] = data;
      allIcons.push(iconName);
    });
  });
};

processIcons();

export const getFilterCss = (fill) => {
  try {
    const cssFilter = hexToCSSFilter(fill, {
      acceptanceLossPercentage: 1,
      maxChecks: 10,
    });
    const cssFilterValue = cssFilter.filter.replace(";", "");
    return { filter: cssFilterValue };
  } catch (err) {}
  return {};
};

export const Icons = ({ name, size = 18, ...props }) => {
  const Comp = _.get(allSvgs, [name, "default"]);
  if (!Comp) return null;
  return (
    <Comp
      style={{
        ...getFilterCss(props.fill),
      }}
      width={size}
      height={size}
      {...props}
    />
  );
};

Icons.getSvg = ({ name, size = 18, ...props }) => {
  return new Promise((res) => {
    const container = document.createElement("div");
    ReactDOM.render(Icons({ name, size, ...props }), container, () => {
      res(container.innerHTML);
    });
  });
};

export const Icon = Icons;

export const icons = (props) => <Icons {...props} />;

export default Icons;
