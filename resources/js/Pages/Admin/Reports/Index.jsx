import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";

export default function ReportManager({ flash }) {
    const { reports } = usePage().props;

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    const handleAction = (id, action) => {
        if (confirm(`Are you sure you want to ${action} this report?`)) {
            if (action === "resolve") {
                Inertia.put(route("admin.reports.handle", id));
            } else if (action === "delete") {
                Inertia.delete(route("admin.reports.destroy", id));
            }
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Report Management
                </h2>
            }
        >
            <Head title="Report Management" />
            <ToastContainer />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border p-2">Reporter</th>
                                    <th className="border p-2">Content</th>
                                    <th className="border p-2">Reason</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr key={report.id}>
                                        <td className="border p-2">{report.reporter.name}</td>
                                        <td className="border p-2">{report.content_type === "chirp" ? report.content.message : `User: ${report.content.name}`}</td>
                                        <td className="border p-2">{report.reason}</td>
                                        <td className="border p-2">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    report.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                                                }`}
                                            >
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="border p-2">
                                            {report.status === "pending" && (
                                                <Button onClick={() => handleAction(report.id, "resolve")} className="m-1 bg-green-500 text-white">
                                                    Resolve
                                                </Button>
                                            )}
                                            <Button onClick={() => handleAction(report.id, "delete")} className="m-1 bg-red-500 text-white">
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
