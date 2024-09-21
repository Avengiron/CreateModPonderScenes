onEvent("ponder.registry", event => {

	event.create("kubejs:factory4a", "kubejs:substrate_chaos").tag("kubejs:main_quest")
	.scene("intro_4a", "Introduction au Chapitre 4A", "kubejs:ch4a_intro", (scene, util) => {
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let depots = [
			util.select().position(1, 3, 1),
			util.select().position(2, 3, 1),
			util.select().position(3, 3, 1),
			util.select().position(1, 3, 2),
			util.select().position(3, 3, 2),
			util.select().position(1, 3, 3),
			util.select().position(2, 3, 3),
			util.select().position(3, 3, 3) ];
		let alchemy = [
			util.select().position(1, 1, 0),
			util.select().position(0, 1, 1),
			util.select().fromTo(0, 1, 2, 0, 2, 2),
			util.select().fromTo(1, 1, 3, 1, 2, 3),
			util.select().fromTo(3, 1, 3, 3, 2 ,3),
			util.select().fromTo(4, 1, 2, 4, 2, 2),
			util.select().position(4, 1, 1),
			util.select().position(3, 1, 0),
			util.select().fromTo(2, 1, 2, 2, 1, 3),
			util.select().position(2, 1, 1) ];
		let content = [
			util.select().position(1, 4, 1),
			util.select().fromTo(3, 4, 1, 3, 5 ,1),
			util.select().fromTo(1, 4, 3, 1, 6 ,3),
			util.select().fromTo(3, 4, 3, 3, 6 ,3),
			util.select().position(2, 4, 0),
			util.select().position(2, 4, 2) ];
		let indySects = [];
		
		// Utilities
		let silicon = Item.of("appliedenergistics2:silicon");	
		let calMech = Item.of("kubejs:calculation_mechanism");
		let pCalCircuit = Item.of("appliedenergistics2:printed_calculation_processor");
		let pLogCircuit = Item.of("appliedenergistics2:printed_logic_processor");
		let pEngCircuit = Item.of("appliedenergistics2:printed_engineering_processor");
		let calProc = Item.of("appliedenergistics2:calculation_processor");
		let logProc = Item.of("appliedenergistics2:logic_processor");
		let engProc = Item.of("appliedenergistics2:engineering_processor");
		let cIngot = Item.of("create:copper_ingot");
		let gIngot = Item.of("minecraft:gold_ingot");
		let diamond = Item.of("minecraft:diamond");
		let redstone = Item.of("minecraft:redstone");
		let aCore = Item.of("appliedenergistics2:annihilation_core");
		let fCore = Item.of("appliedenergistics2:formation_core");
		
		let circuits = [pCalCircuit, pLogCircuit, pEngCircuit];
		let processors = [calProc, logProc, engProc];
		let resources = [diamond, silicon, gIngot, redstone, cIngot];
			
		// Alternative au Chapitre 4
		showText(scene, util, 80,
			"Le vrai Chapitre 4A de la quête principale est une méthode alternative au Chapitre 4",
			[50], PonderPalette.RED, 90);
		showText(scene, util, 80,
			"C'est à dire, trouver un moyen\nde produire du Silicon pour faire\nles Calculation Mechanisms",
			[125], PonderPalette.WHITE, 20);
		
		// Apparition des depots
		let d3 = scene.world().showIndependentSection(depots[3], "DOWN");
		moveSection(scene, util, d3, [0, -2, 0], 0, 5);
		let d4 = scene.world().showIndependentSection(depots[4], "DOWN");
		moveSection(scene, util, d4, [0, -2, 0], 0, 15);
		
		// Apparition des ressources
		createItemOnBeltLike(scene, util, [1, 3, 2], "WEST", silicon, 5);
		createItemOnBeltLike(scene, util, [3, 3, 2], "EAST", calMech, 45);
		
		// Disparition depots
		scene.world().hideIndependentSection(d3, "UP"); scene.idle(5);
		scene.world().hideIndependentSection(d4, "UP"); scene.idle(15);
		
		// Ma version perso du Chapitre 4A
		scene.addKeyframe();
		showText(scene, util, 80,
			"Ici, j'appelle Chapitre 4A la suite du Chapitre 4, comme pour les autres Chapitres",
			[50], PonderPalette.GREEN, 90);
		showText(scene, util, 80,
			"Ça consiste à produire 3 types de Printed Circuits et 3 types de Processors pour les recettes AE2",
			[125], PonderPalette.WHITE, 10);
		
		// Apparition des depots
		for(let x = 1; x <= 3; x++) {
			let IS = scene.world().showIndependentSection(util.select().position(x, 3, 1), "SOUTH");
			indySects.push(IS);
			moveSection(scene, util, IS, [0, -2, 0], 0, 3);		
		}
		for(let x = 1; x <= 3; x++) {
			let IS = scene.world().showIndependentSection(util.select().position(x, 3, 3), "NORTH");
			indySects.push(IS);
			moveSection(scene, util, IS, [0, -2, 0], 0, 3);
		}
		scene.idle(12);
		
		// Apparition des ressources
		for(let x = 1; x <= 3; x++) 
			createItemOnBeltLike(scene, util, [x, 3, 1], "NORTH", circuits[x-1], 3);
		for(let x = 1; x <= 3; x++) 
			createItemOnBeltLike(scene, util, [x, 3, 3], "SOUTH", processors[x-1], 3);
		scene.idle(32);
		
		// Disparition depots
		for(let i = 0; i < 6; i++) {
			scene.world().hideIndependentSection(indySects[i], "UP"); scene.idle(2);
		}
		scene.idle(12);
		rotateCameraY(scene, 35, 25);
		
		// But de ce Chapitre
		scene.addKeyframe();
		showText(scene, util, 60, 
			"Dans ce but, nous avons besoin\nde produire 5 ressources",
			[25], PonderPalette.GREEN, 30);
		
		for(let x = 4; x >= 0; x--) {
			scene.overlay().showControls(new PonderInput(util.vector().centerOf(x, 1, 1), x % 2 == 0 ? PonderPointing.DOWN : PonderPointing.UP).withItem(resources[x]), 30);
			scene.idle(3);
		}
		scene.idle(37);
		rotateCameraY(scene, 35, 25);
		
		showText(scene, util, 80,
			"Et pour ce faire, nous allons utiliser la mécanique du Chapitre 4A, à savoir l'§dAlchimie",
			[25], PonderPalette.WHITE, 30);
		
		// Apparition des elements d'alchimie
		scene.world().showSection(alchemy[0], "SOUTH"); scene.idle(3);
		scene.world().showSection(alchemy[1], "EAST"); scene.idle(3);
		scene.world().showSection(alchemy[2], "EAST"); scene.idle(3);
		scene.world().showSection(alchemy[3], "NORTH"); scene.idle(3);
		scene.world().showSection(alchemy[4], "NORTH"); scene.idle(3);
		scene.world().showSection(alchemy[5], "WEST"); scene.idle(3);
		scene.world().showSection(alchemy[6], "WEST"); scene.idle(3);
		scene.world().showSection(alchemy[7], "SOUTH"); scene.idle(17);
		scene.world().showSection(alchemy[8], "DOWN"); scene.idle(3);
		scene.world().showSection(alchemy[9], "DOWN"); scene.idle(42);
		
		showText(scene, util, 80, "ATTENTION: ", [134], PonderPalette.RED, 10);
		showText(scene, util, 80,
			"Les recettes d'alchimie CHAOTIQUE sont dépendantes de votre Seed",
			[150], PonderPalette.OUTPUT, 10);
		showText(scene, util, 80,
			"Les ressouces d'entrée seront donc différentes pour vous…",
			[175], PonderPalette.OUTPUT, 100);
		
		alchemy.forEach(s => {
			scene.world().hideSection(s, "UP");
			scene.idle(3);
		});
		scene.idle(17);
		
		// Intro dans le style des autres Chapitres
		scene.addKeyframe();
		showText(scene, util, 120, "Chapitres 4 & 4A", [16], PonderPalette.WHITE, 20);
		showText(scene, util, 110, "L'Âge de l'Informatique", [32], PonderPalette.MEDIUM, 40);
		
		content.forEach(s => {
			let IS = scene.world().showIndependentSection(s, "DOWN");
			moveSection(scene, util, IS, [0, -3, 0], 0, 3);
		});
		createItemOnBeltLike(scene, util, [2, 4, 2], "NORTH", aCore, 3);
		createItemOnBeltLike(scene, util, [2, 4, 0], "SOUTH", fCore, 3);
		
		showText(scene, util, 80,
			"Avec les §6Calculation Mechanisms §fet les §6Processors§f, on débloque toutes les mécaniques de AE2",
			[166], PonderPalette.WHITE, 70);
	})
	.scene("gold_part", "Ferme à Gold", "kubejs:ch4a_gold", (scene, util) => {
		replaceBlocks(scene, util, [4, 0, 2], "minecraft:gray_concrete", false, 0);
		scene.configureBasePlate(0, 0, 6);
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Partie generation de Granite Cobblestone ------------------------------------
		// Sections & Positions
		let bedrock = [3, 0, 2];
		
		// Utilities
		let IS;
		let indySects = [];
		let yShift = [0, -6, 0];
		
		let gCobble = Item.of("create:granite_cobblestone");
			
		showText(scene, util, 80,
			"On reprend le setup de la production d'Andesite Cobblestone du Chapitre 1, adapté pour produire de la Granite Cobblestone",
			[50], PonderPalette.GREEN, 90);
		
		// Bedrock
		replaceBlocks(scene, util, bedrock, "minecraft:bedrock", true, 20);
		showText(scene, util, 60,
			"La génération de Granite Cobblestone doit se faire\nau niveau de la §7Bedrock",
			[3.5, 1, 2.5], PonderPalette.RED, 70);
		
		// Generation de granite cobblestone
		IS = scene.world().showIndependentSection(util.select().position(3, 7, 2), "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 15);
		IS = scene.world().showIndependentSection(util.select().position(2, 7, 2), "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 3);
		IS = scene.world().showIndependentSection(util.select().position(4, 7, 2), "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 20);
		
		showText(scene, util, 80,
			"L'Igneous Extruder doit être adjacent à de la §cLave §fet à de\nla §bPolished Packed Ice",
			[3.5, 1.5, 2.5], PonderPalette.WHITE, 90);
		modifyBlock(scene, util, [3, 7, 2], "active", "true", 0);
		
		// Apparition de tous les elements
		scene.addKeyframe();
		IS = scene.world().showIndependentSection(util.select().fromTo(3, 8, 2, 3, 9, 2), "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 5);
				
		setKineticSpeed(scene, util, [1, 7, 1, 3, 7, 1], 16, 0);
		IS = scene.world().showIndependentSection(util.select().fromTo(1, 7, 1, 3, 7, 1), "UP");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 5);
		IS = scene.world().showIndependentSection(util.select().position(3, 8, 1), "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 5);
		
		IS = scene.world().showIndependentSection(util.select().fromTo(1, 7, 2, 1, 10, 2), "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 5);
		IS = scene.world().showIndependentSection(util.select().position(1, 8, 1), "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 20);
		
		showText(scene, util, 40, "Mode PULL", [3, 3.5, 2.5], PonderPalette.WHITE, 50);
		createItemOnBeltLike(scene, util, [3, 7, 1], "SOUTH", gCobble, 60);
		removeItemsFromBelt(scene, util, [1, 7, 1], 0);
		flapFunnel(scene, util, [1, 8, 1], false, 20);
		showText(scene, util, 40, "Mode PUSH", [1, 1.5, 2.5], PonderPalette.WHITE, 60);
		
		let toHide = indySects.splice(6, 1);
		scene.world().hideIndependentSection(toHide[0], "UP");
		scene.idle(20);
		
		IS = scene.world().showIndependentSection(util.select().position(1, 8, 3), "UP");
		indySects.push(IS);
		moveSection(scene, util, IS, [0, -6, -1], 0, 20);
		
		showText(scene, util, 80,
			"Note:\nDepuis le Chapitre 3A, vous avez accès aux Ender Chests pour les transports longue distance",
			[150], PonderPalette.GREEN, 100);
		
		// On enleve tout pour le reste de la scene
		indySects.forEach(is => scene.world().hideIndependentSection(is, "UP"));
		hideSection(scene, util, bedrock, "UP", 20);
		
		// On remet la baseplate intacte
		restoreBlocks(scene, util, bedrock, 0);
		showSection(scene, util, bedrock, "UP", 20);
		
		// Partie Gold Farm -----------------------------------------------------
		// Sections & Positions
		let depotGC = [0, 2, 2];
		let inFunnelGC = [0, 3, 2];
		let depotBlast = [1, 3, 2];
		let blaster = [1, 4, 2, 1, 5, 2];
		let outFunnelG = [2, 3, 2];
		let belt = [2, 2, 2, 4, 2, 2];
		let crushers = [3, 3, 1, 3, 3, 3];
		let washer = [4, 4, 2, 4, 5, 2];
		let inFunnelGold = [4, 3, 2];
		let chuteBush = [4, 1, 2];
		let nullifier = [4, 0, 2];
		let outBarrel = [[5, 2, 2], [5, 1, 2]];
		
		// Attention, du a des problemes de rendering avec les Drawers,
		// le drawer visible ici est un autre bloc avec la texture d'un
		// compacting drawer
		let compact = [5, 3, 2];
		
		// Utilities
		let granite = Item.of("minecraft:granite");
		let rSand = Item.of("minecraft:red_sand");
		let gNugget = Item.of("minecraft:gold_nugget", 4); // Nugget x2 sur une belt
		let bush = Item.of("minecraft:dead_bush");
		let gIngot = Item.of("minecraft:gold_ingot");
		
		// Conditions initiales
		setKineticSpeed(scene, util, blaster, 0, 0);
		setKineticSpeed(scene, util, washer, 0, 0);
				
		scene.addKeyframe();
		showSection(scene, util, depotGC, "DOWN", 0);
		let addChute = scene.world().showIndependentSection(util.select().position(0, 3, 0), "DOWN");
		moveSection(scene, util, addChute, [0, -2, 2], 0, 20);
		
		// Inputs
		createItemOnBeltLike(scene, util, depotGC, "DOWN", gCobble, 10);
		showText(scene, util, 60, "Arrivée de la Granite Cobblestone",
			[0.5, 2 + 13 / 16.0, 2.5], PonderPalette.WHITE, 80);
		
		// Blast pour granite
		showSection(scene, util, inFunnelGC, "DOWN", 5);
		showSection(scene, util, depotBlast, "DOWN", 20);
		
		// Le blaster est remonte juste pour la visibilite, donc IndependentSection
		let blastIS = scene.world().showIndependentSection(util.select().fromTo(1, 4, 2, 1, 5, 2), "DOWN");
		scene.idle(20);
		moveSection(scene, util, blastIS, [0, 1, 0], 20, 20);
		
		removeItemsFromBelt(scene, util, depotGC, 0);
		createItemOnBeltLike(scene, util, depotBlast, "WEST", gCobble, 0);
		flapFunnel(scene, util, inFunnelGC, false, 20);
		showText(scene, util, 60,
			"§cBulk Blast §fde la Cobblestone\npour obtenir du Granite",
			[1.5, 3 + 13 / 16.0, 2.5], PonderPalette.WHITE, 50);
		
		// Blast au dernier moment pour eviter trop de particules
		restoreBlocks(scene, util, blaster, 20);
		setKineticSpeed(scene, util, blaster, 0, 0);
		removeItemsFromBelt(scene, util, depotBlast, 0);
		createItemOnBeltLike(scene, util, depotBlast, "DOWN", granite, 20);
		
		// Cache le blaster pour visibilite
		scene.world().hideIndependentSection(blastIS, "UP");
		scene.idle(20);
		rotateCameraY(scene, 90, 40);
		
		// Progres du granite cuit
		scene.addKeyframe();
		showSection(scene, util, belt, "UP", 5);
		showSection(scene, util, outFunnelG, "DOWN", 20);
		
		// Filtre funnel granite
		showFilterSlotInput(scene, util, [2+0.5, 3+13/16.0, 2+0.5], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2 + 0.5, 3 + 13 / 16.0, 2 + 0.5), PonderPointing.DOWN).rightClick().withItem(granite), 30);
		scene.idle(40);
		setFilterData(scene, util, outFunnelG, FTE, granite, 20);
		
		// Crushing en red sand
		showSection(scene, util, crushers, "DOWN", 20);
		removeItemsFromBelt(scene, util, depotBlast, 0);
		flapFunnel(scene, util, outFunnelG, true, 0);
		showText(scene, util, 60,
			"Le Granite est transformé en Red Sand par une série de Crushers",
			[3.5, 3+14/16.0, 2.5], PonderPalette.WHITE, 60);
		
		// Disparition des crushers pour la visibilite
		createItemOnBeltLike(scene, util, [4, 2, 2], "WEST", rSand, 10);
		hideSection(scene, util, crushers, "UP", 0);
		rotateCameraY(scene, -110, 45);
		
		// Washing du red sand pour gold nuggets
		scene.addKeyframe();
		showSection(scene, util, washer, "DOWN", 20);
		showText(scene, util, 60,
			"§9Bulk Wash §fdu Red Sand pour obtenir des Gold Nugget",
			[4.5, 2 + 13 / 16.0, 2.5], PonderPalette.WHITE, 50);
		// Wash au dernier moment pour eviter trop de particules
		restoreBlocks(scene, util, washer, 20);
		
		// Cache le washer, fait apparaitre le compacter
		setKineticSpeed(scene, util, washer, 0, 0);
		removeItemsFromBelt(scene, util, [4, 2, 2], 0);
		createItemOnBeltLike(scene, util, [4, 2, 2], "DOWN", gNugget, 20);
		hideSection(scene, util, washer, "UP", 20);
		showSection(scene, util, compact, "DOWN", 5);
		showSection(scene, util, inFunnelGold, "DOWN", 20);
		
		// Filtre funnel gold nugget
		showFilterSlotInput(scene, util, [4+0.5, 3+13/16.0, 2+0.5], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(4 + 0.5, 3 + 13 / 16.0, 2 + 0.5), PonderPointing.DOWN).rightClick().withItem(gNugget), 30);
		scene.idle(40);
		setFilterData(scene, util, inFunnelGold, FTE, gNugget, 10);
		
		removeItemsFromBelt(scene, util, [4, 2, 2], 0);
		flapFunnel(scene, util, inFunnelGold, false, 20);
		
		// Tri des dead bushes
		scene.addKeyframe();
		createItemOnBeltLike(scene, util, [4, 2, 2], "DOWN", bush, 0);
		showText(scene, util, 60,
			"On obtient également des Dead Bushes, dont on se débarrasse",
			[4.5, 2 + 13 / 16.0, 2.5], PonderPalette.WHITE, 70);
		
		showSection(scene, util, chuteBush, "SOUTH", 0);
		restoreBlocks(scene, util, nullifier, 0);
		hideCompound(scene, util, [[4, 0, 0], [4, 0, 1]], "DOWN", 3, 0);
		rotateCameraY(scene, 40, 30);
		
		// Filtre chute dead bush
		showFilterSlotInput(scene, util, [4+0.5, 1+0.75, 2], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(4 + 0.5, 1 + 0.75, 2), PonderPointing.DOWN).rightClick().withItem(bush), 30);
		scene.idle(40);
		setFilterData(scene, util, chuteBush, SCTE, bush, 10);
		
		removeItemsFromBelt(scene, util, [4, 2, 2], 20);
		showCompound(scene, util, [[4, 0, 1], [4, 0, 0]], "UP", 3, 20);
		rotateCameraY(scene, -20, 30);
		
		// Filtre chute gold ingot
		scene.addKeyframe();
		showCompound(scene, util, outBarrel, "SOUTH", 3, 20);
		showFilterSlotInput(scene, util, [5+0.5, 2+0.75, 2], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(5 + 0.5, 2 + 0.75, 2), PonderPointing.DOWN).rightClick().withItem(gIngot), 30);
		scene.idle(40);
		setFilterData(scene, util, [5, 2, 2], SCTE, gIngot, 10);
		showText(scene, util, 60,
			"Avec assez de Nuggets, le Compacting Drawer crafte\nde lui-même un Gold Ingot",
			[5.5, 3.5, 2], PonderPalette.OUTPUT, 70);
			
		scene.overlay().showControls(new PonderInput(util.vector().of(5.5, 1.25, 2), PonderPointing.UP).withItem(gIngot), 30);
		scene.idle(40);
		
		// Reapparition des elements caches pour la vue finale
		restoreBlocks(scene, util, blaster, 0);
		restoreBlocks(scene, util, washer, 0);
		showCompound(scene, util, [washer, [3,2,1], crushers, blaster], "DOWN", 10, 0);
	})
	.scene("copper_part", "Fabrication de Copper", "kubejs:ch4a_copper", (scene, util) => {
		replaceBlocks(scene, util, [1, 0, 1], "minecraft:gray_concrete",  false, 0);
		replaceBlocks(scene, util, [2, 0, 2], "minecraft:gray_concrete",  false, 0);
		replaceBlocks(scene, util, [2, 0, 1], "minecraft:cyan_terracotta",false, 0);
		scene.configureBasePlate(0, 0, 7);
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let niterChest = [5, 2, 5];
		let belt = [5, 1, 2, 5, 1, 4];
		let outFunnelNiter = [5, 2, 4];
		let crushers = [[4, 1, 3, 4, 2, 3], [6, 1, 3, 6, 2, 3]];
		let storageNDust = [[5, 1, 1, 5, 2, 1], [5, 2, 2]];
		let nDustTransition = [3, 1, 1, 4, 2, 1];
		let sandArrival = [[1, 4, 1], [1, 5, 1]];
		let mGlassMachines = [[2, 4, 1], [0, 4, 1]];
		let mGlassTanks = [[2, 3, 1], [0, 3, 1]];
		let reagentMakers = [[2, 2, 1], [0, 2, 1]];
		let wartChest = [0, 2, 2];
		let smelter = [1, 2, 1];
		let smartChute = [1, 1, 1];
		let barrel = [1, 0, 1];
		let baseToHide = [1, 0, 0];
		let pipe = [[2, 0, 1], [2, 0, 2], [2, 1, 2], 
			[2, 2, 2], [2, 3, 2], [1, 3, 2], [1, 3, 1]];
		let depotReagent = [1, 2, 2];
		let energyCircuit1 = [[1, 1, 5], [1, 1, 4], [1, 1, 3]];
		let energyCircuit2 = [[2, 4, 0], [2, 3, 0], [2, 2, 0],
			[1, 2, 0], [0, 2, 0], [0, 3, 0], [0, 4, 0]];
				
		// Utilities
		let niter = Item.of("thermal:niter");
		let nDust = Item.of("thermal:niter_dust");
		let sand = Item.of("minecraft:sand");
		let nWart = Item.of("minecraft:nether_wart");
		let reagentNiter = Item.of("kubejs:substrate_niter");
		let reagentWart = Item.of("kubejs:substrate_nether");
		let reagentCopper = Item.of("kubejs:substrate_copper");
		let catalystMetal = Item.of("kubejs:substrate_metal");
		let cDust = Item.of("thermal:copper_dust");
		let mcBucket = Item.of("tconstruct:molten_copper_bucket");
		let castIngot = Item.of("thermal:chiller_ingot_cast");
		let cIngot = Item.of("create:copper_ingot");
		
		let machineName = ["Reagent Extractor", "Magma Crucible", "Blast Chiller"];
		let steps = [cDust, mcBucket, castIngot];
		
		// Conditions initiales
		modifyTileNBT(scene, util, mGlassTanks[0], { tank: { Amount: 0 }}, 0);
		modifyTileNBT(scene, util, mGlassTanks[1], { tank: { Amount: 0 }}, 0);
		
		// Arrivee du Niter
		showSection(scene, util, niterChest, "DOWN", 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(5, 2, 5), PonderPointing.DOWN).withItem(niter), 30);
		scene.idle(40);
		
		showSection(scene, util, belt, "UP", 5);
		showSection(scene, util, outFunnelNiter, "DOWN", 20);
		showCompound(scene, util, crushers, "DOWN", 0,  20);
		showText(scene, util, 60,
			"Le Niter est transformé en Niter Dust par une série de Crushers",
			[5.5, 2 + 14 / 16.0, 3.5], PonderPalette.WHITE, 60);
		
		// Process Niter Dust
		createItemOnBeltLike(scene, util, [5, 1, 2], "SOUTH", nDust, 20);
		showCompound(scene, util, storageNDust, "DOWN", 3, 17);
		removeItemsFromBelt(scene, util, [5, 1, 2], 0);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(5, 2, 1), PonderPointing.DOWN).withItem(nDust), 30);
		scene.idle(50);
		
		// Cache la partie Niter pour la visibilite
		hideSection(scene, util, [4, 1, 2, 6, 2, 5], "UP", 20);
		
		// Molten Glass Part
		scene.addKeyframe();
		showCompound(scene, util, sandArrival, "DOWN", 3, 17);
		let sIE = createItemEntity(scene, util, [1.5, 8.5, 1.5], [0, 0.1, 0], sand, 15);
		modifyEntity(scene, sIE, e => e.kill(), 5);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 5, 1), PonderPointing.DOWN).withItem(sand), 30);
		scene.idle(50);
		
		showCompound(scene, util, mGlassMachines, "UP", 5, 0);
		showCompound(scene, util, mGlassTanks, "UP", 5, 15);
		
		// Animation Melting
		modifyBlock(scene, util, [2, 4, 1], "active", "true", 5);
		modifyBlock(scene, util, [0, 4, 1], "active", "true", 5);
		showText(scene, util, 60,
			"Des deux côtés, le Sand est\nfondu en Molten Glass par\ndes Magma Crucibles",
			[0.5, 4.5, 1], PonderPalette.WHITE, 30);
		
		// Remplissage des Tanks
		let volL = volR = 0;
		for(let i = 1; i <= 45; i++) {
			// Petit decalage dans l'animation
			if(i <= 40) volL += 100;
			if(i >   5) volR += 100;
			restoreBlocks(scene, util, mGlassTanks[0], 0);
			restoreBlocks(scene, util, mGlassTanks[1], 0);
			modifyTileNBT(scene, util, mGlassTanks[0], { tank: { Amount: volL }}, 0);
			modifyTileNBT(scene, util, mGlassTanks[1], { tank: { Amount: volR }}, 1);
		}
		scene.idle(15);
		modifyBlock(scene, util, [2, 4, 1], "active", "false", 5);
		modifyBlock(scene, util, [0, 4, 1], "active", "false", 15);
		
		// Theorie Reagents
		scene.addKeyframe();
		showCompound(scene, util, reagentMakers, "UP", 5, 15);
		showText(scene, util, 100,
			"Dans un Fluid Encapsulator, associer du Molten Glass avec une ressource sert à fabriquer un §dReagent §f(solution alchimique)",
			[164], PonderPalette.WHITE, 120);
		
		// Niter Reagent
		showSection(scene, util, nDustTransition, "DOWN", 20);
		createItemOnBeltLike(scene, util, [4, 1, 1], "DOWN", nDust, 32);
		removeItemsFromBelt(scene, util, [3, 1, 1], 0);
		flapFunnel(scene, util, [3, 2, 1], false, 0);
		modifyBlock(scene, util, [2, 2, 1], "active", "true", 0);
		showText(scene, util, 60,
			"A gauche, on fabrique du §dNitric §dReagent §favec la Niter Dust",
			[2.5, 2.5, 1], PonderPalette.WHITE, 70);
		modifyBlock(scene, util, [2, 2, 1], "active", "false", 0);
		rotateCameraY(scene, -20, 20);
		
		// Nether Reagent
		showSection(scene, util, wartChest, "EAST", 10);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 2, 2), PonderPointing.DOWN).withItem(nWart), 30);
		scene.idle(40);
		
		modifyBlock(scene, util, [0, 2, 1], "active", "true", 0);
		showText(scene, util, 60,
			"A droite, on fabrique du §dNether §dReagent §fà partir de Nether Wart",
			[0, 2.5, 1.5], PonderPalette.WHITE, 70);
		modifyBlock(scene, util, [0, 2, 1], "active", "false", 0);
		rotateCameraY(scene, 20, 20);
		
		// Sortie Reagents
		scene.overlay().showControls(new PonderInput(util.vector().of(2.5, 2.25, 1), PonderPointing.UP).withItem(reagentNiter), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().of(0.5, 2.25, 1), PonderPointing.UP).withItem(reagentWart), 30);
		scene.idle(50);
		hideSection(scene, util, [3, 1, 1, 5, 2, 1], "UP", 20);
		
		// Craft Copper Reagent
		scene.addKeyframe();
		showSection(scene, util, smelter, "UP", 20);
		showText(scene, util, 60,
			"Les deux §dReagents §fsont envoyés dans un Smelter, avec un §6Metallurgic Catalyst",
			[1.5, 2.5, 1], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(1.5, 2.5, 1), PonderPointing.RIGHT).withItem(reagentNiter), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().of(1.5, 2.5, 1), PonderPointing.LEFT).withItem(reagentWart), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().of(1.5, 2, 1), PonderPointing.UP).withItem(catalystMetal), 30);
		scene.idle(30);
		
		modifyBlock(scene, util, smelter, "active", "true", 20);
		showText(scene, util, 60,
			"Le résultat donne un §dCopper §dReagent§f, et on récupère le §6Catalyst",
			[1.5, 2.5, 1], PonderPalette.WHITE, 70);
		
		// Recyclage du Catalyst
		scene.addKeyframe();
		hideCompound(scene, util, [baseToHide, barrel], "DOWN", 3, 0);
		rotateCameraY(scene, 20, 20);
		
		modifyBlock(scene, util, smelter, "active", "false", 0);
		restoreBlocks(scene, util, barrel, 0);
		showCompound(scene, util, [smartChute, barrel], "SOUTH", 3, 17);
		showText(scene, util, 40, "Le §6Catalyst §fest séparé…",
			[1.5, 0.5, 1], PonderPalette.WHITE, 20);
		
		// Filtre chute Catalyst
		showFilterSlotInput(scene, util, [1+0.5, 1+0.75, 1], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(1 + 0.5, 1 + 0.75, 1), PonderPointing.RIGHT).rightClick().withItem(catalystMetal), 30);
		scene.idle(40);
		setFilterData(scene, util, smartChute, SCTE, catalystMetal, 20);
		
		showSection(scene, util, baseToHide, "UP", 20);
		rotateCameraY(scene, -110, 45);
		
		hideSection(scene, util, wartChest, "UP", 20);
		hideCompound(scene, util, [[2, 0, 1], [2, 0, 2]], "DOWN", 3, 17);
		restoreBlocks(scene, util, [2, 0, 1, 2, 0, 2], 0);
		showCompound(scene, util, pipe, "NORTH", 3, 17);
		showText(scene, util, 60, "…Puis réinjecté dans le\nSmelter via des Pipes",
			[2.5, 3.5, 2.5], PonderPalette.WHITE, 80);
		
		// Sortie du Copper Reagent
		showSection(scene, util, depotReagent, "NORTH", 20);
		showText(scene, util, 60, "Le §dCopper Reagent §fest\nsorti par derrière",
			[1.5, 2 + 13 / 16.0, 2.5], PonderPalette.WHITE, 50);
		createItemOnBeltLike(scene, util, depotReagent, "NORTH", reagentCopper, 30);
		
		scene.addKeyframe();
		for(let z = 3; z <= 6; z++) 
			showSection(scene, util, [1, 2, z], "DOWN", 3);
		scene.idle(18);
		
		let suiteMachines = AABB.of(1, 2, 3, 2, 3, 7);
		chaseBoundingBoxOutline(scene, PonderPalette.GREEN, suiteMachines, 70, 0);
		showText(scene, util, 60,
			"Cette suite de machines transforme le §dCopper Reagent §fen Copper Ingot",
			[1, 2.5, 7], PonderPalette.WHITE, 80);
		
		// Simulation process dans la suite de machines
		removeItemsFromBelt(scene, util, depotReagent, 0);
		for(let z = 3; z <= 5; z++) {
			modifyBlock(scene, util, [1, 2, z], "active", "true", 0);
			showText(scene, util, 30, machineName[z-3], [100], PonderPalette.MEDIUM, 0);
			scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 2, z), PonderPointing.DOWN).withItem(steps[z-3]), 30);
			scene.idle(35);
			modifyBlock(scene, util, [1, 2, z], "active", "false", 0);
		}
		
		// Sortie Copper Ingot
		createItemOnBeltLike(scene, util, [1, 2, 6], "NORTH", cIngot, 20);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 2, 6), PonderPointing.DOWN).withItem(cIngot), 30);
		scene.idle(50);
		rotateCameraY(scene, 70, 35);
		
		// Alimentation electrique
		scene.addKeyframe();
		showText(scene, util, 60, "Ne pas oublier d'alimenter\ntoutes les machines",
			[160], PonderPalette.WHITE, 40);
		showCompound(scene, util, energyCircuit1, "UP", 3, 0);
		showCompound(scene, util, energyCircuit2, "SOUTH", 3, 20);
		
		// Reapparition des elements caches pour la vue finale
		for(let i = 0; i < 55; i++) {
			switch(i) {
				case 0 : showSection(scene, util, wartChest, "EAST", 0); break;
				case 20: showSection(scene, util, nDustTransition, "DOWN", 0); break;
				case 30: showCompound(scene, util, storageNDust, "DOWN", 0, 0); break;
				case 40: showCompound(scene, util, [niterChest, belt, outFunnelNiter], "WEST", 0, 0); break;
				case 50: showCompound(scene, util, crushers, "DOWN", 0, 0); break;
				default: break;
			}
			rotateCameraY(scene, 2, 1); 
		}
	})
	.scene("diamond_part", "Fabrication de Diamond", "kubejs:ch4a_diamond", (scene, util) => {
		scene.configureBasePlate(0, 0, 7);
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let niterPart = [[1, 2, 5], [1, 1, 2, 1, 1, 4], [1, 2, 4], [0, 1, 3], 
			[2, 1, 3], [0, 2, 3, 2, 2, 3], [1, 1, 1, 1, 2, 1], [1, 2, 2]];
		let gDustProd = [0, 4, 1, 2, 5, 5];
		let reagentPart = [[5, 4, 1], [5, 5, 1], [4, 4, 1], 
			[6, 4, 1], [4, 3, 1], [6, 3, 1], [4, 2, 1], [6, 2, 1]];
		let nDustTransition = [2, 1, 1, 3, 2, 1];
	 	let gDustChest = [7, 2, 1];
		
		let hoppers = [[4, 1, 1, 4, 1, 2], [6, 1, 1, 6, 1, 2]];
		let blazeBurner = [5, 1, 2];
		let basin1 = [5, 2, 2];
		let mixer = [5, 4, 2];
		let inFunnels = [[4, 2, 2], [6, 2, 2]];
		let outDepotMix = [5, 1, 3];
		let depotFuel = [3, 1, 5];
		let arm = [5, 4, 3];
		let pipe = [[4, 1, 3], [4, 2, 3], [4, 3, 3], [4, 3, 2], [5, 3, 2]];

		let inFunnelDReagent = [5, 2, 3];
		let machine = [5, 1, 4, 5, 2, 4];
		let basin2 = [5, 2, 5];
		let press = [5, 4, 5];
		let outDepot = [5, 1, 6];

		let energyCircuit = [[6, 4, 0], [6, 3, 0], [6, 2, 0], 
			[5, 2, 0], [4, 2, 0], [4, 3, 0], [4, 4, 0]];
		
		// Utilities
		let niter = Item.of("thermal:niter");
		let nDust = Item.of("thermal:niter_dust");
		let sand = Item.of("minecraft:sand");
		let gIngot = Item.of("minecraft:gold_ingot");
		let gDust = Item.of("thermal:gold_dust");
		
		let reagentNiter = Item.of("kubejs:substrate_niter");
		let reagentGold = Item.of("kubejs:substrate_gold");
		let reagentDiamond = Item.of("kubejs:substrate_diamond");
		let catalystGem = Item.of("kubejs:substrate_gem");
		
		let dDust = Item.of("thermal:diamond_dust");
		let diamond = Item.of("minecraft:diamond");
		let coalBlock = Item.of("minecraft:coal_block");
		let emptyStack = Item.getEmpty();
		
		// Conditions initiales
		modifyTileNBT(scene, util, press, { Mode: 2 }, 0); // Mode.BASIN
		
		// Niter Part
		showText(scene, util, 60,
			"Pour fabriquer du Diamond, on a également besoin de Niter Dust",
			[25], PonderPalette.WHITE, 60);
		showCompound(scene, util, niterPart, "DOWN", 3, 20);
		showText(scene, util, 60, "Ça tombe bien, on sait déjà faire",
			[175], PonderPalette.GREEN, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 2, 5), PonderPointing.DOWN).withItem(niter), 30);
		scene.idle(15);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 2, 1), PonderPointing.DOWN).withItem(nDust), 30);
		scene.idle(40);
		
		// Gold dust
		showSection(scene, util, gDustProd, "DOWN", 20);
		showText(scene, util, 60, "Même principe pour produire\nde la Gold Dust",
			[1.5, 5 + 14 / 16.0, 3.5], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 5, 5), PonderPointing.DOWN).withItem(gIngot), 30);
		scene.idle(15);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 5, 1), PonderPointing.DOWN).withItem(gDust), 30);
		scene.idle(40);
		
		hideSection(scene, util, gDustProd, "UP", 5);
		hideSection(scene, util, [0, 1, 2, 2, 2, 5], "UP", 20);
		
		// Suite de machines de fabrication de reagents
		scene.addKeyframe();
		showText(scene, util, 60,
			"Les machines qui produisent le Molten Glass et les §dReagents\n§fsont les mêmes",
			[125], PonderPalette.WHITE, 60);
		showCompound(scene, util, reagentPart, "UP", 3, 20);
		let sIE = createItemEntity(scene, util, [5.5, 8.5, 1.5], [0, 0.1, 0], sand, 15);
		modifyEntity(scene, sIE, e => e.kill(), 5);	
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(5, 5, 1), PonderPointing.DOWN).withItem(sand), 30);
		scene.idle(50);
		
		// Reagents en question (niter & gold)
		scene.addKeyframe();
		showSection(scene, util, nDustTransition, "DOWN", 20);
		modifyBlock(scene, util, [4, 2, 1], "active", "true", 0);
		showText(scene, util, 60,
			"A droite, on fabrique du §dNitric §dReagent §favec la Niter Dust",
			[4.5, 2.5, 1], PonderPalette.WHITE, 70);
		modifyBlock(scene, util, [4, 2, 1], "active", "false", 0);
		rotateCameraY(scene, 70, 35);
		
		showSection(scene, util, gDustChest, "WEST", 10);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(7, 2, 1), PonderPointing.DOWN).withItem(gDust), 30);
		scene.idle(40);
		
		modifyBlock(scene, util, [6, 2, 1], "active", "true", 0);
		showText(scene, util, 60,
			"A gauche, on fabrique du §dGold §dReagent §fà partir de Gold Dust",
			[6.5, 2.5, 1], PonderPalette.WHITE, 70);
		modifyBlock(scene, util, [6, 2, 1], "active", "false", 0);
		hideSection(scene, util, [1, 1, 1, 1, 2, 1], "UP", 3);
		hideSection(scene, util, nDustTransition, "UP", 3);
		hideSection(scene, util, gDustChest, "UP", 20);
		
		// Montre la sortie des Reagents, puis cache les machines
		scene.addKeyframe();
		showCompound(scene, util, hoppers, "SOUTH", 3, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(4.5, 2.25, 1), PonderPointing.UP).withItem(reagentNiter), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().of(6.5, 2.25, 1), PonderPointing.UP).withItem(reagentGold), 30);
		scene.idle(50);
		
		createItemOnBeltLike(scene, util, [4, 1, 2], "NORTH", reagentNiter, 0)
		createItemOnBeltLike(scene, util, [6, 1, 2], "NORTH", reagentGold, 0)
		hideSection(scene, util, [4, 2, 1, 6, 5, 1], "UP", 20);
		
		// Partie mixer
		createItemOnBeltLike(scene, util, basin1, "DOWN", catalystGem, 0);
		showSection(scene, util, blazeBurner, "DOWN", 5);
		showSection(scene, util, basin1, "DOWN", 5); 
		showSection(scene, util, mixer, "DOWN", 20);
		showCompound(scene, util, inFunnels, "DOWN", 3, 20);
		removeItemsFromBelt(scene, util, [4, 1, 2], 0);
		removeItemsFromBelt(scene, util, [6, 1, 2], 0);
		createItemOnBeltLike(scene, util, basin1, "DOWN", reagentNiter, 0);
		createItemOnBeltLike(scene, util, basin1, "DOWN", reagentGold, 0);
		flapFunnel(scene, util, inFunnels[0], false, 0);
		flapFunnel(scene, util, inFunnels[1], false, 20);
		
		showText(scene, util, 60,
			"Les deux §dReagents §fsont mixés, avec un §6Gemstone Catalyst§f,\ndans un Basin §6chauffé",
			[5.5, 2.5, 2], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(5.5, 2.5, 2), PonderPointing.LEFT).withItem(reagentNiter), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().of(5.5, 2.5, 2), PonderPointing.RIGHT).withItem(reagentGold), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().of(5.5, 2, 2), PonderPointing.UP).withItem(catalystGem), 30);
		scene.idle(40);
		
		hideCompound(scene, util, [[6, 2, 2], [6, 1, 2], [6, 1, 1]], "NORTH", 3, 20);
		rotateCameraY(scene, 20, 20);
		
		// Alimentation du blaze burner
		scene.addKeyframe();
		showSection(scene, util, depotFuel, "DOWN", 20);
		createItemOnBeltLike(scene, util, depotFuel, "SOUTH", coalBlock, 30);
		
		let input = AABB.of(3, 1, 5, 4, 1 + 13 / 16.0, 6);
		let output = AABB.of(5, 1, 2, 6, 2, 3);
		chaseBoundingBoxOutline(scene, PonderPalette.INPUT, input, 47, 10);
		chaseBoundingBoxOutline(scene, PonderPalette.OUTPUT, output, 40, 25);
		
		showSection(scene, util, arm, "UP", 15);
		indicateSuccess(scene, util, arm, 20);
				
		// Animation Arm to Blaze Burner
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_INPUT, emptyStack, 0, 32);
		removeItemsFromBelt(scene, util, depotFuel, 0);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_OUTPUTS, coalBlock, -1, 20);
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_OUTPUT, coalBlock, 0, 32);
		modifyBlock(scene, util, blazeBurner, "blaze", "kindled", 0);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_INPUTS, emptyStack, -1, 40);
		
		// Animation Mixing
		scene.addKeyframe();
		showSection(scene, util, outDepotMix, "NORTH", 0);
		modifyTileNBT(scene, util, mixer, { Running: true }, 20);
		showText(scene, util, 60,
			"Le résultat donne un §dDiamond §dReagent§f, et on récupère le §6Catalyst",
			[5.5, 2.5, 2.5], PonderPalette.WHITE, 80);
		restoreBlocks(scene, util, basin1, 0);
		hideCompound(scene, util, [mixer, arm, depotFuel], "UP", 3, 0);
		createItemOnBeltLike(scene, util, outDepotMix, "NORTH", catalystGem, 20);
		
		// Recyclage du Catalyst
		showCompound(scene, util, pipe, "DOWN", 3, 20);
		showText(scene, util, 60,
			"Le §6Catalyst §fest réinjecté\ndans le Basin via des Pipes",
			[4.5, 3.5, 2.5], PonderPalette.WHITE, 40);
		removeItemsFromBelt(scene, util, outDepotMix, 30);
		
		createItemOnBeltLike(scene, util, outDepotMix, "NORTH", reagentDiamond, 20);
		showText(scene, util, 60,
			"Le §dDiamond Reagent §fest envoyé dans la suite pour être transformé en Diamond",
			[5.5, 1 + 13 / 16.0, 3.5], PonderPalette.WHITE, 80);
		hideCompound(scene, util, pipe, "UP", 0, 3);
		hideCompound(scene, util, [[4, 2, 2], [4, 1, 2], [4, 1, 1]], "NORTH", 3, 0);
		hideCompound(scene, util, [basin1, blazeBurner], "UP", 3, 20);
		
		// Process diamond
		scene.addKeyframe();
		showSection(scene, util, inFunnelDReagent, "DOWN", 5);
		showSection(scene, util, machine, "DOWN", 20);
		
		// Filtre reagent
		rotateCameraY(scene, -20, 20);
		showFilterSlotInput(scene, util, [5+0.5, 2+0.7, 3+0.4], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(5 + 0.5, 2 + 0.7, 3 + 0.4), PonderPointing.DOWN).rightClick().withItem(reagentDiamond), 30);
		scene.idle(40);
		setFilterData(scene, util, inFunnelDReagent, FTE, reagentDiamond, 20);
		
		// Simulation machine
		removeItemsFromBelt(scene, util, outDepotMix, 0);
		flapFunnel(scene, util, inFunnelDReagent, false, 0);
		modifyBlock(scene, util, [5, 2, 4], "active", "true", 10);
		rotateCameraY(scene, 90, 40);
		
		showSection(scene, util, basin2, "DOWN", 5);
		showSection(scene, util, press, "DOWN", 5);
		showSection(scene, util, outDepot, "DOWN", 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(5, 2, 4), PonderPointing.DOWN).withItem(dDust), 30);
		scene.idle(40);
		
		modifyBlock(scene, util, [5, 2, 4], "active", "false", 0);
		createItemOnBeltLike(scene, util, basin2, "DOWN", dDust, 20);
		
		// Animation Press
		modifyTileNBT(scene, util, press, { Running: true }, 40);
		removeItemsFromBelt(scene, util, basin2, 0);
		createItemOnBeltLike(scene, util, outDepot, "NORTH", diamond, 20);
		
		// Vue finale
		scene.addKeyframe();
		for(let i = 0; i < 80; i++) {
			switch(i) {
				case 10: showCompound(scene, util, [depotFuel, arm, blazeBurner, basin1, mixer], "DOWN", 0, 0);
								 showCompound(scene, util, pipe, "DOWN", 0, 0);
								 showCompound(scene, util, inFunnels, "DOWN", 0, 0);
								 showCompound(scene, util, hoppers, "DOWN", 0, 0);
								 break;
				case 40: showSection(scene, util, gDustChest, "DOWN", 0);
							 	 showCompound(scene, util, reagentPart, "DOWN", 0, 0);
							 	 break;
				case 60: showCompound(scene, util, [nDustTransition, gDustProd], "DOWN", 0, 0);
								 showCompound(scene, util, niterPart, "DOWN", 0, 0);
								 break;
				default: break;
			}
			rotateCameraY(scene, -2, 1);
		}
		scene.idle(20);
		
		// Alimentation electrique
		showText(scene, util, 60, "Ne pas oublier d'alimenter\ntoutes les machines",
			[160], PonderPalette.WHITE, 40);
		showCompound(scene, util, energyCircuit, "SOUTH", 3, 20);
	})
	.scene("redstone_chaos", "Alchimie Chaotique: Redstone", "kubejs:ch4a_redstone", (scene, util) => {
		scene.configureBasePlate(0, 1, 5);
		scene.setSceneOffsetY(-.75);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let inMachines = [1, 2, 1, 2, 3, 1];
		let inChute = [2, 4, 1];
		let inBarrel = [1, 4, 1];
		let cartSetup = [[1, 3, 2], [1, 3, 3], [1, 3, 4],
			[1, 4, 5], [1, 4, 2], [1, 4, 3], [1, 4, 4], [1, 5, 3, 1, 6, 3]];
		let beltBack = [2, 2, 2, 2, 2, 4];
		let outFunnelBack = [2, 3, 4];
		let inFunnelBack = [2, 3, 2];
		let outMachines = [1, 2, 5, 2, 3, 5];
		let outDepot = [3, 3, 5];
		let misc = [[1, 4, 6], [1, 1, 2, 1, 2, 4],
			[2, 5, 2, 3, 6, 4], [0, 3, 1, 0, 3, 2], [1, 3, 0]];
		
		// Utilities
		let sand = Item.of("minecraft:sand");
		let dCobble = Item.of("create:diorite_cobblestone");
		let reagentDiorite = Item.of("kubejs:substrate_diorite");
		let catalystChaos = Item.of("kubejs:substrate_chaos");
		let reagentCinnabar = Item.of("kubejs:substrate_cinnabar");
		let cinnabar = Item.of("thermal:cinnabar");
		let redstone = Item.of("minecraft:redstone");
		
		// Conditions initiales
		replaceBlocks(scene, util, cartSetup[1], "minecraft:polished_diorite", false, 0);
		replaceBlocks(scene, util, cartSetup[3], "minecraft:polished_diorite", false, 0);
		
		// Intro
		showText(scene, util, 100, "ATTENTION !",
			[50], PonderPalette.RED, 10);
		showText(scene, util, 100,
			"Cette scène détaille un processus d'Alchimie Chaotique",
			[66], PonderPalette.OUTPUT, 10);
		showText(scene, util, 100,
			"La structure peut être utilisée par tout le monde MAIS…",
			[91], PonderPalette.OUTPUT, 10);
		showText(scene, util, 100,
			"La ressource d'entrée dépend de VOTRE Seed",
			[116], PonderPalette.OUTPUT, 110);
		
		// Inputs
		scene.addKeyframe();
		showSection(scene, util, inMachines, "DOWN", 5);
		showSection(scene, util, inChute, "DOWN", 20);
		
		// Animation arrivee Sand
		let sIE = createItemEntity(scene, util, [2.5, 7.5, 1.5], [0, 0.1, 0], sand, 15);
		modifyEntity(scene, sIE, e => e.kill(), 5);	
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 4, 1), PonderPointing.DOWN).withItem(sand), 30);
		scene.idle(40);
		
		modifyBlock(scene, util, [2, 3, 1], "active", "true", 0);
		let suiteMachines = AABB.of(1, 3, 1, 3, 4, 2);
		chaseBoundingBoxOutline(scene, PonderPalette.GREEN, suiteMachines, 70, 0);
		showText(scene, util, 60,
			"Mêmes machines qu'avant :\nLa première fait du Molten Glass\nLa deuxième fait un §dReagent",
			[1, 3.5, 1.5], PonderPalette.WHITE, 80);
			
		showSection(scene, util, inBarrel, "DOWN", 20);
		showText(scene, util, 60, "Point d'entrée de la ressource\nà transformer",
			[1, 4.5, 1.5], PonderPalette.WHITE, 70);
		showText(scene, util, 60, "Dans mon cas, de la\nDiorite Cobblestone",
			[82], PonderPalette.INPUT, 30);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 4, 1), PonderPointing.DOWN).withItem(dCobble), 30);
		scene.idle(40);
		modifyBlock(scene, util, [1, 3, 1], "active", "true", 10);
		rotateCameraY(scene, -20, 20);
		
		// Transformation au laser
		scene.addKeyframe();
		showCompound(scene, util, cartSetup, "DOWN", 3, 20);
		showText(scene, util, 60,
			"Pour la transformation, on reprend le setup au laser vu au Chapitre 4",
			[1, 3.5, 3.5], PonderPalette.WHITE, 55);
		
		let cart = scene.special().createCart(util.vector().topOf(1, 3, 2), 90, (w, x, y, z) => new HopperMinecart(w, x, y, z));
		scene.idle(25);
		
		showText(scene, util, 60,
			"Les §dReagents §fsont chargés\ndans un Minecart, avec un\n§6Chaos Catalyst",
			[1, 3.5, 2.5], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(1, 4.5, 2.5), PonderPointing.DOWN).withItem(reagentDiorite), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(1, 4.5, 2.5), PonderPointing.UP).withItem(catalystChaos), 30);
		scene.idle(50);
		
		// Animation Minecart
		indicateRedstone(scene, util, [1, 4, 2], 0);
		toggleRedstonePower(scene, util, [1, 4, 2], 0); 
		scene.special().moveCart(cart, [0, 0, 2], 40);
		scene.idle(20);
		indicateSuccess(scene, util, [1, 4, 3],  0); // Bim
		indicateSuccess(scene, util, [1, 5, 3], 20); // Boom
		toggleRedstonePower(scene, util, [1, 4, 2], 10); 
		
		// Resultat de transformation au laser
		showText(scene, util, 60,
			"Le résultat donne un §dCinnabar §dReagent§f, et on récupère le §6Catalyst",
			[1, 3.5, 4.5], PonderPalette.WHITE, 70);
		scene.overlay().showControls(new PonderInput(util.vector().of(1, 4.5, 4.5), PonderPointing.DOWN).withItem(reagentCinnabar), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(1, 4.5, 4.5), PonderPointing.UP).withItem(catalystChaos), 30);
		scene.idle(50);
		rotateCameraY(scene, 110, 45);
		
		// Recyclage Catalyst
		scene.addKeyframe();
		showSection(scene, util, beltBack, "UP", 5);
		showSection(scene, util, outFunnelBack, "DOWN", 5);
		showSection(scene, util, inFunnelBack, "DOWN", 20);
		showFilterSlotInput(scene, util, [2+0.6, 3+0.7, 4+0.5], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2 + 0.6, 3 + 0.7, 4 + 0.5), PonderPointing.DOWN).rightClick().withItem(catalystChaos), 30);
		scene.idle(40);
		setFilterData(scene, util, outFunnelBack, FTE, catalystChaos, 10);
		showText(scene, util, 60, "Le §6Chaos Catalyst §freboucle\npar derrière", 
			[2.5, 2 + 13 / 16.0, 3.5], PonderPalette.WHITE, 30);
		
		// Animation Catalyst + Travelling
		createItemOnBeltLike(scene, util, [2, 2, 4], "WEST", catalystChaos, 0);
		for(let i = 0; i < 90; i++) {
			if(i == 64) {
				removeItemsFromBelt(scene, util, [2, 2, 2], 0);
				flapFunnel(scene, util, inFunnelBack, false, 0);
			}
			rotateCameraY(scene, 1, 1);
		}
		scene.idle(20);
		
		// Traitement du Reagent de sortie
		scene.addKeyframe();
		showSection(scene, util, outMachines, "NORTH", 5);
		showSection(scene, util, outDepot, "NORTH", 20);
		showText(scene, util, 60, "Les machines du fond s'occupent du §dCinnabar Reagent",
			[2.5, 4, 5.5], PonderPalette.WHITE, 70);
		
		modifyBlock(scene, util, [1, 3, 5], "active", "true", 0);
		scene.overlay().showControls(new PonderInput(util.vector().of(1.5, 4, 6), PonderPointing.DOWN).withItem(reagentCinnabar), 30);
		scene.idle(35);
		modifyBlock(scene, util, [1, 3, 5], "active", "false", 0);
		
		modifyBlock(scene, util, [2, 3, 5], "active", "true", 0);
		scene.overlay().showControls(new PonderInput(util.vector().of(2.5, 4, 5.5), PonderPointing.DOWN).withItem(cinnabar), 30);
		scene.idle(35);
		modifyBlock(scene, util, [2, 3, 5], "active", "false", 0);
		
		createItemOnBeltLike(scene, util, outDepot, "WEST", redstone, 20);
		scene.overlay().showControls(new PonderInput(util.vector().of(3.5, 4, 5.5), PonderPointing.DOWN).withItem(redstone), 30);
		scene.idle(40);
		rotateCameraY(scene, 70, 35);
		
		// Ajout des elements du setup cart qu'on avait laisse de cote
		scene.addKeyframe();
		showText(scene, util, 60,
			"On reprend tous les systèmes de signaux pour gérer les timings",
			[150], PonderPalette.WHITE, 70);
		
		// Vue finale
		for(let i = 0; i < 110; i++) {
			switch(i) {
				case  0: showSection(scene, util, misc[0], "NORTH", 0); break;
				case 20: showSection(scene, util, misc[1],  "EAST", 0); break;
				case 40: showSection(scene, util, misc[2],  "DOWN", 0); break;
				case 60: showSection(scene, util, misc[3],  "EAST", 0); break;
				case 80: showSection(scene, util, misc[4], "SOUTH", 0); break;
				default: break;
			}
			rotateCameraY(scene, 1, 1);
		}
		scene.idle(20);
		showText(scene, util, 60, "Réglage: 45％ (4 Stacks)",
			[0.5, 4, 2.5], PonderPalette.INPUT, 60);
	})
	.scene("silicon_chaos", "Alchimie Chaotique: Silicon", "kubejs:ch4a_silicon", (scene, util) => {
		scene.configureBasePlate(0, 1, 5);
		scene.setSceneOffsetY(-.75);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let inMachines = [1, 2, 1, 2, 3, 1];
		let inChute = [2, 4, 1];
		let cartSetup = [[1, 3, 2], [1, 3, 3], [1, 3, 4],
			[1, 4, 5], [1, 4, 4], [1, 4, 3], [1, 4, 2], [1, 4, 1], [1, 5, 3, 1, 6, 3]];
		let beltBack = [2, 2, 2, 2, 2, 4];
		let outFunnelBack = [2, 3, 4];
		let inFunnelBack = [2, 3, 2];
		let misc = [[1, 4, 6], [1, 1, 2, 1, 2, 4],
			[2, 5, 2, 3, 6, 4], [0, 3, 1, 0, 3, 2], [1, 3, 0]];
		
		let outMachine = [1, 2, 5, 1, 3, 5];
		let depot = [2, 3, 5];
		let deployer = [2, 5, 5];
		let inFunnelSilicon = [2, 4, 5];
		let outDepot = [3, 4, 5];
		let toHide = [1, 4, 5, 1, 4, 6];
		
		// Utilities
		let sand = Item.of("minecraft:sand");
		let iDust = Item.of("thermal:iron_dust");
		let reagentIron = Item.of("kubejs:substrate_iron");
		let catalystChaos = Item.of("kubejs:substrate_chaos");
		let reagentSilicon = Item.of("kubejs:substrate_silicon");
		let silicon = Item.of("appliedenergistics2:silicon");
		let sPress = Item.of("appliedenergistics2:silicon_press");
		let printedS = Item.of("appliedenergistics2:printed_silicon");
		
		// Conditions initiales
		replaceBlocks(scene, util, cartSetup[1], "minecraft:iron_block", false, 0);
		replaceBlocks(scene, util, cartSetup[3], "minecraft:iron_block", false, 0);
		
		// Intro
		showText(scene, util, 100, "Encore ATTENTION !", [50], PonderPalette.RED, 10);
		showText(scene, util, 100,
			"Cette scène détaille un processus d'Alchimie Chaotique",
			[66], PonderPalette.OUTPUT, 10);
		showText(scene, util, 100,
			"La structure peut être utilisée par tout le monde MAIS…",
			[91], PonderPalette.OUTPUT, 10);
		showText(scene, util, 100,
			"La ressource d'entrée dépend de VOTRE Seed",
			[116], PonderPalette.OUTPUT, 120);
		
		scene.addKeyframe();
		showText(scene, util, 60, "La structure est globalement\nla même pour le Silicon",
			[141], PonderPalette.GREEN, 30);
		
		// Apparition de pratiquement tous les elements
		showCompound(scene, util, cartSetup, "DOWN", 3, 20);
		rotateCameraY(scene, 70, 35);
		
		showSection(scene, util, beltBack, "UP", 3);
		showSection(scene, util, outFunnelBack, "DOWN", 3);
		showSection(scene, util, inFunnelBack, "DOWN", 20);
		rotateCameraY(scene, -70, 35);
		
		showSection(scene, util, inMachines, "SOUTH", 3);
		showSection(scene, util, inChute, "SOUTH", 20);
		showSection(scene, util, misc[0], "NORTH", 3);
		showSection(scene, util, misc[1], "EAST", 3);
		showSection(scene, util, misc[2], "WEST", 20);
		
		// Animation arrivee Sand
		let sIE = createItemEntity(scene, util, [2.5, 7.5, 1.5], [0, 0.1, 0], sand, 15);
		modifyEntity(scene, sIE, e => e.kill(), 5);	
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 4, 1), PonderPointing.DOWN).withItem(sand), 30);
		scene.idle(40);
		
		modifyBlock(scene, util, [2, 3, 1], "active", "true", 0);
		
		// Arrivee Iron
		showText(scene, util, 60, "Point d'entrée de la ressource\nà transformer",
			[1, 4.5, 1.5], PonderPalette.WHITE, 70);
			
		showText(scene, util, 60, "Dans mon cas, de l'Iron Dust",
			[82], PonderPalette.INPUT, 30);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 4, 1), PonderPointing.DOWN).withItem(iDust), 30);
		scene.idle(40);
		
		modifyBlock(scene, util, [1, 3, 1], "active", "true", 20);
		rotateCameraY(scene, -20, 20);
		
		let cart = scene.special().createCart(util.vector().topOf(1, 3, 2), 90, (w, x, y, z) => new HopperMinecart(w, x, y, z));
		scene.idle(20);
		scene.overlay().showControls(new PonderInput(util.vector().of(1, 4.5, 2.5), PonderPointing.DOWN).withItem(reagentIron), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(1, 4.5, 2.5), PonderPointing.UP).withItem(catalystChaos), 30);
		scene.idle(50);
		
		// Animation Minecart
		indicateRedstone(scene, util, [1, 4, 2], 0);
		toggleRedstonePower(scene, util, [1, 4, 2], 0); 
		scene.special().moveCart(cart, [0, 0, 2], 40);
		scene.idle(20);
		indicateSuccess(scene, util, [1, 4, 3],  0); // Pif
		indicateSuccess(scene, util, [1, 5, 3], 20); // Paf
		toggleRedstonePower(scene, util, [1, 4, 2], 10); 
		
		// Resultat de transformation au laser
		showText(scene, util, 50, "On obtient un §dSilicon Reagent",
			[1, 3.5, 4.5], PonderPalette.WHITE, 50);
		scene.overlay().showControls(new PonderInput(util.vector().of(1, 4.5, 4.5), PonderPointing.DOWN).withItem(reagentSilicon), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(1, 4.5, 4.5), PonderPointing.UP).withItem(catalystChaos), 30);
		scene.idle(50);
		rotateCameraY(scene, -90, 40);
		
		showSection(scene, util, misc[4], "NORTH", 20);
		
		// Traitement sortie
		scene.addKeyframe();
		showSection(scene, util, outMachine, "UP", 20);
		showText(scene, util, 60, "La machine du fond s'occupe\ndu §dSilicon Reagent",
			[1.5, 3.5, 6], PonderPalette.WHITE, 70);
		
		// Animation machine silicon
		modifyBlock(scene, util, [1, 3, 5], "active", "true", 0);
		scene.overlay().showControls(new PonderInput(util.vector().of(1.5, 4, 6), PonderPointing.DOWN).withItem(reagentSilicon), 30);
		scene.idle(15);
		showSection(scene, util, depot, "UP", 20);
		modifyBlock(scene, util, [1, 3, 5], "active", "false", 0);
		
		createItemOnBeltLike(scene, util, depot, "WEST", silicon, 20);
		scene.overlay().showControls(new PonderInput(util.vector().of(2.5, 4, 5.5), PonderPointing.DOWN).withItem(silicon), 30);
		scene.idle(40);
		
		showText(scene, util, 60,
			"On transforme immédiatement\nle Silicon en Printed Silicon,\ncomme au Chapitre 4",
			[2.5, 3 + 13 / 16.0, 5.5], PonderPalette.WHITE, 70);
		showSection(scene, util, inFunnelSilicon, "DOWN", 5);
		showSection(scene, util, outDepot, "DOWN", 20);
		
		// Filtre funnel printed silicon
		hideSection(scene, util, toHide, "SOUTH", 0);
		rotateCameraY(scene, 20, 20);
		showFilterSlotInput(scene, util, [2+0.4, 4+0.7, 5+0.5], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2 + 0.4, 4 + 0.7, 5 + 0.5), PonderPointing.DOWN).rightClick().withItem(printedS), 30);
		scene.idle(40);
		setFilterData(scene, util, inFunnelSilicon, FTE, printedS, 10);
		rotateCameraY(scene, -20, 20);
		
		// Process en printed silicon
		showSection(scene, util, deployer, "DOWN", 20);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 5, 5), PonderPointing.DOWN).rightClick().withItem(sPress), 30);
		scene.idle(15);
		modifyTileNBT(scene, util, deployer, { HeldItem: sPress }, 25);
		
		// Animation deployer
		moveDeployer(scene, util, deployer, 1, 19, 20);
		removeItemsFromBelt(scene, util, depot, 0);
		createItemOnBeltLike(scene, util, depot, "DOWN", printedS, 0);
		moveDeployer(scene, util, deployer, -1, 19, 20);
		
		flapFunnel(scene, util, inFunnelSilicon, false, 0);
		removeItemsFromBelt(scene, util, depot, 0);
		createItemOnBeltLike(scene, util, outDepot, "WEST", printedS, 20);
		showSection(scene, util, toHide, "NORTH", 5);
		showSection(scene, util, misc[3], "DOWN", 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 4, 5), PonderPointing.DOWN).withItem(printedS), 30);
		scene.idle(40);
		
		for(let i = 0; i < 55; i++) 
			rotateCameraY(scene, 2, 1);
	})
	.scene("circuit_part", "Circuits & Processors", "kubejs:ch4a_circuit", (scene, util) => {
		// Scene un peu compliquee a lire, notamment parce que la premiere partie ne 
		// travaille que des sections independantes anonymes, et qu'on fait 3 animations
		// decalees pour rendre ça plus beau. Le principe est le meme que l'animation
		// du silver du chapitre 3a
		scene.setSceneOffsetY(-.75);
		scene.showBasePlate();
		scene.idle(20);
		
		// Partie Circuits ------------------------------------------------------------
		// Sections & Positions
		let redstoneCtrl1 = util.select().fromTo(1, 8, 1, 2, 8, 1);
		let inFarm1 = util.select().fromTo(3, 7, 1, 3, 8, 1);
		let melter1 = util.select().position(2, 7, 1);
		let fluidTank1 = util.select().position(2, 6, 1);
		let drain1 = util.select().position(1, 7, 1);
		let castTable1 = util.select().position(1, 6, 1);
		let outFarm1 = util.select().fromTo(0, 5, 1, 1, 5, 1);
		
		let redstoneCtrl2 = util.select().fromTo(1, 8, 2, 2, 8, 2);
		let inFarm2 = util.select().fromTo(3, 7, 2, 3, 8, 2);
		let melter2 = util.select().position(2, 7, 2);
		let fluidTank2 = util.select().position(2, 6, 2);
		let drain2 = util.select().position(1, 7, 2);
		let castTable2 = util.select().position(1, 6, 2);
		let outFarm2 = util.select().fromTo(0, 5, 2, 1, 5, 2);
		
		let redstoneCtrl3 = util.select().fromTo(1, 8, 3, 2, 8, 3);
		let inFarm3 = util.select().fromTo(3, 7, 3, 3, 8, 3);
		let melter3 = util.select().position(2, 7, 3);
		let fluidTank3 = util.select().position(2, 6, 3);
		let drain3 = util.select().position(1, 7, 3);
		let castTable3 = util.select().position(1, 6, 3);
		let outFarm3 = util.select().fromTo(0, 5, 3, 1, 5, 3);
		
		let inFluid = [[2, 5, 3], [2, 5, 2], [2, 5, 1], [3, 5, 1], [4, 5, 1]];
		let ft1 = [2, 6, 1], ft2 = [2, 6, 2], ft3 = [2, 6, 3]; // Fuel tanks
		let m1 = [2, 7, 1], m2 = [2, 7, 2], m3 = [2, 7, 3]; // Melters
		let d1 = [1, 7, 1], d2 = [1, 7, 2], d3 = [1, 7, 3]; // Drains or faucets
		let ct1 = [1, 6, 1], ct2 = [1, 6, 2], ct3 = [1, 6, 3]; // Casting Tables
		let yShift = [0, -4, 0];
		
		// Utilities
		let inputs = [Item.of("create:copper_ingot"), 
			Item.of("minecraft:gold_ingot"), 
			Item.of("minecraft:diamond")];
		let aePress = [Item.of("appliedenergistics2:calculation_processor_press"), 
			Item.of("appliedenergistics2:logic_processor_press"), 
			Item.of("appliedenergistics2:engineering_processor_press")];
		let pCalCircuit = Item.of("appliedenergistics2:printed_calculation_processor");
		let pLogCircuit = Item.of("appliedenergistics2:printed_logic_processor");
		let pEngCircuit = Item.of("appliedenergistics2:printed_engineering_processor");
		let circuits = [pCalCircuit, pLogCircuit, pEngCircuit];
		let fuel = "tconstruct:blazing_blood";
		let mCopp = "tconstruct:molten_copper";
		let mGold =	"tconstruct:molten_gold"; 
		let mDiam = "tconstruct:molten_diamond";
		let IS;
		let indySects = [], pipeIndySects = [];
		
		// Conditions initiales
		scene.world().setKineticSpeed(util.select().position(3, 5, 1), 16);
		// Melter - Ni liquide, ni item a fondre 
		// FluidTank - Pas de liquide dans le tank
		// Drain - Pas de liquide qui coule 
		// CastTable - Ni liquide, ni cast sur la table
		for(let z = 1; z <= 3; z++) {
			// 1 = Ligne copper, 2 = Ligne Gold, 3 = Ligne Diamond
			modifyTileNBT(scene, util, [2, 6, z], { tank: { Amount: 0 }}, 0);
			modifyTileNBT(scene, util, [2, 7, z], { 
				inventory: { items: [new CompoundNBT(), new CompoundNBT(), new CompoundNBT()]},
				tank: { Amount: 0 }
			}, 0);
			modifyTileNBT(scene, util, [1, 7, z], { render_fluid: { Amount: 0 }}, 0);
			modifyTileNBT(scene, util, [1, 6, z], { 
				Items: [new CompoundNBT()],
				tank: { fluid: { Amount: 0 }}
			}, 0);
			modifyBlock(scene, util, [2, 7, z], "active", "false", 0);
		}
		
		// On reprend le setup du Silver du chapitre 3a
		// Inputs
		IS = scene.world().showIndependentSection(fluidTank1.add(melter1), "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 3);
		IS = scene.world().showIndependentSection(fluidTank2.add(melter2), "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 3);
		IS = scene.world().showIndependentSection(fluidTank3.add(melter3), "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 20);
		
		showText(scene, util, 80,
			"Chaque circuit doit être moulé, donc on fait fondre la ressouce associée",
			[2, 3.5, 2.5], PonderPalette.WHITE, 100);
		
		IS = scene.world().showIndependentSection(inFarm1, "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 3);
		IS = scene.world().showIndependentSection(inFarm2, "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 3);
		IS = scene.world().showIndependentSection(inFarm3, "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 20);
		
		for(let z = 1; z <= 3; z++) {
			scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 4, z), PonderPointing.DOWN).withItem(inputs[z-1]), 30);
			scene.idle(15);
			restoreBlocks(scene, util, [2, 7, z], 0);
			modifyBlock(scene, util, [2, 7, z], "active", "false", 0);
			modifyTileNBT(scene, util, [2, 7, z], { tank: { Amount: 0 }}, 0);
		}
		scene.idle(35);
		
		// Animation Fuel Tank
		scene.addKeyframe();
		inFluid.forEach(p => {
			let s = util.select().position(p[0], p[1], p[2]);
			IS = scene.world().showIndependentSection(s, "WEST");
			pipeIndySects.push(IS);
			moveSection(scene, util, IS, yShift, 0, 3);
		});
		scene.idle(17);
		
		showText(scene, util, 60, "Les Melters sont alimentés\nen Blazing Blood",
			[2, 2.5, 2.5], PonderPalette.WHITE, 30);
			
		let volFT1 = volFT2 = volFT3 = 0;
		for(let i = 0; i < 60; i++) {
			if(i <  40) volFT1 += 100;
			if(i >= 10 && i < 50) volFT2 += 100;
			if(i >= 20) volFT3 += 100;
			modifyTileNBT(scene, util, ft1, { tank:{ FluidName: fuel, Amount: volFT1 }}, 0);
			modifyTileNBT(scene, util, ft2, { tank:{ FluidName: fuel, Amount: volFT2 }}, 0);
			modifyTileNBT(scene, util, ft3, { tank:{ FluidName: fuel, Amount: volFT3 }}, 1);
		}
		modifyBlock(scene, util, m1, "active", "true", 40);
		
		// Animation fonte de l'ingot
		let volM1 = volM2 = volM3 = 0;
		for(let i = 0; i < 68; i++) {
			if(i < 48) volM1 += 27; 
			if(i >= 10 && i < 58)	volM2 += 27; 
			if(i >= 20) volM3 += 27; 
			modifyTileNBT(scene, util, m1, { tank: { FluidName: mCopp, Amount: volM1 }}, 0);
			modifyTileNBT(scene, util, m2, { tank: { FluidName: mGold, Amount: volM2 }}, 0);
			modifyTileNBT(scene, util, m3, { tank: { FluidName: mDiam, Amount: volM3 }}, 1);
		}
		modifyBlock(scene, util, m1, "active", "false", 0);
		scene.world().modifyTileNBT(melter1.add(melter2).add(melter3), { inventory: { items: [new CompoundNBT(), new CompoundNBT(), new CompoundNBT()]}});
		scene.idle(22);
		
		// Config Casting Table
		scene.addKeyframe();
		IS = scene.world().showIndependentSection(castTable1, "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 3);
		IS = scene.world().showIndependentSection(castTable2, "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 3);
		IS = scene.world().showIndependentSection(castTable3, "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 20);
		
		showText(scene, util, 60,
			"Chaque Circuit a son propre moule. En l'occurence, les Press AE2…",
			[120], PonderPalette.GREEN, 70);	
		
		let castName = [" Calculation ", " Logic ", " Engineering "];
		for(let z = 1; z <= 3; z++) {
			scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 2, z), PonderPointing.DOWN).rightClick().withItem(aePress[z-1]), 30);
			showText(scene, util, 50, "Inscriber" + castName[z-1] + "Press",
				[120], PonderPalette.INPUT, 40);
			restoreBlocks(scene, util, [1, 6, z], 0);
			modifyTileNBT(scene, util, [1, 6, z], { tank: { fluid: { Amount: 0 }}}, 20);
		}
		
		// Drain et Redstone
		IS = scene.world().showIndependentSection(drain1, "EAST");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 3);
		IS = scene.world().showIndependentSection(redstoneCtrl1, "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 3);
		IS = scene.world().showIndependentSection(drain2, "EAST");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 3);
		IS = scene.world().showIndependentSection(redstoneCtrl2, "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 3);
		IS = scene.world().showIndependentSection(drain3, "EAST");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 3);
		IS = scene.world().showIndependentSection(redstoneCtrl3, "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 20);
		
		// Animation Casting x3
		scene.addKeyframe();
		volM1 = volM2 = volM3 = 1296;
		let volCT1 = volCT2 = volCT3 = 0;
		for(let i = 0; i <= 68; i++) {
			// Gestion des faucets
			switch(i) { 
				case 0 : toggleRedstonePower(scene, util, [1, 8, 1], 0);
								 indicateRedstone(scene, util, [1, 4, 1], 0);
								 restoreBlocks(scene, util, d1, 0); 
								 break;
				case 10: toggleRedstonePower(scene, util, [1, 8, 2], 0);
								 indicateRedstone(scene, util, [1, 4, 2], 0);
								 restoreBlocks(scene, util, d2, 0); 
								 break; 
				case 20: toggleRedstonePower(scene, util, [1, 8, 3], 0);
								 indicateRedstone(scene, util, [1, 4, 3], 0);
								 restoreBlocks(scene, util, d3, 0); 
								 break; 
				case 48: toggleRedstonePower(scene, util, [1, 8, 1], 0);
								 modifyTileNBT(scene, util, d1, { render_fluid: { Amount: 0 }}, 0); 
								 break;
				case 58: toggleRedstonePower(scene, util, [1, 8, 2], 0);
								 modifyTileNBT(scene, util, d2, { render_fluid: { Amount: 0 }}, 0); 
								 break;
				case 68: toggleRedstonePower(scene, util, [1, 8, 3], 0);
								 modifyTileNBT(scene, util, d3, { render_fluid: { Amount: 0 }}, 0); 
								 break;
				default: break;
			}
			// Gestion des Melters et des Casting Tables
			if(i < 48) { volM1 -= 27; volCT1 += 3; }
			if(i >= 10 && i < 58) { volM2 -= 27; volCT2 += 3; }
			if(i >= 20 && i < 68) { volM3 -= 27; volCT3 += 3; }
			modifyTileNBT(scene, util, m1, { tank: { Amount: volM1 }}, 0);
			modifyTileNBT(scene, util, m2, { tank: { Amount: volM2 }}, 0);
			modifyTileNBT(scene, util, m3, { tank: { Amount: volM3 }}, 0);
			modifyTileNBT(scene, util, ct1, { tank: { fluid: { FluidName: mCopp, Amount: volCT1 }}}, 0);
			modifyTileNBT(scene, util, ct2, { tank: { fluid: { FluidName: mGold, Amount: volCT2 }}}, 0);
			modifyTileNBT(scene, util, ct3, { tank: { fluid: { FluidName: mDiam, Amount: volCT3 }}}, 1);
		}
		scene.idle(54);
		
		// Outputs
		IS = scene.world().showIndependentSection(outFarm1, "EAST");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 3);
		IS = scene.world().showIndependentSection(outFarm2, "EAST");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 3);
		IS = scene.world().showIndependentSection(outFarm3, "EAST");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 69); // Circuit: 150 ticks Cooling Time
		
		for(let z = 1; z <= 3; z++) 
			indicateSuccess(scene, util, [1, 2, z], 10);
		scene.idle(10);
		for(let z = 1; z <= 3; z++) {
			restoreBlocks(scene, util, [1, 6, z], 0);
			modifyTileNBT(scene, util, [1, 6, z], { tank: { fluid: { Amount: 0 }}}, 10);
		}		
		for(let z = 1; z <= 3; z++) {
			scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 1, z), PonderPointing.DOWN).withItem(circuits[z-1]), 30);
			scene.idle(15);
		}
		scene.idle(35);
		
		indySects.forEach(s => scene.world().hideIndependentSection(s, "UP"));
		pipeIndySects.forEach(s => scene.world().hideIndependentSection(s, "UP"));
		scene.idle(20);
		
		// Partie Processors ----------------------------------------------------------
		// Sections & Positions
		let machine = [1, 1, 3, 1, 2, 3];
		let redstoneChest = [1, 3, 3];
		let tank = [2, 1, 3, 2, 3, 3];
		let inFunnel = [0, 2, 1];
		let press = [1, 3, 1];
		let spout = [2, 3, 1];
		let deployer = [3, 3, 1];
		let pump = [2, 3, 2];
		
		// Utilities
		let drBucket = Item.of("thermal:redstone_bucket");
		let printedS = Item.of("appliedenergistics2:printed_silicon");
		let iCalProc = Item.of("kubejs:incomplete_calculation_processor");
		let calProc = Item.of("appliedenergistics2:calculation_processor");
		let logProc = Item.of("appliedenergistics2:logic_processor");
		let engProc = Item.of("appliedenergistics2:engineering_processor");
		let emptyStack = Item.getEmpty();
		
		// Conditions initiales
		modifyTileNBT(scene, util, [2, 1, 3], { TankContent: { Amount: 0 }}, 0);
		modifyTileNBT(scene, util, spout, { Tanks: [{ 
			Level:{ Value: 0.001 }, 
			TankContent:{ Amount: 1 }
		}]}, 0);
		modifyTileNBT(scene, util, press, { Mode: 1 }, 0); // Mode BELT
		setKineticSpeed(scene, util, pump, 16, 0);
		
		// Production de Destabilized Redstone via la Redstone
		scene.addKeyframe();
		showSection(scene, util, machine, "DOWN", 20);
		showSection(scene, util, redstoneChest, "DOWN", 20);
		
		// Arrivee Redstone
		modifyBlock(scene, util, [1, 2, 3], "active", "true", 0);
		showText(scene, util, 60, "La Redstone est transformée\nen Destabilized Redstone",
			[1.5, 2.5, 3], PonderPalette.WHITE, 70);
		showSection(scene, util, tank, "DOWN", 10);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 3, 3), PonderPointing.DOWN).withItem(drBucket), 30);
		for(let vol = 500; vol <= 24000; vol += 500) {
			modifyTileNBT(scene, util, [2, 1, 3], { 
				TankContent: { FluidName:"thermal:redstone", Amount: vol }
			}, 1);
		}
		
		showText(scene, util, 60,
			"Ensuite, une ligne d'assemblage\npar Circuit, pour fabriquer le Processor associé",
			[120], PonderPalette.WHITE, 70);
		
		// Apparition de tous les elements
		scene.addKeyframe();
		showSection(scene, util, [0, 1, 1, 4, 1, 1], "DOWN", 5);
		showSection(scene, util, [4, 2, 2], "DOWN", 5);
		showSection(scene, util, [0, 2, 2], "DOWN", 15);
		showSection(scene, util, [4, 2, 1], "DOWN", 5);
		showSection(scene, util, inFunnel, "DOWN", 15);
		
		for(let x = 1; x <= 3; x++) 
			showSection(scene, util, [x, 3, 1], "DOWN", 5);
		showSection(scene, util, pump, "DOWN", 15);
		rotateCameraY(scene, 70, 35);
		
		// Un circuit dans le Deployer, Redstone dans le Spout
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 3, 1), PonderPointing.DOWN).withItem(pCalCircuit), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 3, 1), PonderPointing.DOWN).withItem(drBucket), 30);
		scene.idle(30);
		
		modifyTileNBT(scene, util, deployer, { HeldItem: pCalCircuit }, 10);
		restoreBlocks(scene, util, spout, 15);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(4, 2, 2), PonderPointing.DOWN).withItem(printedS), 30);
		scene.idle(40);
		
		// Sequenced Assembly de Circuit vers Processor
		scene.addKeyframe();
		let sequence = createItemOnBelt(scene, util, [4, 1, 1], "SOUTH", printedS, 32);
		
		moveDeployer(scene, util, deployer, 1, 19, 20);
		changeBeltItemTo(scene, sequence, iCalProc, 0);
		stallBeltItem(scene, sequence, false, 0);
		modifyTileNBT(scene, util, deployer, { HeldItem: emptyStack }, 0);
		moveDeployer(scene, util, deployer, -1, 19, 5);
		
		// Idle 25 + Travelling
		for(let i = 0; i < 25; i++) 
			rotateCameraY(scene, -1, 1);
		stallBeltItem(scene, sequence, true, 0);
		modifyTileNBT(scene, util, spout, { ProcessingTicks: 20 }, 0);
		
		// Idle 20 + Travelling
		for(let i = 0; i < 20; i++) 
			rotateCameraY(scene, -1, 1);
		stallBeltItem(scene, sequence, false, 0);
		
		// Idle 25 + Travelling
		for(let i = 0; i < 25; i++)
			rotateCameraY(scene, -1, 1);
		scene.idle(5);
		
		stallBeltItem(scene, sequence, true, 0);
		modifyTileNBT(scene, util, press, { Running: true }, 40);
		changeBeltItemTo(scene, sequence, calProc, 0);
		stallBeltItem(scene, sequence, false, 30);
		
		removeItemsFromBelt(scene, util, [0, 1, 1], 0);
		flapFunnel(scene, util, inFunnel, false, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 2, 2), PonderPointing.DOWN).withItem(calProc), 30);
		scene.idle(40);
		
		// Conclusion pour les autres Processors
		scene.addKeyframe();
		for(let x = 3; x >= 1; x--)
			showSection(scene, util, [x, 1, 0], "SOUTH", 5);
		createItemOnBeltLike(scene, util, [3, 1, 0], "NORTH", calProc, 20);
		showText(scene, util, 60, "Le principe est le même pour les deux autres Processors",
			[150], PonderPalette.OUTPUT, 70);
		rotateCameraY(scene, 35, 25);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(4, 2, 2), PonderPointing.DOWN).withItem(printedS), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 3, 1), PonderPointing.DOWN).withItem(pLogCircuit), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 3, 1), PonderPointing.DOWN).withItem(drBucket), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 2, 2), PonderPointing.DOWN).withItem(logProc), 30);
		scene.idle(20);
		createItemOnBeltLike(scene, util, [2, 1, 0], "NORTH", logProc, 40);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(4, 2, 2), PonderPointing.DOWN).withItem(printedS), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 3, 1), PonderPointing.DOWN).withItem(pEngCircuit), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 3, 1), PonderPointing.DOWN).withItem(drBucket), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 2, 2), PonderPointing.DOWN).withItem(engProc), 30);
		scene.idle(20);
		createItemOnBeltLike(scene, util, [1, 1, 0], "NORTH", engProc, 20);
		rotateCameraY(scene, -35, 0);
	})
	.scene("overview_4a", "Usine complète", "kubejs:ch4a_overview", (scene, util) => {
		scene.configureBasePlate(1, 0, 16);
		scene.setSceneOffsetY(-2.5);
		scene.scaleSceneView(0.45);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let niterLign = [[3, 3, 9, 7, 3, 9], [4, 2, 9, 6, 2, 9],
			[5, 2, 8, 5, 3, 8], [5, 2, 10, 5, 3, 10]];
		let diamondLign = [[1, 1, 13, 9, 4, 14], [6, 2, 12, 8, 5, 12],
			[7, 2, 10, 7, 3, 11], [3, 5, 13, 8, 5, 14], [6, 2, 10, 6, 2, 11]];
		let copperLign = [[3, 2, 5, 6, 3, 5], [1, 4, 5, 2, 4, 5],
			[6, 2, 4, 6, 3, 4], [7, 1, 4, 9, 5, 6], [7, 2, 7, 7, 3, 8],
			[6, 2, 7, 6, 2, 8], [1, 1, 5, 1, 3, 5], [2, 3, 5]];
		let ironFarm1 = [[1, 1, 11, 5, 3, 11], [3, 2, 12, 3, 3, 12], [3, 2, 10, 3, 3, 10],
			[1, 4, 12, 3, 5, 10], [6, 3, 10, 6, 3, 11], [4, 3, 12, 5, 3, 12],
			[2, 6, 11], [3, 6, 10]];
		let ironFarm2 = [[1, 1, 7, 5, 3, 7], [3, 2, 6, 3, 3, 6], [3, 2, 8, 3, 3, 8],
			[1, 4, 6, 3, 5, 8], [4, 3, 6, 5, 3, 6], [6, 3, 6, 6, 3, 8],
			[2, 6, 7], [3, 6, 8]];
		let goldFarm1 = [[8, 1, 11, 8, 9, 11], [7, 9, 11, 2, 9, 11],
			[7, 8, 11, 3, 8, 11], [5, 4, 10, 5, 9, 10], [5, 8, 12, 5, 9, 12],
			[3, 10, 11, 3, 12, 12], [7, 9, 11, 7, 12, 11], [7, 8, 12, 7, 12, 12],
			[3, 6, 11, 3, 7, 11], [4, 10, 10, 2, 10, 11], [8, 10, 10, 6, 10, 11]];
		let goldFarm2 = [[8, 1, 7, 8, 9, 7], [7, 9, 7, 2, 9, 7],
			[7, 8, 7, 3, 8, 7], [5, 8, 6, 5, 9, 6], [5, 4, 8, 5, 9, 8],
			[3, 10, 7, 3, 12, 6], [7, 10, 7, 7, 12, 7], [7, 8, 6, 7, 12, 6],
			[3, 6, 7, 3, 7, 7], [8, 10, 8, 6, 10, 7], [4, 10, 8, 2, 10, 7]];
		let endGF1 = [[1, 1, 9, 1, 8, 9], [2, 8, 9, 2, 8, 11]];
		let endGF2 = [[2, 9, 8, 3, 9, 9], [3, 8, 9, 8, 9, 9]];
		let gDustChest = [7, 2, 15, 7, 3, 15];
		let dioriteLift = [10, 1, 9, 10, 8, 9];
		let iDustProd = [[10, 9, 9, 10, 12, 9], [8, 2, 9, 8, 8, 9], [9, 8, 9, 9, 10, 9]];
		let siliconChaos = [[12, 6, 14, 9, 12, 10], [8, 2, 10, 12, 2, 10], [12, 2, 11, 12, 5, 11]];
		let redstoneChaos = [[12, 6, 4, 9, 12, 8], [8, 2, 8, 12, 2, 8], [12, 2, 7, 12, 5, 7]];
		let sandProd1 = [[11, 9, 7, 17, 9, 11], [15, 10, 7, 17, 11, 11],
			[11, 8, 9, 16, 8, 9], [12, 6, 9, 12, 7, 9], [13, 7, 7, 15, 8, 8],
			[13, 8, 10, 15, 8, 10]];
		let sandProd2 = [[0, 8, 11, 1, 10, 15], [2, 9, 12, 2, 9, 14],
			[3, 8, 12, 3, 9, 12], [3, 8, 14, 5, 9, 14], [4, 6, 13, 3, 7, 14],
			[2, 5, 13, 2, 7, 13], [2, 8, 13, 5, 8, 13], [6, 6, 13, 7, 9, 13]];
		let sandProd3 = [[0, 8, 3, 1, 10, 7], [2, 9, 4, 2, 9, 6],
			[3, 8, 6, 3, 9, 6], [3, 8, 4, 5, 9, 4], [2, 8, 5, 5, 8, 5], [6, 6, 5, 7, 9, 5]];
		let seqAssembly = [[1, 1, 0, 12, 7, 3], [2, 2, 4, 2, 2, 6]];
		
		let energyPipes = util.select().position(4, 2, 13)
			.add(util.select().position(10, 7, 14))
			.add(util.select().fromTo(8, 3, 12, 8, 5, 14))
			.add(util.select().fromTo(8, 3, 4, 8, 5, 6))
			.add(util.select().fromTo(3, 2, 5, 5, 2, 5))
			.add(util.select().fromTo(10, 7, 10, 11, 7, 10))
			.add(util.select().fromTo(10, 7, 8, 11, 7, 8))
			.add(util.select().fromTo(10, 7, 4, 11, 7, 4))
			.add(util.select().fromTo(12, 1, 0, 12, 1, 2))
			.substract(util.select().position(8, 4, 5));
		
		// Utilities	
		let energyCircuit1 = 
		 [[4, 3, 5],   // Magma Crucible
			[7, 3, 12],  // Fluid Encapsulator
			[7, 3, 14],  // Fluid Encapsulator
			[7, 3, 4],   // Fluid Encapsulator
			[7, 3, 6],   // Fluid Encapsulator
			[10, 8, 10], // Fluid Encapsulator 
			[10, 8, 8]]; // Fluid Encapsulator
		let energyCircuit2 =
		 [[10, 8, 14], // Reagent Extractor x2
			[10, 8, 4],  // Reagent Extractor x2
			[4, 3, 13],  // Reagent Extractor x2
			[5, 3, 5],   // Reagent Extractor x2
			[3, 3, 5]];  // Blast Chiller x2
		let energyCircuit3 =
		 [[11, 8, 8],  // Magma Crucible x3
			[11, 8, 10], // Magma Crucible x3
			[7, 5, 4],   // Magma Crucible x3
			[7, 5, 6],   // Magma Crucible x3
			[7, 5, 12],  // Magma Crucible x3
			[7, 5, 14]]; // Magma Crucible x3
		let energyCircuit4 = 
		 [[11, 8, 4],  // Pulverizer x4
			[12, 2, 0],  // Magma Crucible x4
			[12, 2, 2]]; // Magma Crucible x4
		let generatorCircuit = 
		 [[16, 10, 9], // Igneous Extruder x3
			[1, 9, 5],   // Igneous Extruder x3
			[5, 3, 7],   // Igneous Extruder x3
			[5, 3, 11],  // Igneous Extruder x3
			[1, 9, 13]]; // Igneous Extruder x3		 
		let mVectorsGenerators = [
			util.vector().topOf(16, 9, 9),  // Igneous Extruder x3 
			util.vector().topOf(1, 9, 5),   // Igneous Extruder x3
			util.vector().topOf(5, 3, 7),   // Igneous Extruder x3
			util.vector().topOf(5, 3, 11),  // Igneous Extruder x3
			util.vector().topOf(1, 9, 13)   // Igneous Extruder x3
		];
		
		let nWart = Item.of("minecraft:nether_wart");		
		let HIC = Item.of("thermal:upgrade_augment_1");
		let ReIC= Item.of("thermal:upgrade_augment_2");
		let RIC = Item.of("thermal:upgrade_augment_3");
		
		// Conditions initiales
		modifyTileNBT(scene, util, [2, 4, 0], { Value: 1 }, 0);
		
		showText(scene, util, 60,
			"Pour des raisons de visibilité, l'usine sera présentée de bas\nen haut",
			[50], PonderPalette.GREEN, 70);
		rotateCameraY(scene, -20, 20);
		
		scene.addKeyframe();
		showCompound(scene, util, niterLign, "DOWN", 0, 20);
		showText(scene, util, 40, "Crushing du Niter",
			[5.5, 4, 9.5], PonderPalette.WHITE, 50);
		
		scene.addKeyframe();
		showCompound(scene, util, diamondLign, "DOWN", 0, 20);
		showText(scene, util, 60, "Fabrication de Diamond",
			[1, 1.5, 13.5], PonderPalette.WHITE, 70);
		
		scene.addKeyframe();
		showCompound(scene, util, copperLign, "DOWN", 0, 20);
		showText(scene, util, 60, "Fabrication de Copper",
			[1, 1.5, 5.5], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(6, 3, 4), PonderPointing.DOWN).withItem(nWart), 30);
		scene.idle(40);
		
		scene.addKeyframe();
		showCompound(scene, util, ironFarm1, "DOWN", 0, 20);
		showCompound(scene, util, ironFarm2, "DOWN", 0, 20);
		showText(scene, util, 60, "Deux lignes de production d'Iron",
			[180], PonderPalette.WHITE, 10);
		showText(scene, util, 60,
			"Rappel: L'Iron est utile pour MON alchimie Chaotique",
			[200], PonderPalette.RED, 70);
		
		scene.addKeyframe();
		showCompound(scene, util, goldFarm1, "DOWN", 0, 20);
		showText(scene, util, 60, "Une ligne de production de Gold…",
			[2, 9.5, 11.5], PonderPalette.WHITE, 70);
		showCompound(scene, util, endGF1, "EAST", 0, 20);
		showText(scene, util, 40, "…Pour les Circuits",
			[1, 1.5, 9.5], PonderPalette.WHITE, 50);
		rotateCameraY(scene, -70, 35);
		
		scene.addKeyframe();
		showCompound(scene, util, goldFarm2, "DOWN", 0, 20);
		showText(scene, util, 60, "Une autre ligne de production de Gold…",
			[2, 9.5, 7.5], PonderPalette.WHITE, 70);
		showCompound(scene, util, endGF2, "EAST", 0, 20);
		showSection(scene, util, gDustChest, "DOWN", 20);
		showText(scene, util, 60, "…Pour la fabrication de Diamond",
			[7.5, 3.5, 16], PonderPalette.WHITE, 70);
		rotateCameraY(scene, -110, 45);
		
		scene.addKeyframe();
		showCompound(scene, util, iDustProd, "WEST", 0, 20);
		showText(scene, util, 60, "Crushing de l'Iron pour l'alchimie Chaotique",
			[10.5, 10.5, 10], PonderPalette.WHITE, 70);
		
		showCompound(scene, util, siliconChaos, "DOWN", 0, 10);
		let cartSilicon = scene.special().createCart(util.vector().topOf(10, 8, 11), 90, (w, x, y, z) => new HopperMinecart(w, x, y, z));
		scene.idle(10);
		showText(scene, util, 60, "§dAlchimie Chaotique§f: Silicon",
			[13, 6.5, 14.5], PonderPalette.WHITE, 70);
		rotateCameraY(scene, -70, 35);
		
		scene.addKeyframe();
		showSection(scene, util, dioriteLift, "WEST", 20);
		showText(scene, util, 60, "Arrivée de la Diorite",
			[10.5, 8 + 13 / 16.0, 9.5], PonderPalette.WHITE, 10);
		showText(scene, util, 60,
			"Rappel: La Diorite est utile pour MON alchimie Chaotique",
			[200], PonderPalette.RED, 70);
		
		showCompound(scene, util, redstoneChaos, "DOWN", 0, 10);
		let cartRedstone = scene.special().createCart(util.vector().topOf(10, 8, 7), 90, (w, x, y, z) => new HopperMinecart(w, x, y, z));
		scene.idle(10);
		showText(scene, util, 60, "§dAlchimie Chaotique§f: Redstone",
			[13, 6.5, 4.5], PonderPalette.WHITE, 70);
		rotateCameraY(scene, 70, 35);
		
		scene.addKeyframe();
		showText(scene, util, 60, "Et maintenant, du Sand", [136], PonderPalette.OUTPUT, 5);
		showText(scene, util, 60, "Beaucoup de Sand", [152], PonderPalette.OUTPUT, 5);
		showText(scene, util, 60, "Genre, au moins…", [168], PonderPalette.OUTPUT, 5);
		showText(scene, util, 60, "Trois lignes de Sand", [184], PonderPalette.OUTPUT, 70);
		
		showCompound(scene, util, sandProd1, "DOWN", 0, 20);
		rotateCameraY(scene, 90, 40);
		showCompound(scene, util, sandProd2, "DOWN", 0, 20);
		rotateCameraY(scene, 90, 40);
		showCompound(scene, util, sandProd3, "DOWN", 0, 40);
		rotateCameraY(scene, 20, 30);
		
		scene.addKeyframe();
		showCompound(scene, util, seqAssembly, "SOUTH", 0, 20);
		showText(scene, util, 60, "Ligne d'assemblage\ndes Processors",
			[4.5, 3.5, 0], PonderPalette.WHITE, 70);
		
		// Info alimentation electrique
		scene.addKeyframe();
		scene.world().hideSection(
			util.select().everywhere()
				.substract(energyPipes)
				.substract(util.select().layer(0)), 
			"UP");
		scene.special().hideElement(cartSilicon, "UP");
		scene.special().hideElement(cartRedstone, "UP");
		scene.idle(20);
		
		showCompound(scene, util, energyCircuit1, "DOWN", 0, 40);
		showCompound(scene, util, energyCircuit2, "DOWN", 0, 20);
		energyCircuit2.forEach(p => {
			let v = util.vector().topOf(p[0], p[1], p[2]);
			let bb = AABB.ofBlock(util.grid().at(p[0], p[1], p[2]));
			scene.overlay().showControls(new PonderInput(v, PonderPointing.DOWN).withItem(HIC), 30);
			chaseBoundingBoxOutline(scene, PonderPalette.RED, bb, 30, 3);
		});
		scene.idle(50);
		rotateCameraY(scene, -35, 25);
		
		scene.addKeyframe();
		showCompound(scene, util, energyCircuit3, "DOWN", 0, 20);
		energyCircuit3.forEach(p => {
			let v = util.vector().topOf(p[0], p[1], p[2]);
			let bb = AABB.ofBlock(util.grid().at(p[0], p[1], p[2]));
			scene.overlay().showControls(new PonderInput(v, PonderPointing.DOWN).withItem(ReIC), 30);
			chaseBoundingBoxOutline(scene, PonderPalette.WHITE, bb, 30, 3);
		});
		scene.idle(50);
		
		scene.addKeyframe();
		showCompound(scene, util, energyCircuit4, "DOWN", 0, 20);
		energyCircuit4.forEach(p => {
			let v = util.vector().topOf(p[0], p[1], p[2]);
			let bb = AABB.ofBlock(util.grid().at(p[0], p[1], p[2]));
			scene.overlay().showControls(new PonderInput(v, PonderPointing.DOWN).withItem(RIC), 30);
			chaseBoundingBoxOutline(scene, PonderPalette.GREEN, bb, 30, 3);
		});
		scene.idle(50);
		rotateCameraY(scene, -20, 20);
		
		scene.addKeyframe();
		let i = 0;
		showCompound(scene, util, generatorCircuit, "DOWN", 0, 20);
		generatorCircuit.forEach(p => {
			let bb = AABB.ofBlock(util.grid().at(p[0], p[1], p[2]));
			scene.overlay().showControls(new PonderInput(mVectorsGenerators[i], i == 0 ? PonderPointing.UP : PonderPointing.DOWN).withItem(ReIC), 30);
			chaseBoundingBoxOutline(scene, PonderPalette.WHITE, bb, 30, 3);
			i++;
		});
		scene.idle(50);
		rotateCameraY(scene, 55, 30);
		
		showText(scene, util, 60, "Energy Use:", [166], PonderPalette.WHITE, 10);
		showText(scene, util, 60, "2560 RF/t", [182], PonderPalette.FAST, 80);
		
		// On fait tout reapparaitre sauf ce qui est deja present
		scene.world().showSection(util.select().everywhere()
				.substract(util.select().position(4, 3, 5))
				.substract(util.select().position(7, 3, 12))
				.substract(util.select().position(7, 3, 14))
				.substract(util.select().position(7, 3, 4))
				.substract(util.select().position(7, 3, 6))
				.substract(util.select().position(10, 8, 10))
				.substract(util.select().position(10, 8, 8))
				.substract(util.select().position(3, 3, 5))
				.substract(util.select().position(4, 3, 13))
				.substract(util.select().position(5, 3, 5))
				.substract(util.select().position(10, 8, 14))
				.substract(util.select().position(10, 8, 4))
				.substract(util.select().position(7, 5, 12))
				.substract(util.select().position(7, 5, 14))
				.substract(util.select().position(7, 5, 4))
				.substract(util.select().position(7, 5, 6))
				.substract(util.select().position(11, 8, 10))
				.substract(util.select().position(11, 8, 8))
				.substract(util.select().position(11, 8, 4))
				.substract(util.select().position(12, 2, 0))
				.substract(util.select().position(12, 2, 2))
				.substract(util.select().position(5, 3, 11))
				.substract(util.select().position(5, 3, 7))
				.substract(util.select().position(16, 10, 9))
				.substract(util.select().position(1, 9, 13))
				.substract(util.select().position(1, 9, 5))
				.substract(util.select().position(13, 2, 10)) // Motor
				.substract(energyPipes).substract(util.select().layer(0)), 
			"DOWN");
		cartSilicon = scene.special().createCart(util.vector().topOf(10, 8, 11), 90, (w, x, y, z) => new HopperMinecart(w, x, y, z));
		cartRedstone = scene.special().createCart(util.vector().topOf(10, 8, 7), 90, (w, x, y, z) => new HopperMinecart(w, x, y, z));
		scene.idle(40);
		
		scene.addKeyframe();
		showSelectionWithText(scene, util, [1, 1, 0, 16, 12, 15], 60,
			"L'usine complète peut tenir\nsur un seul chunk",
			[1, 6, 0], PonderPalette.GREEN, 80);
		
		// Stress Impact: 268.0x RPM
		let stressometer = AABB.of(2, 4, 0, 3, 5, 1);
		chaseBoundingBoxOutline(scene, PonderPalette.FAST, stressometer, 90, 0);
		showText(scene, util, 80, "Stress Impact:", [150], PonderPalette.WHITE, 10);
		showText(scene, util, 70, "268.0x RPM", [166], PonderPalette.FAST, 80);
		
		// Vue finale
		scene.addKeyframe();
		for(let k = 0; k < 145; k++) 
			rotateCameraY(scene, -2, 1);
	});

})
