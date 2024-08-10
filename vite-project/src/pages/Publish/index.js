import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Input,
  Space,
  Select,
  message,
  Radio,
  Upload
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import { createArticleAPI } from '@/apis/article'
import { uploadPicAPI } from '@/apis/pictures'
import { getUserInfoAPI } from '@/apis/userInfo'
import { useCate } from '@/hooks/useCateList'
import readFile from '@/utils/readFile'
import { useUserInfo } from '@/hooks/useUserInfo'
import dayjs from 'dayjs'


const { Option } = Select

const Publish = () => {
  const { cateList } = useCate()
  const { userInfoList } = useUserInfo()

  // upload data
  // problem: formatValue --> object
  const onFinish = async (value) => {
    if (imageList.length !== imageType) 
    return message.warning('Image type and number of image are not match!')

    //get data
    const { title, content, cate_id } = value

    const author_id = userInfoList.id
    const pub_date = dayjs(new Date()).format('YYYY-MM-DD HH:mm')
    const reqData = {
      title,
      content,
      cover_img: {
        type: imageType,
        images: imageList.map(item => item.response.data.url)
      },
      cate_id, 
      author_id,
      pub_date
    }
    console.log(pub_date)
    await createArticleAPI(reqData)
    message.success('Publish successful!')
  }

  const [imageList, setImageList] = useState([])
  const onUpload = async () => {
    //   const file=[]
     const files =await Promise.all(imageList.map(item=>readFile(item.originFileObj)))
     uploadPicAPI({
      file:imageList.map((img,index)=>({
        fileExt:img.name.split('.').pop(),
        binary:files[index]
      })),
    })

  }
  const onUploadChange = (value) => {
    setImageList(value.fileList)
  }

  const [imageType, setImageType] = useState(0)
  const onTypeChange = (type) => {
    setImageList('')
    setImageType(type.target.value)
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>Home</Link> },
            { title: 'Publish articles' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          validateTrigger="onBlur"
        >
          {/* TITLE */}
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Article title is neccessery!' }]}
          >
            <Input placeholder="Please enter the article title" style={{ width: 400 }} />
          </Form.Item>
          {/* CATOGERY */}
          <Form.Item
            label="Category"
            name="cate_id"
            rules={[{ required: true, message: 'Article category is neccessery!' }]}
          >
            <Select placeholder="Please select the article category" style={{ width: 400 }}>
              {/* value: after select, auto select id */}
              {cateList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          {/* COVER_IMG */}
          <Form.Item label="Cover">
            <Form.Item name="cover_img" initialValue={0}>
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>Single Picture</Radio>
                <Radio value={3}>Triple Picture</Radio>
                <Radio value={0}>None Picture</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 &&
              <Upload
                name='cover_img'
                listType="picture-card"
                showUploadList
                // problem: action url
                action={'http://127.0.0.1:3007/my/picture/upload'}
                onChange={onUploadChange}
                // problem: headers={}
                customRequest={onUpload}
                maxCount={imageType}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            }
          </Form.Item>
          {/* CONTENT */}
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: 'Article content is neccessery!' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="Please enter article content"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                Publish
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish