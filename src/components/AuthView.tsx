import { useState } from 'react';
import { Mail, Phone, Globe, Languages } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { User } from '../App';
import { Language, getTranslation } from '../utils/translations';

interface AuthViewProps {
  onLogin: (user: User) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function AuthView({ onLogin, language, onLanguageChange }: AuthViewProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const t = getTranslation(language);

  const detectTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  const handleEmailLogin = () => {
    if (email && name) {
      const user: User = {
        id: '1',
        name,
        email,
        phone: '',
        city: 'New York',
        country: 'USA',
        timezone: detectTimezone(),
        language,
      };
      onLogin(user);
    }
  };

  const handlePhoneLogin = () => {
    if (phone && name) {
      const user: User = {
        id: '1',
        name,
        email: '',
        phone,
        city: 'New York',
        country: 'USA',
        timezone: detectTimezone(),
        language,
      };
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-4">
          <Select value={language} onValueChange={(val) => onLanguageChange(val as Language)}>
            <SelectTrigger className="w-32 bg-white">
              <Languages className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ru">Русский</SelectItem>
              <SelectItem value="tr">Türkçe</SelectItem>
              <SelectItem value="kz">Қазақша</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-indigo-900 mb-2">{t.appName}</h1>
          <p className="text-gray-600">{t.tagline}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t.signIn}</CardTitle>
            <CardDescription>
              {t.signInDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="email">
                  <Mail className="w-4 h-4 mr-2" />
                  {t.email}
                </TabsTrigger>
                <TabsTrigger value="phone">
                  <Phone className="w-4 h-4 mr-2" />
                  {t.phone}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-email">{t.yourName}</Label>
                  <Input
                    id="name-email"
                    type="text"
                    placeholder={t.enterName}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.emailAddress}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.enterEmail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button onClick={handleEmailLogin} className="w-full">
                  {t.signInWithEmail}
                </Button>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-phone">{t.yourName}</Label>
                  <Input
                    id="name-phone"
                    type="text"
                    placeholder={t.enterName}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phoneNumber}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t.enterPhone}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <Button onClick={handlePhoneLogin} className="w-full">
                  {t.signInWithPhone}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-700">
                <strong>{t.autoDetected}:</strong> {detectTimezone()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
