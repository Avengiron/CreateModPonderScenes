onEvent("ponder.registry", event => {

	event.create("kubejs:factory1a", "kubejs:copper_machine").tag("kubejs:main_quest")
	.scene("intro_1a", "Introduction au Chapitre 1A", "kubejs:ch1a_intro", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let depot = [1, 1, 1];
		let machine = [3, 1, 1, 3, 2, 1];
		let content = [
			[0, 1, 4, 4, 1, 4], // Belt
			[4, 3, 4], // Spout
			[2, 3, 4], // Hose Pulley
			[0, 3, 4], // Spout
			[3, 1, 3], // Fluid Interface
			[2, 1, 3], // Casing
			[1, 1, 3], // Smart Pipe
			[2, 2, 3], // Drain
			[2, 1, 2], // Depot
			[3, 1, 0], // Aqueous Accumulator
			[1, 1, 0]  // Dynamo
		];
		
		// Utilities
		let sealedMech = Item.of("kubejs:sealed_mechanism");
		let HIC = Item.of("thermal:upgrade_augment_1");
		
		showText(scene, util, 240, "Chapitre 1A", [16], PonderPalette.WHITE, 20);
		showText(scene, util, 230, "L'Âge du Copper", [32], PonderPalette.RED, 40);
		
		showSection(scene, util, depot, "DOWN", 20);
		showText(scene, util, 70, 
			"Le but de ce chapitre est de produire des §6Sealed Mechanisms\n§fà partir de Kinetic Mechanisms", 
			[1.5, 1 + 13 / 16.0, 1.5], PonderPalette.WHITE, 40);
		createItemOnBeltLike(scene, util, depot, "NORTH", sealedMech, 40);
		
		scene.addKeyframe();
		showSection(scene, util, machine, "DOWN", 20);
		showText(scene, util, 80, 
			"À partir des §6Copper Machines§f, on débloque tout ce qui concerne\nles manipulations de fluides",
			[166], PonderPalette.WHITE, 40);
		showCompound(scene, util, content, "DOWN", 3, 0);
		createItemOnBeltLike(scene, util, [2, 1, 2], "NORTH", HIC, 27);
		
		showText(scene, util, 80, "Ce chapitre est facultatif",
			[166], PonderPalette.OUTPUT, 80);
	})
	.scene("resin_prod", "Récolte de résine", "kubejs:ch1a_resinprod", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let tree = util.select().fromTo(0, 6, 0, 4, 10, 4)
			.add(util.select().position(2, 5, 2));
		let leaves = [1, 3, 2, 1, 5, 2];
		let cannon = [4, 1, 0];
		let tank = [4, 1, 2, 4, 3, 2];
		
		// Utilities
		let emptySchematic = Item.of("create:empty_schematic");
		let resinB = Item.of("thermal:resin_bucket");
		
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
			"N'importe quel arbre de l'Overworld fait l'affaire",
			[105], PonderPalette.GREEN, 80);
		
		// AABB d'une feuille
		let target = AABB.of(1, 4, 0, 2, 5, 1);
		chaseBoundingBoxOutline(scene, PonderPalette.WHITE, target, 110, 5);
		showText(scene, util, 50, "Propriété persistent:§cfalse",
			[1, 4.5, 1], PonderPalette.OUTPUT, 60);
		
		// Schematic
		scene.overlay().showControls(new PonderInput(util.vector().of(1, 4.5, 0.5), PonderPointing.LEFT).withItem(emptySchematic), 30);
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
			"\"Fabriquer\" un arbre pour\nen extraire la résine",
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
		
		// scene.markAsFinished();
		scene.overlay().showControls(new PonderInput(util.vector().topOf(4, 3, 2), PonderPointing.DOWN).withItem(resinB), 60);
		for(let volume = 100; volume <= 8000; volume += 100) 
			modifyTileNBT(scene, util, [4, 1, 2], { TankContent:{ Amount: volume }}, 1);
	})
	.scene("rubber", "Fabrication de Rubber", "kubejs:ch1a_rubber", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let tank = [3, 1, 3, 3, 4, 3];
		let basin = [3, 2, 1];
		let press = [3, 4, 0];
		let pipes = [3, 3, 1, 3, 3, 2];
		let depot = [2, 1, 1];
		let ejector = [0, 1, 1];
		let inFunnel = [2, 2, 1];
		let barrel = [1, 2, 1];
		let outFunnel = [0, 2, 1];
		
		// Utilities
		let rubber  = Item.of("thermal:rubber");
		let cured   = Item.of("thermal:cured_rubber");     // Rubber x1 sur un depot
		let cured4  = Item.of("thermal:cured_rubber", 4);  // Rubber x2 sur un depot
		let cured16 = Item.of("thermal:cured_rubber", 16); // Rubber x3 sur un depot
		let cured64 = Item.of("thermal:cured_rubber", 64); // Rubber x4 sur un depot
		
		// Conditions initiales
		modifyTileNBT(scene, util, basin, { InputTanks: [{ TankContent: { Amount: 0 }}]}, 0);
		
		// Apparition tank, basin et pipes
		showSection(scene, util, tank, "DOWN", 10);
		showSection(scene, util, basin, "DOWN", 20);
		showSection(scene, util, pipes, "DOWN", 20);
		
		// Apparition depot et press
		restoreBlocks(scene, util, basin, 0);
		let pressIS = scene.world().showIndependentSection(util.select().position(3, 4, 0), "DOWN");
		moveSection(scene, util, pressIS, [0, 0, 1], 0, 3);
		showSection(scene, util, depot, "DOWN", 20);
		showText(scene, util, 60,
			"§dPressing §fde la Resin pour\nobtenir du Rubber",
			[3, 2.5, 1.5], PonderPalette.WHITE, 70);
		
		// Simulation process de production de rubber
		scene.addKeyframe();
		modifyTileNBT(scene, util, press, { Running: true }, 40);
		createItemOnBeltLike(scene, util, depot, "EAST", rubber, 20);
		
		// Bulk blast du rubber
		showSection(scene, util, [3, 1, 1], "WEST", 3);
		showSection(scene, util, [4, 1, 1], "WEST", 20);
		showText(scene, util, 60,
			"§cBulk Blast §fdu Rubber pour\nobtenir du Cured Rubber",
			[2.5, 1 + 13 / 16.0, 1.5], PonderPalette.WHITE, 70);
		
		// Transformation en cured rubber
		removeItemsFromBelt(scene, util, depot, 0);
		createItemOnBeltLike(scene, util, depot, "DOWN", cured, 0);
		setKineticSpeed(scene, util, [4, 1, 1], 0, 20);
		
		// Ejector
		scene.addKeyframe();
		showSection(scene, util, ejector, "DOWN", 20);
		showFilterSlotInput(scene, util, [0.8, 1 + 0.75, 1 + 0.5], 50, 10);
		
		showText(scene, util, 30, "Régler l'Ejector sur 64",
			[0.8, 1 + 13 / 16.0, 1 + 0.5], PonderPalette.WHITE, 0);
		scene.overlay().showControls(new PonderInput(util.vector().of(0.8, 1 + 13 / 16.0, 1 + 0.5), PonderPointing.RIGHT).withWrench().scroll(), 30);
		scene.idle(40);
		
		showSection(scene, util, inFunnel, "DOWN", 3);
		showSection(scene, util, barrel, "DOWN", 3);
		showSection(scene, util, outFunnel, "DOWN", 20);
		
		// Filtre du funnel
		rotateCameraY(scene, 90, 20);
		hideSection(scene, util, basin, "SOUTH", 3);
		hideSection(scene, util, pipes, "SOUTH", 20);
		
		showFilterSlotInput(scene, util, [2 + 0.6, 2 + 0.7, 1 + 0.5], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2 + 0.6, 2 + 0.7, 1 + 0.5), PonderPointing.RIGHT).rightClick().withItem(cured), 30);
		scene.idle(40);
		setFilterData(scene, util, inFunnel, FTE, cured, 10);
		
		removeItemsFromBelt(scene, util, depot, 0);
		flapFunnel(scene, util, inFunnel, false, 20);
		
		rotateCameraY(scene, -90, 40);
		showSection(scene, util, basin, "NORTH", 3);
		showSection(scene, util, pipes, "NORTH", 20);
		
		// Simulation ejector
		scene.addKeyframe();
		createItemOnBeltLike(scene, util, ejector, "EAST", cured, 20);
		removeItemsFromBelt(scene, util, ejector, 0);
		createItemOnBeltLike(scene, util, ejector, "DOWN", cured4, 20);
		removeItemsFromBelt(scene, util, ejector, 0);
		createItemOnBeltLike(scene, util, ejector, "DOWN", cured16, 20);
		removeItemsFromBelt(scene, util, ejector, 0);
		createItemOnBeltLike(scene, util, ejector, "DOWN", cured64, 20);
	})
	.scene("sealed_part", "Production de Sealed Mechanisms", "kubejs:ch1a_mechanism", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let inFunnel = [0, 2, 1];
		
		// Utilities
		let cured = Item.of("thermal:cured_rubber");
		let glue = Item.of("create:super_glue");
		let kinMech = Item.of("kubejs:kinetic_mechanism");
		let iSealedMech = Item.of("kubejs:incomplete_sealed_mechanism");
		let sealedMech = Item.of("kubejs:sealed_mechanism");
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
		showSection(scene, util, [2, 4, 1], "DOWN", 5);
		showSection(scene, util, [3, 4, 1], "DOWN", 20);
		rotateCameraY(scene, 70, 35);
		
		scene.addKeyframe();
		showSelectionWithText(scene, util, [2, 4, 1, 3, 4, 1], 60, "Arrivée du Rubber",
			[2, 4.5, 1], PonderPalette.GREEN, 70);
		
		// Cured rubber, Cured rubber et Super glue dans les deployers
		scene.overlay().showControls(new PonderInput(util.vector().of(3.5, 4, 1), PonderPointing.DOWN).withItem(cured), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().of(2.5, 4, 1), PonderPointing.DOWN).withItem(cured), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().of(1.5, 4, 1), PonderPointing.DOWN).withItem(glue), 30);
		scene.idle(30);
		
		modifyTileNBT(scene, util, [3, 3, 1], { HeldItem: cured }, 5);
		modifyTileNBT(scene, util, [2, 3, 1], { HeldItem: cured }, 5);
		modifyTileNBT(scene, util, [1, 3, 1], { HeldItem: glue }, 15);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(4, 2, 2), PonderPointing.DOWN).withItem(kinMech), 30);
		scene.idle(40);
		
		// Sequenced Assembly de la slab vers les Kinetic Mechanism
		scene.addKeyframe();
		let sequence = createItemOnBelt(scene, util, [4, 1, 1], "SOUTH", kinMech, 30);
		
		moveDeployer(scene, util, [3, 3, 1], 1, 19, 20);
		changeBeltItemTo(scene, sequence, iSealedMech, 0);
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
		
		changeBeltItemTo(scene, sequence, sealedMech, 0);
		stallBeltItem(scene, sequence, false, 0);
		moveDeployer(scene, util, [1, 3, 1], -1, 19, 20);
		
		removeItemsFromBelt(scene, util, [0, 1, 1], 0);
		flapFunnel(scene, util, inFunnel, false, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 2, 2), PonderPointing.DOWN).withItem(sealedMech), 30);
		scene.idle(40);
		
		// Attention, recette perso
		scene.addKeyframe();
		showText(scene, util, 150, "ATTENTION: ", [60], PonderPalette.RED, 10);
		showText(scene, util, 150,
			"La ligne d'assemblage des Sealed Mechanisms n'est pas une recette activée par défaut",
			[76], PonderPalette.OUTPUT, 10);
		showText(scene, util, 150,
			"Elle a été activée depuis les fichiers du jeu",
			[110], PonderPalette.OUTPUT, 140);
	})
	.scene("overview_1a", "Usine complète", "kubejs:ch1a_overview", (scene, util) => {
		// Edit schematic ejector et depot
		replaceBlocks(scene, util, [4, 2, 9], "minecraft:air", false,  0);
		scene.configureBasePlate(0, 0, 19);
		scene.scaleSceneView(0.5);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let tree1 = [1, 1, 8, 5, 7, 10];
		let tree2 = [6, 1, 8, 10, 7, 10];
		let tree3 = [11, 1, 8, 14, 7, 10];
		let tank = [15, 3, 8, 17, 8, 10];
		let rubberProd = [[13, 2, 3, 18, 6, 7], [15, 2, 8, 16, 2, 9]];
		let seqAssembly = [[1, 3, 1, 1, 7, 6], [0, 1, 6, 0, 6, 9]];
		
		// Utilities
		let kinMech = Item.of("kubejs:kinetic_mechanism");
		
		// Conditions initiales
		for(let x = 1; x <= 13; x++) {
			modifyBlock(scene, util, [x, 3, 8], "active", "false", 0);
			modifyBlock(scene, util, [x, 3, 10], "active", "false", 0);
		}
		modifyTileNBT(scene, util, [1, 6, 2], { Value: 0.23 }, 0);
		
		// Arbres et tank
		showSection(scene, util, tank, "DOWN", 20);
		showSection(scene, util, tree3, "DOWN", 5);
		showSection(scene, util, tree2, "DOWN", 5);
		showSection(scene, util, tree1, "DOWN", 20);
		
		for(let x = 1; x <= 13; x++) {
			modifyBlock(scene, util, [x, 3, 8], "active", "true", 0);
			modifyBlock(scene, util, [x, 3, 10], "active", "true", 2);
		}
		
		// Infos sur la production de Resin
		rotateCameraY(scene, -110, 50);
		scene.addKeyframe();
		showSelectionWithText(scene, util, [1, 3, 8, 3, 7, 10], 60,
			"6 Extractors par \"arbre\"",
			[4, 5, 11], PonderPalette.WHITE, 70);
		
		rotateCameraY(scene, 110, 50);
		showText(scene, util, 160, "450mB de Resin toutes les 50 secondes",
			[40], PonderPalette.GREEN, 40);
		showText(scene, util, 100, "Peut être boosté par :",
			[69], PonderPalette.OUTPUT, 5);
		showText(scene, util, 100, "Phyto-Gro (x2)",
			[85], PonderPalette.OUTPUT, 5);
		showText(scene, util, 100,
			"Hardened Integral Component (x2) Reinforced Integral Component (x3) Resonant Integral Component (x4)",
			[101], PonderPalette.OUTPUT, 110);
		
		// Production de Cured Rubber
		scene.addKeyframe();
		showCompound(scene, util, rubberProd, "DOWN", 0, 20);
		showText(scene, util, 60,
			"Deux lignes de production\nde Cured Rubber",
			[16, 4.5, 5], PonderPalette.WHITE, 70);
			
		rotateCameraY(scene, 90, 40);
		
		// Ligne d'assemblage
		scene.addKeyframe();
		showCompound(scene, util, seqAssembly, "SOUTH", 0, 20);
		showText(scene, util, 60,
			"Ligne d'assemblage des\nSealed Mechanisms",
			[50], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(2, 5, 6.5), PonderPointing.UP).withItem(kinMech), 30);
		scene.idle(50);
		
		// Stress Impact: 60.0x RPM
		scene.addKeyframe();
		let stressometer = AABB.of(1, 6, 2, 2, 7, 3);
		chaseBoundingBoxOutline(scene, PonderPalette.FAST, stressometer, 90, 0);
		showText(scene, util, 80, "Stress Impact:", [20], PonderPalette.WHITE, 10);
		showText(scene, util, 70, "60.0x RPM", [36], PonderPalette.FAST, 90);
		
		// Overview
		scene.addKeyframe();
		for(let i = 0; i < 90; i++) 
			rotateCameraY(scene, -1, 1);
	});
	
})
