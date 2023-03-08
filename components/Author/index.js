import _ from "lodash";
import Image from "next/image";
import { postFormatter } from "@formatters/post";
import PublishedDate from "@components/PublishedDate";

export function Author({ justify, size, data, published, textClassName }) {
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
            <div className={`${textClassName} text-sm font-semibold`}>
              {postFormatter.authorName(data)}
            </div>
            {!!published && (
              <PublishedDate
                classStr="dark:text-white text-xs text-gray-500 font-bold"
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
