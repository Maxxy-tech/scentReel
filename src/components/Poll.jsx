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
      <h2 className="text-2xl font-bold m-5 text-center">Performance Poll</h2>
      <div className="absolute lg:mt-[6%] -left-[1%] pr-10 mr-30">
        <div className="relative">
          <img
            src={arrow4}
            className="w-[6px] ml-4 sm:w-[60px] md:w-[80px] lg:w-auto"
            alt="Arrow 4"
          />
          <div className="pr-4 sm:pr-6 md:pr-8 lg:pr-10">
            <div className="rotate-90 absolute mt-[10px] sm:mt-[15px] lg:mt-[20px] mb-[14px] sm:mb-[15px] lg:mb-[20px] -left-[75px] sm:-left-[90px] md:-left-[120px] lg:-left-[170px] h-[100px] sm:h-[150px] md:h-[180px] lg:h-[200px] w-[100px] sm:w-[150px] md:w-[180px] lg:w-[200px]">
              <p className="h-full w-full text-[10px]  sm:text-[12px] md:text-[14px] lg:text-base">
                % Perfume Dupe
              </p>
            </div>
          </div>
          <div className="mt-[90px] sm:mt-[100px] md:mt-[120px] lg:mt-[140px]">
            <img
              src={arrow3}
              className="w-[6px] ml-4 sm:w-[60px] md:w-[10px] lg:w-auto"
              alt="Arrow 3"
            />
          </div>
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-1  gap-4">
        <div className="w-full h-[200px] md:h-[300px] lg:h-[400px]">
          <Bar data={data} options={options} className=" w-full" />
        </div>
        <div className="flex gap-[20px] ml-20 relative mt-4">
          <div>
            <img src={arrow1} alt="" className="w-20 mt-2 mr-" />
          </div>
          <div>
            <img src={arrow2} alt="" className="w-20 ml-20 mt-2" />
          </div>
          <h5 className="absolute text-center ml-[85px] ">Perfume Note</h5>
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
    </div>
  );
};

export default Poll;
