
function loadCarriages() {
  $.getJSON("/redacted/config_data/carriages.json", populateCarriageDropdown);

}
function populateCarriageDropdown(carriageJson) {
  console.log(carriageJson);
  window.carriageData = carriageJson;
  var carriageDropdown = document.getElementById("carriageDropdown");
  for (let optionKey in carriageJson) {
    var option = carriageJson[optionKey]
    var carriageOption = document.createElement("option");
    console.log(option)
    carriageOption.href = option.link;
    carriageOption.text = optionKey;
    carriageDropdown.add(carriageOption);
  };
}
function handle_carriage_change() {
  var selectedCarriageName = document.getElementById("carriageDropdown").value;
  window.currentOptions.carriage = selectedCarriageName
  console.log("selected carriage name: " + selectedCarriageName);
  var beltDropdown = document.getElementById("beltDropdown");
  beltDropdown.disabled = false;
}
function loadBelts() {
  $.getJSON("/redacted/config_data/belts.json", populateBeltDropdown);
}
function populateBeltDropdown(beltJson) {
  var beltDropdown = document.getElementById("beltDropdown");
  console.log(beltJson);
  window.beltData = beltJson;
  for (let optionKey in beltJson) {
    var option = beltJson[optionKey]
    var beltOption = document.createElement("option");
    console.log(option)
    beltOption.href = option.link;
    beltOption.text = optionKey;
    beltDropdown.add(beltOption);
  };
}
function handle_belt_change() {
  var selectedBelt = document.getElementById("beltDropdown").value;
  window.currentOptions.belt = selectedBelt
  console.log("selected belt name: " + selectedBelt);
  var hotendDropdown = document.getElementById("hotendDropdown");
  hotendDropdown.disabled = false;
}
function loadHotends() {
  $.getJSON("/redacted/config_data/hotends.json", populateHotendDropdown);
}
function populateHotendDropdown(hotendJson) {
  var hotendDropdown = document.getElementById("hotendDropdown");
  console.log(hotendJson);
  window.hotendData = hotendJson;
  for (let optionKey in hotendJson) {
    var option = hotendJson[optionKey]
    var hotendOption = document.createElement("option");
    console.log(option)
    console.log(optionKey)
    hotendOption.href = option.link;
    hotendOption.text = optionKey;
    hotendDropdown.add(hotendOption);
  };
}
function handle_hotend_change() {
  var selectedHotendName = document.getElementById("hotendDropdown").value;
  window.currentOptions.hotend = selectedHotendName
  console.log("selected hotend name: " + selectedHotendName);
  var uhfSpacerCheckBox = document.getElementById("uhfSpacerCheckbox");
  uhfSpacerCheckBox.disabled = false;
  var ductDropdown = document.getElementById("ductDropdown");
  ductDropdown.disabled = false;
  filterDuctOptions();
}

