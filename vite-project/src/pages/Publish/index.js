import { Card, Breadcrumb, Form, Button, Input, Space, Select, message, Radio, Upload } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Await, Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import dayjs from 'dayjs'

import { createArticleAPI, getArticleInfoAPI, updateArticleByIdAPI } from '@/apis/article'
import { deletePicAPI } from '@/apis/pictures'
import { useCate } from '@/hooks/useCateList'
import { useUserInfo } from '@/hooks/useUserInfo'
import { getToken } from '@/utils'

const { Option } = Select

const Publish = () => {
  const { cateList } = useCate()
  const { userInfoList } = useUserInfo()
  const navigate = useNavigate()
  // get token 
  const token = getToken()

  // set states
  const [imageList, setImageList] = useState([])    // init image list
  const [imageType, setImageType] = useState(1)    // init image type
  const [deleteList, SetDeleteList] = useState([])    // init list to delete 

  // upload data
  const onFinish = async (value) => {
    // check whether type && length match 
    if (imageType === 0 && imageList.length > 0) {
      return message.warning('Please change cover type to "Single Picture" or "Triple Pictures", or handle delete cover images uploaded.')
    } else if (imageType === 1 && imageList.length === 0) {
      return message.warning('No cover imnage! Please change cover type to "None Picture" or upload ome cover image.')
    } else if (imageType === 1 && imageList.length > 1) {
      return message.warning('Please select "Triple Pictures"!')
    } else if (imageType === 3 && imageList.length === 1) {
      return message.warning('Please change cover type to "Single Picture", or upload 1 to 2 cover images. ')
    } else if (imageType === 3 && imageList.length === 0) {
      return message.warning('Please change cover type to "None Picture", or upload 2 to 3 cover images. ')
    }

    //get data
    const { title, content, cate_id, state } = value
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
      pub_date,
      state: state
    }

    if (articleId) {
      deleteList.forEach(async url => {
        const delUrl = url.replace(/^http:\/\/127\.0\.0\.1:3007/, '') 
        const res = await deletePicAPI({url: delUrl}) 
      })
      await updateArticleByIdAPI({ ...reqData, id: articleId })
      message.success('Update successful!')
      navigate('/article')
    } else {
      await createArticleAPI(reqData)
      message.success('Publish successful!')
      navigate('/article')
    }
  }

  // upload covers & show
  const onUploadChange = (value) => {
    setImageList(value.fileList)
  }

  // remove cover, set toDeleteList, when click 'finish', delete all no-use cover 
  const onRemoveChange = async (value) => {
    if (!articleId) {
      const imageDel = value.response.url[0]
      await deletePicAPI(imageDel)
    } else {
      const imageDel = value.url
      SetDeleteList([
        ...deleteList,
        imageDel
      ])
    }
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
      setImageType(data.cover_img_type)
      setImageList(coverList.map(item => { return { url: `http://127.0.0.1:3007${item.url}` } }))
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
            { title: <Link to={'/article'}>Manage</Link> },
            { title: `${articleId ? 'Edit' : 'Publish'} article` }
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ cover: 1, state: 3 }}
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
                <Radio value={3}>Triple Pictures</Radio>
                <Radio value={0}>None Picture</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 &&
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
                {imageList.length < imageType &&
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
          <Form.Item name='state' noStyle>
            <Input type='hidden' />
          </Form.Item>
          {/* PUBLISH || SAVE */}
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => form.setFieldsValue({ state: 1 })}
              >
                Publish
              </Button>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => form.setFieldsValue({ state: 3 })}
              >
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish