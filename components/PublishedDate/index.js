import {
  formatPublishedDateForDateTime,
  formatPublishedDateForDisplay,
} from "@utils/Date";

export default function PublishedDate(props) {
  const { date } = props;

  return (
    <time
      className="flex dark:text-white text-black"
      dateTime={formatPublishedDateForDateTime(date)}
    >
      {formatPublishedDateForDisplay(date)}
    </time>
  );
}
