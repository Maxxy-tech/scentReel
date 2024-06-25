import { useState } from "react";
import { Bar } from "react-chartjs-2";
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
  const [votes, setVotes] = useState([0, 0, 0, 0]);

  const handleVote = (index) => {
    const newVotes = [...votes];
    newVotes[index] += 1;
    setVotes(newVotes);
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
        data: votes,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
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
    <div className="p-4 h-full">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="mb-4 md:mb-0">Perfume of the Week</div>
        <div className="w-full h-full md:w-1/2">
          <Bar data={data} options={options} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 md:grid-cols-4">
        {votes.map((vote, index) => (
          <div key={index} className="text-center">
            <p>{vote}</p>
            <button
              className="border-[]  text-black bg-transparent rounded-lg p-1  w-[80px] h-[32px] top-[2580px] left-[753px] radius-[10px]"
              onClick={() => handleVote(index)}
              aria-label={`Vote for Performance ${index + 1}`}
            >
              Vot{index + 1}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Poll;
