import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import UserProfile from "../../components/pengguna/userProfile"
import Footer from "../../components/footer"
import { useEffect } from "react"
import { useContext } from "react"
import { RoleContext } from "../../role_provider"
import { useNavigate } from 'react-router-dom';
import JWTProvider from "../../jwt_provider"

const Pengguna = () => {
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
                <Sidebar clicked="pengguna"/>
                <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                <div id="main-content" className="h-screen w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                    <UserProfile jwt={jwtProvider.getJwt()!} uuid={jwtProvider.getUUID()!}/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Pengguna