import { Card, Breadcrumb, Form, Button, Input, Space, Select, message, Radio, Upload } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createArticleAPI, getArticleInfoAPI, updateArticleByIdAPI } from '@/apis/article'
import { useCate } from '@/hooks/useCateList'
import { useUserInfo } from '@/hooks/useUserInfo'
import dayjs from 'dayjs'
import { getToken } from '@/utils'


const { Option } = Select

const Publish = () => {
  const { cateList } = useCate()
  const { userInfoList } = useUserInfo()
  const navigate = useNavigate()
  // get token 
  const token = getToken()
  
  // set states
  const [imageList, setImageList] = useState([])   // init image list
  const [imageType, setImageType] = useState(1)   // init image type

  // upload data
  const onFinish = async (value) => {
    // check whether type && length match 
    if (imageList.length > imageType)
      return message.warning('Image type and number of image are not match!')

    //get data
    const { title, content, cate_id } = value
    const author_id = userInfoList.id
    const pub_date = dayjs(new Date()).format('YYYY-MM-DD HH:mm')

    // set data
    const cover_img = imageList.map(item => {  
      if (item.response)
        return item.response.url[0]
      else
        return item
    })
    const reqData = {
      title,
      content,
      cover_img: cover_img, 
      cover_img_type: imageType,
      cate_id,
      author_id,
      pub_date
    }

    if (articleId) {
      await updateArticleByIdAPI({ ...reqData, id: articleId })
      message.success('Update successful!')
      navigate('/article')
    } else {
      await createArticleAPI(reqData)
      message.success('Publish successful!')
      navigate('/article')
    }
  }

  const onUploadChange = (value) => {
    setImageList(value.fileList)
  }

  const onRemoveChange = (value) => {
    
  }
  
  // change type
  const onTypeChange = (e) => {
    setImageType(e.target.value)
  }

  // get article info by id
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  const [form] = Form.useForm()


  useEffect(() => {
    async function getArticleDetail() {
      const res = await getArticleInfoAPI(articleId)
      const data = res.data.data
      form.setFieldsValue({
        ...data,
        cover: data.cover_img_type
      })
      const coverList = JSON.parse(data.cover_img)
      console.log(coverList)
      setImageType(data.cover_img_type)
      setImageList(coverList.map(item => { return {url: `http://127.0.0.1:3007${item.url}`} }))
    }
    if (articleId) {
      getArticleDetail()
    }
  }, [articleId, form])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>Home</Link> },
            { title: `${articleId ? 'Edit' : 'Publish'} article` }
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ cover: 1 }}
          onFinish={onFinish}
          validateTrigger="onBlur"
          form={form}
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
            <Form.Item name="cover">
              <Radio.Group onChange={onTypeChange} >
                {/* <Radio.Group> */}
                <Radio value={1}>Single Picture</Radio>
                <Radio value={3}>Triple Picture</Radio>
                <Radio value={0}>None Picture</Radio>
              </Radio.Group>
            </Form.Item>
            { imageType > 0 && 
              <Upload
                name='cover_img'
                action={'http://127.0.0.1:3007/public/cover'}
                headers={{ 'Authorization': `${token}` }}
                onChange={onUploadChange}
                onRemove={onRemoveChange}
                listType="picture-card"
                showUploadList
                maxCount={imageType}
                fileList={imageList}
                multiple
              >
                { imageList.length < imageType && 
                <div style={{ marginTop: 8 }}>
                    <PlusOutlined />
                  </div>
                }
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
              <Button
                size="large"
                type="primary"
                htmlType="submit"
              >
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