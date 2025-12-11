import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Users, Target, Award, BookOpen } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 to-red-700 text-white py-24">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent)]"></div>
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Upskill.com</h1>
          <p className="text-lg md:text-xl text-red-100">
            Empowering learners with high-quality education, practical skills, and expert mentorship to thrive in the tech-driven world.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              At Upskill.com, our mission is to break down barriers to high-quality education by providing accessible, industry-relevant courses designed for learners at all levels. We aim to empower individuals to achieve their career goals through expert-led learning paths and hands-on projects.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              We envision a world where everyone has the opportunity to learn, grow, and succeed—regardless of their background. Our goal is to bridge the gap between education and real-world skills to create future-ready professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            The foundation of our learning platform is built on values that put students first.
          </p>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 bg-gray-50 rounded-xl shadow hover:-translate-y-2 transition-all">
            <div className="h-14 w-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Education</h3>
            <p className="text-gray-600">We provide structured, practical, and industry-aligned content.</p>
          </div>

          <div className="p-8 bg-gray-50 rounded-xl shadow hover:-translate-y-2 transition-all">
            <div className="h-14 w-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community First</h3>
            <p className="text-gray-600">We uplift learners through collaboration, support, and mentorship.</p>
          </div>

          <div className="p-8 bg-gray-50 rounded-xl shadow hover:-translate-y-2 transition-all">
            <div className="h-14 w-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="text-gray-600">We commit to delivering top-tier learning experiences for all.</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-red-200 rounded-full z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-red-200 rounded-full z-0"></div>
            <img
              src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Team working together"
              className="rounded-lg shadow-xl relative z-10"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Upskill.com started with a simple idea — to make high-quality tech education accessible to everyone. We noticed the gap between traditional learning and the rapidly evolving tech industry, and we set out to bridge it.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Today, we offer a wide range of courses across web development, AI, data science, visualization, and more. Our focus on practical, mentor-driven learning has helped thousands of learners grow into confident professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );    
};

export default AboutUs;
