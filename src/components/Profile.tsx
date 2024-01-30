import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <div className='profile__box'>
      <div className='profile__box-lg'>
        <div className='profile__img'></div>
        <div>
          <div className='profile__email'>5622lsk@naver.com</div>
          <div className='profile__naime'>임성경</div>
        </div>
      </div>
      <Link to="/" className='profile__logout'>
        로그아웃
      </Link>

      
    </div>
  )
}
