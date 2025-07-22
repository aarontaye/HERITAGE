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
  Brain
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
      imageUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
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
      imageUrl: 'https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=400'
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
      imageUrl: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400'
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
      imageUrl: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400'
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
      imageUrl: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400'
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
      imageUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400'
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
        quizName: 'Ethiopian Culture Quiz',
        score,
        totalQuestions: quizzes.length,
        completedAt: new Date().toISOString(),
        timeSpent: 300 // Mock time spent
      };
      addQuizResult(quizResult);
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

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

  const CourseDetail = ({ course }: { course: Course }) => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSelectedCourse(null)}
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
            <h2 className="text-xl font-bold text-gray-800">Course Overview</h2>
            <div className="flex items-center space-x-1 text-amber-500">
              <Star size={16} fill="currentColor" />
              <span className="font-medium">{course.rating}</span>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{course.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Duration</h4>
              <p className="text-gray-600 text-sm">{course.duration}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Students</h4>
              <p className="text-gray-600 text-sm">{course.students.toLocaleString()}</p>
            </div>
          </div>
          {course.progress && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-800">Progress</h4>
                <span className="text-sm text-gray-600">{course.progress}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          )}
          <button className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2">
            <Play size={16} />
            <span>{course.progress ? 'Continue Learning' : 'Start Course'}</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Test Your Knowledge</h3>
          <p className="text-gray-600 mb-4">Take a quick quiz to test what you know about Ethiopian culture and history.</p>
          <button 
            onClick={() => setShowQuiz(true)}
            className="w-full bg-amber-500 text-white py-3 rounded-xl font-medium hover:bg-amber-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Brain size={16} />
            <span>Start Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );

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
                onClick={resetQuiz}
                className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2"
              >
                <RotateCcw size={16} />
                <span>Try Again</span>
              </button>
              <button 
                onClick={() => setShowQuiz(false)}
                className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Course
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
                  <h1 className="text-lg font-bold text-gray-800">Cultural Quiz</h1>
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
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 p-6 text-white mb-6">
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