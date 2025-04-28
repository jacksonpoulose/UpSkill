// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { logout } from "../../redux/userSlice"; // adjust the path if needed

// const Home = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user } = useSelector((state) => state.user);

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-[#F8F9FA] text-red-600 flex flex-col items-center">
//       {/* Top Navbar */}
//       <nav className="w-full h-[50px] px-6 flex justify-between items-center bg-amber-50 text-gray-800">
//         <div className="flex items-center space-x-4">
//           <FaInstagram className="text-gray-600 hover:text-red-500 cursor-pointer" size={20} />
//           <FaFacebookF className="text-gray-600 hover:text-blue-600 cursor-pointer" size={20} />
//           <div className="h-6 w-[1.5px] bg-gray-300"></div>
//           <div className="flex items-center space-x-2">
//             <FaPhoneAlt className="text-gray-600" size={18} />
//             <span className="text-gray-700 font-semibold">+91 98765 43210</span>
//           </div>
//         </div>

//         {!user && (
//           <Link to="/register">
//             <button className="px-4 py-1 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
//               Sign Up
//             </button>
//           </Link>
//         )}
//       </nav>

//       {/* Main Navbar */}
//       <nav className="w-full h-[60px] px-6 flex justify-between items-center bg-white text-gray-800">
//         <h1 className="text-2xl font-bold text-red-600">UpSkill</h1>

//         <div className="flex space-x-8 text-lg font-medium">
//           <a href="#" className="hover:text-red-600 transition">Home</a>
//           <a href="#" className="hover:text-red-600 transition">Courses</a>
//           <a href="#" className="hover:text-red-600 transition">About</a>
//           <a href="#" className="hover:text-red-600 transition">Contact</a>
//           <a href="#" className="hover:text-red-600 transition">Blog</a>
//         </div>

//         <div className="space-x-4">
//           {!user ? (
//             <>
//               <Link to="/login">
//                 <button className="px-4 py-2 bg-[#EE2C3C] text-white font-semibold rounded-lg hover:bg-red-700 transition">
//                   Login
//                 </button>
//               </Link>
//               <Link to="/mentor">
//                 <button className="px-4 py-2 bg-[#1C0C3F] text-white font-semibold rounded-lg">
//                   Become a Mentor
//                 </button>
//               </Link>
//             </>
//           ) : (
//             <>
//               <span className="font-semibold text-gray-700">Welcome, {user.name}</span>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-900 transition"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </nav>

//       {/* Banner Section */}
//       <div className="w-full mt-1 h-[500px] flex">
//         <div className="w-[60%] relative">
//           <img
//             src="https://t3.ftcdn.net/jpg/02/96/07/04/360_F_296070498_zxCQFWTAdhAZZE58T1N0iW4ey28Xfl3V.jpg"
//             alt="Banner"
//             className="w-full h-full object-cover shadow-lg"
//           />
//           <div className="absolute inset-0 bg-[#1C0C3F] bg-opacity-50 flex flex-col justify-center items-start p-10 rounded-l-lg">
//             <h1 className="text-5xl ms-5 font-extrabold text-white mb-6">
//               Guided Learning, <br /> <br /> Guaranteed Success!
//             </h1>
//             <button className="ms-10 px-6 py-3 bg-[#EE2C3C] text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-gray-200 transition">
//               Enroll Now
//             </button>
//           </div>
//         </div>

//         <div className="w-[40%]">
//           <img
//             src="https://t3.ftcdn.net/jpg/02/96/07/04/360_F_296070498_zxCQFWTAdhAZZE58T1N0iW4ey28Xfl3V.jpg"
//             alt="Banner"
//             className="w-full h-full object-cover shadow-lg"
//           />
//         </div>
//       </div>

//       {/* Card Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 px-4">
//         {/* Repeat Cards */}
//         {[
//           {
//             title: "Learn Anytime",
//             description: "Access quality courses anytime at your convenience.",
//             image: "https://media.istockphoto.com/id/1195647237/photo/time-to-learn-educational-clock-concept.jpg?s=612x612&w=0&k=20&c=n6Enj5hLz6aS2HpnoI_saAFA1jAJd_awYtnFm_u3nr0=",
//           },
//           {
//             title: "Expert Mentors",
//             description: "Learn from experienced mentors in the industry.",
//             image: "https://www.sincera.in/wp-content/uploads/2017/05/what-is-mentoring.jpg",
//           },
//           {
//             title: "Certifications",
//             description: "Get certified and boost your career opportunities.",
//             image: "https://source.unsplash.com/300x200/?certificate",
//           },
//           {
//             title: "Active Community",
//             description: "Be part of a supportive learning community.",
//             image: "https://source.unsplash.com/300x200/?community",
//           },
//         ].map((card, i) => (
//           <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img src={card.image} alt={card.title} className="w-full h-40 object-cover" />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-red-600">{card.title}</h3>
//               <p className="text-gray-600 text-sm">{card.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;


import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Users, Award, Menu, X } from 'lucide-react';
import Button from '../../components/common/Button';
import Card, { CardBody } from '../../components/common/Card';
import Logo from '../../components/common/Logo';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    {
      title: 'Web Development',
      description: 'Learn modern web development with HTML, CSS, JavaScript, and popular frameworks.',
      image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Data Science',
      description: 'Master data analysis, visualization, and machine learning techniques.',
      image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'AI & Machine Learning',
      description: 'Explore artificial intelligence and build intelligent systems.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Data Visualization',
      description: 'Learn to create compelling visual representations of complex data.',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  const benefits = [
    {
      icon: <BookOpen className="h-6 w-6 text-red-600" />,
      title: 'Comprehensive Curriculum',
      description: 'Structured, industry-relevant content with weekly materials and hands-on projects.',
    },
    {
      icon: <Users className="h-6 w-6 text-red-600" />,
      title: 'Expert Mentors',
      description: 'Learn from industry professionals who provide personalized guidance and feedback.',
    },
    {
      icon: <Award className="h-6 w-6 text-red-600" />,
      title: 'Recognized Certification',
      description: 'Earn certificates that showcase your skills and boost your professional profile.',
    },
  ];
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };


  return (
    <div className="bg-white">
      {/* Pre-header Banner */}
      <div className="bg-red-900 text-white text-center py-2 text-sm">
        <p>🎉 New courses added weekly! Enroll now and get 20% off your first course.</p>
      </div>

           {/* Main Header */}
           <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Logo size="large" />
              <h1 className="text-2xl font-bold text-gray-900">Upskill.com</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <p className="text-red-600 font-medium mr-6">
                Transform Your Career with Expert-Led Courses
              </p>
              <Button 
                variant="text" 
                size="md" 
                className="text-gray-700 hover:text-red-600"
                onClick={() => window.location.href = "/login"}
              >
                Login
              </Button>
              <Button 
                variant="outline" 
                size="md" 
                className="text-red-600 border-red-600 hover:bg-red-50"
                onClick={() => window.location.href = "/signup"}
              >
                Sign Up
              </Button>
              <Button 
                variant="red" 
                size="md" 
                className="bg-red-600 text-white hover:bg-primredary-700" 
                onClick={() => window.location.href = "/become-mentor"}
              >
                Become a Mentor
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-red-600 focus:outline-none"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 animate-fade-in-down">
              <Button 
                variant="text" 
                size="md" 
                className="w-full text-left text-gray-700 hover:text-red-600 py-2"
                onClick={() => window.location.href = "/login"}
              >
                Login
              </Button>
              <Button 
                variant="outline" 
                size="md" 
                className="w-full text-left text-red-600 border-red-600 hover:bg-red-50 py-2"
                onClick={() => window.location.href = "/signup"}
              >
                Sign Up
              </Button>
              <Button 
                variant="red" 
                size="md" 
                className="w-full text-left bg-red-900 text-white hover:bg-red-900 py-2" 
                onClick={() => window.location.href = "/become-mentor"}
              >
                Become a Mentor
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 to-red-700 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent)]"></div>
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Master In-Demand Skills with Expert Guidance
              </h1>
              <p className="text-xl text-red-100 max-w-lg">
                Join Upskill.com to access premium courses taught by industry experts and build your career in tech.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-red-700"
                  as={Link}
                  to="/courses"
                >
                  Explore Courses
                </Button>
                <Button
                  variant="red"
                  size="lg"
                  className="bg-white text-red-700 hover:bg-gray-100"
                  as={Link}
                  to="/register"
                  rightIcon={<ChevronRight size={18} />}
                >
                  Get Started
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-red-700 bg-red-300"></div>
                  ))}
                </div>
                <p className="text-sm">
                  <span className="font-bold">2,000+</span> students learning today
                </p>
              </div>
            </div>
            <div className="relative h-96 animate-slide-up">
              <div className="absolute top-0 right-0 w-72 h-72 bg-red-500 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-400 rounded-full blur-3xl opacity-30"></div>
              <img
                src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Student learning online"
                className="rounded-lg shadow-xl h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-3 translate-y-8"></div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Learning Paths</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our specialized learning tracks designed to build your skills from beginner to advanced levels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Card key={index} hover className="h-full transform transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardBody>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Link
                    to={`/courses?category=${category.title}`}
                    className="flex items-center text-red-600 font-medium hover:text-red-700"
                  >
                    View Courses
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Upskill.com?</h2>
              <div className="space-y-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        {benefit.icon}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Button
                  variant="red"
                  size="lg"
                  as={Link}
                  to="/register"
                >
                  Start Learning Today
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-red-200 rounded-full z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-red-200 rounded-full z-0"></div>
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Students collaborating"
                className="rounded-lg shadow-xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Hear from our graduates who have transformed their careers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex Johnson',
                role: 'Software Developer',
                image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                testimonial: 'The Web Development course provided me with the skills and confidence to land my dream job. The weekly structure made it easy to balance with my full-time work.',
              },
              {
                name: 'Sarah Chen',
                role: 'Data Analyst',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                testimonial: 'I transitioned from marketing to data science after completing the Data Science track. The mentorship was invaluable in helping me navigate this career change.',
              },
              {
                name: 'Michael Rodriguez',
                role: 'ML Engineer',
                image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                testimonial: 'The AI & Machine Learning course was challenging yet rewarding. The hands-on projects prepared me for real-world scenarios I now face in my job every day.',
              },
            ].map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardBody>
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">{testimonial.testimonial}</p>
                  <div className="mt-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star} 
                        className="w-5 h-5 text-yellow-500" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034..."
                        />
                      </svg>
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
