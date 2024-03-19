import React, { useContext, useEffect, useState } from 'react'
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from 'react-toastify'
import { CATEGORIES, CategoryType, PostProps } from './PostList';



export default function PostForm() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [title,setTitle] = useState<string>("");
  const [summary,setSummary] = useState<string>("");
  const [content,setContent] = useState<string>("");
  const [category, setCategory] = useState<CategoryType>("Frontend");
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(post)//수정할 폼 데이터 들어옴
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try{
    if(post && post.id){
      //만약 post데이터가 있다면, firestore로 데이터 수정
      const postRef = doc(db, 'posts', post?.id);
      await updateDoc(postRef, {
        title: title,
        summary: summary,
        content: content,
        updatedAt: new Date()?.toLocaleDateString("ko",{
          hour:"2-digit",
          minute:"2-digit",
          second:"2-digit",
        }),
        category: category
      });
      toast?.success("게시글을 수정했습니다");
      navigate(`/posts/${post.id}`);
    } else {
      //없다면 firestore로 데이터 생성
      await addDoc(collection(db, "posts"), {
        title: title,
        summary: summary,
        content: content,
        createdAt: new Date()?.toLocaleDateString("ko",{
          hour:"2-digit",
          minute:"2-digit",
          second:"2-digit",
        }),
        email:user?.email,
        uid: user?.uid,
        category: category,
      }); 
    
    //파이어베이스로 데이터 생성하는 로직
    toast?.success("게시글을 생성했습니다.");
    navigate("/");
    }
  } catch (e: any) {
    console.log(e);
    toast?.error(e?.code);
    }
 };

  const onChange = (
      e: React.ChangeEvent< HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >
    ) => {
    const {
      target:{name,value},
    } = e;

    if (name === "title") {
      setTitle(value);
    }
    if (name === "summary"){
      setSummary(value);
    }
    if (name === "content"){
      setContent(value);
    }
    if(name === "category"){
      setCategory(value as CategoryType);
    }
  };

  const getPost = async(id: string) => {
    if(id){
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      setPost({id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

    useEffect(() => { 
      if(params?.id) getPost(params?.id);
    },[params?.id]);

    useEffect(()=>{
      if(post) {
        setTitle(post?.title)
        setSummary(post?.summary)
        setContent(post?.content)
        setCategory(post?.category as CategoryType);
      }
    },[post]);

  return (
      <form onSubmit={onSubmit} className='form'>
        {/* 제목 */}
        <div className='form__block'>
          <label htmlFor="title">{post?.title}</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            onChange={onChange}
            value={title}
            placeholder='제목'
           />
        </div>
        {/* 카테고리 */}
        <div className='form__block'>
          <label htmlFor="category">카테고리</label>
          <select
            name="category"
            id="category"
            onChange={onChange}
            defaultValue={category}
          >
            <option value="">카테고리를 선택해주세요</option>
            {CATEGORIES?.map((category) => (
              <option value={category} key={category}>{category}</option>
            ))} 
        {/* value 속성은 해당 카테고리의 값을 가지고 있으며, key 속성은 각 요소를 구별하기 위한 식별자를 지정 */}
          </select>
        </div>
        {/* 요약 */}
        <div className='form__block'>
          <label htmlFor='summary'>{post?.summary}</label>
          <input
            type="text"
            name="summary"
            id="summary"
            required
            onChange={onChange}
            value={summary}
            placeholder='요약'
           />
        </div>
        {/* 내용 */}
        <div className='form__block'>
          <label htmlFor='content'>{post?.content}</label>
          <textarea
            name="content"
            id="content"
            required 
            onChange={onChange}
            value={content}
            placeholder='내용'
          />
        </div>
        {/* 제출버튼 */}
        <div className='form__block'>
          <input 
          type="submit"
          value={post? "수정" : "제출"}
          className='form__btn-submit' 
          />
        </div>
      </form>
  );
}
 