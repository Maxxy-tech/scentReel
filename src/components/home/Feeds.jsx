import { useEffect, useState } from "react";
import img from "../../assets/Empty.png";
import heart2 from "../../assets/icons8-heart-30.png";
import retweet from "../../assets/Default.png";
import comment from "../../assets/icons8-comment-50.png";
import axios from "axios";
import {NavLink} from 'react-router-dom'
import { formatDistanceToNow, parseISO } from "date-fns";
import arrow from "../../assets/Vector (1).png";

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
  };

  // Get the last 6 posts
  const lastSixPosts = posts.slice(6);

  return (
    <div
      className={`feeds-container ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 relative`}
    >
     
      {lastSixPosts.length > 0 ? (
        lastSixPosts.map((post, index) => (
          <div
            key={post.id || index}
            className={`post ${
              darkMode ? "bg-gray-800" : "bg-white"
            } mb-4 p-8 flex flex-col items-start shadow-sm`}
          >
            <div>
              <img
                src={post.author.profileImageUrl || img}
                alt="user"
                className="w-[58px] h-[58px] rounded-full object-cover mb-4"
              />
              <div className="flex-1 w-full">
                <div className="post-header flex items-center justify-between">
                  <div className="post-user-info">
                    <span className="font-semibold text-lg block">
                      {post.author.fullName}
                    </span>
                    <span className="text-gray-500">
                      @{post.author.username}
                    </span>
                  </div>
                  <span className="post-timestamp text-gray-400 text-sm">
                    {post.formattedTime}
                  </span>
                </div>
                <div className="post-content mt-2">
                  <p className="text-base ml-[25px] p-4">{post.content}</p>
                  {post.imageUrl && (
                    <img
                      className="mt-2 w-full rounded-lg object-cover"
                      src={post.imageUrl}
                      alt="Post"
                    />
                  )}
                </div>
                <div className="post-actions mt-4 flex justify-around items-center text-gray-500">
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => handleLike(index)}
                  >
                    <img
                      src={heart2}
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
              <div className="absolute bottom-0 left-0 w-full h-[90px] transform translate-y-[50%]">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-white to-[#6e6868b7] opacity-70 z-10"></div>
                  <div className="absolute inset-0 bg-no-repeat bg-cover z-20"></div>
                  <NavLink to="/forum">
                    <img
                      src={arrow}
                      className="relative md:w-[25px] w-[15px] animate-bounce ml-[50%] z-30"
                      alt=""
                    />
                  </NavLink>{" "}
                  <p className="ml-[48%] text-[px]">view more</p>
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
