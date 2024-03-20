import React from 'react';
import { useEffect, useState, useContext } from 'react';
import Router from 'components/Router';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; //사용자의 로그인 유무 체크
import { app, db } from 'firebaseApp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader';
import ThemeContext from 'context/ThemeContext';

function App() { 
  const context = useContext(ThemeContext);
  const auth = getAuth(app);
  //auth를 체크하기 전에(initialize 전)는 loader를 띄워주는 용도
  const [init,setInit] = useState<boolean>(false);
  //auth의 currentUser가 있으면 authenticated로 변경
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser //curentUser:현재 유저의 로그인 유무 상태
  );

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setIsAuthenticated(true);
      }else {
        setIsAuthenticated(false);
      }
      setInit(true);
    })
  },[auth]);


  return (
    <div className= {context.theme === 'light' ? 'white' : 'dark'}>
    <ToastContainer />
    {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    
    </div>

  );
}

export default App;
