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
  const [vote1, setVote1] = useState(0);
  const [vote2, setVote2] = useState(0);
  const [vote3, setVote3] = useState(0);
  const [vote4, setVote4] = useState(0);

  const handleVote1 = () => setVote1(vote1 + 1);
  const handleVote2 = () => setVote2(vote2 + 1);
  const handleVote3 = () => setVote3(vote3 + 1);
  const handleVote4 = () => setVote4(vote4 + 1);

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
        data: [vote1, vote2, vote3, vote4],
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
    <div>
      <div className="flex">
        <div>
          <p>{vote1}</p>
          <button
            className="bg-black rounded-lg p-4 text-white"
            onClick={handleVote1}
          >
            Vote for Performance 1
          </button>
        </div>

        <div>
          <p>{vote2}</p>
          <button
            className="bg-[#471c1c] rounded-lg p-4 text-white"
            onClick={handleVote2}
          >
            Vote for Performance 2
          </button>
        </div>

        <div>
          <p>{vote3}</p>
          <button
            className="bg-[#207524] rounded-lg p-4 text-white"
            onClick={handleVote3}
          >
            Vote for Performance 3
          </button>
        </div>

        <div>
          <p>{vote4}</p>
          <button
            className="bg-[#5c2323] rounded-lg p-4 text-white"
            onClick={handleVote4}
          >
            Vote for Performance 4
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <div>Perfume of the Week</div>
        <div className="w-[40%] justify-end">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Poll;
