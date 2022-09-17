import Header from "@components/Header";

export default function LayoutMain({ children }) {
  return (
    <div>
      <div className="container mx-4 sm:mx-auto">
        <Header />
      </div>
      {children}
    </div>
  );
}
