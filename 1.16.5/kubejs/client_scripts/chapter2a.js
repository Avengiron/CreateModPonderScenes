onEvent("ponder.registry", event => {

	event.create("kubejs:factory2a", "kubejs:zinc_machine").tag("kubejs:main_quest")
	.scene("intro_2a", "Introduction au Chapitre 2A", "kubejs:ch2a_intro", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let depot = [1, 1, 1];
		let machine = [3, 1, 1, 3, 2, 1];
		let content = [
			[3, 1, 3], // Nullifier
			[2, 1, 3], // Casing
			[1, 1, 3], // Vacuumulator
			[2, 2, 3], // Igneous Extruder
			[2, 1, 2], // Depot
			[3, 1, 0], // Drawer
			[1, 1, 0]  // Torch
		];
		
		// Utilities
		let infMech = Item.of("kubejs:infernal_mechanism");
		let ReIC = Item.of("thermal:upgrade_augment_2");
		
		showText(scene, util, 240, "Chapitre 2A", [16], PonderPalette.WHITE, 20);
		showText(scene, util, 230, "L'Âge du Zinc", [32], PonderPalette.WHITE, 40);
		
		showSection(scene, util, depot, "DOWN", 20);
		showText(scene, util, 70,
			"Le but de ce chapitre est de produire des §6Infernal Mechanisms §fà partir de Precision Mechanisms",
			[1.5, 1 + 13 / 16.0, 1.5], PonderPalette.WHITE, 40);
		createItemOnBeltLike(scene, util, depot, "NORTH", infMech, 40);
		
		scene.addKeyframe();
		showSection(scene, util, machine, "DOWN", 20);
		showText(scene, util, 80,
			"À partir des §6Zinc Machines§f, on débloque les premières machines Thermal",
			[166], PonderPalette.WHITE, 40);
		showCompound(scene, util, content, "DOWN", 3, 0);
		createItemOnBeltLike(scene, util, [2, 1, 2], "NORTH", ReIC, 39);
		
		showText(scene, util, 80, "Ce chapitre est facultatif",
			[166], PonderPalette.OUTPUT, 80);
	})
	.scene("lava_prod", "Récolte de lave", "kubejs:ch2a_lavaprod", (scene, util) => {
		// Edit schematic : Cannon 'biomesoplenty:hellbark_leaves'
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let tree = util.select().fromTo(1, 6, 1, 3, 10, 3)
			.add(util.select().position(2, 5, 2));
		let leaves = [1, 3, 2, 1, 5, 2];
		let cannon = [4, 1, 0];
		let tank = [4, 1, 2, 4, 3, 2];
	
		// Utilities		
		let emptySchematic = Item.of("create:empty_schematic");
		let lavaB = Item.of("minecraft:lava_bucket");
		
		// Conditions initiales
		modifyTileNBT(scene, util, cannon, { Running: false }, 0);
		modifyTileNBT(scene, util, cannon, { FlyingBlocks: [new CompoundNBT()]}, 0);
		for(let x = 0; x <= 2; x++) 
			modifyBlock(scene, util, [x, 1, 2], "active", "false", 0); 
			
		// Faire apparaitre un arbre
		let treeIS = scene.world().showIndependentSection(tree, "DOWN");
		moveSection(scene, util, treeIS, [0, -4, 0], 0, 20);
		showText(scene, util, 60,
			"Enregistrer un schematic d'une feuille §anaturelle §favec Create", 
			[80], PonderPalette.WHITE, 30);
		showText(scene, util, 60,
			"L'arbre en question DOIT être un Hellbark, trouvable dans le Nether",
			[105], PonderPalette.RED, 80);
		
		// AABB d'une feuille
		let target = AABB.of(2, 3, 1, 3, 4, 2);
		chaseBoundingBoxOutline(scene, PonderPalette.WHITE, target, 110, 5);
		showText(scene, util, 50, "Propriété persistent:§cfalse",
			[2, 3.5, 2], PonderPalette.OUTPUT, 60);
		
		// Schematic
		scene.overlay().showControls(new PonderInput(util.vector().of(2, 3.5, 1.5), PonderPointing.LEFT).withItem(emptySchematic), 30);
		scene.idle(40);
		
		// Enlever l'arbre
		scene.world().hideIndependentSection(treeIS, "UP");
		scene.idle(30);
		
		// Dirt sous l'arbre
		scene.addKeyframe();
		for(let x = 2; x >= 0; x--) 
			replaceBlocks(scene, util, [x, 0, 3], "minecraft:dirt", true, 3);
		scene.idle(10);
		
		// Tronc custom
		for(let y = 1; y <= 3; y++) 
			for(let x = 2; x >= 0; x--) 
				showSection(scene, util, [y == 2 ? 2 - x : x, y, 3], "DOWN", 3);
		scene.idle(20);
		showText(scene, util, 60,
			"\"Fabriquer\" un arbre pour\nen extraire la lave",
			[0, 2.5, 3.5], PonderPalette.GREEN, 80);
		showSelectionWithText(scene, util, leaves, 60,
			"Les feuilles doivent être placées avec le Schematicannon",
			[1, 4.5, 3], PonderPalette.MEDIUM, 70);
		
		// Animation schematicannon
		scene.addKeyframe();
		showSection(scene, util, cannon, "DOWN", 20);
		
		for(let y = 3; y <= 5; y++) {
			restoreBlocks(scene, util, cannon, 20);
			showSection(scene, util, [1, y, 2], "DOWN", 0);
		}
		scene.idle(20);
		showText(scene, util, 60,
			"Ça permet de placer des feuilles naturelles là où on veut",
			[1, 4.5, 2.5], PonderPalette.GREEN, 70);
		hideSection(scene, util, cannon, "UP", 20);
		
		// Extractors
		scene.addKeyframe();
		for(let x = 0; x <= 2; x++) 
			showSection(scene, util, [x, 1, 2], "SOUTH", 3);
		scene.idle(20);
		
		for(let x = 0; x <= 2; x++) 
			modifyBlock(scene, util, [x, 1, 2], "active", "true", 3);
		showText(scene, util, 60,
			"Les Arboreal Extractors comprennent que c'est un arbre",
			[1.5, 1.5, 2], PonderPalette.GREEN, 70);
		
		// Recolte & Stockage
		showSection(scene, util, tank, "DOWN", 10);
		for(let x = 0; x <= 3; x++) 
			showSection(scene, util, [x, 2, 2], "DOWN", 3);
		scene.idle(20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(4, 3, 2), PonderPointing.DOWN).withItem(lavaB), 60);
		// scene.markAsFinished();
		for(let volume = 100; volume <= 8000; volume += 100) 
			modifyTileNBT(scene, util, [4, 1, 2], { TankContent:{ Amount: volume }}, 1);
	})
	.scene("vines_farm", "Ferme à Vines", "kubejs:ch2a_vinesfarm", (scene, util) => {
		scene.configureBasePlate(1, 0, 5);
		scene.setSceneOffsetY(-2);
		scene.scaleSceneView(.9);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let vinesFarm = [4, 1, 0, 5, 6, 2];
		let gShaft = [3, 6, 0, 3, 6, 3];
		let outFarm = [0, 5, 4, 1, 5, 4];
		let timer = [[1, 6, 4, 3, 6, 4], [1, 5, 2, 1, 6, 3]];
		
		let gCar = util.select().fromTo(3, 2, 3, 5, 5, 3)
			.add(util.select().position(3, 5, 4));

		// Utilities
		let tVine = Item.of("minecraft:twisting_vines", 6);
		let wVine = Item.of("minecraft:weeping_vines", 6);
		
		let smallStep = [0, 0, -.5];
		let largeStep = [0, 0, -1];
		let toBase = [0, 0, 3];
		
		// Conditions initiales
		multiplyKineticSpeed(scene, util, [3, 6, 4], -1, 0);
		
		hideSection(scene, util, [4, 0, 0, 4, 0, 2], "DOWN", 0);
		hideSection(scene, util, [5, 0, 0, 5, 0, 2], "DOWN", 20);
		replaceBlocks(scene, util, [4, 0, 0, 4, 0, 2], "minecraft:nether_bricks", false, 0);
		replaceBlocks(scene, util, [5, 0, 0, 5, 0, 2], "minecraft:nether_bricks", false, 0);
		showSection(scene, util, [4, 0, 0, 4, 0, 2], "DOWN", 0);
		showSection(scene, util, [5, 0, 0, 5, 0, 2], "DOWN", 0);
		showSection(scene, util, vinesFarm, "DOWN", 20);
		showText(scene, util, 60, "Ferme à Vines",
			[5, 3, 1.5], PonderPalette.WHITE, 70);
		
		showSection(scene, util, gShaft, "DOWN", 10);
		let carriage = scene.world().showIndependentSection(gCar, "DOWN");
		scene.idle(20);
		scene.overlay().showSelectionWithText(gCar, 60)
			.text("Récolte avec un\nGantry Carriage")
			.pointAt(util.vector().of(3, 3, 4))
			.placeNearTarget();
		scene.idle(70);
			
		showCompound(scene, util, timer, "DOWN", 0, 20);
		showText(scene, util, 60,
			"Logique qui inverse le sens de rotation, pour permettre les aller-retours du Carriage",
			[1, 6, 2], PonderPalette.WHITE, 70);
		
		// Aller (& recolte)
		scene.addKeyframe();
		moveSection(scene, util, carriage, smallStep, 15, 15);
		setBlock(scene, util, [4, 2, 2], "minecraft:air", true, 0);
		setBlock(scene, util, [5, 2, 2], "minecraft:air", true, 0);
		setBlock(scene, util, [4, 4, 2], "minecraft:air", true, 0);
		setBlock(scene, util, [5, 4, 2], "minecraft:air", true, 0);
		
		moveSection(scene, util, carriage, largeStep, 30, 30);
		setBlock(scene, util, [4, 2, 1], "minecraft:air", true, 0);
		setBlock(scene, util, [5, 2, 1], "minecraft:air", true, 0);
		setBlock(scene, util, [4, 4, 1], "minecraft:air", true, 0);
		setBlock(scene, util, [5, 4, 1], "minecraft:air", true, 0);
		
		moveSection(scene, util, carriage, largeStep, 30, 30);
		setBlock(scene, util, [4, 2, 0], "minecraft:air", true, 0);
		setBlock(scene, util, [5, 2, 0], "minecraft:air", true, 0);
		setBlock(scene, util, [4, 4, 0], "minecraft:air", true, 0);
		setBlock(scene, util, [5, 4, 0], "minecraft:air", true, 0);
		
		moveSection(scene, util, carriage, smallStep, 15, 25);
		
		// Changement de sens de rotation
		scene.addKeyframe();
		scene.idle(15);
		toggleRedstonePower(scene, util, [1, 6, 2, 1, 6, 4], 0);
		modifyBlock(scene, util, [1, 6, 3], "powering", "true", 0);
		indicateRedstone(scene, util, [1, 6, 3], 0);
		multiplyKineticSpeed(scene, util, [1, 6, 4, 3, 6, 4], -1, 0);
		multiplyKineticSpeed(scene, util, gShaft, -1, 20);
		
		// Retour
		moveSection(scene, util, carriage, toBase, 90, 30);
		hideCompound(scene, util, timer, "UP", 0, 30);
		showSection(scene, util, outFarm, "DOWN", 40);
		
		// Animation des storage interfaces
		scene.addKeyframe();
		modifyTileNBT(scene, util, [1, 5, 4], { Distance: 1 }, 0);
		modifyTileNBT(scene, util, [3, 5, 4], { Distance: 1 }, 0);
		modifyTileNBT(scene, util, [1, 5, 4], { Timer: 40 }, 0);
		modifyTileNBT(scene, util, [3, 5, 4], { Timer: 40 }, 15);
		
		// Sortie des vines
		flapFunnel(scene, util, [0, 5, 4], true, 0);
		let tVineItem = createItemEntity(scene, util, [0.75, 5, 4.5], [0,0,0], tVine, 16);
		flapFunnel(scene, util, [0, 5, 4], true, 0);
		let wVineItem = createItemEntity(scene, util, [0.75, 5, 4.5], [0,0,0], wVine, 16);
		
		modifyTileNBT(scene, util, [1, 5, 4], { Timer: 0 }, 0);
		modifyTileNBT(scene, util, [3, 5, 4], { Timer: 0 }, 20);
		
		showCompound(scene, util, timer, "DOWN", 0, 20);
		toggleRedstonePower(scene, util, [1, 6, 2, 1, 6, 4], 0);
		modifyBlock(scene, util, [1, 6, 3], "powering", "false", 0);
		indicateRedstone(scene, util, [1, 6, 3], 0);
		multiplyKineticSpeed(scene, util, [1, 6, 4, 3, 6, 4], -1, 0);
		multiplyKineticSpeed(scene, util, gShaft, -1, 0);
	})
	.scene("liquid_soul", "Production de Liquid Soul", "kubejs:ch2a_liquidsoul", (scene, util) => {
		// Edit schematic : Tank Amount 1
		//								: Basin out tank Amount 1
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let wvDepot = [2, 1, 1];
		let tvDepot = [3, 1, 1];
		let coalDepot = [4, 1, 1];
		let inResource = [[3, 2, 2], [2, 2, 2], [3, 2, 1], [2, 2, 1]];
		let barrels = [2, 2, 2, 3, 2, 2];
		let outFunnels = [2, 2, 1, 3, 2, 1];
		let bb = [1, 1, 1];
		let inFunnel = [1, 2, 0];
		let basin = [1, 2, 1];
		let mixer = [1, 4, 1];
		let arm = [2, 4, 1];
		let pump = [1, 2, 2];
		let lsTank = [1, 1, 3, 1, 4, 3];
		let redCtrl1 = [0, 1, 2, 0, 1, 3];
		let redCtrl2 = [2, 5, 1];

		// Utilities
		let wVine = Item.of("minecraft:weeping_vines");
		let tVine = Item.of("minecraft:twisting_vines");
		let coalBlock = Item.of("minecraft:coal_block");
		let lsBucket = Item.of("tconstruct:liquid_soul_bucket");
		let emptyStack = Item.getEmpty();

		// Conditions initiales
		modifyTileNBT(scene, util, basin, { OutputTanks: [{ Level: { Value: 0 }}]}, 0);
		
		// Placements des inputs & outputs
		for(let x = 4; x >= 2; x--) 
			showSection(scene, util, [x, 1, 1], "DOWN", 3);
		scene.idle(20);
		showSection(scene, util, bb, "DOWN", 3);
		showSection(scene, util, basin, "DOWN", 3);
		showSection(scene, util, inFunnel, "DOWN", 20);
		showText(scene, util, 60,
			"Pour faire de la Liquid Soul, on mélange les Vines dans un Basin §6chauffé",
			[1, 2.5, 1.5], PonderPalette.WHITE, 80);
		
		// Arm inputs & outputs
		scene.addKeyframe();
		let input1 = AABB.of(4, 1, 1, 5, 1 + 13 / 16.0, 2);
		let input2 = AABB.of(3, 1, 1, 4, 1 + 13 / 16.0, 2);
		let input3 = AABB.of(2, 1, 1, 3, 1 + 13 / 16.0, 2);
		let output1 = AABB.of(1, 2, 0.5, 2, 3, 1);
		let output2 = AABB.of(1, 1, 1, 2, 2, 2);
		chaseBoundingBoxOutline(scene, PonderPalette.INPUT, input1, 48, 5);
		chaseBoundingBoxOutline(scene, PonderPalette.INPUT, input2, 46, 5);
		chaseBoundingBoxOutline(scene, PonderPalette.INPUT, input3, 44, 10);
		chaseBoundingBoxOutline(scene, PonderPalette.OUTPUT, output1, 32, 5);
		chaseBoundingBoxOutline(scene, PonderPalette.OUTPUT, output2, 30, 15);
		showSection(scene, util, arm, "UP", 15);
		indicateSuccess(scene, util, arm, 20);
		
		// Arm animation, coal block to blaze burner
		scene.addKeyframe();
		hideSection(scene, util, inFunnel, "UP", 20);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(4, 1, 1), PonderPointing.DOWN).withItem(coalBlock), 30);
		scene.idle(20);
		createItemOnBeltLike(scene, util, coalDepot, "EAST", coalBlock, 20);
		
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_INPUT, emptyStack, 0, 32);
		removeItemsFromBelt(scene, util, coalDepot, 0);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_OUTPUTS, coalBlock, -1, 20);
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_OUTPUT, coalBlock, 0, 32);
		scene.world().modifyBlock(util.grid().at(1, 1, 1), s => s.with("blaze", "kindled"));
		instructArm(scene, util, arm, ATE.Phase.SEARCH_INPUTS, emptyStack, -1, 40);
		rotateCameraY(scene, 70, 35);
		
		// Arm animation, vines to basin
		scene.addKeyframe();
		showCompound(scene, util, inResource, "DOWN", 3, 0);
		showSection(scene, util, inFunnel, "DOWN", 20);
		createItemOnBeltLike(scene, util, tvDepot, "SOUTH", tVine, 10);
		createItemOnBeltLike(scene, util, wvDepot, "SOUTH", wVine, 20);
		
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_INPUT, emptyStack, 1, 32);
		removeItemsFromBelt(scene, util, tvDepot, 0);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_OUTPUTS, tVine, -1, 20);
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_OUTPUT, tVine, 1, 32);
		flapFunnel(scene, util, inFunnel, false, 0);
		createItemOnBeltLike(scene, util, basin, "DOWN", tVine, 0);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_INPUTS, emptyStack, -1, 20);
		
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_INPUT, emptyStack, 2, 32);
		removeItemsFromBelt(scene, util, wvDepot, 0);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_OUTPUTS, wVine, -1, 20);
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_OUTPUT, wVine, 1, 32);
		flapFunnel(scene, util, inFunnel, false, 0);
		createItemOnBeltLike(scene, util, basin, "DOWN", wVine, 0);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_INPUTS, emptyStack, -1, 20);
		rotateCameraY(scene, -90, 40);
		
		// Mixing
		scene.addKeyframe();
		showSection(scene, util, mixer, "DOWN", 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(1, 2, 1), PonderPointing.RIGHT).withItem(wVine), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(1, 2, 1), PonderPointing.LEFT).withItem(tVine), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(1, 1, 1), PonderPointing.UP).withItem(coalBlock), 30);
		scene.idle(40);
		
		modifyTileNBT(scene, util, mixer, { Running: true }, 80);
		modifyTileNBT(scene, util, basin, { 
			OutputTanks: [{ Level: { Value: 1 }}],
			InputItems: { Items: [new CompoundNBT()]}
		}, 0);
		
		// Sortie de la Liquid Soul
		scene.addKeyframe();
		showSection(scene, util, lsTank, "DOWN", 10);
		showSection(scene, util, pump, "DOWN", 30);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 4, 3), PonderPointing.DOWN).withItem(lsBucket), 60);
		for(let i = 1; i <= 32; i++) {
			let volTank = i * 1000;
			let levelBasin = 1 - i / 32.0;
			modifyTileNBT(scene, util, [1, 1, 3], { TankContent:{ Amount: volTank }}, 0);
			modifyTileNBT(scene, util, basin, {OutputTanks:[{ Level:{ Value: levelBasin }}]}, 3);
		}
		scene.idle(20);
		
		// Redstone control
		scene.addKeyframe();
		modifyBlock(scene, util, bb, "blaze", "smouldering", 0);
		createItemOnBeltLike(scene, util, coalDepot, "EAST", coalBlock, 10);
		showSection(scene, util, redCtrl1, "DOWN", 10);
		showSection(scene, util, redCtrl2, "DOWN", 20);
		showText(scene, util, 100,
			"Logique pour empêcher le Mechanical Arm de distribuer du fuel quand le Tank est plein",
			[2, 5, 2], PonderPalette.WHITE, 90);
	})
	.scene("infernal_part", "Production d'Infernal Mechanisms", "kubejs:ch2a_mechanism", (scene, util) => {
		scene.configureBasePlate(0, 0, 6);
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let inFunnel = [0, 2, 1];
		
		// Utilities
		let lavaB = Item.of("minecraft:lava_bucket");
		let lsBucket = Item.of("tconstruct:liquid_soul_bucket");
		let precMech = Item.of("create:precision_mechanism");
		let iInfMech = Item.of("kubejs:incomplete_infernal_mechanism");
		let infMech = Item.of("kubejs:infernal_mechanism");
		
		// Conditions initiales
		for(let x = 1; x <= 4; x++) 
			modifyTileNBT(scene, util, [x, 3, 1], { Tanks:[{ Level:{ Value: 0 }}]}, 0);
		
		// Apparition de tous les elements
		showSection(scene, util, [0, 1, 1, 5, 1, 1], "DOWN", 5);
		showSection(scene, util, [5, 2, 2], "DOWN", 5);
		showSection(scene, util, [0, 2, 2], "DOWN", 15);
		showSection(scene, util, [5, 2, 1], "DOWN", 5);
		showSection(scene, util, inFunnel, "DOWN", 15);
		for(let x = 1; x <= 4; x++) 
			showSection(scene, util, [x, 3, 1], "DOWN", 5);
		scene.idle(15);
		rotateCameraY(scene, 70, 35);
		
		// Liquid soul, lava, lava et lava dans les spouts
		scene.overlay().showControls(new PonderInput(util.vector().topOf(4, 3, 1), PonderPointing.DOWN).withItem(lsBucket), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 3, 1), PonderPointing.DOWN).withItem(lavaB), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 3, 1), PonderPointing.DOWN).withItem(lavaB), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 3, 1), PonderPointing.DOWN).withItem(lavaB), 30);
		scene.idle(30);
		
		for(let x = 4; x >= 1; x--) 
			modifyTileNBT(scene, util, [x, 3, 1], { Tanks:[{ Level:{ Value: 1 }}]}, 5);
		scene.idle(10);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(5, 2, 2), PonderPointing.DOWN).withItem(precMech), 30);
		scene.idle(40);
		
		// Sequenced Assembly de Precision Mechanism vers Infernal Mechanism
		scene.addKeyframe();
		let sequence = createItemOnBelt(scene, util, [5, 1, 1], "SOUTH", precMech, 30);
		
		modifyTileNBT(scene, util, [4, 3, 1], { ProcessingTicks: 20 }, 20);
		changeBeltItemTo(scene, sequence, iInfMech, 0);
		stallBeltItem(scene, sequence, false, 30);
		
		stallBeltItem(scene, sequence, true, 0);
		modifyTileNBT(scene, util, [3, 3, 1], { ProcessingTicks: 20 }, 0);
		for(let i = 0; i < 20; i++) 
			rotateCameraY(scene, -1, 1);
		stallBeltItem(scene, sequence, false, 0);
		for(let i = 0; i < 30; i++) 
			rotateCameraY(scene, -1, 1);
		stallBeltItem(scene, sequence, true, 0);
		modifyTileNBT(scene, util, [2, 3, 1], { ProcessingTicks: 20 }, 0);
		for(let i = 0; i < 20; i++) 
			rotateCameraY(scene, -1, 1);
		stallBeltItem(scene, sequence, false, 30);
		
		stallBeltItem(scene, sequence, true, 0);
		modifyTileNBT(scene, util, [1, 3, 1], { ProcessingTicks: 20 }, 20);
		changeBeltItemTo(scene, sequence, infMech, 0);
		stallBeltItem(scene, sequence, false, 30);
		
		removeItemsFromBelt(scene, util, [0, 1, 1], 0);
		flapFunnel(scene, util, inFunnel, false, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 2, 2), PonderPointing.DOWN).withItem(infMech), 30);
		scene.idle(40);
	})
	.scene("overview_2a", "Usine complète", "kubejs:ch2a_overview", (scene, util) => {
		scene.configureBasePlate(0, 0, 17);
		scene.scaleSceneView(0.5);
		scene.setSceneOffsetY(-3);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let tree1 = [12, 1, 10, 16, 7, 12];
		let tree2 = [ 7, 1, 10, 11, 7, 12];
		let tree3 = [ 3, 1, 10,  6, 7, 12];
		let lavaTank = [0, 3, 10, 2, 12, 12];
		let vinesFarm = [[9, 2, 6, 16, 8, 6], [9, 2, 8, 16, 8, 8]];
		let vfBelt =  [5, 3, 8, 8, 3, 9];
		let vfStock = [5, 4, 7, 6, 4, 7];
		let vfFunnels = [5, 4, 8, 6, 4, 8];
		let inResource = [[6, 4, 8], [5, 4, 8], [6, 4, 7], [5, 4, 7]];
		let vfGantry = [[5, 7, 7, 16, 9, 7], [8, 4, 6, 8, 6, 8]];
		let lsProd = [[4, 3, 5, 7, 6, 6], [6, 6, 7], 
			[5, 7, 6], [4, 3, 7, 4, 10, 8], [3, 3, 7]];
		let seqAssembly = [[0, 3, 0, 2, 7, 9], [3, 6, 8]];
		let addPower = [[0, 2, 8, 2, 2, 11], [3, 4, 6, 3, 6, 7]];
		
		// Utilities
		let precMech = Item.of("create:precision_mechanism");
		
		// Conditions initiales
		for(let x = 4; x <= 16; x++) {
			modifyBlock(scene, util, [x, 3, 10], "active", "false", 0);
			modifyBlock(scene, util, [x, 3, 12], "active", "false", 0);
		}
		modifyTileNBT(scene, util, [3, 5, 6], { Value: 0.16 }, 0);
		
		// Arbres et tank
		showSection(scene, util, tree1, "DOWN", 5);
		showSection(scene, util, tree2, "DOWN", 5);
		showSection(scene, util, tree3, "DOWN", 20);
		showSection(scene, util, lavaTank, "DOWN", 20);
		
		for(let x = 4; x <= 16; x++) {
			modifyBlock(scene, util, [x, 3, 10], "active", "true", 0);
			modifyBlock(scene, util, [x, 3, 12], "active", "true", 2);
		}
		
		// Infos sur la production de Lava
		rotateCameraY(scene, -110, 50);
		showSelectionWithText(scene, util, [9, 3, 10, 11, 7, 12], 60,
			"6 Extractors par \"arbre\"",
			[12, 5.5, 13], PonderPalette.WHITE, 70);
		
		rotateCameraY(scene, 110, 50);
		showText(scene, util, 160, "450mB de Lava toutes les 50 secondes",
			[40], PonderPalette.GREEN, 40);
		showText(scene, util, 100, "Peut être boosté par :",
			[69], PonderPalette.OUTPUT, 5);
		showText(scene, util, 100, "Phyto-Gro (x2)",
			[85], PonderPalette.OUTPUT, 5);
		showText(scene, util, 100,
			"Hardened Integral Component (x2) Reinforced Integral Component (x3) Resonant Integral Component (x4)",
			[101], PonderPalette.OUTPUT, 110);
		
		// Ferme a Vines
		scene.addKeyframe();
		showCompound(scene, util, vinesFarm, "DOWN", 0, 20);
		showText(scene, util, 60, "Ferme à Vines",
			[13, 5.5, 6], PonderPalette.WHITE, 70);
		
		showSection(scene, util, vfBelt, "DOWN", 20);
		showSection(scene, util, [7, 4, 7], "DOWN", 5);
		showSection(scene, util, [7, 4, 8], "DOWN", 20);
		showCompound(scene, util, inResource, "DOWN", 3, 30);
		showCompound(scene, util, vfGantry, "DOWN", 0, 20);
		rotateCameraY(scene, 70, 35);
		
		// Liquid Soul
		scene.addKeyframe();
		showCompound(scene, util, lsProd, "DOWN", 0, 20);
		showText(scene, util, 60, "Production de Liquid Soul",
			[4.5, 6.5, 6], PonderPalette.WHITE, 70);
		rotateCameraY(scene, 20, 20);
		
		// Ligne d'assemblage des Infernal Mechanisms
		scene.addKeyframe();
		showCompound(scene, util, seqAssembly, "SOUTH", 0, 20);		
		showText(scene, util, 60, "Ligne d'assemblage des\nInfernal Mechanisms",
			[2, 5.5, 4], PonderPalette.WHITE, 70);
		scene.overlay().showControls(new PonderInput(util.vector().of(2, 5.5, 7.5), PonderPointing.UP).withItem(precMech), 30);
		scene.idle(40);
		rotateCameraY(scene, -20, 20);
		
		// Infos finales
		scene.addKeyframe();
		showCompound(scene, util, addPower, "UP", 0, 20);
		
		// Stress Impact: 42.0x RPM
		let stressometer = AABB.of(3, 5, 6, 4, 6, 7);
		chaseBoundingBoxOutline(scene, PonderPalette.FAST, stressometer, 90, 0);
		showText(scene, util, 80, "Stress Impact:", [20], PonderPalette.WHITE, 10);
		showText(scene, util, 70, "42.0x RPM", [36], PonderPalette.FAST, 90);
		
		// Overview
		scene.addKeyframe();
		for(let i = 0; i < 70; i++) 
			rotateCameraY(scene, -1, 1);
	});
	
})
