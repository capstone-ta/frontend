import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import Graph from "../../components/graph"
import Footer from "../../components/footer"
import TableHistory from "../../components/history/history"


const History = () => {
    return (
        <div>
            <Navbar />
            <div className="flex overflow-hidden bg-white pt-16">
            <Sidebar clicked="history"/>
            <div className="opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                <div id="main-content" className="h-full w-full relative overflow-y-auto lg:ml-64">
                    <TableHistory />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default History