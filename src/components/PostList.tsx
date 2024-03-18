import AuthContext from 'context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'firebaseApp';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


interface PostListProps {
    hasNav?: boolean;
}
type TabType = "all" | "my";

interface PostProps{
    id:string;
    title:string;
    email:string;
    summary:string;
    content:string;
    createdAt:string;
}

export default function PostList({hasNav = true} : PostListProps) {
    const [activeTab, setActiveTab] = useState<TabType>("all"); //기본을 전체게시물로
    const [posts, setPosts] = useState<any[]>([]);
    const {user} = useContext(AuthContext);



    const getPosts = async()=>{
        const datas = await getDocs(collection(db, "posts"));

        datas?.forEach((doc) => {
            const dataObj= { ...doc.data(), id: doc.id };
            setPosts((prev) => [...prev, dataObj as PostProps ]);
        });
    };

    useEffect(()=>{
        getPosts();
    },[]);

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
        {posts?.length > 0 
            ? posts?.map((post, index) => (
            <div key={post?.id} className='post__box'>
                <Link to={`/posts/${post?.id}`}>
                    <div className='post__profile-box'>
                        <div className='post__profile' />
                        <div className='post__author-name'>{post?.email}</div>
                        <div className='post__date'>{post?.createdAt}</div>
                    </div>
                    <div className='post__title'>{post?.title}</div>
                    </Link>

                    <div className='post__text'>{post?.content}</div>
                    {post?.email === user?.email && (
                    <div className='post__utils-box'>
                        <div className='post__delete'>삭제</div>
                        <Link to = {`/posts/edit/${post?.id}`} className='post__edit'>
                            수정
                        </Link>
                    </div>
                    )}
                </div>
            ) 
       ) : (
        <div className='post__no-post'>게시글이 없습니다.</div>
       )}
      </div>
    </>
  );
}
