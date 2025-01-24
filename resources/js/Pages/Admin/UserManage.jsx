import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Inertia } from '@inertiajs/inertia';
import { AlertCircle, Settings, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function UserManage({users}) {

    const [searchTerm, setSearchTerm] = useState("");

    // Filter users berdasarkan input pencarian
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (userId) => {
        if (confirm("Are you sure you want to delete this user?")) {
            destroy(route("dashboard.admin.users.destroy", userId));
        }
    };

    return (
        
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    User Manager
                </h2>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <Input 
                            placeholder="Search users..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mb-3 max-w-sm overflow-hidden bg-white shadow-sm sm:rounded-lg"
                        />
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <Head title="UserManage" />

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Chirps Count</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <TableRow key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.chirps_count}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell>{user.status}</TableCell>
                                            <TableCell className="m-2">
                                                <Button variant="destructive" onClick={() => handleDelete(user.id)} className="mr-2">
                                                    Delete
                                                </Button>
                                                <Button variant="secondary" onClick={() => handleStatusChange(user.id)}>
                                                    Deactivate
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell >
                                                No users found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
