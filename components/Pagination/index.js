import Link from "next/link";
import PaginationStyles from "@styles/Pagination.module.css";
import { useTheme } from "next-themes";
import React from "react";
import gstyles from "@gstyles/index";
import { renderPropsComposer } from "@utils/props-composer";

export default function Pagination(props) {
  const {
    totalPages,
    currentPage,
    prevDisabled,
    nextDisabled,
    url,
    urlPagination,
  } = props;

  const prevPageUrl =
    currentPage === "2"
      ? `/${url}`
      : `/${urlPagination}/${parseInt(currentPage, 10) - 1}`;

  const nextPageUrl = `/${urlPagination}/${parseInt(currentPage, 10) + 1}`;
  const { systemTheme, theme, setTheme } = useTheme("light");
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className={PaginationStyles.pagination}>
      <ol className={PaginationStyles.pagination__list}>
        <li className={PaginationStyles.pagination__listItem}>
          {prevDisabled && null}
          {!prevDisabled && (
            <Link href={prevPageUrl} passHref>
              <a>
                <span
                  className={
                    PaginationStyles.pagination__chevronContainer__left
                  }
                >
                  {renderPropsComposer(
                    {
                      matcher: (props) => props === "dark",
                      render: () => (
                        <span>
                          {gstyles.icons({
                            name: "arrow-left",
                            size: 24,
                            fill: "#ffffff",
                          })}
                        </span>
                      ),
                    },
                    {
                      matcher: (props) => props === "light",
                      render: () => (
                        <span>
                          {gstyles.icons({
                            name: "arrow-left",
                            size: 24,
                            fill: "#000000",
                          })}
                        </span>
                      ),
                    },
                    () => null
                  )(currentTheme)}
                </span>
                <span>Previous page</span>
              </a>
            </Link>
          )}
        </li>
        <li
          className={`hidden md:block ${PaginationStyles.pagination__listItem} ${PaginationStyles.pagination__listItem__pageDescriptor}`}
        >
          Page {currentPage} of {totalPages}
        </li>
        <li className={PaginationStyles.pagination__listItem}>
          {nextDisabled && null}
          {!nextDisabled && (
            <Link href={nextPageUrl} passHref>
              <a>
                <span>Next page</span>
                <span
                  className={
                    PaginationStyles.pagination__chevronContainer__right
                  }
                >
                  {renderPropsComposer(
                    {
                      matcher: (props) => props === "dark",
                      render: () => (
                        <span>
                          {gstyles.icons({
                            name: "arrow-right",
                            size: 24,
                            fill: "#ffffff",
                          })}
                        </span>
                      ),
                    },
                    {
                      matcher: (props) => props === "light",
                      render: () => (
                        <span>
                          {gstyles.icons({
                            name: "arrow-right",
                            size: 24,
                            fill: "#000000",
                          })}
                        </span>
                      ),
                    },
                    () => null
                  )(currentTheme)}
                </span>
              </a>
            </Link>
          )}
        </li>
      </ol>
    </div>
  );
}
