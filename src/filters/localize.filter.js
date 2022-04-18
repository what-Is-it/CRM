import store from '../store'

const locales = {
  'ru-RU': {
    ProfileTitle: 'Профиль',
    Name: 'Имя',
    EnterName: 'Введите имя',
    Update: 'Обновить',
    Menu_Bill: 'Счет',
    Menu_History: 'История',
    Menu_Planning: 'Планирование',
    Menu_NewRecord: 'Новая запись',
    Menu_Categories: 'Категории',
    Route_Home: 'Главная',
    Route_History: 'История',
    Route_Planning: 'Планирование',
    Route_NewRecord: 'Новая запись',
    Route_Categories: 'Категории',
    Route_Profile: 'Профиль',
    Route_Login: 'Login',
    Route_Register: 'Register',
  },
  'en-US': {
    ProfileTitle: 'Profile',
    Name: 'Name',
    EnterName: 'Enter name',
    Update: 'Update',
    Menu_Bill: 'Bill',
    Menu_History: 'History',
    Menu_Planning: 'Planning',
    Menu_NewRecord: 'New Record',
    Menu_Categories: 'Categories',
    Route_Home: 'Home',
    Route_History: 'History',
    Route_Planning: 'Planning',
    Route_NewRecord: 'New Record',
    Route_Categories: 'Categories',
    Route_Profile: 'Profile',
    Route_Login: 'Login',
    Route_Register: 'Register',
  },
}

export default function localizeFilter(key) {
  const locale = store.getters.info.locale || 'ru-RU'
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}
