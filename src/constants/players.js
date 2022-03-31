const reviewByPlayerId = {
  'tsegelnik-maxim': 'Максим Цегельник стал лучшим бомбардиром американской команды Cleveland Barons U18 лиги T1EHL в сезоне 2019-2020. В 66 играх регулярного чемпионата он набрал 54 очка (23+31) став самым ценным игроком своей команды. Максим привлек к себе внимание тренера команды на просмотре в Москве и получил предложение продолжить свою карьеру за рубежом, подробнее о пути Максима вы можете прочитать в его интервью.',
  'ganabin-egor': 'Егор Ганабин стал лучшим бомбардиром среди защитников американской команды Cleveland Barons U18 лиги T1EHL по результатам сезона 2019-2020. В 61 игре регулярного чемпионата Егор набрал 33 очка (4+29) и привлек к себе внимание скаутов NAHL и NCDC, получив приглашения на просмотр в команды восточного побережья.',
  'stepanyans-artem': 'В середине сезона 2019-2020 клиент агентства Степанянц Артем получил приглашение от команды Cleveland Barons U14 лиги T1EHL. Артем привлек к себе внимание скаутов выступая за один из сильнейших клубов Чемпионата Москвы среди юношей — Витязь Подольск. В США Артем помог своей новой команде стать чемпионами округа (district champions) и выйти в национальный финал (nationals).',
  'trubachev-matvey': 'Матвей дебютировал на молодежном уровне хоккея в Канаде в сезоне 2019-2020. Будучи одним из самых молодых игроков не только своей команды, но и лиги в целом, Матвей пользовался доверием тренеров и провел результативный сезон за границей, набрав 25 очков (5+20) в 39 играх регулярного чемпионата.',
  'guseinov-alexander': 'Александр — выпускник Новокузнецкого Металлурга, с успехом дебютировавший в канадской молодежной хоккейной лиге GMHL. Он по праву стал одним из ключевых игроков клуба Bradford Rattlers. В 36 играх регулярного чемпионата Александр набрал 38 очков (19+19), что позволило ему войти в топ-5 самых результативных игроков команды. В играх плей-офф Александр продолжил показывать стабильно высокий результат и набрал 9 очков (2+7) в 10 играх, чем помог своей команде дойти до полуфинала.',
  'valguzov-denis': 'Денис обратился в агентство в 2018 году уже имея за плечами год опыта в канадском хоккее. Он играл и учился в академии Hill, но хотел улучшить свои спортивные, академические и бытовые условия. По его просьбе мы подобрали подходящий клуб, который позволил Денису совмещать хоккейную карьеру с учебой в канадской школе, и в дальнейшем поступить в один из лучших колледжей провинции Онтарио — Georgian College.',
  'grishatov-oleg': 'Олег провел два последних сезона в Канаде выступая за команду Bradford Rattlers. Являясь одним из самых опытных и возрастных игроков обороны, Олег пользуется доверием тренерского штаба и движется к своей цели — спортивной стипендии в студенческой лиге NCAA. В сезоне 2019-2020 Олег набрал 26 очков (5+21) в 41 игре регулярного чемпионата, позже добавив 6 очков (4+2) в 10 играх плей-офф к своей статистике.',
  'cirkunov-vadim': 'В сезоне 2019-2020 Цыркунов Вадим был признан лучшим новичком канадской лиги GMHL среди игроков 2001-2002 года рождения. В 36 играх регулярного чемпионата он набрал 35 очков (20+15) и помог своему клубу New Tecumseth Civics выйти в плей-офф. По окончанию сезона Вадим получил приглашения на просмотр в клубы NAHL и МХЛ.',
  'ryazancev-miroslav': 'Мирослав является одним из самых молодых и габаритных игроков своего клуба, сезон 2019-2020 стал для него дебютным на молодежном уровне хоккея в Канаде. Мирослав — надежный игрок обороны, сильные качества которого это прежде всего его умение выигрывать борьбу за шайбу в углах площадки и перед воротами.',
  'leontev-yaroslav': 'Ярослав получил приглашение в New Tecumseth Civics напрямую от владельца команды, успешно проявив себя во время просмотрового турнира в Москве в 2019 году. Дебютировав на молодежном уровне канадского хоккея в сезоне 2019-2020 Ярослав планирует вернуться в Civics на следующий сезон и закрепить за собой статус основного вратаря команды.',
  'builov-vladimir': 'Владимир получил приглашение в канадскую команду Bancroft Rockhounds на просмотре в Москве в 2019 году и успешно дебютировал в лиге GMHL в сезоне 2019-2020. По ходу сезона Владимир проявил себя как надежный игрок обороны, заняв место в топ-6 защитников своего клуба и планирует вернуться в Канаду на следующий сезон.',
};

