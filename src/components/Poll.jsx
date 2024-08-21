import React, { useState, useContext, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { UserContext } from "../context/userContext";
import { getVotes, postVote } from "./Votes";
import arrow1 from "../assets/Arrow 1.png";
import arrow2 from "../assets/Arrow 2.png";
import arrow3 from "../assets/Arrow 3.png";
import arrow4 from "../assets/Arrow 4.png";
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
    { count: 5, voters: [] },
    { count: 10, voters: [] },
    { count: 15, voters: [] },
    { count: 20, voters: [] },
    { count: 25, voters: [] },
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
        barThickness: "flex",
        maxBarThickness: 80,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="relative p-4 w-full md:p-9 md:m-10">
      <h2 className="text-2xl font-bold">Performance Poll</h2>
      <div className="absolute mt-[6%] -left-[1%] pr-10 mr-30">
        <div className="relative">
          <img src={arrow4} className="" alt="" />{" "}
          <div className="  pr-8">
            <div className="rotate-90 absolute mt-[20px] mb-[20px] -left-[181px]  h-[200px] w-[200px]">
              <p className="h-full w-full  ">% Perfume Dupe</p>
            </div>
          </div>
          <div className="mt-[140px]">
            <img src={arrow3} className="" alt="" />
          </div>
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="w-full h-[300px] md:h-[500px] lg:h-[700px]">
          <Bar data={data} options={options} className="h-full w-full" />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {votes.map((vote, index) => (
              <div key={index} className="text-center">
                <button
                  className="rounded-full border-none text-[black] cursor-pointer p-2 w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] shadow-[8px_8px_16px_#bebebe,_-8px_-8px_16px_#ffffff] radius-[10px]"
                  style={{
                    backgroundColor: data.datasets[0].backgroundColor[index],
                  }}
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

      <div className="flex gap-[200px]">
        <div>
          <img src={arrow1} alt="" />
        </div>
        <div>
          <img src={arrow2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Poll;
