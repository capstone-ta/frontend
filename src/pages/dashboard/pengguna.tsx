import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import UserProfile from "../../components/pengguna/userProfile"
import Footer from "../../components/footer"

const Pengguna = () => {
    return (
        <div>
            <Navbar />
            <div className="flex overflow-hidden bg-white pt-16">
                <Sidebar clicked="pengguna"/>
                <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                <div id="main-content" className="h-screen w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                    <UserProfile name="John Doe" phoneNumber="123-456-7890" email="john@example.com" />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Pengguna