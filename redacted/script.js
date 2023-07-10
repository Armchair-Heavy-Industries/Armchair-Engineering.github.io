function loadHotends() {
  var hotendDropdown = document.getElementById("hotendDropdown");
  hotendDropdown.disabled = true;

  // Make an API call or fetch data from the "hotends" folder
  // Populate hotendDropdown with the folder names

  // Example:
  var hotendOptions = ["Hotend 1", "Hotend 2", "Hotend 3"];

  hotendOptions.forEach(function (option) {
    var hotendOption = document.createElement("option");
    hotendOption.text = option;
    hotendDropdown.add(hotendOption);
  });

  hotendDropdown.disabled = false;
}

function loadExtruders() {
  var hotendDropdown = document.getElementById("hotendDropdown");
  var extruderDropdown = document.getElementById("extruderDropdown");
  extruderDropdown.disabled = true;

  var selectedHotend = hotendDropdown.value;

  // Make an API call or fetch data from the "extruders" folder based on the selected hotend
  // Populate extruderDropdown with the folder names

  // Example:
  var extruderOptions = ["Extruder 1", "Extruder 2", "Extruder 3"];

  extruderDropdown.length = 1; // Clear existing options
  extruderOptions.forEach(function (option) {
    var extruderOption = document.createElement("option");
    extruderOption.text = option;
    extruderDropdown.add(extruderOption);
  });

  extruderDropdown.disabled = false;
}

function loadProbes() {
  var extruderDropdown = document.getElementById("extruderDropdown");
  var probeDropdown = document.getElementById("probeDropdown");
  probeDropdown.disabled = true;

  var selectedExtruder = extruderDropdown.value;
  var probeOptions = ["Probe 1", "Probe 2", "Probe 3"];
  // Make an API call or fetch data from the "probes" folder based on the selected extruder
  // Populate