const parentOrPlayerReviewByPlayerId = {
  'ganabin-egor': { author: 'Егор Ганабин', text: 'Здравствуйте, меня зовут Ганабин Егор, прошедший сезон я провел в американской юниорской лиге T1EHL, в команде Cleveland Barons.Играть в хоккей в США всегда было моей мечтой, благодаря просмотру, организованному Егором Гришатовым и его агентством летом 2019 года я получил приглашение напрямую от главного тренера команды Barons, Cody Gonyeua. По началу у меня и моей семьи были опасения в реальности оформления визы, т.к. у нас уже был отрицательный опыт с отказом в получении американской визы в 2018, но благодаря помощи Егора и его команды мне удалось подготовить все документы , пройти собеседование и получить визу нужного статуса. Выступая в этой лиге ты должен не только хорошо играть, но и учиться в школе английского языка, соответственно я получал студенческую визу.Лига T1EHL является лучшей юниорской лигой США, из которой есть реальные шансы на попадание в лучшие молодежные лиги Штатов — USHL и NAHL. Моя команда провела около 60 игр за прошедший сезон, я получил огромное количество игровой практики на самом высоком уровне и по итогам года получил приглашение на просмотр в команду New Jersey Titans, выступающей в лиге NAHL.Тренировки, быт и учеба в клубе были организованны на высшем уровне.Мы проживали с моим другом и партнером по камлание Максимом Цигельником (для меня он цыга)  в семье Balodis, очень дружная семья, помогали во всем, в любую секунду можно подойти и поговорить, вкусная еда, завтрак, обед, ужин, полдник, ланч в школу очень сытный, сходили вместе на бейсбол не раз (платила семья), увидели как мы загорелись этим спортом и подарили игровые рубашки ( не дешевое удовольствие), помогли организовать бросковую зону во дворе, возили нас в торговый центр и не раз, жили мы в спокойном районе, большая улица, где мы тренировали технику владения клюшкой, соседи дружелюбные. Купили билеты на баскетбол Lakers-Cleveland, но из-за карантина не смогли пойти на игру. Тренировались мы на Cleveland Barons Bus arena, тренировки проходят три раза в неделю но полтора часа лед, час зал и час разбор игр нашей команды или соперника. Тренировки очень интересные и интенсивные, борьба на каждом участке поля, отдельные тренировки для защитников и нападающих, разбор игровых моментов во время тренировки, тренер может остановить упражнение и подсказать как лучше сделать тот или иной элемент, много играли на тренировках, но это не были просто игры 5 на 5, а с какими-то интересными заданиями или с очень маленькими границами.Так же мы попросили дополнительный лед утром перед школой, чтобы поработать над силовым катанием и техники владения клюшки, а также для заряда хорошим настроением на целый день. Да для этого мы просыпались в 6-6:30 утра и наша семья или тренер довозили до арены. Также тренер и команда всегда поддержат если ты провел не очень хорошую игру, этому я был удивлен так как в России тебя готовы убить после каждой ошибки. Также после проигранной игры тренер не орет и не убивает, а спокойно обьясняет все ошибки команды и отдельно взятого игрока. С командой очень дружеские отношения, я бы даже сказал семейные, ходили вместе в кафе посидеть после тренировок, обсудить темы не связанные с хоккеем, также ходили и в торговые центры чтобы посмотреть и приобрести какие-то вещи, а то и просто прогуляться и отдохнуть. Очень запомнилась тренировка в день Хеллоуина, мы все были в каких-то костюмах прямо на тонировке, как на льду, так и на растяжке и в этот же день мы ехали на игры, в костюмах. В автобусе слушали музыку, смотрели фильмы, кто-то делал уроки на ноутбуках. Каждую пятницу у нас было собрание команды без тренера и все говорили какие-то минусы другого игрока за неделю и если команда согласна этот человек должен был заплатить 1 доллар, на эти деньги покупали шампуни или что-то еще нужное для команды. Я учился в языковой школе Lado. Обучение интересное и продуктивное, ничего лишнего, разговоры только на английском, так язык быстрее усваивается, учили грамматику, как правильно использовать то или иное время, учителя очень помогали и никогда не злились если что-то не так. Я выучил язык за 2-3 месяца с нуля. Все люди которых мы встречали очень помогали во всем. Спасибо агентству Егора Гришатова за предоставленную возможность, а также помощь и поддержку в течении сезона.Спасибо за внимание и удачи на льду!' },
  'valguzov-denis': { author: 'Павел Валгузов', text: 'Всем доброго дня! Хочу так же выразить благодарность Егору, за помощь, которую он оказал нам при  попадании в команду RATTLERS. Мы искали новую команду после 1 года, проведенного в Канаде, в академии. Поэтому нам есть с чем сравнивать. Да, конечно, учеба и игра в академии, наиболее удобный  и относительно безболезненный способ, попасть 16му  подростку в команду и в школу в Канаде. Но ценник за это удобство, весьма, не детский. И это при том, что проблем, именно бытового характера, хватало. Уже после того, как сын играл и учился, выяснилось, что кормить ребят из России будут 6 раз в неделю, а не 7. По вечерам и в выходные, их кормила фирма, со стороны нанятая академией. Все наши переговоры с администрацией, результатов не дали. Поэтому раз в неделю, наши дети тромбились фастфудом. Конечно, они могли бы покупать полуфабрикаты и разогревать дома, но в 16 лет, дети не настолько сознательные, по крайней мере наши, им было проще пойти в ближайший Макдональдс, и поесть там. Жили они не в семье, а в арендованном доме, недалеко от академии, по местным меркам. Но пешком, тоже далеко шагать. Поэтому периодически возникал вопрос, кто их подвезет. И очень часто, им приходилось брать такси, что также недешево в Канаде. Так как ребята жили не в семье, а просто  под присмотром взрослого, массу вопросов приходилось решать самим. С одной стороны, все это фигня и для взросления может оно и неплохо, но с другой стороны, за такие деньги, хотелось бы минимум бытовых проблем. Со школой и командой проблемы так же были, но это не вызывало такого родительского возмущения, ибо было ожидаемо и решаемо. Единственное большое неудобство было с лигой, в которой играла академия. Разброс команд по Канаде. На некоторые игры, ребята тряслись в автобусе по 20-30 часов. После таких поездок, путешествие в Ярославль или Воскресенск, в рамках ОЧМ, просто небольшая экскурсия. Так что, после года учебы в академии, мы уже точно знали, чего хотим для сына. Так как мы не типичны, и нам важен не только хоккей, но и обучение в Канаде, мы долго  искали подходящие нам условия, пока друзья не посоветовали обратиться к Егору. Он подобрал для нас, практически идеальные условия. Школа, дом, команда- все в шаговой доступности друг от друга. Семья, в которую попал сын- нам очень понравилась. Ледовая арена новая с бассейном и шикарным комплексом для тренировок. Таких и в Канаде не много. А если еще учесть, что год в академии  (по деньгам)- равен, примерно,  3 годам  в GMHL и школе, то наш  выбор очевиден. Тем более, что на следующий сезон, команда дает скидку. Про лигу, на ветке, сказано все верно. Есть команды сильнее, есть слабее. Действительно, многое зависит непосредственно от игрока. Игры со старшим возрастом, закаляет и многому учит. Главное, чтобы без травм. Нет унижения игроков тренером (чего мы насмотрелись в Москве).  В лиге нет лимита на легионеров, что для ребят со всего мира, просто-таки идеально.  Единственное, что омрачает игры в лиге, так это просто отвратительное GMHL TV. Трансляции через игру, а то и больше. Качество изображения такое, что не то что шайбу не видно, номер игрока разглядеть проблема. Переставить местами периоды в записи, сначала показать 2, а потом 1 и 3 периоды- вообще не проблема. Записи выкладывают в интернет с задержками до недели. В начале сезона, все прямые трансляции команда вела сама и выкладывала в YouTube , а потом все это перешло на GMHL TV. А так как видеотрансляции, это то немногое, что дает родителям объективное  представление про их чадо, то, конечно все это реально бесит. Ну и про зимние командные куртки, сын не слышал, но это мелочь. В остальном, достойная лига, как альтернатива МХЛ А или Б для многих ребят. Надеемся следующий сезон проведем в RATTLAERS.' },
  'leontev-yaroslav': { author: 'Андрей Леонтьев', text: 'Всем здравствуйте,я, папа вратаря 2002г.р., после выпуска из спортивной школы столкнулся с проблемой поиска команды, т.к. сын хотел продолжать заниматься профессионально. Тренер вратарей сына посоветовал обратиться к агенту Гришатову Егору Александровичу. Благодаря ему мы попали на просмотровые сборы, проходящие в Москве, где были одни из ведущих агентов Северной Америки и Европы. Для нас это был хороший опыт! После этих просмотров Егор Александрович подобрал моему сыну команду в Канадской лиге GMHL.  Сыну первое время не давали играть, т.к. молодой, первый сезон в канадском хоккее, Егор решил эту проблему: звонил, разговаривал с командным менеджером, т.к. человек он очень ответственный. В январе Егор Александрович прилетал в Канаду, чтобы на месте убедиться, что с ребятами все в порядке, а также проводил беседы с тренерами команд, в которых были его подопечные. В Канаде ребята ездили на дополнительные тренировки с главным тренером команды OHL Barrie Colts за символическую плату, транспорт также предоставил Егор. В Москве у Егора Александровича есть своя хоккейная школа, в которой проводятся качественные тренировки, сборы. Наш сын также всем очень доволен! Я могу порекомендовать его агентство, если будут проблемы при выпуске из спортивной школы. Можете не задумываясь обращаться к Гришатову Егору Александровичу, его агентство поможет подобрать команду не только в России, но и в Канаде и США, потому что там больше перспектив! В хоккее мы более 10 лет, много разных тренеров и людей встречали,  Егор Александрович один из самых порядочных людей в мире хоккея! Ни одной мелочи не осталось без его внимания! Очень благодарны ему за то, что он разрешил нам сотрудничать с ним в дальнейшем! Рекомендую!' },
  'builov-vladimir': { author: 'Владимир Буйлов', text: 'Здраствуйте, меня зовут Буйлов Владимир сезон 2019-20 я играл в хоккейной команде Bancroft Rockhounds, попасть туда мне помогли Егор Гришатов и его агентство организовав просмотровый турнир на котором меня пригласили в Канаду. После приезда в команду Егор мне во многом помогал и консультировал благодаря чему я легко адаптировался под новые для меня условия. Я благодрен Егору за проделанную работу и шанс выбится в зарубежную лигу' },
  'korotaev-iliya': { author: 'Вера Коротаева, игрок Илья Коротаев', text: 'Здравствуйте, меня зовут Коротаева Вера, я мама любимого сына. А сын очень любит играть в хоккей. В агентство Егора Гришатова мы обратились по рекомендации ребят, с которыми сын играл в одной команде.Что я хочу сказать о работе Егора- это действительно профессионал, знаток своего дела. Очень приятно были удивлены его отношением к людям (игрокам и их родителям) с которыми работает Егор. После просмотрового турнира, отлично организованного агентством Егора Гришатова, нам поступило несколько предложений из разных лиг. Все взвесив, сын поехал играть в Венгрию. В команду Győri Nemak ETO, где великолепные условия для жизни, игры в хоккей и профессионального роста. Просто не передать словами, то как Егор относится к ребятам, их здоровью физическому и эмоциональному. Находит индивидуальный подход к каждому спортсмену. Мы в хоккее сталкивались с разными тренерами, и агентами- я точно знаю и с уверенностью хочу сказать, что этому человеку можно доверить хоккейное будущее своего ребёнка.Обязательно рассмотрите эту возможность.' },
};

