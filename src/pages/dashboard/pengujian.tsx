import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import FileUploadComponent from "../../components/pengujian/uploadFile"
import Footer from "../../components/footer"
import { useEffect } from "react"
import { useContext } from "react"
import { RoleContext } from "../../role_provider"
import { useNavigate } from 'react-router-dom';
import JWTProvider from "../../jwt_provider"

const Pengujian = () => {
    const { role, setRole } = useContext(RoleContext);
    const navigate = useNavigate();
    const jwtProvider = JWTProvider()

    useEffect(() => {
        if (jwtProvider.getJwt() === null) {
          navigate('/login');
        }
        if (role === null) {
            jwtProvider.getRole().then((res) => {
                if (res != null) {
                    setRole(res!);
                } else {
                    navigate('/login');
                }
            })
        }
      }, [jwtProvider.jwt]);

    return (
        <div>
            <Navbar />
            <div className="flex overflow-hidden bg-white pt-16">
            <Sidebar clicked="pengujian"/>
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10 h-screen" id="sidebarBackdrop"></div>
                <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64 h-screen">
                    <FileUploadComponent jwt={jwtProvider.getJwt()!}/>
                    <p className="fixed text-center text-sm text-gray-500 bottom-10 left-0 right-0">
                        Made by <a href="https://www.itb.ac.id/" className="text-slate-700 hover:text-slate-900" target="_blank" rel="noopener noreferrer">ITB</a>.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Pengujian