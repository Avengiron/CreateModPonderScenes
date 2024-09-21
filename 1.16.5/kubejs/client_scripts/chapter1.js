onEvent("ponder.registry", event => {
	
	event.create("kubejs:factory1", "kubejs:andesite_machine").tag("kubejs:main_quest")
	.scene("intro_1", "Introduction au Chapitre 1", "kubejs:ch1_intro", (scene, util) => {
		setBlock(scene, util, [2, 0, 2], "minecraft:gray_concrete", false, 0);
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let depot = [1, 1, 1];
		let machine = [3, 1, 1, 3, 2, 1];
		let content = [
			[4, 3, 4], // Mixer
			[2, 3, 4], // Interface
			[0, 3, 4], // Press
			[3, 1, 3], // Saw
			[2, 1, 3], // Casing
			[1, 1, 3], // Fan
			[2, 2, 3], // Deployer
			[2, 1, 2], // Drill
			[3, 1, 0], // Harvester
			[1, 1, 0]  // Funnel
		];
		
		// Utilities
		let kinMech = Item.of("kubejs:kinetic_mechanism");
		
		showText(scene, util, 340, "Chapitre 1", [16], PonderPalette.WHITE, 20);
		showText(scene, util, 330, "L'Âge de l'Andesite", [32], PonderPalette.BLACK, 40);
		
		showSection(scene, util, depot, "DOWN", 20);
		showText(scene, util, 70, 
			"Le but de ce chapitre est de produire des §6Kinetic Mechanisms", 
			[1.5, 1 + 13 / 16.0, 1.5], PonderPalette.WHITE, 40);
		createItemOnBeltLike(scene, util, depot, "NORTH", kinMech, 40);
				
		scene.addKeyframe();
		showSection(scene, util, machine, "DOWN", 20);
		showText(scene, util, 80, 
			"À partir des §6Andesite Machines§f,\non débloque les composants\nde base de Create",
			[166], PonderPalette.WHITE, 40);
		showCompound(scene, util, content, "DOWN", 3, 30);
		
		showText(scene, util, 80,
			"Ces Mechanisms sont aussi la\nbase des chapitres 1A et 2",
			[166], PonderPalette.GREEN, 80);	
	})
	.scene("kelp_part", "Ferme à Kelp", "kubejs:ch1_kelpfarm", (scene, util) => {
		scene.configureBasePlate(1, 1, 5);
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let kelpFarm = [4, 1, 1, 5, 3, 3];
		let farmOuter = [[4, 2, 0, 5, 3, 0], [6, 2, 1, 6, 3, 3],
			[4, 2, 4, 5, 3, 4],[3, 2, 1, 3, 3, 3]];
		let outFarm = [0, 4, 5, 1, 4, 5];
		let redstoneCtrl = [1, 1, 3, 2, 1, 3];
		
		// Utilities
		let toFirst = [0, 0, -1.5];
		let toNext = [0, 0, -1];
		let toEnd = [0, 0, -.5];
		let toBase = [0, 0, 4];
		
		let kelp = Item.of("minecraft:kelp", 6);
		
		// Kelp farm
		showSection(scene, util, kelpFarm, "DOWN", 0);
		showCompound(scene, util, farmOuter, "DOWN", 0, 40);
		
		// Disparition des bords pour la visibilite
		hideCompound(scene, util, farmOuter, "DOWN", 0, 20);
		showText(scene, util, 50, "Ferme à Kelp",
			[5, 4, 2.5], PonderPalette.WHITE, 60);
		showText(scene, util, 60,
			"Rich Soil pour booster\nla croissance du Kelp",
			[5, 1.5, 1], PonderPalette.GREEN, 70);
		
		// Apparition des rails, du cart assembler et de la redstone
		scene.addKeyframe();
		for(let z = 1; z < 5; z++) 
			showSection(scene, util, [3, 1, z], "DOWN", 3);
		let assembler = scene.world().showIndependentSection(util.select().position(1, 1, 5), "DOWN");
		moveSection(scene, util, assembler, [2, 0, 0], 0, 12);
		showSection(scene, util, redstoneCtrl, "DOWN", 20);
		
		// Apparition du cart contraption
		let contraption = scene.world().showIndependentSection(util.select().fromTo(3, 2, 5, 5, 4, 5), "DOWN");
		scene.idle(20);
		
		let contraptionBounds = AABB.of(3, 1, 5, 6, 5, 6);
		chaseBoundingBoxOutline(scene, PonderPalette.GREEN, contraptionBounds, 60, 0);
		showText(scene, util, 60, "La récolte se fait avec\nun Minecart Contraption",
			[3, 3, 6], PonderPalette.WHITE, 80);
		
		// Config du cart assembler
		scene.addKeyframe();
		rotateCameraY(scene, -20, 20);
		showScrollInput(scene, util, [3-1/8.0, 1+0.5, 5+0.5], "EAST", 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(3 - 1 / 8.0, 1 + 0.5, 5 + 0.5), PonderPointing.LEFT).withWrench().showing(AllIcons.I_CART_ROTATE_LOCKED), 30);
		scene.idle(50);
		rotateCameraY(scene, 20, 20);
		
		// Activation des rails
		toggleRedstonePower(scene, util, redstoneCtrl, 0);
		toggleRedstonePower(scene, util, [3, 1, 1, 3, 1, 5], 0);
		indicateRedstone(scene, util, [1, 1, 3], 20);
		
		// Simulation de l'assemblage du cart contraption
		let cartHandle = scene.special().createCart(util.vector().topOf(3, 0, 5), 90, (w, x, y, z) => new Minecart(w, x, y, z));
		scene.idle(5);
		showSection(scene, util, [2, 1, 5], "NORTH", 15);
		toggleRedstonePower(scene, util, [1, 1, 5, 2, 1, 5], 0);
		indicateRedstone(scene, util, [2, 1, 5], 0);
		let cartAnchor = scene.world().showIndependentSectionImmediately(util.select().position(5, 1, 5));
		moveSection(scene, util, cartAnchor, [-2, 0, 0], 0, 5);
		
		// Aller (& recolte)
		scene.addKeyframe();
		scene.special().moveCart(cartHandle, toFirst, 15);
		moveSection(scene, util, cartAnchor, toFirst, 15, 0);
		moveSection(scene, util, contraption, toFirst, 15, 15);
		setBlock(scene, util, [4, 3, 3], "minecraft:water", true, 0);
		setBlock(scene, util, [5, 3, 3], "minecraft:water", true, 0);
		
		scene.special().moveCart(cartHandle, toNext, 10);
		moveSection(scene, util, cartAnchor, toNext, 10, 0);
		moveSection(scene, util, contraption, toNext, 10, 10);
		setBlock(scene, util, [4, 3, 2], "minecraft:water", true, 0);
		setBlock(scene, util, [5, 3, 2], "minecraft:water", true, 0);
		
		scene.special().moveCart(cartHandle, toNext, 10);
		moveSection(scene, util, cartAnchor, toNext, 10, 0);
		moveSection(scene, util, contraption, toNext, 10, 10);
		setBlock(scene, util, [4, 3, 1], "minecraft:water", true, 0);
		setBlock(scene, util, [5, 3, 1], "minecraft:water", true, 0);
		
		scene.special().moveCart(cartHandle, toEnd, 5);
		moveSection(scene, util, cartAnchor, toEnd, 5, 0);
		moveSection(scene, util, contraption, toEnd, 5, 15);
		
		// Apparition de la sortie de la ferme, disparition du cart assembler
		let addRail = scene.world().showIndependentSectionImmediately(util.select().position(1, 1, 1));
		hideSection(scene, util, [2, 1, 5], "SOUTH", 0);
		scene.world().hideIndependentSection(assembler, "SOUTH");
		toggleRedstonePower(scene, util, [1, 1, 1], 0);
		moveSection(scene, util, addRail, [2, 0, 4], 0, 0);
		showSection(scene, util, outFarm, "DOWN", 5);
		
		// Retour
		scene.special().moveCart(cartHandle, toBase, 40);
		moveSection(scene, util, cartAnchor, toBase, 40, 0);
		moveSection(scene, util, contraption, toBase, 40, 45);
		
		// Animation des storage interfaces
		modifyTileNBT(scene, util, [1, 4, 5], { Distance: 1 }, 0);
		modifyTileNBT(scene, util, [3, 4, 5], { Distance: 1 }, 0);
		modifyTileNBT(scene, util, [1, 4, 5], { Timer: 40 }, 0);
		modifyTileNBT(scene, util, [3, 4, 5], { Timer: 40 }, 15);
		
		// Sortie du Kelp
		flapFunnel(scene, util, [0, 4, 5], true, 0);
		let kelpItem = createItemEntity(scene, util, [0.75, 4, 5.5], [0, 0, 0], kelp, 15);
		
		modifyTileNBT(scene, util, [1, 4, 5], { Timer: 0 }, 0);
		modifyTileNBT(scene, util, [3, 4, 5], { Timer: 0 }, 15);
		
		// On remet les bords pour la vue finale
		showCompound(scene, util, farmOuter, "UP", 0, 0);
	})
	.scene("algalblend_part", "Production d'Algal Blend", "kubejs:ch1_blendgen", (scene, util) => {
		setBlock(scene, util, [2, 0, 2], "minecraft:gray_concrete", false, 0);
		replaceBlocks(scene, util, [3, 0, 1], "minecraft:gray_concrete", false, 0);
		
		scene.setSceneOffsetY(-3);
		scene.scaleSceneView(.8);
		scene.showBasePlate();
		scene.idle(20);
			
		// Sections & Positions
		let cobbleGen = [2, 8, 1];
		let waterGen = [2, 8, 2];
		let lavaGen = [1, 8, 1];
		let sandGen = [[2, 7, 1],
			[1, 6, 1, 3, 6, 1], [2, 5, 1], 
			[1, 4, 1, 3, 4, 1], [2, 3, 1]];
		let sandBelt = [[1, 2, 1, 2, 2, 1], [3, 2, 1, 3, 2, 2]];
		let flintBin = [3, 0, 1, 3, 1, 1];
		let sandFunnel = [3, 3, 2];
		let sandLift = [2, 2, 2, 2, 6, 2];
		let clayWash = [2, 9, 2];
		let clayFunnel = [2, 7, 2];
		let kelpFunnel = [1, 7, 3];
		let algalMixer = [[2, 7, 3], [2, 9, 3]];
		let belt = [0, 6, 3, 4, 6, 3];
		
		// Utilities
		let waterB = Item.of("minecraft:water_bucket");
		let lavaB = Item.of("minecraft:lava_bucket");
		let cobble = Item.of("minecraft:cobblestone");
		let gravel = Item.of("minecraft:gravel");
		let sand = Item.of("minecraft:sand");
		let clay = Item.of("minecraft:clay_ball");
		let flint = Item.of("minecraft:flint");
		let kelp = Item.of("minecraft:kelp");
		let algalBlend = Item.of("architects_palette:algal_blend");
			
		// Conditions initiales
		setKineticSpeed(scene, util, clayWash, 0, 0);
		setKineticSpeed(scene, util, [1,4,1, 3,6,1], 0, 0);
		
		// Generation de cobble
		showSection(scene, util, cobbleGen, "DOWN", 20);
		showText(scene, util, 60,
			"Igneous Extruder pour\ngénérer de la Cobblestone",
			[2.5, 8.5, 1.5], PonderPalette.WHITE, 70);	
		
		showSection(scene, util, waterGen, "DOWN", 10);
		showSection(scene, util, lavaGen, "DOWN", 10);
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(2, 8, 2), PonderPointing.RIGHT).withItem(waterB), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(1, 8, 1), PonderPointing.LEFT).withItem(lavaB), 30);
		scene.idle(40);
		modifyBlock(scene, util, [2, 8, 1], "active", "true", 0);
		
		// Crushers
		scene.addKeyframe();
		showCompound(scene, util, sandGen, "SOUTH", 3, 30);
		showText(scene, util, 60,
			"Deux séries de crushers pour transformer la Cobble en Sand",
			[2.5, 5.5, 1], PonderPalette.WHITE, 70);
		restoreBlocks(scene, util, [1,4,1, 3,6,1],  40);
		
		// Affichage de l'avancement du process
		scene.overlay().showControls(new PonderInput(util.vector().of(2, 7.5, 1), PonderPointing.LEFT).withItem(cobble), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2, 5.5, 1), PonderPointing.LEFT).withItem(gravel), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2, 3.5, 1), PonderPointing.LEFT).withItem(sand), 30);
		scene.idle(40);
		 
		scene.addKeyframe();
		rotateCameraY(scene, 70, 35);
		
		// Acheminement des ressouces en sortie de crushers
		showCompound(scene, util, sandBelt, "UP", 3, 0);
		showSection(scene, util, flintBin, "UP", 20);
		
		// On retire les crushers pour la visibilite
		hideSection(scene, util, cobbleGen, "NORTH", 3);
		hideSection(scene, util, lavaGen, "NORTH", 3);
		hideCompound(scene, util, sandGen, "NORTH", 3, 20);
		
		// Apparition de l'ascenseur
		showSection(scene, util, sandLift, "DOWN", 3);
		showSection(scene, util, sandFunnel, "DOWN", 20);
		
		// Process clay
		indicateSuccess(scene, util, [2, 2, 1], 0);
		createItemOnBeltLike(scene, util, [2, 2, 1], "DOWN", clay, 80);
		flapFunnel(scene, util, sandFunnel, false, 0);
		removeItemsFromBelt(scene, util, [3, 2, 2], 10);
		showText(scene, util, 60,
			"On garde la Clay qu'on obtient\nlors de la production de Sand",
			[3.5, 3.5, 2.5], PonderPalette.GREEN, 70);
		
		// On retire un bout de la base pour voir le nullifier
		restoreBlocks(scene, util, [3, 0, 1], 0);
		hideSection(scene, util, [3, 0, 0], "DOWN", 3);
		hideSection(scene, util, [4, 0, 0], "DOWN", 3);
		hideSection(scene, util, [4, 0, 1], "DOWN", 20);
		
		// Config de la smart chute
		showFilterSlotInput(scene, util, [3+0.5, 1+0.75, 1], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(3+0.5, 1+0.75, 1), PonderPointing.LEFT).rightClick().withItem(flint), 30);
		scene.idle(40);
		setFilterData(scene, util, [3, 1, 1], SCTE, flint, 10);
		
		// Process flint
		indicateSuccess(scene, util, [2, 2, 1], 0);
		createItemOnBeltLike(scene, util, [2, 2, 1], "DOWN", flint, 32);
		removeItemsFromBelt(scene, util, [3, 2, 1], 10);
		showText(scene, util, 40, "On jette le Flint", 
			[3.5, 0.5, 1], PonderPalette.RED, 50);
		
		// Visibilite de l'ascenseur
		scene.addKeyframe();
		indicateSuccess(scene, util, [2, 2, 1], 0);
		createItemOnBeltLike(scene, util, [2, 2, 1], "DOWN", sand, 40);
		for(let y = 3; y <= 5; y++) 
			modifyBlock(scene, util, [2, y, 2], "shape", "window", 3);
		scene.idle(10);
		hideSection(scene, util, flintBin, "DOWN", 8);
		
		// On remet la base
		showSection(scene, util, [3, 0, 0], "UP", 3);
		showSection(scene, util, [4, 0, 0], "UP", 3);
		showSection(scene, util, [4, 0, 1], "UP", 3);
		setBlock(scene, util, [3, 0, 1], "minecraft:gray_concrete", false, 0);
		showSection(scene, util, [3, 0, 1], "UP", 4);
		
		// Process sand
		flapFunnel(scene, util, sandFunnel, false, 0);
		removeItemsFromBelt(scene, util, [3, 2, 2], 0);
		createItemOnBeltLike(scene, util, [2, 3, 2], "UP", sand, 0);
		
		// Travelling pendant le process du sand
		for(let i = 0; i < 35; i++) 
			rotateCameraY(scene, -2, 1);
		hideCompound(scene, util, sandBelt, "DOWN", 3, 0);
		hideSection(scene, util, sandFunnel, "DOWN", 0);
		showText(scene, util, 60,
			"Le Sand est remonté via un ascenseur à ventilateur",
			[2, 4.5, 2], PonderPalette.WHITE, 70);
		
		// Bulk Wash du sand
		scene.addKeyframe();
		hideSection(scene, util, [2,2,2, 2,5,2], "NORTH", 20);
		showSection(scene, util, clayWash, "DOWN", 20);
		showText(scene, util, 60,
			"§9Bulk Wash §fdu Sand pour\nobtenir de la Clay",
			[2.5, 6+13/16.0, 2.5], PonderPalette.WHITE, 50);
		setKineticSpeed(scene, util, clayWash, -16, 20);
		
		// Transformation en clay
		removeItemsFromBelt(scene, util, [2, 6, 2], 0);
		createItemOnBeltLike(scene, util, [2, 6, 2], "DOWN", clay, 20);
		setKineticSpeed(scene, util, clayWash, 0, 20);
		hideSection(scene, util, clayWash, "UP", 0);
		hideSection(scene, util, waterGen, "UP", 20);
		
		// Apparition du mixer et acheminement des ingredients
		scene.addKeyframe();
		showSection(scene, util, belt, "UP", 3);
		showCompound(scene, util, algalMixer, "DOWN", 3, 0);
		showSection(scene, util, kelpFunnel, "EAST", 3);
		showSection(scene, util, clayFunnel, "SOUTH", 40);
		
		// Config du funnel pour n'accepter que la clay
		showFilterSlotInput(scene, util, [2+0.5, 7+0.7, 2+0.4], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2+0.5, 7+0.7, 2+0.4), PonderPointing.RIGHT).rightClick().withItem(clay), 30);
		scene.idle(40);
		setFilterData(scene, util, clayFunnel, FTE, clay, 10);
		
		// Entree des ingredients dans le basin
		indicateSuccess(scene, util, [0, 6, 3], 0);
		createItemOnBeltLike(scene, util, [0, 6, 3], "DOWN", kelp, 40);
		flapFunnel(scene, util, kelpFunnel, false, 0);
		flapFunnel(scene, util, clayFunnel, false, 0);
		removeItemsFromBelt(scene, util, [1, 6, 3], 0);
		removeItemsFromBelt(scene, util, [2, 6, 2], 0);
		createItemOnBeltLike(scene, util, [2, 7, 3], "UP", kelp, 0);
		createItemOnBeltLike(scene, util, [2, 7, 3], "UP", clay, 20);
			
		rotateCameraY(scene, 70, 35);
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(2, 7, 3), PonderPointing.RIGHT).withItem("minecraft:kelp"), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(2, 7, 3), PonderPointing.LEFT).withItem("minecraft:clay_ball"), 30);
		scene.idle(40);
		
		// Mixing
		modifyTileNBT(scene, util, [2, 9, 3], { Running: true }, 80);
		
		// Sortie du basin
		restoreBlocks(scene, util, [2, 7, 3], 0);
		let abLink = createItemOnBelt(scene, util, [3, 6, 3], "DOWN", algalBlend, 32);
		stallBeltItem(scene, abLink, true, 20);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(4, 6, 3), PonderPointing.DOWN).withItem(algalBlend), 30);
		scene.idle(40);
		
		// Overview
		scene.addKeyframe();
		setKineticSpeed(scene, util, clayWash, -16, 0);
		showSection(scene, util, flintBin, "UP", 5);
		showCompound(scene, util, sandBelt, "UP", 5, 0);
		showSection(scene, util, [2,2,2, 2,5,2], "NORTH", 5);
		showSection(scene, util, sandFunnel, "NORTH", 5);
		showSection(scene, util, cobbleGen, "DOWN", 5);
		showSection(scene, util, lavaGen, "DOWN", 5);
		showSection(scene, util, waterGen, "DOWN", 5);
		showSection(scene, util, clayWash, "DOWN", 5);
		showCompound(scene, util, sandGen, "SOUTH", 5, 0);
		
		// Travelling global
		for(let i = 0; i < 170; i++)
			rotateCameraY(scene, -2, 1);
	})
	.scene("andesite_part", "Production et remontée d'Andesite Cobblestone", "kubejs:ch1_andesitefarm", (scene, util) => {
		replaceBlocks(scene, util, [1, 0, 2], "minecraft:cyan_terracotta", false, 0);
		replaceBlocks(scene, util, [3, 0, 2], "minecraft:cyan_terracotta", false, 0);
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let bedrock = [3, 0, 2];
		let andesiteGen = [3, 1, 2];
		let lava = [2, 1, 2];
		let packedIce = [4, 1, 2];
		let pullLift = [3, 2, 2, 3, 3, 2];
		let pushLift = [1, 1, 2, 1, 4, 2];
		let belt = [1, 1, 1, 3, 1, 1];
		let funnelIn = [1, 2, 1];
		let funnelOut = [3, 2, 1];
		
		// Utilities
		let aCobble = Item.of("create:andesite_cobblestone");
			
		// Bedrock
		replaceBlocks(scene, util, bedrock, "minecraft:bedrock", true, 20);
		showText(scene, util, 60,
			"La génération d'Andesite Cobblestone doit se faire\nau niveau de la §7Bedrock",
			[3.5, 1, 2.5], PonderPalette.RED, 70);
		
		// Generation d'andesite cobblestone
		showSection(scene, util, andesiteGen, "DOWN", 20);
		showSection(scene, util, lava, "DOWN", 3);
		showSection(scene, util, packedIce, "DOWN", 20);
		showText(scene, util, 100,
			"L'Igneous Extruder doit\nêtre adjacent à de la §cLave\n§fet à de la §bPacked Ice",
			[3.5, 1.5, 2.5], PonderPalette.WHITE, 110);
		modifyBlock(scene, util, andesiteGen, "active", "true", 0);
		
		// Transport vertical 1
		scene.addKeyframe();
		showSection(scene, util, pullLift, "DOWN", 20);
		
		// Visibilite de la chute
		modifyBlock(scene, util, [3, 2, 2], "shape", "window", 0);
		rotateCameraY(scene, 20, 20);
		createItemOnBeltLike(scene, util, [3, 2, 2], "UP", aCobble, 10);
		showText(scene, util, 100,
			"Les blocs sont d'abord sortis avec un ascenseur à ventilateur…\n§7Mode PULL",
			[3.5, 2.5, 2.5], PonderPalette.WHITE, 110);
		modifyBlock(scene, util, [3, 2, 2], "shape", "normal", 0);
		rotateCameraY(scene, -20, 20);
		
		// Transport vers l'autre ascenseur
		showSection(scene, util, belt, "UP", 10);
		showSection(scene, util, funnelOut, "DOWN", 20);
		
		removeItemsFromBelt(scene, util, [3, 2, 2], 0);
		createItemOnBeltLike(scene, util, [3, 1, 1], "DOWN", aCobble, 60);
		
		// Apparition de l'autre ascenseur
		scene.addKeyframe();
		showSection(scene, util, pushLift, "DOWN", 10);
		showSection(scene, util, funnelIn, "DOWN", 50);
		
		// Transport vertical 2
		removeItemsFromBelt(scene, util, [1, 1, 1], 0);
		createItemOnBeltLike(scene, util, [1, 2, 2], "UP", aCobble, 0);
		flapFunnel(scene, util, funnelIn, false, 20);
		showText(scene, util, 100,
			"…Avant d'être remontés avec\nun ascenseur à ventilateur,\njusqu'à la surface\n§7Mode PUSH",
			[1.5, 3.5, 2.5], PonderPalette.WHITE, 50);
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(1, 5, 2), PonderPointing.DOWN).withItem(aCobble), 30);
		scene.idle(30);
	})
	.scene("alloy_part", "Production d'Andesite Alloy", "kubejs:ch1_alloygen", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let algalDepot = [0, 1, 2];
		let algalBlast = [0, 3, 2, 0, 4, 2];
		let brickFunnel1 = [0, 2, 2];
		let brickFunnel2 = [1, 3, 2];
		let andesiteDepot = [2, 2, 1];
		let andesiteFunnel = [2, 3, 1];
		let alloyMixer = [2, 3, 2, 2, 5, 2];
		let belt = [1, 2, 2, 4, 2, 2];
		
		// Utilities
		let algalBlend = Item.of("architects_palette:algal_blend");
		let algalBrick = Item.of("architects_palette:algal_brick");
		let aCobble = Item.of("create:andesite_cobblestone");
		let alloy = Item.of("create:andesite_alloy");
		
		// Conditions initiales
		setKineticSpeed(scene, util, [0, 4, 2], 0, 0);
		
		// Emplacement du process Bulk Blast
		rotateCameraY(scene, -20, 20);
		showSection(scene, util, algalDepot, "DOWN", 20);
		createItemOnBeltLike(scene, util, algalDepot, "WEST", algalBlend, 20);
		
		// Apparition du Blaster
		showSection(scene, util, algalBlast, "DOWN", 20);
		showText(scene, util, 60,
			"§cBulk Blast §fde l'Algal Blend pour obtenir de l'Algal Brick",
			[0.5, 1 + 13 / 16.0, 2.5], PonderPalette.WHITE, 50);
		setKineticSpeed(scene, util, [0, 4, 2], -16, 20);
		
		// Transformation en algal brick
		setKineticSpeed(scene, util, [0, 4, 2], 0, 0);
		removeItemsFromBelt(scene, util, algalDepot, 0);
		createItemOnBeltLike(scene, util, algalDepot, "DOWN", algalBrick, 20);
		
		// On retire le Blaster pour la visibilite
		hideSection(scene, util, algalBlast, "UP", 20);
		
		// Config du funnel pour n'accepter que de l'algal brick
		scene.addKeyframe();
		showSection(scene, util, belt, "UP", 3);
		showSection(scene, util, brickFunnel1, "EAST", 20);
		
		showFilterSlotInput(scene, util, [0.4, 2 + 0.7, 2 + 0.5], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(0.4, 2 + 0.7, 2 + 0.5), PonderPointing.LEFT).rightClick().withItem(algalBrick), 30);
		scene.idle(40);
		setFilterData(scene, util, brickFunnel1, FTE, algalBrick, 10);
		rotateCameraY(scene, 20, 20);
		
		// Apparition du mixer et acheminement des ingredients
		let chute = scene.world().showIndependentSection(util.select().position(2, 1, 0), "UP");
		moveSection(scene, util, chute, [0, 0, 1], 0, 0);
		showSection(scene, util, andesiteDepot, "UP", 5);
		showSection(scene, util, alloyMixer, "DOWN", 5);
		showSection(scene, util, andesiteFunnel, "SOUTH", 5);
		showSection(scene, util, brickFunnel2, "EAST", 20);
		
		flapFunnel(scene, util, brickFunnel1, false, 0);
		removeItemsFromBelt(scene, util, algalDepot, 0);
		createItemOnBeltLike(scene, util, [1, 2, 2], "DOWN", algalBrick, 0);
		createItemOnBeltLike(scene, util, andesiteDepot, "DOWN", aCobble, 20);
		showText(scene, util, 60,
			"Arrivée de l'ascenseur à Andesite Cobblestone",
			[2.5, 2 + 13 / 16.0, 1.5], PonderPalette.GREEN, 80);
		
		// Entree des ingredients dans le basin
		scene.addKeyframe();
		flapFunnel(scene, util, brickFunnel2, false, 0);
		flapFunnel(scene, util, andesiteFunnel, false, 0);
		removeItemsFromBelt(scene, util, [1, 2, 2], 0);
		removeItemsFromBelt(scene, util, andesiteDepot, 0);
		createItemOnBeltLike(scene, util, [2, 3, 2], "UP", aCobble, 0);
		createItemOnBeltLike(scene, util, [2, 3, 2], "UP", algalBrick, 20);
		rotateCameraY(scene, 70, 35);
			
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(2, 3, 2), PonderPointing.RIGHT).withItem("create:andesite_cobblestone"), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(2, 3, 2), PonderPointing.LEFT).withItem("architects_palette:algal_brick"), 30);
		scene.idle(40);
		
		// Mixing
		modifyTileNBT(scene, util, [2, 5, 2], { Running: true }, 80);
		
		// Sortie du basin
		restoreBlocks(scene, util, [2, 3, 2], 0);
		let aLink = createItemOnBelt(scene, util, [3, 2, 2], "DOWN", alloy, 32);
		stallBeltItem(scene, aLink, true, 20);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(4, 2, 2), PonderPointing.DOWN).withItem(alloy), 30);
		scene.idle(40);
		
		// Vue finale
		setKineticSpeed(scene, util, [0, 4, 2], -16, 0);
		showSection(scene, util, algalBlast, "DOWN", 0);
		for(let i = 0; i < 35; i++) 
			rotateCameraY(scene, -2, 1);
	})
	.scene("mechanism_part", "Production de Kinetic Mechanisms", "kubejs:ch1_mechanism", (scene, util) => {
		scene.configureBasePlate(0, 0, 8);
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let inBarrel = [7, 2, 3];
		let outFunnel = [6, 2, 3];
		let belt = [3, 1, 3, 1, 1, 3];
		let inFunnel = [1, 2, 3];
		let outDrawer = [0, 2, 3];
		
		// Utilities
		let log = Item.of("minecraft:oak_log");
		let slab = Item.of("minecraft:oak_slab");
		let iKinMech = Item.of("kubejs:incomplete_kinetic_mechanism");
		let kinMech = Item.of("kubejs:kinetic_mechanism");
		let alloy = Item.of("create:andesite_alloy");
		let dSaw = Item.of("cb_microblock:diamond_saw");
		let emptyStack = Item.getEmpty();
		
		// Apparition des saws et des inputs
		for(let x = 6; x >= 4; x--) 
			showSection(scene, util, [x, 1, 3], "DOWN", 3)
		scene.idle(11);
		showSection(scene, util, inBarrel, "DOWN", 5);
		showSection(scene, util, outFunnel, "DOWN", 15);
		
		scene.addKeyframe();
		rotateCameraY(scene, -20, 20);
		
		// Config du filtre de la 3eme saw
		showFilterSlotInput(scene, util, [4 + 0.5, 1 + 13 / 16.0, 3 + 0.75], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(4 + 0.5, 2, 3 + 0.75), PonderPointing.DOWN).rightClick().withItem(slab), 30);
		scene.idle(40);
		setFilterData(scene, util, [4, 1, 3], STE, slab, 10);
		rotateCameraY(scene, 20, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(7, 2, 3), PonderPointing.DOWN).withItem(log), 30);
		scene.idle(40);
		
		// Process d'un log vers une slab
		createItemOnBeltLike(scene, util, [6, 1, 3], "EAST", log, 200);
		showSection(scene, util, belt, "DOWN", 40);
		rotateCameraY(scene, 70, 35);
		
		// Apparition des deployers et des outputs
		scene.addKeyframe();
		for(let x = 3; x >= 1; x--) 
			showSection(scene, util, [x, 3, 3], "DOWN", 5);
		showSection(scene, util, outDrawer, "DOWN", 5);
		showSection(scene, util, inFunnel, "DOWN", 15);
		
		// Clear des saws
		let sequence = createItemOnBelt(scene, util, [3, 1, 3], "EAST", slab, 0);
		restoreBlocks(scene, util, [4, 1, 3, 5, 1, 3], 10);
		
		// Alloy, Alloy et Diamond Saw dans les deployers
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 3, 3), PonderPointing.DOWN).withItem(alloy), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 3, 3), PonderPointing.DOWN).withItem(alloy), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 3, 3), PonderPointing.DOWN).withItem(dSaw), 30);
		scene.idle(30);
		
		modifyTileNBT(scene, util, [3, 3, 3], { HeldItem: alloy }, 5);
		modifyTileNBT(scene, util, [2, 3, 3], { HeldItem: alloy }, 5);
		modifyTileNBT(scene, util, [1, 3, 3], { HeldItem: dSaw }, 15);
		
		// Sequenced Assembly de la slab vers les Kinetic Mechanism
		scene.addKeyframe();
		moveDeployer(scene, util, [3, 3, 3], 1, 19, 20);
		changeBeltItemTo(scene, sequence, iKinMech, 0);
		stallBeltItem(scene, sequence, false, 0);
		modifyTileNBT(scene, util, [3, 3, 3], { HeldItem: emptyStack }, 0);
		moveDeployer(scene, util, [3, 3, 3], -1, 19, 25);
		
		moveDeployer(scene, util, [2, 3, 3], 1, 19, 20);
		stallBeltItem(scene, sequence, false, 0);
		modifyTileNBT(scene, util, [2, 3, 3], { HeldItem: emptyStack }, 0);
		moveDeployer(scene, util, [2, 3, 3], -1, 19, 25);
		
		moveDeployer(scene, util, [1, 3, 3], 1, 19, 20);
		changeBeltItemTo(scene, sequence, kinMech, 0);
		stallBeltItem(scene, sequence, false, 0);
		moveDeployer(scene, util, [1, 3, 3], -1, 19, 20);
		
		// Resultat dans l'output
		removeItemsFromBelt(scene, util, [1, 1, 3], 0);
		flapFunnel(scene, util, inFunnel, false, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 2, 3), PonderPointing.DOWN).withItem(kinMech), 30);
		scene.idle(20);
	})
	.scene("overview_1", "Usine complète", "kubejs:ch1_overview", (scene, util) => {
		replaceBlocks(scene, util, [2, 0, 10], "minecraft:gray_concrete", false, 0);
		replaceBlocks(scene, util, [7, 0, 10], "minecraft:cyan_terracotta", false, 0);
		replaceBlocks(scene, util, [5, 2, 13], "minecraft:air", false, 0);
		
		scene.configureBasePlate(0, 0, 15);
		scene.scaleSceneView(0.5);
		scene.setSceneOffsetY(-2);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let kelpFarm = [[10, 1, 4, 15, 7, 15],
			[6, 6, 14, 9, 7, 14], [4, 7, 14, 5, 7, 14]];
		let blendGen = [[1, 1, 10, 4, 10, 13],
			[2, 2, 9, 3, 6, 9], [4, 2, 9]];
		let bridge = [[4, 5, 4, 4, 5, 9], [4, 6, 6, 4, 6, 9]];
		let andesiteRoute = [[2, 2, 4, 8, 2, 4],
			[3, 3, 4], [7, 3, 4], [7, 1, 3, 7, 3, 3]];
		let alloyGen = [[2, 1, 2, 4, 9, 3], [3, 6, 4, 4, 9, 5],
			[3, 5, 5],[4, 7, 6], [4, 6, 1], [4, 7, 0, 4, 7, 1]];
		let secondProdLine = [[5, 1, 9, 8, 10, 13], [5, 5, 7, 5, 6, 8],
			[5, 1, 2, 6, 9, 3], [5, 5, 4, 6, 9, 6], [6, 3, 4],
			[5, 6, 1], [5, 7, 0, 5, 7, 1]];
		let seqAssembly = [[0, 2, 0, 9, 6, 0],
			[1, 3, 1, 8, 3, 1], [6, 6, 1]];
		
		// Utilities
		let kelp = Item.of("minecraft:kelp");
		let algalBlend = Item.of("architects_palette:algal_blend");
		let aCobble = Item.of("create:andesite_cobblestone");
		let log = Item.of("minecraft:oak_log");
		
		// Conditions initiales
		modifyTileNBT(scene, util, [2, 5, 0], { Value: 0.59 }, 0);
		rotateCameraY(scene, -20, 25);
		
		// Ferme a kelp
		scene.addKeyframe();
		let cartHandle = scene.special().createCart(util.vector().topOf(10, 0, 14), 90, (w, x, y, z) => new Minecart(w, x, y, z));
		showCompound(scene, util, kelpFarm, "DOWN", 0, 20);
		showText(scene, util, 60, "Ferme à Kelp", [10, 5, 14], PonderPalette.WHITE, 70);
		
		// Prod d'algal blend
		scene.addKeyframe();
		showCompound(scene, util, blendGen, "DOWN", 0, 20);		
		showText(scene, util, 60, "Production d'Algal Blend",
			[4.5, 7.5, 11.5], PonderPalette.WHITE, 70);
		
		// Pont et buffer d'algal blend
		scene.addKeyframe();
		showCompound(scene, util, bridge, "DOWN", 0, 20);		
		showText(scene, util, 60, "Buffer d'Algal Blend",
			[4.5, 6.5, 7.5], PonderPalette.WHITE, 30);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(4.5, 7, 7.5), PonderPointing.DOWN).withItem(algalBlend), 30);
		scene.idle(40);
		
		let fAlgal = AABB.of(4, 6, 6.5, 5, 7, 7);
		chaseBoundingBoxOutline(scene, PonderPalette.WHITE, fAlgal, 60, 0);
		showText(scene, util, 60, "Régler la valeur sur 16",
			[4, 6.5, 7], PonderPalette.WHITE, 70);
		
		// Remontee et distribution d'andesite cobblestone
		scene.addKeyframe();
		showCompound(scene, util, andesiteRoute, "DOWN", 0, 20);
		showText(scene, util, 60, "Distribution d'Andesite Cobblestone",
			[3.5, 2.5, 4.5], PonderPalette.WHITE, 30);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(7.5, 4, 3.5), PonderPointing.DOWN).withItem(aCobble), 30);
		scene.idle(40);
		
		// Mixing d'Alloys
		scene.addKeyframe();
		rotateCameraY(scene, -70, 35);
		showCompound(scene, util, alloyGen, "DOWN", 0, 20);
		showText(scene, util, 60, "Production d'Andesite Alloy",
			[4.5, 7.5, 3.5], PonderPalette.WHITE, 70);
		
		// Seconde ligne de prod
		scene.addKeyframe();
		rotateCameraY(scene, 160, 60);
		showCompound(scene, util, secondProdLine, "DOWN", 0, 20);
		showText(scene, util, 60, "Seconde ligne de production",
			[5.5, 6.5, 7.5], PonderPalette.WHITE, 70);
		
		// Ligne d'assemblage des Kinetic Mechanisms
		scene.addKeyframe();
		showCompound(scene, util, seqAssembly, "SOUTH", 0, 20);		
		showText(scene, util, 60, "Ligne d'assemblage des\nKinetic Mechanisms",
			[4.5, 4.5, 0.5], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(9, 4, 0), PonderPointing.DOWN).withItem(log), 30);
		scene.idle(60);
		
		// Taille globale 15x15
		scene.addKeyframe();
		showSelectionWithText(scene, util, [0,1,0, 14,10,14], 60,
			"L'usine complète peut tenir\nsur un seul chunk",
			[0, 6, 0], PonderPalette.GREEN, 80);
		
		// Stress Impact: 152.0x RPM
		let stressometer = AABB.of(2, 5, 0, 3, 6, 1);
		chaseBoundingBoxOutline(scene, PonderPalette.FAST, stressometer, 90, 0);
		showText(scene, util, 80, "Stress Impact:", [120], PonderPalette.WHITE, 10);
		showText(scene, util, 70, "152.0x RPM", [136], PonderPalette.FAST, 90);
		
		// Vue finale
		scene.addKeyframe();
		for(let i = 0; i < 145; i++) 
			rotateCameraY(scene, 2, 1);
	});
	
})
