import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import User from "../../../Models/User";

export default function UsersLayout() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState({
    userId: "",
    role: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm === "") {
      getUsers();
    } else {
      searchFilter();
    }
  }, [searchTerm]);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/v1/api/users/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        // console.log("all users...",response.data.users);
        setUsers(response.data.users);
      } else if (response.status === 204) {
        setUsers([]);
        toast.error("No properties found", {
          position: "bottom-right",
          duration: 3000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  const searchFilter = () => {
    const filteredUsers = users.filter((user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredUsers.length > 0) {
      // console.log(filteredUsers);
      setUsers(filteredUsers);
    } else {
      getUsers();
    }
  };
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users Dashboard</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-4">Users Tracker</h2>
          <input
            type="search"
            placeholder={`User Name ...`}
            className=" px-4 py-2 
                  border rounded-md 
                  w-full sm:w-60 md:w- lg:w-1/3 xl:w-1/4
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto mt-3">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Properties
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                {currentUser.role === "ROLE_ADMIN" ? (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                ) : (
                  <th></th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No Data
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.projects && user.projects.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.properties && user.properties.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.phone}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* <button className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Unapproved
                      </button> */}

                      <button 
                        onClick={()=> navigate(`/user/${user.id}`)}    
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
