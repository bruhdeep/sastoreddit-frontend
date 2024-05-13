import { useEffect, useState } from "react";

import TopBloggers from "./TopBloggers";
import TopForums from "./TopForums";

interface Forum {
  name: string;
  description: string;
  popularity: number;
}

interface Blogger {
  userName: string;
  popularity: number;
}

export default function Top() {
  const [month, setMonth] = useState<number | null>(null);
  const [topForums, setTopForums] = useState<Forum[]>([]);
  const [topBloggers, setTopBloggers] = useState<Blogger[]>([]);
  const [activeTab, setActiveTab] = useState<"forums" | "bloggers">("forums");

  useEffect(() => {
    const fetchTopForums = async () => {
      let url = process.env.BASE_URL + "/admin/top-forums";
      if (month) {
        url += `?month=${month}`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "1",
        },
      });
      const data = await response.json();
      if (typeof data === "string") {
        console.log(data);
        setTopForums([]);
      } else {
        setTopForums(data);
      }
    };

    const fetchTopBloggers = async () => {
      let url = process.env.BASE_URL + "/admin/top-bloggers";
      if (month) {
        url += `?month=${month}`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "1",
        },
      });
      const data = await response.json();
      setTopBloggers(data);
    };

    fetchTopForums();
    fetchTopBloggers();
  }, [month]);

  const handleNumberChange = (selectedNumber: number) => {
    setMonth(selectedNumber);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mt-4 flex justify-between w-[70%]">
        <div className="flex space-x-4">
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
        <button
          className={`btn text-black ${
            activeTab === "bloggers" ? "bg-indigo-300" : "bg-white"
          } hover:bg-indigo-300`}
          onClick={() => setActiveTab("bloggers")}
        >
          Top Bloggers
        </button>
      </div>
      {activeTab === "forums" && <TopForums topForums={topForums} />}
      {activeTab === "bloggers" && <TopBloggers topBloggers={topBloggers} />}
    </div>
  );
}
