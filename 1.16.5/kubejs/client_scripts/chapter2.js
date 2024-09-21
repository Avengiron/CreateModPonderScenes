onEvent("ponder.registry", event => {

	event.create("kubejs:factory2", "kubejs:brass_machine").tag("kubejs:main_quest")
	.scene("intro_2", "Introduction au Chapitre 2", "kubejs:ch2_intro", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let depot = [1, 1, 1];
		let machine = [3, 1, 1, 3, 2, 1];
		let content = [
			[0, 2, 4, 3, 2, 4], // Engine
			[3, 1, 3, 3, 2, 3], // RSC
			[2, 1, 3], // Casing
			[1, 1, 3], // Crafter
			[2, 2, 3], // Arm
			[2, 1, 2], // Stockpile Switch
			[3, 1, 0], // Funnel
			[1, 1, 0]  // Dynamo
		];
		
		// Utilities
		let precMech = Item.of("create:precision_mechanism");
		
		showText(scene, util, 340, "Chapitre 2", [16], PonderPalette.WHITE, 20);
		showText(scene, util, 330, "L'Âge du Brass", [32], PonderPalette.OUTPUT, 40);
		
		showSection(scene, util, depot, "DOWN", 20);
		showText(scene, util, 70, 
			"Le but de ce chapitre est de produire des §6Precision Mechanisms §fà partir de Kinetic Mechanisms", 
			[1.5, 1 + 13 / 16.0, 1.5], PonderPalette.WHITE, 40);
		createItemOnBeltLike(scene, util, depot, "NORTH", precMech, 40);
		
		scene.addKeyframe();
		showSection(scene, util, machine, "DOWN", 20);
		showText(scene, util, 80, 
			"À partir des §6Brass Machines§f,\non débloque les machines\nintelligentes de Create",
			[166], PonderPalette.WHITE, 40);
		showCompound(scene, util, content, "DOWN", 3, 36);
		
		showText(scene, util, 80,
			"Ces Mechanisms sont aussi la\nbase des chapitres 2A et 3",
			[166], PonderPalette.GREEN, 80);	
	})
	.scene("sky_part", "Production de Sky Solution", "kubejs:ch2_skysolution", (scene, util) => {
		// Edit schematic : Tank amount 0
		//								: Basin tanks amount 0
		//								: pipes and pump molten obsidian
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let belt = [1, 1, 2, 2, 1, 2];
		let basin = [3, 1, 2];
		let mixer = [3, 3, 2];
		let water = [2, 3, 3, 4, 3, 3];
		let waterPipes = [3, 1, 3, 3, 2, 3];
		let skyMill1 = [[2, 1, 3], [2, 2, 3], [2, 2, 2]];
		let ssPipes = [[2, 1, 0], [3, 1, 0], [3, 1, 1]];
		let tank = [1, 1, 0, 1, 3, 0];
		
		let skyMill2 = util.select().fromTo(0, 1, 3, 0, 2, 3)
			.add(util.select().position(0, 2, 2));
		
		// Utilities
		let skyDust = Item.of("appliedenergistics2:sky_dust");
		let skyBlock = Item.of("appliedenergistics2:sky_stone_block");
		let ssBucket = Item.of("tconstruct:molten_obsidian_bucket");
		
		// Conditions initiales
		modifyTileNBT(scene, util, basin, { 
			InputTanks: [{ Level: { Value: 0.001 }}],
			OutputTanks: [{ Level: { Value: 0 }, TankContent:new CompoundNBT()}]
		}, 0);
		
		showSection(scene, util, belt, "DOWN", 5);
		showSection(scene, util, basin, "DOWN", 20);
		rotateCameraY(scene, -40, 20);
		
		// Mill de Sky Stone Block
		showCompound(scene, util, skyMill1, "DOWN", 3, 20);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 2, 3), PonderPointing.DOWN).withItem(skyBlock), 30);
		scene.idle(40);
		showText(scene, util, 60,
			"Passer la Sky Stone au Millstone donne deux résultats :",
			[2, 2.5, 3.5], PonderPalette.WHITE, 70);
		let dust = createItemOnBelt(scene, util, [2, 1, 2], "DOWN", skyDust, 0);
		stallBeltItem(scene, dust, true, 0);
		indicateSuccess(scene, util, [2, 1, 2], 20);
		showText(scene, util, 60,
			"- De la Dust, qui est\névacuée vers le Basin",
			[2.5, 1 + 13 / 16.0, 2.5], PonderPalette.WHITE, 70);
		stallBeltItem(scene, dust, false, 40);
		
		let block = createItemOnBelt(scene, util, [2, 1, 2], "DOWN", skyBlock, 0);
		stallBeltItem(scene, block, true, 0);
		indicateSuccess(scene, util, [2, 1, 2], 20);
		showText(scene, util, 60,
			"- La Sky Stone d'origine, qui est réinjectée vers le Millstone",
			[2.5, 1 + 13 / 16.0, 2.5], PonderPalette.WHITE, 70);
		
		removeItemsFromBelt(scene, util, [2, 1, 2], 0);
		flapFunnel(scene, util, [2, 2, 2], false, 20);
		rotateCameraY(scene, 40, 20);
		
		// Repetition paterne
		let flushMill = scene.world().showIndependentSection(skyMill2, "DOWN");
		moveSection(scene, util, flushMill, [1, 0, 0], 0, 20);
		showText(scene, util, 60,
			"Le design peut être répété pour augmenter la production",
			[1, 2.5, 3.5], PonderPalette.GREEN, 80);
		scene.world().hideIndependentSection(flushMill, "UP");
		scene.idle(20);
		
		// Mixing Sky Solution
		scene.addKeyframe();
		showSection(scene, util, waterPipes, "DOWN", 10);
		showSection(scene, util, water, "DOWN", 20);
		showText(scene, util, 60, "On pompe de l'eau\ndans le Basin",
			[3.5, 1.5, 2], PonderPalette.WHITE, 70);

		showSection(scene, util, mixer, "DOWN", 20);
		showText(scene, util, 60,
			"Mélanger la Sky Dust avec de\nl'eau donne de la Sky Solution",
			[3.5, 1.5, 2], PonderPalette.WHITE, 80);
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(3, 1, 2), PonderPointing.RIGHT).withItem(skyDust), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(3, 1, 2), PonderPointing.LEFT).withItem("minecraft:water_bucket"), 30);
		scene.idle(40);	
	
		// Animation Mixing
		modifyTileNBT(scene, util, mixer, { Running: true }, 80);
		modifyTileNBT(scene, util, basin, { 
			InputTanks:[{ Level:{ Value: 0.001 }}],
			OutputTanks:[{ Level:{ Value: 1 }}],
			InputItems: { Items: [new CompoundNBT()]}
		}, 20);
		rotateCameraY(scene, 70, 35);
		
		// Sortie
		scene.addKeyframe();
		showSection(scene, util, tank, "DOWN", 10);
		showCompound(scene, util, ssPipes, "DOWN", 3, 20);
		
		showFilterSlotInput(scene, util, [3 + 0.5, 1 + 1, 1 + 0.25], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(3 + 0.5, 1 + 1, 1 + 0.25), PonderPointing.DOWN).rightClick().withItem(ssBucket), 30);
		scene.idle(40);
		setFilterData(scene, util, ssPipes[2], SFPTE, ssBucket, 10);
		
		// scene.markAsFinished();
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 3, 0), PonderPointing.DOWN).withItem(ssBucket), 60);
		for(let volume = 100; volume <= 8000; volume += 100) 
			modifyTileNBT(scene, util, [1, 1, 0], { TankContent:{ Amount: volume }}, 1);
	})
	.scene("redstone_part", "Transformation en Redstone", "kubejs:ch2_redstone", (scene, util) => {
		// Edit schematic : Filter smart pipe minecraft:air, 0
		//								:	Basin in/out tank amount 1
		//								: Tanks in amount 32000 out amount 1
		scene.configureBasePlate(1, 0, 6);
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let beltCharged = [3, 1, 1, 4, 1, 1];
		let beltCertus = [2, 1, 2, 5, 1, 2];
		let charger = [[2, 1, 1], [2, 2, 1]];
		let funnelCharged1 = [3, 2, 1];
		let funnelCharged2 = [4, 2, 1];
		let funnelCertus = [2, 2, 2];
		let basin = [4, 2, 2];
		let mixer = [4, 4, 2];
		let ssTank = [0, 1, 2, 0, 4, 2];
		let drPipes = [[6, 2, 2], [5, 2, 2]];
		let drTank = [7, 1, 2, 7, 4, 2];
		
		// Utilities
		let ssBucket = Item.of("tconstruct:molten_obsidian_bucket");
		let drBucket = Item.of("thermal:redstone_bucket");
		let CQC = Item.of("appliedenergistics2:certus_quartz_crystal");
		let chargedCQC = Item.of("appliedenergistics2:charged_certus_quartz_crystal");
		let goldCoin = Item.of("thermal:gold_coin");
		
		// Conditions initiales
		modifyTileNBT(scene, util, basin, { 
			InputTanks: [{ Level: { Value: 0 }}],
			OutputTanks: [{ Level: { Value: 0 }}]
		}, 0);
		modifyTileNBT(scene, util, [2, 2, 1], { inv: { item0: { id: "minecraft:empty" }}}, 0);
		
		// Partie Sky Solution
		showSection(scene, util, ssTank, "DOWN", 20);		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 4, 2), PonderPointing.DOWN).withItem(ssBucket), 30);
		scene.idle(40);
		showSection(scene, util, basin, "DOWN", 20);
		for(let x = 4; x >= 1; x--) 
			showSection(scene, util, [x, 3, 2], "DOWN", 3);
		scene.idle(20);
		showSection(scene, util, mixer, "DOWN", 20);
		showText(scene, util, 60,
			"Pour faire de la Destabilized Redstone, on mélange la Sky Solution avec un Certus Quartz §bchargé",
			[4.5, 2.5, 2.5], PonderPalette.WHITE, 80);
		
		// Config du Basin
		modifyTileNBT(scene, util, basin, { InputTanks: [{ Level: { Value: 1 }}]}, 0);
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(4, 2, 2), PonderPointing.RIGHT).withItem(chargedCQC), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(4, 2, 2), PonderPointing.LEFT).withItem(ssBucket), 30);
		scene.idle(40);
		
		modifyTileNBT(scene, util, mixer, { Running: true }, 40);
		showSection(scene, util, beltCertus, "UP", 40);
		
		// Resultat du Mixing
		modifyTileNBT(scene, util, basin, { 
			InputTanks: [{ Level: { Value: 0 }}],
			OutputTanks: [{ Level: { Value: 1 }}]
		}, 0);
		let certus = createItemOnBelt(scene, util, [3, 1, 2], "EAST", CQC, 45);
		stallBeltItem(scene, certus, true, 0);
		
		// Evacuation du Certus Quartz déchargé
		scene.addKeyframe();
		showText(scene, util, 60,
			"Le Certus Quartz §7déchargé §fest évacué du Basin…",
			[2.5, 1 + 13 / 16.0, 2.5], PonderPalette.WHITE, 70);
		
		rotateCameraY(scene, 70, 35);
		showCompound(scene, util, charger, "DOWN", 3, 10);
		showSection(scene, util, funnelCertus, "DOWN", 25);
		scene.overlay().showControls(new PonderInput(util.vector().of(2.5, 1.25, 1.5), PonderPointing.UP).withItem(goldCoin), 30);
		scene.idle(15);
		modifyBlock(scene, util, charger[0], "active", "true", 25);
		
		// AE2 Charger
		scene.addKeyframe();
		removeItemsFromBelt(scene, util, [2, 1, 2], 0);
		flapFunnel(scene, util, funnelCertus, false, 0);
		restoreBlocks(scene, util, charger[1], 10);
		showText(scene, util, 40, "…puis rechargé…",
			[2.5, 2.5, 1], PonderPalette.WHITE, 50);
		
		// Retour du Certus Quartz rechargé
		showSection(scene, util, beltCharged, "DOWN", 3);
		showSection(scene, util, funnelCharged1, "DOWN", 20);
		
		modifyTileNBT(scene, util, charger[1], { inv: { item0: { id: "minecraft:empty" }}}, 0);
		showSection(scene, util, funnelCharged2, "DOWN", 0);
		createItemOnBeltLike(scene, util, [3, 1, 1], "WEST", chargedCQC, 45);
		
		removeItemsFromBelt(scene, util, [4, 1, 1], 0);
		flapFunnel(scene, util, funnelCharged2, false, 20);
		scene.addKeyframe();
		showText(scene, util, 60, "…avant d'être renvoyé\ndans le Basin",
			[4.5, 2.5, 1.5], PonderPalette.WHITE, 80);
		
		// Info sur l'alimentation du Charger
		showSelectionWithText(scene, util, charger[0], 60,
			"N'importe quelle dynamo\nfait l'affaire",
			[2, 1.5, 1], PonderPalette.GREEN, 70);
		
		scene.addKeyframe();
		showSection(scene, util, drTank, "DOWN", 10);
		showCompound(scene, util, drPipes, "DOWN", 3, 20);
		
		// Filtre de sortie
		showFilterSlotInput(scene, util, [5 + 0.75, 2 + 1, 2 + 0.5], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(5 + 0.75, 2 + 1, 2 + 0.5), PonderPointing.DOWN).rightClick().withItem(drBucket), 30);
		scene.idle(40);
		setFilterData(scene, util, [5, 2, 2], SFPTE, drBucket, 10);
		
		// Animation de remplissage du tank de sortie
		// scene.markAsFinished();
		scene.overlay().showControls(new PonderInput(util.vector().topOf(7, 4, 2), PonderPointing.DOWN).withItem(drBucket), 30);
		for(let volume = 100; volume <= 8000; volume += 100) 
			modifyTileNBT(scene, util, [7, 1, 2], { TankContent:{ Amount: volume }}, 1);
	})
	.scene("iron_part", "Production de Molten Iron", "kubejs:ch2_molteniron", (scene, util) => {
		// Edit schematic : Tanks in/out amount 1
		//								: Pipe 611 & 642 flow amount 0, pressure 0
		replaceBlocks(scene, util, [5, 0, 2], "minecraft:gray_concrete", false, 0);
		scene.configureBasePlate(1, 0, 6);
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let belt = [3, 1, 2, 5, 1, 2];
		let cobbleGen = [2, 2, 2];
		let lavaGen = [2, 2, 3];
		let waterGen = [2, 2, 1];
		let crushers = [4, 2, 1, 4, 2, 3];
		let outFunnel = [3, 2, 2];
		let inFunnel = [5, 2, 2];
		let washer = [[5, 3, 2], [5, 4, 2]];
		let chute = [5, 0, 2];
		let melter = [[6, 1, 2], [6, 2, 2]];
		let emptyTank = [6, 1, 3];
		let bbTank = [0, 1, 2, 0, 4, 2];
		let bbPipes = [
			[1, 1, 2], [2, 1, 2], [2, 1, 1],
			[2, 1, 0], [3, 1, 0], [4, 1, 0], 
			[5, 1, 0], [6, 1, 0], [6, 1, 1]
		];
		let miPipes = [[6, 3, 2], [6, 4, 2]];
		let miTank = [7, 1, 2, 7, 4, 2];
		
		// Utilities
		let bbBucket = Item.of("tconstruct:blazing_blood_bucket");
		let miBucket = Item.of("tconstruct:molten_iron_bucket");
		let cobble = Item.of("minecraft:cobblestone");
		let gravel = Item.of("minecraft:gravel");
		let flint = Item.of("minecraft:flint");
		let ironNugget = Item.of("minecraft:iron_nugget", 16); // Nugget x3 sur une Belt
		
		// Conditions initiales
		modifyTileNBT(scene, util, [0, 1, 2], { TankContent: { Amount: 32000 }}, 0);
		modifyTileNBT(scene, util, melter[1], { 
			tank: { Amount: 0 },
			inventory: { items: [new CompoundNBT(), new CompoundNBT(), new CompoundNBT()]}
		}, 0);
		modifyTileNBT(scene, util, melter[0], { tank: { Amount: 0 }}, 0);
		setKineticSpeed(scene, util, washer[1], 0, 0);
		
		// Cobble Generation
		showCompound(scene, util, [cobbleGen, lavaGen, waterGen], "DOWN", 5, 15);
		modifyBlock(scene, util, cobbleGen, "active", "true", 0);
		showText(scene, util, 60, "Production de Cobblestone…",
			[2, 2.5, 2.5], PonderPalette.WHITE, 70);
		
		// Process en Gravel
		showSection(scene, util, belt, "DOWN", 5);
		showSection(scene, util, outFunnel, "DOWN", 20);
		showSection(scene, util, crushers, "DOWN", 20);
		showText(scene, util, 60,
			"…qui est transformée en Gravel par une série de Crushers",
			[4.5, 3 - 1 / 8.0, 2.5], PonderPalette.WHITE, 70);
		
		// Washing en Iron Nugget
		createItemOnBeltLike(scene, util, [5, 1, 2], "WEST", gravel, 0);
		hideSection(scene, util, crushers, "UP", 20);
		showCompound(scene, util, washer, "DOWN", 0, 20);
		
		scene.addKeyframe();
		showText(scene, util, 60,
			"§9Bulk Wash §fdu Gravel pour\nobtenir des Iron Nuggets",
			[5.5, 1 + 13 / 16.0, 2.5], PonderPalette.WHITE, 50);
		setKineticSpeed(scene, util, washer[1], -16, 20);
		
		setKineticSpeed(scene, util, washer[1], 0, 20);
		removeItemsFromBelt(scene, util, [5, 1, 2], 0);
		createItemOnBeltLike(scene, util, [5, 1, 2], "DOWN", ironNugget, 20);
		hideCompound(scene, util, washer, "UP", 0, 20);
		showCompound(scene, util, melter, "DOWN", 0, 5);
		showSection(scene, util, inFunnel, "DOWN", 20);
		rotateCameraY(scene, -20, 20);
		
		// Filtre funnel
		showFilterSlotInput(scene, util, [5 + 0.5, 2 + 13 / 16.0, 2 + 0.5], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(5 + 0.5, 2 + 13 / 16.0, 2 + 0.5), PonderPointing.LEFT).rightClick().withItem(ironNugget), 30);
		scene.idle(40);
		setFilterData(scene, util, inFunnel, FTE, ironNugget, 10);
		rotateCameraY(scene, 20, 20);
		
		removeItemsFromBelt(scene, util, [5, 1, 2], 0);
		flapFunnel(scene, util, inFunnel, false, 0);
		restoreBlocks(scene, util, melter[1], 0);
		modifyTileNBT(scene, util, melter[1], { tank:{ Amount: 0 }}, 20);
		
		scene.addKeyframe();
		createItemOnBeltLike(scene, util, [5, 1, 2], "DOWN", flint, 10);
		showText(scene, util, 60,
			"On obtient également du Flint,\ndont on se débarrasse",
			[5.5, 1.75, 2.5], PonderPalette.WHITE, 70);
		
		rotateCameraY(scene, 20, 20);
		restoreBlocks(scene, util, chute, 0);
		hideCompound(scene, util, [[5, 0, 0], [5, 0, 1]], "DOWN", 3, 20);
		
		// Filtre chute
		showFilterSlotInput(scene, util, [5 + 0.5, 0 + 0.75, 2], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(5 + 0.5, 0 + 0.75, 2), PonderPointing.DOWN).rightClick().withItem(flint), 30);
		scene.idle(40);
		setFilterData(scene, util, chute, SCTE, flint, 10);
		
		removeItemsFromBelt(scene, util, [5, 1, 2], 20);
		showCompound(scene, util, [[5, 0, 1], [5, 0, 0]],  "UP", 3, 20);
		rotateCameraY(scene, 50, 25);
		
		// Melting de l'Iron
		scene.addKeyframe();
		showSection(scene, util, bbTank, "DOWN", 20);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 4, 2), PonderPointing.DOWN).withItem(bbBucket), 30);
		scene.idle(40);
		showCompound(scene, util, bbPipes, "SOUTH", 3, 20);
		showText(scene, util, 60,
			"Le Melter est alimenté\nen Blazing Blood",
			[6.5, 1.5, 2], PonderPalette.WHITE, 30);
		
		// Animation Fluid Tank du Melter
		restoreBlocks(scene, util, melter[0], 0);
		for(let vol = 100; vol <= 4000; vol += 100) {
			let volBBTank = 32000 - vol;
			modifyTileNBT(scene, util, [0, 1, 2], { TankContent: { Amount: volBBTank }}, 0);
			modifyTileNBT(scene, util, melter[0], { 
				tank: { FluidName: "tconstruct:blazing_blood", Amount: vol }
			}, 1);
		}
		scene.idle(20);
		
		// Animation Melter
		modifyBlock(scene, util, melter[1], "active", "true", 20);
		showText(scene, util, 60, "L'Iron est fondu…",
			[6.5, 2.5, 2], PonderPalette.WHITE, 30);
		for(let vol = 24; vol < 1296; vol += 24) 		
			modifyTileNBT(scene, util, melter[1], { 
				tank: { FluidName: "tconstruct:molten_iron", Amount: vol }
			}, 1);
		scene.idle(20);
		modifyBlock(scene, util, melter[1], "active", "false", 0);
		modifyTileNBT(scene, util, melter[1], { 
			inventory: { items: [new CompoundNBT(), new CompoundNBT(), new CompoundNBT()]}
		}, 20);
		
		scene.addKeyframe();
		showSection(scene, util, miTank, "DOWN", 10);
		showCompound(scene, util, miPipes, "SOUTH", 3, 17);
		
		showText(scene, util, 60, "…puis évacué sous forme liquide",
			[6.5, 3.5, 2], PonderPalette.WHITE, 70);
		
		// Animation de remplissage du tank de sortie
		showCompound(scene, util, washer, "DOWN", 5, 0);
		showSection(scene, util, crushers, "DOWN", 5);
		showSection(scene, util, [4, 1, 1], "DOWN", 5); // Gearbox crushers
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(7, 4, 2), PonderPointing.DOWN).withItem(miBucket), 30);
		setKineticSpeed(scene, util, washer[1], -16, 20);
		for(let i = 1; i <= 80; i++) {
			if(i <= 70) rotateCameraY(scene, -1, 0);
			let volMITank = i * 100;
			let volMelter = 1296 - i * 16
			modifyTileNBT(scene, util, melter[1], { tank: { Amount: volMelter }}, 0);
			modifyTileNBT(scene, util, [7, 1, 2], { TankContent:{ Amount: volMITank }}, 1);
		}
		modifyTileNBT(scene, util, melter[1], { tank: { Amount: 0 }}, 0);
	})
	.scene("certus_part", "Boucle à Certus Quartz", "kubejs:ch2_certus", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let beltGrow = [0, 1, 2, 3, 1, 2];
		let crafter = [1, 2, 2];
		let crate1 = [4, 2, 2];
		let inFunnelGrow = [3, 2, 2];
		let spouts = [[2, 3, 2], [3, 3, 2]];
		let pumps = [2, 4, 2, 3, 4, 2];
		let water1 = [1, 5, 2, 4, 5, 2];
		let water2 = [1, 6, 2, 4, 6, 2];
		let beltBack = [1, 1, 3, 4, 1, 3];
		let crate2 = [0, 2, 3];
		let inFunnelBack = [1, 2, 3];
		let outFunnelGrow = [0, 2, 2];
		let outFunnelTiny = [4, 2, 3];
		let beltOut = [2, 1, 1, 4, 1, 1];
		let outFunnelQuartz = [4, 2, 1];
		let tunnel = [2, 2, 1];
		let depotGrow = [1, 1, 1];
		let depotOut = [2, 1, 0];
		let inFunnelCraft = [1, 2, 1];
		
		let toHide1 = [spouts[0], spouts[1], pumps, water1, water2];
		let toHide2 = [beltBack, crate2, inFunnelBack, outFunnelGrow, outFunnelTiny];
		
		// Utilities
		let seed = Item.of("appliedenergistics2:certus_crystal_seed");
		let tinyCQ = Item.of("kubejs:tiny_certus_crystal");
		let smallCQ = Item.of("kubejs:small_certus_crystal");
		let PCQ = Item.of("appliedenergistics2:purified_certus_quartz_crystal");
		let filter = Item.of("create:filter");
		
		// Conditions initiales
		modifyTileNBT(scene, util, crafter, { Inventory: { Items: new CompoundNBT() }}, 0);
		setKineticSpeed(scene, util, crafter, 32, 0);
		
		rotateCameraY(scene, 70, 35);
		showSection(scene, util, beltGrow, "DOWN", 5);
		showSection(scene, util, crafter, "DOWN", 20);		
		showText(scene, util, 60,
			"Un Certus Quartz dans un Crafter donne 2x Certus Crystal Seeds",
			[1.5, 2.5, 2], PonderPalette.WHITE, 30);
		
		restoreBlocks(scene, util, crafter, 0);
		setKineticSpeed(scene, util, crafter, 32, 0);
		setCraftingResult(scene, util, crafter, seed, 74);
		
		showCompound(scene, util, spouts, "DOWN", 3, 0);
		removeItemsFromBelt(scene, util, [1, 1, 2], 1);
		let processSeed = createItemOnBelt(scene, util, [1, 1, 2], "UP", seed, 20);
		scene.addKeyframe();
		showText(scene, util, 80,
			"Une Seed doit passer §312 fois §fsous un Spout avec de l'eau pour redevenir un Certus Quartz",
			[2.5, 1 + 13 / 16.0, 2.5], PonderPalette.WHITE, 90);
		
		showSection(scene, util, pumps, "DOWN", 5);
		showSection(scene, util, water1, "DOWN", 5);
		showSection(scene, util, water2, "DOWN", 20);
		
		// Animation spout x2
		modifyTileNBT(scene, util, spouts[0], { ProcessingTicks: 20 }, 0);
		for(let i = 0; i < 20; i++) 
			rotateCameraY(scene, -1, 1);
		stallBeltItem(scene, processSeed, false, 0);
		for(let i = 0; i < 35; i++) 
			rotateCameraY(scene, -1, 1);
		modifyTileNBT(scene, util, spouts[1], { ProcessingTicks: 20 }, 0);
		for(let i = 0; i < 15; i++) 
			rotateCameraY(scene, -1, 1);
		scene.idle(10);
		
		showSection(scene, util, crate1, "DOWN", 5);
		showSection(scene, util, inFunnelGrow, "DOWN", 20);
		removeItemsFromBelt(scene, util, [3, 1, 2], 0);
		flapFunnel(scene, util, inFunnelGrow, false, 20);
		
		// Disparition des Spouts pour visibilite
		hideCompound(scene, util, toHide1.reverse(), "UP", 3, 20);
		rotateCameraY(scene, -110, 45);
		
		scene.addKeyframe();
		showSection(scene, util, beltBack, "DOWN", 5);
		showSection(scene, util, outFunnelTiny, "DOWN", 20);
		showText(scene, util, 60,
			"Tout ce qui n'est pas un Certus Quartz reboucle pour repasser sous les Spouts",
			[4.5, 2.5, 3.5], PonderPalette.WHITE, 70);
		
		// Filtre funnel
		showFilterSlotInput(scene, util, [4 + 0.5, 2 + 0.7, 3 + 0.6], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(4 + 0.5, 2 + 0.7, 3 + 0.6), PonderPointing.DOWN).showing(AllIcons.I_BLACKLIST).withItem(PCQ), 30);
		scene.idle(40);
		setFilterData(scene, util, outFunnelTiny, FTE, filter, 10);
		
		// rotateCameraY(scene, 20, 20);
		showSection(scene, util, crate2, "DOWN", 5);
		showSection(scene, util, inFunnelBack, "DOWN", 5);
		showSection(scene, util, outFunnelGrow, "DOWN", 20);
		
		// Animer retour seed, tiny et small
		scene.addKeyframe();
		createItemOnBeltLike(scene, util, [4, 1, 3], "NORTH", seed, 0);
		showText(scene, util, 95, "Certus Quartz Seed",
			[148], PonderPalette.INPUT, 35);
		createItemOnBeltLike(scene, util, [4, 1, 3], "NORTH", tinyCQ, 0);
		showText(scene, util, 90, "Tiny Certus Quartz Crystal",
			[164], PonderPalette.INPUT, 35);
		createItemOnBeltLike(scene, util, [4, 1, 3], "NORTH", smallCQ, 0);
		showText(scene, util, 85, "Small Certus Quartz Crystal",
			[180], PonderPalette.INPUT, 25);
		
		for(let i = 0; i < 3; i++) {
			removeItemsFromBelt(scene, util, [1, 1, 3], 0);
			flapFunnel(scene, util, inFunnelBack, false, 30);
		}

		// Disparition de la ligne retour pour visibilite
		hideCompound(scene, util, toHide2.reverse(), "UP", 3, 20);
		rotateCameraY(scene, 110, 45);
		
		scene.addKeyframe();
		showSection(scene, util, beltOut, "DOWN", 5);
		showSection(scene, util, outFunnelQuartz, "DOWN", 20);
		showText(scene, util, 60,
			"Les Pure Certus Quartz Crystals sont sortis de ce côté",
			[4.5, 2.5, 1.5], PonderPalette.WHITE, 70);
		
		// Filtre funnel
		showFilterSlotInput(scene, util, [4 + 0.5, 2 + 0.7, 1 + 0.4], 100, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(4 + 0.5, 2 + 0.7, 1 + 0.4), PonderPointing.DOWN).rightClick().withItem(PCQ), 30);
		scene.idle(40);
		setFilterData(scene, util, outFunnelQuartz, FTE, PCQ, 10);
		showText(scene, util, 30, "Régler également la valeur sur \"2\"",
			[4 + 0.5, 2 + 0.7, 1 + 0.4], PonderPalette.WHITE, 0);
		scene.overlay().showControls(new PonderInput(util.vector().of(4 + 0.5, 2 + 0.7, 1 + 0.4), PonderPointing.RIGHT).withWrench().scroll(), 30);
		scene.idle(40);
		
		// Split des Crystals
		showSection(scene, util, depotGrow, "DOWN", 5);
		showSection(scene, util, depotOut, "DOWN", 5);
		showSection(scene, util, tunnel, "DOWN", 20);
		
		createItemOnBeltLike(scene, util, [4, 1, 1], "SOUTH", Item.of("appliedenergistics2:purified_certus_quartz_crystal", 2), 0);
		showText(scene, util, 60,
			"Les deux Certus Quartz sont séparés par le Tunnel",
			[2.5, 3, 1.5], PonderPalette.WHITE, 110);
		
		showText(scene, util, 60,"L'un est sorti du système…",
			[2.5, 1 + 13 / 16.0, 0.5], PonderPalette.OUTPUT, 70);
		showText(scene, util, 60,
			"…L'autre est renvoyé dans le Crafter pour donner deux nouvelles Seeds",
			[1.5, 1 + 13 / 16.0, 1.5], PonderPalette.INPUT, 70);
		
		showSection(scene, util, inFunnelCraft, "DOWN", 20);
		removeItemsFromBelt(scene, util, depotGrow, 0);
		flapFunnel(scene, util, inFunnelCraft, false, 20);
		
		// Reapparition des elements caches
		showCompound(scene, util, toHide2.reverse(), "DOWN", 3, 0);
		showCompound(scene, util, toHide1.reverse(), "DOWN", 3, 0);
		
		// Travelling global
		scene.addKeyframe();
		for(let i = 0; i < 145; i++) 
			rotateCameraY(scene, -2, 1);
	})
	.scene("process_part", "Process d'Electron Tube", "kubejs:ch2_etubes", (scene, util) => {
		// Edit Schematic : Tanks amount 1
		//								:	Basin tank Amount 1
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let belt = [1, 1, 0, 1, 1, 2];
		let depot = [0, 1, 3];
		let inFunnel = [0, 2, 3];
		let basin = [1, 2, 3];
		let mixer = [1, 4, 3];
		let spout = [1, 3, 1];
		let drTank = [3, 1, 3, 3, 4, 3];
		let drPipes = [1, 3, 3, 2, 3, 3];
		let miPipes = [1, 4, 1, 2, 4, 1];
		let miTank = [3, 1, 1, 3, 4, 1];
		let depotFunnelEnd = [[1, 1, 4], [1, 2, 4]];
		
		// Utilities
		let drBucket = Item.of("thermal:redstone_bucket");
		let miBucket = Item.of("tconstruct:molten_iron_bucket");
		let PCQ = Item.of("appliedenergistics2:purified_certus_quartz_crystal");
		let roseQ = Item.of("create:polished_rose_quartz");
		let eTube = Item.of("create:electron_tube");
		
		// Conditions initiales
		modifyTileNBT(scene, util, [3, 1, 1], { TankContent:{ Amount: 32000 }}, 0);
		modifyTileNBT(scene, util, [3, 1, 3], { TankContent:{ Amount: 32000 }}, 0);
		modifyTileNBT(scene, util, basin, {
			InputItems: { Items: [new CompoundNBT()]},
			InputTanks:[{ Level:{ Value: 0.001 }}]
		}, 0);
		modifyTileNBT(scene, util, spout, { 
			Tanks:[{ Level:{ Value: 0.001 }, 
			TankContent:{ Amount: 1 }}]
		}, 0);
		setKineticSpeed(scene, util, mixer, 32, 0);
		
		showSection(scene, util, basin, "DOWN", 20);
		showSection(scene, util, depot, "DOWN", 5);
		showSection(scene, util, inFunnel, "DOWN", 20);
		createItemOnBeltLike(scene, util, depot, "WEST", PCQ, 20);
		showText(scene, util, 60,
			"Les Electron Tubes sont créés à partir de Purified Certus Quartz…",
			[0.5, 1 + 13 / 16.0, 3.5], PonderPalette.WHITE, 70);
		
		removeItemsFromBelt(scene, util, depot, 0);
		flapFunnel(scene, util, inFunnel, false, 0);
		restoreBlocks(scene, util, basin, 0);
		modifyTileNBT(scene, util, basin, { InputTanks: [{ Level:{ Value: 0.001 }}]}, 20);
		
		showSection(scene, util, drTank, "DOWN", 5);
		showSection(scene, util, drPipes, "DOWN", 20);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 4, 3), PonderPointing.DOWN).withItem(drBucket), 30);
		scene.idle(40);
		
		// Rose Quartz
		scene.addKeyframe();
		showSection(scene, util, mixer, "DOWN", 5);
		showSection(scene, util, belt, "DOWN", 20);
		showText(scene, util, 60,
			"…d'abord mixé avec de la Destabilized Redstone…",
			[1.5, 2.5, 3], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(1, 2, 3), PonderPointing.RIGHT).withItem(PCQ), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(1, 2, 3), PonderPointing.LEFT).withItem(drBucket), 30);
		scene.idle(40);
		
		restoreBlocks(scene, util, basin, 0);
		modifyTileNBT(scene, util, mixer, { Running: true }, 80);
		
		let PRQ = createItemOnBelt(scene, util, [1, 1, 2], "SOUTH", roseQ, 48);
		stallBeltItem(scene, PRQ, true, 20);
		
		// Electron Tube
		scene.addKeyframe();
		showSection(scene, util, miTank, "DOWN", 5);
		showSection(scene, util, miPipes, "DOWN", 5);
		showSection(scene, util, spout, "SOUTH", 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 4, 1), PonderPointing.DOWN).withItem(miBucket), 30);
		scene.idle(40);
		showText(scene, util, 60, "…puis passé sous un Spout de Molten Iron",
			[1.5, 3.5, 1.5], PonderPalette.WHITE, 70);
		
		modifyTileNBT(scene, util, spout, { ProcessingTicks: 20 }, 20);
		changeBeltItemTo(scene, PRQ, eTube, 0);
		stallBeltItem(scene, PRQ, false, 32);
		stallBeltItem(scene, PRQ, true, 20);
		
		hideCompound(scene, util, [inFunnel, depot], "UP", 3, 0);
		rotateCameraY(scene, -20, 20);
		showCompound(scene, util, depotFunnelEnd, "DOWN", 3, 20);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 1, 0), PonderPointing.DOWN).withItem(eTube), 30);
		scene.idle(30);
	})
	.scene("precision_part", "Production de Precision Mechanisms", "kubejs:ch2_mechanism", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let inFunnel = [0, 2, 1];
		
		// Utilities
		let eTube = Item.of("create:electron_tube");
		let screwdriver = Item.of("projectred-core:screwdriver");
		let kinMech = Item.of("kubejs:kinetic_mechanism");
		let iPrecMech = Item.of("create:incomplete_precision_mechanism");
		let precMech = Item.of("create:precision_mechanism");
		let emptyStack = Item.getEmpty();
		
		// Apparition de tous les elements
		showSection(scene, util, [0, 1, 1, 4, 1, 1], "DOWN", 5);
		showSection(scene, util, [4, 2, 2], "DOWN", 5);
		showSection(scene, util, [0, 2, 2], "DOWN", 15);
		showSection(scene, util, [4, 2, 1], "DOWN", 5);
		showSection(scene, util, inFunnel, "DOWN", 15);
		
		for(let x = 1; x <= 3; x++) 
			showSection(scene, util, [x, 3, 1], "DOWN", 5);
		scene.idle(15);
		rotateCameraY(scene, 70, 35);
		
		// Electron tube, Electron tube et Screwdriver dans les deployers
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 3, 1), PonderPointing.DOWN).withItem(eTube), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 3, 1), PonderPointing.DOWN).withItem(eTube), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 3, 1), PonderPointing.DOWN).withItem(screwdriver), 30);
		scene.idle(30);
		
		modifyTileNBT(scene, util, [3, 3, 1], { HeldItem: eTube }, 5);
		modifyTileNBT(scene, util, [2, 3, 1], { HeldItem: eTube }, 5);
		modifyTileNBT(scene, util, [1, 3, 1], { HeldItem: screwdriver }, 15);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(4, 2, 2), PonderPointing.DOWN).withItem(kinMech), 30);
		scene.idle(40);
		
		// Sequenced Assembly de Kinetic Mechanism vers Precision Mechanism
		scene.addKeyframe();
		let sequence = createItemOnBelt(scene, util, [4, 1, 1], "SOUTH", kinMech, 30);
		
		moveDeployer(scene, util, [3, 3, 1], 1, 19, 20);
		changeBeltItemTo(scene, sequence, iPrecMech, 0);
		stallBeltItem(scene, sequence, false, 0);
		modifyTileNBT(scene, util, [3, 3, 1], { HeldItem: emptyStack }, 0);
		
		// Idle 25 + Travelling
		moveDeployer(scene, util, [3, 3, 1], -1, 19, 10);
		for(let i = 0; i < 15; i++) 
			rotateCameraY(scene, -1, 1);
		
		// Idle 20 + Travelling
		moveDeployer(scene, util, [2, 3, 1], 1, 19, 0);
		for(let i = 0; i < 20; i++) 
			rotateCameraY(scene, -1, 1);
		
		stallBeltItem(scene, sequence, false, 0);
		modifyTileNBT(scene, util, [2, 3, 1], { HeldItem: emptyStack }, 0);
		moveDeployer(scene, util, [2, 3, 1], -1, 19, 0);
		// Idle 25 + Travelling
		for(let i = 0; i < 25; i++) 
			rotateCameraY(scene, -1, 1);
		
		// Idle 20 + Travelling
		moveDeployer(scene, util, [1, 3, 1], 1, 19, 0);
		for(let i = 0; i < 10; i++) 
			rotateCameraY(scene, -1, 1);
		scene.idle(10);
		
		changeBeltItemTo(scene, sequence, precMech, 0);
		stallBeltItem(scene, sequence, false, 0);
		moveDeployer(scene, util, [1, 3, 1], -1, 19, 20);
		
		removeItemsFromBelt(scene, util, [0, 1, 1], 0);
		flapFunnel(scene, util, inFunnel, false, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 2, 2), PonderPointing.DOWN).withItem(precMech), 30);
		scene.idle(30);
	})
	.scene("overview_2", "Usine complète", "kubejs:ch2_overview", (scene, util) => {
		// Edit schematic : pump 4 1 3 pressure 0
		replaceBlocks(scene, util, [9, 4, 7], "minecraft:air", false, 0);
		scene.configureBasePlate(0, 0, 14);
		scene.scaleSceneView(0.5);
		scene.setSceneOffsetY(-2);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let skyProd = [[ 4, 2, 9, 11, 4, 13],
			[10, 2, 7, 11, 2, 8], [ 8, 4, 8, 10, 4, 8]];
		let pcqProd = [[2, 6, 10, 11, 11, 13],
			[5, 6, 9, 5, 7, 9], [6, 7, 9]];
		let redProd = [4, 1, 6, 9, 4, 7];
		let ironProd = [[4, 1, 1, 9, 3, 4],
			[7, 4, 2, 9, 4, 4], [8, 5, 2, 9, 5, 3]];
		let process1 = [[6, 5, 1, 7, 5, 8], [6, 6, 7, 7, 6, 9], 
			[6, 7, 8, 7, 7, 8], [7, 7, 9]];
		let process2 = [[4, 6, 6, 7, 8, 6], [4, 5, 6, 5, 5, 6],
			[5, 5, 7, 5, 6, 7], [5, 5, 5, 5, 8, 5], [8, 5, 5, 8, 8, 5]];
		let process3 = [[4, 6, 2, 9, 7, 3],
			[6, 6, 4, 7, 6, 4], [4, 4, 2, 5, 5, 3],
			[8, 5, 1, 9, 5, 1],[9, 6, 2]];
		let seqAssembly = [[2, 1, 0, 13, 6, 0], [6, 6, 1,  7, 6, 1]];
		let power = [[12, 2, 1, 13, 6, 13], [10, 3, 7, 11, 3,  7],
			[ 8, 6, 7, 11, 5,  7], [10, 4, 4, 11, 4,  4]];
		let volCtrl = [[10, 1, 4, 11, 2, 4], [ 2, 1, 4, 3, 2, 4]];
		
		let ssTank = [10, 1, 5, 11, 8, 6];
		let drTank = [ 2, 1, 5,  3, 8, 6];
		let bbTank = [ 2, 1, 2,  3, 8, 3];
		let miTank = [10, 1, 2, 11, 8, 3];	
		
		// Utilities
		let ironFarm = [4, 4, 2, 5, 7, 3]; // Pour AABB
		
		let bbBucket = Item.of("tconstruct:blazing_blood_bucket");
		let PCQ = Item.of("appliedenergistics2:purified_certus_quartz_crystal");
		let ironBlock = Item.of("minecraft:iron_block");
		let kinMech = Item.of("kubejs:kinetic_mechanism");
		
		// Conditions initiales
		modifyTileNBT(scene, util, [ 2, 1, 2], { TankContent:{ Amount: 256000 }}, 0);
		modifyTileNBT(scene, util, [ 2, 1, 5], { TankContent:{ Amount: 256000 }}, 0);
		modifyTileNBT(scene, util, [10, 1, 2], { TankContent:{ Amount: 256000 }}, 0);
		modifyTileNBT(scene, util, [10, 1, 5], { TankContent:{ Amount: 256000 }}, 0);
		modifyTileNBT(scene, util, [6, 7, 2], { Tanks:[{ Level:{ Value: 0.001 }}]}, 0);
		modifyTileNBT(scene, util, [7, 7, 2], { Tanks:[{ Level:{ Value: 0.001 }}]}, 0);
		modifyTileNBT(scene, util, [4, 5, 2], { tank: { fluid: { Amount: 0 }}}, 0);
		modifyTileNBT(scene, util, [4, 4, 0], { Value: 0.66 }, 0);
		
		// Sky Solution
		showCompound(scene, util, skyProd, "DOWN", 0, 20);
		showText(scene, util, 60, "Production de Sky Solution",
			[9.5, 3, 11], PonderPalette.WHITE, 90);
		showSection(scene, util, ssTank, "DOWN", 40);
		
		// Destabilized Redstone
		scene.addKeyframe();
		showSection(scene, util, redProd, "DOWN", 20);
		showText(scene, util, 60, "Transformation en Redstone",
			[6.5, 2.5, 6], PonderPalette.WHITE, 90);
		showSection(scene, util, drTank, "DOWN", 40);
		
		// Molten Iron
		scene.addKeyframe();
		showSection(scene, util, bbTank, "DOWN", 20);
		scene.overlay().showControls(new PonderInput(util.vector().of(3, 9, 3), PonderPointing.DOWN).withItem(bbBucket), 30);
		scene.idle(40);
		showCompound(scene, util, ironProd, "DOWN", 0, 20);
		showText(scene, util, 60, "Production de Molten Iron",
			[9.5, 2.5, 3], PonderPalette.WHITE, 90);
		showSection(scene, util, miTank, "DOWN", 40);
		
		// Certus Quartz
		scene.addKeyframe();
		showCompound(scene, util, pcqProd, "DOWN", 0, 20);
		showText(scene, util, 60, "Boucle à Certus Quartz",
			[6.5, 7.5, 9], PonderPalette.WHITE, 70);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(4, 6, 10), PonderPointing.DOWN).withItem(PCQ), 30);
		scene.idle(15);
		createItemOnBeltLike(scene, util, [4, 6, 10], "NORTH", PCQ, 35);
		
		// Process 1
		scene.addKeyframe();
		showCompound(scene, util, process1, "DOWN", 0, 20);
		let outFunnelCQ = AABB.of(7, 7, 9, 7.6, 8, 10); 
		chaseBoundingBoxOutline(scene, PonderPalette.WHITE, outFunnelCQ, 60, 0);
		showText(scene, util, 60, "Régler la valeur du Funnel\nde sortie sur 32",
			[7, 8, 9.5], PonderPalette.WHITE, 80);
		// showScrollInput(scene, util, [7 + 0.5, 7 + 1, 8 + 0.5], "DOWN", 60, 10); // Pas assez visible
		let scrollInput = AABB.of(7.25, 8 + 1 / 16.0, 8.25, 7.75, 8 + 1 / 16.0, 8.75);
		chaseBoundingBoxOutline(scene, PonderPalette.WHITE, scrollInput, 60, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(7 + 0.5, 7 + 1.25, 8 + 0.5), PonderPointing.DOWN).withWrench().showing(AllIcons.I_TUNNEL_SPLIT), 40);
		scene.idle(70);
		
		// Process 2
		scene.addKeyframe();
		showCompound(scene, util, process2, "DOWN", 0, 20);
		showText(scene, util, 60, "Production de Polished\nRose Quartz…",
			[7, 6.5, 6], PonderPalette.WHITE, 70);
		
		// Process 3
		scene.addKeyframe();
		showCompound(scene, util, process3, "DOWN", 0, 20);
		showText(scene, util, 60, "…puis d'Electron Tubes",
			[7, 7.5, 2], PonderPalette.WHITE, 90);
		
		// Iron Farm
		scene.addKeyframe();
		showText(scene, util, 60,
			"Comme le Molten Iron est produit plus vite que les Certus Quartz…",
			[11, 9, 3], PonderPalette.WHITE, 70);
		rotateCameraY(scene, 70, 35);
		showSelectionWithText(scene, util, ironFarm, 60,
			"…On ajoute une évacuation\ndu surplus, ce qui donne une\nferme à fer",
			[4.5, 5.5, 2], PonderPalette.OUTPUT, 70);
			
		modifyTileNBT(scene, util, [4, 7, 2], { ProcessingTicks: 40 }, 0);
		restoreBlocks(scene, util, [4, 5, 2], 0);
		for(let vol = 32; vol <= 1280; vol += 32) 
			modifyTileNBT(scene, util, [4, 5, 2], { tank: { fluid: { Amount: vol }}}, 1);
		modifyTileNBT(scene, util, [4, 5, 2], { tank: { fluid: { Amount: 1296 }}}, 40);
		scene.overlay().showControls(new PonderInput(util.vector().of(5, 4.5, 2), PonderPointing.LEFT).withItem(ironBlock), 30);
		scene.idle(60);
		
		// Ligne d'assemblage
		scene.addKeyframe();
		showCompound(scene, util, seqAssembly, "SOUTH", 0, 20);
		showText(scene, util, 60, "Ligne d'assemblage des\nPrecision Mechanisms",
			[7, 3.5, 0], PonderPalette.WHITE, 70);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(12, 3, 0), PonderPointing.DOWN).withItem(kinMech), 30);
		scene.idle(40);
		
		// Controle de volume des tanks, alimentation, disparition de l'iron block
		scene.addKeyframe();
		showCompound(scene, util, volCtrl, "DOWN", 0, 10);
		restoreBlocks(scene, util, [4, 5, 2], 0);
		modifyTileNBT(scene, util, [4, 5, 2], { tank: { fluid: { Amount: 0 }}}, 10);
		showCompound(scene, util, power, "DOWN", 0, 40);
		
		// Taille globale 14x14
		showSelectionWithText(scene, util, [0, 1, 0, 13, 12, 13], 60,
			"L'usine complète peut tenir\nsur un seul chunk",
			[0, 6.5, 0], PonderPalette.GREEN, 80);
		
		// Stress Impact: 170.0x RPM
		let stressometer = AABB.of(4, 4, 0, 5, 5, 1);
		chaseBoundingBoxOutline(scene, PonderPalette.FAST, stressometer, 90, 0);
		showText(scene, util, 80, "Stress Impact:", [72], PonderPalette.WHITE, 10);
		showText(scene, util, 70, "170.0x RPM", [88], PonderPalette.FAST, 80);
		
		// Vue finale
		scene.addKeyframe();
		for(let i = 0; i < 145; i++)
			rotateCameraY(scene, 2, 1);
	});
	
})
