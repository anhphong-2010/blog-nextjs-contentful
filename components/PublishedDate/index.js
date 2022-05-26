import {
  formatPublishedDateForDateTime,
  formatPublishedDateForDisplay,
} from "@utils/Date";

export default function PublishedDate(props) {
  const { date, classStr } = props;

  return (
    <time
      className={`flex font-bold ${classStr}`}
      dateTime={formatPublishedDateForDateTime(date)}
    >
      {formatPublishedDateForDisplay(date)}
    </time>
  );
}
