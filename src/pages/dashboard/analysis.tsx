import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import FileUploadComponent from "../../components/pengujian/uploadFile"
import Footer from "../../components/footer"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import AuthProvider from "../../utils/authProvider"

const Analysis = () => {
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
            <Sidebar clicked="pengujian"/>
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10 h-screen" id="sidebarBackdrop"></div>
                <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64 h-screen mb-10">
                    <FileUploadComponent jwt={authProvider.getJwt()!}/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Analysis;