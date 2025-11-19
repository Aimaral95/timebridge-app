export type Language = 'en' | 'ru' | 'tr' | 'kz';

export const translations = {
  en: {
    // App name
    appName: 'timeBridge',
    tagline: 'Connect with family across time zones',
    stayConnected: 'Stay connected across time zones',

    // Auth
    signIn: 'Sign In',
    signInDescription: 'Sign in with your email or phone number to get started',
    email: 'Email',
    emailAddress: 'Email Address',
    phone: 'Phone',
    phoneNumber: 'Phone Number',
    yourName: 'Your Name',
    enterName: 'Enter your name',
    enterEmail: 'you@example.com',
    enterPhone: '+1 (555) 000-0000',
    signInWithEmail: 'Sign In with Email',
    signInWithPhone: 'Sign In with Phone',
    autoDetected: 'Auto-detected',

    // Header
    myAccount: 'My Account',
    logout: 'Logout',
    language: 'Language',

    // Status
    yourStatus: 'Your Status',
    currentStatus: 'Current Status',
    free: 'Free',
    busy: 'Busy',
    sleeping: 'Sleeping',
    inClass: 'In Class',
    quietHours: 'Quiet Hours',
    start: 'Start',
    end: 'End',

    // Time & Weather
    currentTime: 'Current Time',
    daytime: 'Daytime',
    nighttime: 'Nighttime',

    // Tabs
    family: 'Family',
    availability: 'Availability',
    schedule: 'Schedule',
    requests: 'Requests',
    privacy: 'Privacy',

    // Family List
    familyContacts: 'Family & Contacts',
    manageFamilyDescription: 'Manage your family members and contacts',
    addContact: 'Add Contact',
    contacts: 'Contacts',
    pending: 'Pending',
    noContactsYet: 'No contacts yet. Add your first family member to get started!',
    noPendingRequests: 'No pending requests',
    requestCall: 'Request Call',
    accept: 'Accept',
    decline: 'Decline',

    // Add Contact Dialog
    addNewContact: 'Add New Contact',
    sendShareRequest: 'Send a share request to a family member or friend',
    name: 'Name',
    optional: 'Optional',
    sendRequest: 'Send Share Request',

    // Call Request Dialog
    requestACall: 'Request a Call',
    sendCallRequestTo: 'Send a call request to',
    contactVia: 'Contact via',
    whatsApp: 'WhatsApp',
    instagram: 'Instagram',
    facebook: 'Facebook',
    phoneCall: 'Phone Call',
    videoCall: 'Video Call',
    message: 'Message',
    canWeTalk: 'Can we talk?',
    warmNote: 'Warm Note',
    warmNoteOptional: 'Warm Note (Optional)',
    warmNotePlaceholder: 'Add a personal note to let them know what you\'d like to discuss...',
    warmNoteHint: 'Let them know why you\'d like to connect - share what\'s on your mind!',
    sendCallRequest: 'Send Request',

    // Call Requests Panel
    incomingRequests: 'Incoming Requests',
    incomingRequestsDescription: 'Call requests from your family members',
    sentRequests: 'Sent Requests',
    sentRequestsDescription: 'Your call requests to family members',
    noIncomingRequests: 'No incoming requests',
    noSentRequests: 'No sent requests',
    availableNow: 'Available Now',
    in15min: 'In 15 min',
    in30min: 'In 30 min',
    in1hour: 'In 1 hour',
    waiting: 'Waiting...',
    to: 'To',

    // Schedule
    weeklySchedule: 'Weekly Schedule',
    manageScheduleDescription: 'Manage your recurring weekly activities',
    import: 'Import',
    addBlock: 'Add Block',
    noScheduleBlocks: 'No schedule blocks yet. Add your first recurring activity or import from your calendar!',
    
    // Import Calendar
    importCalendar: 'Import Calendar',
    importCalendarDescription: 'Sync your schedule from Google Calendar or Apple Calendar',
    calendarIntegration: 'Calendar Integration',
    calendarIntegrationDescription: 'Connect your calendar to automatically import your events and keep your schedule up to date.',
    importFromGoogle: 'Import from Google Calendar',
    importFromApple: 'Import from Apple Calendar',
    howItWorks: 'How it works:',
    calendarStep1: 'Connect your calendar account',
    calendarStep2: 'Select which calendars to sync',
    calendarStep3: 'Your recurring events will be imported automatically',
    calendarStep4: 'Updates sync in real-time',

    // Add Schedule Block
    addScheduleBlock: 'Add Schedule Block',
    addScheduleBlockDescription: 'Create a recurring weekly time block',
    title: 'Title',
    titlePlaceholder: 'e.g., Math Class',
    dayOfWeek: 'Day of Week',
    startTime: 'Start Time',
    endTime: 'End Time',
    color: 'Color',

    // Days
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',

    // Group Availability
    groupAvailability: 'Group Availability',
    groupAvailabilityDescription: 'Find the best time to connect with multiple family members',
    selectFamilyMembers: 'Select Family Members',
    sameCity: 'Same City',
    activityType: 'Activity Type',
    inPersonMeeting: 'In-Person Meeting',
    suggestedTimeSlots: 'Suggested Time Slots',
    suggestedTimeSlotsDescription: 'Based on everyone\'s availability and time zones',
    everyoneFree: 'Everyone Free!',
    duration: 'Duration',
    peopleAvailable: 'people available',
    scheduleButton: 'Schedule',
    selectedContacts: 'Selected Contacts:',
    perfectForInPerson: 'Perfect for In-Person!',
    personIn: 'person is',
    peopleIn: 'people are',
    noContactsInCity: 'No contacts in your city',
    noContactsInCityDescription: 'None of the selected contacts are currently in',
    considerVideoCall: 'Consider a video call instead!',
    selectContactsPrompt: 'Select contacts to see suggested meeting times',

    // Privacy Settings
    privacyControls: 'Privacy Controls',
    privacyControlsDescription: 'Control what information you share with each contact',
    noContactsPrivacy: 'No contacts to manage privacy settings for',
    timeWeather: 'Time & Weather',
    timeWeatherDescription: 'Share your current time and weather information',
    availabilityStatus: 'Availability Status',
    availabilityStatusDescription: 'Share your current availability (Free, Busy, etc.)',
    scheduleBlocks: 'Schedule Blocks',
    scheduleBlocksDescription: 'Share your weekly schedule and activities',

    // Common
    of: 'of',
    now: 'Now',
  },
  ru: {
    // App name
    appName: 'timeBridge',
    tagline: 'Связь с семьёй через часовые пояса',
    stayConnected: 'Оставайтесь на связи через часовые пояса',

    // Auth
    signIn: 'Войти',
    signInDescription: 'Войдите с помощью электронной почты или телефона, чтобы начать',
    email: 'Email',
    emailAddress: 'Адрес электронной почты',
    phone: 'Телефон',
    phoneNumber: 'Номер телефона',
    yourName: 'Ваше имя',
    enterName: 'Введите ваше имя',
    enterEmail: 'you@example.com',
    enterPhone: '+7 (900) 000-00-00',
    signInWithEmail: 'Войти через Email',
    signInWithPhone: 'Войти через телефон',
    autoDetected: 'Автоопределено',

    // Header
    myAccount: 'Мой аккаунт',
    logout: 'Выйти',
    language: 'Язык',

    // Status
    yourStatus: 'Ваш статус',
    currentStatus: 'Текущий статус',
    free: 'Свободен',
    busy: 'Занят',
    sleeping: 'Сплю',
    inClass: 'На занятии',
    quietHours: 'Тихие часы',
    start: 'Начало',
    end: 'Конец',

    // Time & Weather
    currentTime: 'Текущее время',
    daytime: 'День',
    nighttime: 'Ночь',

    // Tabs
    family: 'Семья',
    availability: 'Доступность',
    schedule: 'Расписание',
    requests: 'Запросы',
    privacy: 'Приватность',

    // Family List
    familyContacts: 'Семья и контакты',
    manageFamilyDescription: 'Управление членами семьи и контактами',
    addContact: 'Добавить контакт',
    contacts: 'Контакты',
    pending: 'Ожидание',
    noContactsYet: 'Пока нет контактов. Добавьте первого члена семьи!',
    noPendingRequests: 'Нет ожидающих запросов',
    requestCall: 'Запросить звонок',
    accept: 'Принять',
    decline: 'Отклонить',

    // Add Contact Dialog
    addNewContact: 'Добавить новый контакт',
    sendShareRequest: 'Отправить запрос на обмен информацией члену семьи или другу',
    name: 'Имя',
    optional: 'Опционально',
    sendRequest: 'Отправить запрос',

    // Call Request Dialog
    requestACall: 'Запросить звонок',
    sendCallRequestTo: 'Отправить запрос на звонок',
    contactVia: 'Связаться через',
    whatsApp: 'WhatsApp',
    instagram: 'Instagram',
    facebook: 'Facebook',
    phoneCall: 'Телефонный звонок',
    videoCall: 'Видеозвонок',
    message: 'Сообщение',
    canWeTalk: 'Можем поговорить?',
    warmNote: 'Теплое сообщение',
    warmNoteOptional: 'Теплое сообщение (опционально)',
    warmNotePlaceholder: 'Добавьте личное сообщение, чтобы сообщить, о чем вы хотели бы поговорить...',
    warmNoteHint: 'Сообщите им, почему вы хотели бы пообщаться - поделитесь тем, что у вас на уме!',
    sendCallRequest: 'Отправить запрос',

    // Call Requests Panel
    incomingRequests: 'Входящие запросы',
    incomingRequestsDescription: 'Запросы на звонок от членов вашей семьи',
    sentRequests: 'Отправленные запросы',
    sentRequestsDescription: 'Ваши запросы на звонок членам семьи',
    noIncomingRequests: 'Нет входящих запросов',
    noSentRequests: 'Нет отправленных запросов',
    availableNow: 'Доступен сейчас',
    in15min: 'Через 15 мин',
    in30min: 'Через 30 мин',
    in1hour: 'Через 1 час',
    waiting: 'Ожидание...',
    to: 'Кому',

    // Schedule
    weeklySchedule: 'Недельное расписание',
    manageScheduleDescription: 'Управление регулярными недельными мероприятиями',
    import: 'Импорт',
    addBlock: 'Добавить блок',
    noScheduleBlocks: 'Пока нет блоков расписания. Добавьте первое повторяющееся мероприятие или импортируйте из календаря!',
    
    // Import Calendar
    importCalendar: 'Импорт календаря',
    importCalendarDescription: 'Синхронизируйте расписание из Google Calendar или Apple Calendar',
    calendarIntegration: 'Интеграция календаря',
    calendarIntegrationDescription: 'Подключите свой календарь для автоматического импорта событий и обновления расписания.',
    importFromGoogle: 'Импорт из Google Calendar',
    importFromApple: 'Импорт из Apple Calendar',
    howItWorks: 'Как это работает:',
    calendarStep1: 'Подключите учетную запись календаря',
    calendarStep2: 'Выберите календари для синхронизации',
    calendarStep3: 'Ваши повторяющиеся события будут импортированы автоматически',
    calendarStep4: 'Обновления синхронизируются в реальном времени',

    // Add Schedule Block
    addScheduleBlock: 'Добавить блок расписания',
    addScheduleBlockDescription: 'Создать повторяющийся недельный блок времени',
    title: 'Название',
    titlePlaceholder: 'например, Математика',
    dayOfWeek: 'День недели',
    startTime: 'Время начала',
    endTime: 'Время окончания',
    color: 'Цвет',

    // Days
    sunday: 'Воскресенье',
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    saturday: 'Суббота',

    // Group Availability
    groupAvailability: 'Групповая доступность',
    groupAvailabilityDescription: 'Найдите лучшее время для связи с несколькими членами семьи',
    selectFamilyMembers: 'Выберите членов семьи',
    sameCity: 'Тот же город',
    activityType: 'Тип активности',
    inPersonMeeting: 'Личная встреча',
    suggestedTimeSlots: 'Предлагаемые временные слоты',
    suggestedTimeSlotsDescription: 'На основе доступности и часовых поясов всех',
    everyoneFree: 'Все свободны!',
    duration: 'Длительность',
    peopleAvailable: 'человек доступно',
    scheduleButton: 'Запланировать',
    selectedContacts: 'Выбранные контакты:',
    perfectForInPerson: 'Отлично для личной встречи!',
    personIn: 'человек в',
    peopleIn: 'человек в',
    noContactsInCity: 'Нет контактов в вашем городе',
    noContactsInCityDescription: 'Ни один из выбранных контактов сейчас не находится в',
    considerVideoCall: 'Рассмотрите видеозвонок!',
    selectContactsPrompt: 'Выберите контакты, чтобы увидеть предлагаемое время встреч',

    // Privacy Settings
    privacyControls: 'Настройки приватности',
    privacyControlsDescription: 'Управление информацией, которой вы делитесь с каждым контактом',
    noContactsPrivacy: 'Нет контактов для управления настройками приватности',
    timeWeather: 'Время и погода',
    timeWeatherDescription: 'Делиться текущим временем и информацией о погоде',
    availabilityStatus: 'Статус доступности',
    availabilityStatusDescription: 'Делиться текущей доступностью (Свободен, Занят и т.д.)',
    scheduleBlocks: 'Блоки расписания',
    scheduleBlocksDescription: 'Делиться недельным расписанием и мероприятиями',

    // Common
    of: 'из',
    now: 'Сейчас',
  },
  tr: {
    // App name
    appName: 'timeBridge',
    tagline: 'Zaman dilimlerinde aile ile bağlantı kurun',
    stayConnected: 'Zaman dilimlerinde bağlı kalın',

    // Auth
    signIn: 'Giriş Yap',
    signInDescription: 'Başlamak için e-posta veya telefon numaranızla giriş yapın',
    email: 'E-posta',
    emailAddress: 'E-posta Adresi',
    phone: 'Telefon',
    phoneNumber: 'Telefon Numarası',
    yourName: 'Adınız',
    enterName: 'Adınızı girin',
    enterEmail: 'you@example.com',
    enterPhone: '+90 (500) 000-00-00',
    signInWithEmail: 'E-posta ile Giriş',
    signInWithPhone: 'Telefon ile Giriş',
    autoDetected: 'Otomatik algılandı',

    // Header
    myAccount: 'Hesabım',
    logout: 'Çıkış Yap',
    language: 'Dil',

    // Status
    yourStatus: 'Durumunuz',
    currentStatus: 'Mevcut Durum',
    free: 'Müsait',
    busy: 'Meşgul',
    sleeping: 'Uyuyor',
    inClass: 'Derste',
    quietHours: 'Sessiz Saatler',
    start: 'Başlangıç',
    end: 'Bitiş',

    // Time & Weather
    currentTime: 'Şu Anki Zaman',
    daytime: 'Gündüz',
    nighttime: 'Gece',

    // Tabs
    family: 'Aile',
    availability: 'Müsaitlik',
    schedule: 'Program',
    requests: 'İstekler',
    privacy: 'Gizlilik',

    // Family List
    familyContacts: 'Aile ve Kişiler',
    manageFamilyDescription: 'Aile üyelerinizi ve kişilerinizi yönetin',
    addContact: 'Kişi Ekle',
    contacts: 'Kişiler',
    pending: 'Beklemede',
    noContactsYet: 'Henüz kişi yok. İlk aile üyenizi ekleyin!',
    noPendingRequests: 'Bekleyen istek yok',
    requestCall: 'Arama İste',
    accept: 'Kabul Et',
    decline: 'Reddet',

    // Add Contact Dialog
    addNewContact: 'Yeni Kişi Ekle',
    sendShareRequest: 'Bir aile üyesine veya arkadaşınıza paylaşım isteği gönderin',
    name: 'İsim',
    optional: 'İsteğe Bağlı',
    sendRequest: 'İstek Gönder',

    // Call Request Dialog
    requestACall: 'Arama İste',
    sendCallRequestTo: 'Arama isteği gönder',
    contactVia: 'İletişim yöntemi',
    whatsApp: 'WhatsApp',
    instagram: 'Instagram',
    facebook: 'Facebook',
    phoneCall: 'Telefon Araması',
    videoCall: 'Görüntülü Arama',
    message: 'Mesaj',
    canWeTalk: 'Konuşabilir miyiz?',
    warmNote: 'Samimi Not',
    warmNoteOptional: 'Samimi Not (İsteğe Bağlı)',
    warmNotePlaceholder: 'Ne hakkında konuşmak istediğinizi bildirmek için kişisel bir not ekleyin...',
    warmNoteHint: 'Neden bağlantı kurmak istediğinizi bildirin - aklınızda ne olduğunu paylaşın!',
    sendCallRequest: 'İstek Gönder',

    // Call Requests Panel
    incomingRequests: 'Gelen İstekler',
    incomingRequestsDescription: 'Aile üyelerinizden gelen arama istekleri',
    sentRequests: 'Gönderilen İstekler',
    sentRequestsDescription: 'Aile üyelerine gönderdiğiniz arama istekleri',
    noIncomingRequests: 'Gelen istek yok',
    noSentRequests: 'Gönderilen istek yok',
    availableNow: 'Şimdi Müsait',
    in15min: '15 dakika içinde',
    in30min: '30 dakika içinde',
    in1hour: '1 saat içinde',
    waiting: 'Bekleniyor...',
    to: 'Kime',

    // Schedule
    weeklySchedule: 'Haftalık Program',
    manageScheduleDescription: 'Tekrarlayan haftalık etkinliklerinizi yönetin',
    import: 'İçe Aktar',
    addBlock: 'Blok Ekle',
    noScheduleBlocks: 'Henüz program bloğu yok. İlk tekrarlayan etkinliğinizi ekleyin veya takviminizden içe aktarın!',
    
    // Import Calendar
    importCalendar: 'Takvim İçe Aktar',
    importCalendarDescription: 'Google Takvim veya Apple Takvim\'den programınızı senkronize edin',
    calendarIntegration: 'Takvim Entegrasyonu',
    calendarIntegrationDescription: 'Etkinliklerinizi otomatik olarak içe aktarmak ve programınızı güncel tutmak için takviminizi bağlayın.',
    importFromGoogle: 'Google Takvim\'den İçe Aktar',
    importFromApple: 'Apple Takvim\'den İçe Aktar',
    howItWorks: 'Nasıl çalışır:',
    calendarStep1: 'Takvim hesabınızı bağlayın',
    calendarStep2: 'Senkronize edilecek takvimleri seçin',
    calendarStep3: 'Tekrarlayan etkinlikleriniz otomatik olarak içe aktarılır',
    calendarStep4: 'Güncellemeler gerçek zamanlı olarak senkronize edilir',

    // Add Schedule Block
    addScheduleBlock: 'Program Bloğu Ekle',
    addScheduleBlockDescription: 'Tekrarlayan haftalık zaman bloğu oluşturun',
    title: 'Başlık',
    titlePlaceholder: 'örn., Matematik Dersi',
    dayOfWeek: 'Haftanın Günü',
    startTime: 'Başlangıç Saati',
    endTime: 'Bitiş Saati',
    color: 'Renk',

    // Days
    sunday: 'Pazar',
    monday: 'Pazartesi',
    tuesday: 'Salı',
    wednesday: 'Çarşamba',
    thursday: 'Perşembe',
    friday: 'Cuma',
    saturday: 'Cumartesi',

    // Group Availability
    groupAvailability: 'Grup Müsaitliği',
    groupAvailabilityDescription: 'Birden fazla aile üyesiyle iletişim kurmak için en iyi zamanı bulun',
    selectFamilyMembers: 'Aile Üyelerini Seçin',
    sameCity: 'Aynı Şehir',
    activityType: 'Etkinlik Türü',
    inPersonMeeting: 'Yüz Yüze Görüşme',
    suggestedTimeSlots: 'Önerilen Zaman Dilimleri',
    suggestedTimeSlotsDescription: 'Herkesin müsaitliği ve zaman dilimlerine göre',
    everyoneFree: 'Herkes Müsait!',
    duration: 'Süre',
    peopleAvailable: 'kişi müsait',
    scheduleButton: 'Planla',
    selectedContacts: 'Seçilen Kişiler:',
    perfectForInPerson: 'Yüz Yüze Görüşme İçin Mükemmel!',
    personIn: 'kişi',
    peopleIn: 'kişi',
    noContactsInCity: 'Şehrinizde kişi yok',
    noContactsInCityDescription: 'Seçilen kişilerin hiçbiri şu anda şurada değil',
    considerVideoCall: 'Bunun yerine görüntülü arama düşünün!',
    selectContactsPrompt: 'Önerilen toplantı zamanlarını görmek için kişileri seçin',

    // Privacy Settings
    privacyControls: 'Gizlilik Ayarları',
    privacyControlsDescription: 'Her kişiyle hangi bilgileri paylaşacağınızı kontrol edin',
    noContactsPrivacy: 'Gizlilik ayarlarını yönetecek kişi yok',
    timeWeather: 'Saat ve Hava Durumu',
    timeWeatherDescription: 'Mevcut saatinizi ve hava durumu bilgilerinizi paylaşın',
    availabilityStatus: 'Müsaitlik Durumu',
    availabilityStatusDescription: 'Mevcut müsaitliğinizi paylaşın (Müsait, Meşgul vb.)',
    scheduleBlocks: 'Program Blokları',
    scheduleBlocksDescription: 'Haftalık programınızı ve etkinliklerinizi paylaşın',

    // Common
    of: '/',
    now: 'Şimdi',
  },
  kz: {
    // App name
    appName: 'timeBridge',
    tagline: 'Уақыт белдеулері арқылы отбасымен байланыста болыңыз',
    stayConnected: 'Уақыт белдеулері арқылы байланыста болыңыз',

    // Auth
    signIn: 'Кіру',
    signInDescription: 'Бастау үшін электрондық пошта немесе телефон нөмірі арқылы кіріңіз',
    email: 'Email',
    emailAddress: 'Электрондық пошта мекенжайы',
    phone: 'Телефон',
    phoneNumber: 'Телефон нөмірі',
    yourName: 'Сіздің атыңыз',
    enterName: 'Атыңызды енгізіңіз',
    enterEmail: 'you@example.com',
    enterPhone: '+7 (700) 000-00-00',
    signInWithEmail: 'Email арқылы кіру',
    signInWithPhone: 'Телефон арқылы кіру',
    autoDetected: 'Автоматты анықталды',

    // Header
    myAccount: 'Менің аккаунтым',
    logout: 'Шығу',
    language: 'Тіл',

    // Status
    yourStatus: 'Сіздің мәртебеңіз',
    currentStatus: 'Ағымдағы мәртебе',
    free: 'Бос',
    busy: 'Бос емес',
    sleeping: 'Ұйықтап жатыр',
    inClass: 'Сабақта',
    quietHours: 'Тыныш сағаттар',
    start: 'Басталуы',
    end: 'Аяқталуы',

    // Time & Weather
    currentTime: 'Ағымдағы уақыт',
    daytime: 'Күндіз',
    nighttime: 'Түн',

    // Tabs
    family: 'Отбасы',
    availability: 'Қолжетімділік',
    schedule: 'Кесте',
    requests: 'Сұраулар',
    privacy: 'Құпиялық',

    // Family List
    familyContacts: 'Отбасы және байланыстар',
    manageFamilyDescription: 'Отбасы мүшелері мен байланыстарды басқару',
    addContact: 'Байланыс қосу',
    contacts: 'Байланыстар',
    pending: 'Күтуде',
    noContactsYet: 'Әзірге байланыс жоқ. Бірінші отбасы мүшесін қосыңыз!',
    noPendingRequests: 'Күтіп тұрған сұраулар жоқ',
    requestCall: 'Қоңырау сұрау',
    accept: 'Қабылдау',
    decline: 'Бас тарту',

    // Add Contact Dialog
    addNewContact: 'Жаңа байланыс қосу',
    sendShareRequest: 'Отбасы мүшесіне немесе досқа бөлісу сұрауын жіберу',
    name: 'Аты',
    optional: 'Қосымша',
    sendRequest: 'Сұрау жіберу',

    // Call Request Dialog
    requestACall: 'Қоңырау сұрау',
    sendCallRequestTo: 'Қоңырау сұрауын жіберу',
    contactVia: 'Байланысу әдісі',
    whatsApp: 'WhatsApp',
    instagram: 'Instagram',
    facebook: 'Facebook',
    phoneCall: 'Телефон қоңырауы',
    videoCall: 'Бейне қоңырау',
    message: 'Хабарлама',
    canWeTalk: 'Сөйлесе аламыз ба?',
    warmNote: 'Жылы хат',
    warmNoteOptional: 'Жылы хат (Қосымша)',
    warmNotePlaceholder: 'Не туралы сөйлескіңіз келетінін білдіру үшін жеке хат қосыңыз...',
    warmNoteHint: 'Неге байланысқыңыз келетінін айтыңыз - ойыңызбен бөлісіңіз!',
    sendCallRequest: 'Сұрау жіберу',

    // Call Requests Panel
    incomingRequests: 'Кіріс сұраулар',
    incomingRequestsDescription: 'Отбасы мүшелерінен келген қоңырау сұраулары',
    sentRequests: 'Жіберілген сұраулар',
    sentRequestsDescription: 'Отбасы мүшелеріне жіберілген қоңырау сұрауларыңыз',
    noIncomingRequests: 'Кіріс сұраулар жоқ',
    noSentRequests: 'Жіберілген сұраулар жоқ',
    availableNow: 'Қазір қолжетімді',
    in15min: '15 минуттан кейін',
    in30min: '30 минуттан кейін',
    in1hour: '1 сағаттан кейін',
    waiting: 'Күтуде...',
    to: 'Кімге',

    // Schedule
    weeklySchedule: 'Апталық кесте',
    manageScheduleDescription: 'Қайталанатын апталық іс-шараларды басқару',
    import: 'Импорт',
    addBlock: 'Блок қосу',
    noScheduleBlocks: 'Әзірге кесте блоктары жоқ. Бірінші қайталанатын іс-шараны қосыңыз немесе күнтізбеден импорттаңыз!',
    
    // Import Calendar
    importCalendar: 'Күнтізбені импорттау',
    importCalendarDescription: 'Google Calendar немесе Apple Calendar арқылы кестені синхрондау',
    calendarIntegration: 'Күнтізбе интеграциясы',
    calendarIntegrationDescription: 'Оқиғаларды автоматты түрде импорттау және кестені жаңарту үшін күнтізбені қосыңыз.',
    importFromGoogle: 'Google Calendar-дан импорттау',
    importFromApple: 'Apple Calendar-дан импорттау',
    howItWorks: 'Қалай жұмыс істейді:',
    calendarStep1: 'Күнтізбе есептік жазбаңызды қосыңыз',
    calendarStep2: 'Синхрондауға күнтізбелерді таңдаңыз',
    calendarStep3: 'Қайталанатын оқиғаларыңыз автоматты түрде импортталады',
    calendarStep4: 'Жаңартулар нақты уақытта синхрондалады',

    // Add Schedule Block
    addScheduleBlock: 'Кесте блогын қосу',
    addScheduleBlockDescription: 'Қайталанатын апталық уақыт блогын жасау',
    title: 'Атауы',
    titlePlaceholder: 'мысалы, Математика сабағы',
    dayOfWeek: 'Апта күні',
    startTime: 'Басталу уақыты',
    endTime: 'Аяқталу уақыты',
    color: 'Түс',

    // Days
    sunday: 'Жексенбі',
    monday: 'Дүйсенбі',
    tuesday: 'Сейсенбі',
    wednesday: 'Сәрсенбі',
    thursday: 'Бейсенбі',
    friday: 'Жұма',
    saturday: 'Сенбі',

    // Group Availability
    groupAvailability: 'Топтық қолжетімділік',
    groupAvailabilityDescription: 'Бірнеше отбасы мүшелерімен байланысу үшін ең жақсы уақытты табыңыз',
    selectFamilyMembers: 'Отбасы мүшелерін таңдаңыз',
    sameCity: 'Бірдей қала',
    activityType: 'Іс-шара түрі',
    inPersonMeeting: 'Жеке кездесу',
    suggestedTimeSlots: 'Ұсынылған уақыт аралықтары',
    suggestedTimeSlotsDescription: 'Барлық адамдардың қолжетімділігі мен уақыт белдеулері негізінде',
    everyoneFree: 'Барлығы бос!',
    duration: 'Ұзақтығы',
    peopleAvailable: 'адам қолжетімді',
    scheduleButton: 'Жоспарлау',
    selectedContacts: 'Таңдалған байланыстар:',
    perfectForInPerson: 'Жеке кездесу үшін тамаша!',
    personIn: 'адам',
    peopleIn: 'адам',
    noContactsInCity: 'Қалаңызда байланыстар жоқ',
    noContactsInCityDescription: 'Таңдалған байланыстардың ешқайсысы қазір мұнда жоқ',
    considerVideoCall: 'Оның орнына бейне қоңырауды қарастырыңыз!',
    selectContactsPrompt: 'Ұсынылған кездесу уақыттарын көру үшін байланыстарды таңдаңыз',

    // Privacy Settings
    privacyControls: 'Құпиялық баптаулары',
    privacyControlsDescription: 'Әрбір байланыспен бөлісетін ақпаратты басқару',
    noContactsPrivacy: 'Құпиялық баптауларын басқаруға байланыстар жоқ',
    timeWeather: 'Уақыт және ауа райы',
    timeWeatherDescription: 'Ағымдағы уақытыңыз бен ауа райы туралы ақпаратты бөлісу',
    availabilityStatus: 'Қолжетімділік мәртебесі',
    availabilityStatusDescription: 'Ағымдағы қолжетімділікті бөлісу (Бос, Бос емес және т.б.)',
    scheduleBlocks: 'Кесте блоктары',
    scheduleBlocksDescription: 'Апталық кесте мен іс-шараларды бөлісу',

    // Common
    of: 'ның',
    now: 'Қазір',
  },
};

export function getTranslation(lang: Language) {
  return translations[lang] || translations.en;
}
