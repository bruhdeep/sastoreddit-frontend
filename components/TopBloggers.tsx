interface Blogger {
  userName: string;
  popularity: number;
}

const TopBloggers = ({ topBloggers }: { topBloggers: Blogger[] }) => (
  <div className="mt-10">
    <div className="grid grid-cols-2 gap-36">
      {/* Displaying the first five bloggers */}
      <div>
        {topBloggers.slice(0, 5).map((blogger, index) => (
          <div
            key={index}
            className="flex flex-row space-y-4 items-center w-full"
          >
            <p className="text-2xl font-semibold flex items-center px-2 mr-4">
              {index === 0 ? <span className="text-2xl">1</span> : index + 1}.
            </p>
            <ul className="space-y-2 w-full">
              <li
                className={`bg-gray-100 rounded-lg p-4 px-10 ${
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
);

export default TopBloggers;
