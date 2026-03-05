import { useUserStore } from "@/store/user.store";

const HomePage = () => {
  const { user, logout } = useUserStore();

  return (
    <div className="min-h-screen bg-[#dae0e6] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Welcome, {user?.firstName}!</h1>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:underline"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
