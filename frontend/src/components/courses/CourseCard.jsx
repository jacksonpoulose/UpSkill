import React from "react";
import { Link } from "react-router-dom";
import { Clock, Users, Star, BookOpen } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

const CourseCard = ({ course,onEnrollNow, onViewDetails }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card hover padding={false} className="h-full group overflow-hidden">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={
            course.courseImage
              ? `http://localhost:3000/uploads/courses/${course.courseImage}`
              : "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800"
          }
          alt={course.title}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 left-4">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {course.category.name}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {formatPrice(course.courseFee)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {course.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700">
                {course.rating.toFixed(1)}
              </span>
              {course.reviews && (
                <span className="text-sm text-gray-500">
                  ({course.reviews})
                </span>
              )}
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors leading-tight">
          {course.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {course.description}
        </p>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.durationWeeks} weeks</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.studentsEnrolled.length} students</span>
            </div>
          </div>
        </div>

        {course.mentorIds.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Instructors:</p>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {course.mentorIds.slice(0, 3).map((mentor, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-red-100 border-2 border-white flex items-center justify-center text-xs font-medium text-red-600 shadow-sm"
                    title={mentor.name}
                  >
                    {mentor.name.charAt(0).toUpperCase()}
                  </div>
                ))}
                {course.mentorIds.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600 shadow-sm">
                    +{course.mentorIds.length - 3}
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                {course.mentorIds
                  .slice(0, 2)
                  .map((m) => m.name)
                  .join(", ")}
                {course.mentorIds.length > 2 &&
                  ` +${course.mentorIds.length - 2} more`}
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="..."
            onClick={(e) => {
              e.stopPropagation(); // just in case
              onViewDetails();
            }}
          >
            View Details
          </Button>

          <Button
            variant="red"
            size="sm"
            onClick={(e) => {
              e.stopPropagation(); // prevent accidental card click if added later
              onEnrollNow();
            }}
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
