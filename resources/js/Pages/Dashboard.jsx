import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link, usePage } from '@inertiajs/react';
import DashboardAdmin from '@/Components/AdminDashboard'

export default function Dashboard({ auth, stats }) {
    const { user } = auth;
    // const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {user?.roles?.includes("user") && (
                            <div className="p-6 text-gray-900">
                            You're logged in!
                            </div>
                        )}
                        {user?.roles?.includes("admin") && (
                            <DashboardAdmin initialStats={stats} />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
