import { useState } from 'react';
import { Contact } from '../App';
import { Language, getTranslation } from '../utils/translations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { UserPlus, Clock, MapPin, Circle, Phone, Mail, MessageCircle, Check, X, Video } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface FamilyListProps {
  contacts: Contact[];
  onAddContact: (contact: Omit<Contact, 'id'>) => void;
  onUpdateStatus: (contactId: string, status: 'accepted' | 'rejected') => void;
  onSendCallRequest: (contactId: string, message: string, platform: string, note?: string) => void;
  language: Language;
}

export function FamilyList({ contacts, onAddContact, onUpdateStatus, onSendCallRequest, language }: FamilyListProps) {
  const t = getTranslation(language);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCallRequestDialogOpen, setIsCallRequestDialogOpen] = useState(false);
  const [selectedContactForCall, setSelectedContactForCall] = useState<Contact | null>(null);
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [callRequestData, setCallRequestData] = useState({
    message: '',
    platform: 'WhatsApp',
    note: '',
  });

  const handleAddContact = () => {
    if (newContact.name && (newContact.email || newContact.phone)) {
      onAddContact({
        userId: Date.now().toString(),
        name: newContact.name,
        email: newContact.email,
        phone: newContact.phone,
        city: 'Unknown',
        country: 'Unknown',
        timezone: 'UTC',
        status: 'pending',
        currentStatus: 'Free',
        shareSettings: {
          timeWeather: true,
          availability: true,
          schedule: false,
        },
      });
      setNewContact({ name: '', email: '', phone: '' });
      setIsAddDialogOpen(false);
    }
  };

  const handleOpenCallRequest = (contact: Contact) => {
    setSelectedContactForCall(contact);
    setCallRequestData({
      message: 'Can we talk?',
      platform: 'WhatsApp',
      note: '',
    });
    setIsCallRequestDialogOpen(true);
  };

  const handleSendCallRequest = () => {
    if (selectedContactForCall && callRequestData.message) {
      onSendCallRequest(
        selectedContactForCall.id,
        callRequestData.message,
        callRequestData.platform,
        callRequestData.note
      );
      setIsCallRequestDialogOpen(false);
      setSelectedContactForCall(null);
      setCallRequestData({ message: '', platform: 'WhatsApp', note: '' });
    }
  };

  const acceptedContacts = contacts.filter(c => c.status === 'accepted');
  const pendingContacts = contacts.filter(c => c.status === 'pending');

  const statusColors = {
    Free: 'text-green-500 bg-green-50',
    Busy: 'text-yellow-500 bg-yellow-50',
    Sleeping: 'text-indigo-500 bg-indigo-50',
    'In Class': 'text-red-500 bg-red-50',
  };

  const platformIcons = {
    WhatsApp: '💬',
    Instagram: '📸',
    Facebook: '👥',
    Phone: '📞',
    'Video Call': '📹',
  };

  return (
    <div className="space-y-3 md:space-y-4">
      <Card>
        <CardHeader className="pb-3 md:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-base md:text-lg">{t.familyContacts}</CardTitle>
              <CardDescription className="text-xs md:text-sm">{t.manageFamilyDescription}</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="text-xs md:text-sm">
                  <UserPlus className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">{t.addContact}</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-base md:text-lg">{t.addNewContact}</DialogTitle>
                  <DialogDescription className="text-xs md:text-sm">
                    {t.sendShareRequest}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 md:space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="text-sm">{t.name}</Label>
                    <Input
                      id="contact-name"
                      placeholder={t.enterName}
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-sm">{t.email}</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder={t.enterEmail}
                      value={newContact.email}
                      onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone" className="text-sm">{t.phone} ({t.optional})</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder={t.enterPhone}
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <Button onClick={handleAddContact} className="w-full text-sm">
                    {t.sendRequest}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="accepted">
            <TabsList className="mb-3 md:mb-4 w-full">
              <TabsTrigger value="accepted" className="flex-1 text-xs md:text-sm">
                {t.contacts} ({acceptedContacts.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex-1 text-xs md:text-sm">
                {t.pending} ({pendingContacts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="accepted">
              {acceptedContacts.length === 0 ? (
                <div className="text-center py-6 md:py-8 text-gray-500 text-sm">
                  {t.noContactsYet}
                </div>
              ) : (
                <div className="grid gap-3 md:gap-4">
                  {acceptedContacts.map((contact) => (
                    <Card key={contact.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="pt-4 md:pt-6 p-3 md:p-6">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                <h3 className="text-sm md:text-base truncate">{contact.name}</h3>
                                <Badge className={`${statusColors[contact.currentStatus]} text-xs w-fit`}>
                                  <Circle className="w-2 h-2 fill-current mr-1" />
                                  {contact.currentStatus}
                                </Badge>
                              </div>
                              
                              {contact.shareSettings.timeWeather && (
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 mb-2 md:mb-3 text-xs md:text-sm">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                                    <span>
                                      {new Intl.DateTimeFormat('en-US', {
                                        timeZone: contact.timezone,
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      }).format(new Date())}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                                    <span className="truncate">{contact.city}, {contact.country}</span>
                                  </div>
                                </div>
                              )}

                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-gray-500 text-xs">
                                {contact.email && (
                                  <div className="flex items-center gap-1 truncate">
                                    <Mail className="w-3 h-3" />
                                    <span className="truncate">{contact.email}</span>
                                  </div>
                                )}
                                {contact.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    <span>{contact.phone}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenCallRequest(contact)}
                            className="w-full text-xs md:text-sm"
                          >
                            <MessageCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                            {t.requestCall}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="pending">
              {pendingContacts.length === 0 ? (
                <div className="text-center py-6 md:py-8 text-gray-500 text-sm">
                  {t.noPendingRequests}
                </div>
              ) : (
                <div className="space-y-2 md:space-y-3">
                  {pendingContacts.map((contact) => (
                    <Card key={contact.id}>
                      <CardContent className="pt-4 md:pt-6 p-3 md:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm md:text-base mb-1 truncate">{contact.name}</h3>
                            <p className="text-gray-600 text-xs md:text-sm truncate">
                              {contact.email || contact.phone}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onUpdateStatus(contact.id, 'accepted')}
                              className="flex-1 sm:flex-none text-xs"
                            >
                              <Check className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                              {t.accept}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onUpdateStatus(contact.id, 'rejected')}
                              className="flex-1 sm:flex-none text-xs"
                            >
                              <X className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                              {t.decline}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Call Request Dialog */}
      <Dialog open={isCallRequestDialogOpen} onOpenChange={setIsCallRequestDialogOpen}>
        <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base md:text-lg">{t.requestACall}</DialogTitle>
            <DialogDescription className="text-xs md:text-sm">
              {t.sendCallRequestTo} {selectedContactForCall?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 md:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform" className="text-sm">{t.contactVia}</Label>
              <Select
                value={callRequestData.platform}
                onValueChange={(value) => setCallRequestData({ ...callRequestData, platform: value })}
              >
                <SelectTrigger id="platform" className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WhatsApp">
                    <span className="flex items-center gap-2 text-sm">
                      {platformIcons['WhatsApp']} {t.whatsApp}
                    </span>
                  </SelectItem>
                  <SelectItem value="Instagram">
                    <span className="flex items-center gap-2 text-sm">
                      {platformIcons['Instagram']} {t.instagram}
                    </span>
                  </SelectItem>
                  <SelectItem value="Facebook">
                    <span className="flex items-center gap-2 text-sm">
                      {platformIcons['Facebook']} {t.facebook}
                    </span>
                  </SelectItem>
                  <SelectItem value="Phone">
                    <span className="flex items-center gap-2 text-sm">
                      {platformIcons['Phone']} {t.phoneCall}
                    </span>
                  </SelectItem>
                  <SelectItem value="Video Call">
                    <span className="flex items-center gap-2 text-sm">
                      {platformIcons['Video Call']} {t.videoCall}
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm">{t.message}</Label>
              <Input
                id="message"
                placeholder={t.canWeTalk}
                value={callRequestData.message}
                onChange={(e) => setCallRequestData({ ...callRequestData, message: e.target.value })}
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="note" className="text-sm">{t.warmNoteOptional}</Label>
              <Textarea
                id="note"
                placeholder={t.warmNotePlaceholder}
                value={callRequestData.note}
                onChange={(e) => setCallRequestData({ ...callRequestData, note: e.target.value })}
                rows={3}
                className="text-sm"
              />
              <p className="text-gray-500 text-xs">
                {t.warmNoteHint}
              </p>
            </div>

            <Button onClick={handleSendCallRequest} className="w-full text-sm">
              {t.sendCallRequest}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}