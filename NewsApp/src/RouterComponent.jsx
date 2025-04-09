import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from './Home/Home.jsx'
import Login from './Login/Login.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import CreateNews from './Dashboard/CreateNews/CreateNews.jsx'
import NewsDisplay from '../src/NewsDisplay/NewsDisplay.jsx'

function RouterComponent() {
    
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Content/:id" element={<NewsDisplay/>}/>
            <Route path='/login' element={<Login/>}/>

            {/* admin */}
            <Route path='/admin/dashboard' element={<Dashboard/>}/>
            <Route path='/admin/create-news' element={<CreateNews/>}/>
         </Routes>
    </div>
  )
}

export default RouterComponent
