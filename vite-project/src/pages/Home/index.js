
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Avatar } from 'antd';
const { Meta } = Card
import './index.scss'
import img404 from '@/assets/error.png'
import { useEffect, useState } from 'react';
import { getUserInfoAPI } from '@/apis/userInfo';

const UserInfo = () => {
  const userInfo = useSelector(state => state.user.userInfo.data)
  const userId = userInfo?.id

  const [avatar, setAvatar] = useState([])
  useEffect(() => {
    async function getAvatar() {
      const res = await getUserInfoAPI(userId)
      const url = JSON.parse(res.data.data.avatar)
      if (url[0]) {
        const avatarUrl = url[0].url.replace(/^\//, '')
        setAvatar(`http://127.0.0.1:3007/${avatarUrl}`)
      }
    }
    getAvatar()
  }, [userId])

  const navigate = useNavigate()
  const onClickEdit = () => {
    navigate('/editinfo')
  }

  const onClickChangePsw = () => {
    navigate('/changepsw')
  }

  return (
    <Card
      title="My Information"
      className='userInfoCard'
    >
      <div className='userInfoRow'>
        <strong className='label'>
          Avatar:
        </strong>
        <span className='content'>
        <Meta 
          avatar={
            <Avatar
              shape="square"
              src={avatar.length > 0 ? avatar : img404}
              className='avatar'
            />
          }
        />
        </span>
      </div>
      <p className='userInfoRow'>
        <strong className='label'>
          Id:
        </strong>
        <span className='content'>
          user_{userInfo?.id}
        </span>
      </p>
      <p className='userInfoRow'>
        <strong className='label'>
          Username:
        </strong>
        <span className='content'>
          {userInfo?.username}
        </span>
      </p>
      <p className='userInfoRow'>
        <strong className='label'>
          Nickname:
        </strong>
        <span className={`content ${!userInfo?.nickname ? 'default-info' : ''}`}>
          {userInfo?.nickname ? userInfo?.nickname : 'User has not set a nickname. '}
        </span>
      </p>
      <p className='userInfoRow'>
        <strong className='label'>
          Email:
        </strong>
        <span className={`content ${!userInfo?.email ? 'default-info' : ''}`}>
          {userInfo?.email ? userInfo?.email : 'User has not set a email. '}
        </span>
      </p>
      <Button
        type="primary"
        className='editButton'
        onClick={onClickEdit}
      >
        Edit
      </Button>

      <Button
        type="primary"
        className='editButton'
        onClick={onClickChangePsw}
      >
        Change Password
      </Button>

    </Card>
  );
};

export default UserInfo;