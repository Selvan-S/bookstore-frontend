import { Link } from "react-router-dom";

export default function PaginationBar({ currentPage, totalPage }) {
  const maxPage = Math.min(totalPage, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));
  const numberedPageItem = [];

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItem.push(page);
  }
  return (
    <>
      <div className="sm:flex sm:justify-center sm:items-center sm:gap-2 hidden sm:block my-4">
        {numberedPageItem.map((pg, i) => (
          <div key={i}>
            <button
              className={`  ${
                currentPage == pg
                  ? "relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none pointer-events-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  : "relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              }`}
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

      <div className="flex justify-center items-center gap-8 block sm:hidden my-4">
        {currentPage > 1 && (
          <button
            className={`relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="button"
          >
            <Link to={"?page=" + (parseInt(currentPage) - 1)}>
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
        <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
          Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
          <strong className="text-gray-900">{totalPage}</strong>
        </p>
        {currentPage < totalPage && (
          <button
            className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <Link to={`?page=${parseInt(currentPage) + 1}`}>
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
