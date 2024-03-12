var TempX = [];
var TempY = [];
var TempZ = [];
var TempID = [];
var FileStructure = "";
var startX;
var endX;
var startZ;
var endZ;
function extract(filename) {
	print("Extracting structure data...");
	clientMessage("§d# startX: " + startX + " startZ: " + startZ)
	clientMessage("§d# endX: " + endX + " endZ: " + endZ)
if (startX > endX){
tempvarX = startX;
startX = endX;
endX = tempvarX;
};
if (startZ > endZ){
tempvarZ = startZ;
startZ = endZ;
endZ = tempvarZ;
};
	for (var x = startX; x <= endX; x++) {
		for (var z = startZ; z <= endZ; z++) {
			for (var y = 0; y < 256; y++) {
				var blockID = Level.getTile(x, y, z);
				if (blockID != 0) {
					TempX.push(x);
					TempY.push(y);
					TempZ.push(z);
					TempID.push(blockID);
					clientMessage("§3# "+ blockID + " " + x + " " + y + " " + z);
				}
			}
		}
	}
	for (var i = 0; i < TempID.length; i++) {
		var tempblock = "" + TempID[i] + " " + TempX[i] + " " + TempY[i] + " " + TempZ[i];
		FileStructure += tempblock + "\n";
	}
	var file = new java.io.File("/sdcard/" + filename + ".sd");
	var writer = new java.io.BufferedWriter(new java.io.FileWriter(file));
	writer.write(FileStructure);
	writer.close();
	print("The structure was successfully saved to the file structure.sd.");
}
function chatHook(chat) {
	if (chat == ".1") {
		startX = Player.getPointedBlockX();
		startZ = Player.getPointedBlockZ();
		
		print("Position 1 saved.");
	}
	if (chat == ".2") {
		endX = Player.getPointedBlockX();
		endZ = Player.getPointedBlockZ();
		print("Position 2 saved.");
	}
	if (chat.split(" ")[0] == ".extract") {
		if (chat.split(" ")[1]) {
			extract(chat.split(" ")[1]);
		} else {
			extract("structure");
	}
}
}