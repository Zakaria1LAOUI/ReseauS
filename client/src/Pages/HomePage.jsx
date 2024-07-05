import React, { useState, useEffect } from 'react';
import Post from '../Post'; // Assurez-vous de mettre le bon chemin d'accès

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);

  // Suppose que vous avez une fonction pour récupérer tous les posts
  const fetchPosts = async () => {
    try {
      // Code pour récupérer les posts depuis votre backend
      const response = await fetch('http://localhost:4000/posts');
      const data = await response.json();
      setPosts(data); // Utilise directement data au lieu de data.posts
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Appel fetchPosts une seule fois après le rendu initial

  const goToPreviousPost = () => {
    setSelectedPostIndex((prevIndex) => (prevIndex === 0 ? posts.length - 1 : prevIndex - 1));
  };

  const goToNextPost = () => {
    setSelectedPostIndex((prevIndex) => (prevIndex === posts.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="bg-gray-100 flex flex-col ">
      <div className='text-lg text-purple-500 font-bold mt-4'>
      Show them waht you can do
      </div>
      <div className='flex flex-col items-center'>
      <div className='px-36 flex min-h-screen w-full'>
      <div>
        
      <button className="mx-16 mt-40" onClick={goToPreviousPost}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
      </div>
      
        <div className="max-w-lg w-full mt-20">
          {posts[selectedPostIndex] && (
            <Post
              userPost={posts[selectedPostIndex].userPost}
              caption={posts[selectedPostIndex].caption}
              createdAt={posts[selectedPostIndex].createdAt}
              file={posts[selectedPostIndex].file}
              postId={posts[selectedPostIndex].postId}
            />
          )}
          
           </div>
          <div >
            <button className="mx-14 mt-40" onClick={goToNextPost}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
         
       
    </div>
      </div>
      
    </div>
  );
};

export default HomePage;

