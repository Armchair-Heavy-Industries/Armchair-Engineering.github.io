function loadHotends() {
  var hotendDropdown = document.getElementById("hotendDropdown");


  var hotendOptions = ["Hotend 1", "Hotend 2", "Hotend 3"];    //fetch folder names later
 
  hotendOptions.forEach(function (option) {
    var hotendOption = document.createElement("option");
    hotendOption.text = option;
    hotendDropdown.add(hotendOption);
  });

}

function loadExtruders() {
  var hotendDropdown = document.getElementById("hotendDropdown");
  var extruderDropdown = document.getElementById("extruderDropdown");

  var selectedHotend = hotendDropdown.value;

  var extruderOptions = [selectedHotend + " Extruder 1", selectedHotend + " Extruder 2", selectedHotend + " Extruder 3"];   //fetch folder names later

  extruderDropdown.length = 1;
  extruderOptions.forEach(function (option) {
    var extruderOption = document.createElement("option");
    extruderOption.text = option;
    extruderDropdown.add(extruderOption);
  });

}

function loadProbes() {
  var hotendDropdown = document.getElementById("hotendDropdown");
  var extruderDropdown = document.getElementById("extruderDropdown");
  var probeDropdown = document.getElementById("probeDropdown");
  
  var selectedHotend = hotendDropdown.value;
  var selectedExtruder = extruderDropdown.value;
  var extruderOptions = [selectedHotend + selectedExtruder + " Probe 1", selectedHotend + selectedExtruder + " Probe 2", selectedHotend + selectedExtruder + " Probe 3"];   //fetch folder names later
  
  probeDropdown.length = 1;
  probeOptions.forEach(function (option) {
    var probeOption = document.createElement("option");
    probeOption.text = option;
    probeDropdown.add(probeOption);
  // Make an API call or fetch data from the "probes" folder based on the selected extruder
  // Populate
