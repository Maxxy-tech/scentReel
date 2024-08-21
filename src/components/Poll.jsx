import React, { useState, useContext, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { UserContext } from "../context/userContext";
import { getVotes, postVote } from "./Votes";
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
        const voteData = [index, userId];

        await postVote(voteData);

        const newVotes = votes.map((vote, idx) => {
          if (index === idx) {
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
          "rgba(153, 102, 255, 1.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1.2)",
          "rgba(54, 162, 235, 1.2)",
          "rgba(255, 206, 86, 1.2)",
          "rgba(75, 192, 192, 1.2)",
          "rgba(153, 102, 255, 1.2)",
        ],
        borderWidth: 1,
        barThickness: 'flex', // Adjust bar thickness for better visibility
        maxBarThickness: 80, // Set a max thickness to avoid overly wide bars on large screens
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Allow the chart to resize properly
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 w-full md:p-9 md:m-10">
      <div className="grid  ">
        <div className="w-full md:h-full h-[300px] md:h-[500px] lg:h-[700px]">
          <Bar data={data} options={options} className="h-full w-full" />
        </div>
        <div className="w-full flex flex-col justify-center">
          <div className=" flex ml-[12em] mt-4 gap-8 ">
            {votes.map((vote, index) => (
              <div key={index} className="text-center">
                <button
                  className="rounded-full border-none text-[black] cursor-pointer p-1 w-[30px] h-[30px] shadow-[8px_8px_16px_#bebebe,_-8px_-8px_16px_#ffffff] radius-[10px]"
                  style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
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
      </div>
    </div>
  );
};

export default Poll;
