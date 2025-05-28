import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Users, Award } from 'lucide-react';
import Button from '../../components/common/Button';
import Card, { CardBody } from '../../components/common/Card';
import Navbar from '../../components/common/Navbar';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      setIsLoggedIn(true);
      setUsername(user.name);
    }
  }, []);

  return (
    <div className="bg-white">
      {/* Pre-header */}
      <div className="bg-red-900 text-white text-center py-2 text-sm">
        <p>Transform Your Career with Expert-Led Courses</p>
      </div>

      {/* Navbar */}
      <Navbar 
        isLoggedIn={isLoggedIn} 
        username={username} 
        onLogout={() => {
          localStorage.removeItem('user');
          setIsLoggedIn(false);
          setUsername('');
        }}
      />

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

      {/* Learning Categories */}
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
                <Button variant="red" size="lg" as={Link} to="/register">
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
    </div>
  );
};

export default Home;
