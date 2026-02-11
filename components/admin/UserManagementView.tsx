
import React from 'react';
import { usePos } from '../../context/usePos';
import { Role } from '../../types';

const UserManagementView: React.FC = () => {
    const { users } = usePos();

    return (
        <div>
            <h2 className="text-3xl font-bold text-slate-100 mb-6">User Management</h2>
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="p-3 text-slate-400 font-semibold">Name</th>
                                <th className="p-3 text-slate-400 font-semibold">Role</th>
                                <th className="p-3 text-slate-400 font-semibold">PIN</th>
                                <th className="p-3 text-slate-400 font-semibold">Status</th>
                                <th className="p-3 text-slate-400 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b border-slate-700">
                                    <td className="p-3 font-medium">{user.name}</td>
                                    <td className="p-3">{user.role}</td>
                                    <td className="p-3 font-mono">****</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            user.isActive ? 'bg-green-500 text-green-900' : 'bg-red-500 text-red-900'
                                        }`}>
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        {user.role !== Role.Admin && (
                                            <div className="flex gap-2">
                                                <button className="text-blue-400 hover:text-blue-300">Edit</button>
                                                <button className="text-red-400 hover:text-red-300">
                                                    {user.isActive ? 'Deactivate' : 'Activate'}
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <div className="mt-6">
                    <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-4 rounded-lg">
                        Add New User
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserManagementView;
