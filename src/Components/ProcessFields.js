//Add fields
this.addFields = (lines, id) => {
  let processFields = {
    reqFields: [],
    allFields: [],
    defaultValues: {},
    addedLines: [],
  };
  let addedLines = [];
  Object.keys(lines).map((lineIndex, index) => {
    let line = lines[index];
    let fields = line.fields;
    let addedLine = [];
    //Fields List
    Object.keys(fields).map((fieldIndex, index) => {
      var fieldData = new Object();
      Object.assign(fieldData, fields[index]);
      let name = fieldData.name + id;
      processFields.allFields.push(name);
      processFields.defaultValues[name] = fieldData.value;
      if (fieldData.type === "select") {
        processFields.defaultValues[name + "_selectedLabel"] =
          fieldData.selectedLabel;
      }
      if (fieldData.required) {
        processFields.reqFields.push(name);
      }
      fieldData.name = name;
      addedLine.push(fieldData);
    }); //Fields End
    addedLines.push(addedLine);
  }); //Lines End
  processFields.addedLines = addedLines;
  return processFields;
};

//Remove Fields
this.removeFields = (lines, id, addedReqFields, addedFields, jsonValues) => {
  let processFields = {
    reqFields: [],
    allFields: [],
    defaultValues: {},
  };
  Object.keys(lines).map((lineIndex, index) => {
    let line = lines[index];
    let fields = line.fields;
    //Fields List
    Object.keys(fields).map((fieldIndex, index) => {
      var fieldData = fields[index];
      let name = fieldData.name + id;
      addedFields.pop(name);
      if (fieldData.required) {
        addedReqFields.pop(name);
      }
      delete jsonValues[name];
    }); //Fields End
  }); //Lines End
  processFields.reqFields = addedReqFields;
  processFields.allFields = addedFields;
  processFields.defaultValues = jsonValues;
  return processFields;
};
