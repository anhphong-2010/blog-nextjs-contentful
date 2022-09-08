import {
  formatPublishedDateForDateTime,
  formatPublishedDateForDisplay,
} from "@utils/date-fn";

export function PublishedDate(props) {
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

export default PublishedDate;
