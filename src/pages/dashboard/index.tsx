import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import AuthProvider from "../../utils/authProvider"

const Dashboard = () => {
    const navigate = useNavigate();
    const authProvider = AuthProvider()

    useEffect(() =>  {
        authProvider.checkCredential().then((role) => {
            if (role === null) {
                navigate('/login');
            }
        })
      }, []);
 
    return (
        <div>
            <div className="lg:hidden">
                <Navbar clicked="dashboard" />
            </div>
            <div className="flex overflow-hidden bg-white pt-16 lg:pt-0">
            <Sidebar clicked="dashboard"/>
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
        
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard