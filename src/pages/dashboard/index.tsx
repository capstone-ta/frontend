import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import Graph from "../../components/graph"
import GraphChart2 from "../../components/graph_chart2"
import GraphNivo from "../../components/graph_nivo"

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="flex overflow-hidden bg-white pt-16">
            <Sidebar clicked="dashboard"/>
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                    <GraphNivo />
                    <GraphChart2 />
                    <Graph />
                    <p className="text-center text-sm text-gray-500 my-10">
                        Made by <a href="https://www.itb.ac.id/" className="text-slate-700 hover:text-slate-900" target="_blank" rel="noopener noreferrer">ITB</a>.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard