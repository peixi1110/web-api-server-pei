import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
import { Table, Tag, Space } from 'antd'
import { useState, useEffect } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useCate } from '@/hooks/useCateList'
import { deleteArticleAPI, getArticleListAPI, getArticlesBySelectAPI } from '@/apis/article'
import dayjs from 'dayjs'



const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const navigate = useNavigate()
  const { cateList } = useCate()

  // init formValue
  const [reqData, setReqData] = useState({
    state: 0,
    cate_id: 0,
    pub_date: dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
    start_date: '',
    end_date: '',
    page: 1,
    perpage: 5,
  })

  const [articleList, setArticleList] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(reqData)
      setCount(res.data.total)
      setArticleList(res.data.data)
    }
    if (!reqData.start_date && reqData.state === 0 && reqData.cate_id === 0) {
      getList()
    }
  }, [reqData])

  const state = {
    1: <Tag color='orange'>Reviewing</Tag>,
    2: <Tag color='green'>Approved</Tag>,
    3: <Tag color='grey'>Draft</Tag>,
  }
  const columns = [
    {
      title: 'Cover',
      dataIndex: 'cover_img',
      width: 120,
      render: cover_img => {
        const cover = JSON.parse(cover_img)
        var url
        if (cover.length > 0) {
          const imageUrl = cover[0].url.replace(/^\//, '')
          url = `http://127.0.0.1:3007/${imageUrl}`
        } else {
          url = img404
        }
        return <img
          id='url'
          src={url}
          width={80}
          height={60}
          alt=""
          style={{
            objectFit: 'contain',
            overflow: 'hidden'
          }}
        />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 220
    },
    {
      title: 'State',
      dataIndex: 'state',
      render: data => state[data]
    },
    {
      title: 'Publish Date',
      dataIndex: 'pub_date'
    },
    // {
    //   title: 'Read',
    //   dataIndex: 'read_count'
    // },
    // {
    //   title: 'Comment',
    //   dataIndex: 'comment_count'
    // },
    // {
    //   title: 'Like',
    //   dataIndex: 'like_count'
    // },
    {
      title: 'Operate',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => navigate(`/publish?id=${data.id}`)}
            />
            <Popconfirm
              title='Delete'
              description='Are you sure to delete this article?'
              onConfirm={() => onConfirm(data)}
              okText='Yes'
              cancelText='No'
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  // get form data
  const onFinish = async (formValue) => {
    setReqData({
      ...reqData,
      cate_id: formValue.cate_id,
      state: formValue.state,
      start_date: formValue.date ? dayjs(formValue.date[0]).format('YYYY-MM-DD HH:mm') : '',
      end_date: formValue.date ? dayjs(formValue.date[1]).format('YYYY-MM-DD HH:mm') : ''
    })

    const res = await getArticlesBySelectAPI(reqData)
    const total = res.data.total
    const data = res.data.data

    setCount(total)
    setArticleList(data)
  }

  // change page 
  const onPageChange = (page) => {
    setReqData({
      ...reqData,
      page
    })

  }
  // delete article
  const onConfirm = async (data) => {
    await deleteArticleAPI(data.id)
    setReqData({
      ...reqData
    })
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>Home</Link> },
            { title: 'Article List' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          initialValues={{ state: 0 }}
          onFinish={onFinish}
        >
          <Form.Item label="state" name="state">
            <Radio.Group>
              <Radio value={0}>All</Radio>
              <Radio value={1}>Reviewing</Radio>
              <Radio value={2}>Approved</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Cate" name="cate_id">
            <Select
              placeholder="Please select article category"
              initialvalues="Categroy"
              style={{ width: 250 }}
            >
              {cateList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              Search
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* form area */}
      <Card title={`According to the filter criteria, ${count} results were found:`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} pagination={{
          total: count,
          pageSize: reqData.perpage,
          onChange: onPageChange
        }} />
      </Card>
    </div>
  )
}

export default Article