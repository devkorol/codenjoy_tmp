<meta charset="UTF-8">

## About game
This implementation has been inspired by the online game WarLight and uses many similar rules, though there are some nuances.

Can you imagine four armies on the map? The map has regions. Each region has a specific number of armies controlled by one of the players. The players use different colors.

In the beginning, each participant randomly occupies one of the regions with a specific number of armies.

Insane kings have been trying to take over that turf again. Write your own AI to help them.

Let's go over the expansion step by step. This is a turn-based game where each turn (tick) lasts for 1 second, and you have to answer two questions during this time.
*  With each tick, the players get rookies, and so you have to ask yourself: Where am I going to deploy the rookies in my regions? If I don't deploy the rookies in one 'tick', they are gone. With each 'tick', each player gets 10 armies.
*  Once your armies are deployed, you should start thinking about moving the troops into the other regions. You have several scenarios:
   *  The region where you are moving the army is not occupied yet, which means that after the turn it is occupied with the army of the player that performed the turn.
   *  The region where the armies go is occupied by the same player, which means the number of armies increases in it.
   *  The region where the armies go is occupied by the adversary, which means there's going to be a battle to be decided by how big the adversary's army and the attacker's army are. Both armies suffer losses, and the player with the surviving troops occupies the region.
*  An attack is unsuccessful, if some of the defending armies survive or all attacking armies are defeated. Following which, the armies in the regions are recomputed, and the players hold the same regions as before the attack.
*  You can only attack from a position where the number of armies is greater than 0 :)
*  An army can only attack an adjacent region. All eight regions are adjacent (left, right, up, down, left-up, left-down, right-up, right-down)
*  Several regions can attack the same region to reinforce the attack. When this happens, the attacker's armies are summed up.
*  Each attacking army has a 100% chance to defeat one defending army.
*  Each defending army has a 130% chance to defeat one attacking army. For this reason, to attack, you should have a numerically superior army. For details please read General algorithm on fighting
*  If the player doesn't answer this question within a second, he forfeits his turn.
*  The winner is the player who has captured all regions of the other players (not necessarily all unoccupied regions on the board). If that doesn't happen in P turns (by default = 600, configured in the game settings), then all players earn a draw. For details please read Tournamennt Calculations
*  The game will start when 4 players enter the map, meanwhile the server will ignore your commands.

## General algorithm on fighting

    if (roundDown((Max1 + Max2 + AllOther)/A) <= Defender)
    then
        defender_win and defender_final_count is: 
            defender - roundDown((Max1 + Max2 + AllOther)/A)
    else
       max_attacker_win and this_attacker_final_count is:
           if (roundDown((Max2 + Max2 + AllOther)/A) >= Defender)
           then 
               Max1 – Max2
           else
               (Max1 + Max2 + AllOther) - roundUp(Defender*A)


1. **Max1** – max attacker count (combined from all attacking cells of this attacker)
2. **Max2** – next max attacker count (or 0 if there is only 1 attacker) (combined from all attacking cells of this attacker)
3. **AllOther** – combined forces of all other attackers from all their attacking cells (well in our case, with just 4 players, it is Max3 if it exists or 0 if there are no any) (edited)
4. **A** - defense bonus (default is 1.3)
5. If there are no defender than Defender = 0, and according to the logic max attacker win with Max1 – Max2


## Подключение к серверу

Итак, игрок [регистрируется на сервере](../../../register?gameName=expansion),
указывая свой email

Далее необходимо подключиться из кода к серверу через websocket.
[Эта подборка](https://github.com/codenjoyme/codenjoy-clients.git)
клиентов для разных языков программирования тебе поможет в твоей игре.
Как запустить клиент смотри в корне проекта в файле README.md.

Адрес для подключения к игре на сервере выглядит так (ты можешь скопировать его
из игровой комнаты):

`https://[server]/game/board/player/[user]?code=[code]`

Тут `[server]` - домен или ip-адрес игрового сервера, `[user]` - id игрока, a `[code]` -
твой security token. Убедись что код хранится в тайне, иначе любой участник
сможет играть от твоего имени.

В коде твоего клиента тебе нужно найти похожую строчку и заменить её твоим URL -
тем самым, ты задаёшь логин/пароль для доступа к серверу.
Затем запусти твой клиент и убедись, что сервер получает команды твоего клиента.
После этого можно приступать к работе над логикой бота.


Удачной игры и пусть победит сильнейший! 
