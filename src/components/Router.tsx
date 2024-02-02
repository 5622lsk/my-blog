import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from 'pages/home';
import PostListPage from 'pages/posts/PostListPage';
import PostDetailPage from 'pages/posts/PostDetailPage';
import PostNewPage from 'pages/posts/PostNewPage';
import PostEditPage from 'pages/posts/PostEditPage';
import ProfilePage from 'pages/profile/ProfilePage';
import LoginPage from 'pages/login/LoginPage';
import SignUp from 'pages/signup/SignUp';

//타입선언
interface RouterProps{
  isAuthenticated: boolean;
}

export default function Router({isAuthenticated}: RouterProps) {
  //firebase Auth가 인증되었으면 true로 변경해주는 로직 추가
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostListPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/posts/new" element={<PostNewPage />} />
            <Route path="/posts/edit/:id" element={<PostEditPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} /> */}
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        ) : (
          <>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </>
  );
}
