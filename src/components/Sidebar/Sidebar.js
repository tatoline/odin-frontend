import { Menu, Layout, Sider, Button, ConfigProvider, theme, Switch } from "antd"
import './Sidebar.css'

import {
    HomeOutlined,
    SettingOutlined
  } from '@ant-design/icons';

const Sidebar = () => {

    const sidebarMenu = [
        {
            label: 'Homepage',
            key: '/',
            icon: <HomeOutlined />
        },
        {
            label: 'Settings',
            key: '/settings',
            icon: <SettingOutlined />
        },
    ]

    return(
        <Layout.Sider className="sidebar" >
            <Menu
                mode="inline"
                defaultSelectedKeys={['/']}
                items={sidebarMenu}
               >
                {/* <Menu.Item key="/">
                    {/* <Link to="/">Homepage</Link> }
                    <HomeOutlined /> Homepage
                </Menu.Item>
                <Menu.Item key="/settings" style={{ color: theme.components.Menu.itemColor }}>
                    {/* <Link to="/settings">Settings</Link>}
                    <SettingOutlined /> Settings
                </Menu.Item> */}
            </Menu>
        </Layout.Sider>
    )
}

export default Sidebar