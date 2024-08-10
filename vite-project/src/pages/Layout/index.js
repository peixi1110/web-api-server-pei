import { Layout, Menu, Popconfirm } from 'antd'
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user' 


const { Header, Sider } = Layout

const items = [
  {
    label: 'Home',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Manage',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: 'Create',
    key: '/publish',
    icon: <EditOutlined />,
  },
]

const MyLayout = () => {

  const navigate = useNavigate()
  const onMenuClick = (route) => {
    const path = route.key
    navigate(path)
  }
  
  // mark current lable
  const location = useLocation()
  const selectedKeys = location.pathname

  // get userInfo --> username
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])


  // exit confirm
  const onConfirm = () => {
    dispatch(clearUserInfo())
    navigate('login')
  }

  // get userInfo --> username
  const name = useSelector(state => state.user.userInfo.data?.username)

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            {/* pop up */}
            <Popconfirm 
              title="Are you sure to logout? " 
              okText="Logout" 
              cancelText="Cancel" 
              onConfirm={onConfirm}
            >
              <LogoutOutlined /> Logout
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu 
            
            mode="inline"
            theme="dark"
            selectedKeys={selectedKeys}
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* exit of second level router */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default MyLayout