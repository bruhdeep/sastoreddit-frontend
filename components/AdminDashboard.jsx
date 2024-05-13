import React, { useEffect, useState } from "react";

import {
  Chart,
  BarController,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";

Chart.register(BarController, LinearScale, CategoryScale, BarElement, Tooltip);

// ... rest of your code ...

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month

  const fetchDashboardData = () => {
    let url = "https://localhost:7178/admin/dashboard";
    if (month) {
      url += `?month=${month}`;
    }
    fetch(url)
      .then((response) => response.text()) // Use .text() instead of .json()
      .then((data) => {
        try {
          // Try to parse the data as JSON
          setData(JSON.parse(data));
        } catch {
          // If it's not JSON, set it as a string
          setData(data);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(fetchDashboardData, [month]); // Refetch when month changes

  const handleMonthChange = (selectedMonth) => {
    setMonth(selectedMonth);
  };

  const chartData = {
    labels: ["Forums", "Comments", "Upvotes", "Downvotes"],
    datasets: [
      {
        label: "Count",
        data: data
          ? [
              data.totalForums,
              data.totalComments,
              data.totalUpvotes,
              data.totalDownvotes,
            ]
          : [0, 0, 0, 0],
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

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full px-5">
        <button
          onClick={() => handleMonthChange(null)}
          className={`font-bold py-2 px-4 rounded-t ${
            month === null
              ? "bg-indigo-300 text-white"
              : "hover:bg-blue-200 text-black"
          }`}
        >
          All Time
        </button>
        {/* Generate options for all 12 months */}
        {Array.from({ length: 12 }, (_, i) => i + 1).map((monthNumber) => (
          <button
            key={monthNumber}
            onClick={() => handleMonthChange(monthNumber)}
            className={`font-bold py-2 px-4 rounded-t ${
              monthNumber === month
                ? "bg-indigo-300 text-white"
                : "hover:bg-blue-200 text-black"
            }`}
          >
            {monthNumber}
          </button>
        ))}
      </div>
      {data ? (
        typeof data === "string" ? (
          <p className="text-center py-10">{data}</p>
        ) : (
          <div className="border border-indigo-300 w-[97%] h-[70vh]">
            <Bar
              data={chartData}
              options={{
                plugins: {
                  tooltip: {
                    enabled: true,
                    callbacks: {
                      label: function (context) {
                        var label = context.dataset.label || "";

                        if (label) {
                          label += ": ";
                        }
                        if (context.parsed.y !== null) {
                          label += new Intl.NumberFormat("en-US").format(
                            context.parsed.y
                          );
                        }
                        return label;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        )
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}
