import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import Graph from "../../components/graph"
import Footer from "../../components/footer"


const Konfigurasi = () => {
    return (
        <div>
            <Navbar />
            <div className="flex overflow-hidden bg-white pt-16">
            <Sidebar clicked="konfigurasi"/>
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Konfigurasi