const descByPlayerId = {
  'tsegelnik-maxim': 'Максим Цегельник стал лучшим бомбардиром американской команды Cleveland Barons U18 лиги T1EHL в сезоне 2019-2020. В 66 играх регулярного чемпионата он набрал 54 очка (23+31) став самым ценным игроком своей команды.',
  'ganabin-egor': 'Егор Ганабин стал лучшим бомбардиром среди защитников американской команды Cleveland Barons U18 лиги T1EHL по результатам сезона 2019-2020. В 61 игре регулярного чемпионата Егор набрал 33 очка (4+29) и привлек к себе внимание скаутов NAHL и NCDC, получив приглашения на просмотр в команды.',
  'stepanyans-artem': 'В середине сезона 2019-2020 клиент агентства Степанянц Артем получил приглашение от команды Cleveland Barons U14 лиги T1EHL. Артем привлек к себе внимание скаутов выступая за один из сильнейших клубов Чемпионата Москвы среди юношей — Витязь Подольск.',
  'trubachev-matvey': 'Матвей дебютировал на молодежном уровне хоккея в Канаде в сезоне 2019-2020. Будучи одним из самых молодых игроков не только своей команды, но и лиги в целом, Матвей пользовался доверием тренеров и провел результативный сезон за границей, набрав 25 очков (5+20) в 39 играх регулярного чемпионата.',
  'guseinov-alexander': 'Александр — выпускник Новокузнецкого Металлурга, с успехом дебютировавший в канадской молодежной хоккейной лиге GMHL. Он по праву стал одним из ключевых игроков клуба Bradford Rattlers. В 36 играх регулярного чемпионата Александр набрал 38 очков (19+19) и вошел в топ-5 игроков команды.',
  'valguzov-denis': 'Денис обратился в агентство в 2018 году уже имея за плечами год опыта в канадском хоккее. Он играл и учился в академии Hill, но хотел улучшить свои спортивные, академические и бытовые условия. Мы подобрали клуб, который позволил совмещать хоккейную карьеру с учебой в канадской школе и поступить в колледж.',
  'grishatov-oleg': 'Олег провел два последних сезона в Канаде выступая за команду Bradford Rattlers. Являясь одним из самых опытных и возрастных игроков обороны, Олег пользуется доверием тренерского штаба и движется к своей цели — спортивной стипендии в студенческой лиге NCAA.',
  'cirkunov-vadim': 'В сезоне 2019-2020 Цыркунов Вадим был признан лучшим новичком канадской лиги GMHL среди игроков 2001-2002 года рождения. В 36 играх регулярного чемпионата он набрал 35 очков (20+15) и помог своему клубу New Tecumseth Civics выйти в плей-офф.',
  'ryazancev-miroslav': 'Мирослав является одним из самых молодых и габаритных игроков своего клуба, сезон 2019-2020 стал для него дебютным на молодежном уровне хоккея в Канаде. Мирослав — надежный игрок обороны, сильные качества которого - умение выигрывать борьбу за шайбу в углах площадки и перед воротами.',
  'leontev-yaroslav': 'Ярослав получил приглашение в New Tecumseth Civics напрямую от владельца команды, успешно проявив себя во время просмотрового турнира в Москве в 2019 году.',
  'builov-vladimir': 'Владимир получил приглашение в канадскую команду Bancroft Rockhounds на просмотре в Москве в 2019 году и успешно дебютировал в лиге GMHL в сезоне 2019-2020. По ходу сезона Владимир проявил себя как надежный игрок обороны, заняв место в топ-6 защитников своего клуба.',
};

