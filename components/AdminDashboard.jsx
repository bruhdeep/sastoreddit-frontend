// Import useEffect and useState hooks from React
import { useEffect, useState } from "react";

export default function Dashboard() {
  // Create a state variable to hold the data
  const [data, setData] = useState(null);

  // Use the useEffect hook to fetch the data when the component mounts
  useEffect(() => {
    fetch("https://localhost:7178/admin/dashboard")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []); // The empty array means this effect runs once when the component mounts

  // Render the data
  return (
    <div>
      {data ? (
        <div>
          <p className="text-black">Total Forums: {data.totalForums}</p>
          <p>Total Comments: {data.totalComments}</p>
          <p>Total Upvotes: {data.totalUpvotes}</p>
          <p>Total Downvotes: {data.totalDownvotes}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
