import { useState, useContext, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { UserContext } from "../context/userContext";
import { getVotes, postVote } from "./Votes";
import Scent from './home/Scent'
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
    { count: 10, voters: [] },
    { count: 20, voters: [] },
    { count: 30, voters: [] },
    { count: 40, voters: [] },
    { count: 50, voters: [] },

  ]);
  const { user } = useContext(UserContext);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const data = await getVotes();
        if (Array.isArray(data)) {
          setVotes(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };

    fetchVotes();
  }, []);

  useEffect(() => {
    if (user) {
      const userId = user?._id;
      const hasUserVoted = votes.some((vote) => vote.voters.includes(userId));
      setHasVoted(hasUserVoted);
    }
  }, [user, votes]);

  const handleVote = async (index) => {
    const userId = user?._id;


    if (userId && !hasVoted) {
      try {
        const voteData = [index,userId,];

        await postVote(voteData);

        const newVotes = votes.map((vote,idx) => {
          if (index ===idx) {
            return {
              count: vote.count + 1,
              voters: [...vote.voters, userId],
            };
          }
          return vote;
        });
        setVotes(newVotes);
        setHasVoted(true);
      } catch (error) {
        console.error("Error posting vote:", error);
      }
    }
  };

  const data = {
    labels: [
      "Performance 1",
      "Performance 2",
      "Performance 3",
      "Performance 4",
      "Performance 5",

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
        beginAtZero: 100,
      },
    },
  };

  return (
    <div className="md:p-9 w-full h-full md:m-10">
      <div className="md:flex md:gap-[20px]  w-full">
        <Scent />
        <div className="w-2/3 ">
          <Bar data={data} options={options} className="h-[800px]" />
        </div>
      </div>
      <div className="grid md:flex grid-cols-2 ml-[42%] mt-8 gap-6  mb-4 md:grid-cols-4">
        {votes.map((vote, index) => (
          <div key={index} className="text-center">
            <button
              className="border-[#d8cd36]  border-[2px] text-[black] cursor-pointer rounded-lg p-1 w-[100px] h-[32px] radius-[10px]"
              onClick={() => handleVote(index)}
              aria-label={`Vote for Performance ${index + 1}`}
              disabled={hasVoted || !user}
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
