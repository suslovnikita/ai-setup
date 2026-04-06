"use client";

import { useAuth } from "@/components/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome, {user?.email}</p>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
