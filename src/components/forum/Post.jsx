import { UserContext } from "../../context/userContext";
import { useContext, useState } from "react";
import useAxiosInstance from "../../hooks/useAxiosInstance";

const Post = ({ fetchPosts }) => {
  const { user } = useContext(UserContext);
  const axiosInstance = useAxiosInstance();

  const initialPost = {
    id: user?.id || "",
    content: "",
    imageUrl: "", // Field for the image URL
    author: {
      username: user?.username || "",
      fullName: user?.fullName || "",
      profileImageUrl: user?.profileImageUrl || "",
    },
    likes: 0,
    formattedTime: "",
    comments: [],
  };

  const [post, setPost] = useState(initialPost);
  const [imagePreview, setImagePreview] = useState(null); // For previewing the image

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "forum/posts",
        {
          content: post.content,
          imageUrl: post.imageUrl, // Send the image URL as expected by the server
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.message);
      fetchPosts(); // Fetch the posts again after a successful post
      setPost(initialPost); // Reset post content and image URL after posting
      setImagePreview(null); // Reset the image preview
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post(
        "your-image-upload-endpoint", // Replace with your image upload endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const imageUrl = response.data.url; // Assuming the response contains the URL
      setPost({ ...post, imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Preview the image
      handleImageUpload(file); // Upload the image and get the URL
    }
  };

  return (
    <div>
      <div className="p-4 border rounded-md shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Post</h2>
        <div className="mb-4">
          <img
            src={post.author.profileImageUrl}
            alt={`${post.author.username}'s profile`}
            className="w-[58px] h-[58px] rounded-full"
          />
          <h3 className="text-xl font-semibold">{post.author.fullName}</h3>
          <p className="text-gray-500">@{post.author.username}</p>
        </div>
        <textarea
          className="w-full p-2 border rounded"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          placeholder="What's on your mind?"
        />
        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />
          {imagePreview && (
            <div className="relative w-full h-64 overflow-hidden rounded-md mb-4 bg-gray-100">
              <img
                src={imagePreview}
                alt="Image preview"
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <button
            onClick={handlePost}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
