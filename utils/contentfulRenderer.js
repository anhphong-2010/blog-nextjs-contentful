import React from "react";
import * as Components from "../ctf/components";

export const contentfulRenderer = {
  renderSection: (section) => {
    if (section) {
      const LayoutComponent = Components.resolveLayout(section);
      if (LayoutComponent) {
        return <LayoutComponent sectionData={section} />;
      }
    }
    return null;
  },
};

export default contentfulRenderer;
