// Create players vars
var p1 = null;
var p2 = null;
var turn = 0;
var current_color = null;
const BLUE = "rgb(0, 102, 204)";
const RED = "rgb(204, 0, 0)";
const GRAY = "rgb(128, 128, 128)";

// TESTING - inserting names
//$(".players > input").eq(0).val("Martin");
//$(".players > input").eq(1).val("Paja");

// Set up names and check validity of input forms
$(".players > button").click(function() {
  p1 = $(".players > input").eq(0).val();
  p2 = $(".players > input").eq(1).val();

  if (p1 === "" || p2 === "") {
    $('h5').css("color","red");
    $('h5').text("Enter players names!");
  } else {
    $(".players").slideUp("slow", function() {
      changePlayer(1);
    })
  }
});

// function for changing text and color of heading
function changePlayer(actual) {
  turn = actual;
  if (turn === 1) {
    current_color = BLUE;
    $('h5').css("color",current_color);
    $('h5').text(p1 + " : it is your turn, please pick a column to drop your blue chip");
  }
  if (turn === 2) {
    current_color = RED;
    $('h5').css("color",current_color);
    $('h5').text(p2 + " : it is your turn, please pick a column to drop your red chip");
  }
}

// Functions for checking connecting 4 chips in row horizontaly
function checkHorizontaly(col, row) {
  for (let col_i=0;col_i<=6;col_i++) {
    // TEST info
    //console.log("Sloupec " + col_i + " a radek " + row + " s barvou " + getColor(col_i, row) + " oproti barve " + current_color);
    if (checkMatchColor(getColor(col_i, row),getColor(col_i+1, row),
                       getColor(col_i+2, row),getColor(col_i+3, row))) {
      return true;
    }
  }
  return false;
}

// Functions for checking connecting 4 chips in row verticaly
function checkVerticaly(col, row) {
  for (let row_i=0;row_i<=5;row_i++) {
    if (checkMatchColor(getColor(col, row_i),getColor(col, row+1),
                       getColor(col, row_i+2),getColor(col, row_i+3))) {
      return true;
    }
  }
  return false;
}

// Functions for checking connecting 4 chips in row diagonaly
function checkDiagonaly(col, row) {
 // setting searching function to edge of board and scan from top to bottom right
  var col_start = col;
  var row_start = row;
  while (col_start > 0 || row_start > 0) {
    col_start -= 1;
    row_start -= 1;
  }
  while (col_start < 6 || row_start < 5) {
    if (checkMatchColor(getColor(col_start, row_start),getColor(col_start+1, row_start+1),
                       getColor(col_start+2, row_start+2),getColor(col_start+3, row_start+3))) {
      return true;
    }
    col_start += 1;
    row_start += 1;
  }
  // setting searching function to edge of board and scan from top to bottom left
  col_start = col;
  row_start = row;
  while (col_start < 6 || row_start > 0) {
    col_start += 1;
    row_start -= 1;
  }
  while (col_start > 0 || row_start < 5) {
    if (checkMatchColor(getColor(col_start, row_start),getColor(col_start-1, row_start+1),
                       getColor(col_start-2, row_start+2),getColor(col_start-3, row_start+3))) {
      return true;
    }
    col_start -= 1;
    row_start += 1;
  }
  return false;
}

// Function for checking match color of 4 send buttons
function checkMatchColor(one,two,three,four) {
  if (one === current_color &&
      two === current_color &&
      three === current_color &&
      four === current_color) {
    return true;
  }
  else {
    return false;
  }

}

// function for setting button color
function setColor(col, row, current_color) {
  $("tr").eq(row).find("td button").eq(col).closest("button").css("background-color", current_color);
}

// function for getting button color
function getColor(col, row) {
  return $("tr").eq(row).find("td button").eq(col).closest("button").css("background-color");
}

// Function for sending chip down in column and return final position of chip
function sendChipDown(col, row) {
  // loop throught column and insert chip on first free position from bottom
    for (let row_i=5;row_i>=0;row_i--) {
      if (getColor(col, row_i) === GRAY) {
          setColor(col, row_i, current_color);
          return [col, row_i];
    }
  }
}

// Check if gaming borad is full of chips
function checkFullBoard() {
  for (let i=0;i<=42;i++) {
    if ($(".gameButton").eq(i).css("background-color") === GRAY) {
      return false
    }
  }
  return true;
}

function resetBoard() {
  $("h5").after('<button id="reset" type="submit" class="btn btn-warning mb-2">RESTART!</button>')
  $("#reset").click(function(){
    $(".gameButton").css("background", GRAY);
    changePlayer(1);
    $(this).slideUp("slow");
  })
}

// If turn is on player1 or player2 then insert chip
$(".gameButton").click(function() {
  if (turn === 1 || turn === 2) {

    var col = $(this).closest("td").index();
    var row = $(this).closest("tr").index();

    // Send chip down and write final position of chip
    var final_pos = sendChipDown(col, row);
    col = final_pos[0];
    row = final_pos[1];

    // Checking for win - if not, change player
    if (checkHorizontaly(col, row) || checkVerticaly(col, row) || checkDiagonaly(col, row)) {
      $('h5').css("color",current_color);
      $('h5').text((turn === 1?p1:p2) + " is THE WINNER!");
      turn = 0;
      resetBoard()
    } else if (checkFullBoard()) {
      $('h5').css("color","#ffc107");
      $('h5').text("DRAW - THE BOARD IS FULL");
      turn = 0;
      resetBoard()
    } else {
      if (turn === 1) {
        changePlayer(2);
      }
      else {
        changePlayer(1);
      }
    }
  }
})
