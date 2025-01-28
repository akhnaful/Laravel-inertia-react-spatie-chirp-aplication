import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ report }) {
    return (
        <AuthenticatedLayout>
            <Head title={`Report #${report.id}`} />

            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                {/* Tombol Kembali */}
                <Link
                    href={route('admin.reports.index')}
                    className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
                >
                    &larr; Back to Reports
                </Link>

                {/* Judul Halaman */}
                <h1 className="text-2xl font-bold mb-6">Report Details</h1>

                {/* Informasi Laporan */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Report ID</label>
                        <p className="mt-1 text-sm text-gray-900">{report.id}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Reporter</label>
                        <p className="mt-1 text-sm text-gray-900">
                            {report.reporter.name} ({report.reporter.email})
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Reported {report.reportable_type}</label>
                        <p className="mt-1 text-sm text-gray-900">
                            {report.reportable_type === 'App\\Models\\Chirp' ? (
                                <span>Chirp: "{report.reportable.content}"</span>
                            ) : (
                                <span>User: {report.reportable.name} ({report.reportable.email})</span>
                            )}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Reason</label>
                        <p className="mt-1 text-sm text-gray-900">{report.reason}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <p className="mt-1 text-sm text-gray-900 capitalize">{report.status}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Reported At</label>
                        <p className="mt-1 text-sm text-gray-900">
                            {new Date(report.created_at).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Tombol Resolve (Hanya untuk Admin) */}
                {report.status === 'pending' && (
                    <div className="mt-6">
                        <Link
                            href={route('admin.reports.resolve', report.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                            Resolve Report
                        </Link>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}