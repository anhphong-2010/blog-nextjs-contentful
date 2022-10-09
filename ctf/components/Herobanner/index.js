import React from "react";
import _ from "lodash";
import FormSearch from "@components/FormSearch";

const Herobanner = ({ sectionData }) => {
  return (
    <div className="container mx-4 sm:mx-auto">
      <div className="flex flex-col flex-col-reverse md:flex-row items-center md:space-x-4">
        <div>
          <p
            style={{ letterSpacing: 2 }}
            className="mb-6 text-xl lg:text-2xl xl:text-3xl tracking-wide"
          >
            {_.get(sectionData, "description", "")}
          </p>
          <FormSearch />
        </div>

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
