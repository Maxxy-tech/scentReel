import React, { useContext, useState, useEffect } from "react";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import CommentList from "./CommentList";
import Post from "./Post";
import img from "../../assets/Empty.png";
import heart1 from "../../assets/icons8-heart-24.png";
import heart2 from "../../assets/icons8-heart-30.png";
import moon from "../../assets/icons8-moon-30.png";
import retweet from "../../assets/icons8-moon-30.png";
import comment from "../../assets/icons8-heart-24.png";
import { UserContext } from "../../context/userContext";

const Forum = () => {
  const axiosInstance = useAxiosInstance();
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [postStates, setPostStates] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [comments, setComments] = useState({});
  const [showCommentInput, setShowCommentInput] = useState({});
  const [singleComment, setSingleComment] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("forum/posts");
      const fetchedPosts = response.data.data || [];
      setPosts(fetchedPosts);

      const initialStates = fetchedPosts.map(post => ({
        likes: 0,
        liked: false,
        showMore: false,
      }));
      setPostStates(initialStates);

      setShowCommentInput(fetchedPosts.reduce((acc, post) => {
        acc[post._id] = false;
        return acc;
      }, {}));

      setComments(fetchedPosts.reduce((acc, post) => {
        acc[post._id] = [];
        return acc;
      }, {}));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [axiosInstance]);

  const fetchComments = async (postId) => {
    try {
      const response = await axiosInstance.get(`forum/posts/${postId}/comments`);
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };

  const fetchCommentById = async (commentId) => {
    try {
      const response = await axiosInstance.get(`forum/comments/${commentId}`);
      setSingleComment(response.data.data); // Store the fetched comment in state
    } catch (error) {
      console.error("Error fetching single comment:", error);
    }
  };

  const handleCommentButtonClick = async (postId) => {
    if (!showCommentInput[postId]) {
      const fetchedComments = await fetchComments(postId);
      setComments(prevComments => ({
        ...prevComments,
        [postId]: fetchedComments,
      }));
    }

    setShowCommentInput(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleAddComment = (postId, commentText, parentId = null) => {
    const newComment = {
      id: Date.now(),
      author: user,
      content: commentText,
      replies: [],
      parentId,
      date: new Date().toLocaleString(),
    };

    setComments(prevComments => {
      const postComments = prevComments[postId] || [];
      return {
        ...prevComments,
        [postId]: parentId
          ? postComments.map(comment =>
              comment.id === parentId
                ? { ...comment, replies: [...comment.replies, newComment] }
                : comment
            )
          : [...postComments, newComment],
      };
    });
  };

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode);
    }
  }, []);

  const handleLike = async (index) => {
    const updatedStates = [...postStates];
    updatedStates[index] = {
      ...updatedStates[index],
      liked: !updatedStates[index].liked,
      likes: updatedStates[index].liked
        ? updatedStates[index].likes - 1
        : updatedStates[index].likes + 1,
    };
    setPostStates(updatedStates);

    try {
      await axiosInstance.post(`/forum/posts/${posts[index]._id}/like`, {
        userId: user.id,
      });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
      <Post fetchPosts={fetchPosts} />
      <div className="text-center mt-6">
        <h1 className="font-sans font-extrabold text-[1.2rem] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#f0cd0b] to-black">Forum</h1>
        <hr className="border-b-2 border-black mx-auto w-20 my-2" />
        <img
          src={moon}
          onClick={() => {
            setDarkMode(!darkMode);
            localStorage.setItem('darkMode', !darkMode);
          }}
          className="bg-transparent mt-4 px-4 py-2 rounded fixed text-white cursor-pointer"
          alt="Toggle Dark Mode"
        />
      </div>

      <div className={darkMode ? "w-full h-auto bg-gray-800 p-4" : "w-full h-auto bg-white p-4"}>
        {posts.map((post, index) => (
          <div key={post._id} className={darkMode ? "bg-gray-700 shadow-md rounded-lg p-4 mx-4 sm:mx-8 md:mx-16 lg:mx-32 my-4 border border-gray-600" : "bg-white text-center p-4 mx-4 sm:mx-8 md:mx-16 lg:mx-32 my-4"}>
            <div className="flex items-start">
              <img
                className="rounded-full w-[58px] h-[58px] object-cover shadow-lg"
                src={post.author.profileImageUrl || img}
                alt="User profile image"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-[600] text-[14px] leading-[21px] text-base">
                      {post.author.fullName}
                      <span className="text-sm text-gray-500 ml-2">@{post.author.username}</span>
                    </h5>
                    <span className="text-xs text-gray-500">{post.formattedTime}</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>
                <p className={darkMode ? "mt-2 text-gray-300 text-sm" : "mt-2 text-gray-700 text-sm"}>
                  {post.content}
                  {postStates[index].showMore ? post.moreContent : ""}
                </p>
                <button
                  onClick={() => setPostStates(prevStates =>
                    prevStates.map((state, idx) =>
                      idx === index ? { ...state, showMore: !state.showMore } : state
                    )
                  )}
                  className="text-blue-500 text-sm"
                >
                  {postStates[index].showMore ? "Read Less" : "Read More"}
                </button>
                <div className="mt-4 flex justify-end gap-[30px] text-gray-500">
                  <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleLike(index)}>
                    <img className="hover:translate-y-[-2px]" src={postStates[index].liked ? heart2 : heart1} alt="like button" />
                    <span className="text-sm">{postStates[index].likes}</span>
                  </div>
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <img src={retweet} className="hover:translate-y-[-2px]" alt="retweet button" />
                    <span className="text-sm">0</span>
                  </div>
                  <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleCommentButtonClick(post._id)}>
                    <img className="w-6 hover:translate-y-[-2px]" src={comment} alt="comment button" />
                    <span className="text-sm">{comments[post._id]?.length || 0}</span>
                  </div>
                </div>
                {showCommentInput[post._id] && (
                  <CommentList
                    postId={post._id}
                    comments={comments[post._id]}
                    handleAddComment={handleAddComment}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        {/* Render the single comment if it's fetched */}
        {singleComment && (
          <div className="single-comment">
            <h4>Single Comment:</h4>
            <p>{singleComment.content}</p>
            <small>By {singleComment.author.fullName} (@{singleComment.author.username})</small>
            <br />
            <small>{singleComment.date}</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;
