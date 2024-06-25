import img from "../../assets/Lady2.jpeg";
import heart1 from "../../assets/icons8-heart-24.png";
import heart2 from "../../assets/icons8-heart-30.png";
import retweet from "../../assets/icons8-retweet-24.png";
import comment from "../../assets/icons8-comment-50.png";
import moon from '../../assets/icons8-moon-30.png'
import Navbar from "../home/Navbar";
import { useState } from "react";

const Forum = () => {
  const [likes, setLikes] = useState([0, 0, 0, 0]);
  const [liked, setLiked] = useState([false, false, false, false]);
  const [showMore, setShowMore] = useState([false, false, false, false]);
  const [darkMode, setDarkMode] = useState(false);

  function likePost(index) {
    const newLiked = [...liked];
    const newLikes = [...likes];

    newLiked[index] = !newLiked[index];
    newLikes[index] += newLiked[index] ? 1 : -1;
    setLikes(newLikes);
    setLiked(newLiked);
  }

  function toggleReadMore(index) {
    const newShowMore = [...showMore];
    newShowMore[index] = !newShowMore[index];
    setShowMore(newShowMore);
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white min-h-screen"
          : "bg-gray-100 text-black min-h-screen"
      }
    >
      <Navbar className="" />

      <div className="text-center mt-6">
        <h1 className="font-sans font-extrabold text-[1.2rem] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#f0cd0b] to-black">
          Forum
        </h1>
        <hr className="border-b-2 border-black mx-auto w-20 my-2" />
        <img src={moon}
          onClick={toggleDarkMode}
          className= "bg-transparent  mt-4 px-4 py-2 rounded fixed text-white"
         />


      </div>

      <div
        className={
          darkMode
            ? "w-full h-auto bg-gray-800 p-4"
            : "w-full h-auto bg-white p-4"
        }
      >
        {liked.map((isLiked, index) => (
          <div
            key={index}
            className={
              darkMode
                ? "bg-gray-700 shadow-md rounded-lg p-4 mx-4 sm:mx-8 md:mx-16 lg:mx-32 my-4 border border-gray-600"
                : "bg-white shadow-md rounded-lg p-4 mx-4 sm:mx-8 md:mx-16 lg:mx-32 my-4 border border-gray-200"
            }
          >
            <div className="flex items-start">
              <img
                className="rounded-full w-12 h-12 object-cover shadow-lg"
                src={img}
                alt="Profile"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-base">
                      Greg Ayom
                      <span className="text-sm text-gray-500 ml-2">
                        @gregyo
                      </span>
                    </h5>
                    <span className="text-xs text-gray-500">23s</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">12/03/2021</p>
                  </div>
                </div>
                <p
                  className={
                    darkMode
                      ? "mt-2 text-gray-300 text-sm"
                      : "mt-2 text-gray-700 text-sm"
                  }
                >
                  These perfumes are exquisitely awesome! I would love to try
                  them again and again and again. Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Delectus fugit repellat aliquam
                  suscipit id at? Adipisci excepturi molestias ad quos ipsam
                  consequatur culpa dolor nam possimus vitae rerum, corrupti
                  autem?{" "}
                  {showMore[index]
                    ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus totam itaque nostrum ut! Saepe ipsam iure dolore, quaerat odit ad sit nihil magnam inventore repellendus, vero debitis obcaecati sequi quam! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus totam ducimus commodi odit, vitae voluptate veniam ullam delectus doloribus tempore dignissimos enim, veritatis adipisci natus neque, rerum earum fuga quod."
                    : ""}
                </p>
                <button
                  onClick={() => toggleReadMore(index)}
                  className="text-blue-500 text-sm"
                >
                  {showMore[index] ? "Read Less" : "Read More"}
                </button>

                <img
                  className="w-full rounded-2xl mt-4 h-auto max-h-[300px] object-cover"
                  src={img}
                  alt="Post"
                />

                <div className="mt-4 flex justify-around text-gray-500">
                  <div
                    className="flex items-center space-x-1 cursor-pointer"
                    onClick={() => likePost(index)}
                  >
                    <img
                      className="hover:translate-y-[-2px]"
                      src={isLiked ? heart2 : heart1}
                      alt="like"
                    />
                    <span className="text-sm">{likes[index]}</span>
                  </div>
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <img
                      src={retweet}
                      className="hover:translate-y-[-2px]"
                      alt="retweet"
                    />
                    <span className="text-sm">0</span>
                  </div>
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <img
                      className="w-6 hover:translate-y-[-2px]"
                      src={comment}
                      alt="comment"
                    />
                    <span className="text-sm">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
