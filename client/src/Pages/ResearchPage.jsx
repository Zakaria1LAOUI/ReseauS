
const SearchPage = () => {
  const navigateToUser = (userId) => {
    history.push(`/profile/${userId}`);
  };

  const navigateToPost = (postId) => {
    history.push(`/posts/${postId}`);
  };

  return (
   <div>
<div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {results.map((result) => (
        <div key={result._id} className="bg-white p-4 my-4 shadow-md">
          {result.type === 'user' ? (
            <div>
              <h2 className="text-lg font-semibold cursor-pointer" onClick={() => navigateToUser(result._id)}>{result.name}</h2>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold cursor-pointer" onClick={() => navigateToPost(result._id)}>{result.title}</h2>
              <p className="text-gray-600">{result.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
   </div> 
  );
};

export default SearchPage;
