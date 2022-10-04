import _ from "lodash";
import Image from "next/image";
import { postFormatter } from "@formatters/post";
import PublishedDate from "@components/PublishedDate";

export function Author(props) {
  const { justify, size, data, published } = props;

  const justifySys = {
    center: "justify-center",
    start: "justify-start",
    end: "justify-end",
  };
  return (
    <>
      {!!data && (
        <div
          className={`flex ${_.get(
            justifySys,
            justify,
            "justify-start"
          )} items-center space-x-2`}
        >
          <div
            className="relative rounded-full overflow-hidden"
            style={{ width: size ? size : 40, height: size ? size : 40 }}
          >
            <Image
              src={postFormatter.authorAvatar(data)}
              alt={postFormatter.authorName(data)}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>

          <div>
            <div className="text-sm font-semibold">
              {postFormatter.authorName(data)}
            </div>
            {!!published && (
              <PublishedDate
                classStr="text-gray-500 text text-xs dark:text-gray-300 font-bold"
                date={_.get(data, "date")}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Author;
