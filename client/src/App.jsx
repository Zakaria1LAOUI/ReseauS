import React from 'react'
import Header from "./Header"
import axios from 'axios'

import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import NotificationsPage from './Pages/NotificationsPage';
import SettingsPage from './Pages/SettingsPage';
import NavigationBar from './NavigationBar';
import HomePage from './Pages/HomePage';
import CoursesPage from './Pages/CoursesPage';
import CompetitionsPage from './Pages/CompetitionsPage';
import RegisterPage from './Pages/RegisterPage';
import { UserContextProvider } from './userContext';
import PostUploadPage from './Pages/PostUploadPage';
import ProfilePage from './Pages/ProfilePage';
import ExplorePage from './Pages/ExplorePage';
import SearchPage from './Pages/ResearchPage';
import CourseUploadPage from './Pages/CourseUploadPage';


axios.defaults.baseURL = 'http://localhost:4000' 
axios.defaults.withCredentials= true

function App(){
    return (
        <UserContextProvider>
            <Routes>
                <Route path='/' element={<Header/>}>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path=':id?/notifications' element={<NotificationsPage />} />
                    <Route path=':id?/settings' element={<SettingsPage />} />
                    <Route path=':id?/postupload' element={<PostUploadPage />} />
                    <Route path=':id?/courseupload' element={<CourseUploadPage />} />
                    <Route path=':id?/search' element={<SearchPage />} />
                    <Route path=':id?/profile' element={<ProfilePage />} />
                    <Route path=':id/navigation' element={<NavigationBar />}>
                        <Route path='home' element={<HomePage />}/>
                        <Route path='explore' element={<ExplorePage />} />
                        <Route path='courses' element={<CoursesPage />}/>
                            
                        <Route path='competitions' element={<CompetitionsPage />}/>
                    </Route>
                </Route>
            </Routes>
        </UserContextProvider>
    )
}
export default App