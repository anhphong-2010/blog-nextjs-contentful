import _ from "lodash";

export function Tags(props) {
  const { tags } = props;
  return (
    <div className="flex items-center space-x-4 flex-wrap">
      {_.map(tags, (tag, index) => (
        <div key={index} className="px-2 p-1 border-4 border-sky-300 dark:border-indigo-500 text-xs sm:text-sm rounded-3xl bg-gray-900 dark:bg-gray-100 text-gray-200 dark:text-gray-900 font-semibold">
          #{_.get(tag, "title", "")}
        </div>
      ))}
    </div>
  );
}

export default Tags;
