import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/admin/Sidebar";
import Button from "../../components/common/Button";
import axiosInstance from "../../services/axiosInstance";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Mail,
  Users,
  Award,
  Clock,
  Briefcase,
  Linkedin
} from "lucide-react";
import ProgressBar from "../../components/common/ProgressBar";


const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  
const fetchMentors = async () => {
  try {
    setLoading(true);
    const res = await axiosInstance.get("/admin/mentors");
    setMentors(res.data.mentors || []);
  } catch (error) {
    console.error("Failed to fetch mentors:", error);
  } finally {
    setLoading(false);
  }
};

    fetchMentors();
  }, []);

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "green";
    if (rating >= 3.5) return "yellow";
    return "red";
  };

  const filteredMentors = mentors.filter((mentor) =>
    mentor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.expertiseAreas.some(area => 
      area.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mentors</h1>
            <p className="text-gray-600">Manage your platform mentors</p>
          </div>
          <Button
            onClick={() => navigate("/admin/mentors/add")}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Add Mentor</span>
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search mentors by name, email, or expertise..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading...</div>
          ) : filteredMentors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mentor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expertise
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMentors.map((mentor) => (
                    <tr key={mentor._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={
                              mentor.profilePicture ||
                              "https://images.pexels.com/photos/7516347/pexels-photo-7516347.jpeg"
                            }
                            alt={mentor.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {mentor.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {mentor.yearsOfExperience} years experience
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm text-gray-900 mb-1">
                            <Mail size={14} className="mr-1 text-gray-500" />
                            {mentor.email}
                          </div>
                          <div className="flex items-center text-sm text-blue-600">
                            <Linkedin size={14} className="mr-1" />
                            <a href={mentor.linkedinProfile} target="_blank" rel="noopener noreferrer">
                              LinkedIn Profile
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {mentor.expertiseAreas.map((area, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users size={16} className="mr-2 text-blue-500" />
                          <span>{mentor.assignedStudents?.length || 0} students</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-32">
                          <ProgressBar 
                            progress={(mentor.rating / 5) * 100} 
                            color={getRatingColor(mentor.rating)} 
                          />
                          <div className="text-sm text-gray-600 mt-1">
                            {mentor.rating.toFixed(1)} / 5.0
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <Link to={`/admin/mentors/edit/${mentor._id}`}>
                            <button className="text-gray-600 hover:text-blue-600 transition-colors" title="Edit mentor">
                              <Edit2 size={18} />
                            </button>
                          </Link>
                          <button className="text-gray-600 hover:text-red-600 transition-colors" title="Delete mentor">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">No mentors found.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Mentors;