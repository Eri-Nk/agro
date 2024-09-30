import { Line } from "react-chartjs-2";
// Import necessary components from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  Tooltip,
} from "chart.js";

// Register the components you plan to use
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  Tooltip
);
const LineChart = ({ data }) => {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ height: "350px" }}>
      <div className="custom-legend">
        {data.datasets.map((dataset, index) => (
          <div key={index} className="legend-item">
            <span
              className="legend-color-box"
              style={{ backgroundColor: dataset.borderColor }}
            ></span>
            <span className="legend-label">{dataset.label}</span>
          </div>
        ))}
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
