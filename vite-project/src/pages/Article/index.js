import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
import { Table, Tag, Space } from 'antd'
import { useState, useEffect } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useCate } from '@/hooks/useCateList'
import { deleteArticleAPI, getArticleListAPI, getArticlesBySelectAPI } from '@/apis/article'


const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const navigate = useNavigate()
  const { cateList } = useCate()
  
  // init formValue
  const [reqData, setReqData] = useState({
    state: '', 
    cate_id: '', 
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
    getList()
  }, [reqData])

  const state = {
    1: <Tag color='orange'>Reviewing</Tag>,
    2: <Tag color='green'>Approved</Tag>,
    3: <Tag color='grey'>Draft</Tag>,
  }
  const columns = [
    // problem: show img
    {
      title: 'Cover',
      dataIndex: 'cover_img',
      width: 120,
      render: cover_img => {
        const cover = JSON.parse(cover_img)
        const imageUrl = cover[0].url.replace(/^\//, '')
        const url = `http://127.0.0.1:3007/${imageUrl}`
        return <img
          id='url'
          src={url || img404}
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
    {
      title: 'Read',
      dataIndex: 'read_count'
    },
    {
      title: 'Comment',
      dataIndex: 'comment_count'
    },
    {
      title: 'Like',
      dataIndex: 'like_count'
    },
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
  const onFinish = (formValue) => {
    console.log(formValue)
    setReqData({
      ...reqData,
      cate_id: formValue.cate_id, 
      state: formValue.state, 
      start_date: formValue.date[0].format('YYYY-MM-DD'),
      end_date: formValue.date[1].format('YYYY-MM-DD')
    })
    console.log(reqData)
    console.log(reqData)
    useEffect(() => {
      async function getList() {
        const res = await getArticlesBySelectAPI(reqData)
        setCount(res.data.total)
        setArticleList(res.data.data)
      }
      getList()
    }, [reqData])
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