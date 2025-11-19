import { useState, useMemo } from 'react';
import { Contact } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Users, Clock, MapPin, Coffee, Phone, Video, Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface GroupAvailabilityProps {
  contacts: Contact[];
  userTimezone: string;
  userCity: string;
}

export function GroupAvailability({ contacts, userTimezone, userCity }: GroupAvailabilityProps) {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [activityType, setActivityType] = useState<'call' | 'video' | 'meet'>('call');

  const acceptedContacts = contacts.filter(c => c.status === 'accepted');

  const handleToggleContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const selectedContactsData = useMemo(() => {
    return acceptedContacts.filter(c => selectedContacts.includes(c.id));
  }, [acceptedContacts, selectedContacts]);

  // Find common free time slots
  const commonTimeSlots = useMemo(() => {
    if (selectedContactsData.length === 0) return [];

    // Mock logic - in real app would check actual schedules and quiet hours
    const slots = [
      {
        time: '10:00 AM',
        duration: '2 hours',
        suitable: selectedContactsData.filter(c => c.currentStatus === 'Free').length,
        total: selectedContactsData.length,
        allFree: selectedContactsData.every(c => c.currentStatus === 'Free'),
      },
      {
        time: '2:00 PM',
        duration: '1.5 hours',
        suitable: Math.floor(selectedContactsData.length * 0.7),
        total: selectedContactsData.length,
        allFree: false,
      },
      {
        time: '7:00 PM',
        duration: '2 hours',
        suitable: Math.floor(selectedContactsData.length * 0.8),
        total: selectedContactsData.length,
        allFree: false,
      },
    ];

    return slots;
  }, [selectedContactsData]);

  // Find contacts in same city
  const contactsInSameCity = useMemo(() => {
    return selectedContactsData.filter(c => c.city === userCity);
  }, [selectedContactsData, userCity]);

  const activityIcons = {
    call: Phone,
    video: Video,
    meet: Coffee,
  };

  const ActivityIcon = activityIcons[activityType];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Group Availability
          </CardTitle>
          <CardDescription>
            Find the best time to connect with multiple family members
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Family Members</Label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {acceptedContacts.map((contact) => (
                <div key={contact.id} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
                  <Checkbox
                    id={`contact-${contact.id}`}
                    checked={selectedContacts.includes(contact.id)}
                    onCheckedChange={() => handleToggleContact(contact.id)}
                  />
                  <Label
                    htmlFor={`contact-${contact.id}`}
                    className="flex-1 cursor-pointer flex items-center justify-between"
                  >
                    <span>{contact.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {contact.currentStatus}
                      </Badge>
                      {contact.city === userCity && (
                        <Badge variant="outline" className="text-xs bg-green-50">
                          Same City
                        </Badge>
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {selectedContactsData.length > 0 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="activity-type">Activity Type</Label>
                <Select value={activityType} onValueChange={(value: any) => setActivityType(value)}>
                  <SelectTrigger id="activity-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="call">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Call
                      </div>
                    </SelectItem>
                    <SelectItem value="video">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Video Call
                      </div>
                    </SelectItem>
                    <SelectItem value="meet">
                      <div className="flex items-center gap-2">
                        <Coffee className="w-4 h-4" />
                        In-Person Meeting
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {activityType === 'meet' && contactsInSameCity.length > 0 && (
                <Alert className="bg-green-50 border-green-200">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-900">Perfect for In-Person!</AlertTitle>
                  <AlertDescription className="text-green-800">
                    {contactsInSameCity.length} {contactsInSameCity.length === 1 ? 'person is' : 'people are'} in {userCity}:
                    <div className="mt-2 space-y-1">
                      {contactsInSameCity.map(c => (
                        <div key={c.id} className="flex items-center gap-2">
                          <Coffee className="w-3 h-3" />
                          <span>{c.name}</span>
                        </div>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {activityType === 'meet' && contactsInSameCity.length === 0 && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>No contacts in your city</AlertTitle>
                  <AlertDescription>
                    None of the selected contacts are currently in {userCity}. Consider a video call instead!
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {selectedContactsData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Suggested Time Slots
            </CardTitle>
            <CardDescription>
              Based on everyone's availability and time zones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {commonTimeSlots.map((slot, index) => (
                <Card key={index} className={slot.allFree ? 'border-green-300 bg-green-50' : ''}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4" />
                          <h3>{slot.time}</h3>
                          {slot.allFree && (
                            <Badge className="bg-green-500">Everyone Free!</Badge>
                          )}
                        </div>
                        <p className="text-gray-600">
                          Duration: {slot.duration}
                        </p>
                        <p className="text-gray-500">
                          {slot.suitable} of {slot.total} people available
                        </p>
                      </div>
                      <Button size="sm">
                        <ActivityIcon className="w-4 h-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {commonTimeSlots.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Select contacts to see suggested meeting times
                </div>
              )}
            </div>

            {selectedContactsData.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="mb-2 text-blue-900">Selected Contacts:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedContactsData.map((contact) => (
                    <div key={contact.id} className="flex items-center gap-2 text-blue-800">
                      <Clock className="w-3 h-3" />
                      <span>{contact.name}</span>
                      <span className="text-blue-600">
                        ({new Intl.DateTimeFormat('en-US', {
                          timeZone: contact.timezone,
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(new Date())})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Alert({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-4 rounded-lg border ${className || 'bg-gray-50 border-gray-200'}`}>
      {children}
    </div>
  );
}

function AlertTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h4 className={`mb-1 ${className || ''}`}>{children}</h4>;
}

function AlertDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className || 'text-gray-600'}>{children}</div>;
}

function Info({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );
}
