import { Contact } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Shield } from 'lucide-react';

interface PrivacySettingsProps {
  contacts: Contact[];
  onUpdatePrivacy: (contactId: string, settings: Contact['shareSettings']) => void;
}

export function PrivacySettings({ contacts, onUpdatePrivacy }: PrivacySettingsProps) {
  const acceptedContacts = contacts.filter(c => c.status === 'accepted');

  const handleToggle = (contactId: string, field: keyof Contact['shareSettings'], value: boolean) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      onUpdatePrivacy(contactId, {
        ...contact.shareSettings,
        [field]: value,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          <div>
            <CardTitle>Privacy Controls</CardTitle>
            <CardDescription>
              Control what information you share with each contact
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {acceptedContacts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No contacts to manage privacy settings for
          </div>
        ) : (
          <div className="space-y-6">
            {acceptedContacts.map((contact) => (
              <Card key={contact.id}>
                <CardHeader>
                  <CardTitle>{contact.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor={`time-weather-${contact.id}`}>
                        Time & Weather
                      </Label>
                      <p className="text-gray-500">
                        Share your current time and weather information
                      </p>
                    </div>
                    <Switch
                      id={`time-weather-${contact.id}`}
                      checked={contact.shareSettings.timeWeather}
                      onCheckedChange={(checked) => handleToggle(contact.id, 'timeWeather', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor={`availability-${contact.id}`}>
                        Availability Status
                      </Label>
                      <p className="text-gray-500">
                        Share your current availability (Free, Busy, etc.)
                      </p>
                    </div>
                    <Switch
                      id={`availability-${contact.id}`}
                      checked={contact.shareSettings.availability}
                      onCheckedChange={(checked) => handleToggle(contact.id, 'availability', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor={`schedule-${contact.id}`}>
                        Schedule Blocks
                      </Label>
                      <p className="text-gray-500">
                        Share your weekly schedule and activities
                      </p>
                    </div>
                    <Switch
                      id={`schedule-${contact.id}`}
                      checked={contact.shareSettings.schedule}
                      onCheckedChange={(checked) => handleToggle(contact.id, 'schedule', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
