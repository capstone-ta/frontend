import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { RoleContext } from '../utils/roleProvider';
import AuthProvider from '../utils/authProvider';

const Sidebar:React.FC<{clicked: string}>= ({clicked}) => {
    let baseClass = ' text-base font-normal flex items-center p-2 pl-4 group';
    let baseImage = ' w-6 h-6 transition duration-75'

    const { role, setRole } = useContext(RoleContext);


  const authProvider = AuthProvider()

  const handlerLogOut = () => {
      authProvider.setJwt("");
      authProvider.setUUID("");
      setRole("");
   }
    
    return (
        <aside id="sidebar" className=" fixed hidden z-20 h-full top-0 left-0 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
         <div className="relative flex-1 flex flex-col min-h-0 bg-white pt-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
               <div className='w-full'>
                  <img src="https://dti.itb.ac.id/wp-content/uploads/2020/09/logo_itb_1024.png" className="h-28 mx-auto mb-5" alt="ITB Logo" />
               </div>
               <div className="flex-1 bg-white divide-y space-y-1">
                  <ul className="pb-2">
                     <li>
                        <Link to="/dashboard/" className={clicked === "dashboard" ?"bg-indigo-100 text-indigo-500" + baseClass  : "text-gray-500 hover:bg-gray-100 " + baseClass}>
                           <svg className={clicked === "dashboard" ? "text-indigo-500 " + baseImage : "text-gray-500 " + baseImage} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 2.5L2 9h2v8h4v-5h4v5h4V9h2L10 2.5z"/>
                           </svg>
                           <span className="ml-3">Dashboard</span>
                        </Link>
                     </li>
                     <li>
                        <Link to="/dashboard/analysis" className={clicked === "pengujian" ?"bg-indigo-100 text-indigo-500 " + baseClass  : "text-gray-500 hover:bg-gray-100 hover:bg-gray-100 " + baseClass}>
                           <svg className={clicked === "pengujian" ? "text-indigo-500 " + baseImage : "text-gray-500 " + baseImage} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                              <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                           </svg>
                           <span className="ml-3 flex-1 whitespace-nowrap">Analisis</span>
                        </Link>
                     </li>
                     {role === "ADMIN" ? 
                     <li>
                        <Link to="/dashboard/user-configuration" className={clicked === "konfigurasi" ?"bg-indigo-100 text-indigo-500 " + baseClass  : "text-gray-500 hover:bg-gray-100 " + baseClass}>
                           <svg className={clicked === "konfigurasi" ? "text-indigo-500 " + baseImage : "text-gray-500 " + baseImage} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                           </svg>
                           <span className="ml-3 flex-1 whitespace-nowrap">Konfigurasi Pengguna</span>
                        </Link>
                     </li> : <></>}
                     <li>
                        <Link to="/dashboard/profile" className={clicked === "pengguna" ?"bg-indigo-100 text-indigo-500 " + baseClass  : "text-gray-500 hover:bg-gray-100 " + baseClass}>
                           <svg className={clicked === "pengguna" ? "text-indigo-500 " + baseImage : "text-gray-500 " + baseImage} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                           </svg>
                           <span className="ml-3 flex-1 whitespace-nowrap">Profil</span>
                        </Link>
                     </li>
                      <li>
                        <Link to="/dashboard/statistics" className={clicked === "statistics" ?"bg-indigo-100 text-indigo-500 " + baseClass  : "text-gray-500 hover:bg-gray-100 " + baseClass}>
                           <svg className={clicked === "statistics" ? "text-indigo-500 " + baseImage : "text-gray-500 " + baseImage} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                           </svg>
                           <span className="ml-3 flex-1 whitespace-nowrap">Statistik</span>
                        </Link>
                     </li>
                  </ul>
                  <div className="space-y-2 pt-2">
                        <Link onClick={() => handlerLogOut()} to="/" className={clicked === "keluar" ?"bg-indigo-100 text-indigo-500 " + baseClass  : "text-gray-500 hover:bg-gray-100 " + baseClass}>
                           <svg className={clicked === "keluar" ? "text-indigo-500 " + baseImage : "text-gray-500 " + baseImage} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path>
                           </svg>
                           <span className="ml-3 flex-1 whitespace-nowrap">Keluar</span>
                        </Link>
                  </div>
               </div>
            </div>
         </div>
      </aside>
    )
}

export default Sidebar;