import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const userID = cookies.token || null;

  const handleLogout = () => {
    setCookie("token", "", { path: "/" });
    window.localStorage.removeItem("userID");
    navigate("/login");
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Create Recipe", href: "/create-recipe" },
    { name: "Saved Recipes", href: "/saved-recipe" },
  ];

  return (
    <Disclosure as="nav" className="fixed w-full z-20 top-0 bg-black bg-opacity-50 backdrop-blur-md border-b border-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <NavLink to="/" className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://emojigraph.org/media/facebook/fork-and-knife-with-plate_1f37d-fe0f.png"
                    alt="Logo"
                  />
                </NavLink>
                <div className="hidden md:flex md:ml-10 md:space-x-8">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "text-indigo-400"  
                            : "text-gray-300 hover:text-indigo-300 hover:drop-shadow-lg",
                          "inline-flex items-center px-1 pt-1 text-sm font-medium transition"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-4">
                {userID ? (
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-500 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition"
                  >
                    Login
                  </NavLink>
                )}
              </div>
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden bg-black bg-opacity-60 backdrop-blur-sm border-t border-gray-800">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium transition"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="mt-3 px-3">
                {userID ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-500 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className="block px-3 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}