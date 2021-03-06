this.create = (jsonValues, recreateArray,
    recreateLines, OnboardJson, isUpdate) =>{
    let pages = OnboardJson.PageList;
    let recreateCount = 0;
    //Pages
    Object.keys(pages).map((pageIndex, index) => {
        let page = pages[index];
        let categoryList = page.CategoryList;
        //Category List
        Object.keys(categoryList).map((categoryIndex, index) => {
          let category = categoryList[index];
          let sectionList = category.sectionList;
          //Section List
          Object.keys(sectionList).map((sectionIndex, index) => {
            let section = sectionList[index];
            let linesList = section.linesList;
            //reCreate
            if(section.recreate!=null && section.recreate){
                let relines = recreateLines[recreateArray[recreateCount]];                
                //let newId = "";
                Object.keys(relines).map((linesArry, index) => {
                    let reline = relines[index];                    
                    Object.keys(reline).map((lineArry, index) => {
                      let line_arr = reline[index];
                      linesList.push({"fields":line_arr});                    
                    });
                });
                section.linesList = linesList;
                recreateCount = recreateCount + 1;
            }//Recreate
            //Lines List
            Object.keys(linesList).map((lineIndex, index) => {
              let line = linesList[index];
              let fields = line.fields;              
              //Fields List
              Object.keys(fields).map((fieldIndex, index) => {
                let fieldData = fields[index];
                if(fieldData.type){
                  fieldData.value = jsonValues[fieldData.name];
                }
                
                if(fieldData.type==="select"){
                  fieldData.selectedLabel = jsonValues[fieldData.name+"_selectedLabel"];
                }
                if(fieldData.type==="button" && fieldData.label==="Apply"){
                  fieldData.label = "Update";
                }
                if(!isUpdate){
                  if(fieldData.type==="select" && fieldData.name==="app_status"){
                    fieldData.value = "submitted";
                    fieldData.selectedLabel = "Submitted";
                  }
                }
              });//Fields End
            });//Lines End
            
          });//Sections End
        });//Category End
      });//Pages End
    return OnboardJson;
}