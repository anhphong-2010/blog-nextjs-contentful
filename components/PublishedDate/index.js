import {
  formatPublishedDateForDateTime,
  formatPublishedDateForDisplay,
} from "@formatters/date-fn";

export function PublishedDate(props) {
  const { date, classStr } = props;

  return (
    <time
      className={`font-normal ${classStr}`}
      dateTime={formatPublishedDateForDateTime(date)}
    >
      {formatPublishedDateForDisplay(date)}
    </time>
  );
}

export default PublishedDate;
