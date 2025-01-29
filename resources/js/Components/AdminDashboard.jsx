import { router } from '@inertiajs/react'
import { useEffect, useState } from 'react'

const DashboardAdmin = ({ initialStats }) => {
  const [timeFilter, setTimeFilter] = useState('daily')
  const [stats, setStats] = useState(initialStats)

  router.get(
    '/admin/dashboard',
    { timeFilter },
    {
      preserveState: true,
      preserveScroll: true, // Ini mencegah refresh halaman penuh
      onSuccess: (res) => {
        if (JSON.stringify(stats) !== JSON.stringify(res.props.stats)) {
          setStats(res.props.stats)
        }
      }
    }
  )
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="rounded-lg border-gray-300"
          >
            <option value="daily">Harian</option>
            <option value="weekly">Mingguan</option>
            <option value="monthly">Bulanan</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Pengguna Aktif</h3>
            <p className="text-3xl font-bold mt-2">{stats?.activeUsers}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Chirps</h3>
            <p className="text-3xl font-bold mt-2">{stats?.totalChirps}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Laporan Pelanggaran</h3>
            <p className="text-3xl font-bold mt-2">{stats?.violationReports}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin