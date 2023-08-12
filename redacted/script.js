
function loadCarriages() {
  $.getJSON("/redacted/config_data/carriages.json", populateCarriageDropdown);
}

function populateCarriageDropdown(carriages) {
  console.log(carriages);
  window.carriageData = carriages;
  window.componentsByName.carriage = {};

  var carriageDropdown = document.getElementById("carriageDropdown");
  carriages.forEach(carriage => {
    window.componentsByName.carriage[carriage.name] = carriage;

    carriageOption = document.createElement("option");
    carriageOption.text = carriage.name;
    carriageDropdown.add(carriageOption);
  });
}


function handle_carriage_change() {

  var selectedCarriageName = document.getElementById("carriageDropdown").value;
  var selectedCarriage = window.componentsByName.carriage[selectedCarriageName];
  window.currentOptions.carriage = selectedCarriage
  console.log("selected carriage: " + selectedCarriage.internal_value);

  var beltSizeDropdown = document.getElementById("beltSizeDropdown");
  var beltToleranceDropdown = document.getElementById("beltToleranceDropdown");
  beltSizeDropdown.disabled = false;
  beltToleranceDropdown.disabled = false;
}

function loadBelts() {
  $.getJSON("/redacted/config_data/belts.json", populateBeltDropdown);
}

function populateBeltDropdown(belts) {
  console.log(belts);
  window.beltData = belts;


  var beltSizeDropdown = document.getElementById("beltSizeDropdown");
  var sizes = belts["sizes"]
  window.componentsByName.belt_size = {};
  sizes.forEach(size => {
    window.componentsByName.belt_size[size.name] = size;

    var beltSizeOption = document.createElement("option");
    beltSizeOption.text = size["name"];
    beltSizeDropdown.add(beltSizeOption);
  });

  window.componentsByName.belt_tolerance = {};
  var tolerances = belts["tolerances"]
  var beltToleranceDropdown = document.getElementById("beltToleranceDropdown");
  tolerances.forEach(tolerance => {
    window.componentsByName.belt_tolerance[tolerance.name] = tolerance;

    var beltToleranceOption = document.createElement("option");
    beltToleranceOption.text = tolerance["name"];
    beltToleranceDropdown.add(beltToleranceOption);
  });

}

function handle_belt_change() {
  var selectedBeltSizeName = document.getElementById("beltSizeDropdown").value;
  var selectedBeltToleranceName = document.getElementById("beltToleranceDropdown").value;

  var selectedBeltSize = window.componentsByName.belt_size[selectedBeltSizeName];
  var selectedBeltTolerance = window.componentsByName.belt_tolerance[selectedBeltToleranceName];

  if (selectedBeltSize != undefined) {
    window.currentOptions.belt_size = selectedBeltSize;
  }
  if (selectedBeltTolerance != undefined) {
    window.currentOptions.belt_tolerance = selectedBeltTolerance;
  }

  if (window.currentOptions.belt_size != undefined && window.currentOptions.belt_tolerance != undefined) {
    console.log("selected belt size: " + selectedBeltSize.internal_value);
    console.log("selected belt tolerance: " + selectedBeltTolerance.internal_value);
    var hotendDropdown = document.getElementById("hotendDropdown");
    hotendDropdown.disabled = false;
  }


}

function loadHotends() {
  $.getJSON("/redacted/config_data/hotends.json", populateHotendDropdown);
}

function populateHotendDropdown(hotends) {
  var hotendDropdown = document.getElementById("hotendDropdown");
  console.log(hotends);
  window.hotendData = hotends;
  window.componentsByName.hotend = {};
  hotends.forEach(hotend => {
    window.componentsByName.hotend[hotend.name] = hotend;

    var hotendOption = document.createElement("option");
    hotendOption.text = hotend["name"];
    hotendDropdown.add(hotendOption);
  });


}

function handle_hotend_change() {
  var selectedHotendName = document.getElementById("hotendDropdown").value;
  var selectedHotend = window.componentsByName.hotend[selectedHotendName];
  window.currentOptions.hotend = selectedHotend
  console.log("selected hotend value: " + selectedHotend.internal_value);

  var uhfSpacerCheckBox = document.getElementById("uhfSpacerCheckbox");
  uhfSpacerCheckBox.disabled = false;
  var ductDropdown = document.getElementById("ductDropdown");
  ductDropdown.disabled = false;

  filterDuctOptions();
}

