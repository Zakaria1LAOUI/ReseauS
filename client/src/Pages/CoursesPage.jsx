import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';
import axios from 'axios';
import Course from '../Course';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const { user } = useContext(UserContext);
  


    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:4000/courses');
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

  

    useEffect(() => {
        fetchCourses();
    }, []);
  


    return (
        <div className="bg-gray-100 min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-8">Courses</h1>
                <Link to={`/${user._id}/courseupload`}
                    className="flex px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Course
                </Link>
            </div>
            <div className="max-w-4xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map(course => (
                      <Course
                        userCourse={course.userCourse}
                        title={course.title}
                        description={course.description}
                        file={course.file}
                        courseId={course.courseId}
                      />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
