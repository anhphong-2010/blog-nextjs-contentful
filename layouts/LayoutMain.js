import Header from "@components/Header";

export default function LayoutMain({ children }) {
  return (
    <div className="transition ease-in-out duration-300">
      <div className="container mx-4 sm:mx-auto">
        <Header />
      </div>
      {children}
    </div>
  );
}
