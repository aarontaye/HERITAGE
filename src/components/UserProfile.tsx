import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User as UserIcon, 
  Mail, 
  Calendar, 
  Globe, 
  Heart,
  Trophy,
  Edit3,
  Camera,
  Star,
  Clock,
  Target
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface UserProfileProps {
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onBack }) => {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    interests: user?.interests || [],
    preferredLanguage: user?.preferredLanguage || 'english'
  });

  if (!user) return null;

  const availableInterests = [
    'history', 'culture', 'language', 'art', 'music', 'dance', 
    'architecture', 'religion', 'literature', 'crafts'
  ];

  const handleSave = () => {
    updateUser(editForm);
    setIsEditing(false);
  };

  const toggleInterest = (interest: string) => {
    const newInterests = editForm.interests.includes(interest)
      ? editForm.interests.filter(i => i !== interest)
      : [...editForm.interests, interest];
    setEditForm({ ...editForm, interests: newInterests });
  };

  const getAverageScore = () => {
    if (user.quizHistory.length === 0) return 0;
    const totalScore = user.quizHistory.reduce((sum, quiz) => 
      sum + (quiz.score / quiz.totalQuestions), 0);
    return Math.round((totalScore / user.quizHistory.length) * 100);
  };

  const getLastQuizScore = () => {
    if (user.quizHistory.length === 0) return null;
    const lastQuiz = user.quizHistory[0];
    return Math.round((lastQuiz.score / lastQuiz.totalQuestions) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
                <p className="text-sm text-gray-600">Manage your account</p>
              </div>
            </div>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors flex items-center space-x-2"
            >
              <Edit3 size={16} />
              <span>{isEditing ? 'Save' : 'Edit'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              {isEditing && (
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition-colors">
                  <Camera size={14} />
                </button>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="text-xl font-bold text-gray-800 bg-gray-50 rounded-lg px-3 py-2 w-full border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              )}
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Mail size={14} />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Language Preference */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <Globe size={16} />
              <span>Preferred Language</span>
            </h3>
            {isEditing ? (
              <div className="flex space-x-3">
                <button
                  onClick={() => setEditForm({ ...editForm, preferredLanguage: 'english' })}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                    editForm.preferredLanguage === 'english'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setEditForm({ ...editForm, preferredLanguage: 'amharic' })}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                    editForm.preferredLanguage === 'amharic'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  አማርኛ (Amharic)
                </button>
              </div>
            ) : (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                {user.preferredLanguage === 'english' ? 'English' : 'አማርኛ (Amharic)'}
              </span>
            )}
          </div>

          {/* Interests */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <Heart size={16} />
              <span>Interests</span>
            </h3>
            {isEditing ? (
              <div className="flex flex-wrap gap-2">
                {availableInterests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      editForm.interests.includes(interest)
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {interest.charAt(0).toUpperCase() + interest.slice(1)}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <span key={interest} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                    {interest.charAt(0).toUpperCase() + interest.slice(1)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Trophy size={16} />
            <span>Learning Progress</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target size={20} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-emerald-600">{getAverageScore()}%</div>
              <div className="text-sm text-emerald-700">Average Score</div>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star size={20} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-amber-600">{getLastQuizScore() || 0}%</div>
              <div className="text-sm text-amber-700">Last Quiz</div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock size={20} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-600">{user.quizHistory.length}</div>
              <div className="text-sm text-blue-700">Quizzes Taken</div>
            </div>
          </div>

          {/* Recent Quiz History */}
          {user.quizHistory.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Recent Quiz Results</h4>
              <div className="space-y-3">
                {user.quizHistory.slice(0, 3).map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <h5 className="font-medium text-gray-800">{quiz.quizName}</h5>
                      <p className="text-sm text-gray-600">
                        {new Date(quiz.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">
                        {Math.round((quiz.score / quiz.totalQuestions) * 100)}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {quiz.score}/{quiz.totalQuestions}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Account Stats */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Account Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{user.favorites.archiveItems.length + user.favorites.tourSites.length + user.favorites.products.length}</div>
              <div className="text-sm text-gray-600">Total Favorites</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{Math.floor(Math.random() * 50) + 20}</div>
              <div className="text-sm text-gray-600">Days Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;