export const PLAYERS = [
  {
    id: 'ashikhmin-tikhon',
    imgSrc: '/assets/img/players/Ashikhmin-Tikhon.jpg',
    name: 'Ашихмин Тихон',
    grip: 'Левый',
    birthday: '2003',
    role: 'Нападающий',
    team: 'Bradford Rattlers',
    league: 'GMHL',
    country: 'Канада',
    prevteam: 'Györi ETO HC U21, Венгрия',
    clientsince: '2020',
    lgImgSrc: '/assets/img/players/lg/ashikhmin-lg-photo.jpg',
  },
  {
    id: 'babets-danil',
    imgSrc: '/assets/img/players/Babets-Danil.jpeg',
    name: 'Бабец Данил',
    birthday: '2003',
    role: 'Вратарь',
    team: 'Polonia Bytom',
    league: 'Poland 2',
    country: 'Польша',
    prevteam: 'Капитан Ступино U18, Россия',
    clientsince: '2021',
  },
  {
    id: 'bachalov-timur',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Бачалов Тимур',
    birthday: '2005',
    role: 'Защитник',
    team: 'Toronto Royals U17 AA',
    league: 'GTHL',
    country: 'Канада',
    prevteam: 'Северная Звезда Москва U16, Россия',
    clientsince: '2021',
  },
  {
    id: 'bogachev-danila',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Богачев Данила',
    birthday: '2003',
    role: 'Нападающий',
    team: 'South Muskoka Shield',
    league: 'GMHL',
    country: 'Канада',
    prevteam: 'Клин Спортивный U18, Россия',
    clientsince: '2021',
  },
  {
    id: 'boktaev-ernest',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Боктаев Эрнест',
    birthday: '2005',
    role: 'Защитник',
    team: 'New Tecumseth Civics',
    league: 'GMHL',
    country: 'Канада',
    prevteam: 'Созвездие Москва U16, Россия',
    clientsince: '2021',
  },
  {
    id: 'bubnov-daniil',
    imgSrc: '/assets/img/players/Bubnov-Daniil.jpg',
    name: 'Бубнов Даниил',
    birthday: '2002',
    role: 'Защитник',
    team: 'Dunaújvárosi Acélbikák',
    league: 'Erste Liga',
    country: 'Венгрия',
    prevteam: 'Györi ETO HC U21, Венгрия',
    clientsince: '2020',
    lgImgSrc: '/assets/img/players/lg/bubnov-lg-photo.jpg',
  },
  {
    id: 'buduev-roman',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Будуев Роман',
    birthday: '2006',
    role: 'Защитник',
    team: 'Toronto Titans U16 AAA',
    league: 'GTHL',
    country: 'Канада',
    prevteam: 'Металлург Магнитогорск U15, Россия',
    clientsince: '2021',
  },
  {
    id: 'buylov-vladimir',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Буйлов Владимир',
    birthday: '2002',
    role: 'Защитник',
    team: 'KiePo',
    league: 'III-divisioona',
    country: 'Финляндия',
    prevteam: 'Bancroft Rockhounds GMHL, Россия',
    clientsince: '2019',
    lgImgSrc: '/assets/img/players/lg/builov-lg-photo.jpg',
    lgImgCaption: 'Владимир на игре регулярного чемпионата',
    review: reviewByPlayerId['builov-vladimir'],
    reviewByPlayerOrParent: parentOrPlayerReviewByPlayerId['builov-vladimir'],
    desc: descByPlayerId['builov-vladimir'],
  },
  {
    id: 'bulahov-savva',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Булахов Савва',
    birthday: '2003',
    role: 'Защитник',
    team: 'Bradford Rattlers',
    league: 'GMHL',
    country: 'Канада',
    prevteam: 'ХК ЭкоНива-Бобров НМХЛ, Россия',
    clientsince: '2021',
  },
  {
    id: 'valiullin-amir',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Валиуллин Амир',
    birthday: '2005',
    role: 'Вратарь',
    team: 'Toronto Royals U17 AA',
    league: 'GTHL',
    country: 'Канада',
    prevteam: 'Смена Казань U18, Россия',
    clientsince: '2021',
  },
  {
    id: 'grachev-arseniy',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Грачев Арсений',
    birthday: '2005',
    role: 'Нападающий',
    team: 'GT Capitals U17 AA',
    league: 'GTHL',
    country: 'Канада',
    prevteam: 'Красная Звезда-2 СПб U16, Россия',
    clientsince: '2021',
  },
  {
    id: 'grishatov-oleg',
    imgSrc: '/assets/img/players/Grishatov-Oleg.jpg',
    name: 'Гришатов Олег',
    birthday: '2000',
    role: 'Защитник',
    team: 'Bradford Rattlers',
    league: 'GMHL',
    country: 'Канада',
    lgImgSrc: '/assets/img/players/lg/grishatov-lg-photo.jpg',
    lgImgCaption: 'Олег во время игры регулярного чемпионата',
    prevteam: 'МГСУ Москва МСХЛ, Россия',
    clientsince: '2018',
    review: reviewByPlayerId['grishatov-oleg'],
    desc: descByPlayerId['grishatov-oleg'],
  },
  {
    id: 'ershov-nikolay',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Ершов Николай',
    birthday: '2005',
    role: 'Вратарь',
    team: 'Bradford Rattlers',
    league: 'GMHL',
    country: 'Канада',
    prevteam: 'Синяя Птица Москва U16, Россия',
    clientsince: '2021',
  },
  {
    id: 'ivanov-sergei',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Иванов Сергей',
    birthday: '2002',
    role: 'Нападающий',
    team: 'KiePo',
    league: 'III-divisioona',
    country: 'Финляндия',
    prevteam: 'Капитан Ступино U18, Россия',
    clientsince: '2021',
  },
  {
    id: 'ispalatov-egor',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Испалатов Егор',
    birthday: '2006',
    role: 'Защитник',
    team: 'Toronto Titans U16 AAA',
    league: 'GTHL',
    country: 'Канада',
    prevteam: 'Янтарь Москва U15, Россия',
    clientsince: '2021',
  },
  {
    id: 'kabanov-denis',
    imgSrc: '/assets/img/players/Kabanov-Denis.jpg',
    name: 'Кабанов Денис',
    birthday: '2003',
    role: 'Защитник',
    team: 'Bradford Rattlers',
    league: 'GMHL',
    country: 'Канада',
    prevteam: 'Капитан Ступино U18, Россия',
    clientsince: '2021',
  },
  {
    id: 'kabataev-egor',
    imgSrc: '/assets/img/players/Kabataev-Egor.jpg',
    name: 'Кабатаев Егор',
    birthday: '2003',
    role: 'Нападающий',
    team: 'Dunaújvárosi Acélbikák',
    league: 'Erste Liga',
    country: 'Венгрия',
    prevteam: 'Барыс Нур-Султан U20, Казахстан',
    clientsince: '2021',
    lgImgSrc: '/assets/img/players/lg/kabataev-lg-photo.jpg',
  },
  {
    id: 'kleimenov-kirill',
    imgSrc: '/assets/img/players/Kleimenov-Kirill.jpeg',
    name: 'Клейменов Кирилл',
    birthday: '2003',
    role: 'Защитник',
    team: 'Polonia Bytom',
    league: 'Poland 2',
    country: 'Польша',
    prevteam: 'МХК Липецк НМХЛ, Россия',
    clientsince: '2021',
  },
  {
    id: 'korotaev-iliya',
    imgSrc: '/assets/img/players/Korotaev-Iliya.jpg',
    name: 'Коротаев Илья',
    birthday: '2003',
    role: 'Нападающий',
    team: 'Györi ETO HC U21',
    league: 'Hungary U21',
    country: 'Венгрия',
    prevteam: 'Капитан Ступино U18, Россия',
    clientsince: '2021',
    videoId: 'tVA3qvl1TfY',
    reviewByPlayerOrParent: parentOrPlayerReviewByPlayerId['korotaev-iliya'],
  },
  {
    id: 'levitskiy-stepan',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Левицкий Степан',
    birthday: '2004',
    role: 'Нападающий',
    team: 'Bradford Rattlers',
    league: 'GMHL',
    country: 'Канада',
    prevteam: 'Орбита Зеленоград U18, Россия',
    clientsince: '2021',
  },
  {
    id: 'mullagaliev-amir',
    imgSrc: '/assets/img/players/Mullagaliev-Amir.jpg',
    name: 'Муллагалиев Амир',
    birthday: '2003',
    role: 'Нападающий',
    team: 'Bradford Rattlers',
    league: 'GMHL',
    country: 'Канада',
    prevteam: 'Зилат Казань U18, Россия',
    clientsince: '2021',
  },
  {
    id: 'pochuev-daniil',
    imgSrc: '/assets/img/players/Pochuev-Daniil.jpg',
    name: 'Почуев Даниил',
    birthday: '2002',
    role: 'Нападающий',
    team: 'New Tecumseth Civics',
    league: 'GMHL',
    country: 'Канада',
    prevteam: 'Рубин Тюмень U18, Россия ',
    clientsince: '2021',
  },
  {
    id: 'rudskoy-egor',
    imgSrc: '/assets/img/players/Rudskoy-Egor.jpeg',
    name: 'Рудской Егор',
    birthday: '2002',
    role: 'Защитник',
    team: 'Polonia Bytom',
    league: 'Poland 2',
    country: 'Польша',
    prevteam: 'Капитан Ступино U18, Россия',
    clientsince: '2021',
  },
  {
    id: 'sayamov-daniil',
    imgSrc: '/assets/img/players/Sayamov-Daniil.jpg',
    name: 'Саямов Даниил',
    birthday: '2003',
    role: 'Нападающий',
    team: 'New Tecumseth Civics',
    league: 'GMHL',
    country: 'Канада',
    prevteam: 'CIHA Green U18 AAA HEO, Канада',
    clientsince: '2021',
  },
  {
    id: 'sinodkin-denis',
    imgSrc: '/assets/img/players/Sinodkin-Denis.jpg',
    name: 'Синодкин Денис',
    birthday: '2003',
    role: 'Нападающий',
    team: 'Györi ETO HC U21',
    league: 'Hungary U21',
    country: 'Защитник',
    prevteam: 'Сокол Курск U18, Россия',
    clientsince: '2021',
  },
  {
    id: 'smirnov-anton',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Смирнов Антон',
    birthday: '2006',
    role: 'Нападающий',
    team: 'Toronto Titans U16 AAA',
    league: 'GTHL',
    country: 'Канада',
    prevteam: 'Ястребы Москва U16, Россия',
    clientsince: '2021',
  },
  {
    id: 'smirnov-ilia',
    imgSrc: '/assets/img/players/Smirnov-Ilia.jpeg',
    name: 'Смирнов Илья',
    birthday: '2002',
    role: 'Нападающий',
    team: 'Polonia Bytom',
    league: 'Poland 2',
    country: 'Польша',
    prevteam: 'СКА ХКД Колпино U18, Россия',
    clientsince: '2020',
  },
  {
    id: 'sobolev-nikita',
    imgSrc: '/assets/img/players/Sobolev-Nikita.jpg',
    name: 'Соболев Никита',
    birthday: '2004',
    role: 'Нападающий',
    team: 'New Tecumseth Civics',
    league: 'GMHL',
    country: 'Канада',
    prevteam: 'Морские Львы Москва U18, Россия',
    clientsince: '2021',
  },
  {
    id: 'stepayants-artyom',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Степанянц Артём',
    birthday: '2005',
    role: 'Защитник',
    team: 'Toronto Red Wings U18 AAA',
    league: 'GTHL',
    country: 'Канада',
    prevteam: 'Витязь Подольск U16, Россия',
    clientsince: '2019',
  },
  {
    id: 'suschenko-sergei',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Сущенко Сергей',
    birthday: '2006',
    role: 'Нападающий',
    team: 'Toronto Titans U16 AAA',
    league: 'GTHL',
    country: 'Канада',
    prevteam: 'Белые Медведи Москва U15, Россия',
    clientsince: '2021',
  },
  {
    id: 'terenin-sergei',
    imgSrc: '/assets/img/players/Terenin-Sergei.jpg',
    name: 'Теренин Сергей',
    birthday: '2003',
    role: 'Нападающий',
    team: 'New Tecumseth Civics',
    league: 'GMHL',
    country: 'Канада',
    prevteam: 'Горняк Учалы U18, Россия',
    clientsince: '2021',
  },
  {
    id: 'trubachev-matvey',
    imgSrc: '/assets/img/players/Trubachev-Matvey.jpg',
    name: 'Трубачев Матвей',
    birthday: '2003',
    role: 'Нападающий',
    team: 'Györi ETO HC U21',
    league: 'Hungary U21',
    country: 'Венгрия',
    prevteam: 'Капитан Ступино U18, Россия',
    clientsince: '2019',
    lgImgSrc: '/assets/img/players/lg/trubachev-lg-photo.jpg',
    lgImgCaption: 'Первая шайба Матвея в Канаде',
    review: reviewByPlayerId['trubachev-matvey'],
    desc: descByPlayerId['trubachev-matvey'],
  },
  {
    id: 'frolov-vadim',
    imgSrc: '/assets/img/players/Frolov-Vadim.jpg',
    name: 'Фролов Вадим',
    birthday: '2003',
    role: 'Нападающий',
    team: 'Bradford Rattlers',
    league: 'GMHL',
    country: 'Канада',
    prevteam: 'Дизелист Пенза НМХЛ, Россия',
    clientsince: '2021',
  },
  {
    id: 'tsegelnik-maxim',
    imgSrc: '/assets/img/players/Tsegelnik-Maxim.jpg',
    name: 'Цегельник Максим',
    birthday: '2003',
    role: 'Нападающий',
    team: 'Bradford Rattlers',
    league: 'GMHL',
    country: 'Канада',
    prevteam: 'Cleveland Barons, U18 T1EHL, США',
    clientsince: '2019',
    videoId: 'EJb1iTKlZAg',
    lgImgSrc: '/assets/img/players/lg/tsegelnik-lg-photo.jpg',
    lgImgCaption: 'Максим с партнерами по команде',
    review: reviewByPlayerId['tsegelnik-maxim'],
    desc: descByPlayerId['tsegelnik-maxim'],
  },
  {
    id: 'chebanu-yaroslav',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Чебану Ярослав',
    birthday: '2003',
    role: 'Вратарь',
    team: 'South Muskoka Shield',
    league: 'GMHL',
    country: 'Канада',
    prevteam: 'Клин Спортивный U18, Россия',
    clientsince: '2021',
  },
  {
    id: 'shalimov-sergei',
    imgSrc: '/assets/img/players/player-fallback.jpg',
    name: 'Шалимов Сергей',
    birthday: '2006',
    role: 'Нападающий',
    team: 'Avalanche U16 AA',
    league: 'GTHL',
    country: 'Канада',
    prevteam: 'Морские Львы Москва U15, Россия',
    clientsince: '2021',
  },
  // {
  //   id: 'ganabin-egor',
  //   imgSrc: '/assets/img/players/Ganabin-Egor.jpg',
  //   name: 'Ганабин Егор',
  //   grip: 'Левый',
  //   height: '183',
  //   weight: '79',
  //   birthday: '15.04.2001',
  //   role: 'Защитник',
  //   team: 'Cleveland Barons U18',
  //   league: 'T1EHL',
  //   country: 'США',
  //   lgImgSrc: '/assets/img/players/lg/ganabin-lg-photo.jpg',
  //   lgImgCaption: 'Первая шайба Егора за команду Cleveland Barons U18',
  //   review: reviewByPlayerId['ganabin-egor'],
  //   reviewByPlayerOrParent: parentOrPlayerReviewByPlayerId['ganabin-egor'],
  //   desc: descByPlayerId['ganabin-egor'],
  // },
  // {
  //   id: 'stepanyans-artem',
  //   imgSrc: '/assets/img/players/Stepanyans-Artem.jpg',
  //   name: 'Степанянц Артем',
  //   grip: 'Левый',
  //   height: '187',
  //   weight: '78',
  //   birthday: '08.06.2005',
  //   role: 'Нападающий',
  //   team: 'Cleveland Barons U14',
  //   league: 'T1EHL',
  //   country: 'США',
  //   videoId: 'QPEtETp_uNk',
  //   lgImgSrc: '/assets/img/players/lg/stepanyans-lg-photo.jpg',
  //   lgImgCaption: 'Артем после выхода Barons U14 в национальный финал',
  //   review: reviewByPlayerId['stepanyans-artem'],
  //   desc: descByPlayerId['stepanyans-artem'],
  // },
  // {
  //   id: 'guseinov-alexander',
  //   imgSrc: '/assets/img/players/Guseinov-Alexander.jpg',
  //   name: 'Гусейнов Александр',
  //   grip: 'Левый',
  //   height: '180',
  //   weight: '76',
  //   birthday: '22.01.2001',
  //   role: 'Нападающий',
  //   team: 'Bradford Rattlers',
  //   league: 'GMHL',
  //   country: 'Канада',
  //   videoId: '0cuoBKSWfQk',
  //   lgImgSrc: '/assets/img/players/lg/guseinov-lg-photo.jpg',
  //   lgImgCaption: 'Александр после окончания победного для Rattlers матча',
  //   review: reviewByPlayerId['guseinov-alexander'],
  //   desc: descByPlayerId['guseinov-alexander'],
  // },
  // {
  //   id: 'valguzov-denis',
  //   imgSrc: '/assets/img/players/Valguzov-Denis.jpg',
  //   name: 'Валгузов Денис',
  //   grip: 'Левый',
  //   height: '184',
  //   weight: '82',
  //   birthday: '12.07.2001',
  //   role: 'Нападающий',
  //   team: 'Bradford Rattlers',
  //   league: 'GMHL',
  //   country: 'Канада',
  //   lgImgSrc: '/assets/img/players/lg/valguzov-lg-photo.jpg',
  //   lgImgCaption: 'Денис в борьбе за шайбу',
  //   review: reviewByPlayerId['valguzov-denis'],
  //   reviewByPlayerOrParent: parentOrPlayerReviewByPlayerId['valguzov-denis'],
  //   desc: descByPlayerId['valguzov-denis'],
  // },
  // {
  //   id: 'cirkunov-vadim',
  //   imgSrc: '/assets/img/players/Cirkunov-Vadim.jpg',
  //   name: 'Цыркунов Вадим',
  //   grip: 'Правый',
  //   height: '190',
  //   weight: '81',
  //   birthday: '09.12.2002',
  //   role: 'Нападающий',
  //   team: 'New Tecumseth Civics',
  //   league: 'GMHL',
  //   country: 'Канада',
  //   videoId: 'cmaHies8Vbc',
  //   lgImgSrc: '/assets/img/players/lg/cirkunov-lg-photo.jpg',
  //   lgImgCaption: 'Вадим в матче против канадского клуба South Muskoka Shields',
  //   review: reviewByPlayerId['cirkunov-vadim'],
  //   desc: descByPlayerId['cirkunov-vadim'],
  // },
  // {
  //   id: 'ryazancev-miroslav',
  //   imgSrc: '/assets/img/players/Ryazancev-Miroslav.jpg',
  //   name: 'Рязанцев Мирослав',
  //   grip: 'Правый',
  //   height: '195',
  //   weight: '85',
  //   birthday: '06.04.2003',
  //   role: 'Защитник',
  //   team: 'New Tecumseth Civics',
  //   league: 'GMHL',
  //   country: 'Канада',
  //   videoId: 'DnWVryLPANE',
  //   lgImgSrc: '/assets/img/players/lg/ryazancev-lg-photo.jpg',
  //   lgImgCaption: 'Мирослав в борьбе за шайбу',
  //   review: reviewByPlayerId['ryazancev-miroslav'],
  //   desc: descByPlayerId['ryazancev-miroslav'],
  // },
  // {
  //   id: 'leontev-yaroslav',
  //   imgSrc: '/assets/img/players/Leontev-Yaroslav.jpg',
  //   name: 'Леонтьев Ярослав',
  //   grip: 'Левый',
  //   height: '177',
  //   weight: '75',
  //   birthday: '28.02.2002',
  //   role: 'Вратарь',
  //   team: 'New Tecumseth Civics',
  //   league: 'GMHL',
  //   country: 'Канада',
  //   lgImgSrc: '/assets/img/players/lg/leontev-lg-photo.jpg',
  //   lgImgCaption: 'Опасный игровой момент у ворот с участием Ярослава',
  //   review: reviewByPlayerId['leontev-yaroslav'],
  //   reviewByPlayerOrParent: parentOrPlayerReviewByPlayerId['leontev-yaroslav'],
  //   desc: descByPlayerId['leontev-yaroslav'],
  // },
  // {
  //   id: 'builov-vladimir',
  //   imgSrc: '/assets/img/players/Builov-Vladimir.jpg',
  //   name: 'Буйлов Владимир',
  //   grip: 'Левый',
  //   height: '186',
  //   weight: '80',
  //   birthday: '22.02.2002',
  //   role: 'Защитник',
  //   team: 'Bancroft Rockhounds',
  //   league: 'GMHL',
  //   country: 'Канада',
  //   lgImgSrc: '/assets/img/players/lg/builov-lg-photo.jpg',
  //   lgImgCaption: 'Владимир на игре регулярного чемпионата',
  //   review: reviewByPlayerId['builov-vladimir'],
  //   reviewByPlayerOrParent: parentOrPlayerReviewByPlayerId['builov-vladimir'],
  //   desc: descByPlayerId['builov-vladimir'],
  // },
  // {
  //   id: 'popov-andrei',
  //   imgSrc: '/assets/img/players/Popov-Andrei.jpg',
  //   name: 'Попов Андрей',
  //   grip: 'Левый',
  //   height: '175',
  //   weight: '70',
  //   birthday: '15.11.2002',
  //   role: 'Нападающий',
  //   team: 'Bradford Rattlers',
  //   league: 'GMHL',
  //   country: 'Канада',
  // },
  // {
  //   id: 'zainulin-ismail',
  //   imgSrc: '/assets/img/players/Zainulin-Ismail.jpg',
  //   name: 'Зайнулин Исмаил',
  //   grip: 'Левый',
  //   height: '190',
  //   weight: '75',
  //   birthday: '12.09.2003',
  //   role: 'Нападающий',
  //   team: 'South Muskoka Shield',
  //   league: 'GMHL',
  //   country: 'Канада',
  // },
  // {
  //   id: 'grishakov-vladislav',
  //   imgSrc: '/assets/img/players/Grishakov-Vladislav.jpg',
  //   name: 'Гришаков Владислав',
  //   grip: 'Левый',
  //   height: '175',
  //   weight: '78',
  //   birthday: '21.08.2002',
  //   role: 'Вратарь',
  //   team: 'Bradford Rattlers',
  //   league: 'GMHL',
  //   country: 'Канада',
  // },
  // {
  //   id: 'rubtsov-igor',
  //   imgSrc: '/assets/img/players/Rubtsov-Igor.jpg',
  //   name: 'Рубцов Игорь',
  //   grip: 'Левый',
  //   height: '188',
  //   weight: '85',
  //   birthday: '30.06.2001',
  //   role: 'Нападающий',
  //   team: 'South Muskoka Shield',
  //   league: 'GMHL',
  //   country: 'Канада',
  // },
  // {
  //   id: 'filippenko-nikita',
  //   imgSrc: '/assets/img/players/Filippenko-Nikita.jpg',
  //   name: 'Филиппенко Никита',
  //   grip: 'Левый',
  //   height: '189',
  //   weight: '90',
  //   birthday: '09.01.2002',
  //   role: 'Нападающий',
  //   team: 'Bradford Rattlers',
  //   league: 'GMHL',
  //   country: 'Канада',
  // },
  // {
  //   id: 'zykov-nazar',
  //   imgSrc: '/assets/img/players/player-fallback.jpg',
  //   name: 'Зыков Назар',
  //   grip: 'Левый',
  //   height: '180',
  //   weight: '80',
  //   birthday: '17.12.2004',
  //   role: 'Нападающий',
  //   team: 'South Muskoka Shield',
  //   league: 'GMHL',
  //   country: 'Канада',
  // },
];
