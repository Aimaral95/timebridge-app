import { useState } from 'react';
import { ScheduleBlock } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, Trash2, Calendar, Upload, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface ScheduleProps {
  blocks: ScheduleBlock[];
  onAddBlock: (block: Omit<ScheduleBlock, 'id'>) => void;
  onDeleteBlock: (blockId: string) => void;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const COLORS = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Pink', value: '#ec4899' },
];

export function Schedule({ blocks, onAddBlock, onDeleteBlock }: ScheduleProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [newBlock, setNewBlock] = useState({
    day: 1,
    startTime: '09:00',
    endTime: '10:00',
    title: '',
    color: '#3b82f6',
  });

  const handleAddBlock = () => {
    if (newBlock.title) {
      onAddBlock(newBlock);
      setNewBlock({
        day: 1,
        startTime: '09:00',
        endTime: '10:00',
        title: '',
        color: '#3b82f6',
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleImportCalendar = (source: 'google' | 'apple') => {
    // In a real implementation, this would trigger OAuth flow
    console.log(`Importing from ${source} Calendar`);
    alert(`Calendar import from ${source} will be available in the full version. For now, please add events manually.`);
    setIsImportDialogOpen(false);
  };

  // Group blocks by day
  const blocksByDay = blocks.reduce((acc, block) => {
    if (!acc[block.day]) {
      acc[block.day] = [];
    }
    acc[block.day].push(block);
    return acc;
  }, {} as Record<number, ScheduleBlock[]>);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>Manage your recurring weekly activities</CardDescription>
          </div>
          <div className="flex gap-2">
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import Calendar</DialogTitle>
                  <DialogDescription>
                    Sync your schedule from Google Calendar or Apple Calendar
                  </DialogDescription>
                </DialogHeader>
                
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Calendar Integration</AlertTitle>
                  <AlertDescription>
                    Connect your calendar to automatically import your events and keep your schedule up to date.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <Button 
                    onClick={() => handleImportCalendar('google')} 
                    className="w-full"
                    variant="outline"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Import from Google Calendar
                  </Button>
                  <Button 
                    onClick={() => handleImportCalendar('apple')} 
                    className="w-full"
                    variant="outline"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Import from Apple Calendar
                  </Button>
                </div>

                <div className="text-gray-600 p-3 bg-gray-50 rounded-lg">
                  <p className="mb-2">
                    <strong>How it works:</strong>
                  </p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Connect your calendar account</li>
                    <li>Select which calendars to sync</li>
                    <li>Your recurring events will be imported automatically</li>
                    <li>Updates sync in real-time</li>
                  </ol>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Block
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Schedule Block</DialogTitle>
                  <DialogDescription>
                    Create a recurring weekly time block
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="block-title">Title</Label>
                    <Input
                      id="block-title"
                      placeholder="e.g., Math Class"
                      value={newBlock.title}
                      onChange={(e) => setNewBlock({ ...newBlock, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="block-day">Day of Week</Label>
                    <Select
                      value={newBlock.day.toString()}
                      onValueChange={(value) => setNewBlock({ ...newBlock, day: parseInt(value) })}
                    >
                      <SelectTrigger id="block-day">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DAYS.map((day, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="block-start">Start Time</Label>
                      <Input
                        id="block-start"
                        type="time"
                        value={newBlock.startTime}
                        onChange={(e) => setNewBlock({ ...newBlock, startTime: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="block-end">End Time</Label>
                      <Input
                        id="block-end"
                        type="time"
                        value={newBlock.endTime}
                        onChange={(e) => setNewBlock({ ...newBlock, endTime: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="block-color">Color</Label>
                    <Select
                      value={newBlock.color}
                      onValueChange={(value) => setNewBlock({ ...newBlock, color: value })}
                    >
                      <SelectTrigger id="block-color">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COLORS.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: color.value }}
                              />
                              {color.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddBlock} className="w-full">
                    Add Block
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {blocks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No schedule blocks yet. Add your first recurring activity or import from your calendar!
          </div>
        ) : (
          <div className="space-y-4">
            {DAYS.map((day, dayIndex) => {
              const dayBlocks = blocksByDay[dayIndex] || [];
              if (dayBlocks.length === 0) return null;
              
              return (
                <div key={dayIndex} className="space-y-2">
                  <h3 className="text-gray-700">{day}</h3>
                  <div className="space-y-2">
                    {dayBlocks.map((block) => (
                      <div
                        key={block.id}
                        className="flex items-center justify-between p-3 rounded-lg"
                        style={{ backgroundColor: `${block.color}15`, borderLeft: `4px solid ${block.color}` }}
                      >
                        <div>
                          <div className="mb-1">{block.title}</div>
                          <p className="text-gray-600">
                            {block.startTime} - {block.endTime}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteBlock(block.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
