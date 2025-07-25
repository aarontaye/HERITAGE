import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { 
  ArrowLeft, 
  BookOpen, 
  Play, 
  Clock, 
  Users, 
  Award,
  CheckCircle,
  XCircle,
  RotateCcw,
  Star,
  Languages,
  Globe,
  Brain,
  Lock,
  Check,
  ChevronRight
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: 'language' | 'history' | 'culture';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  imageUrl: string;
  progress?: number;
}

interface CourseLevel {
  id: number;
  title: string;
  description: string;
  content: string;
  duration: string;
  completed: boolean;
}

interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface LearningPortalProps {
  onBack: () => void;
}

const LearningPortal: React.FC<LearningPortalProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { addQuizResult } = useUser();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [courseLevels, setCourseLevels] = useState<CourseLevel[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | null>(null);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const courses: Course[] = [
    {
      id: '1',
      title: 'Amharic for Beginners',
      description: 'Learn the basics of Ethiopia\'s official language with interactive lessons',
      category: 'language',
      level: 'beginner',
      duration: '4 weeks',
      lessons: 20,
      students: 1247,
      rating: 4.8,
      imageUrl: 'https://m.media-amazon.com/images/I/51F0igx13FL._SL10_UR1600,800_CR200,50,1200,630_CLa%7C1200,630%7C51F0igx13FL.jpg%7C0,0,1200,630+82,82,465,465_PJAdblSocialShare-Gradientoverlay-largeasin-0to70,TopLeft,0,0_PJAdblSocialShare-AudibleLogo-Large,TopLeft,600,270_OU01_ZBLISTENING%20ON,617,216,52,500,AudibleSansMd,30,255,255,255.jpg',
      progress: 35
    },
    {
      id: '2',
      title: 'Ancient Ethiopian History',
      description: 'Explore 3000 years of Ethiopian civilization from Axum to modern times',
      category: 'history',
      level: 'intermediate',
      duration: '6 weeks',
      lessons: 30,
      students: 892,
      rating: 4.9,
      imageUrl: 'https://media.istockphoto.com/id/1128000925/photo/azwa-mariam-monastery.jpg?b=1&s=612x612&w=0&k=20&c=VG4Z1SXUfRx93FrU_iAtPNs1QUeH28w68MxTs2Hg5HU='
    },
    {
      id: '3',
      title: 'Ethiopian Coffee Culture',
      description: 'Discover the rich traditions and ceremonies surrounding Ethiopian coffee',
      category: 'culture',
      level: 'beginner',
      duration: '2 weeks',
      lessons: 12,
      students: 2156,
      rating: 4.7,
      imageUrl: 'https://media.istockphoto.com/id/601363406/photo/african-woman-holding-basket-full-of-coffee-cherries-east-africa.jpg?b=1&s=612x612&w=0&k=20&c=Z8_CdiWLfdqgEa8ooT7wDZJC30QTeS1rh77Fs31EaIY='
    },
    {
      id: '4',
      title: 'Traditional Music & Dance',
      description: 'Learn about Ethiopia\'s diverse musical traditions and cultural dances',
      category: 'culture',
      level: 'beginner',
      duration: '3 weeks',
      lessons: 15,
      students: 743,
      rating: 4.6,
      imageUrl: 'https://media.istockphoto.com/id/1045923086/photo/feet-of-hamer-ladies-dancing-omo-valley-in-ethiopia.jpg?b=1&s=612x612&w=0&k=20&c=0yg1cm_7oWD_MMuZO43vmTsO88Wz4h-5T2YLlrmI7js='
    },
    {
      id: '5',
      title: 'Ethiopian Orthodox Christianity',
      description: 'Understanding the unique traditions and practices of Ethiopian Christianity',
      category: 'history',
      level: 'intermediate',
      duration: '5 weeks',
      lessons: 25,
      students: 567,
      rating: 4.8,
      imageUrl: 'https://images.pexels.com/photos/20865976/pexels-photo-20865976.jpeg'
    },
    {
      id: '6',
      title: 'Ge\'ez Script Reading',
      description: 'Learn to read the ancient Ge\'ez script used in Ethiopian manuscripts',
      category: 'language',
      level: 'advanced',
      duration: '8 weeks',
      lessons: 40,
      students: 234,
      rating: 4.9,
      imageUrl: 'https://media.istockphoto.com/id/591847376/photo/geez-script.jpg?b=1&s=612x612&w=0&k=20&c=-2sP1tJ14motWa-rg8FcqSZNX5GYkmDcR3oHVEQND0U='
    }
  ];

  const quizzes: Quiz[] = [
    {
      id: '1',
      question: 'What is the capital city of Ethiopia?',
      options: ['Addis Ababa', 'Lalibela', 'Axum', 'Gondar'],
      correctAnswer: 0,
      explanation: 'Addis Ababa, meaning "new flower" in Amharic, has been Ethiopia\'s capital since 1886.'
    },
    {
      id: '2',
      question: 'Which ancient kingdom is considered the birthplace of Ethiopian civilization?',
      options: ['Zagwe', 'Solomonic', 'Axum', 'Shewa'],
      correctAnswer: 2,
      explanation: 'The Kingdom of Axum (1st-8th century AD) was a major trading empire and is considered the foundation of Ethiopian civilization.'
    },
    {
      id: '3',
      question: 'What is the traditional Ethiopian coffee ceremony called?',
      options: ['Buna', 'Tej', 'Injera', 'Berbere'],
      correctAnswer: 0,
      explanation: 'Buna is the traditional Ethiopian coffee ceremony, an important social and cultural ritual.'
    },
    {
      id: '4',
      question: 'Which script is used for writing Amharic?',
      options: ['Latin', 'Arabic', 'Ge\'ez', 'Cyrillic'],
      correctAnswer: 2,
      explanation: 'Amharic uses the Ge\'ez script (Fidel), an ancient writing system with over 200 characters.'
    },
    {
      id: '5',
      question: 'The Rock-Hewn Churches of Lalibela were built in which century?',
      options: ['10th Century', '12th Century', '14th Century', '16th Century'],
      correctAnswer: 1,
      explanation: 'The churches were carved in the 12th century during the reign of King Lalibela.'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const generateCourseLevels = (courseId: string): CourseLevel[] => {
    const levelTemplates = {
      '1': [ // Amharic for Beginners
        { title: 'Introduction to Amharic', description: 'Learn the basics of Ethiopian language', content: 'Welcome to Amharic! Amharic is the official language of Ethiopia, spoken by over 25 million people. In this level, you\'ll learn about the history of the language, its importance in Ethiopian culture, and basic pronunciation rules.' },
        { title: 'Ge\'ez Script Basics', description: 'Understanding the writing system', content: 'The Amharic language uses the Ge\'ez script, also known as Fidel. This ancient writing system has over 200 characters. We\'ll start with the basic consonants and vowel modifications.' },
        { title: 'Common Greetings', description: 'Essential phrases for daily interaction', content: 'Learn essential greetings: Selam (Hello), Dehna neh? (How are you?), Ameseginalehu (Thank you), and other common phrases used in daily Ethiopian conversations.' },
        { title: 'Numbers and Time', description: 'Counting and telling time in Amharic', content: 'Master numbers 1-100 in Amharic and learn how to tell time. Understanding the Ethiopian calendar system and time expressions will help you navigate daily conversations.' },
        { title: 'Family and Relationships', description: 'Vocabulary for family members and social connections', content: 'Learn words for family members, relationships, and social connections. This vocabulary is essential for describing your family and understanding Ethiopian social structures.' }
      ],
      '2': [ // Ancient Ethiopian History
        { title: 'Origins of Ethiopian Civilization', description: 'The dawn of human civilization in Ethiopia', content: 'Ethiopia is often called the cradle of humanity. Archaeological evidence shows that early humans lived in Ethiopia over 3 million years ago. Learn about Lucy (Dinkinesh) and other important archaeological discoveries.' },
        { title: 'The Kingdom of Axum', description: 'Ethiopia\'s first great empire', content: 'The Axumite Kingdom (1st-8th century AD) was one of the great civilizations of the ancient world. It controlled important trade routes and was among the first nations to adopt Christianity.' },
        { title: 'Medieval Period and Zagwe Dynasty', description: 'The builders of Lalibela', content: 'The Zagwe Dynasty (12th-13th centuries) created the magnificent rock-hewn churches of Lalibela. Learn about King Lalibela and the religious significance of these architectural marvels.' },
        { title: 'The Solomonic Dynasty', description: 'Claiming descent from King Solomon', content: 'The Solomonic Dynasty claimed descent from King Solomon and the Queen of Sheba. This period saw the expansion of Ethiopian territory and the development of unique cultural traditions.' },
        { title: 'Modern Ethiopia', description: 'From empire to modern nation', content: 'Learn about Ethiopia\'s resistance to colonialism, the reign of Emperor Haile Selassie, the Derg period, and the formation of modern Ethiopia as a federal democratic republic.' }
      ],
      '3': [ // Ethiopian Coffee Culture
        { title: 'The Legend of Coffee Discovery', description: 'How coffee was discovered in Ethiopia', content: 'According to legend, a goat herder named Kaldi discovered coffee when he noticed his goats becoming energetic after eating certain berries. Ethiopia is considered the birthplace of coffee.' },
        { title: 'Coffee Growing Regions', description: 'Ethiopia\'s diverse coffee landscapes', content: 'Ethiopia has several distinct coffee-growing regions: Sidamo, Yirgacheffe, Harrar, and others. Each region produces coffee with unique flavor profiles influenced by altitude, climate, and soil.' },
        { title: 'The Coffee Ceremony', description: 'Sacred ritual of coffee preparation', content: 'The Ethiopian coffee ceremony is a social and spiritual ritual. It involves roasting green coffee beans, grinding them by hand, and brewing in a clay pot called a jebena. The ceremony can take hours and brings communities together.' },
        { title: 'Coffee in Ethiopian Society', description: 'Cultural significance and daily life', content: 'Coffee plays a central role in Ethiopian social life. It\'s served at important occasions, used in conflict resolution, and is an integral part of hospitality. Learn about coffee\'s role in Ethiopian culture.' },
        { title: 'From Bean to Cup', description: 'Traditional processing methods', content: 'Learn about traditional Ethiopian coffee processing methods, from harvesting the cherries to the final cup. Understand the difference between washed and natural processing and how it affects flavor.' }
      ]
    };

    const defaultLevels = [
      { title: 'Introduction', description: 'Getting started with the basics', content: 'Welcome to this comprehensive course! In this introductory level, we\'ll cover the fundamental concepts and provide you with a solid foundation for your learning journey.' },
      { title: 'Core Concepts', description: 'Understanding the main principles', content: 'Now that you have the basics, let\'s dive deeper into the core concepts. This level will build upon your foundation and introduce more complex ideas and principles.' },
      { title: 'Practical Applications', description: 'Applying what you\'ve learned', content: 'It\'s time to put theory into practice! This level focuses on real-world applications and hands-on exercises to reinforce your understanding.' },
      { title: 'Advanced Topics', description: 'Exploring deeper knowledge', content: 'Ready for more advanced material? This level covers sophisticated topics and prepares you for expert-level understanding of the subject matter.' },
      { title: 'Mastery', description: 'Achieving expertise', content: 'Congratulations on reaching the final level! Here we\'ll consolidate everything you\'ve learned and explore the most advanced aspects of the topic.' }
    ];

    const levels = levelTemplates[courseId as keyof typeof levelTemplates] || defaultLevels;
    
    return levels.map((level, index) => ({
      id: index + 1,
      title: level.title,
      description: level.description,
      content: level.content,
      duration: '15-20 min',
      completed: false
    }));
  };

  const categories = [
    { id: 'all', label: 'All Courses', icon: BookOpen, color: 'bg-gray-500' },
    { id: 'language', label: 'Language', icon: Languages, color: 'bg-blue-500' },
    { id: 'history', label: 'History', icon: Globe, color: 'bg-emerald-500' },
    { id: 'culture', label: 'Culture', icon: Brain, color: 'bg-rose-500' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCourses = courses.filter(course => 
    selectedCategory === 'all' || course.category === selectedCategory
  );

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === quizzes[currentQuizIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Add quiz result to user history
      const quizResult = {
        id: Date.now().toString(),
        quizName: `${selectedCourse?.title} Quiz`,
        score,
        totalQuestions: quizzes.length,
        completedAt: new Date().toISOString(),
        timeSpent: 300 // Mock time spent
      };
      addQuizResult(quizResult);
      setQuizCompleted(true);
      setCourseCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const startCourse = (course: Course) => {
    setSelectedCourse(course);
    const levels = generateCourseLevels(course.id);
    setCourseLevels(levels);
    setCourseCompleted(false);
  };

  const completeLevel = (levelId: number) => {
    setCourseLevels(prev => 
      prev.map(level => 
        level.id === levelId ? { ...level, completed: true } : level
      )
    );
    setSelectedLevel(null);
  };

  const allLevelsCompleted = courseLevels.every(level => level.completed);
  const canTakeQuiz = allLevelsCompleted && !quizCompleted;

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-32 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-100 rounded mb-3 w-3/4"></div>
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-100 rounded w-1/3"></div>
          <div className="h-3 bg-gray-100 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );

  const CourseCard = ({ course }: { course: Course }) => (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
      onClick={() => setSelectedCourse(course)}
    >
      <div className="relative h-32 overflow-hidden">
        <img 
          src={course.imageUrl} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${
            categories.find(cat => cat.id === course.category)?.color || 'bg-gray-500'
          }`}>
            {course.level}
          </span>
        </div>
        {course.progress && (
          <div className="absolute bottom-2 left-2 right-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-full h-1">
              <div 
                className="bg-white h-1 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <div className="flex items-center space-x-1">
            <Clock size={12} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={12} />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star size={12} className="text-amber-400 fill-current" />
            <span className="text-xs font-medium">{course.rating}</span>
          </div>
          <span className="text-xs text-gray-600">{course.lessons} lessons</span>
        </div>
      </div>
    </div>
  );

  const LevelDetail = ({ level }: { level: CourseLevel }) => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSelectedLevel(null)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Level {level.id}: {level.title}</h1>
              <p className="text-sm text-gray-600">{selectedCourse?.title}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-4">
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-800">{level.title}</h2>
              <span className="text-sm text-gray-500">{level.duration}</span>
            </div>
            <p className="text-gray-600 mb-4">{level.description}</p>
          </div>
          
          <div className="prose prose-gray max-w-none mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 leading-relaxed">{level.content}</p>
            </div>
          </div>

          <button 
            onClick={() => completeLevel(level.id)}
            className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Check size={16} />
            <span>Mark as Complete</span>
          </button>
        </div>
      </div>
    </div>
  );

  const CourseDetail = ({ course }: { course: Course }) => {
    if (courseCompleted) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Completed!</h2>
            <p className="text-gray-600 mb-4">
              Congratulations! You have successfully completed "{course.title}".
            </p>
            <div className="mb-6">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                🎉
              </div>
              <p className="text-gray-500 text-sm">
                You've mastered all 5 levels and passed the final quiz!
              </p>
            </div>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  setSelectedCourse(null);
                  setCourseLevels([]);
                  setCourseCompleted(false);
                  setQuizCompleted(false);
                  setScore(0);
                }}
                className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
              >
                Back to Courses
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50">
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  setSelectedCourse(null);
                  setCourseLevels([]);
                  setCourseCompleted(false);
                  setQuizCompleted(false);
                  setScore(0);
                }}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-800">{course.title}</h1>
                <p className="text-sm text-gray-600">{course.category} • {course.level}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 py-4">
          <div className="h-48 rounded-2xl overflow-hidden mb-6">
            <img 
              src={course.imageUrl} 
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Course Progress</h2>
              <div className="flex items-center space-x-1 text-amber-500">
                <Star size={16} fill="currentColor" />
                <span className="font-medium">{course.rating}</span>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{course.description}</p>
            
            {courseLevels.length > 0 && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-800">Learning Progress</h4>
                  <span className="text-sm text-gray-600">
                    {courseLevels.filter(l => l.completed).length} / {courseLevels.length} levels
                  </span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(courseLevels.filter(l => l.completed).length / courseLevels.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {courseLevels.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 mb-6">
              <button 
                onClick={() => startCourse(course)}
                className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Play size={16} />
                <span>Start Course</span>
              </button>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Levels</h3>
                <div className="space-y-3">
                  {courseLevels.map((level, index) => (
                    <div 
                      key={level.id}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        level.completed 
                          ? 'border-emerald-200 bg-emerald-50' 
                          : index === 0 || courseLevels[index - 1]?.completed
                          ? 'border-gray-200 bg-white hover:border-emerald-300 cursor-pointer'
                          : 'border-gray-100 bg-gray-50'
                      }`}
                      onClick={() => {
                        if (level.completed || index === 0 || courseLevels[index - 1]?.completed) {
                          setSelectedLevel(level);
                        }
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          level.completed 
                            ? 'bg-emerald-500 text-white' 
                            : index === 0 || courseLevels[index - 1]?.completed
                            ? 'bg-gray-200 text-gray-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {level.completed ? (
                            <CheckCircle size={16} />
                          ) : index === 0 || courseLevels[index - 1]?.completed ? (
                            <span className="text-sm font-medium">{level.id}</span>
                          ) : (
                            <Lock size={16} />
                          )}
                        </div>
                        <div>
                          <h4 className={`font-medium ${
                            level.completed ? 'text-emerald-700' : 'text-gray-800'
                          }`}>
                            Level {level.id}: {level.title}
                          </h4>
                          <p className="text-gray-600 text-sm">{level.description}</p>
                        </div>
                      </div>
                      {(index === 0 || courseLevels[index - 1]?.completed) && (
                        <ChevronRight size={20} className="text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Final Quiz</h3>
                <p className="text-gray-600 mb-4">
                  Complete all levels to unlock the final quiz and earn your course completion certificate.
                </p>
                <button 
                  onClick={() => setShowQuiz(true)}
                  disabled={!canTakeQuiz}
                  className={`w-full py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 ${
                    canTakeQuiz
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {canTakeQuiz ? <Brain size={16} /> : <Lock size={16} />}
                  <span>{canTakeQuiz ? 'Take Final Quiz' : 'Complete All Levels First'}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const QuizComponent = () => {
    if (quizCompleted) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600 mb-4">You scored {score} out of {quizzes.length}</p>
            <div className="mb-6">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                {Math.round((score / quizzes.length) * 100)}%
              </div>
              <p className="text-gray-500 text-sm">
                {score === quizzes.length ? 'Perfect Score!' : 
                 score >= quizzes.length * 0.8 ? 'Great Job!' :
                 score >= quizzes.length * 0.6 ? 'Good Effort!' : 'Keep Learning!'}
              </p>
            </div>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  setShowQuiz(false);
                  // Course will be marked as completed in the parent component
                }}
                className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
              >
                Continue
              </button>
              <button 
                onClick={resetQuiz}
                className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <RotateCcw size={16} />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    const currentQuiz = quizzes[currentQuizIndex];

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50">
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setShowQuiz(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <div>
                  <h1 className="text-lg font-bold text-gray-800">Final Quiz</h1>
                  <p className="text-sm text-gray-600">Question {currentQuizIndex + 1} of {quizzes.length}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Score: {score}/{currentQuizIndex + (showResult ? 1 : 0)}
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 py-8">
          <div className="bg-white rounded-2xl p-6 mb-6">
            <div className="mb-4">
              <div className="bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuizIndex + 1) / quizzes.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-6">{currentQuiz.question}</h2>
            <div className="space-y-3">
              {currentQuiz.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleQuizAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    showResult
                      ? index === currentQuiz.correctAnswer
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : index === selectedAnswer && index !== currentQuiz.correctAnswer
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 bg-gray-50 text-gray-500'
                      : selectedAnswer === index
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      showResult && index === currentQuiz.correctAnswer
                        ? 'border-emerald-500 bg-emerald-500'
                        : showResult && index === selectedAnswer && index !== currentQuiz.correctAnswer
                        ? 'border-red-500 bg-red-500'
                        : selectedAnswer === index
                        ? 'border-emerald-500'
                        : 'border-gray-300'
                    }`}>
                      {showResult && index === currentQuiz.correctAnswer && (
                        <CheckCircle size={16} className="text-white" />
                      )}
                      {showResult && index === selectedAnswer && index !== currentQuiz.correctAnswer && (
                        <XCircle size={16} className="text-white" />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {showResult && (
            <div className="bg-white rounded-2xl p-6 mb-6">
              <div className={`flex items-center space-x-2 mb-3 ${
                selectedAnswer === currentQuiz.correctAnswer ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {selectedAnswer === currentQuiz.correctAnswer ? (
                  <CheckCircle size={20} />
                ) : (
                  <XCircle size={20} />
                )}
                <span className="font-semibold">
                  {selectedAnswer === currentQuiz.correctAnswer ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-4">{currentQuiz.explanation}</p>
              <button 
                onClick={nextQuestion}
                className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
              >
                {currentQuizIndex < quizzes.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (selectedLevel) {
    return <LevelDetail level={selectedLevel} />;
  }

  if (showQuiz) {
    return <QuizComponent />;
  }

  if (selectedCourse) {
    return <CourseDetail course={selectedCourse} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Learning Portal</h1>
              <p className="text-sm text-gray-600">Expand your knowledge</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-4 space-y-4">
        <div className="relative overflow-hidden rounded-2xl [background-image:linear-gradient(to_right,#E1E0C9,#367EA5)] p-6 text-white mb-6
">
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <BookOpen size={20} />
              <span className="text-sm font-medium">Interactive Learning</span>
            </div>
            <h2 className="text-xl font-bold mb-2">Master Ethiopian Culture</h2>
            <p className="text-blue-100 text-sm">From language basics to deep cultural understanding</p>
          </div>
          <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <category.icon size={16} />
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="px-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Available Courses</h2>
          <span className="text-sm text-gray-500">{filteredCourses.length} courses</span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {!isLoading && filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No courses found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default LearningPortal;