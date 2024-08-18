import { useEffect, useState } from "react";
import img from "../../assets/Empty.png";
// import heart1 from "../../assets/icons8-heart-24.png";
import heart2 from "../../assets/icons8-heart-30.png";
import retweet from "../../assets/icons8-retweet-24.png";
import comment from "../../assets/icons8-comment-50.png";
import moon from "../../assets/icons8-moon-30.png";
import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";

const Feeds = () => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://scentreel-be.onrender.com/api/v1/forum/posts"
        );
        const fetchedPosts = response.data.data || [];

        // Ensure posts have user information
        const postsWithUsers = fetchedPosts.map((post) => ({
          ...post,
          user: post.user || {
            profileImageUrl: img,
            fullName: "Unknown User",
            username: "",
          },
        }));

        setPosts(postsWithUsers);
        setLikes(postsWithUsers.map(() => 0));
        setLiked(postsWithUsers.map(() => false));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const renderTimestamp = (dateString) => {
    if (!dateString) return "Unknown time";
    const parsedDate = parseISO(dateString);
    return isNaN(parsedDate)
      ? "Unknown time"
      : formatDistanceToNow(parsedDate, { addSuffix: true });
  };

  const handleLike = (index) => {
    setLiked((prevLiked) => {
      const newLiked = [...prevLiked];
      newLiked[index] = !newLiked[index];
      return newLiked;
    });

    // Optionally send like/unlike update to the server
    // axiosInstance.post(`/forum/posts/${posts[index].id}/like`, {
    //   /* your user id */
    // });
  };

  return (
    <div
      className={`feeds-container ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } p-4`}
    >
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div
            key={post.id || index}
            className={`post border ${
              darkMode
                ? "border-gray-700 bg-gray-800"
                : " bg-white"
            } rounded-lg shadow-md mb-4 p-4 flex flex-col sm:flex-row items-start`}
          >
            <img
              src={post.author.profileImageUrl || img}
              alt="user"
              className="w-16 h-16 rounded-full object-cover mb-4 sm:mb-0 sm:mr-4"
            />
            <div className="flex-1">
              <div className="post-header flex items-center justify-between">
                <div className="post-user-info">
                  <span className="font-semibold text-lg block">
                    {post.author.fullName}
                  </span>
                  <span className="text-gray-500">@{post.author.username}</span>
                </div>
                <span className="post-timestamp text-gray-400 text-sm">
                  {renderTimestamp(post.formattedTime)}
                </span>
              </div>
              <div className="post-content mt-2">
                <p className="text-base">{post.content}</p>
                {post.imageUrl && (
                  <img
                    className="mt-2 w-full rounded-lg object-cover"
                    src={post.imageUrl}
                    alt="Post"
                  />
                )}
              </div>
              <div className="post-actions mt-4 flex mr-[20em] justify-end gap-20 items-center text-gray-500">
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => handleLike(index)}
                >
                  <img
                    src={ heart2 }
                    alt="like"
                    className="w-6 hover:opacity-75"
                  />
                  <span className="text-sm">{likes[index]}</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <img
                    src={retweet}
                    alt="retweet"
                    className="w-6 hover:opacity-75"
                  />
                  <span className="text-sm">0</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <img
                    src={comment}
                    alt="comment"
                    className="w-6 hover:opacity-75"
                  />
                  <span className="text-sm">0</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No posts available</p>
      )}
    </div>
  );
};

export default Feeds;
