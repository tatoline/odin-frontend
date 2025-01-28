import { Avatar, Dropdown, Layout, Menu, Switch } from "antd"
import './Header.css'
import { toggleTheme } from "../../store/themeSlice"
import { useSelector, useDispatch } from "react-redux"
import { SunOutlined, MoonOutlined} from "@ant-design/icons"


const Header = () => {

    const isDarkMode = useSelector((state) => state.theme.isDarkMode)
    const dispatch = useDispatch()

    const headerMenu = [
        {
            label: 'Logout',
            key: 'logout',
        },
    ]

    return(
        <Layout.Header className="header" >
            <Switch
                onClick={() => dispatch(toggleTheme())}
                type="primary" checkedChildren={<SunOutlined />} unCheckedChildren={<MoonOutlined />} checked={isDarkMode} style={{marginRight: '20px'}}/>
            <Dropdown menu={{items: headerMenu}} placement="bottomLeft" arrow>
                <Avatar >
                    U
                </Avatar>
            </Dropdown>
        </Layout.Header>
    )
}

export default Header