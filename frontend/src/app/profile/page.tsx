'use client';
import { useState, useEffect } from "react";
import { CiEdit, CiMenuBurger } from "react-icons/ci";
import SideBar from "../components/SideBar";
import { useUserById } from "../hooks/useUsersQueries";
import { useUsersMutations } from "../hooks/useUsersMutations";

export default function Profile() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    userName: "",
    email: "",
    address: "",
    provider: "",
    age: "",
    sex: "",
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) setUserId(storedId);
  }, []);

  const { user, loading, error: fetchError, refetch } = useUserById(userId || "");
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || "",
        userName: user.userName || "",
        email: user.email || "",
        address: user.address || "",
        provider: user.provider || "",
        age: user.age?.toString() || "",
        sex: user.sex || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => setIsEditing(false);
  const { updateUser } = useUsersMutations();
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await updateUser(formData);
      await refetch();
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (fetchError) return <p className="text-red-500">Error loading user.</p>;
//   if (fetchError) {
//   console.error("🚨 Full fetch error:", fetchError);
//   return <p className="text-red-500">
//     Error loading user: {fetchError.message}
//   </p>;
// }

  if (!user) return <p>No user data available.</p>;

  return (
    <div className="min-h-screen bg-black flex flex-row relative overflow-x-hidden">
      <button type="button" onClick={toggleSidebar} className="absolute top-4 left-4 z-50 text-green-400 hover:text-green-600 focus:outline-none">
        {isSidebarOpen ? null : <CiMenuBurger className="w-12 h-6" />}
      </button>
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      <div className={`flex-1 flex items-center justify-center transition-all duration-300  ${isSidebarOpen ? 'ml-64' : 'ml-16'} px-6 py-10`}>
        <div className={`relative border border-green-400 shadow-[0_0_20px_#00ff88] flex flex-col rounded-2xl p-10 items-center justify-center gap-6 w-[300px] md:w-[550px] transform hover:scale-[1.01] ${isEditing ? "bg-black text-green-300" : "bg-green-400 text-black"}`}>
          <div className="mb-4 flex items-center justify-between w-full">
            <h2 className={`text-3xl font-extrabold tracking-widest ${isEditing ? "text-green-400" : "text-black"}`}>
               Profile
           </h2>
            <button type="button" onClick={() => setIsEditing(!isEditing)}
               className={`transition-all ${
                      isEditing
                        ? "text-green-400 hover:text-green-600"
                        : "text-black hover:text-gray-800"
                    }`}
                  >
                    <CiEdit className="h-7 w-7"/>
                  </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleUpdate} className="w-full flex flex-col gap-5 mt-2 mb-4">
            {[
              { label : "UserName", key: "userName"},
              { label : "Email", key: "email"},
              { label : "Address", key: "address"},
              { label : "Age", key: "age"},
              { label : "Sex", key: "sex"},
            ].map((field) => (
              <div key={field.key} className="flex flex-col">
                <label className={`mb-1 ${isEditing ? "text-green-300" : "text-black font-semibold"}`}>
                  {field.label}
                </label>
                <input
                  name={field.key}
                  value={formData[field.key as keyof typeof formData] || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`border-b-2 focus:outline-none px-2 py-1 text-lg bg-transparent transition-all duration-300
                    ${
                      isEditing
                        ? "border-green-400 text-green-300 focus:border-green-300"
                        : "border-black text-black focus:border-gray-700"
                    }
                    ${!isEditing && "opacity-80"}
                  `}
                />
              </div>
            ))}
            {isEditing && (
               <div className="flex justify-center gap-4 mt-6">
                <button type="submit" className="border border-green-400 px-6 py-2 text-green-300 rounded-lg hover:bg-green-400 hover:text-black transition-all duration-300">
                  Save
                </button>
                <button type="button" onClick={handleCancel} className="border border-red-400 px-6 py-2 text-red-300 rounded-lg hover:bg-red-400 hover:text-black transition-all duration-300">
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
