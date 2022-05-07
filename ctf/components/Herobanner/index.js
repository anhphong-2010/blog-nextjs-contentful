import _ from "lodash";
import React from "react";
import Image from "next/image";

const Herobanner = ({ sectionData }) => {
  return (
    <div className="flex items-center space-x-4">
      <p style={{ letterSpacing: 2 }} className="text-3xl tracking-wide">
        {_.get(sectionData, "description", "")}
      </p>
      <div className="w-full">
        <img
          className="animate-fly"
          src={_.get(sectionData, "image.url")}
          alt={_.get(sectionData, "name")}
          // layout="responsive"
        />
      </div>
    </div>
  );
};

export default Herobanner;
