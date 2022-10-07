import _ from "lodash";

const normalizeArgs = (fn) => {
  if (fn && fn.matcher) return fn;
  return {
    matcher: () => true,
    render: fn,
  };
};

export const renderPropsComposer = (...fns) => {
  const ListFns = _.map(fns, normalizeArgs);

  return (props) => {
    const renderPropsObj = _.find(ListFns, (fn) => fn.matcher(props));
    if (renderPropsObj) {
      return renderPropsObj.render(props);
    }
    // default
    return null;
  };
};
