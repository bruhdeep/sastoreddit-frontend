import { Bar } from "react-chartjs-2";
const AdminDashboard = () => {
  return (
    <div>
      <Bar
        data={{
          labels: [
            "Sqli",
            "XSS",
            "XXE",
            "Open Redirect",
            "Broken Authentication",
          ],
          datasets: [
            {
              label: "# of vulnerabilities",
              data: [15, 12, 6, 7, 4],
              backgroundColor: ["red", "yellow", "blue", "black", "green"],
              borderColor: "orange",
              borderWidth: 5,
            },
          ],
        }}
        height={300}
        width={500}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
export default AdminDashboard;
