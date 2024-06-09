import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import UserProfile from "../../components/pengguna/userProfile"
import Footer from "../../components/footer"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import AuthProvider from "../../utils/authProvider"

const Profile = () => {
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
            <div className="lg:hidden">
                <Navbar clicked="pengguna" />
            </div>
            <div className="flex overflow-hidden bg-white pt-16 lg:pt-0">
                <Sidebar clicked="pengguna"/>
                <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                <div id="main-content" className="min-h-screen w-full bg-indigo-100 relative overflow-y-auto lg:ml-64">
                    <UserProfile jwt={authProvider.getJwt()!} uuid={authProvider.getUUID()!}/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile