import { useEffect, useState } from "react";

interface Blogger {
  userName: string;
  popularity: number;
}

export default function Top() {
  const [month, setMonth] = useState<number | null>(null);
  const [topBloggers, setTopBloggers] = useState<Blogger[]>([]);

  useEffect(() => {
    const fetchTopBloggers = async () => {
      let url = "https://localhost:7178/admin/top-bloggers";
      if (month) {
        url += `?month=${month}`;
      }
      const response = await fetch(url);
      try {
        const data = await response.json();
        setTopBloggers(data);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        setTopBloggers([]);
      }
    };

    fetchTopBloggers();
  }, [month]);

  const handleNumberChange = (selectedNumber: number | null) => {
    setMonth(selectedNumber);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mt-4 flex justify-center w-[70%]">
        <div className="flex space-x-6">
          <button
            className={`btn text-black ${
              month === null ? "bg-indigo-300" : "bg-white"
            } hover:bg-indigo-300`}
            onClick={() => handleNumberChange(null)}
          >
            All Time
          </button>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              className={`btn text-black ${
                month === number ? "bg-indigo-300" : "bg-white"
              } hover:bg-indigo-300`}
              onClick={() => handleNumberChange(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
      {topBloggers.length === 0 ? (
        <div className="mt-10">
          <p>No activity this month.</p>
        </div>
      ) : (
        <div className="mt-10">
          <div className="grid grid-cols-2 gap-36">
            {/* Displaying the top bloggers */}
            <div>
              {topBloggers.map((blogger, index) => (
                <div
                  key={index}
                  className="flex flex-row space-y-4 items-center w-full"
                >
                  <p className="text-2xl font-semibold flex items-center px-2 mr-4">
                    {index === 0 ? (
                      <span className="text-2xl">1</span>
                    ) : (
                      index + 1
                    )}
                    .
                  </p>
                  <ul className="space-y-2 w-full">
                    <li
                      className={`bg-gray-100 rounded-lg p-4 ${
                        index === 0 ? "shadow-glow" : ""
                      }`}
                    >
                      <p className="font-bold text-lg">
                        {blogger.userName.toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Popularity: {blogger.popularity}
                      </p>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
