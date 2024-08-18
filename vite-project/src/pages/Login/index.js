import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const usernameFormat = /^[\S]{1,10}$/

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const onFinish = async (values) => {
        // Triggering Asynchronous action fetchLogin 
        const res = await dispatch(fetchLogin(values))
        // Jump to user page
        navigate('/')
    }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* Login */}
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item 
            name="username"
            // debug
            initialValue={process.env.NODE_ENV==='development'?'root':''}
            // Check in order of rules
            rules={[
                {
                    required: true, 
                    message: 'Please input your name!' 
                }, 
                {
                    pattern: usernameFormat, 
                    message: 'Please input valid username!' 
                }
            ]}>
            <Input size="large" placeholder="Name" />
          </Form.Item>

          <Form.Item 
            name="password"
            // debug
            initialValue={process.env.NODE_ENV==='development'?'newpassword':''}
            rules={[
                { 
                    required: true, 
                    message: 'Please input your password!' 
                }, 
            ]}>
            <Input size="large" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login