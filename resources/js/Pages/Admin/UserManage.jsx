import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from "react";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Inertia } from '@inertiajs/inertia';
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css'
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

export default function UserManage({users, flash}) {

    // const { flash } = usePage().props;

    
        useEffect(() => {
            if (flash.message.success) {
            toast.success(flash.message.success);
            }
            if (flash.message.error) {
                toast.error(flash.message.error);
            }
        },[flash]);
    

    const [searchTerm, setSearchTerm] = useState("");
    // Filter users berdasarkan input pencarian
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRoleChange = (id, newRole) => {
    // Fitur merubah role user
        Inertia.put(route('usermanager.update', { id: id }), { role: newRole }, {
            // onSuccess: () => toast.success("User role updated successfully!"),
            // onError: () => toast.error("Failed to update role!"),
        });
    };

    const handleStatusChange = (id, currentStatus) => {
    // Fitur merubah status user
        Inertia.put(route('usermanager.update', { id: id }), { 
            status: currentStatus === 'active' ? 'banned' : 'active' 
        }, {
            // onSuccess: () => toast.success("User status updated successfully!"),
            // onError: () => toast.error("Failed to update status!"),
        });
    };

    const handleDelete = (id) => {
    // fitur delete user
        if (confirm("Are you sure you want to delete this user?")) {
            Inertia.delete(route('usermanager.destroy', id), {
                // onSuccess: () => toast.success("User deleted successfully!"),
                // onError: () => toast.error("Failed to delete user!"),
            });
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
        {/* <ToastContainer /> */}
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
                    <ToastContainer />
                    
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

                                                {/* fitur */}
                                            
                                                <select
                                                    value={user.role}
                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                    className="border rounded p-2 mr-2"
                                                >
                                                    <option value="user">User</option>
                                                    <option value="moderator">Moderator</option>
                                                    <option value="admin">Admin</option>
                                                </select>

                                                <Button onClick={() => handleStatusChange(user.id, user.status)} className="mr-2">
                                                    {user.status === 'active' ? "Deactivate" : "Activate"}
                                                </Button>

                                                <Button onClick={() => handleDelete(user.id)} variant="destructive" >Delete</Button>
                                            


                                                {/* fitur */}

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
