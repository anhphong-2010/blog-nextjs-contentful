import {
  formatPublishedDateForDateTime,
  formatPublishedDateForDisplay,
} from "@formatters/date-fn";

export function PublishedDate(props) {
  const { date, classStr, text } = props;

  return (
    <time className={classStr} dateTime={formatPublishedDateForDateTime(date)}>
      {text && `${text} `}
      {formatPublishedDateForDisplay(date)}
    </time>
  );
}

export default PublishedDate;
