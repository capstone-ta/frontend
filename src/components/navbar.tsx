import React, { useState, useContext } from 'react';
import { RoleContext } from '../utils/roleProvider';
import { Link } from 'react-router-dom';
import AuthProvider from '../utils/authProvider';

const Navbar:React.FC<{clicked: string}>= ({clicked}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  let baseClass = ' text-base font-normal rounded-lg flex items-center p-2 group';
let baseImage = ' w-6 h-6 transition duration-75'

    const { role, setRole } = useContext(RoleContext);

    const authProvider = AuthProvider()

  const handlerLogOut = () => {
      authProvider.setJwt("");
      authProvider.setUUID("");
      setRole("");
   }

  return (
    <>
      <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-expanded="true"
                aria-controls="sidebar"
                className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
              >
                {!sidebarOpen ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </button>
              <a href="#" className="text-xl font-bold flex items-center lg:ml-2.5">
                <img src="https://dti.itb.ac.id/wp-content/uploads/2020/09/logo_itb_1024.png" className="h-6 mr-2" alt="ITB Logo" />
                <span className="self-center whitespace-nowrap">ITB</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-white transition-transform transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
               <div className="flex-1 px-3 bg-white divide-y space-y-1">
                <div className='w-full'>
                    <img src="https://dti.itb.ac.id/wp-content/uploads/2020/09/logo_itb_1024.png" className="h-28 ml-1 mb-5" alt="ITB Logo" />
                </div>
                  <ul className="space-y-2 pb-2">
                     <li>
                        <Link to="/dashboard/" className={clicked === "dashboard" ?"bg-indigo-500 text-gray-100 hover:bg-indigo-700 " + baseClass  : "text-gray-500 hover:bg-gray-100 " + baseClass}>
                           <svg className={clicked === "dashboard" ? "text-gray-100 " + baseImage : "text-gray-500 " + baseImage} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 2.5L2 9h2v8h4v-5h4v5h4V9h2L10 2.5z"/>
                           </svg>
                           <span className="ml-3">Dashboard</span>
                        </Link>
                     </li>
                     <li>
                        <Link to="/dashboard/analysis" className={clicked === "pengujian" ?"bg-indigo-500 text-gray-100 " + baseClass  : "text-gray-500 hover:bg-gray-100 hover:bg-gray-100 " + baseClass}>
                           <svg className={clicked === "pengujian" ? "text-gray-100 " + baseImage : "text-gray-500 " + baseImage} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                              <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                           </svg>
                           <span className="ml-3 flex-1 whitespace-nowrap">Analisis</span>
                        </Link>
                     </li>
                     {role === "ADMIN" ? 
                     <li>
                        <Link to="/dashboard/user-configuration" className={clicked === "konfigurasi" ?"bg-indigo-500 text-gray-100 " + baseClass  : "text-gray-500 hover:bg-gray-100 " + baseClass}>
                           <svg className={clicked === "konfigurasi" ? "text-gray-100 " + baseImage : "text-gray-500 " + baseImage} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                           </svg>
                           <span className="ml-3 flex-1 whitespace-nowrap">Konfigurasi Pengguna</span>
                        </Link>
                     </li> : <></>}
                     <li>
                        <Link to="/dashboard/profile" className={clicked === "pengguna" ?"bg-indigo-500 text-gray-100 " + baseClass  : "text-gray-500 hover:bg-gray-100 " + baseClass}>
                           <svg className={clicked === "pengguna" ? "text-gray-100 " + baseImage : "text-gray-500 " + baseImage} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                           </svg>
                           <span className="ml-3 flex-1 whitespace-nowrap">Profil</span>
                        </Link>
                     </li>
                      <li>
                        <Link to="/dashboard/statistics" className={clicked === "statistics" ?"bg-indigo-500 text-gray-100 " + baseClass  : "text-gray-500 hover:bg-gray-100 " + baseClass}>
                           <svg className={clicked === "statistics" ? "text-gray-100 " + baseImage : "text-gray-500 " + baseImage} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                           <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                           </svg>
                           <span className="ml-3 flex-1 whitespace-nowrap">Statistik</span>
                        </Link>
                     </li>
                  </ul>
                  <div className="space-y-2 pt-2">
                        <Link onClick={() => handlerLogOut()} to="/" className={clicked === "keluar" ?"bg-indigo-500 text-gray-100 " + baseClass  : "text-gray-500 hover:bg-gray-100 " + baseClass}>
                           <svg className={clicked === "keluar" ? "text-gray-100 " + baseImage : "text-gray-500 " + baseImage} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                           <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path>
                           </svg>
                           <span className="ml-3 flex-1 whitespace-nowrap">Keluar</span>
                        </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
      )}
    </>
  );
};

export default Navbar;


/* const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                    <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                        <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        <svg id="toggleSidebarMobileClose" className="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <a href="#" className="text-xl font-bold flex items-center lg:ml-2.5">
                    <img src="https://dti.itb.ac.id/wp-content/uploads/2020/09/logo_itb_1024.png" className="h-6 mr-2" alt="ITB Logo"></img>
                    <span className="self-center whitespace-nowrap">ITB</span>
                    </a>
                </div>
            </div>
            </div>
        </nav>
    )
}

export default Navbar; */