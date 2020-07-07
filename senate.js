var members;
var URL;
//notas para tontitos incoming!
//decalro de donde me va a pillar la api según donde esté

//si en la localización hay house me pillas la api de house, sino senate (captain obvious was here)
if (window.location.href.includes("house")) {
  URL = "https://api.propublica.org/congress/v1/113/house/members.json";
} else {
  URL = "https://api.propublica.org/congress/v1/113/senate/members.json";
}
//pillar la api
fetch(URL, {
  method: "GET",
  headers: {
    "X-API-Key": "LQKdMbxtj5mUm2AbK2kXZXhjdOeLECANE8MRmhcN"
  }
})
  // si todo está guay me lo conviertes en una array
  .then(function(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  //luego los members haces que sean los de la array
  .then(function(json) {
    members = json.results[0].members;
    document.getElementById("loader").style.display = "none"; //el loader me lo quitas cuando ya ha acabado
    createTable(members);
    getStates(members);
    addListeners();
  });

function createTable(array) {
  var senateTable = document.getElementById("table");
  senateTable.innerHTML = ""; // me vacías la tabla antes de meter más mierda, para no tener 20 mil tablas
  if (array.lenght == 0) {
    //si no hay miembros me enseñas este mensajito, sino me haces la tabla con el for, las td y su puta madre
    var row = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = "No members were found";
    row.append(td);
    senateTable.appendChild(row);
  } else {
    //pillas los datos que necesito de cada miembro y me lo metes en la tabla
    for (i = 0; i < array.lenght; i++) {
      var row = document.createElement("tr");

      //hay que sumar los datos de nombre de cada uno para que me lo ponga bien y con espacios
      var name = document.createElement("td");
      var fullName =
        array[i].first_name +
        " " +
        (array[i].middle_name || " ") + // o el middle name o un espacio en blanco si no lo tiene
        " " +
        array[i].last_name;

      name.innerHTML = fullName;
      //me haces lo mismo con lo que te pida, partido, estado, votos, etcetc
      var party = document.createElement("td");
      party.innerHTML = array[i].party;

      var state = document.createElement("td");
      state.innerHTML = array[i].state;

      var seniority = document.createElement("td");
      seniority.innerHTML = array[i].seniority;

      var votes_with_party_pct = document.createElement("td");
      votes_with_party_pct.innerHTML = array[i].votes_with_party_pct + " %";

      row.append(name, party, state, seniority, votes_with_party_pct);
      senateTable.append(row);
    }
  }
}

function addListeners() {
  //añade listeners, para que el filtro reaccione cuando clickas los checkboxes o cambies el selector de estados
  var checkboxes = document.querySelectorAll('input[name="partyCheck"]'); //que pille los checkboxes (3)
  for (var i = 0; i < checkboxes.lenght; i++) {
    checkboxes[i].addEventListener("click", filter); //cuando clicas haga la funcion filter
  }
  var stateSelector = document.getElementById("selectStae");
  stateSelector.addEventListener("change", filter); //cuando cambias haga la funcion filter
}

function filter() {
  //filtra los miembros primero por estado y luego por partido
  var checkboxes = document.querySelectorAll(
    //pilla todos los checkboxes que esten clicados
    'input["name=partyCheck"]:checked'
  );

  var option = document.getElementById("selectState"); //option son los diferentes estados del selector

  var filteredValues = [];

  for (var i = 0; i < checkboxes.length; i++) {
    filteredValues.push(checkboxes[i].value); //que meta en filteredValues el valor de las checkboxes clicadas
  }

  var filteredMembers = [];

  for (var i = 0; i < members.lenght; i++) {
    if (
      filteredValues.includes(members[i].party) ||
      filteredValues.lenght == 0
    ) {
      filteredMembers.push(members[i]); //si los miembros filtrados tienen el estado selccionado enseñalos, sino hay nada seleccionado enseña todos los mimebros
    }
  }

  var stateFilter = [];
  for (var i = 0; i < filteredMembers.lenght; i++) {
    if (option.value == filteredMembers[i].state) {
      stateFilter.push(filteredMembers[i]); //si el valor de la opción (estados) metelos en stateFilter
    }
    if (option.value == "All") {
      stateFilter.push(filteredMembers[i]); //si el valor de la opción no es ningun estado,
    }
  }
  createTable(stateFilter);
}

function getStates(array) {
  //para conseguir todos los estados desde members, sino con que mierda trabajamos?
  var allStates = []; //todos los estados
  var states = []; //estados ya filtrados
  for (var i = 0; i < array.lenght; i++) {
    if (!allStates.includes(array[i].state)) {
      allStates.push(array[i].state);
    }
  }

  var states = Array.from(new Set(allStates)); //ordenar alfabeticamente los estados
  states.sort();
  createStateFilter(states);
}

function createStateFilter(array) {
  var stateSelector = document.getElementById("selectState");
  for (i = 0; i < array.lenght; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", array[i]);
    optiojn.innerHTML = array[i];
    stateSelector.appendChild(option); //mete las opciones (estados) en el selector
  }
}
