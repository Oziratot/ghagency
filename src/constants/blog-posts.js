import interviewTsegelnikMaxim from '../articles/interviews/tsegelnik-maxim.html';
import interviewLarshinGeorgi from '../articles/interviews/larshin-georgi.html';
// import eventsChlDraft2020 from '../articles/events/chl-draft-2020.html';
import usaAndCanadaJuniorLeagues from '../articles/usa-and-canada/junior-leagues.html';
// import eventsNahlPostponedSeason from '../articles/events/nahl-postponded-season.html';
// import eventsChlPostponedSeason from '../articles/events/chl-postponded-season.html';
import leaguesCanadaOhlJunior from '../articles/leagues-canada/ohl-junior-league-in-canada.html';
import leaguesCanadaGmhlJunior from '../articles/leagues-canada/gmhl-junior-league-in-canada.html';
import leaguesCanadaWhlJunior from '../articles/leagues-canada/whl-junior-league-in-canada.html';
// import eventsEhlSignedWithInstat from '../articles/events/ehl-signed-with-instat.html';
import leaguesCanadaQmjhlJunior from '../articles/leagues-canada/qmjhl-junior-league-in-canada.html';
import usaAndCanadaBillet from '../articles/usa-and-canada/billet-family-in-usa-and-canada.html';
import leaguesUsaUshlJunior from '../articles/leagues-usa/ushl-junior-league-in-usa.html';

export const CATS = {
  'leagues-usa': 'Хоккейные лиги США',
  'leagues-canada': 'Хоккейные лиги Канады',
  'usa-and-canada': 'Хоккей в США и Канаде',
  'career': 'Карьера в хоккее',
  // 'events': 'События',
  // 'interviews': 'Интервью',
};

const seoTitleByPostId = {
  'interview-maxim-tsegelnik': 'Интервью с Максимом Цегельником',
  'interview-georgi-larshin': 'Интервью с Егором Ларшиным',
  'chl-draft-2020': 'Импорт-драфт CHL-2020',
  'junior-leagues-usa-and-canada': 'Молодежные хоккейные лиги США и Канады',
  'nahl-postponded-season': 'NAHL планирует начать сезон 9 октября',
  'chl-postponded-season': 'Сезоны в WHL и QMJHL должны стартовать 1 декабря',
  'ohl-junior-league-in-canada': 'OHL — молодежная хоккейная лига в Канаде',
  'ehl-signed-with-instat': 'EHL заключила контракт с InStat',
  'gmhl-junior-league-in-canada': 'GMHL — хоккейная лига Канады для юниоров',
  'whl-junior-league-in-canada': 'WHL — молодежная хоккейная лига в Канаде',
  'qmjhl-junior-league-in-canada': 'QMJHL — хоккейная лига Квебека, Канада',
  'billet-family-in-usa-and-canada': 'Проживание игроков хоккейного агентства «GHA» за границей',
  'ushl-junior-league-in-usa': 'USHL - молодежная хоккейная лига в США',
};

const seoDescByPostId = {
  'interview-maxim-tsegelnik': 'Лучший бомбардир команды Cleveland Barons U18, лиги T1EHL, США',
  'interview-georgi-larshin': 'Хоккеист рассказал, как стал капитаном команды МХЛ после одного сезона игры в канадской лиге GMHL',
  'chl-draft-2020': 'Клубы задрафтовали 15 россиян',
  'junior-leagues-usa-and-canada': 'Статья о ведущих молодежных лигах США и Канады и их месте в общей структуре хоккея в Северной Америке. Вы также узнаете какие из этих лиг являются бесплатными для игроков и как в них попасть.',
  'nahl-postponded-season': 'Дивизионы могут стартовать в разные даты',
  'chl-postponded-season': 'Дата начала сезона в OHL под вопросом',
  'ohl-junior-league-in-canada': 'Хоккейная лига Онтарио (Ontario Hockey League, OHL) курируется Федерацией хоккея Канады (Hockey Canada) и состоит из 20 команд. Структура лиги копирует Национальную хоккейную лигу с поправкой на количество участников.',
  'ehl-signed-with-instat': 'Восточная хоккейная лига (EHL) заключила контракт с компанией InStat',
  'gmhl-junior-league-in-canada': 'GMHL - одна из самых популярных хоккейных лиг Канады для европейцев. Ежегодно десятки хоккеистов из стран России и СНГ выбирают ее в качестве стартовой точки для начала своей зарубежной карьеры.',
  'whl-junior-league-in-canada': 'Западная хоккейная лига (Western Hockey League, WHL) – одна из трех молодежных лиг Канады, входящая в Канадскую хоккейную лигу (Canadian Hockey League, CHL). В ней выступают команды с запада Канады, а также несколько клубов с северо-запада США.',
  'qmjhl-junior-league-in-canada': 'Главная молодежная хоккейная лига Квебека (англ: Quebec Major Junior Hockey League, QMJHL) – одна из трех основных молодежных лиг Северной Америки, которая входит в Канадскую хоккейную лигу (Canadian Hockey League, CHL).',
  'billet-family-in-usa-and-canada': 'Статья о быте игроков в юниорских и молодежных хоккейных лигах Северной Америки, стоимости проживания и прочих расходах хоккеистов. Типичном распорядок дня игроков, их тренировочная и учебная деятельность, досуг и отдых.',
  'ushl-junior-league-in-usa': 'USHL (United States Hockey League) – главная молодежная хоккейная лига США, вершина системы молодежного хоккея страны и самая престижная лига для молодых игроков. USHL открывает хоккеистам дорогу в высшие профессиональные лиги Северной Америки, такие как NHL и AHL.',
};

