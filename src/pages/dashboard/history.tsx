import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import TableHistory from "../../components/history/history"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import AuthProvider from "../../utils/authProvider"


const History = () => {
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
                <Navbar clicked="dashboard" />
            </div>
            <div className="flex overflow-hidden bg-white pt-16 lg:pt-0">
            <Sidebar clicked="dashboard"/>
            <div className="opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                <div id="main-content" className="min-h-screen bg-indigo-100 w-full relative overflow-y-auto lg:ml-64">
                    <TableHistory jwt={authProvider.getJwt()!} uuid={authProvider.getUUID()!} role={authProvider.getRole()!}/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default History