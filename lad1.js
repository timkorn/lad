let str = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье
`;
const changer = new Map();
changer.set("ПОНЕДЕЛЬНИК", "MONDAY");
changer.set("ВТОРНИК", "TUESDAY");
changer.set("СРЕДА", "WEDNESDAY");
changer.set("ЧЕТВЕРГ", "THURSDAY");
changer.set("ПЯТНИЦА", "FRIDAY");
changer.set("СУББОТА", "SATURDAY");
changer.set("ВОСКРЕСЕНЬЕ", "SUNDAY");

function weekChange(str) {
  for (const key of changer.keys()) {
    if (str.includes(key)) {
      str = str.replace(key, changer.get(key));
    }
  }
  console.log(str);
}

weekChange(str);
