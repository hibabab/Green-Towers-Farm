import { NavLink } from 'react-router-dom';

function SideBar() {
  const linkClass = ({ isActive }) =>
    `flex items-center px-2 py-1.5 rounded-base group transition-colors ${
      isActive
        ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
        : 'text-gray-700 hover:bg-green-50 hover:text-green-700 dark:text-gray-300 dark:hover:bg-green-900/30 dark:hover:text-green-400'
    }`;

  const iconClass = ({ isActive }) =>
    `shrink-0 w-5 h-5 transition-colors ${
      isActive ? 'text-green-600' : 'text-gray-500 group-hover:text-green-600'
    }`;

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-gray-100 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-start">
            <a href="#" className="flex items-center gap-2">
              <svg className="h-8 w-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="10" fill="#16a34a"/>
                <path d="M20 8 C12 8 8 14 8 20 C8 28 16 32 20 32 C20 32 20 22 20 18 C20 22 20 32 20 32 C24 32 32 28 32 20 C32 14 28 8 20 8Z" fill="white" opacity="0.9"/>
                <rect x="19" y="18" width="2" height="14" rx="1" fill="white" opacity="0.7"/>
              </svg>
              <span className="self-center text-lg font-bold whitespace-nowrap text-green-700 dark:text-green-400 tracking-wide">
                Green Tower Farm
              </span>
            </a>
          </div>
        </div>
      </nav>

      <aside className="fixed top-14 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 border-e border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <ul className="space-y-1 font-medium">

            {/* Dashboard */}
            <li>
              <NavLink to="/admin" end className={linkClass}>
                {(state) => (
                  <>
                    <svg className={iconClass(state)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"/>
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"/>
                    </svg>
                    <span className="ms-3">Dashboard</span>
                  </>
                )}
              </NavLink>
            </li>

            {/* Products */}
            <li>
              <NavLink to="/admin/product" className={linkClass}>
                {(state) => (
                  <>
                    <svg className={iconClass(state)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                  </>
                )}
              </NavLink>
            </li>

            {/* Clients */}
            <li>
              <NavLink to="/admin/client" className={linkClass}>
                {(state) => (
                  <>
                    <svg className={iconClass(state)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0v1m0 0c-2 0-4 1.5-4 4h8c0-2.5-2-4-4-4Z"/>
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 0c-1.5 0-3 1-3 3h4"/>
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 0c1.5 0 3 1 3 3h-4"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Clients</span>
                  </>
                )}
              </NavLink>
            </li>

            {/* Commandes */}
            <li>
              <NavLink to="/admin/commandes" className={linkClass}>
                {(state) => (
                  <>
                    <svg className={iconClass(state)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Commandes</span>
                  </>
                )}
              </NavLink>
            </li>

            {/* Formation */}
            <li>
              <NavLink to="/admin/formation" className={linkClass}>
                {(state) => (
                  <>
                    <svg className={iconClass(state)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0v1m0 0c-2 0-4 1.5-4 4h8c0-2.5-2-4-4-4Z"/>
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 0c-1.5 0-3 1-3 3h4"/>
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 0c1.5 0 3 1 3 3h-4"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Formation</span>
                  </>
                )}
              </NavLink>
            </li>

            {/* Contact */}
            <li>
              <NavLink to="/admin/contact" className={linkClass}>
                {(state) => (
                  <>
                    <svg className={iconClass(state)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Contact</span>
                  </>
                )}
              </NavLink>
            </li>

          </ul>
        </div>
      </aside>
    </>
  );
}

export default SideBar;