function handle_uhf_spacer_change() {
  var uhfSpacerCheckBox = document.getElementById("uhfSpacerCheckbox");
  window.currentOptions.uhfSpacer = uhfSpacerCheckBox.checked;
  filterDuctOptions();
}

function filterDuctOptions() {
  var currentHotend = window.currentOptions.hotend;

  var hotend_length = currentHotend.base_length;

  var uhf_spacer = window.currentOptions.uhfSpacer;

  if (uhf_spacer) {
    hotend_length += 1;
  }

  var ductDropdown = document.getElementById("ductDropdown");
  for (i = 1; i < ductDropdown.length; i++) {
    var ductOption = ductDropdown[i];

    var ductData = window.componentsByName.duct[ductOption.text];

    ductOption.disabled = !ductData.lengths.includes(hotend_length);
  }
}

function loadDucts() {
  $.getJSON("/redacted/config_data/ducts.json", populateDuctDropdown);
}

function populateDuctDropdown(ducts) {
  var ductDropdown = document.getElementById("ductDropdown");
  console.log(ducts);
  window.ductData = ducts;
  window.componentsByName.duct = {};
  ducts.forEach(duct => {
    window.componentsByName.duct[duct.name] = duct;

    var ductOption = document.createElement("option");
    ductOption.text = duct["name"];
    ductDropdown.add(ductOption);
  });

}

function handle_duct_change() {
  var selectedDuctName = document.getElementById("ductDropdown").value;
  var selectedDuct = window.componentsByName.duct[selectedDuctName];
  window.currentOptions.ducts = selectedDuct

  var microbowdenCheckbox = document.getElementById("microbowdenCheckbox");

  if (selectedDuct.microbowden_only == true) {
    microbowdenCheckbox.disabled = true;
    microbowdenCheckbox.checked = true;
  }

  // un-disable the checkbox only if we have an extruder selected
  else if (window.currentOptions.extruder != undefined) {
    microbowdenCheckbox.disabled = false;
  }

  var faceplateLEDsCheckbox = document.getElementById("facePlateLEDsCheckbox");
  faceplateLEDsCheckbox.disabled = false;

  console.log("selected duct name: " + selectedDuct.internal_value);

  var extruderDropdown = document.getElementById("extruderDropdown");
  extruderDropdown.disabled = false;

}

function handle_faceplate_leds_change() {
  var faceplate_leds_checkbox = document.getElementById("facePlateLEDsCheckbox");
  window.currentOptions.faceplateLeds = faceplate_leds_checkbox.checked;
  console.log("faceplate leds: " + window.currentOptions.faceplateLeds);
}

function loadExtruders() {
  $.getJSON("/redacted/config_data/extruders.json", populateExtruderDropdown);
}

function populateExtruderDropdown(extruders) {
  var extruderDropdown = document.getElementById("extruderDropdown");
  console.log(extruders);
  window.extruderData = extruders;

  window.componentsByName.extruder = {};
  extruders.forEach(extruder => {
    window.componentsByName.extruder[extruder.name] = extruder;

    var extruderOption = document.createElement("option");
    extruderOption.text = extruder["name"];
    extruderDropdown.add(extruderOption);
  });
}

function handle_extruder_change() {
  var selectedExtruderName = document.getElementById("extruderDropdown").value;
  var selectedExtruder = window.componentsByName.extruder[selectedExtruderName];
  window.currentOptions.extruder = selectedExtruder

  var selectedDuctName = document.getElementById("ductDropdown").value;
  var duct = window.componentsByName.duct[selectedDuctName];

  console.log("selected extruder name: " + selectedExtruder.internal_value);

  if (duct.microbowden_only == true) {
    microbowdenCheckbox.disabled = true;
    microbowdenCheckbox.checked = true;
    handle_microbowden_checkbox_change();
  }
  else {
    microbowdenCheckbox.disabled = false;
  }
  var probeDropdown = document.getElementById("probeDropdown");
  probeDropdown.disabled = false;
}

