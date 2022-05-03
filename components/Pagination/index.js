import Link from "next/link";
import PaginationStyles from "@styles/Pagination.module.css";

export default function Pagination(props) {
  const { totalPages, currentPage, prevDisabled, nextDisabled } = props;

  const prevPageUrl =
    currentPage === "2"
      ? "/blog"
      : `/blog/page/${parseInt(currentPage, 10) - 1}`;

  const nextPageUrl = `/blog/page/${parseInt(currentPage, 10) + 1}`;

  return (
    <div className={PaginationStyles.pagination}>
      <ol className={PaginationStyles.pagination__list}>
        <li className={PaginationStyles.pagination__listItem}>
          {prevDisabled && (
            <span className={PaginationStyles.pagination__listItem__disabled}>
              <span
                className={PaginationStyles.pagination__chevronContainer__left}
              >
                {"<"}
              </span>
              <span>Previous page</span>
            </span>
          )}
          {!prevDisabled && (
            <Link href={prevPageUrl}>
              <a>
                <span
                  className={
                    PaginationStyles.pagination__chevronContainer__left
                  }
                >
                  {"<"}
                </span>
                <span>Previous page</span>
              </a>
            </Link>
          )}
        </li>
        <li
          className={`${PaginationStyles.pagination__listItem} ${PaginationStyles.pagination__listItem__pageDescriptor}`}
        >
          Page {currentPage} of {totalPages}
        </li>
        <li className={PaginationStyles.pagination__listItem}>
          {nextDisabled && (
            <span className={PaginationStyles.pagination__listItem__disabled}>
              <span>Next page</span>
              <span
                className={PaginationStyles.pagination__chevronContainer__right}
              >
                {">"}
              </span>
            </span>
          )}
          {!nextDisabled && (
            <Link href={nextPageUrl}>
              <a>
                <span>Next page</span>
                <span
                  className={
                    PaginationStyles.pagination__chevronContainer__right
                  }
                >
                  {">"}
                </span>
              </a>
            </Link>
          )}
        </li>
      </ol>
    </div>
  );
}
