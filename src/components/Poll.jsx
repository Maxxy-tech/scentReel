import { useState, useContext, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { UserContext } from "../context/userContext";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Poll = () => {
  const [votes, setVotes] = useState([
    { count: 0, voters: [] },
    { count: 0, voters: [] },
    { count: 0, voters: [] },
    { count: 0, voters: [] },
  ]);
  const { user } = useContext(UserContext);
  const [canVote, setCanVote] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    setIsLogin(!!user);
    if (user) {
      const userId = user?.user?._id;
      const hasUserVoted = votes.some((vote) => vote.voters.includes(userId));
      setHasVoted(hasUserVoted);
      setCanVote(!hasUserVoted);
    }
  }, [user, votes]);

  const handleVote = (index) => {
    const userId = user?.user?._id;
   console.log(userId);
    if (userId && canVote) {
      const newVotes = votes.map((vote, idx) => {
        if (idx === index) {
          return {
            count: vote.count + 1,
            voters: [...vote.voters, userId],
          };
        }
        return vote;
      });
      setVotes(newVotes);
      // setHasVoted(true);
      // setCanVote(false);
    } else {
      console.log("cannotVote");
    }
  };

  const data = {
    labels: [
      "Performance 1",
      "Performance 2",
      "Performance 3",
      "Performance 4",
    ],
    datasets: [
      {
        label: "Number of Votes",
        data: votes.map((vote) => vote.count),
        backgroundColor: [
          "rgba(255, 99, 132, 1.2)",
          "rgba(54, 162, 235, 1.2)",
          "rgba(255, 206, 86, 1.2)",
          "rgba(75, 192, 192, 1.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1.2)",
          "rgba(54, 162, 235, 1.2)",
          "rgba(255, 206, 86, 1.2)",
          "rgba(75, 192, 192, 1.2)",
        ],
        borderWidth: 1,
        barThickness: 90,
        responsive: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-10 w-full h-full">
      <div className="">
        <div className="w-full h-full ">
          <Bar data={data} options={options} />
        </div>
      </div>

      <div className="grid sm:flex grid-cols-2 gap-4 mb-4 md:grid-cols-4">
        {votes.map((vote, index) => (
          <div key={index} className="text-center">
            <button
              className="border-[#d8cd36] border-[2px] text-[black] cursor-pointer rounded-lg p-1 w-[100px] h-[32px] top-[2580px] left-[753px] radius-[10px]"
              onClick={() => handleVote(index)}
              aria-label={`Vote for Performance ${index + 1}`}
              disabled={hasVoted || !isLogin}
            >
              {index + 1}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Poll;
