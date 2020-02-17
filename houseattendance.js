var houseglancetable = document.getElementById("houseglancetable");
var members;

var data;
var URL;
if (window.location.href.includes("house")) {
  URL = "https://api.propublica.org/congress/v1/113/house/members.json";
} else {
  URL = "https://api.propublica.org/congress/v1/113/senate/members.json";
}

fetch(URL, {
  method: "GET",
  headers: {
    "X-API-Key": "LQKdMbxtj5mUm2AbK2kXZXhjdOeLECANE8MRmhcN"
  }
})
  .then(function(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(function(json) {
    data = json;
    members = data.results[0].members;
    document.getElementById("loader").style.display = "none";
    document.getElementById("loader1").style.display = "none";
    document.getElementById("loader2").style.display = "none";
    getStatistics(members);
    fillTable(statistics);
    createLeastTable(members);
    createMostTable(members);
  });

var statistics = {
  //OBJECT TO STORE DATA
  //reps
  democrats: 0,
  republicans: 0,
  independents: 0,
  totalReps: 0,
  //votes
  votesRepublicans: 0,
  votesDemocrats: 0,
  votesIndependents: 0,
  //averages
  averageRepublicans: 0,
  averageDemocrats: 0,
  averageIndependents: 0,
  totalAverage: 0
};

function getStatistics(array) {
  //FUNCTION TO GET REQUIRED DATA===================================================================================
  for (var i = 0; i < array.length; i++) {
    if (array[i].party == "R") {
      statistics.republicans += 1;
      statistics.votesRepublicans += array[i].votes_with_party_pct;
    }
    if (array[i].party == "D") {
      statistics.democrats += 1;
      statistics.votesDemocrats += array[i].votes_with_party_pct;
    }
    if (array[i].party == "I") {
      statistics.independents += 1;
      statistics.votesIndependents += array[i].votes_with_party_pct;
    }
    statistics.totalAverage =
      (statistics.votesDemocrats +
        statistics.votesRepublicans +
        statistics.votesIndependents) /
      statistics.totalReps;
    statistics.totalReps =
      statistics.democrats + statistics.republicans + statistics.independents;

    statistics.averageRepublicans =
      statistics.votesRepublicans / statistics.republicans;

    statistics.averageDemocrats =
      statistics.votesDemocrats / statistics.democrats;

    statistics.averageIndependents =
      statistics.votesIndependents / statistics.independents;
  }

  console.log(statistics);
}

function fillTable(statistics) {
  //AT A GLANCE TABLE===================================================================================

  //REPUBLICANS-------------------------------------------------------------------------------------
  var row = document.getElementById("R");

  var republicans = document.createElement("td");
  republicans.innerHTML = statistics.republicans;

  var averageRepublicans = document.createElement("td");
  averageRepublicans.innerHTML =
    statistics.averageRepublicans.toFixed(2) + " %";

  row.append(republicans);
  row.append(averageRepublicans);

  //DEMOCRATS-------------------------------------------------------------------------------------
  var row = document.getElementById("D");

  var democrats = document.createElement("td");
  democrats.innerHTML = statistics.democrats;

  var averageDemocrats = document.createElement("td");
  averageDemocrats.innerHTML = statistics.averageDemocrats.toFixed(2) + " %";

  row.append(democrats);
  row.append(averageDemocrats);

  //INDEPENDENTS-------------------------------------------------------------------------------------
  var row = document.getElementById("I");

  var independents = document.createElement("td");
  independents.innerHTML = statistics.independents;

  var averageIndependents = document.createElement("td");
  if (statistics.independents === 0) {
    averageIndependents.innerHTML = "0%";
  } else {
    averageIndependents.innerHTML =
      statistics.averageIndependents.toFixed(2) + " %";
  }

  row.append(independents);
  row.append(averageIndependents);

  //TOTAL-------------------------------------------------------------------------------------
  var row = document.getElementById("T");

  var totalReps = document.createElement("td");
  totalReps.innerHTML = statistics.totalReps;

  var totalAverage = document.createElement("td");
  totalAverage.innerHTML = statistics.totalAverage.toFixed(2) + " %";

  row.append(totalReps);
  row.append(totalAverage);
}

function arrangeOrder(a, b) {
  if (a.missed_votes_pct < b.missed_votes_pct) {
    return 1;
  }
  if (a.missed_votes_pct > b.missed_votes_pct) {
    return -1;
  }
  return 0;
}

function arrangeOrderReverse(a, b) {
  if (a.missed_votes_pct < b.missed_votes_pct) {
    return -1;
  }
  if (a.missed_votes_pct > b.missed_votes_pct) {
    return 1;
  }
  return 0;
}

//=============================================================================
//=============================================================================

//LEAST 10 TABLE|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

var least10AttendanceTable = document.getElementById("least10AttendanceTable");
//var members = datahouse.results[0].members;

function createLeastTable(array) {
  var ordered = array.sort(arrangeOrder);

  var per = Math.round(ordered.length * 0.1);
  for (var i = 0; i < per; i++) {
    var row = document.createElement("tr");

    var name = document.createElement("td");
    var fullName =
      array[i].first_name +
      " " +
      (array[i].middle_name || " ") +
      " " +
      array[i].last_name;
    name.innerHTML = fullName;

    var missedVotes = document.createElement("td");
    missedVotes.innerHTML = array[i].missed_votes;

    var pctMissedVotes = document.createElement("td");
    pctMissedVotes.innerHTML = array[i].missed_votes_pct + " %";

    row.append(name, missedVotes, pctMissedVotes);
    least10AttendanceTable.appendChild(row);
  }

  while (true) {
    if (ordered[per - 1].missed_votes_pct == ordered[per].missed_votes_pct) {
      var row = document.createElement("tr");

      var name = document.createElement("td");
      var fullName =
        ordered[per].first_name +
        " " +
        (ordered[per].middle_name || " ") +
        " " +
        ordered[per].last_name;
      name.innerHTML = fullName;

      var missedVotes = document.createElement("td");
      missedVotes.innerHTML = ordered[per].missed_votes;

      var pctMissedVotes = document.createElement("td");
      pctMissedVotes.innerHTML = ordered[per].missed_votes_pct + " %";

      row.append(name, missedVotes, pctMissedVotes);
      most10AttendanceTable.appendChild(row);
    } else {
      break;
    }
    per++;
  }
}

//=============================================================================
//=============================================================================

//MOST 10 TABLE|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

var most10AttendanceTable = document.getElementById("most10AttendanceTable");

function createMostTable(array) {
  var ordered = array.sort(arrangeOrderReverse);
  var per = Math.round((ordered.length * 10) / 100);

  for (var i = 0; i < per; i++) {
    var row = document.createElement("tr");

    var name = document.createElement("td");
    var fullName =
      ordered[i].first_name +
      " " +
      (ordered[i].middle_name || " ") +
      " " +
      ordered[i].last_name;
    name.innerHTML = fullName;

    var missedVotes = document.createElement("td");
    missedVotes.innerHTML = ordered[i].missed_votes;

    var pctMissedVotes = document.createElement("td");
    pctMissedVotes.innerHTML = ordered[i].missed_votes_pct + " %";

    row.append(name, missedVotes, pctMissedVotes);
    most10AttendanceTable.appendChild(row);
  }

  while (true) {
    if (ordered[per - 1].missed_votes_pct == ordered[per].missed_votes_pct) {
      var row = document.createElement("tr");

      var name = document.createElement("td");
      var fullName =
        ordered[per].first_name +
        " " +
        (ordered[per].middle_name || " ") +
        " " +
        ordered[per].last_name;
      name.innerHTML = fullName;

      var missedVotes = document.createElement("td");
      missedVotes.innerHTML = ordered[per].missed_votes;

      var pctMissedVotes = document.createElement("td");
      pctMissedVotes.innerHTML = ordered[per].missed_votes_pct + " %";

      row.append(name, missedVotes, pctMissedVotes);
      most10AttendanceTable.appendChild(row);
    } else {
      break;
    }
    per++;
  }
}
