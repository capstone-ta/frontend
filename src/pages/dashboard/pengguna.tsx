import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import UserProfile from "../../components/pengguna/userProfile"
import Footer from "../../components/footer"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import AuthProvider from "../../utils/authProvider"

const Pengguna = () => {
    const navigate = useNavigate();
    const authProvider = AuthProvider()

    useEffect(() => {
        authProvider.checkCredential().then((role) => {
            if (role === null) {
                navigate('/login');
            }
        })
      }, [authProvider.jwt]);

    return (
        <div>
            <Navbar />
            <div className="flex overflow-hidden bg-white pt-16">
                <Sidebar clicked="pengguna"/>
                <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                <div id="main-content" className="h-screen w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                    <UserProfile jwt={authProvider.getJwt()!} uuid={authProvider.getUUID()!}/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Pengguna