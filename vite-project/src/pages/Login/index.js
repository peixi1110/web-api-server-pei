import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    // const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
    // const mobileFormat = /^1[3-9]\d{9}$/
    const usernameFormat = /^[\S]{1,10}$/

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const onFinish = async (values) => {
        // Triggering Asynchronous action fetchLogin 
        await dispatch(fetchLogin(values))
        // Jump to user page
        navigate('/')
        // whether right user & password
        message.success('Login Successful!')
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
            initialValue={process.env.NODE_ENV==='development'?'ONE':''}
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
            initialValue={process.env.NODE_ENV==='development'?'111111':''}
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