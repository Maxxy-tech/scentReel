import { useState } from "react";
import PropTypes from "prop-types";

const Comment = ({ comment, onReply }) => {
  const [reply, setReply] = useState("");
  const [showReply, setShowReply] = useState(false);

  const handleReply = () => {
    if (reply.trim()) {
      onReply(comment.id, reply);
      setReply("");
      setShowReply(false);
    }
  };

  return (
    <div className="ml-8 mt-2">
      <div className="bg-gray-100 p-2 rounded">
        <div className="flex items-start">
          <img
            src={comment.author.profileImageUrl || "/default-avatar.png"}
            alt="Profile"
            className="w-[58px] h-[58px] rounded-full mr-2"
          />
          <div>
            <p className="text-sm font-semibold">
              {comment.author.fullName}{" "}
              <span className="text-xs text-gray-500">
                @{comment.author.username}
              </span>
            </p>
            <p className="text-xs text-gray-500">{comment.date}</p>
            <p className="text-sm">{comment.content}</p>
            <button
              className="text-blue-500 text-xs mt-1"
              onClick={() => setShowReply(!showReply)}
            >
              Reply
            </button>
          </div>
        </div>
        {showReply && (
          <div className="mt-2">
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Reply..."
              className="w-full p-2 rounded border"
            />
            <button
              className="bg-blue-500 text-white text-xs px-2 py-1 rounded mt-2"
              onClick={handleReply}
            >
              Reply
            </button>
          </div>
        )}
      </div>
      {comment.replies.length > 0 && (
        <div className="ml-4">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      profileImageUrl: PropTypes.string,
    }).isRequired,
    replies: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  onReply: PropTypes.func.isRequired,
};

export default Comment;
