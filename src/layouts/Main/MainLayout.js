import { Layout } from "antd"
import Sidebar from "../../components/Sidebar/Sidebar"
import Header from "../../components/Header/Header"
import AppContent from "../../components/AppContent/AppContent"

const MainLayout = (props) => {


    return(
        <Layout>
            <Sidebar />
            <Layout >
                <Header />
                <AppContent>
                    {props.children}
                </AppContent>
            </Layout>

        </Layout>
    )

}

export default MainLayout