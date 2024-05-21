import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { RoleContext } from '../utils/roleProvider';
import AuthProvider from '../utils/authProvider';

const Sidebar:React.FC<{clicked: string}>= ({clicked}) => {
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
        <aside id="sidebar" className=" fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
         <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
               <div className="flex-1 px-3 bg-white divide-y space-y-1">
                  <ul className="space-y-2 pb-2">
                     <li>
                        <Link to="/dashboard/" className={clicked === "dashboard" ?"bg-indigo-500 text-gray-100 hover:bg-indigo-700 " + baseClass  : "text-gray-500 hover:bg-gray-100 " + baseClass}>
                           <svg className={clicked === "dashboard" ? "text-gray-100 " + baseImage : "text-gray-500 " + baseImage} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
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
                           <span className="ml-3 flex-1 whitespace-nowrap">Analysis</span>
                        </Link>
                     </li>
                     {role === "ADMIN" ? 
                     <li>
                        <Link to="/dashboard/user-configuration" className={clicked === "konfigurasi" ?"bg-indigo-500 text-gray-100 " + baseClass  : "text-gray-500 hover:bg-gray-100 " + baseClass}>
                           <svg className={clicked === "konfigurasi" ? "text-gray-100 " + baseImage : "text-gray-500 " + baseImage} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                           </svg>
                           <span className="ml-3 flex-1 whitespace-nowrap">User Configuration</span>
                        </Link>
                     </li> : <></>}
                     <li>
                        <Link to="/dashboard/profile" className={clicked === "pengguna" ?"bg-indigo-500 text-gray-100 " + baseClass  : "text-gray-500 hover:bg-gray-100 " + baseClass}>
                           <svg className={clicked === "pengguna" ? "text-gray-100 " + baseImage : "text-gray-500 " + baseImage} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                           </svg>
                           <span className="ml-3 flex-1 whitespace-nowrap">Profile</span>
                        </Link>
                     </li>
{/*                      <li>
                        <Link to="/dashboard/history" className={clicked === "history" ?"bg-indigo-500 text-gray-100 " + baseClass  : "text-gray-500 hover:bg-gray-100 " + baseClass}>
                           <svg className={clicked === "history" ? "text-gray-100 " + baseImage : "text-gray-500 " + baseImage} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path>
                           </svg>
                           <span className="ml-3 flex-1 whitespace-nowrap">History</span>
                        </Link>
                     </li> */}
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
      </aside>
    )
}

export default Sidebar;