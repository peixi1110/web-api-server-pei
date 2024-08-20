import { Form, Input, Button, Breadcrumb, Card, Upload, message, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate, Link, useLinkClickHandler } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getToken } from '@/utils'
import { getUserInfoAPI, updateAvatarAPI, updateUserInfoAPI } from '@/apis/userInfo'
import Cropper from 'react-easy-crop'
import getCroppedImg from '@/utils/crop'
import { uploadAvatarAPI } from '@/apis/pictures'

const Edit = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const token = getToken()

    const userInfo = useSelector(state => state.user.userInfo.data)
    const userId = userInfo?.id

    const emailFormat = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const nicknameFormat = /^[\S]{1,10}$/

    // crop image data
    const [avatarList, setAvatarList] = useState([])
    const [isCropModalVisible, setIsCropModalVisible] = useState(false)
    const [currentImage, setCurrentImage] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    // update user info
    const onFinish = async (values) => {
        const { nickname, email } = values

        const avatar = avatarList.map(item => {
            console.log(item)
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
        console.log(avatarData)

        await updateUserInfoAPI(userData)
        await updateAvatarAPI(avatarData)

        message.success('Update successful!')
        navigate('/')
    }

    const beforeUpload = (value) => {
        const file = value.file
        console.log(file)
        if (file && file instanceof File) {
            setCurrentImage(URL.createObjectURL(file))
            setIsCropModalVisible(true)
            return false
        } else {
            return message.error('Something went wrong!')
        }
    }

    const handleCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const handleCancelCrop = () => {
        setIsCropModalVisible(false)
    }

    const handleSaveCrop = async () => {
        if (croppedAreaPixels) {
            const croppedImage = await getCroppedImg(currentImage, croppedAreaPixels);
            setAvatarList([croppedImage]);
            setIsCropModalVisible(false);
            setCurrentImage(null);
            setCroppedAreaPixels(null);

            const file = new File([croppedImage], 'cropped-image.png', { type: 'image/png' });
            if (file && file instanceof File) {
                const avatar = new FormData()
                avatar.append('avatar', file)
                const res = await uploadAvatarAPI(avatar)
                const url = res.data.url
                setAvatarList(url.map(url => { return url }))
                console.log(avatarList)
            } else {
                console.log('not file')
            }
        }
    }

    // auto get userinfo & fill in 
    useEffect(() => {
        async function getUserInfoDetail() {
            const res = await getUserInfoAPI(userId)
            const data = res.data.data
            form.setFieldsValue({
                ...data
            })
            const avatarList = JSON.parse(data.avatar)
            setAvatarList(avatarList.map(item => { return item }))
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
                        customRequest={beforeUpload}
                        listType="picture-card"
                        showUploadList
                        maxCount={1}
                        fileList={avatarList.map(file => ({
                            uid: file.name,
                            name: file.name,
                            status: 'done',
                            url: file.url ? `http://127.0.0.1:3007${file.url}` : URL.createObjectURL(file),
                        }))}
                        onRemove={() => {
                            setAvatarList([]);
                        }}
                    >
                        {avatarList.length < 1 &&
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        }
                    </Upload>
                </Form.Item>

                <Modal
                    title="Crop Avatar"
                    open={isCropModalVisible}
                    footer={null}
                    onCancel={handleCancelCrop}
                    style={{ height: '600px', width: '450px' }}
                >
                    {currentImage && (
                        <div style={{
                            position: 'relative',
                            height: '400px',
                            width: '100%',
                            marginBottom: '30px'
                        }}
                        >
                            <Cropper
                                image={currentImage}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={handleCropComplete}
                            />
                            <Button
                                type="primary"
                                onClick={handleSaveCrop}
                                style={{
                                    marginTop: '410px',
                                    marginLeft: '180px'
                                }}
                            >
                                Crop Avatar
                            </Button>
                        </div>

                    )}
                </Modal>
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
    )
}

export default Edit

