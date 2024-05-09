// import React, { useEffect, useState } from "react";

// const Top = () => {
//   const [topPosts, setTopPosts] = useState([]);
//   const [topBloggers, setTopBloggers] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState("");

//   useEffect(() => {
//     // Fetch top 10 blog posts of all time
//     fetchTopPosts();

//     // Fetch top 10 bloggers of all time
//     fetchTopBloggers();
//   }, []);

//   useEffect(() => {
//     if (selectedMonth) {
//       // Fetch top 10 blog posts of specific month
//       fetchTopPostsByMonth(selectedMonth);
//     }
//   }, [selectedMonth]);

//   const fetchTopPosts = () => {
//     // Replace the following line with your test data
//     const topPostsData: { id: string; title: string }[] = [
//       { id: "1", title: "Post 1" },
//       { id: "2", title: "Post 2" },
//       // Add more test data here
//     ];

//     setTopPosts(topPostsData);
//   };

//   const fetchTopBloggers = () => {
//     // Replace the following line with your test data
//     const topBloggersData = [
//       { id: "1", name: "Blogger 1" },
//       { id: "2", name: "Blogger 2" },
//       // Add more test data here
//     ];

//     setTopBloggers(topBloggersData);
//   };

//   const fetchTopPostsByMonth = (month: string) => {
//     // Replace the following line with your test data
//     const topPostsData: { id: string; title: string }[] = [
//       { id: "1", title: "Post 1" },
//       { id: "2", title: "Post 2" },
//       // Add more test data here
//     ];

//     setTopPosts(topPostsData);
//   };

//   return (
//     <div>
//       <h2>Top 10 Blog Posts</h2>
//       <ul>
//         {topPosts.map((post: { id: string; title: string }) => (
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>

//       <h2>Top 10 Bloggers</h2>
//       <ul>
//         {topBloggers.map((blogger: { id: string; name: string }) => (
//           <li key={blogger.id}>{blogger.name}</li>
//         ))}
//       </ul>

//       <h2>Select Month</h2>
//       <select
//         value={selectedMonth}
//         onChange={(e) => setSelectedMonth(e.target.value)}
//       >
//         <option value="">All Time</option>
//         <option value="January">January</option>
//         <option value="February">February</option>
//         {/* Add more month options here */}
//       </select>
//     </div>
//   );
// };

// export default Top;
