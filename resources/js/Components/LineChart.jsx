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
    labels: data?.labels || ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    datasets: [
      {
        label: 'Pengguna Aktif',
        data: data?.activeUsers || [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#FF6384',
        fill: false
      },
      {
        label: 'Total Chirps',
        data: data?.totalChirps || [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#36A2EB',
        fill: false
      },
      {
        label: 'Laporan',
        data: data?.violationReports || [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#4BC0C0',
        fill: false
      }
    ]
  };

  return (
    <div className="h-96">
      <Line 
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false
        }}
      />
    </div>
  );
};

export default LineChart;