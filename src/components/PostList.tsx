import React, { useState } from 'react'
import { Link } from 'react-router-dom'


interface PostListProps {
    hasNav?: boolean;
}
type TabType = "all" | "my";

export default function PostList({hasNav = true} : PostListProps) {
    const [activeTab, setActiveTab] = useState<TabType>("all"); //기본을 전체게시물로
  return (
    <>
 
    { hasNav && (
        <div className='post__nav'>
            <div role="presentation"
                 onClick={()=>setActiveTab("all")}
                 className={activeTab === 'all' ? "post__nav--active" : ""} >
                전체
            </div>
            <div role="presentation"
                 onClick={()=>setActiveTab("my")}
                 className={activeTab === 'my' ? "post__nav--active" : ""}
            >나의글</div>
        </div>
    )}

    <div className='post__list'>
        {[...Array(10)].map((e, index) => (
            <div key={index} className='post__box'>
                <Link to={`/posts/${index}`}>
                    <div className='post__profile-box'>
                        <div className='post__profile' />
                        <div className='post__author-name'>임성경</div>
                        <div className='post__date'>2024.1.23 오후 07:34:04</div>
                    </div>
                    <div className='post__title'>게시글{index}</div>
                    <div className='post__text'>안뇽하세용ㅇ용용</div>
                    <div className='post__utils-box'>
                        <div className='post__delete'>삭제</div>
                        <div className='post__edit'>수정</div>
                    </div>
                </Link>
            </div>
        ))}
      </div>
      
    </>
  )
}
