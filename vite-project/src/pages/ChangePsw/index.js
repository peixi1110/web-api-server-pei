import { Form, Input, Button, Breadcrumb, Card, message } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import { updatePwdAPI } from '@/apis/userInfo';
import { useSelector } from 'react-redux';
import { clearUserInfo } from '@/store/modules/user';

const ChangePsw = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const userInfo = useSelector(state => state.user.userInfo.data)
    const userId = userInfo?.id

    const handleFinish = async (values) => {
        const pwdData = {
            id: userId, 
            newPwd: values.newPwd,
            oldPwd: values.oldPwd
        }
        
        const res = await updatePwdAPI(pwdData)

        if (res.data.status === 1){
            message.error('Wrong old Password!')
        
            // return Promise.reject(new Error('Wrong old password'))
        } else {
            message.success('Your password has been changed. Please log in again.')
            clearUserInfo()
        }
    }

    const pwdFormat = /^[\S]{4,16}$/
    const validateNewPassword = (_, value) => {
        if (value && !pwdFormat.test(value)) {
            return Promise.reject(new Error('The password format you entered is not allowed. Please enter 4 to 16 non-blank characters.'))
        }
        if (value && value === form.getFieldValue('oldPwd')) {
            return Promise.reject(new Error('New password cannot same with old password!'))
        }
        return Promise.resolve()
    }

    const validateConfirmassword = (_, value) => {
        if (!value || form.getFieldValue('newPwd') === value) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('The two passwords do not match!'));
    }

    const onChange = () => {
        form.validateFields(['confirmPsw'])
    }

    return (
        <Card
            title={
                <Breadcrumb items={[
                    { title: <Link to={'/'}>Home</Link> },
                    { title: 'Change Password' },
                ]} />
            }
            style={{ marginBottom: 20 }}
        >
            <Form
                style={{ marginTop: 10, marginLeft: 30, width: 350 }}
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                validateTrigger="onBlur"
            >
                <Form.Item
                    label="Old password: "
                    name="oldPwd"
                    rules={[{ required: true, message: 'Please input old password!' }]}
                >
                    <Input placeholder="Please enter your old password"/>
                </Form.Item>
                <Form.Item
                    label="New password: "
                    name="newPwd"
                    rules={[
                        { required: true, message: 'Please input new password!' },
                        { validator: validateNewPassword }
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Please enter a new password of 4-16 digits"/>
                </Form.Item>
                <Form.Item
                    label="Confirm password: "
                    name="confirmPsw"
                    dependencies={['newPwd']}
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        { validator: validateConfirmassword }
                    ]}
                    hasFeedback
                >
                    <Input 
                    onChange={onChange} 
                    placeholder="Please confirm your new password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => navigate('/')}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default ChangePsw;