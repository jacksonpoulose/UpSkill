// mockData.js

export const mockCategories = [
  {
    id: '1',
    name: 'Web Development',
    description: 'Learn modern web development technologies and frameworks',
    isActive: true,
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Data Science',
    description: 'Master data analysis, machine learning, and statistical methods',
    isActive: true,
    createdAt: '2024-01-20T00:00:00.000Z',
    updatedAt: '2024-01-20T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Mobile Development',
    description: 'Build native and cross-platform mobile applications',
    isActive: true,
    createdAt: '2024-01-25T00:00:00.000Z',
    updatedAt: '2024-01-25T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Cloud Computing',
    description: 'Learn cloud platforms, DevOps, and infrastructure management',
    isActive: false,
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-01T00:00:00.000Z'
  }
];

export const mockCourses = [
  {
    id: '1',
    title: 'Full Stack MERN Bootcamp',
    description: 'Complete MERN stack development course with hands-on projects',
    category: '1',
    durationWeeks: 20,
    mentorIds: ['mentor1', 'mentor2'],
    studentsEnrolled: ['student1', 'student2', 'student3'],
    startDate: '2024-03-01T00:00:00.000Z',
    endDate: '2024-07-19T00:00:00.000Z',
    courseFee: 4999,
    courseImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
    status: 'published',
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-20T00:00:00.000Z'
  },
  {
    id: '2',
    title: 'Advanced JavaScript Mastery',
    description: 'Deep dive into modern JavaScript features and best practices',
    category: '1',
    durationWeeks: 12,
    mentorIds: ['mentor3'],
    studentsEnrolled: ['student4', 'student5'],
    startDate: '2024-02-15T00:00:00.000Z',
    endDate: '2024-05-10T00:00:00.000Z',
    courseFee: 2999,
    courseImage: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
    status: 'published',
    createdAt: '2024-01-20T00:00:00.000Z',
    updatedAt: '2024-01-25T00:00:00.000Z'
  },
  {
    id: '3',
    title: 'Machine Learning Fundamentals',
    description: 'Introduction to machine learning algorithms and applications',
    category: '2',
    durationWeeks: 16,
    mentorIds: ['mentor4', 'mentor5'],
    studentsEnrolled: ['student6', 'student7', 'student8', 'student9'],
    startDate: '2024-04-01T00:00:00.000Z',
    endDate: '2024-07-26T00:00:00.000Z',
    courseFee: 5999,
    courseImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    status: 'published',
    createdAt: '2024-01-25T00:00:00.000Z',
    updatedAt: '2024-02-01T00:00:00.000Z'
  },
  {
    id: '4',
    title: 'React Native Mobile Development',
    description: 'Build cross-platform mobile apps with React Native',
    category: '3',
    durationWeeks: 10,
    mentorIds: ['mentor6'],
    studentsEnrolled: ['student10', 'student11'],
    startDate: '2024-03-15T00:00:00.000Z',
    endDate: '2024-05-24T00:00:00.000Z',
    courseFee: 3499,
    courseImage: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg',
    status: 'draft',
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-05T00:00:00.000Z'
  }
];

export const mockCourseWeeks = [
  {
    id: '1',
    course: '1',
    weekNumber: 1,
    title: 'Introduction to Web Development',
    objectives: [
      'Understand the fundamentals of web development',
      'Set up development environment',
      'Learn HTML5 semantic elements',
      'Introduction to CSS3 and responsive design'
    ],
    tasks: [
      {
        id: 'task1',
        title: 'Setup Development Environment',
        description: 'Install Node.js, VS Code, and essential extensions for web development',
        resources: [
          'https://nodejs.org/en/download/',
          'https://code.visualstudio.com/',
          'VS Code Extensions Guide'
        ],
        isMandatory: true
      },
      {
        id: 'task2',
        title: 'Build Your First Webpage',
        description: 'Create a personal portfolio landing page using HTML5 and CSS3',
        resources: [
          'HTML5 Documentation',
          'CSS3 Flexbox Guide',
          'Responsive Design Principles'
        ],
        isMandatory: true
      },
      {
        id: 'task3',
        title: 'Explore Web Development Tools',
        description: 'Familiarize yourself with browser developer tools and debugging techniques',
        resources: [
          'Chrome DevTools Guide',
          'Firefox Developer Tools',
          'Web Development Best Practices'
        ],
        isMandatory: false
      }
    ],
    reviewNotes: 'Focus on understanding the core concepts rather than memorizing syntax. Practice building simple layouts and experiment with different CSS properties.',
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-20T00:00:00.000Z'
  },
  {
    id: '2',
    course: '1',
    weekNumber: 2,
    title: 'JavaScript Fundamentals',
    objectives: [
      'Master JavaScript syntax and data types',
      'Understand functions and scope',
      'Learn DOM manipulation',
      'Introduction to ES6+ features'
    ],
    tasks: [
      {
        id: 'task4',
        title: 'JavaScript Basics Practice',
        description: 'Complete exercises on variables, functions, and control structures',
        resources: [
          'JavaScript MDN Documentation',
          'JavaScript Exercises Repository',
          'ES6 Features Guide'
        ],
        isMandatory: true
      },
      {
        id: 'task5',
        title: 'Interactive Web Page',
        description: 'Add interactivity to your portfolio using JavaScript and DOM manipulation',
        resources: [
          'DOM Manipulation Tutorial',
          'Event Handling Guide',
          'JavaScript Best Practices'
        ],
        isMandatory: true
      }
    ],
    reviewNotes: 'JavaScript is the foundation of modern web development. Take time to understand concepts like hoisting, closures, and the event loop.',
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-22T00:00:00.000Z'
  }
];
