const data = {
  labels: ["2020", "2021", "2022", "2023", "2024"], // Years
  datasets: [
    {
      label: "Total Production (Metric Tons)", // Total food production
      data: [1000, 1300, 1600, 1900, 2100], // Simulated data over the years
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
    {
      label: "Subsistence Farming (Metric Tons)", // Subsistence farming contribution
      data: [400, 455, 480, 530, 525], // Refined data for more relevance to total production
      borderColor: "rgb(255, 99, 132)",
      tension: 0.1,
    },
    {
      label: "Commercial Farming (Metric Tons)", // Commercial farming contribution
      data: [600, 845, 1120, 1370, 1575], // Refined data to better reflect trends in production
      borderColor: "rgb(54, 162, 235)",
      tension: 0.1,
    },
  ],
};

export default data;
