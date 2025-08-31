import { UserProfile } from "./components/auth"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            To-Do App
          </h1>
          <UserProfile />
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-8">
            Sign in with Google to start managing your todos!
          </p>
        </div> 
      </div>
    </div>
  );
}