function handle_uhf_spacer_change() {
  var uhfSpacerCheckBox = document.getElementById("uhfSpacerCheckbox");
  window.currentOptions.uhfSpacer = uhfSpacerCheckBox.checked;
  handle_hotend_change();
}
function filterDuctOptions() {
  var hotend = window.currentOptions.hotend;
  var hotend_length = window.hotendData[hotend].base_length;
  var uhf_spacer = window.currentOptions.uhfSpacer;
  if (uhf_spacer) {
    hotend_length += 1;
  }
  var ductDropdown = document.getElementById("ductDropdown");
  for (i = 1; i < ductDropdown.length; i++) {
    var element = ductDropdown[i];
    var compatible = false;
    var duct_data = window.ductData[element.text];
    for (let duct_length in duct_data.lengths) {
      if (duct_length == hotend_length.toString()) {
        compatible = true;
        break;
      }
    }
    if (!compatible) {
      element.disabled = true;
    }
    else {
      element.disabled = false;
    }
  }
}
function loadDucts() {
  $.getJSON("/redacted/config_data/ducts.json", populateDuctDropdown);
}
function populateDuctDropdown(ductJson) {
  var ductDropdown = document.getElementById("ductDropdown");
  console.log(ductJson);
  window.ductData = ductJson;
  for (let optionKey in ductJson) {
    var option = ductJson[optionKey]
    var ductOption = document.createElement("option");
    console.log(option)
    ductOption.href = option.link;
    ductOption.text = optionKey;
    ductDropdown.add(ductOption);
  };
}
function handle_duct_change() {
  var selectedDuctName = document.getElementById("ductDropdown").value;
  window.currentOptions.ducts = selectedDuctName
  var duct = window.ductData[selectedDuctName];
  var microbowdenCheckbox = document.getElementById("microbowdenCheckbox");
  if (duct.microbowden_only == true) {
    microbowdenCheckbox.disabled = true;
    microbowdenCheckbox.checked = true;
  }
  // un-disable the checkbox, only if we have an extruder selected
  else if (window.currentOptions.extruder != undefined) {
    microbowdenCheckbox.disabled = false;
  }
  var faceplateLEDsCheckbox = document.getElementById("facePlateLEDsCheckbox");
  faceplateLEDsCheckbox.disabled = false;
  console.log("selected duct name: " + selectedDuctName);
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
function populateExtruderDropdown(extruderJson) {
  var extruderDropdown = document.getElementById("extruderDropdown");
  console.log(extruderJson);
  window.extruderData = extruderJson;
  for (let optionKey in extruderJson) {
    var option = extruderJson[optionKey]
    var extruderOption = document.createElement("option");
    console.log(option)
    extruderOption.href = option.link;
    extruderOption.text = optionKey;
    extruderDropdown.add(extruderOption);
  };
}
function handle_extruder_change() {
  var selectedExtruderName = document.getElementById("extruderDropdown").value;
  window.currentOptions.extruder = selectedExtruderName
  var selectedDuctName = document.getElementById("ductDropdown").value;
  var duct = window.ductData[selectedDuctName];
  console.log("selected extruder name: " + selectedExtruderName);
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
    var extruderName = extruderDropdown.options[i].text;
    console.log("extruder name: " + extruderName);
    var extruderData = window.extruderData[extruderName];
    var plate_name = microbowdenEnabled ? "microbowden" : "direct"
    if (extruderData.plates[plate_name].link == null) {
      if (extruderDropdown.options[i].selected) {
        extruderDropdown.selectedIndex = 0;
      }
      extruderDropdown.options[i].disabled = true;
    }
    else {
      extruderDropdown.options[i].disabled = false;
    }
  }
}

function loadProbes() {
  $.getJSON("/redacted/config_data/probes.json", populateProbeDropdown);
}

function populateProbeDropdown(probeJson) {
  var probeDropdown = document.getElementById("probeDropdown");
  console.log(probeJson);
  window.probeData = probeJson;
  for (let optionKey in probeJson) {
    var option = probeJson[optionKey]
    var probeOption = document.createElement("option");
    console.log(option)
    probeOption.href = option.link;
    probeOption.text = optionKey;
    probeDropdown.add(probeOption);
  };
}
function handle_probe_change() {
  var selectedProbeName = document.getElementById("probeDropdown").value;
  window.probe = selectedProbeName
  console.log("selected probe name: " + selectedProbeName);
  var hotend_length = window.hotendData[window.currentOptions.hotend].base_length;
  var uhf_spacer_length = window.currentOptions.uhfSpacer ? 1 : 0;
  var duct_probe_length_adjust = window.ductData[window.currentOptions.ducts].probe_length_adjust;
  window.currentOptions.probeLength = hotend_length + uhf_spacer_length + duct_probe_length_adjust
  console.log("probe length: " + window.currentOptions.probeLength);
  var toolheadBoardDropdown = document.getElementById("toolheadBoardDropdown");
  toolheadBoardDropdown.disabled = false;
}
function loadToolheadBoards() {
  $.getJSON("/redacted/config_data/toolhead_boards.json", populateToolheadBoardDropdown);
}
function populateToolheadBoardDropdown(toolheadBoardJson) {
  var toolheadBoardDropdown = document.getElementById("toolheadBoardDropdown");
  console.log(toolheadBoardJson);
  window.toolheadBoardData = toolheadBoardJson;
  for (let optionKey in toolheadBoardJson) {
    var option = toolheadBoardJson[optionKey]
    var toolheadBoardOption = document.createElement("option");
    console.log(option)
    toolheadBoardOption.href = option.link;
    toolheadBoardOption.text = optionKey;
    toolheadBoardDropdown.add(toolheadBoardOption);
  };
}
function handle_toolhead_board_change() {
  var selectedToolheadBoardName = document.getElementById("toolheadBoardDropdown").value;
  window.toolheadBoard = selectedToolheadBoardName
  console.log("selected toolhead board name: " + selectedToolheadBoardName);
  console.log("all selected!");
}
function readNames() {
}
function loadAllData() {
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

