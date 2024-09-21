onEvent("ponder.registry", event => {

	event.create("kubejs:factory4", "appliedenergistics2:controller").tag("kubejs:main_quest")
	.scene("intro_4", "Introduction au Chapitre 4", "kubejs:ch4_intro", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let depot = [1, 1, 1];
		let machine = [3, 1, 1, 3, 2, 1];
		let content = [
			[3, 1, 3], // Depot
			[2, 1, 3], // Casing
			[1, 1, 3], // Depot
			[2, 1, 2], // Controller
		];
		
		// Utilities
		let calMech = Item.of("kubejs:calculation_mechanism");
		let component = Item.of("appliedenergistics2:1k_cell_component");
		let pattern = Item.of("appliedenergistics2:blank_pattern");
		
		showText(scene, util, 340, "Chapitre 4", [16], PonderPalette.WHITE, 20);
		showText(scene, util, 330, "L'Âge de ... ?", [32], PonderPalette.MEDIUM, 40);
		
		showSection(scene, util, depot, "DOWN", 20);
		showText(scene, util, 70, 
			"Le but de ce chapitre est de produire des §6Calculation §6Mechanisms §fà partir d'Inductive Mechanisms", 
			[1.5, 1 + 13 / 16.0, 1.5], PonderPalette.WHITE, 40);
		createItemOnBeltLike(scene, util, depot, "NORTH", calMech, 40);
		
		scene.addKeyframe();
		showSection(scene, util, machine, "DOWN", 20);
		showText(scene, util, 80,
			"Ce chapitre ne débloque rien\ntant qu'on n'a pas les Circuits\net Processors AE2",
			[166], PonderPalette.RED, 40);
		showCompound(scene, util, content, "DOWN", 3, 0);
		createItemOnBeltLike(scene, util, [1, 1, 3], "WEST", pattern, 3);
		createItemOnBeltLike(scene, util, [3, 1, 3], "EAST", component, 45);
		
		showText(scene, util, 80,
			"En revanche, les Mechanisms\nsont la base du chapitre 5",
			[166], PonderPalette.GREEN, 80);		
	})
	.scene("sand_part", "Production de Sand Chunks et de Fine Sand", "kubejs:ch4_sand_chunk", (scene, util) => {
		scene.configureBasePlate(0, 0, 6);
		scene.setSceneOffsetY(-.75);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let encapsulator = [0, 1, 1, 0, 2, 1];
		let chute = [0, 3, 1];
		let wPipe = [[2, 1, 2], [1, 1, 2], [0, 1, 2], [0, 2, 2]];
		let water = [1, 2, 2, 3, 2, 2];
		let belt = [1, 1, 1, 3, 1, 1];
		let outFunnel = [1, 2, 1];
		let sPipe = [[4, 2, 2], [4, 1, 2], [5, 1, 2]];
		
		// Utilities
		let sand = Item.of("minecraft:sand");
		let ballOfSand = Item.of("kubejs:sand_ball");
		let sandChunk = Item.of("kubejs:rough_sand");
		let fineSand = Item.of("kubejs:fine_sand_bucket");
		
		// Conditions initiales
		setKineticSpeed(scene, util, [1, 1, 2], -16, 0);
		setKineticSpeed(scene, util, [5, 1, 2], -16, 0);
		modifyBlock(scene, util, [0, 2, 1], "active", "false", 0);
			
		// Configuration machine
		showSection(scene, util, encapsulator, "DOWN", 20);
		showSection(scene, util, chute, "DOWN", 20);
		let sIE = createItemEntity(scene, util, [0.5, 6.5, 1.5], [0, 0.1, 0], sand, 15);
		modifyEntity(scene, sIE, e => e.kill(), 5);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 3, 1), PonderPointing.DOWN).withItem(sand), 30);
		scene.idle(40);
		
		rotateCameraY(scene, -110, 45);
		
		// Apport en eau
		showCompound(scene, util, wPipe, "NORTH", 3, 20);
		showSection(scene, util, water, "DOWN", 20);
		rotateCameraY(scene, 110, 45);
		
		showText(scene, util, 60,
			"L'encapsulator forme des Balls of Sand à partir de sable et d'eau",
			[0, 2.5, 1.5], PonderPalette.WHITE, 30);
		restoreBlocks(scene, util, encapsulator, 50);
		
		// Animation machine
		scene.addKeyframe();
		removeItemsFromBelt(scene, util, [1, 1, 1], 0);
		showSection(scene, util, belt, "UP", 5);
		showSection(scene, util, outFunnel, "DOWN", 35);
		createItemOnBeltLike(scene, util, [1, 1, 1], "DOWN", ballOfSand, 15);
		modifyBlock(scene, util, [0, 2, 1], "active", "false", 10);
		showText(scene, util, 60,
			"Attention ! Les Balls of Sand\nne sont pas stackables",
			[2.5, 1 + 13 / 16.0, 1.5], PonderPalette.RED, 80);
		
		// Traitement Sand Ball
		scene.addKeyframe();
		for(let x = 3; x <= 5; x++) 
			showSection(scene, util, [x, 2, 1], "DOWN", 3);
		showText(scene, util, 60,
			"On sépare ensuite les Sand\nChunks du Fine Sand",
			[4.5, 2 + 13 / 16.0, 1.5], PonderPalette.WHITE, 80);
		flapFunnel(scene, util, [3, 2, 1], false, 0);
		removeItemsFromBelt(scene, util, [3, 1, 1], 0);
		createItemOnBeltLike(scene, util, [4, 2, 1], "WEST", ballOfSand, 50);
		rotateCameraY(scene, 70, 35);
		
		// Sortie
		showCompound(scene, util, sPipe, "WEST", 3, 20);
		showText(scene, util, 60,
			"Le sable fin sera utilisé\ndans une prochaine étape",
			[4.5, 2 + 6.5 / 16.0, 1], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(5, 2, 1), PonderPointing.DOWN).withItem(sandChunk), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().of(6, 1.5, 2.5), PonderPointing.RIGHT).withItem(fineSand), 30);
		scene.idle(20);
	})
	.scene("coke_part", "Production de Coke Chunks", "kubejs:ch4_coke", (scene, util) => {
		scene.configureBasePlate(0, 0, 6);
		scene.setSceneOffsetY(-.75);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let pyrolyzer = [0, 1, 1, 0, 2, 1];
		let chute = [0, 3, 1];
		let nullifier = [0, 2, 2];
		let outFunnel = [1, 2, 1];
		let aller = [[1, 1, 1, 3, 1, 1], [4, 1, 1], [5, 1, 1], [3, 3, 1]];
		let retour = [[3, 1, 3, 5, 1, 3], [2, 1, 3], [1, 1, 3], [3, 3, 3]];
		let waterCircuit = [[3, 3, 2], [4, 3, 2], [5, 3, 1, 5, 3, 3]];
		let inFunnel = [1, 2, 3];
		let barrel = [0, 2, 3];
		let power = [[1, 1, 2, 5, 1, 2], [3, 2, 2, 4, 2, 2]];
		
		// Utilities
		let charcoal = Item.of("minecraft:charcoal");
		let waterB = Item.of("minecraft:water_bucket");
		let coke = Item.of("thermal:coal_coke");
		let cutCoke = Item.of("kubejs:incomplete_coke_chunk");
		let cutCoke34 = Item.of("kubejs:incomplete_coke_chunk", "{SequencedAssembly:{Progress:0.75f,id:\"kubejs:coke_cutting\",Step:3}}");
		let cokeChunk = Item.of("kubejs:coke_chunk");
		let filter = Item.of("thermal:item_filter_augment");
		
		// Config machine
		showSection(scene, util, pyrolyzer, "DOWN", 20);
		showSection(scene, util, chute, "DOWN", 20);
		let ccIE = createItemEntity(scene, util, [0.5, 6.5, 1.5], [0, 0.1, 0], charcoal, 15);
		modifyEntity(scene, ccIE, e => e.kill(), 5);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 3, 1), PonderPointing.DOWN).withItem(charcoal), 30);
		scene.idle(15);
		showText(scene, util, 50, "Une ferme à arbre peut être\nla source du Charcoal",
			[175], PonderPalette.OUTPUT, 70);
		showText(scene, util, 60, "Le pyrolyzer transforme\ndu Charcoal en Coke",
			[0, 2.5, 1.5], PonderPalette.WHITE, 70);
			
		// Oil
		scene.addKeyframe();
		showText(scene, util, 60,
			"Ce procédé produit également du Creosote Oil, dont on ne veut pas",
			[0, 2.5, 1.5], PonderPalette.WHITE, 70);
		rotateCameraY(scene, -90, 40);
		
		showSection(scene, util, nullifier, "DOWN", 20);
		showText(scene, util, 60, "On jette donc tout ce\nqui n'est pas du Coke",
			[0, 2.5, 2.5], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(0, 2.5, 2.5), PonderPointing.RIGHT).withItem(filter), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(0, 2.5, 2.5), PonderPointing.LEFT).withItem(coke).showing(AllIcons.I_BLACKLIST), 30);
		scene.idle(40);
		
		rotateCameraY(scene, 160, 50);
		
		// Apparition de la sequence d'assemblage
		scene.addKeyframe();
		modifyBlock(scene, util, [0, 2, 1], "active", "true", 3);
		showCompound(scene, util, retour, "DOWN", 3, 17);
		showCompound(scene, util, aller, "DOWN", 3, 17);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 3, 3), PonderPointing.DOWN).withItem(waterB), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 3, 1), PonderPointing.DOWN).withItem(waterB), 30);
		scene.idle(40);
		
		showText(scene, util, 60,
			"Deux lignes d'assemblage symétriques pour un process\ndu Coke en 4 étapes",
			[3.5, 1 + 13 / 16.0, 1.5], PonderPalette.WHITE, 70);
		
		// Animation sequence - aller
		scene.addKeyframe();
		showSection(scene, util, outFunnel, "DOWN", 20);
		let sequenceAller = createItemOnBelt(scene, util, [1, 1, 1], "DOWN", coke, 15);
		modifyBlock(scene, util, [0, 2, 1], "active", "false", 50);
		modifyTileNBT(scene, util, [3, 3, 1], { ProcessingTicks: 20 }, 20);
		changeBeltItemTo(scene, sequenceAller, cutCoke, 0);
		stallBeltItem(scene, sequenceAller, false, 40);
		
		// Transition vers la ligne de retour
		for(let i = 0; i < 55; i++) {
			switch(i) {
				case 10: showSection(scene, util, [5, 2, 1], "DOWN", 0); break;
				case 13: showSection(scene, util, [5, 2, 2], "DOWN", 0); break;
				case 16: showSection(scene, util, [5, 2, 3], "DOWN", 0); break;
				case 19: flapFunnel(scene, util, [5, 2, 1], false, 0);
								 removeItemsFromBelt(scene, util, [5, 1, 1], 0);
								 break;
				default: break;
			}
			rotateCameraY(scene, 2, 1);
		}
		showCompound(scene, util, waterCircuit, "DOWN", 3, 17);
		
		// Animation sequence - retour
		scene.addKeyframe();
		let sequenceRetour = createItemOnBelt(scene, util, [5, 1, 3], "NORTH", cutCoke, 60);
		stallBeltItem(scene, sequenceRetour, true, 0);
		modifyTileNBT(scene, util, [3, 3, 3], { ProcessingTicks: 20 }, 20);
		changeBeltItemTo(scene, sequenceRetour, cutCoke34, 0);
		stallBeltItem(scene, sequenceRetour, false, 120);
		
		showSection(scene, util, inFunnel, "DOWN", 3);
		showSection(scene, util, barrel, "DOWN", 20);
		showText(scene, util, 60, "A la fin, on obtient des Coke Chunks",
			[1.5, 1 + 13 / 16.0, 3.5], PonderPalette.WHITE, 70);
		flapFunnel(scene, util, inFunnel, false, 0);
		removeItemsFromBelt(scene, util, [1, 1, 3], 10);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 2, 3), PonderPointing.DOWN).withItem(cokeChunk), 30);
		scene.idle(40);		
		
		// Vue finale
		showCompound(scene, util, power, "UP", 0, 20);
		for(let i = 0; i < 60; i++)
			rotateCameraY(scene, -3, 1);
	})
	.scene("earth_charge", "Fabrication d'Earth Charges", "kubejs:ch4_earth_charge", (scene, util) => {
		replaceBlocks(scene, util, [1, 0, 1], "minecraft:cyan_terracotta", false, 0);
		scene.configureBasePlate(1, 0, 6);
		scene.setSceneOffsetY(-.75);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let basaltMachine = [1, 1, 1];
		let blueIce = [1, 1, 0];
		let lava = [1, 1, 2];
		let bPipe = [[1, 2, 1], [1, 3, 1]];
		let bmCtrl = [0, 1, 1];
		let cartSetup = [[1, 4, 1], [2, 3, 1], [3, 3, 1], [4, 3, 1], [5, 4, 1]];
		let laserSetup = [3, 5, 1, 3, 6, 1];
		let laserCtrl = [2, 5, 2, 3, 5, 2];
		
		let outBelt = [4, 2, 2, 4, 2, 3];
		let outFunnelUnloader = [4, 3, 2];
		let charger = [3, 2, 3, 3, 3, 3];
		let inFunnelCharger = [4, 3, 3];
		let outFunnelCharger = [2, 3, 3];
		let inBelt = [2, 2, 2, 2, 2, 3];
		let inFunnelLoader = [2, 3, 2];
		let behind = [outBelt, outFunnelUnloader, inFunnelCharger, 
			charger, outFunnelCharger, inBelt, inFunnelLoader];
		
		let pulverizer = [5, 2, 1, 5, 3, 1];
		let press = [6, 5, 1];
		let basin = [6, 3, 1];
		let outDepot = [6, 2, 0];
		let bin = [6, 1, 1, 6, 2, 1];
		let lastProcess = [pulverizer, press, basin, outDepot, bin];
		
		let loaderCtrl = [1, 3, 0, 2, 3, 0];
		let depl = [2, 6, 3, 3, 6, 3];
		let deplAlim = [4, 5, 3, 4, 6, 3];
		let transfoCtrl = [2, 1, 1, 4, 2, 1];
		let retourCartCtrl = [6, 4, 1];
		
		// Utilities
		let soulSoil = Item.of("minecraft:soul_soil");
		let bIce = Item.of("minecraft:blue_ice");
		let basalt = Item.of("minecraft:basalt");
		let basalzShard = Item.of("thermal:basalz_rod");
		let basalzPowder = Item.of("thermal:basalz_powder");
		let slag = Item.of("thermal:slag");
		let earthCharge = Item.of("thermal:earth_charge");
		let fluxoMagnet = Item.of("thermal:flux_magnet");
		let fluxoMagnetCharged = Item.of('thermal:flux_magnet', '{Energy:50000}');
		let filter = Item.of("create:filter");
		
		// Conditions initiales
		replaceBlocks(scene, util, cartSetup[0], "minecraft:polished_basalt", false, 0);
		replaceBlocks(scene, util, cartSetup[2], "minecraft:polished_basalt", false, 0);
		replaceBlocks(scene, util, cartSetup[4], "minecraft:polished_basalt", false, 0);
		modifyTileNBT(scene, util, press, { Mode: 2 }, 0); // Mode.BASIN
				
		// Introduction
		showText(scene, util, 80,
			"Cette usine permet de transformer du Basalt en Earth Charge via un procédé Alchimique",
			[50], PonderPalette.GREEN, 90);
				
		// Credit
		showText(scene, util, 3830, "Design par RagePlaysGames", 
			[200], PonderPalette.MEDIUM, 0);
		rotateCameraY(scene, -20, 20);
		
		// Basalt
		replaceBlocks(scene, util, [1, 0, 1], "minecraft:soul_soil", true, 20);
		showText(scene, util, 60,
			"La génération de Basalt\ndoit se faire au-dessus\nde §6Soul Soil",
			[150], PonderPalette.WHITE, 70);
		showSection(scene, util, basaltMachine, "DOWN", 20);
		showSection(scene, util, blueIce, "DOWN", 5);
		showSection(scene, util, lava, "DOWN", 20);
		showText(scene, util, 60,
			"L'Igneous Extruder doit être\nadjacent à de la §cLave\n§fet à de la §bBlue Ice",
			[150], PonderPalette.WHITE, 70);
		modifyBlock(scene, util, basaltMachine, "active", "true", 0);
		rotateCameraY(scene, 20, 20);
		
		// Theorie Alchimique
		scene.addKeyframe();
		showCompound(scene, util, cartSetup, "DOWN", 3, 15);
		for(let x = 2; x <= 4; x++) 
			showSection(scene, util, [x, 4, 1], "DOWN", 3); // Rails
		scene.idle(11);
		showCompound(scene, util, bPipe, "SOUTH", 3, 17);
		
		showText(scene, util, 70,
			"Le Setup pour transformer le Basalt en Basalz Shards est composé d'un §3Minecart Loader§f…",
			[2.5, 3.5, 1], PonderPalette.WHITE, 20);
		chaseBoundingBoxOutline(scene, PonderPalette.INPUT, AABB.of(2,3,1, 3,4,2), 50, 60);
		chaseBoundingBoxOutline(scene, PonderPalette.OUTPUT, AABB.of(4,3,1, 5,4,2), 50, 0);
		showText(scene, util, 50, "…Ainsi que d'un §cMinecart Unloader",
			[4.5, 3.5, 1], PonderPalette.WHITE, 70);
		
		showSection(scene, util, laserSetup, "DOWN", 5);
		showSection(scene, util, laserCtrl, "DOWN", 20);
		showText(scene, util, 80,
			"Entre les deux, aura lieue la §dtransformation au laser§f, une\nfois que les ressources\nseront dans un Minecart",
			[3.5, 6.5, 1], PonderPalette.WHITE, 100);
		toggleRedstonePower(scene, util, [2, 5, 2], 0);
		indicateRedstone(scene, util, [2, 5, 2], 0);
		setBlock(scene, util, [3, 5, 1], "kubejs:red_laser_lamp_on", false, 20);
		
		let cart = scene.special().createCart(util.vector().topOf(2, 3, 1), 0, (w, x, y, z) => new HopperMinecart(w, x, y, z));
		scene.idle(20);
		
		scene.addKeyframe();
		showText(scene, util, 160, "Le principe est le suivant:", 
			[0], PonderPalette.WHITE, 40);
		showText(scene, util, 120,
			"4x Stacks de Basalt sont chargé dans le Minecart via le §3Loader",
			[16], PonderPalette.INPUT, 40);
		showText(scene, util, 80,
			"1x FluxoMagnet est chargé dans le Minecart par le §3même principe",
			[41], PonderPalette.INPUT, 90);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(2.5, 4.5, 1), PonderPointing.DOWN).withItem(basalt), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2.5, 4.5, 1), PonderPointing.UP).withItem(fluxoMagnetCharged), 30);
		scene.idle(50);
		
		showText(scene, util, 80,
			"Quand le Cart est complet, le §3Loader §fenvoie un signal pour alimenter le rail, et faire partir\nle Minecart",
			[2.5, 3.5, 1], PonderPalette.WHITE, 100);
		
		toggleRedstonePower(scene, util, [2, 4, 1], 0); // Rail on
		indicateRedstone(scene, util, [2, 4, 1], 0);
		scene.special().moveCart(cart, [2, 0, 0], 40);
		scene.idle(20);
		indicateSuccess(scene, util, [3, 4, 1], 0);  // Pouf
		indicateSuccess(scene, util, [3, 5, 1], 20); // Pef
		toggleRedstonePower(scene, util, [2, 4, 1], 10); // Rail off
		
		showText(scene, util, 100, "Résultat de la transformation:",
			[16], PonderPalette.WHITE, 20);
		showText(scene, util, 80, "2x Stacks de Basalz Shards",
			[32], PonderPalette.OUTPUT, 20);
		showText(scene, util, 60, "1x FluxoMagnet déchargé",
			[48], PonderPalette.OUTPUT, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(4.5, 4.5, 1), PonderPointing.DOWN).withItem(basalzShard), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(4.5, 4.5, 1), PonderPointing.UP).withItem(fluxoMagnet), 30);
		scene.idle(50);
		
		// Gestion de l'output Unloader - Magnet
		scene.addKeyframe();
		scene.idle(20);
		showText(scene, util, 60,
			"Après la §dtransformation\n§dalchimique§f, le Minecart est\ndéchargé par l'§cUnloader",
			[4.5, 3.5, 1], PonderPalette.WHITE, 70);
		
		rotateCameraY(scene, -110, 20);
		hideCompound(scene, util, [laserCtrl, lava, blueIce], "UP", 0, 20);
		
		showText(scene, util, 60, "Le FluxoMagnet est \nsorti par derrière…",
			[4.5, 3.5, 2], PonderPalette.WHITE, 70);
		showSection(scene, util, outBelt, "UP", 5);
		showSection(scene, util, outFunnelUnloader, "DOWN", 10);
		
		// Config filtre funnel - Magnet
		showFilterSlotInput(scene, util, [4+0.5, 3+13/16.0, 2+0.5], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(4 + 0.5, 3 + 13 / 16.0, 2 + 0.5), 
			PonderPointing.DOWN).rightClick().withItem(fluxoMagnet), 30);
		scene.idle(40);
		setFilterData(scene, util, outFunnelUnloader, FTE, fluxoMagnet, 10);
		
		// Animation magnet
		let magnet = createItemOnBelt(scene, util, [4, 2, 2], "NORTH", fluxoMagnet, 48);
		stallBeltItem(scene, magnet, true, 0);
		showSection(scene, util, charger, "DOWN", 5);
		showSection(scene, util, inFunnelCharger, "DOWN", 20);
		removeItemsFromBelt(scene, util, [4, 2, 3], 20);
		showText(scene, util, 40, "…Puis rechargé…",
			[3.5, 3.5, 4], PonderPalette.WHITE, 50);	
		rotateCameraY(scene, 20, 20);	
		showSection(scene, util, outFunnelCharger, "DOWN", 5);
		showSection(scene, util, inBelt, "UP", 20);
		
		// Config filtre - magnet pleinement recharge
		showFilterSlotInput(scene, util, [2+0.4, 3+0.7, 3+0.5], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2 + 0.4, 3 + 0.7, 3 + 0.5), 
			PonderPointing.DOWN).withItem(fluxoMagnetCharged).showing(AllIcons.I_RESPECT_NBT), 30);
		scene.idle(40);
		setFilterData(scene, util, outFunnelCharger, FTE, filter, 20);
		
		// Animation magnet suite
		showSection(scene, util, inFunnelLoader, "DOWN", 0);
		createItemOnBeltLike(scene, util, [2, 2, 3], "EAST", fluxoMagnetCharged, 32);
		removeItemsFromBelt(scene, util, [2, 2, 2], 0);
		flapFunnel(scene, util, inFunnelLoader, false, 20);
		showText(scene, util, 60, "…Avant d'être renvoyé\ndans le §3Loader",
			[2.5, 3.5, 2], PonderPalette.WHITE, 70);	
		rotateCameraY(scene, 90, 40);
		
		hideCompound(scene, util, behind, "UP", 0, 20);
		
		// Traitement des Basalz Shards
		scene.addKeyframe();
		showSection(scene, util, pulverizer, "UP", 20);
		modifyBlock(scene, util, [5, 3, 1], "active", "true", 0);
		showText(scene, util, 80,
			"Pendant ce temps…\n\nLes Basalz Shards sont aspirées, puis traitées par le Pulverizer",
			[5.5, 3.5, 1], PonderPalette.WHITE, 100);
		showSection(scene, util, basin, "DOWN", 10);
		showSection(scene, util, press, "DOWN", 20);
		
		modifyBlock(scene, util, [5, 3, 1], "active", "false", 0);
		showText(scene, util, 60,
			"La machine sort de la Basalz Powder dans le Basin, ainsi que\ndu Slag dont on ne veut pas",
			[6.5, 3.5, 1], PonderPalette.OUTPUT, 80);
		
		// Evacuation du Slag
		showSection(scene, util, bin, "SOUTH", 20);
		showFilterSlotInput(scene, util, [6+0.5, 2+0.75, 1], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(6 + 0.5, 2 + 0.75, 1), PonderPointing.LEFT).rightClick().withItem(slag), 30);
		scene.idle(40);
		setFilterData(scene, util, [6, 2, 1], SCTE, slag, 20);
		
		// Compacting des Powders en Earth Charge
		showSection(scene, util, outDepot, "DOWN", 20);
		createItemOnBeltLike(scene, util, basin, "DOWN", basalzPowder, 0);
		scene.overlay().showControls(new PonderInput(util.vector().of(6.5, 3.5, 1), PonderPointing.DOWN).withItem(basalzPowder), 30);
		scene.idle(40);
		
		modifyTileNBT(scene, util, press, { Running: true }, 40);
		removeItemsFromBelt(scene, util, basin, 0);
		createItemOnBeltLike(scene, util, outDepot, "SOUTH", earthCharge, 40);
		showText(scene, util, 80,
			"Le reste consiste à gérer la transformation au laser, et le retour du Cart",
			[25], PonderPalette.GREEN, 90);
		hideCompound(scene, util, lastProcess, "SOUTH", 0, 20);
		
		// Timings Redstone - Cart
		scene.addKeyframe();
		showText(scene, util, 60,
			"Le retour du Minecart est\ngéré au niveau du §3Loader",
			[2.5, 3.5, 1], PonderPalette.WHITE, 70);
		showSection(scene, util, loaderCtrl, "DOWN", 20);
		
		showFilterSlotInput(scene, util, [2+0.5, 3+1, 0+0.75], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2 + 0.5, 3 + 1, 0 + 0.75), PonderPointing.DOWN).rightClick().withItem(basalt), 30);
		scene.idle(40);
		setFilterData(scene, util, [2, 3, 0], SSTE, basalt, 20);
		showText(scene, util, 40, "Réglage: 44％ (4 Stacks)",
			[2.5, 4, 0.5], PonderPalette.INPUT, 40);
		modifyBlock(scene, util, [2, 3, 0], "indicator", "3", 10);
		
		showText(scene, util, 60, "Quand les 4 Stacks sont\ndans le §3Loader§f…",
			[25], PonderPalette.WHITE, 70);
		toggleRedstonePower(scene, util, [1, 3, 0], 0);
		
		showSection(scene, util, bmCtrl, "EAST", 20);
		showText(scene, util, 60,
			"…La machine à Basalt est arrêtée…",
			[1, 1.5, 1.5], PonderPalette.WHITE, 30);
		toggleRedstonePower(scene, util, bmCtrl, 40);
		modifyBlock(scene, util, basaltMachine, "active", "false", 0);
		rotateCameraY(scene, 70, 35);
		
		showSection(scene, util, retourCartCtrl, "WEST", 10);
		showText(scene, util, 60,
			"…Et un signal est envoyé pour faire revenir le Minecart",
			[5.5, 4.5, 1], PonderPalette.WHITE, 70);
		toggleRedstonePower(scene, util, retourCartCtrl, 0);
		toggleRedstonePower(scene, util, [4, 4, 1], 0); // Rail on
		indicateRedstone(scene, util, [4, 4, 1], 0);
		
		scene.special().moveCart(cart, [-2, 0, 0], 40);
		scene.idle(40);
		
		toggleRedstonePower(scene, util, [4, 4, 1], 0); // Rail off
		toggleRedstonePower(scene, util, [1, 3, 0], 0);
		toggleRedstonePower(scene, util, bmCtrl, 40);
		toggleRedstonePower(scene, util, retourCartCtrl, 0);
		modifyBlock(scene, util, basaltMachine, "active", "true", 0);
		modifyBlock(scene, util, [2, 3, 0], "indicator", "0", 10);
		hideSection(scene, util, loaderCtrl, "UP", 20);
		
		// Timings Redstone - Laser
		scene.addKeyframe();
		showText(scene, util, 60,
			"Le déclenchement du §dlaser \n§fest également géré au\nniveau du §3Loader",
			[2.5, 3.5, 1], PonderPalette.WHITE, 70);
		
		showSection(scene, util, depl, "DOWN", 20);
		showText(scene, util, 60,
			"Pour que le laser tire, un Deployer doit \"taper\" le support en Invar",
			[3.5, 6.5, 3.5], PonderPalette.MEDIUM, 70);		
		
		showSection(scene, util, deplAlim, "WEST", 20);
		showText(scene, util, 80,
			"On veut le minimum de délai entre\nle signal et l'activation\n\nLe Deployer doit fonctionner\nà §c256 RPM",
			[4.5, 5.5, 3], PonderPalette.WHITE, 100);
		
		showSection(scene, util, transfoCtrl, "SOUTH", 20);
		showText(scene, util, 60,
			"Quand le §3Loader §fenvoie le Minecart, on récupère l'impulsion pour activer le Deployer",
			[2.5, 1.5, 1], PonderPalette.WHITE, 80);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(2.5, 4.5, 1), PonderPointing.DOWN).withItem(basalt), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2.5, 4.5, 1), PonderPointing.UP).withItem(fluxoMagnetCharged), 30);
		scene.idle(50);
		
		indicateRedstone(scene, util, [2, 4, 1], 0);
		toggleRedstonePower(scene, util, [2, 4, 1], 0); // Rail on
		toggleRedstonePower(scene, util, transfoCtrl, 0);
		toggleRedstonePower(scene, util, [2, 6, 3], 0);
		scene.special().moveCart(cart, [2, 0, 0], 40);
		
		moveDeployer(scene, util, [3, 6, 3], 1, 19, 20);
		indicateSuccess(scene, util, [3, 4, 1], 0); // Ping
		indicateSuccess(scene, util, [3, 5, 1], 0); // Pong
		moveDeployer(scene, util, [3, 6, 3], -1, 19, 20);
		
		toggleRedstonePower(scene, util, [2, 4, 1], 0); // Rail off
		toggleRedstonePower(scene, util, transfoCtrl, 0);
		toggleRedstonePower(scene, util, [2, 6, 3], 0);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(4.5, 4.5, 1), PonderPointing.DOWN).withItem(basalzShard), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(4.5, 4.5, 1), PonderPointing.UP).withItem(fluxoMagnet), 30);
		scene.idle(60);
		
		// Vue finale
		scene.addKeyframe();
		for(let i = 0; i < 145; i++) {
			switch(i) {
				case 0:  showCompound(scene, util, lastProcess, "SOUTH", 0, 0); break;
				case 55: showCompound(scene, util, behind, "NORTH", 0, 0); break;
				case 90: showCompound(scene, util, [lava, blueIce], "DOWN", 0, 0); break;
				case 144:showCompound(scene, util, [loaderCtrl, laserCtrl], "DOWN", 0, 0); break;
				default: break;
			}
			rotateCameraY(scene, 2, 1);
		}
		scene.idle(40);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(6, 2, 0), PonderPointing.DOWN).withItem(earthCharge), 30);
		scene.idle(20);
	})
	.scene("ice_charge", "Fabrication d'Ice Charges", "kubejs:ch4_ice_charge", (scene, util) => {
		scene.configureBasePlate(1, 0, 6);
		scene.setSceneOffsetY(-.75);
		scene.showBasePlate();
		scene.idle(20);
	
		// Sections & Positions
		let chiller = [1, 2, 1, 1, 3, 1];
		let water = [[1, 1, 1, 1, 1, 2], [2, 1, 2]];
		let pump = [[1, 2, 2], [1, 3, 2]];
		let cartSetup = [[1, 4, 1], [2, 3, 1], [3, 3, 1], [4, 3, 1], [5, 4, 1]];
		let behind = [[4, 2, 2, 4, 2, 3], 
			[4, 3, 2], [4, 3, 3], [3, 2, 3, 3, 3, 3], 
			[2, 3, 3], [2, 2, 2, 2, 2, 3], [2, 3, 2]];
		let lastProcess = [[5, 2, 1, 5, 3, 1], [6, 1, 1, 6, 2, 1],
			[6, 3, 1], [6, 5, 1], [6, 2, 0]];
		let misc = [[2, 1, 1, 4, 2, 1], [3, 5, 1, 3, 6, 1],
			[2, 5, 2, 3, 5, 2], [2, 6, 3, 3, 6, 3], [4, 5, 3, 4, 6, 3],
			[0, 3, 1], [1, 3, 0, 2, 3, 0]];
		let retourCartCtrl = [6, 4, 1];
		
		// Utilities
		let cast = Item.of("thermal:chiller_ball_cast");
		let snowball = Item.of("minecraft:snowball");
		let blizzCube = Item.of("thermal:blizz_rod");
		let blizzPowder = Item.of("thermal:blizz_powder");
		let iceCharge = Item.of("thermal:ice_charge");
		let niter = Item.of("thermal:niter");
		let eManip = Item.of("appliedenergistics2:entropy_manipulator");
		let filter = Item.of("create:filter");
		
		// Conditions initiales
		replaceBlocks(scene, util, cartSetup[0], "minecraft:snow_block", false, 0);
		replaceBlocks(scene, util, cartSetup[2], "minecraft:snow_block", false, 0);
		replaceBlocks(scene, util, cartSetup[4], "minecraft:snow_block", false, 0);
		modifyTileNBT(scene, util, [6, 5, 1], { Mode: 2 }, 0); // Mode.BASIN
		setKineticSpeed(scene, util, [1, 2, 2], 16, 0);
		
		showText(scene, util, 80,
			"Cette fois, on veut obtenir des Ice Charges à partir de Snow Balls, via le même procédé Alchimique",
			[50], PonderPalette.GREEN, 90);
		showText(scene, util, 60, "Le principe est exactement le même",
			[98], PonderPalette.WHITE, 30);
		showText(scene, util, 60, "A quelques détails près…",
			[114], PonderPalette.OUTPUT, 60);
		
		// Credit - Le même, duh
		showText(scene, util, 1600, "Par RagePlaysGames, duh",
			[200], PonderPalette.MEDIUM, 20);
		
		// Snow Balls
		showSection(scene, util, chiller, "DOWN", 20);
		showText(scene, util, 60, "On produit des Snow Balls\navec un Blast Chiller",
			[1.5, 3.5, 1], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 3, 1), PonderPointing.DOWN).withItem(cast), 30);
		scene.idle(40);
		
		rotateCameraY(scene, -20, 15);
		showCompound(scene, util, water, "DOWN", 0, 5);
		showCompound(scene, util, pump, "EAST", 3, 34);
		rotateCameraY(scene, 20, 15);
		
		// Installation du Minecart
		scene.addKeyframe();
		showCompound(scene, util, cartSetup, "DOWN", 3, 0);
		for(let x = 2; x <= 4; x++) 
			showSection(scene, util, [x, 4, 1], "DOWN", 3);
		scene.idle(15);
		
		let cart = scene.special().createCart(util.vector().topOf(2, 3, 1), 0, (w, x, y, z) => new HopperMinecart(w, x, y, z));
		scene.idle(15);
		
		showText(scene, util, 60, "Ici, le catalyseur sera un\nEntropy Manipulator",
			[2.5, 4.5, 1], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(2.5, 4.5, 1), PonderPointing.DOWN).withItem(snowball), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2.5, 4.5, 1), PonderPointing.UP).withItem(eManip), 30);
		scene.idle(50);
		
		rotateCameraY(scene, -180, 50);
		showCompound(scene, util, behind, "DOWN", 3, 15);
		
		// Filtres de la partie recharge, avec entropy_manipulator
		scene.addKeyframe();
		showText(scene, util, 60, "Il faut donc adapter les\nfiltres en conséquence",
			[25], PonderPalette.WHITE, 70);
		
		showFilterSlotInput(scene, util, [4+0.5, 3+13/16.0, 2+0.5], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(4 + 0.5, 3 + 13 / 16.0, 2 + 0.5), 
			PonderPointing.DOWN).rightClick().withItem(eManip), 30);
		scene.idle(30);
		setFilterData(scene, util, [4, 3, 2], FTE, eManip, 10);
		
		rotateCameraY(scene, 90, 40);
		showFilterSlotInput(scene, util, [2+0.4, 3+0.7, 3+0.5], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2 + 0.4, 3 + 0.7, 3 + 0.5), 
			PonderPointing.DOWN).withItem(eManip).showing(AllIcons.I_RESPECT_NBT), 30);
		scene.idle(30);
		setFilterData(scene, util, [2, 3, 3], FTE, filter, 10);
		rotateCameraY(scene, 90, 40);
		
		// Deployer, laser, redstone de controle ...
		scene.addKeyframe();
		showCompound(scene, util, misc, "DOWN", 3, 15);
		showFilterSlotInput(scene, util, [2+0.5, 3+1, 0+0.75], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2 + 0.5, 3 + 1, 0 + 0.75), PonderPointing.DOWN).rightClick().withItem(snowball), 30);
		scene.idle(40);
		setFilterData(scene, util, [2, 3, 0], SSTE, snowball, 10);
		showText(scene, util, 40, "Réglage: 41％ (4 Stacks)",
			[2.5, 4, 0.5], PonderPalette.INPUT, 60);
		
		// Animation Minecart
		indicateRedstone(scene, util, [2, 4, 1], 0);
		toggleRedstonePower(scene, util, [2, 4, 1], 0); 
		toggleRedstonePower(scene, util, [2, 1, 1, 4, 2, 1], 0);
		toggleRedstonePower(scene, util, [2, 6, 3], 0);
		scene.special().moveCart(cart, [2, 0, 0], 40);
		
		moveDeployer(scene, util, [3, 6, 3], 1, 19, 20);
		indicateSuccess(scene, util, [3, 4, 1], 0); // Bim
		indicateSuccess(scene, util, [3, 5, 1], 0); // Bam
		moveDeployer(scene, util, [3, 6, 3], -1, 19, 20);
		
		toggleRedstonePower(scene, util, [2, 4, 1], 0); 
		toggleRedstonePower(scene, util, [2, 1, 1, 4, 2, 1], 0);
		toggleRedstonePower(scene, util, [2, 6, 3], 10);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(4.5, 4.5, 1), PonderPointing.DOWN).withItem(blizzCube), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(4.5, 4.5, 1), PonderPointing.UP).withItem(eManip), 30);
		scene.idle(50);
		
		rotateCameraY(scene, 70, 35);
		
		scene.addKeyframe();
		showSection(scene, util, retourCartCtrl, "WEST", 20);
		
		// Traitement Blizz Cubes, Powder et Ice Charge
		showCompound(scene, util, lastProcess, "SOUTH", 3, 15);
		scene.overlay().showControls(new PonderInput(util.vector().of(6.5, 3.5, 1), PonderPointing.DOWN).withItem(blizzPowder), 30);
		scene.idle(40);
		
		createItemOnBeltLike(scene, util, [6, 3, 1], "DOWN", blizzPowder, 0);
		modifyTileNBT(scene, util, [6, 5, 1], { Running: true }, 40);
		removeItemsFromBelt(scene, util, [6, 3, 1], 0);
		createItemOnBeltLike(scene, util, [6, 2, 0], "SOUTH", iceCharge, 40);
		showText(scene, util, 60,
			"Ici, en plus des Blizz Powders,\nle pulverizer sort du Niter,\nqu'on veut garder",
			[6.5, 3.5, 1], PonderPalette.WHITE, 70);
		
		rotateCameraY(scene, 20, 15);
		showFilterSlotInput(scene, util, [7, 2+0.75, 1+0.5], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(7, 2 + 0.75, 1 + 0.5), PonderPointing.LEFT).rightClick().withItem(niter), 30);
		scene.idle(40);
		setFilterData(scene, util, [6, 2, 1], SCTE, niter, 20);
		
		// Vue finale
		scene.addKeyframe();
		for(let i = 0; i < 135; i++)
			rotateCameraY(scene, 2, 1);			
		scene.idle(40);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(6, 2, 0), PonderPointing.DOWN).withItem(iceCharge), 30);
		scene.idle(20);
	})
	.scene("silicon_part", "Ligne du Silicon", "kubejs:ch4_silicon", (scene, util) => {
		scene.configureBasePlate(0, 0, 6);
		scene.setSceneOffsetY(-.75);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let depotSand = [0, 2, 1];
		let depotEC = [1, 2, 2];
		let depotCoke = [2, 1, 0];
		let depotSiliCompound = [3, 1, 1];
		let depotIC = [4, 2, 2];
		let depotSilicon = [5, 2, 1];
		let smelter1 = [1, 1, 1, 1, 2, 1];
		let smelter2 = [4, 1, 1, 4, 2, 1];
		let basin = [2, 2, 1];
		let press = [2, 4, 1];
		let inFunnelCoke = [2, 2, 0];
		let inFunnelSC = [3, 2, 1];
		let fsPipe = [[0, 1, 2], [1, 1, 2], [2, 1, 2], [2, 2, 2]];
		
		// Utilities
		let sandChunk = Item.of("kubejs:rough_sand");
		let earthCharge = Item.of("thermal:earth_charge");
		let pureSand = Item.of("kubejs:purified_sand");
		let cokeChunk = Item.of("kubejs:coke_chunk");
		let fineSand = Item.of("kubejs:fine_sand_bucket");
		let siliconCompound = Item.of("kubejs:silicon_compound");
		let iceCharge = Item.of("thermal:ice_charge");
		let silicon = Item.of("appliedenergistics2:silicon");		
		
		let CompoundNBT = java("net.minecraft.nbt.CompoundNBT");
		
		// Conditions initiales
		setKineticSpeed(scene, util, [0, 1, 2], 16, 0);
		modifyTileNBT(scene, util, basin, { InputTanks: [{ Level:{ Value: 0 }}]}, 0);
		modifyTileNBT(scene, util, press, { Mode: 2 }, 0); // Mode.BASIN
		
		// Process Sand Chunks
		showSection(scene, util, smelter1, "DOWN", 20);
		showText(scene, util, 60,
			"Ce premier Smelter s'occupe\nde fabriquer le Purified Sand",
			[1, 2.5, 1.5], PonderPalette.WHITE, 70);
			
		showSection(scene, util, depotSand, "DOWN", 5);
		showSection(scene, util, depotEC, "DOWN", 20);
		createItemOnBeltLike(scene, util, depotSand, "WEST", sandChunk, 5);
		createItemOnBeltLike(scene, util, depotEC, "SOUTH", earthCharge, 20);
		
		// Animation process Purified Sand
		removeItemsFromBelt(scene, util, depotSand, 5);
		removeItemsFromBelt(scene, util, depotEC, 5);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(1.5, 2.5, 1), PonderPointing.DOWN).withItem(sandChunk), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().of(1.5, 2.5, 1), PonderPointing.UP).withItem(earthCharge), 30);
		scene.idle(40);
		
		modifyBlock(scene, util, [1, 2, 1], "active", "true", 20);
		showCompound(scene, util, [basin, press], "DOWN", 3, 20);
		createItemOnBeltLike(scene, util, basin, "DOWN", pureSand, 15);
		modifyBlock(scene, util, [1, 2, 1], "active", "false", 30);
		removeItemsFromBelt(scene, util, basin, 0);
		rotateCameraY(scene, -110, 45);
		
		// Compacting pour Silicon Compound
		scene.addKeyframe();
		showCompound(scene, util, fsPipe, "NORTH", 3, 17);
		showText(scene, util, 60, "On achemine le Fine Sand jusqu'ici",
			[2.5, 2.5, 2.5], PonderPalette.INPUT, 30);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(0, 1.5, 2.5), PonderPointing.RIGHT).withItem(fineSand), 30);
		scene.idle(40);
		rotateCameraY(scene, 110, 45);
		
		showSection(scene, util, depotCoke, "DOWN", 5);
		showSection(scene, util, inFunnelCoke, "DOWN", 20);
		createItemOnBeltLike(scene, util, depotCoke, "NORTH", cokeChunk, 20);
		showText(scene, util, 50, "Ainsi que les Coke Chunks",
			[2.5, 1 + 13 / 16.0, 0.5], PonderPalette.INPUT, 60);
		createItemOnBeltLike(scene, util, basin, "DOWN", cokeChunk, 0);
		removeItemsFromBelt(scene, util, depotCoke, 0);
		flapFunnel(scene, util, inFunnelCoke, false, 10);
		
		// Remplissage fine sand
		for(let mVol = 25; mVol <= 1000; mVol += 25) {
			let vol = mVol / 1000;
			modifyTileNBT(scene, util, basin, { InputTanks: [{ Level:{ Value: vol }}]}, 1);
		}
		scene.idle(10);
		
		hideCompound(scene, util, [depotCoke, inFunnelCoke], "DOWN", 0, 10);
		showSection(scene, util, depotSiliCompound, "UP", 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(2, 2, 1), PonderPointing.RIGHT).withItem(cokeChunk), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(2, 2, 1), PonderPointing.LEFT).withItem(pureSand), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 1, 1), PonderPointing.UP).withItem(fineSand), 30);
		scene.idle(40);
		
		// Animation press
		modifyTileNBT(scene, util, press, { Running: true }, 40);
		modifyTileNBT(scene, util, basin, { 
			InputTanks: [{ Level: { Value: 0 } }],
			InputItems: { Items: [new CompoundNBT()] }
		}, 0);
		createItemOnBeltLike(scene, util, depotSiliCompound, "WEST", siliconCompound, 20);
		showText(scene, util, 60, "Cette étape donne du\nSilicon Compound",
			[3.5, 1 + 13 / 16.0, 1.5], PonderPalette.OUTPUT, 70);
		
		// Formation Silicon
		scene.addKeyframe();
		showSection(scene, util, smelter2, "DOWN", 20);
		showText(scene, util, 60, "Ce second Smelter s'occupe\nde fabriquer le Silicon",
			[4, 2.5, 1.5], PonderPalette.WHITE, 70);
		showSection(scene, util, inFunnelSC, "SOUTH", 5);
		showSection(scene, util, depotIC, "DOWN", 20);
		createItemOnBeltLike(scene, util, depotIC, "SOUTH", iceCharge, 20);
		
		// Animation process silicon
		removeItemsFromBelt(scene, util, depotSiliCompound, 0);
		flapFunnel(scene, util, inFunnelSC, false, 5);
		removeItemsFromBelt(scene, util, depotIC, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(4.5, 2.5, 1), PonderPointing.DOWN).withItem(siliconCompound), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().of(4.5, 2.5, 1), PonderPointing.UP).withItem(iceCharge), 30);
		scene.idle(40);
		
		modifyBlock(scene, util, [4, 2, 1], "active", "true", 20);
		showSection(scene, util, depotSilicon, "DOWN", 20);
		createItemOnBeltLike(scene, util, depotSilicon, "WEST", silicon, 15);
		modifyBlock(scene, util, [4, 2, 1], "active", "false", 30);
		showCompound(scene, util, [depotCoke, inFunnelCoke], "DOWN", 0, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(5, 2, 1), PonderPointing.DOWN).withItem(silicon), 30);
		scene.idle(20);
	})
	.scene("calculation_part", "Production de Calculation Mechanisms", "kubejs:ch4_mechanism", (scene, util) => {
		scene.setSceneOffsetY(-.75);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let depot = [0, 3, 2];
		let belt1 = [1, 4, 2, 2, 4, 2];
		let belt2 = [0, 4, 3, 2, 4, 3];
		let inFunnelSilicon = [0, 4, 2];
		let depl = [0, 5, 2];
		let tunnel = [1, 5, 2, 1, 5, 3];
		let inFunnelsPS = [[2, 5, 3], [2, 5, 2]];
		let barrels = [[3, 5, 3], [3, 5, 2]];
				
		// Utilities
		let silicon = Item.of("appliedenergistics2:silicon");	
		let sPress = Item.of("appliedenergistics2:silicon_press");
		let printedS = Item.of("appliedenergistics2:printed_silicon");
		
		// Process Silicon --------------------------------------------------------
		// Config Funnel printed silicon
		showSection(scene, util, depot, "DOWN", 20);
		showSection(scene, util, belt2, "DOWN", 5);
		showSection(scene, util, inFunnelSilicon, "DOWN", 20);
		
		showFilterSlotInput(scene, util, [0.5, 4+0.7, 2+0.4], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(0.5, 4 + 0.7, 2 + 0.4), PonderPointing.DOWN).rightClick().withItem(printedS), 30);
		scene.idle(40);
		setFilterData(scene, util, inFunnelSilicon, FTE, printedS, 10);
		
		// Animation process silicon
		createItemOnBeltLike(scene, util, depot, "NORTH", silicon, 20);
		showText(scene, util, 60, "Le Silicon est transformé\nen Printed Silicon…",
			[0.5, 3 + 13 / 16.0, 2.5], PonderPalette.WHITE, 70);
		showSection(scene, util, depl, "DOWN", 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 5, 2), PonderPointing.DOWN).rightClick().withItem(sPress), 30);
		scene.idle(15);
		
		modifyTileNBT(scene, util, depl, { HeldItem: sPress }, 25);
		showText(scene, util, 60, "…A l'aide d'un Deployer\net d'une Silicon Press",
			[0.5, 5.5, 2], PonderPalette.WHITE, 70);
		moveDeployer(scene, util, depl, 1, 19, 20); // 19
		removeItemsFromBelt(scene, util, depot, 0); //  1
		createItemOnBeltLike(scene, util, depot, "DOWN", printedS, 0);
		moveDeployer(scene, util, depl, -1, 19, 30);
		
		// Distribution de la printed silicon
		scene.addKeyframe();
		showSection(scene, util, belt1, "DOWN", 5);
		showSection(scene, util, tunnel, "DOWN", 20);
		
		showScrollInput(scene, util, [1+0.5, 5+1, 2+0.5], "DOWN", 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(1 + 0.5, 5 + 1.25, 2 + 0.5), 
			PonderPointing.DOWN).withWrench().showing(AllIcons.I_TUNNEL_ROUND_ROBIN), 40);
		scene.idle(50);
		
		// Animation Tunnel
		removeItemsFromBelt(scene, util, depot, 0);
		flapFunnel(scene, util, inFunnelSilicon, false, 0);
		createItemOnBeltLike(scene, util, [0, 4, 3], "NORTH", printedS, 0);
		rotateCameraY(scene, 90, 40);
		createItemOnBeltLike(scene, util, [0, 4, 3], "NORTH", printedS, 50);
		showCompound(scene, util, barrels, "DOWN", 3, 3);
		showCompound(scene, util, inFunnelsPS, "DOWN", 3, 17);
		
		// Ligne d'assemblage -------------------------------------------------------
		// Sections & Positions
		let inFunnel = [3, 2, 0];
		
		// Utilities
		let drive = Item.of("kubejs:flash_drive");
		let indMech = Item.of("kubejs:inductive_mechanism");
		let iCalMech = Item.of("kubejs:incomplete_calculation_mechanism");
		let calMech = Item.of("kubejs:calculation_mechanism");
		let emptyStack = Item.getEmpty();
		
		scene.addKeyframe();
		showText(scene, util, 60, 
			"Enfin, la ligne d'assemblage des Mechanisms du Chapitre 4",
			[100], PonderPalette.WHITE, 70);
		
		// Apparition de tous les elements de la ligne d'assemblage
		showSection(scene, util, [3, 1, 0, 3, 1, 4], "DOWN", 5);
		showSection(scene, util, [2, 2, 4], "DOWN", 5);
		showSection(scene, util, [2, 2, 0], "DOWN", 15);
		showSection(scene, util, [3, 2, 4], "DOWN", 5);
		showSection(scene, util, inFunnel, "DOWN", 15);
		
		for(let z = 1; z <= 3; z++) 
			showSection(scene, util, [3, 3, z], "DOWN", 5);
		scene.idle(15);
		showSection(scene, util, [3, 4, 2], "WEST", 5);
		showSection(scene, util, [3, 4, 3], "WEST", 20);
		rotateCameraY(scene, 70, 35);
		
		// Printed silicon, Printed silicon et Flash drive dans les deployers
		scene.overlay().showControls(new PonderInput(util.vector().of(4, 4, 3.5), PonderPointing.DOWN).withItem(printedS), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().of(4, 4, 2.5), PonderPointing.DOWN).withItem(printedS), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().of(4, 4, 1.5), PonderPointing.DOWN).withItem(drive), 30);
		scene.idle(30);
		
		modifyTileNBT(scene, util, [3, 3, 3], { HeldItem: printedS }, 5);
		modifyTileNBT(scene, util, [3, 3, 2], { HeldItem: printedS }, 5);
		modifyTileNBT(scene, util, [3, 3, 1], { HeldItem: drive }, 15);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 2, 4), PonderPointing.DOWN).withItem(indMech), 30);
		scene.idle(40);
		
		// Sequenced Assembly d'Inductive Mechanism vers Calculation Mechanism
		scene.addKeyframe();
		let sequence = createItemOnBelt(scene, util, [3, 1, 4], "WEST", indMech, 30);
		
		moveDeployer(scene, util, [3, 3, 3], 1, 19, 20);
		changeBeltItemTo(scene, sequence, iCalMech, 0);
		stallBeltItem(scene, sequence, false, 0);
		modifyTileNBT(scene, util, [3, 3, 3], { HeldItem: emptyStack }, 0);
		
		// Idle 25 + Travelling
		moveDeployer(scene, util, [3, 3, 3], -1, 19, 10);
		for(let i = 0; i < 15; i++) 
			rotateCameraY(scene, -1, 1);
		
		// Idle 20 + Travelling
		moveDeployer(scene, util, [3, 3, 2], 1, 19, 0);
		for(let i = 0; i < 20; i++) 
			rotateCameraY(scene, -1, 1);
		
		stallBeltItem(scene, sequence, false, 0);
		modifyTileNBT(scene, util, [3, 3, 2], { HeldItem: emptyStack }, 0);
		moveDeployer(scene, util, [3, 3, 2], -1, 19, 0);
		// Idle 25 + Travelling
		for(let i = 0; i < 25; i++) 
			rotateCameraY(scene, -1, 1);
		
		// Idle 20 + Travelling
		moveDeployer(scene, util, [3, 3, 1], 1, 19, 0);
		for(let i = 0; i < 10; i++) 
			rotateCameraY(scene, -1, 1);
		scene.idle(10);
		
		changeBeltItemTo(scene, sequence, calMech, 0);
		stallBeltItem(scene, sequence, false, 0);
		moveDeployer(scene, util, [3, 3, 1], -1, 19, 20);
		
		removeItemsFromBelt(scene, util, [3, 1, 0], 0);
		flapFunnel(scene, util, inFunnel, false, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 2, 0), PonderPointing.DOWN).withItem(calMech), 30);
		scene.idle(20);
	})
	.scene("overview_4", "Usine complète", "kubejs:ch4_overview", (scene, util) => {
		scene.configureBasePlate(0, 0, 15);
		scene.setSceneOffsetY(-1);
		scene.scaleSceneView(0.5);
		scene.rotateCameraY(-20);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let sandProd = [[6, 5, 9, 12, 6, 14], [8, 3, 11], 
			[9, 3, 11, 9, 4, 11], [8, 3, 14, 8, 4, 14]];
		let sandPart = [[6, 1, 10, 6, 4, 14], [7, 2, 10], 
			[7, 2, 11, 7, 4, 14], [8, 4, 11, 8, 4, 13]];
		let cokeProd = [[2, 1, 9, 4, 5, 15], 
			[5, 3, 9], [1, 5, 14], [5, 5, 14]];
		let earthChargeFact = [[8, 1, 6, 14, 4, 9], 
			[8, 5, 6, 13, 7, 8], [13, 2, 10], [7, 4, 9]];
		let iceChargeFact = [[8, 1, 2, 14, 4, 5], 
			[8, 5, 3, 14, 7, 5], [7, 4, 4], [7, 1, 3]];
		let siliLign = [[6, 1, 3, 6, 4, 9], [1, 3, 8, 5, 5, 8], 
			[7, 1, 7, 7, 3, 10], [7, 4, 8], [7, 4, 10], 
			[6, 6, 7, 7, 6, 8], [7, 4, 7, 7, 5, 7]];
		let siliDistrib = [5, 5, 0, 7, 6, 4];
		let seqAssembly = [2, 1, 0, 8, 4, 1];
		
		let energyCircuit = util.select().fromTo(6, 1, 3, 6, 1, 14)
			.add(util.select().fromTo(7, 1, 3, 13, 1, 3))
			.add(util.select().fromTo(9, 2, 3, 9, 4, 3))
			.add(util.select().fromTo(13, 2, 3, 13, 4, 3))
			.add(util.select().fromTo(6, 2, 4, 6, 4, 4))
			.add(util.select().fromTo(4, 2, 9, 6, 4, 9))
			.add(util.select().fromTo(6, 2, 14, 6, 4, 14))
			.add(util.select().fromTo(7, 1, 8, 11, 1, 8))
			.add(util.select().fromTo(9, 2, 8, 9, 4, 8))
			.add(util.select().fromTo(11, 1, 7, 11, 2, 6))
			.add(util.select().fromTo(11, 3, 5, 11, 4, 6))
			.add(util.select().position(13, 2, 8))
			.add(util.select().position(10, 6, 9));
			
		// Utilities
		let mPos = [
			[6, 4, 14], // Sand Encapsulator x4
			[10, 6, 9], // Cobble Extruder x4
			[13, 2, 8], // Basalt Extruder x4
			[9, 4, 8],  // Earth Pulverizer x4
			[4, 4, 9],  // Pyrolyzer x4
			[6, 4, 9],  // Purified Sand Smelter x4
			[6, 4, 4],  // Silicon Smelter x4
			[9, 4, 3]]; // Ice Pulverizer x4
		let bcPos = [13, 4, 3]; // Blast Chiller x2
		
		let charcoal = Item.of("minecraft:charcoal");
		let indMech = Item.of("kubejs:inductive_mechanism");
		let HIC = Item.of("thermal:upgrade_augment_1");
		let RIC = Item.of("thermal:upgrade_augment_3");
		
		// Conditions initiales
		modifyTileNBT(scene, util, [3, 4, 0], { Value: 0.5 }, 0);
		
		// Prod de Sand. Plus besoin de presenter a ce stade
		showCompound(scene, util, sandProd, "DOWN", 0, 20);
		showText(scene, util, 60, "Arrivée du Sand",
			[6.5, 7, 14.5], PonderPalette.WHITE, 80);
		
		// Sand Chunks et sable fin
		showCompound(scene, util, sandPart, "EAST", 0, 20);
		showText(scene, util, 60, "Production de Sand Chunks\net de Fine Sand",
			[6, 4 + 6.5 / 16.0, 10.5], PonderPalette.WHITE, 80);
		rotateCameraY(scene, 20, 20);
	
		// Traitement du Coke
		scene.addKeyframe();
		showCompound(scene, util, cokeProd, "DOWN", 0, 20);
		showText(scene, util, 60, "Production de Coke Chunks",
			[2.5, 4.5, 9], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(4, 5, 9), PonderPointing.DOWN).withItem(charcoal), 30);
		scene.idle(50);
		
		// Monstruosite qui fait les Earth Charges
		scene.addKeyframe();
		showCompound(scene, util, earthChargeFact, "DOWN", 0, 20);
		showText(scene, util, 60, "Fabrication d'Earth Charges",
			[8, 4.5, 8.5], PonderPalette.WHITE, 30);
		let cartEC = scene.special().createCart(util.vector().topOf(12, 4, 8), 0, (w, x, y, z) => new HopperMinecart(w, x, y, z));
		scene.idle(40);
		
		// Abomination qui fait les Ice Charges
		scene.addKeyframe();
		showCompound(scene, util, iceChargeFact, "DOWN", 0, 20);
		showText(scene, util, 60, "Fabrication d'Ice Charges",
			[8, 4.5, 3.5], PonderPalette.WHITE, 30);
		let cartIC = scene.special().createCart(util.vector().topOf(12, 4, 3), 0, (w, x, y, z) => new HopperMinecart(w, x, y, z));
		scene.idle(40);
		rotateCameraY(scene, -20, 20);
		
		// Prod de Silicon maintenant qu'on a toutes les ressources
		scene.addKeyframe();
		showCompound(scene, util, siliLign, "DOWN", 0, 20);
		showText(scene, util, 60, "Ligne de formation du Silicon",
			[6, 4 + 6.5 / 16.0, 3.5], PonderPalette.WHITE, 80);
		
		// Distribution Silicon
		scene.addKeyframe();
		showSection(scene, util, siliDistrib, "DOWN", 20);
		showText(scene, util, 60, "Distribution du Silicon",
			[5, 6.5, 2.5], PonderPalette.WHITE, 80);
		rotateCameraY(scene, 20, 20);
		
		// Ligne d'assemblage des Calculation Mechanisms
		scene.addKeyframe();
		showSection(scene, util, seqAssembly, "SOUTH", 20);
		showText(scene, util, 60, "Ligne d'assemblage des\nCalculation Mechanisms",
			[5.5, 3.5, 0], PonderPalette.WHITE, 80);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(8.5, 3.5, 0), PonderPointing.RIGHT).withItem(indMech), 30);
		scene.idle(50);
		
		// Infos electrique
		scene.addKeyframe();
		scene.world().hideSection(
			util.select().everywhere()
				.substract(energyCircuit)
				.substract(util.select().position(1, 3, 14))
				.substract(util.select().layer(0)), 
			"UP");
		scene.special().hideElement(cartEC, "UP");
		scene.special().hideElement(cartIC, "UP");
		rotateCameraY(scene, 20, 40);
		
		mPos.forEach(p => {
			let v = util.vector().topOf(p[0], p[1], p[2]);
			let bb = AABB.ofBlock(util.grid().at(p[0], p[1], p[2]));
			scene.overlay().showControls(new PonderInput(v, PonderPointing.DOWN).withItem(RIC), 30);
			chaseBoundingBoxOutline(scene, PonderPalette.GREEN, bb, 30, 3);
		});
		scene.idle(40);
		
		let bcv = util.vector().topOf(bcPos[0], bcPos[1], bcPos[2]);
		let bcbb = AABB.of(bcPos[0], bcPos[1], bcPos[2], bcPos[0]+1, bcPos[1]+1, bcPos[2]+1);
		chaseBoundingBoxOutline(scene, PonderPalette.RED, bcbb, 30, 0);
		scene.overlay().showControls(new PonderInput(bcv, PonderPointing.DOWN).withItem(HIC), 30);
		scene.idle(50);
		
		showText(scene, util, 60, "Energy Use:", [150], PonderPalette.WHITE, 10);
		showText(scene, util, 60, "460 RF/t", [166], PonderPalette.FAST, 10);
		showText(scene, util, 60, "Sans compter les Chargers", 
			[182], PonderPalette.RED, 70);
		
		scene.world().showSection(
			util.select().everywhere()
				.substract(energyCircuit)
				.substract(util.select().position(1, 3, 14))
				.substract(util.select().layer(0)), 
			"DOWN");
		cartEC = scene.special().createCart(util.vector().topOf(12, 4, 8), 0, (w, x, y, z) => new HopperMinecart(w, x, y, z));
		cartIC = scene.special().createCart(util.vector().topOf(12, 4, 3), 0, (w, x, y, z) => new HopperMinecart(w, x, y, z));
		rotateCameraY(scene, -20, 20);

		// Autres infos usine - Taille globale 14x15
		scene.addKeyframe();
		showSelectionWithText(scene, util, [2, 1, 0, 14, 8, 14], 60,
			"L'usine complète peut tenir\nsur un seul chunk",
			[1, 4, 0], PonderPalette.GREEN, 80);
		
		// Stress Impact: 128.0x RPM
		let stressometer = AABB.of(3, 4, 0, 4, 5, 1);
		chaseBoundingBoxOutline(scene, PonderPalette.FAST, stressometer, 90, 0);
		showText(scene, util, 80, "Stress Impact:", [150], PonderPalette.WHITE, 10);
		showText(scene, util, 70, "128.0x RPM", [166], PonderPalette.FAST, 100);
		
		// Vue finale
		scene.addKeyframe();
		for(let i = 0; i < 145; i++) 
			rotateCameraY(scene, -2, 1);
	});
	
})
