var pascalVocFormater = {
    fromPascalVOC : function(pascalVocData){
        if (!labellingData[pascalVocData.filename] ){
            labellingData[pascalVocData.filename] = {
                shapes : []
            }
        }
    },
    toPascalVOC : function(){

        var exportData = `<?xml version="1.0"?>
<annotation>
    <folder>images</folder>
    <filename>${imgSelected.name}</filename>
    <path>images/${imgSelected.name}</path>
    <source>
        <database>Unknown</database>
    </source>
    <size>
        <width>${imgSelected.size.width}</width>
        <height>${imgSelected.size.height}</height>
        <depth>3</depth>
    </size>
    <segmented>0</segmented>`
        //Add images
        var image = labellingData[ imgSelected.name ];
        for(var shape_i = 0 ; shape_i < image.shapes.length; shape_i++){
            var shape = image.shapes[ shape_i ];
            xmin = Number.parseInt(shape.bbox.x)
            ymin = Number.parseInt(shape.bbox.y)
            xmax = Number.parseInt(shape.bbox.x + shape.bbox.w)
            ymax = Number.parseInt(shape.bbox.y + shape.bbox.h)

            exportData += `
    <object>
        <name>${shape.label}</name>
        <pose>Unspecified</pose>
        <truncated>0</truncated>
        <difficult>0</difficult>
        <bndbox>
            <xmin>${xmin}</xmin>
            <ymin>${ymin}</ymin>
            <xmax>${xmax}</xmax>
            <ymax>${ymax}</ymax>
        </bndbox>
    </object>`;
        }
        exportData += "\n</annotation>";

        return exportData;
    }

}