export const POSTS = [
  { id: 'interview-maxim-tsegelnik', date: '27.07.2020', cat: 'career', imgSrc: '/assets/img/blog/interviews/tsegelnik-maxim/intro.jpg', title: 'Интервью с Максимом Цегельником', subtitle: 'Лучший бомбардир команды Cleveland Barons U18, лиги T1EHL, США', shortContent: 'Лучший бомбардир команды Cleveland Barons U18, лиги T1EHL, США', content: interviewTsegelnikMaxim, seoTitle: seoTitleByPostId['interview-maxim-tsegelnik'], seoDesc: seoDescByPostId['interview-maxim-tsegelnik'] },
  // { id: 'chl-draft-2020', date: '17.07.2020', cat: 'events', imgSrc: '/assets/img/blog/events/chl-draft-2020/intro.jpg', title: 'Импорт-драфт CHL-2020', shortTitle: 'Импорт-драфт CHL', subtitle: 'Клубы задрафтовали 15&nbsp;россиян', shortContent: 'Клубы задрафтовали 15 россиян', content: eventsChlDraft2020, seoTitle: seoTitleByPostId['chl-draft-2020'], seoDesc: seoDescByPostId['chl-draft-2020'] },
  { id: 'junior-leagues-usa-and-canada', date: '05.08.2020', cat: 'usa-and-canada', imgSrc: '/assets/img/blog/usa-and-canada/junior-leagues/intro.png', title: 'Молодежные хоккейные лиги США&nbsp;и&nbsp;Канады', subtitle: 'Обзор лиг федераций хоккея США&nbsp;и&nbsp;Канады', shortContent: 'Обзор лиг федераций хоккея США&nbsp;и&nbsp;Канады', content: usaAndCanadaJuniorLeagues, seoTitle: seoTitleByPostId['junior-leagues-usa-and-canada'], seoDesc: seoDescByPostId['junior-leagues-usa-and-canada'] },
  // { id: 'nahl-postponded-season', date: '07.08.2020', cat: 'events', imgSrc: '/assets/img/blog/events/nahl-postponded-season/intro.png', title: 'NAHL планирует начать&nbsp;сезон&nbsp;9&nbsp;октября', subtitle: 'Дивизионы могут стартовать в разные&nbsp;даты', shortContent: 'Дивизионы могут стартовать в&nbsp;разные&nbsp;даты', content: eventsNahlPostponedSeason, seoTitle: seoTitleByPostId['nahl-postponded-season'], seoDesc: seoDescByPostId['nahl-postponded-season'] },
  // { id: 'chl-postponded-season', date: '09.08.2020', cat: 'events', imgSrc: '/assets/img/blog/events/chl-postponded-season/intro.png', title: 'Сезоны в WHL и QMJHL должны стартовать 1&nbsp;декабря', subtitle: 'Дата начала сезона в OHL под&nbsp;вопросом', shortContent: 'Дата начала сезона в OHL под&nbsp;вопросом', content: eventsChlPostponedSeason, seoTitle: seoTitleByPostId['chl-postponded-season'], seoDesc: seoDescByPostId['chl-postponded-season'] },
  { id: 'ohl-junior-league-in-canada', date: '12.08.2020', cat: 'leagues-canada', imgSrc: '/assets/img/blog/leagues-canada/ohl-junior-league-in-canada/intro.png', title: 'OHL - молодежная хоккейная лига в Канаде', subtitle: 'Обзор лиги - структура чемпионата, команды и игроки', shortContent: 'Обзор лиги - структура чемпионата, команды и игроки', content: leaguesCanadaOhlJunior, seoTitle: seoTitleByPostId['ohl-junior-league-in-canada'], seoDesc: seoDescByPostId['ohl-junior-league-in-canada'] },
  // { id: 'ehl-signed-with-instat', date: '14.08.2020', cat: 'events', imgSrc: '/assets/img/blog/events/ehl-signed-with-instat/intro.png', title: 'EHL заключила контракт с InStat', subtitle: 'Восточная хоккейная лига (EHL) заключила контракт с компанией InStat', shortContent: 'Восточная хоккейная лига (EHL) заключила контракт с компанией InStat', content: eventsEhlSignedWithInstat, seoTitle: seoTitleByPostId['ehl-signed-with-instat'], seoDesc: seoDescByPostId['ehl-signed-with-instat'] },
  { id: 'gmhl-junior-league-in-canada', date: '14.08.2020', cat: 'leagues-canada', withCurrencyRate: true, playersInSliderCaption: 'Игроки агентства в GMHL', playersInSlider: ['cirkunov-vadim', 'guseinov-alexander', 'builov-vladimir', 'valguzov-denis', 'grishatov-oleg', 'leontev-yaroslav'], imgSrc: '/assets/img/blog/leagues-canada/gmhl-junior-league-in-canada/intro.png', title: 'GMHL - молодежная хоккейная лига в Канаде', shortContent: 'Одна из самых популярных хоккейных лиг Северной Америки для европейцев', content: leaguesCanadaGmhlJunior, seoTitle: seoTitleByPostId['gmhl-junior-league-in-canada'], seoDesc: seoDescByPostId['gmhl-junior-league-in-canada'] },
  { id: 'whl-junior-league-in-canada', date: '17.08.2020', cat: 'leagues-canada', imgSrc: '/assets/img/blog/leagues-canada/whl-junior-league-in-canada/intro.png', title: 'WHL - молодежная хоккейная лига в Канаде', shortContent: 'Обзор лиги - структура чемпионата, команды и игроки', content: leaguesCanadaWhlJunior, seoTitle: seoTitleByPostId['whl-junior-league-in-canada'], seoDesc: seoDescByPostId['whl-junior-league-in-canada'] },
  { id: 'qmjhl-junior-league-in-canada', date: '04.09.2020', cat: 'leagues-canada', imgSrc: '/assets/img/blog/leagues-canada/qmjhl-junior-league-in-canada/intro.png', title: 'QMJHL - молодежная хоккейная лига в Канаде', shortContent: 'Обзор лиги - структура чемпионата, команды и игроки', content: leaguesCanadaQmjhlJunior, seoTitle: seoTitleByPostId['qmjhl-junior-league-in-canada'], seoDesc: seoDescByPostId['qmjhl-junior-league-in-canada'] },
  { id: 'billet-family-in-usa-and-canada', date: '01.10.2020', cat: 'usa-and-canada', imgSrc: '/assets/img/blog/usa-and-canada/billet-family-in-usa-and-canada/intro.jpg', title: 'Проживание хоккеистов за границей', subtitle: 'Как живут игроки в лигах США и Канады', shortContent: 'Как живут игроки в лигах США и Канады', content: usaAndCanadaBillet, seoTitle: seoTitleByPostId['billet-family-in-usa-and-canada'], seoDesc: seoDescByPostId['billet-family-in-usa-and-canada'] },
  { id: 'interview-georgi-larshin', date: '04.12.2020', cat: 'career', imgSrc: '/assets/img/blog/interviews/larshin-georgi/intro.jpg', title: 'Интервью с Егором Ларшиным', subtitle: 'Стал капитаном команды МХЛ после одного сезона в&nbsp;канадской&nbsp;лиге&nbsp;GMHL', shortContent: 'Стал капитаном команды МХЛ после одного сезона в канадской лиге GMHL', content: interviewLarshinGeorgi, seoTitle: seoTitleByPostId['interview-georgi-larshin'], seoDesc: seoDescByPostId['interview-georgi-larshin'] },
  { id: 'ushl-junior-league-in-usa', date: '19.04.2021', cat: 'leagues-usa', imgSrc: '/assets/img/blog/leagues-usa/ushl-junior-league-in-usa/intro.png', title: 'USHL - молодежная хоккейная лига в США', shortContent: 'Обзор лиги - структура чемпионата, команды и игроки', content: leaguesUsaUshlJunior, seoTitle: seoTitleByPostId['ushl-junior-league-in-usa'], seoDesc: seoDescByPostId['ushl-junior-league-in-usa'] },
];
