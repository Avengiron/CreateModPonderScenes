onEvent("ponder.registry", event => {

	event.create("kubejs:factory3a", "kubejs:enderium_machine").tag("kubejs:main_quest")
	.scene("intro_3a", "Introduction au Chapitre 3A", "kubejs:ch3a_intro", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let depot = [1, 1, 1];
		let machine = [3, 1, 1, 3, 2, 1];
		let content = [
			[1, 1, 4, 3, 4, 4], // Portal 
			[3, 1, 3], // Quantum Ring
			[2, 1, 3], // Casing
			[1, 1, 3], // Quantum Link
			[2, 1, 2], // Depot
			[3, 1, 0], // Tank
			[1, 1, 0]  // Chest
		];
		
		// Utilities
		let absMech = Item.of("kubejs:abstruse_mechanism");
		let RIC = Item.of("thermal:upgrade_augment_3");
		
		showText(scene, util, 240, "Chapitre 3A", [16], PonderPalette.WHITE, 20);
		showText(scene, util, 230, "L'Âge de l'Enderium", [32], PonderPalette.GREEN, 40);
		showSection(scene, util, depot, "DOWN", 20);
		showText(scene, util, 70,
			"Le but de ce chapitre est de produire des §6Abstruse Mechanisms §fà partir d'Inductive Mechanisms",
			[1.5, 1 + 13 / 16.0, 1.5], PonderPalette.WHITE, 40);
		createItemOnBeltLike(scene, util, depot, "NORTH", absMech, 40);
		
		scene.addKeyframe();
		showSection(scene, util, machine, "DOWN", 20);
		showText(scene, util, 80,
			"À partir des §6Enderium Machines,\n§fon débloque les mécaniques de\nvoyage longue distance",
			[166], PonderPalette.WHITE, 40);
		showCompound(scene, util, content, "DOWN", 3, 0);
		createItemOnBeltLike(scene, util, [2, 1, 2], "NORTH", RIC, 39);
				
		showText(scene, util, 80, "Ce chapitre est facultatif",
			[166], PonderPalette.OUTPUT, 80);
	})
	.scene("poise_auto", "Duplication de Tall Poise Bush", "kubejs:ch3a_poise", (scene, util) => {
		scene.configureBasePlate(0, 0, 6);
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let demoDepot = [2, 3, 1];
		let belts = [[1, 2, 3, 3, 2, 3], [1, 2, 2, 2, 2, 2], [1, 2, 1, 2, 2, 1]];
		let backBelt = [[1, 1, 3, 4, 1, 3], [5, 1, 2, 5, 1, 3]];
		let tunnel = [1, 3, 1, 1, 3, 3];
		let waterCircuit = [[3, 3, 3, 5, 3, 3], [4, 3, 2], [3, 3, 1, 5, 3, 1]];
		let energyCircuit = [[5, 1, 1], [4, 1, 1], [3, 1, 1]];
		let inFunnel = [5, 2, 2];
		let nullifier = [4, 2, 2];
		let hopper = [0, 1, 4];
		
		// Utilities
		let tallPoise = Item.of("endergetic:tall_poise_bush");
		let tallPoise3 = Item.of("endergetic:tall_poise_bush", 16);
		let cluster = Item.of("endergetic:poise_cluster");
		let poise = Item.of("endergetic:poise_bush");
		let eSlimeBall = Item.of("tconstruct:ender_slime_ball");
		let reconfigurator = Item.of("thermal:side_config_augment");
		let RIC = Item.of("thermal:upgrade_augment_2");
		let filter = Item.of("thermal:item_filter_augment");
		
		// Demo Insulators - Apparition de machines non configurees
		for(let x = 5; x >= 3; x--) {
			let IS = scene.world().showIndependentSection(util.select().position(x, 2, 0), "DOWN");
			moveSection(scene, util, IS, [0, 0, 1], 0, 3);
		}
		scene.idle(20);
		
		showText(scene, util, 80,
			"Pour toutes les machines Thermal:\n\nConfigurez les entrées/sorties des machines avec des Modular Reconfigurations",
			[3, 2.5, 1.5], PonderPalette.OUTPUT, 90);
		for(let x = 5; x >= 3; x--) {
			scene.overlay().showControls(new PonderInput(util.vector().of(x + 0.5, 2.5, 1), PonderPointing.RIGHT).rightClick().withItem(reconfigurator), 10);
			scene.idle(10);
			// Remplacement des machines par des machines configurees
			setBlock(scene, util, [x, 2, 0], "minecraft:air", false, 0);
			let IS = scene.world().showIndependentSectionImmediately(util.select().position(x, 2, 1));
			scene.idle(2);
		}
		scene.idle(20);
		
		let dDepotIS = scene.world().showIndependentSection(util.select().position(2, 3, 1), "DOWN");
		moveSection(scene, util, dDepotIS, [0, -1, 0], 0, 23);
				
		// Theorie
		scene.addKeyframe();
		showText(scene, util, 60, 
			"Avec 3 Insulators, on peut dupliquer une Tall Poise Bush",
			[100], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(5, 2, 1), PonderPointing.DOWN).withItem(tallPoise), 30);
		scene.idle(15);
		modifyBlock(scene, util, [5, 2, 1], "active", "true", 25);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(4, 2, 1), PonderPointing.DOWN).withItem(cluster), 30);
		scene.idle(15);
		modifyBlock(scene, util, [4, 2, 1], "active", "true", 15);
		modifyBlock(scene, util, [5, 2, 1], "active", "false", 10);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 2, 1), PonderPointing.DOWN).withItem(poise), 30);
		scene.idle(15);
		modifyBlock(scene, util, [3, 2, 1], "active", "true", 15);
		modifyBlock(scene, util, [4, 2, 1], "active", "false", 10);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 2, 1), PonderPointing.DOWN).withItem(tallPoise), 30);
		scene.idle(15);
		createItemOnBeltLike(scene, util, demoDepot, "EAST", tallPoise3, 15);
		modifyBlock(scene, util, [3, 2, 1], "active", "false", 30);
		
		showText(scene, util, 50, "1x Tall Poise Bush en entrée",
			[84], PonderPalette.INPUT, 10);
		showText(scene, util, 50, "3x Tall Poise Bush en sortie",
			[100], PonderPalette.OUTPUT, 70);
		
		// Secondary Output
		scene.addKeyframe();
		showText(scene, util, 60,
			"La deuxième étape produit également une Slime Ball,\ndont on ne veut pas",
			[4.5, 2.5, 1], PonderPalette.WHITE, 30);		
		scene.overlay().showControls(new PonderInput(util.vector().of(4.5, 2.5, 1), PonderPointing.RIGHT).withItem(eSlimeBall), 30);
		scene.idle(40);
		rotateCameraY(scene, -110, 45);
		
		showSection(scene, util, nullifier, "DOWN", 20);
		scene.overlay().showControls(new PonderInput(util.vector().of(4.5, 2.5, 3), PonderPointing.RIGHT).withItem(filter), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(4.5, 2.5, 3), PonderPointing.LEFT).withItem(eSlimeBall).showing(AllIcons.I_WHITELIST), 30);
		scene.idle(40);
		rotateCameraY(scene, 110, 45);
		
		// Configurations additionnelles
		scene.addKeyframe();
		showText(scene, util, 60, "Les machines ont besoin\nd'énergie électrique…",
			[4.5, 2.5, 1], PonderPalette.WHITE, 50);
		showCompound(scene, util, energyCircuit, "UP", 3, 20);
		showText(scene, util, 60, "…Ainsi que d'un apport en eau",
			[4.5, 3, 1.5], PonderPalette.INPUT, 50);
		showCompound(scene, util, waterCircuit, "DOWN", 3, 40);
		
		chaseBoundingBoxOutline(scene, PonderPalette.WHITE, AABB.of(3, 2, 1, 4, 3, 2), 90, 0);
		showText(scene, util, 60,
			"La troisième machine traite 3x plus d'items que les autres Insulators",
			[3.5, 2.5, 1], PonderPalette.WHITE, 60);		
		scene.overlay().showControls(new PonderInput(util.vector().of(3.5, 2.5, 1), PonderPointing.RIGHT).rightClick().withItem(RIC), 30);
		scene.idle(40);
		
		showText(scene, util, 80,
			"Le reste consiste à renvoyer une Tall Poise Bush en entrée, et à utiliser les deux autres",
			[2, 2 + 5.5 / 16.0, 1.5], PonderPalette.GREEN, 90);
		
		// Split des Tall Poise Bushes
		scene.addKeyframe();
		scene.world().hideIndependentSection(dDepotIS, "UP");
		scene.idle(20);
		
		showCompound(scene, util, belts, "DOWN", 3, 7);
		for(let z = 3; z >= 1; z--) 
			showSection(scene, util, [0, 2, z], "DOWN", 3);
		scene.idle(17);
		showSection(scene, util, tunnel, "DOWN", 20);
		
		// Config du Tunnel - Round-Robin
		showScrollInput(scene, util, [1 + 0.5, 3 + 1, 1 + 0.5], "DOWN", 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(1 + 0.5, 3 + 1.25, 1 + 0.5), PonderPointing.DOWN).withWrench().showing(AllIcons.I_TUNNEL_ROUND_ROBIN), 40);
		scene.idle(50);
		for(let z = 1; z <= 3; z++) 
			createItemOnBeltLike(scene, util, [1, 2, z], "DOWN", tallPoise, 20);
		
		rotateCameraY(scene, -110, 45);
		hideCompound(scene, util, waterCircuit, "UP", 0, 20);
		
		// Retour
		scene.addKeyframe();
		showCompound(scene, util, backBelt, "NORTH", 5, 15);
		let hopperIS = scene.world().showIndependentSection(util.select().position(0, 1, 4), "NORTH");
		moveSection(scene, util, hopperIS, [0, 0, -1], 0, 20);
		
		removeItemsFromBelt(scene, util, [0, 2, 3], 20);
		indicateSuccess(scene, util, [1, 1, 3], 0);
		createItemOnBeltLike(scene, util, [1, 1, 3], "WEST", tallPoise, 20);
		for(let i = 0; i < 70; i++) 
			rotateCameraY(scene, -1, 1);
		scene.idle(20);
		
		showSection(scene, util, inFunnel, "DOWN", 30);
		flapFunnel(scene, util, inFunnel, false, 0);
		removeItemsFromBelt(scene, util, [5, 1, 2], 0);
		modifyBlock(scene, util, [3, 2, 1], "active", "true", 0);
		modifyBlock(scene, util, [4, 2, 1], "active", "true", 0);
		modifyBlock(scene, util, [5, 2, 1], "active", "true", 20);
		showCompound(scene, util, waterCircuit, "DOWN", 0, 0);
		for(let i = 0; i < 60; i++) 
			rotateCameraY(scene, -3, 1);
	})
	.scene("poise_manu", "Ferme à Poise Bush", "kubejs:ch3a_poise_alt", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let vacuum = [3, 1, 0];
		let depls = [[3, 1, 3], [3, 2, 3], [3, 3, 3]];
		let inFunnelTop = [2, 2, 3];
		let inFunnelBot = [2, 1, 3];
		let depot = [1, 1, 1];
		let arm = [1, 1, 3];
		let eMoss = [3, 1, 1];
		let poiseBlock = util.select().position(3, 2, 1);
		let tPoiseBlock = util.select().fromTo(0, 2, 4, 0, 3, 4);
		
		// Utilities
		let boneMeal = Item.of("minecraft:bone_meal");
		let tallPoise = Item.of("endergetic:tall_poise_bush");
		let shears = Item.of("minecraft:shears");
		let filter = Item.of("thermal:item_filter_augment");
		let emptyStack = Item.getEmpty();
		
		showText(scene, util, 60,
			"Si vous préférez une méthode old-school, ou plus rapide…",
			[100], PonderPalette.BLACK, 70);
		
		showCompound(scene, util, depls, "NORTH", 5, 15);
		showSection(scene, util, eMoss, "DOWN", 20);
		showSection(scene, util, inFunnelBot, "EAST", 5); 
		showSection(scene, util, inFunnelTop, "EAST", 5); 
		showSection(scene, util, depot, "DOWN", 20);
		createItemOnBeltLike(scene, util, depot, "NORTH", boneMeal, 10);
		showText(scene, util, 60, "On sait déjà produire\nde la Bone Meal",
			[1.5, 1 + 13 / 16.0, 1.5], PonderPalette.GREEN, 80);
			
		let input = AABB.of(1, 1+1/16.0, 1, 2, 1+13/16.0, 2);
		let output1 = AABB.of(2.4, 1, 3, 3, 2, 4);
		let output2 = AABB.of(2.4, 2, 3, 3, 3, 4);
		chaseBoundingBoxOutline(scene, PonderPalette.INPUT, input, 44, 10);
		chaseBoundingBoxOutline(scene, PonderPalette.OUTPUT, output1, 32, 5);
		chaseBoundingBoxOutline(scene, PonderPalette.OUTPUT, output2, 30, 15);
		
		showSection(scene, util, arm, "DOWN", 15);
		indicateSuccess(scene, util, arm, 0);
		setKineticSpeed(scene, util, arm, 48, 20);
		
		// Animation Arm
		scene.addKeyframe();
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_INPUT, emptyStack, 0, 24);
		removeItemsFromBelt(scene, util, depot, 0);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_OUTPUTS, boneMeal, -1, 20);
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_OUTPUT, boneMeal, 0, 24);
		flapFunnel(scene, util, inFunnelBot, false, 0);
		modifyTileNBT(scene, util, depls[0], { HeldItem: boneMeal }, 0);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_INPUTS, emptyStack, -1, 20);
		
		createItemOnBeltLike(scene, util, depot, "NORTH", boneMeal, 0);
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_INPUT, emptyStack, 0, 24);
		removeItemsFromBelt(scene, util, depot, 0);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_OUTPUTS, boneMeal, -1, 20);
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_OUTPUT, boneMeal, 1, 24);
		flapFunnel(scene, util, inFunnelTop, false, 0);
		modifyTileNBT(scene, util, depls[1], { HeldItem: boneMeal }, 0);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_INPUTS, emptyStack, -1, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 3, 3), PonderPointing.DOWN).withItem(shears), 30);
		scene.idle(15);
		modifyTileNBT(scene, util, depls[2], { HeldItem: shears }, 25);
		
		// Animation Poise
		scene.addKeyframe();
		showText(scene, util, 80,
			"Appliquer de la Bone Meal sur de la §dPoismoss §ffait pousser une Poise Bush OU une Tall Poise Bush",
			[3, 1.5, 1.5], PonderPalette.WHITE, 90);
		moveDeployer(scene, util, depls[0], 1, 19, 20);
		modifyTileNBT(scene, util, depls[0], { HeldItem: emptyStack }, 0);
		let pIS = scene.world().showIndependentSectionImmediately(poiseBlock);
		indicateSuccess(scene, util, [3, 2, 1], 0);
		moveDeployer(scene, util, depls[0], -1, 19, 20);
		
		scene.addKeyframe();
		showText(scene, util, 80,
			"Appliquer de la Bone Meal sur\nune Poise Bush la transforme\nen §eTall §fPoise Bush",
			[3, 2.5, 1.5], PonderPalette.WHITE, 100);
		moveDeployer(scene, util, depls[1], 1, 19, 20);
		modifyTileNBT(scene, util, depls[1], { HeldItem: emptyStack }, 0);
		setBlock(scene, util, [3, 2, 1], "minecraft:air", true, 0);
		let tpIS = scene.world().showIndependentSectionImmediately(tPoiseBlock);
		moveSection(scene, util, tpIS, [3, 0, -3], 0, 0);
		indicateSuccess(scene, util, [3, 2, 1], 0);
		moveDeployer(scene, util, depls[1], -1, 19, 30);
		
		scene.addKeyframe();
		moveDeployer(scene, util, depls[2], 1, 19, 20);
		setBlock(scene, util, [0, 2, 4], "minecraft:air", false, 0);
		setBlock(scene, util, [0, 3, 4], "minecraft:air", false, 0);
		let poiseIE = createItemEntity(scene, util, [3.5, 3.5, 1.5], [-0.075, 0.1, -0.075], tallPoise, 0);
		moveDeployer(scene, util, depls[2], -1, 19, 40);
		
		// Output
		showSection(scene, util, vacuum, "DOWN", 30);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(3.5, 1.5, 0), PonderPointing.RIGHT).withItem(filter), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(3.5, 1.5, 0), PonderPointing.LEFT).withItem(tallPoise).showing(AllIcons.I_WHITELIST), 30);
		scene.idle(40);
		
		showText(scene, util, 60,
			"La Tall Poise Bush est aspirée\npar le Vacuumulator",
			[3, 1.5, 0.5], PonderPalette.WHITE, 35);
		modifyEntity(scene, poiseIE, e => e.kill(), 35);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 1, 0), PonderPointing.DOWN).withItem(tallPoise), 30);
		scene.idle(20);
	})
	.scene("silver_part", "Fabrication de Silver Ingots", "kubejs:ch3a_silver", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Partie Silver Coin -----------------------------------------------------
		// Sections & Positions
		let baseFarm = [[4, 6, 1], [4, 6, 2], [4, 6, 3], [3, 6, 3], 
			[2, 6, 3], [2, 6, 2], [2, 6, 1], [3, 6, 1], [3, 6, 2]];
		let lilypad = util.select().position(3, 7, 2);
		let mushrooms = [[4, 7, 2], [4, 7, 3], [3, 7, 3], 
			[2, 7, 3], [2, 7, 2], [2, 7, 1], [3, 7, 1]];
		let rail = [[1, 6, 4], [1, 6, 3], [1, 6, 2], [1, 6, 1], [1, 6, 0]];
		let mCart = util.select().fromTo(1, 7, 4, 1, 9, 4)
			.add(util.select().fromTo(2, 7, 4, 4, 7, 4))
			.add(util.select().position(0, 9, 4));
		let outFarm = util.select().fromTo(0, 8, 2, 0, 9, 2);
		let tStation = util.select().fromTo(0, 6, 2, 0, 7, 2);
		let depot = util.select().position(0, 7, 1);
		
		// Utilities
		let tCard = Item.of("kubejs:profession_card_farming");
		let bMush = Item.of("minecraft:brown_mushroom");
		let rMush = Item.of("minecraft:red_mushroom");
		let sCoin64 = Item.of("thermal:silver_coin", 64);
		let yShift = [0, -5, -1];
		let indySects = [];
		
		let toFirst = [0, 0, -1.5];
		let toNext = [0, 0, -1];
		let toEnd = [0, 0, -.5];
		let toBase = [0, 0, 4];
		
		// Conditions initiales
		setBlock(scene, util, [4, 7, 1], "minecraft:brown_mushroom", false, 0);
		
		showText(scene, util, 80,
			"Le seul moyen d'obtenir des\nSilver Ingots est de faire\nfondre des Silver Coins",
			[66], PonderPalette.WHITE, 100);
		showText(scene, util, 50, "Commençons par les Silver Coins",
			[100], PonderPalette.GREEN, 25);
		showText(scene, util, 60, "Note:\nToute mon agriculture est\nséparée des Chapitres principaux",
			[175], PonderPalette.OUTPUT, 70);
		
		// Apparition du champ et du Lilypad
		baseFarm.forEach(p => {
			let s = util.select().position(p[0], p[1], p[2]);
			let IS = scene.world().showIndependentSection(s, "DOWN");
			indySects.push(IS);
			moveSection(scene, util, IS, yShift, 0, 3);
		});
		scene.idle(20);
		
		let IS = scene.world().showIndependentSection(lilypad, "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 20);
		showText(scene, util, 50, "Lilypad of Fertility",
			[3.5, 2 + 2 / 16.0, 1.5], PonderPalette.GREEN, 70);
		
		// Theorie sur 1 champignon
		IS = scene.world().showIndependentSection(util.select().position(4, 7, 1), "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, yShift, 0, 0);
		showText(scene, util, 60, "Un Mushroom sur du Rich\nSoil forme une colonie",
			[4.5, 2, 0.5], PonderPalette.WHITE, 70);
		restoreBlocks(scene, util, [4, 7, 1], 0);
		indicateSuccess(scene, util, [4, 2, 0], 0);
		modifyBlock(scene, util, [4, 7, 1], "age", "0", 20);
		indicateSuccess(scene, util, [4, 2, 0], 0);
		modifyBlock(scene, util, [4, 7, 1], "age", "1", 20);
		indicateSuccess(scene, util, [4, 2, 0], 0);
		modifyBlock(scene, util, [4, 7, 1], "age", "2", 20);
		indicateSuccess(scene, util, [4, 2, 0], 0);
		modifyBlock(scene, util, [4, 7, 1], "age", "3", 30);
		
		// Apparition des autres champis, et infos sur la ferme
		scene.addKeyframe();
		mushrooms.forEach(p => {
			let s = util.select().position(p[0], p[1], p[2]);
			IS = scene.world().showIndependentSection(s, "DOWN");
			indySects.push(IS);
			moveSection(scene, util, IS, yShift, 0, 3);
		});
		scene.idle(20);
		
		showText(scene, util, 60, "Les Mushrooms ne poussent\nque dans des endroits sombres",
			[79], PonderPalette.WHITE, 10);
		showText(scene, util, 60, "Light Level < 13", [104], PonderPalette.RED, 70);
		
		let lilyArea = AABB.of(-1, 1, -3, 8, 5, 6);
		chaseBoundingBoxOutline(scene, PonderPalette.GREEN, lilyArea, 60, 0);
		showText(scene, util, 60, "Zone d'effet du Lilypad\n9 x 6 x 9",
			[100], PonderPalette.GREEN, 70);
		
		// Cart pour recolte
		scene.addKeyframe();
		rail.forEach(p => {
			let s = util.select().position(p[0], p[1], p[2]);
			IS = scene.world().showIndependentSection(s, "DOWN");
			indySects.push(IS);
			moveSection(scene, util, IS, [0, -5, 0], 0, 3);
		});
		scene.idle(20);
		
		let cart = scene.special().createCart(util.vector().topOf(1, 0, 4), 90, (w, x, y, z) => new Minecart(w, x, y, z));
		let anchor = scene.world().showIndependentSection(util.select().position(2, 6, 4), "DOWN");
		let contraption = scene.world().showIndependentSection(mCart, "DOWN");
		moveSection(scene, util, anchor, [-1, -5, 0], 0, 0);
		moveSection(scene, util, contraption, [0, -5, 0], 0, 20);
		
		let mCartAABB = util.select().fromTo(1, 2, 4, 1, 4, 4)
			.add(util.select().fromTo(2, 2, 4, 4, 2, 4))
			.add(util.select().position(0, 4, 4));
		scene.overlay().showSelectionWithText(mCartAABB, 60)
			.text("La récolte se fait avec\nun Minecart Contraption")
			.pointAt(util.vector().of(1, 2.5, 5))
			.placeNearTarget();
		scene.idle(70);
		
		// Aller (& recolte)
		toggleRedstonePower(scene, util, [1, 6, 0, 1, 6, 4], 20);
		scene.special().moveCart(cart, toFirst, 15);
		moveSection(scene, util, anchor, toFirst, 15, 0);
		moveSection(scene, util, contraption, toFirst, 15, 15);
		for(let x = 2; x <= 4; x++) modifyBlock(scene, util, [x, 7, 3], "age", "0", 0);
		
		scene.special().moveCart(cart, toNext, 10);
		moveSection(scene, util, anchor, toNext, 10, 0);
		moveSection(scene, util, contraption, toNext, 10, 10);
		for(let x = 2; x <= 4; x+=2) modifyBlock(scene, util, [x, 7, 2], "age", "0", 0);
		
		scene.special().moveCart(cart, toNext, 10);
		moveSection(scene, util, anchor, toNext, 10, 0);
		moveSection(scene, util, contraption, toNext, 10, 10);
		for(let x = 2; x <= 4; x++) modifyBlock(scene, util, [x, 7, 1], "age", "0", 0);
		
		scene.special().moveCart(cart, toEnd, 5);
		moveSection(scene, util, anchor, toEnd, 5, 0);
		moveSection(scene, util, contraption, toEnd, 5, 5);
		
		// Retour
		scene.special().moveCart(cart, toBase, 40);
		moveSection(scene, util, anchor, toBase, 40, 0);
		moveSection(scene, util, contraption, toBase, 40, 60);
		rotateCameraY(scene, -20, 20);
		
		// Trading
		scene.addKeyframe();
		IS = scene.world().showIndependentSection(tStation, "EAST");
		indySects.push(IS);
		moveSection(scene, util, IS, [0, -5, 0], 0, 20);
		showText(scene, util, 60, "Les Mushrooms sont vendus\ndans une Trading Station",
			[0, 2.5, 2.5], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 2, 2), PonderPointing.DOWN).withItem(tCard), 30);
		scene.idle(40);
		
		// Animation des storage interfaces
		IS = scene.world().showIndependentSection(outFarm, "DOWN");
		indySects.push(IS);
		moveSection(scene, util, IS, [0, -5, 0], 0, 20);
		modifyTileNBT(scene, util, [0, 9, 4], { Distance: 1 }, 0);
		modifyTileNBT(scene, util, [0, 9, 2], { Distance: 1 }, 0);
		modifyTileNBT(scene, util, [0, 9, 4], { Timer: 40 }, 0);
		modifyTileNBT(scene, util, [0, 9, 2], { Timer: 40 }, 40);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(0, 2.5, 2.5), PonderPointing.RIGHT).withItem(bMush), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(0, 2.5, 2.5), PonderPointing.LEFT).withItem(rMush), 30);
		scene.idle(40);
		
		modifyTileNBT(scene, util, [0, 9, 4], { Timer: 0 }, 0);
		modifyTileNBT(scene, util, [0, 9, 2], { Timer: 0 }, 20);
		
		IS = scene.world().showIndependentSection(depot, "SOUTH");
		indySects.push(IS);
		moveSection(scene, util, IS, [0, -5, 0], 0, 20);
		createItemOnBeltLike(scene, util, [0, 7, 1], "SOUTH", sCoin64, 20);
		showText(scene, util, 30, "§6Stonks !", [0.5, 2 + 13 / 16.0, 1.5], PonderPalette.BLACK, 50);
		rotateCameraY(scene, 20, 20);
			
		showText(scene, util, 60, "3x plus rentable que les\nfermes à Sweet Berries",
			[166], PonderPalette.FAST, 80);
			
		indySects.forEach(s => scene.world().hideIndependentSection(s, "UP"));
		scene.world().hideIndependentSection(contraption, "UP")
		scene.world().hideIndependentSection(anchor, "UP")
		scene.special().hideElement(cart, "UP");
		scene.idle(40);
		
		// Partie Ingot -----------------------------------------------------------
		// Sections & Positions
		let redstoneCtrl = [1, 4, 1, 2, 4, 1];
		let inFluid = [[2, 1, 1], [3, 1, 1], [4, 1, 1]];
		let inFarm = [3, 3, 1, 3, 4, 1];
		let melter = [2, 3, 1];
		let fluidTank = [2, 2, 1];
		let drain = [1, 3, 1];
		let castTable = [1, 2, 1];
		let outTable = [0, 1, 1, 1, 1, 1];
		
		// Utilities
		let sCoin = Item.of("thermal:silver_coin");
		let sIngot = Item.of("thermal:silver_ingot");
		let castIngot = Item.of("tconstruct:ingot_cast");
		
		// Conditions initiales
		toggleRedstonePower(scene, util, [1, 4, 1], 0);
		modifyBlock(scene, util, melter, "active", "false", 0);
		modifyTileNBT(scene, util, melter, { 
			inventory: { items: [new CompoundNBT(), new CompoundNBT(), new CompoundNBT()]},
			tank: { Amount: 0 }
		}, 0);
		modifyTileNBT(scene, util, fluidTank, { tank:{ Amount: 0 }}, 0);
		modifyTileNBT(scene, util, drain, { render_fluid: { Amount: 0 }}, 0);
		modifyTileNBT(scene, util, castTable, { 
			Items: [new CompoundNBT()],
			tank: { fluid: { Amount: 0 }}
		}, 0);
		setKineticSpeed(scene, util, inFluid[1], 16, 0);
		
		// Inputs
		scene.addKeyframe();
		showSection(scene, util, fluidTank, "DOWN", 0);
		showSection(scene, util, melter, "DOWN", 20);
		showText(scene, util, 60, "Maintenant, il faut fondre les Coins",
			[2, 3.5, 1.5], PonderPalette.WHITE, 80);
		showSection(scene, util, inFarm, "DOWN", 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 4, 1), PonderPointing.DOWN).withItem(sCoin), 30);
		scene.idle(40);
		
		restoreBlocks(scene, util, melter, 0);
		modifyBlock(scene, util, melter, "active", "false", 0);
		modifyTileNBT(scene, util, melter, { tank: { Amount: 0 }}, 20);
		
		// Animation Fuel Tank
		scene.addKeyframe();
		showCompound(scene, util, inFluid, "WEST", 3, 20);
		showText(scene, util, 60, "Le Melter est alimenté\nen Blazing Blood",
			[2, 2.5, 1.5], PonderPalette.WHITE, 30);
		restoreBlocks(scene, util, fluidTank, 0);
		for(let vol = 100; vol <= 4000; vol += 100) 
			modifyTileNBT(scene, util, fluidTank, { tank: { Amount: vol }}, 1);
		modifyBlock(scene, util, melter, "active", "true", 30);
		
		// Animation fonte des Coins
		scene.addKeyframe();
		restoreBlocks(scene, util, melter, 0);
		for(let vol = 8; vol <= 432; vol += 8) 
			modifyTileNBT(scene, util, melter, { tank: { Amount: vol }}, 1);
		modifyBlock(scene, util, melter, "active", "false", 0);
		modifyTileNBT(scene, util, melter, { 
			inventory: { items: [new CompoundNBT(), new CompoundNBT(), new CompoundNBT()]},
			tank: { Amount: 432 }
		}, 30);
		
		// Config Casting Table
		showSection(scene, util, castTable, "DOWN", 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 2, 1), PonderPointing.DOWN).rightClick().withItem(castIngot), 30);
		scene.idle(40);
		
		restoreBlocks(scene, util, castTable, 0);
		modifyTileNBT(scene, util, castTable, { tank: { fluid: { Amount: 0 }}}, 20);
		
		// Drain et Redstone 
		showSection(scene, util, drain, "EAST", 10);
		showSection(scene, util, redstoneCtrl, "DOWN", 20);
		
		// Animation Casting
		toggleRedstonePower(scene, util, [1, 4, 1], 0);
		indicateRedstone(scene, util, [1, 4, 1], 0);
		restoreBlocks(scene, util, drain, 0);
		for(let vol = 12; vol <= 144; vol += 12) {
			let melterVol = 432 - 3 * vol;
			modifyTileNBT(scene, util, castTable, { 
				tank: { fluid: { FluidName: "tconstruct:molten_silver", Amount: vol }}
			}, 0);
			if(vol == 144)
				modifyTileNBT(scene, util, drain, { render_fluid: { Amount: 0 }}, 0);
			modifyTileNBT(scene, util, melter, { tank:{ Amount: melterVol }}, 3);
		}
		scene.idle(20);
		toggleRedstonePower(scene, util, [1, 4, 1], 40);
		
		// Outputs
		showSection(scene, util, outTable, "EAST", 20);
		indicateSuccess(scene, util, castTable, 20);
		restoreBlocks(scene, util, castTable, 0);
		modifyTileNBT(scene, util, castTable, { tank: { fluid: { Amount: 0 }}}, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 1, 1), PonderPointing.DOWN).withItem(sIngot), 30);
		scene.idle(20);	
	})
	.scene("enderium_part", "Enderium & Abstruse Mechanism", "kubejs:ch3a_enderium", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let smelter1 = [3, 2, 1];
		let inDepot1 = [4, 2, 1];
		let inDepot2 = [3, 2, 2];
		let chute1 = [3, 3, 1];
		let enderDepot = [2, 2, 1];
		let energyCircuit = [[3, 1, 1], [2, 1, 1]];
		
		let smelter2 = util.select().position(1, 2, 1);
		let outDepot = util.select().position(0, 2, 1);
		let chute2 = util.select().position(1, 3, 1);
		
		// Utilities
		let tallPoise = Item.of("endergetic:tall_poise_bush");
		let sIngot = Item.of("thermal:silver_ingot");
		let enderDust = Item.of("appliedenergistics2:ender_dust", 33);
		let eIngot = Item.of("thermal:enderium_ingot");
		let indMech = Item.of("kubejs:inductive_mechanism");
		let absMech = Item.of("kubejs:abstruse_mechanism");
		
		// Inputs
		showSection(scene, util, smelter1, "DOWN", 20);
		showText(scene, util, 60,
			"Ce premier Smelter s'occupe\nde fabriquer l'Enderium Ingot",
			[3, 2.5, 1.5], PonderPalette.WHITE, 70);
		showText(scene, util, 80,
			"Il faut gérer :\n3 entrées\n1 sortie\nL'alimentation",
			[3, 2.5, 1.5], PonderPalette.INPUT, 90);
		showSection(scene, util, inDepot1, "DOWN", 5);
		showSection(scene, util, inDepot2, "DOWN", 20);
		
		scene.addKeyframe();
		createItemOnBeltLike(scene, util, inDepot1, "EAST", tallPoise, 5);
		createItemOnBeltLike(scene, util, inDepot2, "SOUTH", sIngot, 20);
		showSection(scene, util, chute1, "DOWN", 20);
		let edIE = createItemEntity(scene, util, [3.5, 6.5, 1.5], [0, 0.1, 0], enderDust, 15);
		modifyEntity(scene, edIE, e => e.kill(), 5);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 3, 1), PonderPointing.DOWN).withItem(enderDust), 30);
		showText(scene, util, 60, "On sait déjà produire\nde l'Ender Dust",
			[3 + 1 / 16.0, 3.5, 1.5], PonderPalette.GREEN, 80);
		
		// Animation process Enderium
		removeItemsFromBelt(scene, util, inDepot1, 5);
		removeItemsFromBelt(scene, util, inDepot2, 20);
		modifyBlock(scene, util, smelter1, "active", "true", 20);
		showSection(scene, util, enderDepot, "DOWN", 20);
		createItemOnBeltLike(scene, util, enderDepot, "EAST", eIngot, 15);
		modifyBlock(scene, util, smelter1, "active", "false", 30);
		
		// Premiere recette Abstruse Mechanism
		scene.addKeyframe();
		let s2IS = scene.world().showIndependentSection(smelter2, "DOWN");
		scene.idle(5);
		showCompound(scene, util, energyCircuit, "UP", 3, 0);
		let thirdEnergyPipe = scene.world().showIndependentSection(util.select().position(1, 1, 1), "UP");
		scene.idle(20);
		showText(scene, util, 60,
			"Ce second Smelter s'occupe de fabriquer l'Abstruse Mechanism",
			[1, 2.5, 1.5], PonderPalette.WHITE, 70);
		let c2IS = scene.world().showIndependentSection(chute2, "DOWN");
		scene.idle(20);
		let imIE = createItemEntity(scene, util, [1.5, 6.5, 1.5], [0, 0.1, 0], indMech, 15);
		modifyEntity(scene, imIE, e => e.kill(), 5);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 3, 1), PonderPointing.DOWN).withItem(indMech), 30);
		scene.idle(40);
		
		removeItemsFromBelt(scene, util, enderDepot, 20);
		modifyBlock(scene, util, [1, 2, 1], "active", "true", 20);
		let odIS = scene.world().showIndependentSection(outDepot, "DOWN");
		scene.idle(20);
		createItemOnBeltLike(scene, util, [0, 2, 1], "EAST", absMech, 15);
		modifyBlock(scene, util, [1, 2, 1], "active", "false", 30);
		hideSection(scene, util, [2, 1, 1, 2, 2, 1], "UP", 15);
		
		let indySects = [s2IS, c2IS, odIS, thirdEnergyPipe];
		indySects.forEach(is => moveSection(scene, util, is, [1, 0, 0], 15, 0));
		scene.idle(25);
		
		// Avertissement
		scene.addKeyframe();
		showText(scene, util, 90, "Le chapitre 3A pourrait\ns'arrêter là…",
			[65], PonderPalette.WHITE, 40);
		showText(scene, util, 60, "Mais c'est bien trop simple,\net trop peu couteux",
			[90], PonderPalette.RED, 50);
	})
	.scene("gear_part", "Fonderie à Enderium Gear", "kubejs:ch3a_gear", (scene, util) => {
		// Edit schematic : Contenu du melter 1x enderium_ingot
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let enderiumProd = [[3, 2, 2], [3, 2, 1], 
			[3, 3, 1], [4, 3, 1], [3, 3, 2], [3, 4, 1]]
		let redstoneCtrl = [1, 4, 1, 2, 4, 1];
		let inFluid = [[2, 1, 1], [3, 1, 1], [4, 1, 1]];
		let melter = [2, 3, 1];
		let fluidTank = [2, 2, 1];
		let drain = [1, 3, 1];
		let castTable = [1, 2, 1];
		let outFarm = [0, 1, 1, 1, 1, 1];
		
		// Utilities
		let tallPoise = Item.of("endergetic:tall_poise_bush");
		let sIngot = Item.of("thermal:silver_ingot");
		let enderDust = Item.of("appliedenergistics2:ender_dust", 33);
		let eIngot = Item.of("thermal:enderium_ingot");
		let gear = Item.of("thermal:enderium_gear");
		let castGear = Item.of("tconstruct:gear_cast");
		
		// Conditions initiales
		modifyTileNBT(scene, util, [3, 3, 1], { Xfer: { XferIn: 0 }}, 0); // Smelter autoinput false
		modifyTileNBT(scene, util, melter, { 
			inventory: { items: [new CompoundNBT(), new CompoundNBT(), new CompoundNBT()]},
			tank: { Amount: 0 }
		}, 0);
		modifyTileNBT(scene, util, fluidTank, { tank:{ Amount: 0 }}, 0);
		modifyTileNBT(scene, util, drain, { render_fluid: { Amount: 0 }}, 0);
		modifyTileNBT(scene, util, castTable, { 
			Items: [new CompoundNBT()],
			tank: { fluid: { Amount: 0 }}
		}, 0);
		setKineticSpeed(scene, util, inFluid[1], 16, 0);
		
		// Inputs
		showCompound(scene, util, enderiumProd, "DOWN", 3, 20);
		createItemOnBeltLike(scene, util, [4, 3, 1], "EAST", tallPoise, 5);
		createItemOnBeltLike(scene, util, [3, 3, 2], "SOUTH", sIngot, 5);
		let edIE = createItemEntity(scene, util, [3.5, 7.5, 1.5], [0, 0.1, 0], enderDust, 15);
		modifyEntity(scene, edIE, e => e.kill(), 5);
		showSelectionWithText(scene, util, [3,2,1, 4,4,2], 60,
			"Production d'Enderium Ingots",
			[3, 3.5, 1.5], PonderPalette.GREEN, 80);
		showSection(scene, util, fluidTank, "DOWN", 0);
		showSection(scene, util, melter, "DOWN", 20);
		showText(scene, util, 60, "On veut transformer\n4x Enderium Ingots en\n1x Enderium Gear",
			[2, 3.5, 1.5], PonderPalette.WHITE, 80);
		
		// Blazing Blood
		scene.addKeyframe();
		showCompound(scene, util, inFluid, "WEST", 3, 20);
		showText(scene, util, 60, "Le Melter est alimenté\nen Blazing Blood",
			[2, 2.5, 1.5], PonderPalette.WHITE, 30);
		restoreBlocks(scene, util, fluidTank, 0);
		for(let vol = 100; vol <= 4000; vol += 100) 
			modifyTileNBT(scene, util, fluidTank, { tank: { Amount: vol }}, 1);
		showSection(scene, util, castTable, "DOWN", 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 2, 1), PonderPointing.DOWN).rightClick().withItem(castGear), 30);
		scene.idle(40);
		
		restoreBlocks(scene, util, castTable, 0);
		modifyTileNBT(scene, util, castTable, { tank: { fluid: { Amount: 0 }}}, 20);
		showSection(scene, util, drain, "EAST", 20);
		
		// Animation fonte 4x Ingots 
		scene.addKeyframe();
		modifyBlock(scene, util, [3, 3, 1], "active", "true", 40);
		modifyBlock(scene, util, melter, "active", "true", 0);
		for(let i = 0; i <= 3; i++) {			
			if(i == 3) modifyBlock(scene, util, [3, 3, 1], "active", "false", 0);
		
			// Fonte de l'ingot, puis liquide dans le Melter
			restoreBlocks(scene, util, melter, 0);
			modifyBlock(scene, util, melter, "active", "true", 0);
			modifyTileNBT(scene, util, melter, { tank:{ Amount: 0 }}, 30);
			modifyTileNBT(scene, util, melter, { 
				inventory:{ items: [new CompoundNBT()]},
				tank:{ FluidName: "tconstruct:molten_enderium", Amount: 288 }
			}, 0);
			
			// On coule tout le liquide dans la Casting Table en attendant l'ingot suivant
			restoreBlocks(scene, util, drain, 0);
			for(let vol = 12; vol <= 144; vol += 12) {
				let castVol = i * 144 + vol;
				let melterVol = 288 - 2 * vol;
				modifyTileNBT(scene, util, castTable, { 
					tank: { fluid: { FluidName: "tconstruct:molten_enderium", Amount: castVol }}
				}, 0);
				if(vol == 144)
					modifyTileNBT(scene, util, drain, { render_fluid: { Amount: 0 }}, 0);
				modifyTileNBT(scene, util, melter, { tank:{ Amount: melterVol }}, 2);
			}
			scene.idle(5);
		}
		modifyBlock(scene, util, melter, "active", "false", 75);
		
		// Outputs
		scene.addKeyframe();
		showSection(scene, util, outFarm, "UP", 75); // Gear: 150 ticks de Cooling Time
		indicateSuccess(scene, util, castTable, 20);
		restoreBlocks(scene, util, castTable, 0);
		modifyTileNBT(scene, util, castTable, { tank: { fluid: { Amount: 0 }}}, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 1, 1), PonderPointing.DOWN).withItem(gear), 30);
		scene.idle(20);
	})
	.scene("abstruse_part", "Production de Abstruse Mechanisms", "kubejs:ch3a_mechanism", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let inFunnel = [0, 2, 1];
		
		// Utilities
		let gear = Item.of("thermal:enderium_gear");
		let staff = Item.of("xreliquary:ender_staff");
		let indMech = Item.of("kubejs:inductive_mechanism");
		let iAbsMech = Item.of("kubejs:incomplete_abstruse_mechanism");
		let absMech = Item.of("kubejs:abstruse_mechanism");
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
		
		// Enderium gear, Enderium gear et Ender staff dans les deployers
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 3, 1), PonderPointing.DOWN).withItem(gear), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 3, 1), PonderPointing.DOWN).withItem(gear), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 3, 1), PonderPointing.DOWN).withItem(staff), 30);
		scene.idle(30);
		
		modifyTileNBT(scene, util, [3, 3, 1], { HeldItem: gear }, 5);
		modifyTileNBT(scene, util, [2, 3, 1], { HeldItem: gear }, 5);
		modifyTileNBT(scene, util, [1, 3, 1], { HeldItem: staff }, 15);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(4, 2, 2), PonderPointing.DOWN).withItem(indMech), 30);
		scene.idle(40);
		
		// Sequenced Assembly d'Inductive Mechanism vers Abstruse Mechanism
		scene.addKeyframe();
		let sequence = createItemOnBelt(scene, util, [4, 1, 1], "SOUTH", indMech, 30);
		
		moveDeployer(scene, util, [3, 3, 1], 1, 19, 20);
		changeBeltItemTo(scene, sequence, iAbsMech, 0);
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
		
		changeBeltItemTo(scene, sequence, absMech, 0);
		stallBeltItem(scene, sequence, false, 0);
		moveDeployer(scene, util, [1, 3, 1], -1, 19, 20);
		
		removeItemsFromBelt(scene, util, [0, 1, 1], 0);
		flapFunnel(scene, util, inFunnel, false, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 2, 2), PonderPointing.DOWN).withItem(absMech), 30);
		scene.idle(40);
		
		// Attention, recette perso
		scene.addKeyframe();
		showText(scene, util, 150, "ATTENTION: ", [60], PonderPalette.RED, 10);
		showText(scene, util, 150,
			"La ligne d'assemblage des Abstruse Mechanisms n'est pas une recette activée par défaut",
			[76], PonderPalette.OUTPUT, 10);
		showText(scene, util, 150, 
			"Elle a été activée depuis les fichiers du jeu",
			[110], PonderPalette.OUTPUT, 75);
		showText(scene, util, 150,
			"De plus, pour avoir un Ender Staff indestructible, il faut obligatoirement passer par une commande",
			[135], PonderPalette.INPUT, 140);
	})
	.scene("overview_3a", "Usine complète", "kubejs:ch3a_overview", (scene, util) => {
		scene.configureBasePlate(0, 0, 9);
		scene.scaleSceneView(0.75);
		scene.setSceneOffsetY(-3);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let poiseFarm = [[4, 1, 4, 8, 1, 5], [3, 2, 3, 3, 2, 5],
			[4, 2, 3, 9, 2, 5], [4, 3, 3, 9, 3, 5], [3, 1, 5]];
		let edFarm = [[3, 4, 3, 7, 10, 4], 
			[6, 4, 5, 8, 10, 5], [7, 6, 6, 7, 7, 6]];
		let rotPower = [[2, 1, 5, 2, 5, 5], [2, 1, 6],
			[3, 5, 5, 4, 5, 5], [5, 5, 5, 5, 9, 5]];
		let silverMelter = [[0, 6, 3, 2, 8, 4], [2, 5, 3, 2, 5, 4]];
		let gearProd = [[0, 2, 3, 1, 4, 4], [2, 3, 3, 3, 3, 4], 
			[2, 4, 3, 2, 4, 4]];
		let fluidCircuit = [[1, 1, 3, 1, 1, 6], [1, 5, 3, 1, 5, 5],
			[1, 2, 5, 1, 4, 5]];
		let seqAssembly = [[0, 2, 6, 8, 5, 6], [6, 6, 6]];
		
		// Utilities
		let sCoin = Item.of("thermal:silver_coin");
		let enderFern = Item.of("tconstruct:ender_slime_fern");
		let sIngot = Item.of("thermal:silver_ingot");
		let enderDust = Item.of("appliedenergistics2:ender_dust");
		let eMod = Item.of("prettypipes:low_extraction_module");
		let rrMod = Item.of("prettypipes:round_robin_sorting_modifier");
		let indMech = Item.of("kubejs:inductive_mechanism");
		
		// Conditions initiales
		modifyTileNBT(scene, util, [1, 5, 6], { Value: 0.20 }, 0);
		
		// Tall Poise Bush
		showCompound(scene, util, poiseFarm, "DOWN", 0, 20);
		showText(scene, util, 60, "Duplication de Tall Poise Bush",
			[3, 2 + 5.5 / 16.0, 4.5], PonderPalette.WHITE, 80);
			
		// Ender Dust
		scene.addKeyframe();
		showCompound(scene, util, edFarm, "DOWN", 0, 20);
		showText(scene, util, 60, "Génération d'Ender Dust",
			[6.5, 7.5, 3], PonderPalette.WHITE, 80);
			
		scene.overlay().showControls(new PonderInput(util.vector().topOf(6, 7, 5), PonderPointing.DOWN).withItem(enderFern), 30);
		scene.idle(15);
		createItemOnBeltLike(scene, util, [6, 7, 5], "SOUTH", enderFern, 25);
		
		showScrollInput(scene, util, [4+0.5, 6+1, 3+0.5], "DOWN", 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(4 + 0.5, 6 + 1.25, 3 + 0.5), 
			PonderPointing.DOWN).withWrench().showing(AllIcons.I_TUNNEL_ROUND_ROBIN), 40);
		scene.idle(50);
			
		// Silver farm
		scene.addKeyframe();
		showCompound(scene, util, silverMelter, "DOWN", 0, 20);
		showText(scene, util, 60, "Fabrication de Silver Ingots",
			[1.5, 7.5, 3], PonderPalette.WHITE, 80);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(0.5, 9, 4), PonderPointing.DOWN).withItem(sCoin), 30);
		scene.idle(40);
		
		// Enderium Gears
		// Attention, du a des problemes de rendering avec les Drawers,
		// le drawer visible ici est un autre bloc avec la texture d'un
		// spruce drawer 1x2
		scene.addKeyframe();
		showCompound(scene, util, gearProd, "EAST", 0, 20);
		showText(scene, util, 60, "Fonderie à Enderium Gear",
			[1.5, 3.5, 3], PonderPalette.WHITE, 80);
		showText(scene, util, 80,
			"Drawers 1x2, pour Silver\nIngots et Ender Dust.\n\nÇa permet au Smelter d'en-dessous d'avoir 2 inputs sur une seule face",
			[2.5, 4.5, 3], PonderPalette.WHITE, 70);

		scene.overlay().showControls(new PonderInput(util.vector().of(2.5, 4.5, 3), PonderPointing.DOWN).withItem(sIngot), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2.5, 4.5, 3), PonderPointing.UP).withItem(enderDust), 30);
		scene.idle(40);
		
		// Alimentation electrique
		scene.addKeyframe();
		for(let x = 8; x >= 2; x--)	showSection(scene, util, [x, 1, 3], "SOUTH", 3);
		for(let z = 3; z <= 4; z++) showSection(scene, util, [2, 2, z], "SOUTH", 3);
		scene.idle(10);
		for(let x = 8; x >= 6; x--) modifyBlock(scene, util, [x, 2, 3], "active", "true", 3);
		for(let z = 3; z <= 4; z++) modifyBlock(scene, util, [2, 3, z], "active", "true", 3);
		scene.idle(10);
		showText(scene, util, 60, "Energy Use:", [150], PonderPalette.WHITE, 10);
		showText(scene, util, 60, "140 RF/t", [166], PonderPalette.FAST, 70);
		rotateCameraY(scene, -90, 40);
		
		// Rot Power
		scene.addKeyframe();
		showCompound(scene, util, rotPower, "NORTH", 0, 40);
		
		// Apport en Blazing Blood
		hideSection(scene, util, [0, 1, 3, 0, 2, 4], "WEST", 20);
		showCompound(scene, util, fluidCircuit, "NORTH", 0, 20);
		showText(scene, util, 60, "Entrée du Blazing Blood",
			[1.5, 1.5, 7], PonderPalette.WHITE, 70);
		showSection(scene, util, [0, 1, 3, 0, 2, 4], "EAST", 30);
		rotateCameraY(scene, -20, 30);
		
		// Ligne d'assemblage des Abstruse Mechanisms
		scene.addKeyframe();
		showCompound(scene, util, seqAssembly, "NORTH", 0, 20);
		showText(scene, util, 60, "Ligne d'assemblage des\nAbstruse Mechanisms",
			[4.5, 4.5, 7], PonderPalette.WHITE, 80);
		
		// Distribution des Gears
		scene.addKeyframe();
		hideSection(scene, util, [0, 2, 6, 0, 5, 6], "UP", 20);
		for(let y = 1; y <= 6; y++) showSection(scene, util, [0, y, 5], "DOWN", 3);
		for(let x = 1; x <= 4; x++) showSection(scene, util, [x, 6, 5], "DOWN", 3);
		for(let x = 4; x <= 5; x++) showSection(scene, util, [x, 6, 6], "DOWN", 3);
		scene.idle(20);
		showText(scene, util, 60, "Distribution des Enderium\nGears avec des Pipes",
			[4.5, 6.5, 6.5], PonderPalette.WHITE, 70);
		showText(scene, util, 40, "Extractor, Round-Robin",
			[0.5, 1.5, 5.5], PonderPalette.WHITE, 10);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(0.5, 1.5, 5.5), PonderPointing.DOWN).withItem(eMod), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(0.5, 1.5, 5.5), PonderPointing.UP).withItem(rrMod), 30);
		scene.idle(40);
		
		showSection(scene, util, [0, 2, 6, 0, 5, 6], "DOWN", 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(8, 4, 6), PonderPointing.DOWN).withItem(indMech), 30);
		scene.idle(40);
		
		// Stress Impact: 52.0x RPM
		scene.addKeyframe();
		let stressometer = AABB.of(1, 5, 6, 2, 6, 7);
		chaseBoundingBoxOutline(scene, PonderPalette.FAST, stressometer, 90, 0);
		showText(scene, util, 80, "Stress Impact:", [120], PonderPalette.WHITE, 10);
		showText(scene, util, 70, "52.0x RPM", [136], PonderPalette.FAST, 80);
		
		// Vue finale
		for(let i = 0; i < 145; i++) 
			rotateCameraY(scene, 2, 1);
	});

})
