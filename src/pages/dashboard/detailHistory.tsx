import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import DetailHistoryComponent from "../../components/history/detailHistoryComponent"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import AuthProvider from "../../utils/authProvider"


const DetailHistory = () => {
    const navigate = useNavigate();
    const authProvider = AuthProvider()

    useEffect(() => {
        authProvider.checkCredential().then((role) => {
            if (role === null) {
                navigate('/login');
            } else if (role === "USER") {
                navigate('/dashboard/');
            }
        })
      }, [authProvider.jwt]);

    return (
        <div>
            <Navbar />
            <div className="flex overflow-hidden bg-white pt-16">
            <Sidebar clicked="history"/>
            <div className="opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                <div id="main-content" className="h-full w-full relative overflow-y-auto lg:ml-64">
                    <DetailHistoryComponent />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DetailHistory