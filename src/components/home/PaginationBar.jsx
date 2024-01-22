import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PaginationBar({
  currentPage,
  totalPage,
  paginationMode,
}) {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalPagesNum, setTotalPagesNum] = useState(1);
  const [isDark, setIsDark] = useState(true);
  const maxPage = Math.min(totalPagesNum, Math.max(currentPageNum + 4, 10));
  const minPage = Math.max(1, Math.min(currentPageNum - 5, maxPage - 9));
  useEffect(() => {
    setCurrentPageNum(parseInt(currentPage));
    setTotalPagesNum(parseInt(totalPage));
  }, [currentPage, totalPage]);
  useEffect(() => {
    setIsDark(paginationMode);
  }, [paginationMode]);

  const numberedPageItem = [];

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItem.push(page);
  }
  return (
    <>
      <div className="sm:flex sm:justify-center sm:items-center sm:gap-2 hidden my-4">
        {numberedPageItem.map((pg, i) => (
          <div key={i}>
            <button
              className={`${
                currentPageNum == pg
                  ? `${
                      isDark
                        ? "border bg-gray-400 border-gray-700 text-gray-800 hover:bg-gray-700 hover:text-white pointer-events-none"
                        : "bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none pointer-events-none"
                    }`
                  : `${
                      isDark
                        ? "border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                        : "text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                    }`
              } relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              type="button"
            >
              <Link to={"?page=" + pg}>
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 p-2">
                  <strong>{pg}</strong>
                </span>
              </Link>
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-8 sm:hidden my-4">
        {currentPageNum > 1 && (
          <button
            className={`${
              isDark
                ? "bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                : "text-gray-900 border border-gray-900"
            } relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase  transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="button"
          >
            <Link to={"?page=" + (currentPageNum - 1)}>
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  ></path>
                </svg>
              </span>
            </Link>
          </button>
        )}
        <p
          className={`${
            isDark ? "text-gray-500" : "text-gray-700"
          } block font-sans text-base antialiased font-normal leading-relaxed`}
        >
          Page{" "}
          <strong className={`${isDark ? "text-white" : "text-gray-900"}`}>
            {currentPageNum}
          </strong>{" "}
          of{" "}
          <strong className={`${isDark ? "text-white" : "text-gray-900"}`}>
            {totalPagesNum}
          </strong>
        </p>
        {currentPageNum < totalPagesNum && (
          <button
            className={`${
              isDark
                ? "bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                : "text-gray-900 border border-gray-900"
            } relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase  transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="button"
          >
            <Link to={`?page=${currentPageNum + 1}`}>
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </span>
            </Link>
          </button>
        )}
      </div>
    </>
  );
}
