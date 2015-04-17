Simple Rating Widget
===========

### Подключение

Виджет использует шаблонизатор handlebars.js, если он уже есть в проекте, достаточно подключить rating.min.js. В противном случае, можно либо подключить handlebars отдельно, либо использовать rating.standalone.js

Так же нужно подключить css файл rating-default.css

### Использование

```js
var w = new SW.Rating(document.getElementById('rating'));

w.on('vote', function(e) {
    alert('User voted: ' + e.data);
});

w.render();
```

### Конфигурация

Виджет можно настроить:
```js
w.setConfig({
    pointNumber: 5, // Сколько баллов в шкале
    starType: 'svg', // Формат картинок в виджете (svg или png)
    starSize: 20, // Размер одной звезды в пикселях по умолчанию
    stretch: false // Растягивать ли виджет по всей ширине блока
    isLocked: false
});

w.render();
```

### API
```js
w.setConfig(config); // Кофигурация виджета

w.setMark(mark); // Задать рейтинг
w.getMark(): // Получить текущий рейтинг

w.setVoteCount(voteCount); // Задать количество проголосовавших
w.getVoteCount();

w.lock(); // Заблокировать виджет
w.unlock();

w.clear(); // Очистить виджет

w.update(); // Обновить рейтинг
w.render();

```
