import Header from "@components/Header";
import Layout from "./Layout";
import _ from "lodash";

export default function LayoutSideBar({ children }) {
  return (
    <div className="container mx-4 sm:mx-auto">
      <Header />
      <div className="flex flex-col lg:flex-row lg:space-x-3 w-full">
        <div className="basis-3/4">
          <Layout name="side-bar">{_.get(children, "0", {})}</Layout>
        </div>
        <Layout name="content">{_.get(children, "1", {})}</Layout>
      </div>
    </div>
  );
}
