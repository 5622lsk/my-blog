import React from 'react'
import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from 'pages/home';
import PostListPage from 'pages/posts/PostListPage';
import PostDetailPage from 'pages/posts/PostDetailPage';
import PostNewPage from 'pages/posts/PostNewPage';
import PostEditPage from 'pages/posts/PostEditPage';
import ProfilePage from 'pages/profile/ProfilePage';
import LoginPage from 'pages/login/LoginPage';
import SignUp from 'pages/signup/SignUp';


export default function Router() {
  //firebase Auth가 인증되었으면 true로 변경해주는 로직 추가
  const [isAuthenticated, setIsAutnenticated] = useState<boolean>(false);

  return (
    <>
        <Routes>
          {isAuthenticated ? (
            <>
            <Route path="/" element={<Home />}></Route>
            <Route path="/posts" element={<PostListPage />}></Route>
            <Route path="/posts/:id" element={<PostDetailPage />}></Route>
            <Route path="/posts/new" element={<PostNewPage />}></Route>
            <Route path="/posts/edit/:id" element={<PostEditPage />}></Route>
            <Route path="/profile" element={ <ProfilePage />}></Route>
            <Route path="/login" element={ <LoginPage />}></Route>
            <Route path="/signup" element={ <SignUp />}></Route>
            <Route path="*" element={ <Navigate replace to="/" /> }></Route>
            </>
          ) : (
            <>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={ <SignUp />}></Route>
            <Route path="/login" element={ <LoginPage />}></Route>
            <Route path="*" element={<LoginPage/>} />
            </>
          )}
        </Routes>
    </>
  )
}
