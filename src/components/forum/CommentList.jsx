import { useState } from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";

const CommentList = ({ postId, comments, handleAddComment }) => {
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);

  const handleAdd = () => {
    if (commentText.trim()) {
      handleAddComment(postId, commentText);
      setCommentText("");
    }
  };

  const toggleCommentInput = () => {
    setShowCommentInput((prev) => !prev);
  };

  return (
    <div className="mt-4">
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={(parentId, replyText) =>
            handleAddComment(postId, replyText, parentId)
          }
        />
      ))}
      {showCommentInput ? (
        <div className="mt-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 rounded border"
          />
          <button
            className="bg-blue-500 text-white text-xs px-2 py-1 rounded mt-2"
            onClick={handleAdd}
          >
            Add Comment
          </button>
        </div>
      ) : (
        <button
          className="text-blue-500 text-xs mt-2"
          onClick={toggleCommentInput}
        >
          Add a Comment
        </button>
      )}
    </div>
  );
};

CommentList.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAddComment: PropTypes.func.isRequired,
};

export default CommentList;
