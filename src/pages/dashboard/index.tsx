import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import Graph from "../../components/graph"
import GraphChart2 from "../../components/graph_chart2"
import GraphNivo from "../../components/graph_nivo"
import Footer from "../../components/footer"
import { useEffect } from "react"
import { useContext } from "react"
import { RoleContext } from "../../role_provider"
import { useNavigate } from 'react-router-dom';
import JWTProvider from "../../jwt_provider"

const Dashboard = () => {
    const { role, setRole } = useContext(RoleContext);
    const navigate = useNavigate();
    const jwtProvider = JWTProvider()

    useEffect(() => {
        
        if (jwtProvider.getJwt() === null) {
          navigate('/login');
        }
        if (role === null) {
            jwtProvider.getRole().then((res) => {
                if (res != null) {
                    setRole(res!);
                } else {
                    navigate('/login');
                }
            })
        }
      }, [jwtProvider.jwt]);
 
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
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard