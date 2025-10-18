import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ProblemPage from './Pages/ProblemPage';
import { checkAuth } from './utilis/authSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AdminPanel from './components/Adminpanel';
import CodeEditorPage from './Pages/codeEditor';
import Admin from './Pages/Admin';
import AdminDelete from './components/AdminDelete';
import AdminVideo from './components/AdminVideo';
import AdminUpload from './components/AdminUpload';
import HomePage from './Pages/HomePage';
import UserProfile from './components/UserProfile';
import About from './components/About';



function App(){
  // check for is user valid
  const {user,isauthenticated,loading}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  if(loading){
    <div className='min-h screen flex justify-center items-center'>
      <span className='loading loading-spinner loading-lg'></span>
    </div>
  }
  return (
    <div>
      <Routes>
        <Route path='/' element={isauthenticated ?<ProblemPage></ProblemPage>:<HomePage></HomePage>}></Route>
        <Route path='/signup' element={isauthenticated ?<Navigate to='/'></Navigate>:<Signup></Signup>}></Route>
        <Route path='/login' element={isauthenticated ?<Navigate to='/'></Navigate>:<Login></Login>}></Route>
        <Route path='/profile' element={isauthenticated ?<UserProfile></UserProfile>:<Login></Login>}></Route>
        <Route path='/admin' element={isauthenticated && user.role==='admin'? <Admin></Admin>:<ProblemPage></ProblemPage>}></Route>
        <Route path='/admin/create' element={isauthenticated?<AdminPanel></AdminPanel>:<Navigate to='/'></Navigate>}></Route>
        <Route path='/admin/update' element={isauthenticated ?<AdminPanel></AdminPanel>:<Navigate to='/'></Navigate>}></Route>
        <Route path='/admin/delete' element={isauthenticated ?<AdminDelete></AdminDelete>:<Navigate to='/'></Navigate>}></Route>
        <Route path='/admin/video' element={isauthenticated ? <AdminVideo></AdminVideo>:<Navigate to='/'></Navigate>}></Route>
        <Route path='/admin/upload/:problemId' element={isauthenticated ? <AdminUpload></AdminUpload>:<Navigate to='/'></Navigate>}></Route>
        <Route path='/problem/:problemId' element={isauthenticated ?<CodeEditorPage></CodeEditorPage>:<Signup></Signup>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        
       
      </Routes>
      
      
    </div>
  )
}

export default App
