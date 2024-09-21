// PonderJS 1.19

const CompoundTag = Java.loadClass("net.minecraft.nbt.CompoundTag");
	
Ponder.tags(event => {
	event.createTag(
		"main_quest", 
		"kubejs:computation_matrix", 
		"Chapitres de la quête principale", 
		"Quelques usines personnelles, avec 2 recettes uniques. §6Les scènes sont muettes."
	);
})

Ponder.registry(event => {
	
	let fillTinkerTank = (scene, x, y, z, v) => {
		scene.world.modifyBlockEntityNBT([x, y, z], true, nbt => 
			nbt.tank.Amount = v);
	}
	
	event.create("kubejs:andesite_machine").tag("kubejs:main_quest")
	event.create("kubejs:copper_machine").tag("kubejs:main_quest")
	event.create("kubejs:brass_machine").tag("kubejs:main_quest")
	event.create("kubejs:zinc_machine").tag("kubejs:main_quest")
	event.create("thermal:machine_frame").tag("kubejs:main_quest")
	event.create("kubejs:enderium_machine").tag("kubejs:main_quest")
	event.create("ae2:controller").tag("kubejs:main_quest")
	event.create("kubejs:substrate_chaos").tag("kubejs:main_quest")
	
	event.create("kubejs:computation_matrix").tag("kubejs:main_quest")
	.scene("intro_5", "Introduction au Chapitre 5", "kubejs:ch5_intro", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Principe
		scene.world.showSection([3, 1, 2], "WEST");
		scene.idle(20);
		
		scene.text(60, "Dans ce fameux chapitre des mathématiques, on cherche à fabriquer 8x §6Computation Matrices§f...", [3.5, 1 + 13 / 16.0, 2.5])
			.placeNearTarget();
		scene.idle(30);
		scene.world.createItemOnBeltLike([3, 1, 2], "EAST", "kubejs:computation_matrix");
		scene.idle(40);
		
		scene.world.showSection([1, 1, 2], "EAST");
		scene.idle(10);
		scene.text(60, "...A partir de §6Calculation Mechanisms", [1.5, 1 + 13 / 16.0, 2.5])
			.placeNearTarget();
		scene.idle(30);
		scene.world.createItemOnBeltLike([1, 1, 2], "WEST", "kubejs:calculation_mechanism");
		scene.idle(50);
		
		scene.text(60, "Pour ce faire, on va découper l'usine en 3 parties")
			.independent(65).colored(PonderPalette.GREEN).placeNearTarget();
		scene.idle(60);
		
		scene.world.hideSection([1, 1, 2], "UP");
		scene.world.hideSection([3, 1, 2], "UP");
		scene.idle(20);
		
		// Partie 1 - Fonte a operateurs
		scene.addKeyframe();
		scene.world.showSection([3, 1, 1], "SOUTH"); scene.idle(3);
		scene.world.showSection([4, 1, 2], "WEST"); scene.idle(3);
		scene.world.showSection([3, 1, 3], "NORTH"); scene.idle(3);
		scene.world.showSection([1, 1, 3], "NORTH"); scene.idle(3);
		scene.world.showSection([0, 1, 2], "EAST"); scene.idle(3);
		scene.world.showSection([1, 1, 1], "SOUTH"); 
		scene.idle(20);
		
		scene.text(60, "Dans un premier temps, on va fondre les Calculation Mechanisms")
			.independent(0).colored(PonderPalette.INPUT).placeNearTarget();
		scene.idle(10);
		scene.text(60, "Et fabriquer les 6 opérateurs\nà notre disposition")
			.independent(25).colored(PonderPalette.OUTPUT).placeNearTarget();
		scene.idle(10);
		scene.text(60, "3 8 + - × ÷").independent(50).placeNearTarget();
		scene.idle(10);
		
		scene.world.createItemOnBeltLike([3, 1, 1], "NORTH", "kubejs:eight"); scene.idle(3);
		scene.world.createItemOnBeltLike([4, 1, 2], "EAST", "kubejs:plus"); scene.idle(3);
		scene.world.createItemOnBeltLike([3, 1, 3], "SOUTH", "kubejs:minus"); scene.idle(3);
		scene.world.createItemOnBeltLike([1, 1, 3], "SOUTH", "kubejs:multiply"); scene.idle(3);
		scene.world.createItemOnBeltLike([0, 1, 2], "WEST", "kubejs:divide"); scene.idle(3);
		scene.world.createItemOnBeltLike([1, 1, 1], "NORTH", "kubejs:three"); 
		scene.idle(55);
		
		scene.world.hideSection([3, 1, 1], "UP");
		scene.world.hideSection([4, 1, 2], "UP");
		scene.world.hideSection([3, 1, 3], "UP");
		scene.world.hideSection([1, 1, 3], "UP");
		scene.world.hideSection([0, 1, 2], "UP");
		scene.world.hideSection([1, 1, 1], "UP"); 
		scene.idle(20);
		
		// Partie 2 - Equations
		scene.addKeyframe();
		scene.world.showSection([3, 1, 0], "SOUTH"); scene.idle(3);
		scene.world.showSection([4, 1, 1], "WEST"); scene.idle(3);
		scene.world.showSection([4, 1, 3], "WEST"); scene.idle(3);
		scene.world.showSection([3, 1, 4], "NORTH"); scene.idle(3);
		scene.world.showSection([1, 1, 4], "NORTH"); scene.idle(3);
		scene.world.showSection([0, 1, 3], "EAST"); scene.idle(3);
		scene.world.showSection([0, 1, 1], "EAST"); scene.idle(3);
		scene.world.showSection([1, 1, 0], "SOUTH"); 
		scene.idle(20);
		
		scene.text(60, "Ensuite, on fabrique\nles chiffres manquants")
			.placeNearTarget();
		scene.idle(10);
		scene.text(60, "Via des opérations\nmathématiques simples")
			.independent(25).colored(PonderPalette.GREEN).placeNearTarget();
		scene.idle(10);
		scene.text(60, "0 1 2 4 5 6 7 9").independent(50).placeNearTarget();
		scene.idle(10);
		
		scene.world.createItemOnBeltLike([3, 1, 0], "NORTH", "kubejs:zero"); scene.idle(3);
		scene.world.createItemOnBeltLike([4, 1, 1], "EAST", "kubejs:one"); scene.idle(3);
		scene.world.createItemOnBeltLike([4, 1, 3], "EAST", "kubejs:two"); scene.idle(3);
		scene.world.createItemOnBeltLike([3, 1, 4], "SOUTH", "kubejs:four"); scene.idle(3);
		scene.world.createItemOnBeltLike([1, 1, 4], "SOUTH", "kubejs:five"); scene.idle(3);
		scene.world.createItemOnBeltLike([0, 1, 3], "WEST", "kubejs:six"); scene.idle(3);
		scene.world.createItemOnBeltLike([0, 1, 1], "WEST", "kubejs:seven"); scene.idle(3);
		scene.world.createItemOnBeltLike([1, 1, 0], "NORTH", "kubejs:nine");
		scene.idle(39);
		
		let crafter = scene.world.showIndependentSection([1, 2, 2, 3, 2, 2], "DOWN");
		scene.world.moveSection(crafter, [0, -1, 0], 0);
		scene.idle(20);
		
		scene.overlay.showSelectionWithText([1, 1, 2, 3, 1, 2], 60)
			.text("Choisissez vos équations\nà l'avance")
			.pointAt([1, 1.5, 2.5])
			.colored(PonderPalette.GREEN)
			.placeNearTarget();
		scene.idle(70);
		
		scene.world.hideSection([1, 1, 0, 3, 1, 0], "UP");
		scene.world.hideSection([4, 1, 1], "UP");
		scene.world.hideSection([4, 1, 3], "UP");
		scene.world.hideSection([1, 1, 4, 3, 1, 4], "UP");
		scene.world.hideSection([0, 1, 1], "UP");
		scene.world.hideSection([0, 1, 3], "UP");
		scene.world.hideIndependentSection(crafter, "UP");
		scene.idle(20);
		
		// Partie 3 - Computation Matrices
		scene.addKeyframe();
		scene.world.showSection([2, 1, 3], "DOWN");
		scene.idle(20);
		
		scene.text(60, "Enfin, on fait fondre tous\nles chiffres à part égale", [2, 1.5, 3.5])
			.placeNearTarget();
		scene.idle(50);
		
		scene.world.showSection([2, 1, 1], "DOWN");
		scene.idle(20);
		scene.text(60, "Et on moule les 8x\n§6Computation Matrices", [2, 1.5, 1.5])
			.colored(PonderPalette.OUTPUT).placeNearTarget();
		scene.idle(80);
		
		// Avertissement
		scene.addKeyframe();
		scene.text(100, "Avertissement !")
			.independent(64).colored(PonderPalette.OUTPUT).placeNearTarget();
		scene.idle(10);
		scene.text(100, "Les autres process du Chapitre 5...")
			.independent(80).placeNearTarget();
		scene.idle(10);
		scene.text(100, "§7Matter Plastics§f, Oil & §6Refined Fuel§f,\nOxygen & Fusée...")
			.independent(96).placeNearTarget();
		scene.idle(10);
		scene.text(100, "ne sont pas montrés, dû au peu d'automatisation qu'ils nécessitent")
			.independent(121).placeNearTarget();
		scene.idle(80);
	})
	.scene("number_part", "Forge à opérateurs", "kubejs:ch5_numbers", (scene, util) => {
		// Edit schematic : Enlever l'Anchor
		//								: Air dans les 6 chutes
		// 								: Create Tank controller Amount 1
		scene.configureBasePlate(0, 0, 5);
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		
		// Sections & Positions
		let outCableLeft = [[4,1,1], [4,1,2], [4,1,3], [4,1,4]];
		let outCableRight = [[0,1,1], [0,1,2], [0,1,3], [0,1,4]];
		let ctrlCableLeft = [[3,1,4], [3,2,4], [3,3,4], [3,3,3], [3,3,2]];
		let ctrlCableRight = [[1,1,4], [1,2,4], [1,3,4], [1,3,3], [1,3,2]];
		let inputCable = [[3,1,1], [3,2,1], [3,3,1]];
		let interfaces = [[4,5,2], [4,5,3], [4,5,4], [0,5,2], [0,5,3], [0,5,4]];
		let emitters = [[3,7,2], [3,7,3], [3,7,4], [1,7,2], [1,7,3], [1,7,4]];
		
		let fuelTank = [2, 2, 1];
		let melter = [2, 3, 1];
		let enderTank = [2, 2, 2];
		let fluidCell = [2, 3, 2];
		let tank = [1, 4, 2, 3, 4, 4];
		
		// Utilities
		let ops = [];
		let casts = [];
		let numbs = [16000, 1600, 4800, 17600, 4800, 6400];
		let types = ["eight", "multiply", "divide", "three", "plus", "minus"];
		types.forEach(t => {
			ops.push("kubejs:" + t);
			casts.push("kubejs:" + t + "_cast");
		});
		let indySects = [];
		
		let fillCreateTank = (x, y, z, v) => {
			scene.world.modifyBlockEntityNBT([x, y, z], true, nbt => nbt.TankContent.Amount = v);
		}
		
		// Conditions initiales
		// Controller off
		scene.world.modifyBlock([5, 1, 0], s => s.with("state", "offline"), false);
		// Dense cable, no connection, no channels
		for(let x = 0; x <= 4; x++) {
			scene.world.modifyBlockEntityNBT([x, 1, 0], true, nbt => {
				nbt.cable.visual.connections = ["east", "west"];
				nbt.cable.visual.channels = 0;
			});
		}
		scene.world.modifyBlockEntityNBT([0, 1, 0], true, nbt => nbt.cable.visual.connections = ["east"]);
		for(let z = 1; z <= 4; z++) {
			// Output cable right, no interfaces, no channels
			scene.world.modifyBlockEntityNBT([0, 1, z], true, nbt => {
				nbt.up = new CompoundTag();
				nbt.cable.visual.channels = 0;
			});
			// Output cable left, no interfaces, no channels
			scene.world.modifyBlockEntityNBT([4, 1, z], true, nbt => {
				nbt.up = new CompoundTag();
				nbt.cable.visual.channels = 0;
			});
		}
		
		// Output cables, no connection to control cables
		scene.world.modifyBlockEntityNBT([0, 1, 4], true, nbt =>nbt.cable.visual.connections = ["north"]);
		scene.world.modifyBlockEntityNBT([4, 1, 4], true, nbt =>nbt.cable.visual.connections = ["north"]);
			
		for(let z = 1; z <= 4; z++) {
			// Control cable right, no emitters
			scene.world.modifyBlockEntityNBT([1, 3, z], true, nbt => nbt.up = new CompoundTag());
			// Control cable left, no emitters
			scene.world.modifyBlockEntityNBT([3, 3, z], true, nbt => nbt.up = new CompoundTag());
		}
		
		// Input cable, no channels
		for(let y = 1; y <= 3; y++) 
			scene.world.modifyBlockEntityNBT([3, y, 1], true, nbt => nbt.cable.visual.channels = 0);
		// Input cable, no export bus
		scene.world.modifyBlockEntityNBT([3, 3, 1], true, nbt => nbt.west = new CompoundTag());
		// Green light on cell in ME Drive
		scene.world.modifyBlockEntityNBT([5, 2, 0], true, nbt => nbt.visual.cell4.state = "empty");
		
		fillTinkerTank(scene, 2, 2, 1, 0);
		scene.world.modifyBlockEntityNBT(melter, true, nbt => {
			nbt.inventory.items = [new CompoundTag(), new CompoundTag(), new CompoundTag()];
			nbt.tank.Amount = 0;
		});
		scene.world.modifyBlockEntityNBT(fluidCell, true, nbt => {
			nbt.TankInv[0].Amount = 0;
			nbt.RenderFluid.Amount = 0;
		});
		fillCreateTank(1, 4, 2, 0);
			
		for(let z = 2; z <= 4; z++) {
			scene.world.modifyBlockEntityNBT([0, 4, z], true, nbt => nbt.render_fluid.Amount = 0);
			scene.world.modifyBlockEntityNBT([0, 3, z], true, nbt => {
				nbt.Items = [new CompoundTag()];
				nbt.tank.fluid.Amount = 0;
			});
			scene.world.modifyBlockEntityNBT([4, 4, z], true, nbt => nbt.render_fluid.Amount = 0);
			scene.world.modifyBlockEntityNBT([4, 3, z], true, nbt => {
				nbt.Items = [new CompoundTag()];
				nbt.tank.fluid.Amount = 0;
			});
		}
		scene.idle(20);
		
		// Debut scene 
		scene.text(80, "Contrairement aux Chapitres 1 à 4A, on sait ici combien de produits finaux on veut")
			.independent(25).colored(PonderPalette.GREEN).placeNearTarget();
		scene.idle(90);
		scene.text(80, "Comme on a choisi nos équations, on calcule combien d'opérateurs on a besoin")
			.independent(50).placeNearTarget();
		scene.idle(90);
		scene.text(80, "Pour éviter une surproduction, on utilise une structure de contrôle\n\nIci, un petit réseau ME")
			.independent(75).colored(PonderPalette.GREEN).placeNearTarget();
		scene.idle(70);
		
		scene.world.showSection([5, 1, 0], "DOWN");
		scene.idle(20);
		
		// Apparition du Dense Cable
		scene.addKeyframe();
		for(let x = 4; x >= 0; x--) {
			scene.world.showSection([x, 1, 0], "DOWN");
			scene.idle(3);
		}
		scene.idle(27);
		
		// Apparition des cables d'output et connexion au dense cable
		scene.world.modifyBlockEntityNBT([4, 1, 0], true, nbt =>  
			nbt.cable.visual.connections = ["east", "south", "west"]);
		outCableLeft.forEach(s => {
			scene.world.showSection(s, "DOWN");
			scene.idle(3);
		});
		
		scene.world.modifyBlockEntityNBT([0, 1, 0], true, nbt => 
			nbt.cable.visual.connections = ["east", "south"]);
		outCableRight.forEach(s => {
			scene.world.showSection(s, "DOWN");
			scene.idle(3);
		});
		scene.idle(20);
		
		// Arrivee des interfaces et mise a jour des cables
		interfaces.forEach(s => {
			let IS = scene.world.showIndependentSection(s, "DOWN");
			scene.world.moveSection(IS, [0, -4, 0], 0);
			scene.idle(3);
		});
		for(let z = 2; z <= 4; z++) {
			scene.world.replaceBlocks([4, 5, z], "air", false);
			scene.world.restoreBlocks([4, 1, z]);
			if(z == 4)
				scene.world.modifyBlockEntityNBT([4, 1, 4], true, nbt => 
					nbt.cable.visual.connections = ["north", "up"]);
			scene.world.modifyBlockEntityNBT([4, 1, z], true, nbt => nbt.cable.visual.powered = false);
			scene.idle(3);
		}
		for(let z = 2; z <= 4; z++) {
			scene.world.replaceBlocks([0, 5, z], "air", false);
			scene.world.restoreBlocks([0, 1, z]);
			if(z == 4)
				scene.world.modifyBlockEntityNBT([0, 1, 4], true, nbt =>
					nbt.cable.visual.connections = ["north", "up"]);
			scene.world.modifyBlockEntityNBT([0, 1, z], true, nbt => nbt.cable.visual.powered = false);
			scene.idle(3);
		}
		scene.idle(10);
		
		// Infos interfaces
		let interfacesLeft = AABB.of(4, 1.75, 2, 5, 2, 5);
		let interfacesRight = AABB.of(0, 1.75, 2, 1, 2, 5);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.OUTPUT, new Object(), interfacesLeft, 50);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.OUTPUT, new Object(), interfacesRight, 50);
		scene.text(50, "ME Interfaces", [4, 1 + 7 / 8.0, 4.5]).placeNearTarget();
		scene.idle(60);
		
		// Apparition des cables de controle et connexion aux cables d'output
		scene.world.modifyBlockEntityNBT([4, 1, 4], true, nbt =>
			nbt.cable.visual.connections = ["north", "up", "west"]);
		ctrlCableLeft.forEach(s => {
			scene.world.showSection(s, "DOWN");
			scene.idle(3);
		});
		
		scene.world.modifyBlockEntityNBT([0, 1, 4], true, nbt =>
			nbt.cable.visual.connections = ["north", "up", "east"]);
		ctrlCableRight.forEach(s => {
			scene.world.showSection(s, "DOWN");
			scene.idle(3);
		});
		scene.idle(20);
		
		// Arrivee des emitters et mise a jour des cables
		emitters.forEach(s => {
			let IS = scene.world.showIndependentSection(s, "DOWN");
			scene.world.moveSection(IS, [0, -4, 0], 0);
			scene.idle(3);
		});
		for(let z = 2; z <= 4; z++) {
			scene.world.replaceBlocks([3, 7, z], "air", false);
			scene.world.restoreBlocks([3, 3, z]);
			scene.world.modifyBlockEntityNBT([3, 3, z], true, nbt => nbt.up.visual.on = false);
			scene.idle(3);
		}
		for(let z = 2; z <= 4; z++) {
			scene.world.replaceBlocks([1, 7, z], "air", false);
			scene.world.restoreBlocks([1, 3, z]);
			scene.world.modifyBlockEntityNBT([1, 3, z], true, nbt => nbt.up.visual.on = false);
			scene.idle(3);
		}
		scene.idle(10);
		
		// Infos emitters
		let ctrlLeft = AABB.of(3 + 6 / 16.0, 3 + 11 / 16.0, 2 + 6 / 16.0, 3 + 10 / 16.0, 4, 4 + 10 / 16.0);
		let ctrlRight = AABB.of(1 + 6 / 16.0, 3 + 11 / 16.0, 2 + 6 / 16.0, 1 + 10 / 16.0, 4, 4 + 10 / 16.0);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.RED, new Object(), ctrlLeft, 50);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.RED, new Object(), ctrlRight, 50);
		scene.text(60, "Level Emitters, pour\ncontrôler les Faucets", [1.5, 3 + 7 / 8.0, 2.5])
			.placeNearTarget();
		scene.idle(70);	
		
		// Apparition du Cable d'input et connexion au dense cable
		scene.world.modifyBlockEntityNBT([3, 1, 0], true, nbt =>  
			nbt.cable.visual.connections = ["east", "south", "west"]);
		inputCable.forEach(s => {
			scene.world.showSection(s, "DOWN");
			scene.idle(3);
		});
		scene.idle(20);		
		
		// Arrivee de l'export bus et mise a jour du cable
		{ let IS = scene.world.showIndependentSection([3, 7, 1], "EAST");
			scene.world.moveSection(IS, [0, -4, 0], 0);
			scene.idle(18);
			scene.world.replaceBlocks([3, 7, 1], "air", false);
			scene.world.restoreBlocks([3, 3, 1]);
			scene.world.modifyBlockEntityNBT([3, 3, 1], true, nbt => nbt.cable.visual.powered = false); }
		
		// Info export bus
		let exportBus = AABB.of(3, 3.25, 1.25, 3.25, 3.75, 1.75);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.INPUT, new Object(), exportBus, 90);
		scene.text(50, "ME Export Bus", [3, 3.5, 1.5]).placeNearTarget();
		scene.idle(60);
		
		// Config export bus
		scene.showControls(30, [3 + 1 / 8.0, 3 + 7 / 8.0, 1.5], "DOWN")
			.withItem("kubejs:calculation_mechanism");
		scene.idle(40);
		
		// Alimentation du reseau
		// En 1.16, les emitters prennent des channels. On force l'apparence des channels
		// Controller on
		scene.world.modifyBlock([5, 1, 0], s => s.with("state", "online"), false);
		// Cables output, 6 channels d'apparence au lieu de 3 dans le nbt
		scene.world.modifyBlockEntityNBT([0, 1, 1], true, nbt => nbt.cable.visual.channels = 6);
		scene.world.modifyBlockEntityNBT([4, 1, 1], true, nbt => nbt.cable.visual.channels = 6);
		scene.world.modifyBlockEntityNBT([0, 1, 2], true, nbt => 
			nbt.cable.visual = { channelsNorth: 6, channelsSouth: 5, channelsUp: 1, 
			connections: ["north", "south", "up"], powered: true });
		scene.world.modifyBlockEntityNBT([4, 1, 2], true, nbt =>
			nbt.cable.visual = { channelsNorth: 6, channelsSouth: 5, channelsUp: 1, 
			connections: ["north", "south", "up"], powered: true });
		scene.world.modifyBlockEntityNBT([0, 1, 3], true, nbt =>
			nbt.cable.visual = { channelsNorth: 5, channelsSouth: 4, channelsUp: 1, 
			connections: ["north", "south", "up"], powered: true });
		scene.world.modifyBlockEntityNBT([4, 1, 3], true, nbt =>
			nbt.cable.visual = { channelsNorth: 5, channelsSouth: 4, channelsUp: 1, 
			connections: ["north", "south", "up"], powered: true });
		scene.world.modifyBlockEntityNBT([0, 1, 4], true, nbt =>
			nbt.cable.visual = { channelsNorth: 4, channelsUp: 1, 
			connections: ["north", "east", "up"], powered: true });
		scene.world.modifyBlockEntityNBT([4, 1, 4], true, nbt =>
			nbt.cable.visual = { channelsNorth: 4, channelsUp: 1, 
			connections: ["north", "west", "up"], powered: true });
		// Cable input, 1 channel comme dans le nbt
		for(let y = 1; y <= 3; y++) scene.world.restoreBlocks([3, y, 1]);
		// Dense cable, 13 channels en tout, au lieu de 7 dans le nbt
		for(let x = 0; x <= 2; x++) 
			scene.world.modifyBlockEntityNBT([x, 1, 0], true, nbt => nbt.cable.visual.channels = 6);
		scene.world.modifyBlockEntityNBT([3, 1, 0], true, nbt =>
			nbt.cable.visual = { channelsEast: 7, channelsWest: 6, channelsSouth: 1, 
			connections: ["east", "west", "south"], powered: true });
		scene.world.modifyBlockEntityNBT([4, 1, 0], true, nbt =>
			nbt.cable.visual = { channelsEast: 13, channelsWest: 7, channelsSouth: 6, 
			connections: ["east", "west", "south"], powered: true });
		scene.idle(20);
		
		// Apparition terminal et drive
		scene.world.showSection([5, 2, 0, 5, 3, 0], "DOWN");
		scene.idle(20);
		
		// Input manuel dans le reseau
		scene.showControls(30, [5.5, 3.5, 0], "RIGHT").withItem("kubejs:calculation_mechanism");
		scene.text(30, "1707x Calculation Mechanisms", [5.5, 3.5, 0]).placeNearTarget();
		scene.idle(15);
		
		// Blue LED sur la cell
		scene.world.restoreBlocks([5, 2, 0]);
		scene.idle(35);
		
		scene.text(60, "Voilà pour le réseau ME\n\nLa forge maintenant...")
			.independent(100).placeNearTarget();
		scene.idle(80);
		
		// Apparition des chutes et des Casting Tables (droite)
		scene.addKeyframe();
		for(let z = 2; z <= 4; z++) {
			scene.world.showSection([0, 2, z], "DOWN");
			scene.idle(3);
		}
		for(let z = 2; z <= 4; z++) {
			scene.world.showSection([0, 3, z], "DOWN");
			scene.idle(3);
		}
		
		scene.rotateCameraY(70);
		scene.idle(35);
		
		// Apparition des chutes et des Casting Tables (gauche)
		for(let z = 2; z <= 4; z++) {
			scene.world.showSection([4, 2, z], "DOWN");
			scene.idle(3);
		}
		for(let z = 2; z <= 4; z++) {
			scene.world.showSection([4, 3, z], "DOWN");
			scene.idle(3);
		}
		scene.idle(17);
		
		scene.text(60, "Les réglages suivants sont valables pour les équations\nque j'ai choisi pour la suite")
			.independent(100).colored(PonderPalette.GREEN).placeNearTarget();
		scene.idle(70);
		
		// Config des Tables et des Emitters (gauche)
		for(let z = 2; z <= 4; z++) {
			scene.showControls(30, [4.5, 4, z + 0.5], "DOWN").withItem(casts[z+1]).rightClick();
			scene.idle(15);
			scene.world.restoreBlocks([4, 3, z]);
			scene.world.modifyBlockEntityNBT([4, 3, z], true, nbt => nbt.tank.fluid.Amount = 0);
			scene.idle(25);
			
			scene.showControls(30, [3.5, 3.85, z + 0.5], "RIGHT").withItem(ops[z+1]);
			scene.text(30, "Réglage: " + numbs[z+1] + " - 1 (Inverted)", [3.5, 3.85, z + 0.5]).placeNearTarget();
			scene.idle(15);
			scene.world.restoreBlocks([3, 3, z]);
			scene.idle(25);
		}
		
		scene.rotateCameraY(-70);
		scene.idle(35);
		
		// Config des Tables et des Emitters (droite)
		for(let z = 2; z <= 4; z++) {
			scene.showControls(30, [0.5, 4, z + 0.5], "DOWN").withItem(casts[z-2]).rightClick();
			scene.idle(15);
			scene.world.restoreBlocks([0, 3, z]);
			scene.world.modifyBlockEntityNBT([0, 3, z], true, nbt => nbt.tank.fluid.Amount = 0);
			scene.idle(25);
			
			scene.showControls(30, [1.5, 3.85, z + 0.5], "RIGHT").withItem(ops[z-2]);
			scene.text(30, "Réglage: " + numbs[z-2] + " - 1 (Inverted)", [1.5, 3.85, z + 0.5]).placeNearTarget();
			scene.idle(15);
			scene.world.restoreBlocks([1, 3, z]);
			scene.idle(25);
			
		}
		scene.idle(15);
		
		scene.addKeyframe();
		scene.world.showSection(fuelTank, "DOWN");
		scene.world.showSection(melter, "DOWN"); 
		scene.idle(20);
		
		scene.world.showSection(enderTank, "DOWN");
		scene.idle(20);
		
		scene.text(60, "Le Melter est alimenté\nen Blazing Blood", [2, 2.5, 1.5]).placeNearTarget();
		scene.idle(30);		
		
		scene.world.restoreBlocks(fuelTank);
		for(let i = 1; i <= 40; i++) {
			fillTinkerTank(scene, 2, 2, 1, i * 100); 
			scene.idle(1);
		}
		scene.idle(20);
		
		// Simulation fonte Mechanisms
		scene.world.restoreBlocks(melter);
		scene.world.modifyBlock(melter, s => s.with("active", "true"), false);
		fillTinkerTank(scene, 2, 3, 1, 0); 
		scene.idle(20);
		
		scene.text(60, "Les Mechanisms sont fondus\nen Liquified Logic", [2, 3.5, 1.5]).placeNearTarget();
		scene.idle(30);
		
		scene.world.restoreBlocks(melter);
		scene.world.modifyBlock(melter, s => s.with("active", "true"), false);
		for(let i = 1; i <= 40; i++) {
			fillTinkerTank(scene, 2, 3, 1, i * 27);
			scene.idle(1);
		}
		scene.idle(20);
		
		scene.world.modifyBlock(melter, s => s.with("active", "false"), false);
		scene.world.modifyBlockEntityNBT(melter, true, nbt =>
			nbt.inventory.items = [new CompoundTag(), new CompoundTag(), new CompoundTag()]);
		
		scene.world.showSection(fluidCell, "DOWN");
		scene.idle(20);
		
		scene.text(60, "Une Fluid Cell transfère le liquide du Melter vers le Tank", [2, 3.5, 2.5])
			.placeNearTarget();
		scene.idle(70);
		
		scene.world.showSection(tank, "DOWN");
		scene.idle(20);
		
		// Animation Melter to Tank
		scene.world.restoreBlocks([1, 4, 2]);
		for(let i = 1; i <= 40; i++) {
			fillTinkerTank(scene, 2, 3, 1, 1080 - i * 27);
			fillCreateTank(1, 4, 2, i * 1800);
			scene.idle(1);
		}
		scene.idle(20);
		
		// Apparition des Faucets
		scene.addKeyframe();
		for(let z = 2; z <= 4; z++) {
			scene.world.showSection([4, 4, z], "DOWN");
			scene.idle(3);
		}
		for(let z = 2; z <= 4; z++) {
			scene.world.showSection([0, 4, z], "DOWN");
			scene.idle(3);
		}
		scene.idle(20);
		
		scene.rotateCameraY(20);
		scene.idle(15);
		
		scene.text(60, "Les Faucets sont activés\npar les Level Emitters", [0.6, 4.5, 2.5]).placeNearTarget();
		scene.idle(70);
		
		// Animation Faucets pendant 1s 
		for(let z = 2; z <= 4; z++) {
			scene.world.restoreBlocks([0, 4, z]);
			scene.world.restoreBlocks([4, 4, z]);
		}
		scene.idle(20);
		
		for(let z = 2; z <= 4; z++) {
			scene.world.modifyBlockEntityNBT([0, 4, z], true, nbt => nbt.render_fluid.Amount = 0);
			scene.world.modifyBlockEntityNBT([4, 4, z], true, nbt => nbt.render_fluid.Amount = 0);
		}
		for(let z = 2; z <= 4; z++) {
			scene.world.restoreBlocks([0, 3, z]);
			scene.world.restoreBlocks([4, 3, z]);
		}
		scene.idle(20);
		
		scene.text(60, "Les opérateurs sont évacués par les chutes, et insérés dans le réseau ME via les Interfaces", [0.5, 2.5, 2])
			.colored(PonderPalette.OUTPUT).placeNearTarget();
		scene.idle(30);
		
		// Evacuation des tables
		for(let z = 2; z <= 4; z++) {
			scene.world.restoreBlocks([0, 3, z]);
			scene.world.restoreBlocks([4, 3, z]);
			scene.world.modifyBlockEntityNBT([0, 3, z], true, nbt => nbt.tank.fluid.Amount = 0);
			scene.world.modifyBlockEntityNBT([4, 3, z], true, nbt => nbt.tank.fluid.Amount = 0);
		}
		scene.idle(40);
		
		// Resultats dans le ME Drive
		scene.showControls(30, [5.75, 3.5, 0], "RIGHT").withItem("kubejs:plus"); scene.idle(10);
		scene.showControls(30, [5.5, 3.75, 0], "DOWN").withItem("kubejs:minus"); scene.idle(10);
		scene.showControls(30, [5.25, 3.5, 0], "LEFT").withItem("kubejs:multiply"); scene.idle(10);
		scene.showControls(30, [5.5, 3.25, 0], "UP").withItem("kubejs:divide"); scene.idle(10);
		scene.showControls(30, [5.75, 3.5, 0], "RIGHT").withItem("kubejs:three"); scene.idle(10);
		scene.showControls(30, [5.5, 3.75, 0], "DOWN").withItem("kubejs:eight");
		scene.idle(40);
		
		scene.rotateCameraY(-20);
		scene.idle(15);
		
		// Animation casts rapides
		for(let i = 0; i < 7; i++) {
			if(i == 2)
				scene.text(60, "100 Casts / minute").independent(25).colored(PonderPalette.MEDIUM).placeNearTarget();
			
			for(let z = 2; z <= 4; z++) {
				scene.world.restoreBlocks([0, 4, z]);
				scene.world.restoreBlocks([4, 4, z]);
			}
			scene.idle(1);
			
			for(let z = 2; z <= 4; z++) {
				scene.world.modifyBlockEntityNBT([0, 4, z], true, nbt => nbt.render_fluid.Amount = 0);
				scene.world.modifyBlockEntityNBT([4, 4, z], true, nbt => nbt.render_fluid.Amount = 0);
			}
			for(let z = 2; z <= 4; z++) {
				scene.world.restoreBlocks([0, 3, z]);
				scene.world.restoreBlocks([4, 3, z]);
			}
			scene.idle(15);
			
			for(let z = 2; z <= 4; z++) {
				scene.world.restoreBlocks([0, 3, z]);
				scene.world.restoreBlocks([4, 3, z]);
				scene.world.modifyBlockEntityNBT([0, 3, z], true, nbt => nbt.tank.fluid.Amount = 0);
				scene.world.modifyBlockEntityNBT([4, 3, z], true, nbt => nbt.tank.fluid.Amount = 0);
			}
		}
		
		// Drive full en fin d'animation
		scene.world.modifyBlockEntityNBT([5, 2, 0], true, nbt => nbt.visual.cell4.state = "full");
	})
	.scene("math_part", "Atelier à équations", "kubejs:ch5_equations", (scene, util) => {
		scene.world.replaceBlocks([0, 0, 2], "minecraft:gray_concrete", false);
		scene.world.replaceBlocks([0, 0, 3], "minecraft:cyan_terracotta", false);
		scene.world.replaceBlocks([1, 0, 3], "minecraft:gray_concrete", false);
		
		scene.configureBasePlate(0, 0, 5);
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Utilities
		let one = "kubejs:one";
		let three = "kubejs:three";
		let six = "kubejs:six";
		let eight = "kubejs:eight";
		let plus = "kubejs:plus";
		let minus = "kubejs:minus";
		let multiply = "kubejs:multiply";
		let divide = "kubejs:divide";
		let pattern = "ae2:blank_pattern";
		let capaCard = "ae2:capacity_card";
		
		let crafterKinSpeed = () => {
			for(let y = 1; y <= 3; y++) 
				for(let x = 1; x <= 3; x++) 
					scene.world.setKineticSpeed([x, y, 2], (x + y) % 2 == 0 ? 64 : -64);
		}
		
		let setupBus = (x, y, card, op1, op2) => {
			let posUp = [x + 0.5, y + 0.75, 3.25];
			let posRight = [x + 0.75, y + 0.6, 3.25];
			let posLeft = [x + 0.25, y + 0.4, 3.25];
			
			let time = 30;
			if(card) time += 10;
			if(op1) time += 10;
			if(op2) time += 10;
			
			let bus = AABB.of(x + 0.25, y + 0.25, 3, x + 0.75, y + 0.75, 3.25);
			scene.overlay.chaseBoundingBoxOutline(PonderPalette.INPUT, new Object(), bus, time);
			if(card) {
				scene.showControls(30, posUp, "DOWN").withItem(card);
				scene.idle(10);
			}
			if(op1) {
				scene.showControls(30, posLeft, "RIGHT").withItem(op1);
				scene.idle(10);
			}
			if(op2) {
				scene.showControls(30, posRight, "LEFT").withItem(op2);
				scene.idle(10);
			}
			scene.idle(40);	
		}
		
		// Crafters vide
		for(let x = 1; x <= 3; x++) 
			for(let y = 1; y <= 3; y++) 
				scene.world.modifyBlockEntityNBT([x, y, 2], true, nbt => nbt.Inventory.Items = [new CompoundTag()]);
		
		// Intro
		scene.text(60, "A partir des symboles\nà notre disposition...").independent(25).placeNearTarget();
		scene.idle(10);
		scene.text(60, "3 8 + - × ÷").independent(50).colored(PonderPalette.INPUT).placeNearTarget();
		scene.idle(60);
		scene.text(60, "On cherche à fabriquer\nles autres chiffres").independent(66).placeNearTarget();
		scene.idle(10);
		scene.text(60, "0 1 2 4 5 6 7 9").independent(91).colored(PonderPalette.OUTPUT).placeNearTarget();
		scene.idle(90);
		
		scene.world.showSection([5, 1, 0, 5, 3, 0], "DOWN");
		scene.idle(20);
		
		scene.text(60, "On va donc faire des crafts automatiques le réseau ME", [5, 1.5, 0.5])
			.colored(PonderPalette.GREEN).placeNearTarget();
		scene.idle(80);
		
		let terminal = AABB.of(5, 3, 0, 6, 4, 0.25);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.WHITE, new Object(), terminal, 60);
		scene.text(60, "Avec un Pattern Terminal, on enregistre nos équations dans des Patterns (Mode Process)", [5, 3.5, 0])
			.placeNearTarget();
		scene.idle(30);
		scene.showControls(30, [5.75, 3.5, 0], "RIGHT").withItem(pattern);
		scene.idle(50);
		
		// Apparition des Crafters
		for(let y = 1; y <= 3; y++) 
			for(let x = 1; x <= 3; x++) {
				scene.world.showSection([y == 2 ? x : 4 - x, y, 2], "DOWN");
				scene.idle(3);
			}
		scene.idle(20);
		
		scene.addKeyframe();
		scene.text(60, "Les nouveaux chiffres sont fabriqués dans des Crafters", [1, 2.5, 2.5])
			.placeNearTarget();
		scene.idle(70);
		
		// Apparition Barrels
		for(let y = 1; y <= 3; y++) {
			scene.world.showSection([0, y, 3], "DOWN"); 
			scene.idle(3);
		}
		scene.idle(20);
		
		// Apparition Interfaces recettes - cable composite part 1
		for(let y = 4; y <= 6; y++) {
			let IS = scene.world.showIndependentSection([0, y, 2], "SOUTH");
			scene.world.moveSection(IS, [0, -3, 0], 0);
			scene.idle(3);
		}
		scene.idle(20);
		
		let patternProviders = AABB.of(0, 1, 2.75, 1, 4, 3);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.INPUT, new Object(), patternProviders, 60);
		scene.text(60, "Les Patterns de nos équations vont dans ces Interfaces :", [0, 2.5, 2 + 7 / 8.0])
			.placeNearTarget();
		scene.idle(80);
		
		let topLine = AABB.of(1, 3, 2, 4, 4, 3);
		let topLineInterface = AABB.of(0, 3, 2.75, 1, 4, 3);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.GREEN, new Object(), topLine, 40);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.INPUT, new Object(), topLineInterface, 40);
		scene.text(40, "Ligne du haut:\nChiffres 1 et 2", [0, 3.5, 2 + 7 / 8.0]).placeNearTarget();
		scene.idle(50);
		
		let middleLine = AABB.of(1, 2, 2, 4, 3, 3);
		let middleLineInterface = AABB.of(0, 2, 2.75, 1, 3, 3);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.GREEN, new Object(), middleLine, 40);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.INPUT, new Object(), middleLineInterface, 40);
		scene.text(40, "Ligne du milieu:\nChiffres 4, 5 et 6", [0, 2.5, 2 + 7 / 8.0]).placeNearTarget();
		scene.idle(50);
		
		let bottomLine = AABB.of(1, 1, 2, 4, 2, 3);
		let bottomLineInterface = AABB.of(0, 1, 2.75, 1, 2, 3);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.GREEN, new Object(), bottomLine, 40);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.INPUT, new Object(), bottomLineInterface, 40);
		scene.text(40, "Ligne du bas:\nChiffres 7, 9 et 0", [0, 1.5, 2 + 7 / 8.0]).placeNearTarget();
		scene.idle(60);
		
		scene.text(80, "Quand on demande un craft, tous les ingrédients sont envoyés dans le Barrel associé")
			.independent(0).placeNearTarget();
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.WHITE, new Object(), AABB.of(0,3,3, 1,4,4), 15);
		scene.idle(30);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.WHITE, new Object(), AABB.of(0,2,3, 1,3,4), 15);
		scene.idle(30);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.WHITE, new Object(), AABB.of(0,1,3, 1,2,4), 15);
		scene.idle(40);
		scene.text(60, "Ça représente 75 Stacks\nde ressources\nD'ou les Cobalt Barrels...")
			.independent(166).colored(PonderPalette.OUTPUT).placeNearTarget();
		scene.idle(80);
		
		// Apparition Interfaces sortie - cable composite part 2
		for(let y = 4; y <= 6; y++) {
			let IS = scene.world.showIndependentSection([0, y, 1], "SOUTH");
			scene.world.moveSection(IS, [0, -3, 1], 0);
			scene.idle(3);
		}
		scene.idle(20);
		
		let interfaces = AABB.of(0.75, 1, 2, 1, 4, 3);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.OUTPUT, new Object(), interfaces, 60);
		scene.text(60, "Les résultats vont dans ces Interfaces, puis stockés dans\nle réseau ME", [0.75, 2.5, 2.5])
			.placeNearTarget();
		scene.idle(80);
		
		// Placement du cable, aucune connection - cable composite part 3
		{ let IS = scene.world.showIndependentSection([0, 4, 0, 0, 6, 0], "DOWN");
		scene.world.moveSection(IS, [0, -3, 2], 0); }
		scene.idle(15);
		// Remplace le cable composite par la vraie version
		scene.world.replaceBlocks([0, 4, 0, 0, 6, 2], "air", false);
		scene.world.modifyBlockEntityNBT([0, 1, 2], true, nbt => {
			nbt.cable.visual.connections = ["up"];
			nbt.down = new CompoundTag();
		});
		scene.world.modifyBlockEntityNBT([0, 2, 2], true, nbt => nbt.north = new CompoundTag());
		scene.world.modifyBlockEntityNBT([0, 3, 2], true, nbt => nbt.north = new CompoundTag());
		{ let IS = scene.world.showIndependentSectionImmediately([0, 1, 2, 0, 3, 2]); }
		scene.idle(25);
		
		scene.rotateCameraY(-180);
		scene.idle(50);
		
		// Apparition des subnetworks
		scene.addKeyframe();
		scene.overlay.showSelectionWithText([0, 2, 3], 80)
			.text("Depuis les Barrels, il faut distribuer les ingrédients correctement dans les Crafters")
			.pointAt([2.5, 2.5, 3]).placeNearTarget();
		scene.idle(90);
		
		// Apparition des storage bus - cable composite part 1
		for(let y = 1; y <= 3; y++) {
			let IS = scene.world.showIndependentSection([0, y, 4], "WEST");
			scene.world.moveSection(IS, [1, 0, -1], 0);
			scene.idle(3);
		}
		scene.idle(17);
		
		let storageBus = AABB.of(1, 1, 3, 1.25, 4, 4);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.OUTPUT, new Object(), storageBus, 60);
		scene.text(50, "ME Storage Buses", [1.25, 2.5, 3.5]).placeNearTarget();
		scene.idle(70);
		
		// Apparition des export bus - cable composite part 2
		for(let y = 1; y <= 3; y++) 
			for(let x = 1; x <= 3; x++) {
				let IS = scene.world.showIndependentSection([x, y, 4], "NORTH");
				scene.world.moveSection(IS, [0, 0, -1], 0);
				scene.idle(3);
			}
		scene.idle(17);
		
		scene.text(50, "On configure 3 sous-réseaux").independent(109).placeNearTarget();
		scene.idle(50);
		scene.text(60, "Attention:").independent(125).colored(PonderPalette.RED).placeNearTarget();
		scene.idle(10);
		scene.text(60, "L'ordre des items dans les\nExport Buses est important").independent(141).placeNearTarget();
		scene.idle(80);
		
		// Cable du bas
		scene.addKeyframe();
		setupBus(3, 1, capaCard, eight, three);
		setupBus(2, 1, capaCard, multiply, minus);
		setupBus(1, 1, capaCard, one, three);
		scene.idle(10);
		
		// Apparition cable - cable composite part 3.1
		{ let IS = scene.world.showIndependentSection([1, 4, 3, 3, 4, 3], "WEST");
		scene.world.moveSection(IS, [0, -3, 0], 0); }
		scene.idle(15);
		// Remplace le cable composite par la vraie version
		scene.world.replaceBlocks([0, 1, 4, 3, 1, 4], "air", false);
		scene.world.replaceBlocks([1, 4, 3, 3, 4, 3], "air", false);
		{ let IS = scene.world.showIndependentSectionImmediately([1, 1, 3, 3, 1, 3]); }
		scene.world.modifyBlockEntityNBT([1, 1, 3], true, nbt => {
			nbt.up = new CompoundTag();
			nbt.down = new CompoundTag();
		});
		scene.idle(20);
		
		// Cable du milieu
		scene.addKeyframe();
		setupBus(3, 2, capaCard, eight, three);
		setupBus(2, 2, capaCard, plus, minus);
		setupBus(1, 2, capaCard, one, three);
		scene.idle(10);
		
		// Apparition cable - cable composite part 3.2
		{ let IS = scene.world.showIndependentSection([1, 5, 3, 3, 5, 3], "WEST");
		scene.world.moveSection(IS, [0, -3, 0], 0); }
		scene.idle(15);
		// Remplace le cable composite par la vraie version
		scene.world.replaceBlocks([0, 2, 4, 3, 2, 4], "air", false);
		scene.world.replaceBlocks([1, 5, 3, 3, 5, 3], "air", false);
		{ let IS = scene.world.showIndependentSectionImmediately([1, 2, 3, 3, 2, 3]); }
		scene.world.modifyBlockEntityNBT([1, 2, 3], true, nbt => {
			nbt.up = new CompoundTag();
			nbt.down = new CompoundTag();
		});
		scene.idle(20);
		
		// Cable du haut
		scene.addKeyframe();
		setupBus(3, 3, null, eight, null);
		setupBus(2, 3, capaCard, divide, minus);
		setupBus(1, 3, capaCard, six, eight);
		scene.idle(10);
		
		// Apparition cable - cable composite part 3.3
		{ let IS = scene.world.showIndependentSection([1, 6, 3, 3, 6, 3], "WEST");
		scene.world.moveSection(IS, [0, -3, 0], 0); }
		scene.idle(15);
		// Remplace le cable composite par la vraie version
		scene.world.replaceBlocks([0, 3, 4, 3, 3, 4], "air", false);
		scene.world.replaceBlocks([1, 6, 3, 3, 6, 3], "air", false);
		{ let IS = scene.world.showIndependentSectionImmediately([1, 3, 3, 3, 3, 3]); }
		scene.world.modifyBlockEntityNBT([1, 3, 3], true, nbt => 
			nbt.down = new CompoundTag());
		scene.idle(20);
		
		scene.rotateCameraY(70);
		scene.idle(35);
		
		// Cache les Barrels temporairement
		scene.addKeyframe();
		for(let y = 3; y >= 1; y--) {
			scene.world.hideSection([0, y, 3], "UP");
			scene.idle(3);
		}
		scene.idle(20);
		
		scene.text(60, "Les sous-réseaux sont alimentés en transférant l'énergie avec des Quartz Fibers")
			.independent(141).placeNearTarget();
		scene.idle(70);
		
		// Alimentation des sous-réseaux
		scene.world.hideSection([0, 0, 2], "DOWN"); scene.idle(3);
		scene.world.hideSection([0, 0, 3], "DOWN"); scene.idle(3);
		scene.world.hideSection([1, 0, 3], "DOWN"); scene.idle(20);
		scene.world.restoreBlocks([0, 0, 2]);
		scene.world.restoreBlocks([0, 0, 3]);
		scene.world.restoreBlocks([1, 0, 3]);
		scene.world.showSection([0, 0, 2], "UP"); scene.idle(3);
		scene.world.showSection([0, 0, 3], "UP"); scene.idle(3);
		scene.world.showSection([1, 0, 3], "UP"); scene.idle(20);
		
		scene.world.restoreBlocks([0, 1, 2]);
		scene.world.modifyBlockEntityNBT([0, 1, 2], true, nbt => nbt.cable.visual.connections = ["up"]);
		scene.idle(3);
		scene.world.restoreBlocks([1, 1, 3]);
		scene.world.modifyBlockEntityNBT([1, 1, 3], true, nbt => nbt.up = new CompoundTag());
		scene.idle(10);
		scene.world.restoreBlocks([1, 1, 3, 1, 2, 3]);
		scene.world.modifyBlockEntityNBT([1, 2, 3], true, nbt => nbt.up = new CompoundTag());
		scene.idle(10);
		scene.world.restoreBlocks([1, 2, 3, 1, 3, 3]);
		scene.idle(20);
		
		// Reapparition des Barrels
		for(let y = 1; y <= 3; y++) {
			scene.world.showSection([0, y, 3], "DOWN");
			scene.idle(3);
		}
		scene.idle(20);
		
		scene.rotateCameraY(110);
		scene.idle(40);
		
		scene.addKeyframe();
		scene.text(60, "Avec ce design, on peut crafter\n2 chiffres simultanément...")
			.independent(75).placeNearTarget();
		scene.idle(30);
		scene.text(60, "Dont des chiffres qui nécessitent un craft intermédiaire")
			.independent(100).colored(PonderPalette.OUTPUT).placeNearTarget();
		scene.idle(70);
		
		scene.text(500, "Exemple: ").independent(25).colored(PonderPalette.MEDIUM).placeNearTarget();
		scene.idle(20);
		
		// Exemple 9
		scene.world.restoreBlocks([1, 1, 2, 3, 1, 2]);
		scene.world.setCraftingResult([1, 1, 2], "kubejs:nine");
		scene.idle(20);
		
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.GREEN, new Object(), bottomLine, 60);
		scene.text(60, "Le chiffre 9 peut être crafté\navec des opérateurs de base", [1, 1.5, 2])
			.colored(PonderPalette.GREEN).placeNearTarget();
		scene.idle(30);
		
		scene.world.setKineticSpeed([1, 1, 2, 3, 1, 2], 48);
		scene.idle(120);
		
		// Exemple 2
		scene.world.restoreBlocks([2, 3, 2, 3, 3, 2]);
		scene.idle(20);
		
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.GREEN, new Object(), topLine, 60);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.RED, new Object(), AABB.of(1.25,3.25,2-1/16.0, 1.75,3.75,2-1/16.0), 60);
		scene.text(60, "Le chiffre 2 en revanche, a\nbesoin d'un craft intermédiaire", [1, 3.5, 2])
			.colored(PonderPalette.GREEN).placeNearTarget();
		scene.idle(70);
		
		scene.world.restoreBlocks([1, 2, 2, 3, 2, 2]);
		scene.idle(20);
		scene.world.setCraftingResult([1, 2, 2], six);
		scene.world.setKineticSpeed([1, 2, 2, 3, 2, 2], -48);
		scene.idle(120);
		
		scene.world.restoreBlocks([1, 3, 2])
		scene.world.setCraftingResult([1, 3, 2], "kubejs:two");
		scene.world.setKineticSpeed([1, 3, 2, 3, 3, 2], 48);
		scene.world.setKineticSpeed([2, 3, 2], -48);
		scene.idle(120);
		
		scene.addKeyframe();
		scene.text(60, "Sachant cela...").independent(25).colored(PonderPalette.MEDIUM).placeNearTarget();
		scene.idle(30);
		scene.text(60, "On a besoin de \n2x 16k Crafting Storages\n2x Crafting Co-processing Units")
			.independent(41).placeNearTarget();
		scene.idle(70);
		
		scene.world.showSection([0, 1, 1, 0, 3, 1], "DOWN");
		scene.idle(10);
		scene.world.showSection([4, 1, 1, 4, 3, 1], "DOWN");
		scene.idle(20);
		
		scene.world.restoreBlocks([0, 1, 2, 0, 3, 2]);
		for(let x = 4; x >= 0; x--) {
			scene.world.showSection([x, 1, 0], "DOWN");
			scene.idle(3);
		}
		scene.idle(20);
		
		scene.rotateCameraY(20);
		scene.idle(15);
		
		scene.addKeyframe();
		scene.text(60, "On veut 1600x chaque chiffre")
			.independent(25).colored(PonderPalette.MEDIUM).placeNearTarget();
		scene.idle(30);
		scene.text(440, "Lançons les crafts 2 par 2").independent(41).placeNearTarget();
		scene.idle(30);
		scene.text(420, "2 & 9 - 40 minutes").independent(57).colored(PonderPalette.OUTPUT).placeNearTarget();
		scene.idle(10);
		
		scene.world.restoreBlocks([1, 1, 2, 3, 3, 2]);
		scene.world.setCraftingResult([1, 3, 2], "kubejs:two");
		scene.world.setCraftingResult([1, 2, 2], "kubejs:six");
		scene.world.setCraftingResult([1, 1, 2], "kubejs:nine");
		crafterKinSpeed();
		scene.idle(100);
		
		scene.text(320, "5 & 7 - 40 minutes").independent(73).colored(PonderPalette.OUTPUT).placeNearTarget();
		scene.idle(10);
		
		scene.world.restoreBlocks([1, 1, 2, 3, 3, 2]);
		scene.world.modifyBlockEntityNBT([3, 3, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:eight");
		scene.world.modifyBlockEntityNBT([2, 3, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:divide");
		scene.world.modifyBlockEntityNBT([1, 3, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:eight");
		scene.world.setCraftingResult([1, 3, 2], "kubejs:one");
		scene.world.modifyBlockEntityNBT([3, 2, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:eight");
		scene.world.modifyBlockEntityNBT([2, 2, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:minus");
		scene.world.modifyBlockEntityNBT([1, 2, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:three");
		scene.world.setCraftingResult([1, 2, 2], "kubejs:five");
		scene.world.modifyBlockEntityNBT([3, 1, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:eight");
		scene.world.modifyBlockEntityNBT([2, 1, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:minus");
		scene.world.modifyBlockEntityNBT([1, 1, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:one");
		scene.world.setCraftingResult([1, 1, 2], "kubejs:seven");
		crafterKinSpeed();
		scene.idle(100);
		
		scene.text(220, "4 & 0 - 40 minutes").independent(89).colored(PonderPalette.OUTPUT).placeNearTarget();
		scene.idle(10);
		
		scene.world.restoreBlocks([1, 1, 2, 3, 3, 2]);
		scene.world.modifyBlockEntityNBT([3, 3, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:eight");
		scene.world.modifyBlockEntityNBT([2, 3, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:divide");
		scene.world.modifyBlockEntityNBT([1, 3, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:eight");
		scene.world.setCraftingResult([1, 3, 2], "kubejs:one");
		scene.world.modifyBlockEntityNBT([3, 2, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:three");
		scene.world.modifyBlockEntityNBT([2, 2, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:plus");
		scene.world.modifyBlockEntityNBT([1, 2, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:one");
		scene.world.setCraftingResult([1, 2, 2], "kubejs:four");
		scene.world.modifyBlockEntityNBT([3, 1, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:three");
		scene.world.modifyBlockEntityNBT([2, 1, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:minus");
		scene.world.modifyBlockEntityNBT([1, 1, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:three");
		scene.world.setCraftingResult([1, 1, 2], "kubejs:zero");
		crafterKinSpeed();
		scene.idle(100);
		
		scene.text(120, "1 & 6 - 40 minutes").independent(105).colored(PonderPalette.OUTPUT).placeNearTarget();
		scene.idle(10);
		
		scene.world.restoreBlocks([1, 1, 2, 3, 3, 2]);
		scene.world.modifyBlockEntityNBT([3, 3, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:eight");
		scene.world.modifyBlockEntityNBT([2, 3, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:divide");
		scene.world.modifyBlockEntityNBT([1, 3, 2], true, nbt => nbt.Inventory.Items[0].id = "kubejs:eight");
		scene.world.setCraftingResult([1, 3, 2], "kubejs:one");
		scene.world.setCraftingResult([1, 2, 2], "kubejs:six");
		scene.world.modifyBlockEntityNBT([3, 1, 2], true, nbt => nbt.Inventory.Items = [new CompoundTag()]);
		scene.world.modifyBlockEntityNBT([2, 1, 2], true, nbt => nbt.Inventory.Items = [new CompoundTag()]);
		scene.world.modifyBlockEntityNBT([1, 1, 2], true, nbt => nbt.Inventory.Items = [new CompoundTag()]);
		crafterKinSpeed();
		scene.idle(100);
		
		scene.rotateCameraY(-20);
		scene.idle(45);
		
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.OUTPUT, new Object(), terminal, 60);
		scene.text(60, "A la fin, il restera\n8 & 3 - x1600", [5, 3.5, 0.25])
			.colored(PonderPalette.OUTPUT).placeNearTarget();
		scene.idle(60);
	})
	.scene("final_part", "Forge à Matrices", "kubejs:ch5_matrix", (scene, util) => {
		for(let x = 1; x <= 3; x++) 
			for(let z = 2; z <= 4; z++) 
				scene.world.replaceBlocks([x, 0, z], 
					(x + z) % 2 == 0 ? "minecraft:gray_concrete" : "minecraft:cyan_terracotta", 
					false);
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let faucet = [0, 4, 1];
		
		// Utilities
		let shiftDown = [0, -2, 0];
		let numbs = [  "kubejs:zero",
			"kubejs:one", "kubejs:two", "kubejs:three",
			"kubejs:four", "kubejs:five", "kubejs:six",
			"kubejs:seven", "kubejs:eight", "kubejs:nine"
		];
		
		let fillTinkerTankFluid = (x, y, z, v) => {
			scene.world.modifyBlockEntityNBT([x, y, z], true, nbt => 
				nbt.tank.fluid.Amount = v);
		}
		
		let fillTinkerTankFluids = (x, y, z, f, v) => {
			scene.world.modifyBlockEntityNBT([x, y, z], true, nbt => 
				nbt.tank.fluids[f].Amount = v);
		}
		
		let smelteryMelting = (x, y, z, limit, itemToMelt) => {
			scene.world.restoreBlocks([x, y, z]);
			// Fait apparaitre tous les liquides deja fondus
			scene.world.modifyBlockEntityNBT([x, y, z], true, nbt => {
				for(let i = 0; i < limit; i++) nbt.tank.fluids[i].Amount = 1600; 
				for(let i = limit; i < 10; i++) nbt.tank.fluids[i].Amount = 0;
			});
			// Fait apparaitre les prochains chiffres a fondre
			scene.world.modifyBlockEntityNBT([x, y, z], true, nbt => {
				for(let i = 0; i < 18; i++) nbt.inventory.items[i].id = itemToMelt;
			});
		}

		let smelteryEmptyItems = (x, y, z, limit) => {
			scene.world.restoreBlocks([x, y, z]);
			// Fait apparaitre tous les liquides fondus, donc le nouveau
			scene.world.modifyBlockEntityNBT([x, y, z], true, nbt => {
				for(let i = 0; i < limit; i++) nbt.tank.fluids[i].Amount = 1600;
				for(let i = limit; i < 10; i++) nbt.tank.fluids[i].Amount = 0;
			});
			// Efface les items a fondre
			scene.world.modifyBlockEntityNBT([x, y, z], true, nbt => 
				nbt.inventory.items = [new CompoundTag()]);
		}
		
		// Conditions initiales
		fillTinkerTank(scene, 3, 1, 1, 0); 
		fillTinkerTankFluid(0, 1, 1, 0);
		scene.world.modifyBlockEntityNBT([1, 1, 1], true, nbt => nbt.tank.fluids = [new CompoundTag()]);
		scene.world.modifyBlockEntityNBT([1, 1, 1], true, nbt => nbt.inventory.items = [new CompoundTag()]);
		scene.world.modifyBlockEntityNBT(faucet, true, nbt => nbt.render_fluid.Amount = 0);
		for(let x = 1; x <= 4; x++)
			scene.world.modifyBlockEntityNBT([x, 1, 0], true, nbt => nbt.cable.visual.channels = 0);
		scene.world.modifyBlockEntityNBT([3, 1, 0], true, nbt => nbt.cable.visual.connections = ["east", "west"]);
		scene.world.modifyBlockEntityNBT([1, 1, 0], true, nbt => nbt.cable.visual.connections = ["east"]);
		scene.world.modifyBlockEntityNBT([3, 2, 0], true, nbt => nbt.south = new CompoundTag());
		scene.world.modifyBlockEntityNBT([1, 2, 0], true, nbt => nbt.south = new CompoundTag());
		scene.world.modifyBlockEntityNBT([0, 1, 0], true, nbt => nbt.south = new CompoundTag());
		scene.world.modifyBlockEntityNBT([5, 2, 0], true, nbt => nbt.visual.cell4.state = "full");
		
		scene.text(60, "Dans cette partie, on a besoin d'une Smeltery 3x2x3 minimum")
			.independent(75).placeNearTarget();
		scene.idle(80);
		
		scene.world.hideSection([1, 0, 2, 3, 0, 4], "DOWN");
		scene.idle(15);
		
		// Base Smeltery
		scene.world.restoreBlocks([1, 0, 2, 3, 0, 4]);
		for(let x = 1; x <= 3; x++) 
			for(let z = 2; z <= 4; z++) {
				scene.world.showSection([x, 0, z], "DOWN");
				scene.idle(2);
			}
		scene.idle(20);
		
		// Glass - Layer 1
		for(let z = 2; z <= 5; z++) {
			scene.world.showSection([4, 1, z], "DOWN");
			scene.idle(2);
		}
		for(let x = 3; x >= 0; x--) {
			scene.world.showSection([x, 1, 5], "DOWN");
			scene.idle(2);
		}
		for(let z = 4; z >= 2; z--) {
			scene.world.showSection([0, 1, z], "DOWN");
			scene.idle(2);
		}
		scene.idle(10);
		
		// Glass - Layer 2
		for(let z = 2; z <= 5; z++) {
			scene.world.showSection([4, 2, z], "DOWN");
			scene.idle(2);
		}
		for(let x = 3; x >= 0; x--) {
			scene.world.showSection([x, 2, 5], "DOWN");
			scene.idle(2);
		}
		for(let z = 4; z >= 3; z--) {
			scene.world.showSection([0, 2, z], "DOWN");
			scene.idle(2);
		}
		scene.idle(20);
		
		scene.world.showSection([3, 1, 1], "DOWN"); scene.idle(20); // Fuel Tank
		scene.world.showSection([1, 1, 1], "DOWN"); scene.idle(20); // Controller
		scene.world.showSection([3, 2, 1], "DOWN"); scene.idle(3);  // Chute 1
		scene.world.showSection([1, 2, 1], "DOWN"); scene.idle(20); // Chute 2
		
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.INPUT, new Object(), AABB.of(1, 2, 1, 2, 3, 2), 40);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.INPUT, new Object(), AABB.of(3, 2, 1, 4, 3, 2), 40);
		scene.text(40, "Seared Chutes", [1, 2.5, 1.5]).placeNearTarget();
		scene.idle(60);
		
		// Glass au milieu
		scene.world.showSection([2, 1, 1], "DOWN"); scene.idle(3);
		scene.world.showSection([2, 2, 1], "DOWN"); scene.idle(20);
		
		scene.world.showSection([0, 2, 2], "DOWN"); scene.idle(20); // Drain
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.OUTPUT, new Object(), AABB.of(0, 2, 2, 1, 3, 3), 40);
		scene.text(40, "Seared Drain", [0, 2.5, 2.5]).placeNearTarget();
		scene.idle(60);
		
		// Smeltery complete 
		for(let x = 1; x <= 3; x++) {
			scene.effects.indicateRedstone([x, 1, 1]);
			scene.effects.indicateRedstone([x, 2, 1]);
			scene.effects.indicateRedstone([x, 1, 5]);
			scene.effects.indicateRedstone([x, 2, 5]);
		}
		for(let z = 2; z <= 4; z++) {
			scene.effects.indicateRedstone([0, 1, z]);
			scene.effects.indicateRedstone([0, 2, z]);
			scene.effects.indicateRedstone([4, 1, z]);
			scene.effects.indicateRedstone([4, 2, z]);
		}
		scene.idle(30);
		
		// Basin et faucet
		scene.world.showSection([0, 1, 1], "DOWN"); 
		scene.idle(3);
		let faucetIS = scene.world.showIndependentSection(faucet, "DOWN");
		scene.world.moveSection(faucetIS, shiftDown, 0);
		scene.idle(20);
		
		// Ender tank blazing blood
		scene.world.showSection([4, 1, 1], "DOWN");
		scene.idle(20);
		
		scene.text(60, "Le Fuel Tank est alimenté\nen Blazing Blood", [3.5, 1.5, 1]).placeNearTarget();
		scene.idle(30);		
		
		// Animation remplissage du tank
		scene.world.restoreBlocks([3, 1, 1]);
		for(let i = 1; i <= 40; i++) {
			fillTinkerTank(scene, 3, 1, 1, i * 100); 
			scene.idle(1);
		}
		scene.idle(20);
		
		// Apparition du ME Controller
		scene.addKeyframe();
		scene.world.showSection([5, 1, 0, 5, 3, 0], "DOWN");
		scene.idle(20);
		
		scene.text(60, "A nouveau, on utilise le réseau ME", [5, 1.5, 0.5])
			.colored(PonderPalette.GREEN).placeNearTarget();
		scene.idle(80);	
		
		// Apparition du cable
		for(let x = 4; x >= 1; x--) {
			scene.world.showSection([x, 1, 0], "DOWN");
			scene.idle(3);
		}
		scene.idle(20);
		
		// Export buses et configurations
		{ let IS = scene.world.showIndependentSection([3, 3, 0], "SOUTH");
			scene.world.moveSection(IS, [0, -1, 0], 0);
			scene.idle(3); }
		{ let IS = scene.world.showIndependentSection([1, 3, 0], "SOUTH");
			scene.world.moveSection(IS, [0, -1, 0], 0);
			scene.idle(20); }
		
		let bus1 = AABB.of(3.25, 2.25, 0.75, 3.75, 2.75, 1);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.INPUT, new Object(), bus1, 90);
		scene.showControls(30, [3.5, 2.75, 0.75], "DOWN").withItem("ae2:capacity_card"); scene.idle(10);
		scene.showControls(30, [3.25, 2.6, 0.75], "LEFT").withItem("kubejs:zero"); scene.idle(10);
		scene.showControls(30, [3.5, 2.25, 0.75], "UP").withItem("kubejs:one"); scene.idle(10);
		scene.showControls(30, [3.75, 2.4, 0.75], "RIGHT").withItem("kubejs:two"); scene.idle(10);
		scene.showControls(30, [3.5, 2.75, 0.75], "DOWN").withItem("kubejs:three"); scene.idle(10);
		scene.showControls(30, [3.25, 2.6, 0.75], "LEFT").withItem("kubejs:four");
		scene.idle(40);
	
		let bus2 = AABB.of(1.25, 2.25, 0.75, 1.75, 2.75, 1);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.INPUT, new Object(), bus2, 90);
		scene.showControls(30, [1.5, 2.75, 0.75], "DOWN").withItem("ae2:capacity_card"); scene.idle(10);
		scene.showControls(30, [1.25, 2.6, 0.75], "LEFT").withItem("kubejs:five"); scene.idle(10);
		scene.showControls(30, [1.5, 2.25, 0.75], "UP").withItem("kubejs:six"); scene.idle(10);
		scene.showControls(30, [1.75, 2.4, 0.75], "RIGHT").withItem("kubejs:seven"); scene.idle(10);
		scene.showControls(30, [1.5, 2.75, 0.75], "DOWN").withItem("kubejs:eight"); scene.idle(10);
		scene.showControls(30, [1.25, 2.6, 0.75], "LEFT").withItem("kubejs:nine");
		scene.idle(40);
		
		scene.text(60, "L'ordre n'a aucune importance").independent(138).placeNearTarget();
		scene.idle(80);
		
		// Apparition des cables d'input
		scene.world.showSection([3, 2, 0], "DOWN"); 
		scene.idle(3);
		scene.world.showSection([1, 2, 0], "DOWN"); 
		scene.idle(12);
		
		scene.world.replaceBlocks([3, 3, 0], "air", false);
		scene.world.restoreBlocks([3, 2, 0]);
		scene.world.modifyBlockEntityNBT([3, 2, 0], true, nbt => nbt.cable.visual.channels = 0);
		scene.world.modifyBlockEntityNBT([3, 1, 0], true, nbt =>
			nbt.cable.visual.connections = ["east", "up", "west"]);
		scene.idle(3);
		
		scene.world.replaceBlocks([1, 3, 0], "air", false);
		scene.world.restoreBlocks([1, 2, 0]);
		scene.world.modifyBlockEntityNBT([1, 2, 0], true, nbt => nbt.cable.visual.channels = 0);
		scene.world.modifyBlockEntityNBT([1, 1, 0], true, nbt => 
			nbt.cable.visual.connections = ["east", "up"]);
		scene.idle(20);
				
		// Animation de fonte de tous les chiffres
		scene.addKeyframe();
		scene.text(50, "Tous les chiffres sont fondus").independent(15).placeNearTarget();
		scene.idle(60);
		
		scene.rotateCameraY(-110);
		scene.idle(35);
		
		for(let i = 0; i < 10; i++) {
			// Fait apparaitre tous les liquides deja fondus
			// Fait apparaitre les prochains chiffres a fondre
			smelteryMelting(1, 1, 1, i, numbs[i]);
			scene.idle(20);
			// Fait apparaitre tous les liquides fondus, dont le nouveau
			// Efface les items a fondre
			smelteryEmptyItems(1, 1, 1, i + 1);
			scene.idle(20);
		}
		scene.idle(20);
	
		scene.addKeyframe();
		scene.world.modifyBlockEntityNBT([5, 2, 0], true, nbt => nbt.visual.cell4.state = "empty");
			
		scene.text(60, "Quand tous les chiffres sont liquéfiés, ils se mélangent automatiquement en Liquified Matrix")
			.independent(75).colored(PonderPalette.GREEN).placeNearTarget();
		scene.idle(80);
		
		// Animation transformation en Matrix
		scene.world.restoreBlocks([1, 1, 1]);
		scene.world.modifyBlockEntityNBT([1, 1, 1], true, nbt => {
			nbt.tank.fluids[0].FluidName = "kubejs:matrix";
			nbt.inventory.items = [new CompoundTag()];
		});
		for(let i = 1; i <= 40; i++) {
			// Liquid Matrix en [0] gagne en volume
			fillTinkerTankFluids(1, 1, 1, 0, i * 200);
			// Les autres liquides [1..9] perdent en volume
			// Attention, visuellement dans la smeltery, 1mB a la meme hauteur que 1000mB (0.1 block)
			// Ici, l'animation ne concerne que les 600mB de plus qui impactent le visuel
			for(let f = 1; f < 10; f++) 
				fillTinkerTankFluids(1, 1, 1, f, 1600 - i * 15);
			scene.idle(1);
		}
		// Disparition des autres liquides a la fin de l'animation 
		scene.world.restoreBlocks([1, 1, 1]);
		scene.world.modifyBlockEntityNBT([1, 1, 1], true, nbt => {
			nbt.inventory.items = [new CompoundTag()];
			nbt.tank.fluids[0].FluidName = "kubejs:matrix";
			nbt.tank.fluids[0].Amount = 8000;
			for(let i = 1; i < 10; i++) nbt.tank.fluids[i].Amount = 0;
		});
		scene.idle(40);
		
		scene.rotateCameraY(110);
		scene.idle(35);
		
		scene.text(60, "Il ne reste plus qu'à\ncouler dans un Basin").independent(75).placeNearTarget();
		scene.idle(70);
		
		// Animation Casting basin
		scene.world.restoreBlocks(faucet);
		scene.world.restoreBlocks([0, 1, 1]);
		for(let i = 1; i <= 40; i++) {
			fillTinkerTankFluid(0, 1, 1, i * 25);
			fillTinkerTankFluids(1, 1, 1, 0, 8000 - i * 25);
			scene.idle(1);
		}
		scene.world.modifyBlockEntityNBT(faucet, true, nbt => nbt.render_fluid.Amount = 0);
		scene.idle(20);
		scene.effects.indicateSuccess([0, 1, 1]);
		scene.idle(40);
		
		// Apparition import bus
		scene.addKeyframe();
		{ let IS = scene.world.showIndependentSection([0, 2, 0], "SOUTH");
			scene.world.moveSection(IS, [0, -1, 0], 0);
			scene.idle(20); }
		
		let bus3 = AABB.of(0.25, 1.25, 0.75, 0.75, 1.75, 1);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.OUTPUT, new Object(), bus3, 50);
		scene.text(50, "ME Import Bus", [0.5, 1.5, 0.75]).placeNearTarget();
		scene.idle(60);
		
		// Apparition cable output
		scene.world.showSection([0, 1, 0], "EAST"); 
		scene.idle(15);
		
		scene.world.replaceBlocks([0, 2, 0], "air", false);
		for(let x = 0; x <= 4; x++) scene.world.restoreBlocks([x, 1, 0]);
		scene.world.restoreBlocks([1, 2, 0]);
		scene.world.restoreBlocks([3, 2, 0]);
		scene.idle(20);
		
		scene.world.restoreBlocks([0, 1, 1]);
		fillTinkerTankFluid(0, 1, 1, 0);
		scene.world.modifyBlockEntityNBT([5, 2, 0], true, nbt => nbt.visual.cell4.state = "not_empty");
		scene.idle(20);
		
		let terminal = AABB.of(5, 3, 0, 6, 4, 0.25);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.OUTPUT, new Object(), terminal, 60);
		scene.text(60, "Attention, les Matrices\nne sont pas stackables", [5, 3.5, 0])
			.colored(PonderPalette.OUTPUT).placeNearTarget();
		scene.idle(60);
	})
	.scene("overview_5", "Usine complète", "kubejs:ch5_overview", (scene, util) => {
		for(let x = 0; x <= 14; x++) 
			for(let z = 4; z <= 9; z++) 
				scene.world.replaceBlocks([x, 1, z], 
					(x + z) % 2 == 0 ? "minecraft:gray_concrete" : "minecraft:cyan_terracotta", 
					false);
		scene.configureBasePlate(0, 0, 15);
		scene.scaleSceneView(0.7);
		scene.setSceneOffsetY(-2);
		scene.world.showSection([0, 1, 4, 14, 1, 9], "UP"); // Fake showBasePlate
		scene.idle(20);
		
		// Sections & Positions
		let ME = util.select.position(7,1,4).add([6,2,4, 8,2,4]);
			
		let ground1 = util.select.fromTo(0,1,4, 4,1,4)
			.add([0,1,5, 0,1,8]).add([4,1,5, 4,1,8])
			.add([1,1,8]).add([3,1,8]).add([3,1,5]);
		let ground2 = util.select.fromTo(5,1,4, 5,1,8)
			.add([9,1,4, 9,1,6]).add([6,1,4]).add([6,1,8]).add([8,1,4]);
		let ground3 = util.select.fromTo(10,1,4, 13,1,4).add([10,1,5]);
			
		let network1 = util.select.fromTo(0,1,4, 4,1,4)
			.add([0,1,5, 0,1,8]).add([4,1,5, 4,1,8]).add([3,1,5, 3,3,5])
			.add([3,1,8, 3,3,8]).add([1,1,8, 1,3,8]).add([3,3,6, 3,3,7])
			.add([1,3,6, 1,3,7]);
		let network2 = util.select.fromTo(5,1,4, 5,1,8)
			.add([8,1,4]).add([6,1,8]).add([6,1,4])
			.add([9,1,4, 9,1,6]).add([6,2,8, 8,4,8]).add([5,2,7, 5,4,7]);
		let network3 = util.select.fromTo(10,1,4, 13,1,4)
			.add([13,2,4, 13,3,4]).add([11,2,4, 11,3,4])
			.add([10,1,5]);
			
		let forge = util.select.fromTo(0,2,5, 4,4,8).substract(network1);
		let maths = util.select.fromTo(5,2,6, 9,4,8).substract(network2);
		let smeltery = util.select.fromTo(10,2,5, 14,3,9).substract(network3);
		let power = [7, 0, 4];
		let stressometer = [7, 5, 7];
		
		// Conditions initiales
		scene.world.modifyBlockEntityNBT([1, 4, 6], true, nbt => nbt.TankContent.FluidName = "kubejs:raw_logic");
		
		// Scene
		scene.world.hideSection([7, 1, 4], "DOWN");
		scene.idle(20);
		scene.world.restoreBlocks(ME);
		scene.world.showSection(ME, "DOWN");
		scene.idle(40);
		
		scene.showControls(30, [7.5, 3, 4.5], "DOWN").withItem("kubejs:calculation_mechanism");
		scene.idle(50);
		
		scene.addKeyframe();
		scene.world.hideSection(ground1, "DOWN");
		scene.idle(20);
		scene.world.restoreBlocks(network1);
		scene.world.showSection(network1, "DOWN");
		scene.idle(40);
		scene.world.showSection(forge, "DOWN");
		scene.idle(20);
		
		scene.text(60, "Forge à chiffres", [2.5, 3.5, 5])
			.placeNearTarget();
		scene.idle(80);
		
		scene.addKeyframe();
		scene.world.hideSection(ground2, "DOWN");
		scene.idle(20);
		scene.world.restoreBlocks(network2);
		scene.world.showSection(network2, "DOWN");
		scene.idle(40);
		scene.world.showSection(maths, "DOWN");
		scene.idle(20);
		
		scene.text(60, "Atelier à équations", [7.5, 3.5, 7]).placeNearTarget();
		scene.idle(80);
		
		scene.addKeyframe();
		scene.world.hideSection(ground3, "DOWN");
		scene.idle(20);
		scene.world.restoreBlocks(network3);
		scene.world.showSection(network3, "DOWN");
		scene.idle(40);
		scene.world.showSection(smeltery, "DOWN");
		scene.idle(20);
		
		scene.text(60, "Forge à Matrices", [12.5, 3.5, 5])
			.placeNearTarget();
		scene.idle(80);
		
		scene.addKeyframe();
		let factory = AABB.of(0, 1, 4, 16, 5, 10);
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.GREEN, new Object(), factory, 90);
		scene.text(60, "L'usine complète peut tenir\nsur un seul chunk")
			.independent(15).colored(PonderPalette.GREEN).placeNearTarget();
		scene.idle(80);
			
		scene.world.showSection(power, "UP");
		scene.idle(20);
		
		let dynamo = AABB.of(7, 0, 4, 8, 1, 5)
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.FAST, new Object(), dynamo, 90);
		scene.text(60, "Energy Use:").independent(25).placeNearTarget();
		scene.idle(10);
		scene.text(60, "40 RF/t").independent(41).colored(PonderPalette.FAST).placeNearTarget();
		scene.idle(80);
		
		scene.world.showSection([7, 5, 7], "DOWN");
		scene.idle(20);
		
		let stress = AABB.of(7, 5, 7, 8, 6, 8)
		scene.overlay.chaseBoundingBoxOutline(PonderPalette.FAST, new Object(), stress, 90);
		scene.text(80, "Stress Impact:").independent(9).placeNearTarget();
		scene.idle(10);
		scene.text(70, "18.0x RPM").independent(25).colored(PonderPalette.FAST).placeNearTarget();
		scene.idle(10);
		scene.text(60, "256 RPM conseillé").independent(41).colored(PonderPalette.BLACK).placeNearTarget();
		scene.idle(80);
		
		// Vue finale
		scene.addKeyframe();
		for(let i = 0; i < 145; i++) {
			scene.rotateCameraY(-2);
			scene.idle(1);
		}
		scene.idle(20);
		
		scene.text(60, "§6To the Moon !").independent(160);
		scene.idle(60);
	});
	
})
