import { useState } from 'react';
import { AuthView } from './components/AuthView';
import { Dashboard } from './components/Dashboard';
import { Language } from './utils/translations';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  timezone: string;
  language: Language;
  avatarUrl?: string;
}

export interface Contact {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  timezone: string;
  status: 'pending' | 'accepted' | 'rejected';
  currentStatus: 'Free' | 'Busy' | 'Sleeping' | 'In Class';
  shareSettings: {
    timeWeather: boolean;
    availability: boolean;
    schedule: boolean;
  };
  quietHours?: {
    start: string;
    end: string;
  };
}

export interface ScheduleBlock {
  id: string;
  day: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  title: string;
  color: string;
}

export interface CallRequest {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  message: string;
  platform: 'WhatsApp' | 'Instagram' | 'Facebook' | 'Phone' | 'Video Call';
  note?: string;
  timestamp: Date;
  response?: 'now' | '15min' | '30min' | '60min';
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  const handleLogin = (user: User) => {
    setLanguage(user.language);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLanguage('en');
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    if (currentUser) {
      setCurrentUser({ ...currentUser, language: newLang });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!currentUser ? (
        <AuthView onLogin={handleLogin} language={language} onLanguageChange={handleLanguageChange} />
      ) : (
        <Dashboard 
          user={currentUser} 
          onLogout={handleLogout}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      )}
    </div>
  );
}

export default App;