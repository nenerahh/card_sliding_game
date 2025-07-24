var rows = 3;
var columns = 3;

var currTile;
var otherTile;

var turns = 0;

const correctOrder = ["1","2","3","4","5","6","7","8","9"];

var imgOrder = ["2","7","3","5","6","1","8","9","4"]

window.onload = function() {
    for (let r=0; r< rows; r++){
        for (let c=0; c<columns; c++){

            let tile = document.createElement("img")
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "card_parts/" + imgOrder.shift() + ".jpg";


            tile.addEventListener("dragstart", dragstart);
            tile.addEventListener("dragover", dragover);
            tile.addEventListener("dragenter",dragenter);
            tile.addEventListener("dragleave", dragleave);
            tile.addEventListener("drop", drop);
            tile.addEventListener("dragend", dragend);

            document.getElementById("board").appendChild(tile);
        }
    }
}

function dragstart() {
    currTile = this;
}

function dragover(e) {
    e.preventDefault();
}

function dragenter(e) {
     e.preventDefault()
}

function dragleave(e) {
     e.preventDefault();
}

function drop() {
    otherTile = this;
}

function dragend() {
if (!otherTile.src.includes("4.jpg")) {
    return;
}
    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveleft = r == r2 && c2 ==c-1;
    let moveright = r == r2 && c2 == c+1;


    let moveup = c ==c2 && r2== r-1;
    let movedown = c == c2 && r2 == r+1;

    let isadjacent = moveleft || moveright || moveup || movedown;

if(isadjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;


currTile.src = otherImg;
otherTile.src = currImg;

turns += 1
document.getElementById("turns").innerText = turns;

checkWin();
}
}

function checkWin() {
    let tiles = document.querySelectorAll("#board img");
    let correct = true;

    for (let i = 0; i < tiles.length; i++) {
        let expected = "card_parts/" + correctOrder[i] + ".jpg";
        if (!tiles[i].src.includes(expected)) {
            correct = false;
            break;
        }
    }
 if (correct) {
        document.getElementById("turns").style.display = "none";
        document.getElementById("message").style.display = "block";

        document.getElementById("board").innerHTML = "";
        let fullImage = document.createElement("img");
        fullImage.src = "card_parts/full.jpg"; 
        fullImage.style.width = "360px";
        fullImage.style.height = "360px";
        document.getElementById("board").appendChild(fullImage);
    }
}