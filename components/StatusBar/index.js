import { useReadingProgress } from "@hooks/useReadingProgress";

export default function StatusBar() {
  const completion = useReadingProgress();
  return (
    <div
      style={{
        transform: `translateX(${completion - 100}%)`,
      }}
      className={`fixed top-0 z-50 w-full transition-transform duration-150 h-1 bg-gradient-to-r from-sky-500 to-indigo-500`}
    />
  );
}
