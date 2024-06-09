import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './userContext';

const Post = ({ userPost, caption, createdAt, file, postId, onSelectPost }) => {
  const [evaluations, setEvaluations] = useState([]);
  const [comments, setComments] = useState([]);
  const [shares, setShares] = useState([]);
  const [copyLinkBarVisible, setCopyLinkBarVisible] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [newComment, setNewComment] = useState('');

  const { user } = useContext(UserContext);
  const userId = user._id;

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await axios.get(`/${userId}/posts/${postId}/reactions`);
        setEvaluations(response.data.evaluations);
        setShares(response.data.shares);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching reactions:', error);
      }
    };

    fetchEvaluations();
  }, [userId, postId]);

  const handleEvaluate = async () => {
    try {
      const response = await axios.post(`/${userId}/posts/${postId}/evaluate`);
      setEvaluations(response.data.evaluations);
    } catch (error) {
      console.error('Error evaluating post:', error);
    }
  };

  const handleShare = async () => {
    setCopyLinkBarVisible(true);
  };

  const handleCopyLink = async () => {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);
    const response = await axios.post(`/${userId}/posts/${postId}/share`);
    setShares(response.data.shares);
    setCopyLinkBarVisible(false);
    alert('Lien copié dans le presse-papiers !');
  };

  const handleComment = () => {
    setCommentsVisible(!commentsVisible);
    onSelectPost({ userPost, caption, createdAt, file, postId, comments });
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`/${userId}/posts/${postId}/comment`, { comment: newComment });
      setComments(response.data.comments);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div>
    <div className="bg-teal-500 bg-opacity-10 items-center p-4 my-3 shadow-md rounded">
      <Link to={`/${userPost.id}/profile`} className="flex text-lg text-indigo-500 font-bold">
        <img src={`${userPost.profilePicture}`} className="rounded-xl" />
        {userPost.name}
      </Link>
      <p className="text-indigo-400 font-bold">{caption}</p>
      <p className="text-blue-400 text-sm">{createdAt}</p>
      {file && <img src={`${file}`} alt="Post" className="mt-4" />}
      <div className="flex justify-between">
        <button onClick={handleEvaluate} className="flex gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={evaluations && evaluations.includes(userId) ? "red" : "blue"} className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg> {evaluations.length}
        </button>

        <button onClick={handleComment} className="flex gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
          </svg> {comments.length}
        </button>

        {copyLinkBarVisible && (
          <div className="flex items-center bg-gray-200 px-2 py-1 rounded">
            <span className="text-blue-600 mr-2">copy link from here!</span>
            <button onClick={handleCopyLink} className="text-blue-800 font-bold">
              Copier le lien
            </button>
          </div>
        )}
        <button onClick={handleShare} className="flex gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
          </svg> {shares.length}
        </button>
      </div>
      </div>
      {commentsVisible && (
        <div className="mt-4 mx-16" >
          <div className="flex flex-col flex-grow w-full max-w-sm bg-transparent rounded-lg shadow-md">
            <div className="px-4 py-2 border-t border-gray-300">
              <div className="flex mx-5 max-h-40 overflow-y-auto">
                
                  <div className="flex-grow overflow-y-auto">
                    <h3 className="text-m text-purple-500 font-semibold mx-2">Comments:</h3>
                    {comments.map((comment, index) => (
                      <div key={index} className="flex px-4 py-2 border-b border-gray-300 items-center">
                        <img src={`${comment.userCommentPicture}`} className="w-8 h-8 rounded-full mr-2" alt="user" />
                        <p className="text-gray-900">{comment.userComment}: {comment.comment}</p>
                      </div>
                    ))}
                
                </div>
              </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full h-8 p-1 my-2 border border-gray-300 text-gray-800 bg-blue-100 rounded"
              />
              <button onClick={handleCommentSubmit} className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-1 rounded">
                Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
   
  );
};

export default Post;
