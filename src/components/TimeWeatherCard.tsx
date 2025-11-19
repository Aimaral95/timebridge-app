import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Clock, MapPin, Sun, Moon, Cloud, CloudRain, CloudSnow } from 'lucide-react';
import { Language, getTranslation } from '../utils/translations';

interface TimeWeatherCardProps {
  name: string;
  city: string;
  country: string;
  timezone: string;
  language: Language;
}

export function TimeWeatherCard({ name, city, country, timezone, language }: TimeWeatherCardProps) {
  const t = getTranslation(language);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temp: 72,
    condition: 'Partly Cloudy',
    icon: 'cloud',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const hour = parseInt(new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    hour12: false,
  }).format(currentTime));

  const isDaytime = hour >= 6 && hour < 18;

  const WeatherIcon = () => {
    switch (weather.icon) {
      case 'sun':
        return <Sun className="w-12 h-12 text-yellow-500" />;
      case 'moon':
        return <Moon className="w-12 h-12 text-indigo-400" />;
      case 'cloud':
        return <Cloud className="w-12 h-12 text-gray-400" />;
      case 'rain':
        return <CloudRain className="w-12 h-12 text-blue-400" />;
      case 'snow':
        return <CloudSnow className="w-12 h-12 text-blue-200" />;
      default:
        return <Cloud className="w-12 h-12 text-gray-400" />;
    }
  };

  return (
    <Card className={isDaytime ? 'bg-gradient-to-br from-blue-50 to-cyan-50' : 'bg-gradient-to-br from-indigo-900 to-purple-900 text-white'}>
      <CardHeader className="pb-3 md:pb-6">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <Clock className="w-4 h-4 md:w-5 md:h-5" />
          {name}'s {t.currentTime}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className={`text-2xl md:text-4xl ${isDaytime ? '' : 'text-white'} mb-1`}>
              {formatter.format(currentTime)}
            </div>
            <p className={`text-sm md:text-base ${isDaytime ? 'text-gray-600' : 'text-gray-300'}`}>
              {dateFormatter.format(currentTime)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isDaytime ? (
              <Sun className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 md:w-8 md:h-8 text-yellow-200" />
            )}
            <span className={`text-sm md:text-base ${isDaytime ? 'text-gray-700' : 'text-gray-200'}`}>
              {isDaytime ? t.daytime : t.nighttime}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 md:pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-sm md:text-base">{city}, {country}</span>
          </div>
          <div className="flex items-center gap-3">
            <WeatherIcon />
            <div>
              <div className="text-lg md:text-xl">{weather.temp}°F</div>
              <p className={`text-xs md:text-sm ${isDaytime ? 'text-gray-600' : 'text-gray-300'}`}>
                {weather.condition}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}