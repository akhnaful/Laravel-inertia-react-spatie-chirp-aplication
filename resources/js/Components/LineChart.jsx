import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Trend Aktivitas Komunitas',
      },
    },
  };

  const chartData = {
    labels: data?.labels,
    datasets: [
      {
        label: 'Pengguna Aktif',
        data: data?.activeUsers,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Total Chirps',
        data: data?.totalChirps,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Laporan Pelanggaran',
        data: data?.violationReports,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};
LineChart.defaultProps = {
    data: {
      labels: [],
      activeUsers: [],
      totalChirps: [],
      violationReports: []
    }
  };

export default LineChart;