function handle_microbowden_checkbox_change() {

  var microbowdenCheckbox = document.getElementById("microbowdenCheckbox");
  var microbowdenEnabled = microbowdenCheckbox.checked;
  window.currentOptions.microbowden = microbowdenEnabled;

  console.log("microbowden: " + window.currentOptions.microbowden);
  var extruderDropdown = document.getElementById("extruderDropdown");
  for (i = 1; i < extruderDropdown.options.length; i++) {
    var option = extruderDropdown.options[i];
    var extruderName = option.text;
    console.log("extruder name: " + extruderName);
    var extruder = window.componentsByName.extruder[extruderName];

    var plate_name = microbowdenEnabled ? "microbowden" : "direct"

    if (extruder.plate_options.includes(plate_name)) {

      option.disabled = false;

    }
    else {

      if (option.selected) {
        extruderDropdown.selectedIndex = 0;
      }

      option.disabled = true;

    }

  }
}

function loadProbes() {
  $.getJSON("/redacted/config_data/probes.json", populateProbeDropdown);
}

function populateProbeDropdown(probes) {
  var probeDropdown = document.getElementById("probeDropdown");
  window.probeData = probes;
  console.log(probes);


  window.componentsByName.probe = {};
  probes.forEach(probe => {
    window.componentsByName.probe[probe.name] = probe;

    var probeOption = document.createElement("option");
    probeOption.text = probe["name"];
    probeDropdown.add(probeOption);
  });
}

function handle_probe_change() {
  var selectedProbeName = document.getElementById("probeDropdown").value;
  var selectedProbe = window.componentsByName.probe[selectedProbeName];
  window.probe = selectedProbe
  console.log("selected probe name: " + selectedProbe.internal_value);


  var hotend_length = window.currentOptions.hotend.base_length;

  var uhf_spacer_length = window.currentOptions.uhfSpacer ? 1 : 0;

  var duct_probe_length_adjust = window.currentOptions.ducts.probe_length_adjust;

  window.currentOptions.probeLength = hotend_length + uhf_spacer_length + duct_probe_length_adjust

  console.log("probe length: " + window.currentOptions.probeLength);

  var toolheadBoardDropdown = document.getElementById("toolheadBoardDropdown");
  toolheadBoardDropdown.disabled = false;
}

function loadToolheadBoards() {
  $.getJSON("/redacted/config_data/toolhead_boards.json", populateToolheadBoardDropdown);
}

function populateToolheadBoardDropdown(toolheadBoards) {
  var toolheadBoardDropdown = document.getElementById("toolheadBoardDropdown");
  console.log(toolheadBoards);
  window.toolheadBoardData = toolheadBoards;

  window.componentsByName.toolheadBoard = {};
  toolheadBoards.forEach(toolheadBoard => {
    window.componentsByName.toolheadBoard[toolheadBoard.name] = toolheadBoard;

    var toolheadBoardOption = document.createElement("option");
    toolheadBoardOption.text = toolheadBoard["name"];
    toolheadBoardDropdown.add(toolheadBoardOption);
  });

}

function handle_toolhead_board_change() {
  var selectedToolheadBoardName = document.getElementById("toolheadBoardDropdown").value;
  var selectedToolheadBoard = window.componentsByName.toolheadBoard[selectedToolheadBoardName];
  window.toolheadBoard = selectedToolheadBoard
  console.log("selected toolhead board name: " + selectedToolheadBoard.internal_value);
  console.log("all selected!");
}


function loadAllData() {

  window.componentsByName = {};
  loadCarriages();
  loadBelts();
  loadHotends();
  loadDucts();
  loadExtruders();
  loadProbes();
  loadToolheadBoards();

  window.currentOptions = {
    carriage: undefined,
    belt: undefined,
    hotend: undefined,
    uhfSpacer: undefined,
    ducts: undefined,
    faceplateLeds: undefined,
    extruder: undefined,
    microbowden: undefined,
    probe: undefined,
    toolheadBoard: undefined,
  }
}

function init() {
  loadAllData();
  // populateDropdowns();
}

