import _ from "lodash";
import React from "react";

const Herobanner = ({ sectionData }) => {
  return (
    <div className="container mx-4 sm:mx-auto">
      <div className="flex flex-col flex-col-reverse md:flex-row items-center md:space-x-4">
        <p
          style={{ letterSpacing: 2 }}
          className="text-xl lg:text-2xl xl:text-3xl tracking-wide"
        >
          {_.get(sectionData, "description", "")}
        </p>
        <div className="w-full sm:w-2/3 md:w-full">
          <img
            className="animate-fly"
            src={_.get(sectionData, "image.url")}
            alt={_.get(sectionData, "name")}
            // layout="responsive"
          />
        </div>
      </div>
    </div>
  );
};

export default Herobanner;
