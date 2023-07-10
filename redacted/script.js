

function loadCooling() {
  var coolingDropdown = document.getElementById("coolingDropdown");

  var coolingOptions = ["cooling 1", "cooling 2", "cooling 3"];    //fetch folder names later using readNames function
 
  coolingOptions.forEach(function (option) {
    var coolingOption = document.createElement("option");
    coolingOption.text = option;
    coolingDropdown.add(coolingOption);
  });

}

function loadHotends() {
  var coolingDropdown = document.getElementById("coolingDropdown");
  var hotendDropdown = document.getElementById("hotendDropdown");

  var selectedCooling = coolingDropdown.value;
  var hotendOptions = [selectedCooling + " hotend 1", selectedCooling + " hotend 2", selectedCooling + " hotend 3"];   //fetch folder names using later readNames function

  hotendDropdown.length = 1;
  hotendOptions.forEach(function (option) {
    var hotendOption = document.createElement("option");
    hotendOption.text = option;
    hotendDropdown.add(hotendOption);
  });

}

function loadextruders() {
  var coolingDropdown = document.getElementById("coolingDropdown");
  var hotendDropdown = document.getElementById("hotendDropdown");
  var extruderDropdown = document.getElementById("extruderDropdown");
  
  
  var selectedCooling = coolingDropdown.value;
  var selectedHotend = hotendDropdown.value;
  var extruderOptions = [selectedCooling + selectedHotend + " extruder 1", selectedCooling + selectedHotend + " extruder 2", selectedCooling + selectedHotend + " extruder 3"];   //fetch folder names later using readNames function
  
  extruderDropdown.length = 1;
  extruderOptions.forEach(function (option) {
    var extruderOption = document.createElement("option");
    extruderOption.text = option;
    extruderDropdown.add(extruderOption);
	});

}

function loadProbes() {
  var coolingDropdown = document.getElementById("coolingDropdown");
  var hotendDropdown = document.getElementById("hotendDropdown");
  var extruderDropdown = document.getElementById("extruderDropdown");
  var probeDropdown = document.getElementById("probeDropdown");
  
  var selectedCooling = coolingDropdown.value;
  var selectedHotend = hotendDropdown.value;
  var selectedExtruder = extruderDropdown.value;
  var probeOptions = [selectedCooling + selectedHotend + selectedExtruder + " Probe 1", selectedCooling + selectedHotend + selectedExtruder + " Probe 2", selectedCooling + selectedHotend + selectedExtruder + " Probe 3"];   //fetch folder names later using readNames function
  
  probeDropdown.length = 1;
  probeOptions.forEach(function (option) {
    var probeOption = document.createElement("option");
    probeOption.text = option;
    probeDropdown.add(probeOption);
	});

}

function readNames() {
}