import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './userContext';
import axios from 'axios';

const Course = ({userCourse, title, description, file, courseId }) => {
    const [isFollowed, setIsFollowed] = useState(false)
    const { user } = useContext(UserContext);
    const userId = user._id;
    const [followedCourses, setFollowedCourses] = useState([]);


    const followCourse = async () => {
      if (!isFollowed){
        const response = await axios.post(`courses/${userId}/follow`);
        setFollowedCourses(response.data.followedCourses);
        setIsFollowed(true)
      } else {
        const response = await axios.delete(`courses/${userId}/unfollow`);
        setFollowedCourses(response.data.followedCourses);
      }
        
      }


    return (

                        <div key={courseId} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={file} alt={userCourse.name} className="w-full h-56 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2">{title}</h2>
                                <p className="text-gray-600">{description}</p>
                                <div className="mt-4 flex">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Programmation</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">intermediate</span>
                                </div>
                                <button
                                    onClick={() => followCourse(courseId)}
                                    className={`flex px-4 py-2 bg-${followedCourses.includes(courseId) ? 'gray' : 'teal'}-500 text-white font-semibold rounded-lg shadow-md hover:bg-${followedCourses.includes(courseId) ? 'gray' : 'teal'}-700`}>
                                    {followedCourses.includes(courseId) ? 'Following' : 'Follow'}
                                </button>
                            </div>
                        </div>
                
    );
};

export default Course;
