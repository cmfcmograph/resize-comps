// This script changes the dimensions of the selected comps.


{
    app.beginUndoGroup("Change Dimensions of Selected Comps");

	var myHeight = 500;
	var myWidth = 500;

	var items = app.project.items;
	var selectedComps = [];                  // Store selected comps in an array; starts as empty

	for (var i = 1; i <= items.length; i++){
	    if ((items[i] instanceof CompItem) && items[i].selected){
	        selectedComps.push(items[i]);
	    }
	}
    if(selectedComps.length<1){
        alert ("Select a comp in the Project panel!");
    }else{
        var currentComp, currentLayer, compLayers, v;
        var progress = 0;

        for (var j = 0; j <= selectedComps.length-1; j++){ // Iterate through selected comps
            currentComp = selectedComps[j];
            compLayers = currentComp.layers;
            currentComp.width = myWidth;
            currentComp.height = myHeight;

            for (var k = 1; k <= compLayers.length; k++) { // Iterate through layers
                currentLayer = currentComp.layer(k);
                
                // Find the larger value, layer height or width, and store it in v
                if(currentLayer.height>currentLayer.width){
                    v = (currentComp.width*currentComp.pixelAspect)/(currentLayer.width*currentLayer.source.pixelAspect)*100;
                }else{
                    v = (currentComp.height*currentComp.pixelAspect)/(currentLayer.height*currentLayer.source.pixelAspect)*100;
                }
                
                currentLayer.property("Scale").setValue([v,v]); // Set scale of layer
                currentLayer.property("Position").setValue([currentComp.width/2,currentComp.height/2]); // Center layer in comp
            };

            progress++;
    	}

        alert (progress+" comps resized", "Script Complete!");
        
    }
    app.endUndoGroup();
}
