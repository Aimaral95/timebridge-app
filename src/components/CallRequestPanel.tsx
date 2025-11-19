import { CallRequest } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Phone, Clock, MessageCircle, Heart } from 'lucide-react';

interface CallRequestPanelProps {
  requests: CallRequest[];
  currentUserId: string;
}

export function CallRequestPanel({ requests, currentUserId }: CallRequestPanelProps) {
  const incomingRequests = requests.filter(r => r.toUserId === currentUserId && !r.response);
  const outgoingRequests = requests.filter(r => r.fromUserId === currentUserId);

  const handleResponse = (requestId: string, response: 'now' | '15min' | '30min' | '60min') => {
    console.log(`Responding to request ${requestId} with: ${response}`);
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const platformIcons = {
    WhatsApp: '💬',
    Instagram: '📸',
    Facebook: '👥',
    Phone: '📞',
    'Video Call': '📹',
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Incoming Requests</CardTitle>
          <CardDescription>Call requests from your family members</CardDescription>
        </CardHeader>
        <CardContent>
          {incomingRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No incoming requests
            </div>
          ) : (
            <div className="space-y-3">
              {incomingRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3>{request.fromUserName}</h3>
                            <Badge variant="outline">
                              <span className="mr-1">{platformIcons[request.platform]}</span>
                              {request.platform}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{request.message}</p>
                          
                          {request.note && (
                            <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 mb-2">
                              <div className="flex items-start gap-2">
                                <Heart className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-700 italic">
                                  "{request.note}"
                                </p>
                              </div>
                            </div>
                          )}
                          
                          <p className="text-gray-400">
                            {formatTimestamp(request.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          size="sm"
                          onClick={() => handleResponse(request.id, 'now')}
                        >
                          Available Now
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResponse(request.id, '15min')}
                        >
                          In 15 min
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResponse(request.id, '30min')}
                        >
                          In 30 min
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResponse(request.id, '60min')}
                        >
                          In 1 hour
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sent Requests</CardTitle>
          <CardDescription>Your call requests to family members</CardDescription>
        </CardHeader>
        <CardContent>
          {outgoingRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No sent requests
            </div>
          ) : (
            <div className="space-y-3">
              {outgoingRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3>To: Contact</h3>
                          <Badge variant="outline">
                            <span className="mr-1">{platformIcons[request.platform]}</span>
                            {request.platform}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{request.message}</p>
                        
                        {request.note && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
                            <div className="flex items-start gap-2">
                              <MessageCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <p className="text-gray-700 italic">
                                "{request.note}"
                              </p>
                            </div>
                          </div>
                        )}
                        
                        <p className="text-gray-400">
                          {formatTimestamp(request.timestamp)}
                        </p>
                      </div>
                      {request.response ? (
                        <Badge variant="outline" className="bg-green-50">
                          <Clock className="w-3 h-3 mr-1" />
                          {request.response === 'now' ? 'Now' : `In ${request.response}`}
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          Waiting...
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
