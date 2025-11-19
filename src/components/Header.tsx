import { Globe, LogOut, User as UserIcon, Languages } from 'lucide-react';
import { Button } from './ui/button';
import { User } from '../App';
import { Language, getTranslation } from '../utils/translations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Header({ user, onLogout, language, onLanguageChange }: HeaderProps) {
  const t = getTranslation(language);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-full">
              <Globe className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-indigo-900 text-lg md:text-2xl">{t.appName}</h1>
              <p className="text-gray-500 text-xs md:text-sm hidden sm:block">{t.stayConnected}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs md:text-sm">
                <UserIcon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">{user.name}</span>
                <span className="sm:hidden">{user.name.split(' ')[0]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t.myAccount}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <div className="flex flex-col text-xs md:text-sm">
                  <span>{user.email || user.phone}</span>
                  <span className="text-gray-500">
                    {user.city}, {user.country}
                  </span>
                  <span className="text-gray-500">{user.timezone}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Languages className="w-4 h-4 mr-2" />
                  {t.language}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => onLanguageChange('en')}>
                    English {language === 'en' && '✓'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onLanguageChange('ru')}>
                    Русский {language === 'ru' && '✓'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onLanguageChange('tr')}>
                    Türkçe {language === 'tr' && '✓'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onLanguageChange('kz')}>
                    Қазақша {language === 'kz' && '✓'}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                {t.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}