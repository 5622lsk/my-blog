import AuthContext from 'context/AuthContext';
import { collection, deleteDoc, doc, getDocs, orderBy, query} from 'firebase/firestore';
import { db } from 'firebaseApp';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';


interface PostListProps {
    hasNav?: boolean;
}
type TabType = "all" | "my";

export interface PostProps{
    id?:string;
    title:string;
    email:string;
    summary:string;
    content:string;
    createdAt:string;
    uid:string;
    updatedAt:string;
}

export default function PostList({hasNav = true} : PostListProps) {
    const [activeTab, setActiveTab] = useState<TabType>("all"); //기본을 전체게시물로
    const [posts, setPosts] = useState<any[]>([]);
    const {user} = useContext(AuthContext);



    const getPosts = async() => {
        setPosts([]); //posts초기화(변경된 post list 가져오도록)
        let postsRef = collection(db, "posts");
        let postsQuery = query(postsRef, orderBy("createdAt", "desc"));
        const datas = await getDocs(postsQuery);
        datas?.forEach((doc) => {
            const dataObj= { ...doc.data(), id: doc.id };
            setPosts((prev) => [...prev, dataObj as PostProps ]);
        });
    };

    const handleDelete = async(id: string) => {
        const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
        if(confirm && id){
            await deleteDoc(doc(db, "posts", id));
            toast.success('게시글을 삭제했습니다.');
            getPosts();//변경된 post list를 가져옴
        }   
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

                    <div className='post__text'>{post?.summary}</div>
                    {post?.email === user?.email && (
                    <div className='post__utils-box'>
                        <div className='post__delete' role="presentation" onClick={()=>handleDelete(post.id as string)}>삭제</div>
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
