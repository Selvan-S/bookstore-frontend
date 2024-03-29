import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";

const searchBy = [
  {
    id: 1,
    name: "title",
  },
  {
    id: 2,
    name: "author",
  },
  {
    id: 3,
    name: "publishYear",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Search({ search, mode }) {
  const [selected, setSelected] = useState(searchBy[0]);
  const searchFilter = (filter) => {
    search(filter);
  };
  const [isDark, setIsDark] = useState(null);
  useEffect(() => {
    setIsDark(mode);
  }, [mode]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button
            className={`${
              isDark
                ? "text-white bg-gray-700 hover:bg-gray-600 focus:ring-gray-700 border-gray-600"
                : "text-gray-900 bg-gray-100  border-gray-300  hover:bg-gray-200  focus:ring-gray-100"
            } border focus:ring-4 focus:outline-none w-full sm:w-32 justify-between flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-xs sm:text-sm font-medium text-center rounded-s-lg`}
          >
            <span className="flex items-center">
              <span className=" block truncate capitalize">
                {selected.name}
              </span>
            </span>
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`${
                isDark
                  ? "text-white bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  : "text-gray-900 bg-gray-50  border-gray-300   focus:ring-blue-500 focus:border-blue-500"
              } text-xs rounded-lg border absolute z-10 mt-1 max-h-56 w-36 overflow-auto py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm  block p-2.5 `}
            >
              {searchBy.map((filter) => (
                <Listbox.Option
                  onClick={() => searchFilter(filter.name)}
                  key={filter.id}
                  className={({ active }) =>
                    classNames(
                      active
                        ? `${
                            isDark
                              ? "bg-gray-600 text-white"
                              : "bg-gray-200 text-gray-900"
                          }`
                        : `${isDark ? "text-white" : "text-gray-900"}`,
                      "relative cursor-default select-none py-1 pl-0 pr-0"
                    )
                  }
                  value={filter}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center">
                        <span
                          className={classNames(
                            selected
                              ? "font-semibold capitalize"
                              : "font-normal capitalize",
                            "ml-2 block truncate"
                          )}
                        >
                          {filter.name}
                        </span>
                      </div>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? "text-blue-500" : "text-indigo-600",
                            "absolute inset-y-0 right-0 flex items-center pr-4"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
