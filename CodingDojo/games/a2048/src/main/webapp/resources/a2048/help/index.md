<meta charset="UTF-8">

## Вступление

Игровой demo-сервер доступен так же в интернете 24/7 в целях 
ознакомления [http://codenjoy.com/codenjoy-contest](http://codenjoy.com/codenjoy-contest).

Игра с открытым исходным кодом. Для реализации своей игры, исправления
ошибок в текущей и внесения других правок необходимо для начала
[форкнуть проект](https://github.com/codenjoyme/codenjoy.git).
В корне репозитория есть описание в файле Readme.md - там описано, что делать дальше.

По возникающим вопросам, пиши в [skype alexander.baglay](skype:alexander.baglay)
или на почту [apofig@gmail.com](mailto:apofig@gmail.com).

Игра создана на основе
[gabrielecirulli.github.io/2048](http://gabrielecirulli.github.io/2048/). 
Спасибо Авторам за идею.

## В чем суть игры?

Тебе предстоит добраться до 2048 (или даже дальше). После каждого твоего
хода в свободных угловых ячейках появится[*](index.md#ask) цифра 2.

Используя одну из команд `LEFT`, `RIGHT`, `UP` или `DOWN` сбить все цифры к
одной из сторон. При этом две одинаковые цифры стоящие рядом превращаются
в одну равную их сумме, а на поле появится на 1 свободную клеточку больше.

На поле могут[*](index.md#ask) встретиться препятствия, останавливающие движения цифер. 

Очки рассчитываются как максимальная сумма чисел на доске за всю игру.

Побеждает игрок с большим числом очков (до условленного времени).

[*](index.md#ask)Точные настройки на данный момент игры уточни у Сенсея.

## Подключение к серверу

Итак, игрок [регистрируется на сервере](../../../register?gameName=a2048),
указывая свой email.

Далее необходимо подключиться из кода к серверу через websocket.
[Эта подборка](https://github.com/codenjoyme/codenjoy-clients.git)
клиентов для разных языков программирования тебе поможет в твоей игре.
Как запустить клиент смотри в корне проекта в файле README.md.

Если ты не можешь найти свой язык - придется написать свой клиент
(а после пошарить с нами на почту [apofig@gmail.com](mailto:apofig@gmail.com))

Адрес для подключения к игре на сервере выглядит так (ты можешь скопировать его
из игровой комнаты):

`https://[server]/codenjoy-contest/board/player/[user]?code=[code]`

Тут `[server]` - домен или ip-адрес игрового сервера, `[user]` - id игрока, a `[code]` -
твой security token. Убедись что код хранится в тайне, иначе любой участник
сможет играть от твоего имени.

В коде твоего клиента тебе нужно найти похожую строчку и заменить её твоим URL -
тем самым, ты задаёшь логин/пароль для доступа к серверу.
Затем запусти твой клиент и убедись, что сервер получает команды твоего клиента.
После этого можно приступать к работе над логикой бота.

## Формат сообщений

После подключения клиент будет регулярно (каждую секунду) получать строку
символов с закодированным состоянием поля. Формат таков:

`^board=(.*)$`

C помощью этого regexp можно выкусить строку доски. 

## Пример поля

Вот пример строки от сервера:

<pre>board=8A4AA2BB88488848442222222</pre>

Длинна строки равна площади поля `N*N`. Если вставить символ
переноса строки каждые `N=sqrt(length(string))` символов, то
получится читабельное изображение поля:

<pre>8A4AA
2BB88
48884
84422
22222</pre>

Первый символ строки соответствует ячейке расположенной в
левом верхнем углу и имеет координату `[0, 4]`. 
Координата `[0,0]` соответствует левому нижнему углу.

## Расшифровка символов

Расшифровку символов ты можешь [найти тут](elements.md).

## Как играть?

Игра пошаговая, каждую секунду сервер посылает твоему клиенту
состояние обновленного поля на текущий момент и ожидает
ответа команды. За следующую секунду игрок должен успеть
дать команду. Если не успел — ничего не меняется.

Твоя цель заставить фишки двигаться в соответствии с задуманным тобой алгоритмом.
Этими перемещениями ты должен уметь зарабатывать так много очков, 
сколько сможешь. Основная цель игры - обыграть по очкам всех соперников.

## Команды управления

Используя одну из команд `LEFT`, `RIGHT`, `UP` или `DOWN` сбивай все цифры к
одной из сторон. При этом две одинаковые цифры стоящие рядом превращаются
в одну равную их сумме, а на поле появится на 1 свободную клеточку больше.

## Настройки

Параметры будут меняться[*](index.md#ask) по ходу игры.

## Кейзы

## <a id="ask"></a> Спроси Сенсея

Параметры могут изменяться по ходу игры. Настройки текущей игры
ты сможешь всегда [подглядеть тут](/codenjoy-contest/rest/settings/player).
Пожалуйста, спроси у Сенсея как интерпретировать эти данные. Ты можешь найти Сенсея
в чате, который подготовили организаторы для обсуждения вопросов.

## Подсказки

Первостепенная задача – написать websocket клиента, который подключится
к серверу. Затем заставить цифры на поле слушаться команд.
Таким образом, игрок подготовится к основной игре.
Основная цель – вести осмысленную игру и победить.

Если ты не знаешь с чего начать, попробуй реализовать следующие алгоритмы:

* Попробовать поиграть в игру самостоятельно [тут](http://gabrielecirulli.github.io/2048/)
  выявив тем самым какие-то несложные паттерны.
* Реализовать эти паттерны в коде начав зарабатывать очки.
* Тем временем подумать о более сложной логике просчета вариантов 
  того или иного действия в будущем. 

## Клиент и API

Организаторы предоставляют игрокам подготовленные клиенты в исходном 
коде на нескольких языках. Каждый из этих клиентов уже умеет связываться 
с сервером, принимать и разбирать сообщение от сервера (обычно это называется board)
и отправлять серверу команды.

Слишком много форы клиентский код не дает играющим, поскольку в этом коде
еще надо разобраться, но там реализована логика общения с сервером +
некоторое высокоуровневое API для работы с доской (что уже приятно).

Все языки так или иначе имеют похожий набор методов:

* `Solver`
  Пустой класс с одним методом — ты должен(должна) наполнить его умной логикой.
* `Direcion`
  Возможные направления движения для этой игры.
* `Point`
  `x`, `y` координаты.
* `Element`
  Тип элемента на доске.
* `Board` 
  Содержит логику для удобного поиска и манипуляции элементами на поле.
  Ты можешь найти следующие методы в Board классе:
* `int boardSize();`
  Размер доски.
* `boolean isAt(Point point, Element element);`
  Находится ли в позиции point заданный элемент?
* `boolean isAt(Point point, Collection<Element>elements);`
  Находится ли в позиции point что-нибудь из заданного набора?
* `boolean isNear(Point point, Element element);`
  Есть ли вокруг клеточки с координатой point заданный элемент?
* `int countNear(Point point, Element element);`
  Сколько элементов заданного типа есть вокруг клетки с point?
* `Element getAt(Point point);`
  Элемент в текущей клетке.
* и так далее...

## Как провести такой же ивент самостоятельно?

Перед тобой opensource проект. Для реализации своей новой игры, модификации этой игры,
любой другой модификации сервера или исправления найденной ошибки
[форкни проект](https://github.com/codenjoyme/codenjoy.git).
Все инструкции ты найдешь в Readme.md файлах - они подскажут, что делать дальше.

Если у тебя есть вопросы - прошу, задавай их мне 
в [скайпе alexander.baglay](skype:alexander.baglay)
или по почте [apofig@gmail.com](mailto:apofig@gmail.com).

Удачной игры и пусть победит сильнейший! 
  