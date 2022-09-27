import _ from "lodash";
import useBreakpoints from "@hooks/useBreakpoint";

const findMinSnap = (range, val) => {
  let rtn = range[0];
  for (const refVal of range) {
    if (refVal <= val) {
      rtn = refVal;
    } else {
      break;
    }
  }
  return rtn;
};

const ComputeResProps = (props) => {
  const screens = useBreakpoints();
  const screenSizes = _.keys(screens);
  const snapRanges = [];
  const screenIndexes = {};
  _.forEach(screenSizes, (size, index) => {
    if (props[size]) {
      snapRanges.push(index);
    }
    screenIndexes[size] = index;
  });

  let propVal;
  _.map(screens, (value, key) => {
    if (value) {
      if (_.has(props, key)) {
        propVal = _.get(props, key);
      } else {
        const snapScreenIndex = findMinSnap(snapRanges, screenIndexes[key]);
        const snapScreen = screenSizes[snapScreenIndex];
        propVal = _.get(props, snapScreen);
      }
    }
  });
  propVal = propVal || _.get(props, _.last(_.keys(props)));
  propVal = _.isFunction(propVal) ? propVal() : propVal;
  return propVal;
};

export const ResponsiveProps = ({ children, ...props }) => {
  const resProps = ComputeResProps(props);
  if (_.isFunction(children)) {
    return children(resProps) || null;
  }
  return children || null;
};
