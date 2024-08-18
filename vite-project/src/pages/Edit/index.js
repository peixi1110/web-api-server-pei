import { Form, Input, Button, Breadcrumb, Card, Upload, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getToken } from '@/utils';
import { getUserInfoAPI, updateAvatarAPI, updateUserInfoAPI } from '@/apis/userInfo';

const Edit = () => {
    const [form] = Form.useForm();
    const [avatarList, setAvatarList] = useState([])
    const navigate = useNavigate();
    const token = getToken()

    const userInfo = useSelector(state => state.user.userInfo.data)
    const userId = userInfo?.id

    // update user info
    const onFinish = async (values) => {
        const { nickname, email } = values

        const avatar = avatarList.map(item => {
            if (item.response)
                return item.response.url[0]
            else
                return item
        })

        const userData = {
            id: userInfo?.id,
            nickname,
            email,
        }
        const avatarData = {
            id: userInfo?.id,
            avatar: avatar
        }

        await updateUserInfoAPI(userData)
        await updateAvatarAPI(avatarData)

        message.success('Update successful!')
        navigate('/');
    };

    // upload avatar
    const onUploadChange = ({ fileList: newFileList }) => {
        setAvatarList(newFileList)
    }

    const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const nicknameFormat = /^[\S]{1,10}$/

    // auto get userinfo & fill in 
    useEffect(() => {
        async function getUserInfoDetail() {
            const res = await getUserInfoAPI(userId)
            const data = res.data.data
            form.setFieldsValue({
                ...data
            })
            const avatarList = JSON.parse(data.avatar)
            setAvatarList(avatarList.map(item => { return { url: `http://127.0.0.1:3007${item.url}` } }))
        }
        getUserInfoDetail()
    }, [userId, form])

    return (
        <Card
            title={
                <Breadcrumb items={[
                    { title: <Link to={'/'}>Home</Link> },
                    { title: 'My information' },
                ]} />
            }
            style={{ marginBottom: 20 }}
        >
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    name="avatar"
                    label="Avatar "
                >
                    <Upload
                        name="avatar"
                        action={'http://127.0.0.1:3007/public/avatar'}
                        headers={{ 'Authorization': `${token}` }}
                        onChange={onUploadChange}
                        listType="picture-card"
                        showUploadList
                        maxCount={1}
                        fileList={avatarList}
                    >
                        {avatarList.length < 1 &&
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        }
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Nickname"
                    name="nickname"
                    rules={[{ pattern: nicknameFormat, message: 'Please input valid nickname!' }]}
                >
                    <Input placeholder='Add your nickname here' style={{ width: 300 }} />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ pattern: emailFormat, message: 'Please input valid email!' }]}
                >
                    <Input placeholder='Add your email here' style={{ width: 300 }} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Save
                    </Button>
                    <Button
                        style={{ marginLeft: 8 }}
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Edit;