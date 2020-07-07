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
    createTable(members);
    getStates(members);
    addListeners();
  });

function createTable(array) {
  var senateTable = document.getElementById("table");
  senateTable.innerHTML = "";

  if (array.length == 0) {
    var row = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = "No Members Found";
    row.appendChild(td);
    senateTable.appendChild(row);
  } else {
    for (i = 0; i < array.length; i++) {
      var row = document.createElement("tr");

      var name = document.createElement("td");
      var fullName =
        array[i].first_name +
        " " +
        (array[i].middle_name || " ") +
        " " +
        array[i].last_name;

      name.innerHTML = fullName;
      var party = document.createElement("td");
      party.innerHTML = array[i].party;

      var state = document.createElement("td");
      state.innerHTML = array[i].state;

      var seniority = document.createElement("td");
      seniority.innerHTML = array[i].seniority;

      var votes_with_party_pct = document.createElement("td");
      votes_with_party_pct.innerHTML = array[i].votes_with_party_pct + " %";

      row.append(name, party, state, seniority, votes_with_party_pct);
      senateTable.appendChild(row);
    }
  }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//FILTERS
function addListeners() {
  var checkboxes = document.querySelectorAll('input[name="partyCheck"]');
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("click", filter);
  }

  var stateSelector = document.getElementById("selectState");
  stateSelector.addEventListener("change", filter);
}

function filter() {
  var checkboxes = document.querySelectorAll(
    'input[name="partyCheck"]:checked'
  );
  var option = document.getElementById("selectState");

  var filteredValues = [];
  for (var i = 0; i < checkboxes.length; i++) {
    filteredValues.push(checkboxes[i].value);
  }

  var filteredMembers = [];

  for (var i = 0; i < members.length; i++) {
    if (
      filteredValues.includes(members[i].party) ||
      filteredValues.length == 0
    ) {
      filteredMembers.push(members[i]);
    }
  }

  var stateFilter = [];
  for (var i = 0; i < filteredMembers.length; i++) {
    if (option.value == filteredMembers[i].state) {
      stateFilter.push(filteredMembers[i]);
    }

    if (option.value == "All") {
      stateFilter.push(filteredMembers[i]);
    }
  }

  createTable(stateFilter);
}

//WHY THIS ONE IS WORKING AND THE OTHER ONE NOT WILL FOREVER BE A MYSTERY*
//*not anymore, i'm just a fucking useless idiot :)

function getStates(array) {
  var allStates = [];
  var states = [];
  for (var i = 0; i < array.length; i++) {
    // Si l'array NO conté l'state, afegeix-lo
    if (!allStates.includes(array[i].state)) {
      allStates.push(array[i].state);
    }
  }
  var states = Array.from(new Set(allStates));
  states.sort();
  console.log(states);
  createStateFilter(states);
}

function createStateFilter(array) {
  var stateSelector = document.getElementById("selectState");
  for (i = 0; i < array.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", array[i]);
    option.innerHTML = array[i];
    stateSelector.appendChild(option);
  }
}
