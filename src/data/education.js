export const education = [
  {
    id: 'gatech',
    title: 'Georgia Tech',
    degree: 'MS Analytics (OMSA)',
    status: 'In Progress',
    date: 'Starting January 2025',
    icon: '🐝',
    color: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    description: 'Online Master of Science in Analytics with focus on ML/AI applications',
    courses: [
      {
        id: 'isye6501',
        code: 'ISYE 6501',
        name: 'Introduction to Analytics Modeling',
        status: 'In Progress',
        semester: 'Spring 2025',
        description: 'Overview of analytics modeling techniques and applications',
        topics: ['Regression', 'Classification', 'Clustering', 'Optimization'],
        takeaways: 'Foundation for ML applications in data engineering'
      },
      {
        id: 'cse6040',
        code: 'CSE 6040',
        name: 'Computing for Data Analysis',
        status: 'In Progress',
        semester: 'Spring 2025',
        description: 'Python programming for data manipulation and analysis',
        topics: ['NumPy', 'Pandas', 'SQL', 'Performance Optimization'],
        takeaways: 'Advanced Python techniques for large-scale data processing'
      }
    ]
  },
  {
    id: 'uiuc',
    title: 'University of Illinois',
    degree: 'BS Industrial/Organizational Psychology',
    status: 'Completed',
    date: 'May 2019',
    icon: '🎓',
    color: 'bg-orange-50',
    iconColor: 'text-orange-600',
    description: 'Bachelor of Science with minors in Business and Statistics',
    courses: []
  },
  {
    id: 'selfstudy',
    title: 'Self-Study',
    degree: 'Continuous Learning',
    status: 'Ongoing',
    date: '2024 - Present',
    icon: '📚',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
    description: 'Structured self-learning through online courses and certifications',
    courses: [
      {
        id: 'cs50',
        code: 'CS50',
        name: 'Harvard Introduction to Computer Science',
        status: 'Completed',
        semester: '2024',
        description: 'Comprehensive introduction to computer science and programming',
        topics: ['C', 'Python', 'SQL', 'Flask', 'JavaScript', 'Data Structures', 'Algorithms'],
        takeaways: 'Built Hanzismith as final project, gained strong CS fundamentals'
      }
    ]
  }
];