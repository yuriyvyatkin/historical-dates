export interface DetailsItem {
  year: number;
  description: string;
}

export interface DataItem {
  id: number;
  category?: string;
  yearsInterval: number[];
  details: DetailsItem[];
}

export const data = [
  {
    id: 1,
    category: 'технологии',
    yearsInterval: [1980, 1986],
    details: [
      {
        year: 1980,
        description:
          'Sinclair Research выпускает домашний компьютер ZX80.',
      },
      {
        year: 1982,
        description:
          'Появился домашний компьютер ZX Spectrum, выпущенный компанией Sinclair Research.',
      },
      {
        year: 1983,
        description:
          'Выпущен текстовый процессор, программа Multi-Tool Word, которая вскоре станет Microsoft Word.',
      },
      {
        year: 1986,
        description:
          'IBM представляет PC Convertible, первый портативный компьютер.',
      },
    ],
  },
  {
    id: 2,
    category: 'кино',
    yearsInterval: [1987, 1991],
    details: [
      {
        year: 1987,
        description:
          '«Хищник»/Predator, США (реж. Джон Мактиран).',
      },
      {
        year: 1988,
        description:
          '«Кто подставил кролика Роджера»/Who framed Roger rabbit, США (реж. Роберт Земекис).',
      },
      {
        year: 1989,
        description:
          '«Назад в будущее 2»/Back to the future 2, США (реж. Роберт Земекис).',
      },
      {
        year: 1990,
        description:
          '«Крепкий орешек 2»/Die hard 2, США (реж. Ренни Харлин).',
      },
      {
        year: 1991,
        description:
          'Семейка Аддамс»/The Addams family, США (реж. Барри Зонненфельд).',
      },
    ],
  },
  {
    id: 3,
    category: 'литература',
    yearsInterval: [1992, 1997],
    details: [
      {
        year: 1992,
        description:
          'Нобелевская премия по литературе — Дерек Уолкотт, «За блестящий образец карибского эпоса в 64 разделах».',
      },
      {
        year: 1994,
        description:
          '«Бессоница» — роман Стивена Кинга.',
      },
      {
        year: 1995,
        description:
          'Нобелевская премия по литературе — Шеймас Хини.',
      },
      {
        year: 1997,
        description:
          '«Гарри Поттер и философский камень» — Джоан Роулинг.',
      },
    ],
  },
  {
    id: 4,
    category: '',
    yearsInterval: [1999, 2004],
    details: [
      {
        year: 1999,
        description:
          'Премьера балета «Золушка» в постановке Жан-Кристофа Майо, сценография Эрнеста Пиньона.',
      },
      {
        year: 2000,
        description:
          'Возобновлено издание журнала «Театр».',
      },
      {
        year: 2002,
        description:
          'Премьера трилогии Тома Стоппарда «Берег утопии», Королевский национальный театр, Лондон.',
      },
      {
        year: 2003,
        description:
          'В Венеции отреставрировали театр «Ла Фениче», пострадавший при пожаре.',
      },
    ],
  },
  {
    id: 5,
    category: 'спорт',
    yearsInterval: [2006, 2014],
    details: [
      {
        year: 2005,
        description:
          'Баскетбольный клуб ЦСКА стал победителем национального первенства России.',
      },
      {
        year: 2008,
        description:
          'С 8 по 24 августа в Пекине прошли 29-е летние Олимпийские игры.',
      },
      {
        year: 2010,
        description:
          '13-28 февраля в Ванкувере: Зимние Олимпийские игры 2010 года.',
      },
      {
        year: 2012,
        description:
          '2 августа — Летние Олимпийские игры.',
      },
      {
        year: 2014,
        description:
          'XXII зимние Олимпийские игры (Сочи, Россия).',
      },
    ],
  },
  {
    id: 6,
    category: 'наука',
    yearsInterval: [2015, 2022],
    details: [
      {
        year: 2015,
        description:
          '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды.',
      },
      {
        year: 2016,
        description:
          'Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11.',
      },
      {
        year: 2017,
        description:
          'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi.',
      },
      {
        year: 2018,
        description:
          'Старт космического аппарата Solar Probe Plus, предназначенного для изучения Солнца.',
      },
      {
        year: 2019,
        description:
          'Google объявил о создании 53-кубитного квантового компьютера.',
      },
      {
        year: 2020,
        description:
          'Корабль Crew Dragon вернулся на Землю, после первого пилотного полёта.',
      },
    ],
  },
];
