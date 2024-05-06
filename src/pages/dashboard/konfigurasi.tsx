import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import { useEffect } from "react"
import { useContext } from "react"
import { RoleContext } from "../../role_provider"
import { useNavigate } from 'react-router-dom';
import JWTProvider from "../../jwt_provider"
import UserConfigurationComponent from "../../components/konfigurasi/konfigurasiUser"


const Konfigurasi = () => {
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
                    if (res != "USER") {
                        navigate('/dashboard/history');
                    }
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
            <Sidebar clicked="konfigurasi"/>
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                    <UserConfigurationComponent jwt={jwtProvider.getJwt()!} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Konfigurasi