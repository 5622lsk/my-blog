import React from 'react'
import { Link } from 'react-router-dom'

export default function Detail() {
  return (
    <div>
      <div className='post__detail'>
        <div className='post__box'>
          <div className='post__title'>
            이것은 글제목입니다.
          </div>
          <div className='post__profile-box'>
            <div className='post__profile' />
            <div className='post__author-name'>임성경</div>
            <div className='post__date'>2024.1.23 오후 07:34:04</div>
          </div>
          <div className='post__utils-box'>
            <div className='post__delete'>삭제</div>
            <div className='post__edit'>
              <Link to = {`/posts/edit/1`}>수정</Link>
            </div>
          </div>
          <div className='post__text'>안뇽하세용ㅇ용용</div>
        </div>
      </div>
    </div>
  )
}
