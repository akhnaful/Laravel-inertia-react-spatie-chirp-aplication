import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import DOMPurify from 'dompurify';
import { Inertia } from '@inertiajs/inertia';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

export default function ChirpManager() {
    const { chirps } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this chirp?')) {
            Inertia.delete(route('admin.chirps.destroy', id));
        }
    };


    const handleReview = (id) => {
        console.log(`Reviewing chirp ID: ${id}`);
        Inertia.put(route('admin.chirps.review', id), {}, {
            onSuccess: () => {
                toast.success('Chirp marked as reviewed successfully.');
            },
            onError: (error) => {
                if (error.status === 409) {
                    toast.error('Chirp is already reviewed.');
                } else {
                    toast.error('Failed to mark chirp as reviewed.');
                }
            }
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Chirp Management
                </h2>
            }
        >
            <Head title=" Chirp Management" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div>
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="border p-2">User</th>
                                        <th className="border p-2">Chirp</th>
                                        <th className="border p-2">Date</th>
                                        <th className="border p-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chirps.map((chirp) => (
                                        <tr key={chirp.id}>
                                            <td className="border p-2">{chirp.user.name}</td>
                                            <td className="border p-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(chirp.message) }} />
                                            <td className="border p-2">{new Date(chirp.created_at).toLocaleDateString()}</td>
                                            <td className="border p-2">
                                                {chirp.is_reviewed ? (
                                                    <span className="text-green-500">Reviewed</span>
                                                ) : (
                                                    <span className="text-red-500">Pending</span>
                                                )}
                                            </td>
                                            <td className="border p-2">
                                                <Button onClick={() => handleDelete(chirp.id)} className="m-1 bg-red-500 text-white">Delete</Button>
                                                <Button onClick={() => handleReview(chirp.id)} className="m-1 bg-green-500 text-white">Mark Reviewed</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
