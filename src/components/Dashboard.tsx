import { useState } from 'react';
import { User, Contact, ScheduleBlock, CallRequest } from '../App';
import { Language, getTranslation } from '../utils/translations';
import { Header } from './Header';
import { FamilyList } from './FamilyList';
import { TimeWeatherCard } from './TimeWeatherCard';
import { AvailabilityStatus } from './AvailabilityStatus';
import { Schedule } from './Schedule';
import { CallRequestPanel } from './CallRequestPanel';
import { PrivacySettings } from './PrivacySettings';
import { GroupAvailability } from './GroupAvailability';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Users, Calendar, Settings, MessageCircle, CalendarClock } from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Dashboard({ user, onLogout, language, onLanguageChange }: DashboardProps) {
  const t = getTranslation(language);
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '2',
      userId: '2',
      name: 'Maria Garcia',
      email: 'maria@example.com',
      phone: '+34 123 456 789',
      city: 'Madrid',
      country: 'Spain',
      timezone: 'Europe/Madrid',
      status: 'accepted',
      currentStatus: 'Free',
      shareSettings: {
        timeWeather: true,
        availability: true,
        schedule: false,
      },
    },
    {
      id: '3',
      userId: '3',
      name: 'Yuki Tanaka',
      email: 'yuki@example.com',
      phone: '+81 90 1234 5678',
      city: 'Tokyo',
      country: 'Japan',
      timezone: 'Asia/Tokyo',
      status: 'accepted',
      currentStatus: 'Sleeping',
      shareSettings: {
        timeWeather: true,
        availability: true,
        schedule: true,
      },
      quietHours: {
        start: '22:00',
        end: '07:00',
      },
    },
    {
      id: '4',
      userId: '4',
      name: 'Ahmed Hassan',
      email: 'ahmed@example.com',
      phone: '+971 50 123 4567',
      city: 'Dubai',
      country: 'UAE',
      timezone: 'Asia/Dubai',
      status: 'pending',
      currentStatus: 'Busy',
      shareSettings: {
        timeWeather: true,
        availability: true,
        schedule: false,
      },
    },
  ]);

  const [myStatus, setMyStatus] = useState<'Free' | 'Busy' | 'Sleeping' | 'In Class'>('Free');
  const [quietHours, setQuietHours] = useState({ start: '22:00', end: '07:00' });

  const [scheduleBlocks, setScheduleBlocks] = useState<ScheduleBlock[]>([
    {
      id: '1',
      day: 1, // Monday
      startTime: '09:00',
      endTime: '11:00',
      title: 'Math Class',
      color: '#3b82f6',
    },
    {
      id: '2',
      day: 1,
      startTime: '14:00',
      endTime: '16:00',
      title: 'Physics Lab',
      color: '#10b981',
    },
    {
      id: '3',
      day: 3, // Wednesday
      startTime: '09:00',
      endTime: '11:00',
      title: 'Math Class',
      color: '#3b82f6',
    },
  ]);

  const [callRequests, setCallRequests] = useState<CallRequest[]>([]);

  const handleAddContact = (contact: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString(),
    };
    setContacts([...contacts, newContact]);
  };

  const handleUpdateContactStatus = (contactId: string, status: 'accepted' | 'rejected') => {
    setContacts(contacts.map(c => c.id === contactId ? { ...c, status } : c));
  };

  const handleUpdatePrivacy = (contactId: string, settings: Contact['shareSettings']) => {
    setContacts(contacts.map(c => c.id === contactId ? { ...c, shareSettings: settings } : c));
  };

  const handleSendCallRequest = (contactId: string, message: string, platform: string, note?: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      const newRequest: CallRequest = {
        id: Date.now().toString(),
        fromUserId: user.id,
        fromUserName: user.name,
        toUserId: contactId,
        message,
        platform: platform as 'WhatsApp' | 'Instagram' | 'Facebook' | 'Phone' | 'Video Call',
        note,
        timestamp: new Date(),
      };
      setCallRequests([...callRequests, newRequest]);
    }
  };

  const handleAddScheduleBlock = (block: Omit<ScheduleBlock, 'id'>) => {
    const newBlock: ScheduleBlock = {
      ...block,
      id: Date.now().toString(),
    };
    setScheduleBlocks([...scheduleBlocks, newBlock]);
  };

  const handleDeleteScheduleBlock = (blockId: string) => {
    setScheduleBlocks(scheduleBlocks.filter(b => b.id !== blockId));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <Header user={user} onLogout={onLogout} language={language} onLanguageChange={onLanguageChange} />
      
      <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 md:mb-6">
          <div className="lg:col-span-2">
            <TimeWeatherCard
              name={user.name}
              city={user.city}
              country={user.country}
              timezone={user.timezone}
              language={language}
            />
          </div>
          <div>
            <AvailabilityStatus
              status={myStatus}
              onStatusChange={setMyStatus}
              quietHours={quietHours}
              onQuietHoursChange={setQuietHours}
              language={language}
            />
          </div>
        </div>

        <Tabs defaultValue="family" className="space-y-3 md:space-y-4">
          <TabsList className="grid w-full grid-cols-5 h-auto p-1">
            <TabsTrigger value="family" className="flex-col gap-1 py-2 px-1 text-xs">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">{t.family}</span>
            </TabsTrigger>
            <TabsTrigger value="availability" className="flex-col gap-1 py-2 px-1 text-xs">
              <CalendarClock className="w-4 h-4" />
              <span className="hidden sm:inline">{t.availability}</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex-col gap-1 py-2 px-1 text-xs">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">{t.schedule}</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex-col gap-1 py-2 px-1 text-xs">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t.requests}</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex-col gap-1 py-2 px-1 text-xs">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">{t.privacy}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="family">
            <FamilyList
              contacts={contacts}
              onAddContact={handleAddContact}
              onUpdateStatus={handleUpdateContactStatus}
              onSendCallRequest={handleSendCallRequest}
              language={language}
            />
          </TabsContent>

          <TabsContent value="availability">
            <GroupAvailability
              contacts={contacts}
              userTimezone={user.timezone}
              userCity={user.city}
              language={language}
            />
          </TabsContent>

          <TabsContent value="schedule">
            <Schedule
              blocks={scheduleBlocks}
              onAddBlock={handleAddScheduleBlock}
              onDeleteBlock={handleDeleteScheduleBlock}
              language={language}
            />
          </TabsContent>

          <TabsContent value="requests">
            <CallRequestPanel requests={callRequests} currentUserId={user.id} language={language} />
          </TabsContent>

          <TabsContent value="privacy">
            <PrivacySettings
              contacts={contacts}
              onUpdatePrivacy={handleUpdatePrivacy}
              language={language}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}