import { UserProfile } from "./components/auth"
import Body from "./components/Body";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            TO-DO
          </h1>
          <UserProfile />
        </div>

        <Body />
      </div>
    </div>
  );
}
