const moveAudio = new Audio('move.mp3')
var arr = [],
    box, ei, ej;

function swap(arr, i1, j1, i2, j2) {
    t = arr[i1][j1];
    arr[i1][j1] = arr[i2][j2];
    arr[i2][j2] = t;
}
window.onload = function() {
    box = document.getElementById("box");
    newGame();
    document.getElementById("reset").onclick = newGame;
}
var count = 0;
function cellClick(event) {
    moveAudio.play();
    var moves = document.getElementById('moves');
    var event = event || window.event,
        el = event.srcElement || event.target,
        i = el.id.charAt(0),
        j = el.id.charAt(2);
    if ((i == ei && Math.abs(j - ej) == 1) || (j == ej && Math.abs(i - ei) == 1)) {
        document.getElementById(ei + " " + ej).innerHTML = el.innerHTML;
        el.innerHTML = "";
        ei = i;
        ej = j;
        var q = true;
        count = count + 1;
    //    console.log(count)
        moves.innerHTML = count;
        for (i = 0; i < 4; ++i)
            for (j = 0; j < 4; ++j) {
                if (i + j != 6 && document.getElementById(i + " " + j).innerHTML != i * 4 + j + 1) {
                    q = false;
                    break;
                }}
        if (q) {
            let second = document.getElementById('second').innerText;
            let minute = document.getElementById('minute').innerText;
            alert("Hooray! You solved the puzzle in " + minute + ' ' + second + ' and ' + count + ' moves');
            stop();
        }
    }
}

function newGame() {
    var moves = document.getElementById('moves');
    count = 0;
    moves.innerHTML = count;
    for (i = 0; i < 4; ++i) {
        arr[i] = []
        for (j = 0; j < 4; ++j) {
            if (i + j != 6)
                arr[i][j] = i * 4 + j + 1;
            else
                arr[i][j] = "";
        }
    }
    ei = 3;
    ej = 3;
    for (i = 0; i < 1600; ++i)
        switch (Math.round(3 * Math.random())) {
            case 0:
                if (ei != 0) swap(arr, ei, ej, --ei, ej);
                break; 
            case 1:
                if (ej != 3) swap(arr, ei, ej, ei, ++ej);
                break; 
            case 2:
                if (ei != 3) swap(arr, ei, ej, ++ei, ej);
                break; 
            case 3:
                if (ej != 0) swap(arr, ei, ej, ei, --ej); // left
        }
    var table = document.createElement("table"),
        tbody = document.createElement("tbody");
    table.appendChild(tbody);
    for (i = 0; i < 4; ++i) {
        var row = document.createElement("tr");
        for (j = 0; j < 4; ++j) {
            var cell = document.createElement("td");
            cell.id = i + " " + j;
            cell.onclick = cellClick;
            cell.innerHTML = arr[i][j];
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    if (box.childNodes.length == 1)
        box.removeChild(box.firstChild);
    box.appendChild(table);

    let timer = 0;
    stop();
    let second = document.getElementById('second');
    let minute = document.getElementById('minute');
    timerInterval = setInterval(function() {
        timer += 1/60;
        secondVal = Math.floor(timer) - Math.floor(timer/60) * 60;
        minuteVal = Math.floor(timer/60);
        second.innerHTML = secondVal < 10 ? "0" + secondVal : secondVal;
        minute.inenrHTML = minuteVal < 10 ? "0" + minuteVal : minuteVal;
        }, 1000/60);

}

let timerInterval;

function stop() {
  clearInterval(timerInterval);
}