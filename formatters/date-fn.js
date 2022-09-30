function getMonthStringFromInt(int) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months[int];
}

/*
 * Add a leading zero to a single integer.
 */
function addLeadingZero(num) {
  num = num.toString();
  while (num.length < 2) num = "0" + num;
  return num;
}

const getOrdinalNum = (number) => {
  let selector;

  if (number <= 0) {
    selector = 4;
  } else if ((number > 3 && number < 21) || number % 10 > 3) {
    selector = 0;
  } else {
    selector = number % 10;
  }

  return number + ["th", "st", "nd", "rd", ""][selector];
};

/*
 * Format a blog post published date for a datetime
 * HTML element.
 */
export function formatPublishedDateForDateTime(dateString) {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${addLeadingZero(
    date.getMonth() + 1
  )}-${date.getDate()}`;
}

/*
 * Format a blog post published date for a human to read.
 * Output is e.g. 16 Feb 2020
 */
export function formatPublishedDateForDisplay(dateString) {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  const options = { weekday: "long" };
  const dayOfWeek = new Intl.DateTimeFormat("en-US", options).format(date);
  return `${getMonthStringFromInt(
    date.getMonth()
  )} ${date.getDate()}, ${date.getFullYear()}`;
}

export default {
  formatPublishedDateForDisplay,
  formatPublishedDateForDateTime,
};
