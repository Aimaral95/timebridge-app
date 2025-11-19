import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Circle, Moon } from 'lucide-react';
import { Language, getTranslation } from '../utils/translations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface AvailabilityStatusProps {
  status: 'Free' | 'Busy' | 'Sleeping' | 'In Class';
  onStatusChange: (status: 'Free' | 'Busy' | 'Sleeping' | 'In Class') => void;
  quietHours: { start: string; end: string };
  onQuietHoursChange: (quietHours: { start: string; end: string }) => void;
  language: Language;
}

export function AvailabilityStatus({
  status,
  onStatusChange,
  quietHours,
  onQuietHoursChange,
  language,
}: AvailabilityStatusProps) {
  const t = getTranslation(language);
  const statusMap = {
    Free: t.free,
    Busy: t.busy,
    Sleeping: t.sleeping,
    'In Class': t.inClass,
  };
  const statusColors = {
    Free: 'text-green-500',
    Busy: 'text-yellow-500',
    Sleeping: 'text-indigo-500',
    'In Class': 'text-red-500',
  };

  return (
    <Card>
      <CardHeader className="pb-3 md:pb-6">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <Circle className={`w-3 h-3 md:w-4 md:h-4 fill-current ${statusColors[status]}`} />
          {t.yourStatus}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4">
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm">{t.currentStatus}</Label>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger id="status" className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Free">
                <div className="flex items-center gap-2">
                  <Circle className="w-3 h-3 fill-green-500 text-green-500" />
                  {t.free}
                </div>
              </SelectItem>
              <SelectItem value="Busy">
                <div className="flex items-center gap-2">
                  <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  {t.busy}
                </div>
              </SelectItem>
              <SelectItem value="Sleeping">
                <div className="flex items-center gap-2">
                  <Circle className="w-3 h-3 fill-indigo-500 text-indigo-500" />
                  {t.sleeping}
                </div>
              </SelectItem>
              <SelectItem value="In Class">
                <div className="flex items-center gap-2">
                  <Circle className="w-3 h-3 fill-red-500 text-red-500" />
                  {t.inClass}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:space-y-3 pt-3 md:pt-4 border-t">
          <Label className="flex items-center gap-2 text-sm">
            <Moon className="w-3 h-3 md:w-4 md:h-4" />
            {t.quietHours}
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="quiet-start" className="text-xs md:text-sm">{t.start}</Label>
              <Input
                id="quiet-start"
                type="time"
                value={quietHours.start}
                onChange={(e) => onQuietHoursChange({ ...quietHours, start: e.target.value })}
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quiet-end" className="text-xs md:text-sm">{t.end}</Label>
              <Input
                id="quiet-end"
                type="time"
                value={quietHours.end}
                onChange={(e) => onQuietHoursChange({ ...quietHours, end: e.target.value })}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}