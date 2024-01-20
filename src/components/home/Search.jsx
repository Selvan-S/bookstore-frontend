import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";

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

export default function Search({ search }) {
  const [selected, setSelected] = useState(searchBy[0]);
  const searchFilter = (filter) => {
    search(filter);
  };
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button className="w-28 sm:w-32 justify-between flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-xs sm:text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
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
            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-36 overflow-auto py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {searchBy.map((filter) => (
                <Listbox.Option
                  onClick={() => searchFilter(filter.name)}
                  key={filter.id}
                  className={({ active }) =>
                    classNames(
                      active
                        ? "dark:bg-gray-600 dark:text-white bg-gray-200 text-gray-900"
                        : "dark:text-white text-gray-900",
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
