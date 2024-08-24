import React, { useContext, useState, useEffect } from "react";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import CommentList from "./CommentList";
import Post from "./Post";
import img from "../../assets/Empty.png";
import heart1 from "../../assets/icons8-heart-24.png";
import heart2 from "../../assets/icons8-heart-30.png";
import moon from "../../assets/icons8-moon-30.png";
import retweet from "../../assets/Default.png";
import comment from "../../assets/icons8-comment-50.png";
import { UserContext } from "../../context/userContext";
import Navbar from "../home/Navbar";

const Forum = () => {
  const axiosInstance = useAxiosInstance();
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [postStates, setPostStates] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [comments, setComments] = useState({});
  const [showCommentInput, setShowCommentInput] = useState({});
  const [singleComment, setSingleComment] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("forum/posts");
        const fetchedPosts = response.data.data || [];
        setPosts(fetchedPosts);
        initializePostStates(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [axiosInstance]); // Added axiosInstance to dependencies to ensure it’s up-to-date

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode);
    }
  }, []); // Load dark mode preference on mount

  const initializePostStates = (fetchedPosts) => {
    const initialStates = fetchedPosts.map((post) => ({
      likes: post.likes,
      liked: false,
      showMore: post.content.length > 100,
      comments: post.comments.length,
      moreContent: post.content.length > 100 ? post.content.slice(100) : "",
    }));
    setPostStates(initialStates);

    setShowCommentInput(
      fetchedPosts.reduce((acc, post) => {
        acc[post._id] = false;
        return acc;
      }, {})
    );

    setComments(
      fetchedPosts.reduce((acc, post) => {
        acc[post._id] = [];
        return acc;
      }, {})
    );
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axiosInstance.get(
        `forum/posts/${postId}/comments`
      );
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };

  const fetchCommentById = async (commentId) => {
    try {
      const response = await axiosInstance.get(`forum/comments/${commentId}`);
      setSingleComment(response.data.data);
    } catch (error) {
      console.error("Error fetching single comment:", error);
    }
  };

  const handleCommentButtonClick = async (postId) => {
    if (!showCommentInput[postId]) {
      const fetchedComments = await fetchComments(postId);
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: fetchedComments,
      }));
    }

    setShowCommentInput((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleAddComment = async (postId, commentText, parentId = null) => {
    const newComment = {
      author: user,
      content: commentText,
      parentId,
    };

    try {
      const response = await axiosInstance.post(
        `/forum/posts/${postId}/comments`,
        newComment
      );
      const savedComment = response.data.data;
      setComments((prevComments) => {
        const postComments = prevComments[postId] || [];
        return {
          ...prevComments,
          [postId]: parentId
            ? postComments.map((comment) =>
                comment.id === parentId
                  ? { ...comment, replies: [...comment.replies, savedComment] }
                  : comment
              )
            : [...postComments, savedComment],
        };
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

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

  const handleShowMore = (index) => {
    setPostStates((prevStates) =>
      prevStates.map((state, idx) =>
        idx === index ? { ...state, showMore: !state.showMore } : state
      )
    );
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Navbar />
      <Post fetchPosts={fetchPosts} />
      <div className="text-center mt-6">
        <h1 className="font-sans font-extrabold text-[1.2rem] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#f0cd0b] to-black">
          Forum
        </h1>
        <hr className="border-b-2 border-black mx-auto w-20 my-2" />
        <img
          src={moon}
          onClick={() => {
            const newDarkMode = !darkMode;
            setDarkMode(newDarkMode);
            localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
          }}
          className="bg-transparent mt-4 px-4 py-2 rounded fixed text-white cursor-pointer"
          alt="Toggle Dark Mode"
        />
      </div>

      <div className={`w-full h-auto ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        {posts.map((post, index) => (
          <div
            key={post._id}
            className={`p-2 mx-4 sm:mx-8 md:mx-16 lg:mx-32 my-4 shadow-sm ${
              darkMode ? "bg-gray-700 border border-gray-600" : "bg-white"
            }`}
          >
            <div className="flex items-start">
              <img
                className="rounded-full w-[58px] h-[58px] object-cover shadow-lg"
                src={post.author.profileImageUrl || img}
                alt="User profile"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-[600] text-[14px] leading-[21px]">
                      {post.author.fullName}
                      <span className="text-sm text-gray-500 ml-2">
                        @{post.author.username}
                      </span>
                    </h5>
                    <span className="text-xs text-gray-500">
                      {post.formattedTime}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </div>
                <p
                  className={`mt-2 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {postStates[index].showMore
                    ? post.content + postStates[index].moreContent
                    : post.content.slice(0, 100)}
                  {post.content.length > 100 && (
                    <button
                      onClick={() => handleShowMore(index)}
                      className="text-blue-500 text-sm ml-1"
                    >
                      {postStates[index].showMore ? "Read Less" : "Read More"}
                    </button>
                  )}
                </p>
                <div className="mt-4 flex justify-around gap-[30px] text-gray-500">
                  <div
                    className="flex items-center space-x-1 cursor-pointer"
                    onClick={() => handleLike(index)}
                  >
                    <img
                      className="hover:translate-y-[-2px]"
                      src={
                        postStates[index].liked || postStates[index].likes > 0
                          ? heart2
                          : heart1
                      }
                      alt="like"
                    />
                    <span className="text-sm">{postStates[index].likes}</span>
                  </div>
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <img
                      src={retweet}
                      className="hover:translate-y-[-2px]"
                      alt="retweet"
                    />
                    <span className="text-sm">0</span>
                  </div>
                  <div
                    className="flex items-center space-x-1 cursor-pointer"
                    onClick={() => handleCommentButtonClick(post._id)}
                  >
                    <img
                      src={comment}
                      className="hover:translate-y-[-2px]"
                      alt="comment"
                    />
                    <span className="text-sm">
                      {postStates[index].comments}
                    </span>
                  </div>
                </div>
                {showCommentInput[post._id] && (
                  <CommentList
                    comments={comments[post._id]}
                    postId={post._id}
                    handleAddComment={handleAddComment}
                    fetchCommentById={fetchCommentById}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
