var taba = 6;
var sharm = 15;
var hurgada = 25;

var numReqSets = prompt("Введите число необходимых мест:");

if (numReqSets < 1 || parseInt(numReqSets) != numReqSets) {
  alert("Ошибка ввода");
} else {
  if (numReqSets <= taba) {
    if (
      confirm("Есть места в группе 'Taba', согласны ли вы быть в этой группе?")
    ) {
      var taba = taba - numReqSets;
      alert("Приятного путешествия в группе 'Taba'!");
    } else {
      if (numReqSets <= sharm) {
        if (
          confirm(
            "Есть места в группе 'Sharm', согласны ли вы быть в этой группе?"
          )
        ) {
          var sharm = sharm - numReqSets;
          alert("Приятного путешествия в группе 'Sharm'!");
        } else {
          if (numReqSets <= hurgada) {
            if (
              confirm(
                "Есть места в группе 'Hurgada', согласны ли вы быть в этой группе?"
              )
            ) {
              var hurgada = hurgada - numReqSets;
              alert("Приятного путешествия в группе 'Hurgada'!");
            } else {
              alert("Нам очень жаль, приходите еще!");
            }
          }
        }
      }
    }
  } else if (numReqSets <= sharm) {
    if (
      confirm("Есть места в группе 'Sharm', согласны ли вы быть в этой группе?")
    ) {
      var sharm = sharm - numReqSets;
      alert("Приятного путешествия в группе 'Sharm'!");
    } else {
      if (numReqSets <= hurgada) {
        if (
          confirm(
            "Есть места в группе 'Hurgada', согласны ли вы быть в этой группе?"
          )
        ) {
          var hurgada = hurgada - numReqSets;
          alert("Приятного путешествия в группе 'Hurgada'!");
        } else {
          alert("Нам очень жаль, приходите еще!");
        }
      }
    }
  } else if (numReqSets <= hurgada) {
    if (
      confirm(
        "Есть места в группе 'Hurgada', согласны ли вы быть в этой группе?"
      )
    ) {
      var hurgada = hurgada - numReqSets;
      alert("Приятного путешествия в группе 'Hurgada'!");
    } else {
      alert("Нам очень жаль, приходите еще!");
    }
  } else {
    alert("Извините, мест нет.");
  }
}
