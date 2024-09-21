onEvent("ponder.registry", event => {

	event.create("kubejs:factory3", "thermal:machine_frame").tag("kubejs:main_quest")
	.scene("intro_3", "Introduction au Chapitre 3", "kubejs:ch3_intro", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let depot = [1, 1, 1];
		let machine = [3, 1, 1, 3, 2, 1];
		let content = [
			[4, 3, 4], // Phyto
			[2, 3, 4], // Pyrolyzer
			[0, 3, 4], // Reagent Extractor
			[3, 1, 3], // Fluid Encapsulator
			[2, 1, 3], // Casing
			[1, 1, 3], // Blast Chiller
			[2, 2, 3], // Pulverizer
			[2, 1, 2], // Magma Crucible
			[3, 1, 0], // Induction Smelter
			[1, 1, 0]  // Dynamo
		];
		
		// Utilities
		let indMech = Item.of("kubejs:inductive_mechanism");
		
		// Conditions initiales
		content.forEach(bp => modifyBlock(scene, util, bp, "active", "true", 0));
				
		showText(scene, util, 340, "Chapitre 3", [16], PonderPalette.WHITE, 20);
		showText(scene, util, 330, "L'Âge de l'Invar", [32], PonderPalette.INPUT, 40);
		
		showSection(scene, util, depot, "DOWN", 20);
		showText(scene, util, 70, 
			"Le but de ce chapitre est de produire des §6Inductive Mechanisms §fà partir de Precision Mechanisms", 
			[1.5, 1 + 13 / 16.0, 1.5], PonderPalette.WHITE, 40);
		createItemOnBeltLike(scene, util, depot, "NORTH", indMech, 40);
		
		scene.addKeyframe();
		showSection(scene, util, machine, "DOWN", 20);
		showText(scene, util, 80, 
			"À partir des §6Invar Machines§f,\non débloque les autres machines Thermal",
			[166], PonderPalette.WHITE, 40);
		showCompound(scene, util, content, "DOWN", 3, 30);
		
		showText(scene, util, 80,
			"Ces Mechanisms sont aussi la base des chapitres 3A et 4",
			[166], PonderPalette.GREEN, 80);		
	})
	.scene("fern_part", "Ressources utiles", "kubejs:ch3_ferns", (scene, util) => {
		// Attention, utiliser des Item Pipes de PrettyPipes dans une scene Ponder 
		// fait crash le jeu. Les Pipes visibles ici sont des copies du modele, mis
		// sur les item_pipe de Pipez.
		scene.configureBasePlate(0, 0, 6);
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let inDepot = [1, 4, 1];
		let funnelL = [2, 4, 1];
		let funnelR = [0, 4, 1];
		let knifeDepl = [1, 6, 1];
		let dupli = [0, 2, 1, 0, 3, 1];
		let mill = [2, 3, 1];
		let blendDepl = [2, 2, 1, 3, 2, 1];
		let stove = [3, 4, 1];
		let vacuum = [4, 4, 1];
		let outFunnel = [5, 4, 1];
		let outDepot = [5, 3, 1];
		let fact2 = [0, 1, 2, 5, 6, 2];
		let fact3 = [0, 1, 3, 5, 6, 3];
		
		// Utilities
		let demonFruit = Item.of("occultism:datura");
		let lighter = Item.of("minecraft:flint_and_steel");
		let knife = Item.of("farmersdelight:iron_knife");
		let filter = Item.of("thermal:item_filter_augment");
		let enderFern = Item.of("tconstruct:ender_slime_fern");
		let enderLeaf = Item.of("kubejs:ender_slimy_fern_leaf");
		let enderBlend = Item.of("kubejs:ender_slime_fern_paste");
		let enderDust = Item.of("appliedenergistics2:ender_dust");
		let skyFern = Item.of("tconstruct:sky_slime_fern");
		let earthFern = Item.of("tconstruct:earth_slime_fern");
		let boneMeal = Item.of("minecraft:bone_meal");
		let gunpowder = Item.of("minecraft:gunpowder");
		let emptyStack = Item.getEmpty();
		
		// Conditions initiales
		modifyTileNBT(scene, util, stove, { Inventory: { Items: [new CompoundNBT()] }}, 0);
		replaceBlocks(scene, util, [0, 3, 1], "minecraft:air", false, 0);
		showText(scene, util, 1680, "Design par RagePlaysGames", 
			[200], PonderPalette.MEDIUM, 0);
		
		// Process Fern
		showSection(scene, util, inDepot, "DOWN", 20);
		createItemOnBeltLike(scene, util, inDepot, "SOUTH", enderFern, 20);
		showSection(scene, util, funnelL, "DOWN", 5);
		showSection(scene, util, funnelR, "DOWN", 20);
		rotateCameraY(scene, -20, 20);
		
		// Configuration des Funnels
		scene.addKeyframe();
		showFilterSlotInput(scene, util, [0 + 0.4, 4 + 0.7, 1 + 0.5], 100, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(0 + 0.4, 4 + 0.7, 1 + 0.5), PonderPointing.LEFT).rightClick().withItem(enderLeaf), 30);
		scene.idle(40);
		setFilterData(scene, util, funnelR, FTE, enderLeaf, 10);
		showText(scene, util, 30, "Fixer la valeur sur 1",
			[0 + 0.4, 4 + 0.7, 1 + 0.5], PonderPalette.WHITE, 0);
		scene.overlay().showControls(new PonderInput(util.vector().of(0 + 0.4, 4 + 0.7, 1 + 0.5), PonderPointing.RIGHT).withWrench().scroll(), 30);
		scene.idle(40);
		rotateCameraY(scene, 20, 20);
		chaseBoundingBoxOutline(scene, PonderPalette.WHITE, AABB.of(2, 4, 1, 2.6, 5, 2), 60, 0);
		showText(scene, util, 60, "Même configuration\nsur l'autre Funnel",
			[2, 5, 1.5], PonderPalette.WHITE, 70);
		setFilterData(scene, util, funnelL, FTE, enderLeaf, 0);
		
		// Animation process
		scene.addKeyframe();
		showSection(scene, util, knifeDepl, "DOWN", 20);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 6, 1), PonderPointing.DOWN).withItem(knife), 30);
		scene.idle(20);
		modifyTileNBT(scene, util, knifeDepl, { HeldItem: knife }, 20);
		
		moveDeployer(scene, util, knifeDepl, 1, 19, 20);
		removeItemsFromBelt(scene, util, inDepot, 1);
		createItemOnBeltLike(scene, util, inDepot, "DOWN", Item.of("kubejs:ender_slimy_fern_leaf", 4), 0);
		moveDeployer(scene, util, knifeDepl, -1, 19, 5);
		showText(scene, util, 60, "Couper 1x Fern donne 2x Leaf",
			[1.5, 4 + 13 / 16.0, 1.5], PonderPalette.WHITE, 30);
		showText(scene, util, 60, "1x Leaf sera sortie\nde chaque côté",
			[92], PonderPalette.OUTPUT, 70);
		
		// Spirit Fire
		scene.addKeyframe();
		showSection(scene, util, dupli, "DOWN", 20);
		let dFruitIE = createItemEntity(scene, util, [0.5, 3.5, 1.5], [0, 0.1, 0], demonFruit, 20);
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(0, 3, 1), PonderPointing.DOWN).rightClick().withItem(lighter), 30);
		scene.idle(15);
		restoreBlocks(scene, util, [0, 3, 1], 0);
		modifyEntity(scene, dFruitIE, e => e.kill(), 35);
		
		// Duplication de la Fern
		flapFunnel(scene, util, funnelR, true, 0);
		showText(scene, util, 60,
			"Une Leaf qui passe dans du §dSpirit §dFire §fse retransforme en Fern",
			[0.5, 3.5, 1.5], PonderPalette.WHITE, 70);
		
		for(let y = 1; y <= 3; y++)
			showSection(scene, util, [1, y, 1], "WEST", 3);
		scene.idle(11);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(1.5, 1.5, 1), PonderPointing.RIGHT).withItem(filter), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(1.5, 1.5, 1), PonderPointing.LEFT).withItem(enderFern).showing(AllIcons.I_WHITELIST), 30);
		scene.idle(40);
		
		showText(scene, util, 80,
			"La nouvelle Fern est aspirée par le Vacuumulator, puis remontée vers le Depot via des Pipes",
			[1.5, 1.5, 1.5], PonderPalette.WHITE, 90);
		rotateCameraY(scene, 70, 35);
		
		// Process Blend
		scene.addKeyframe();
		showSection(scene, util, mill, "WEST", 20);
		removeItemsFromBelt(scene, util, inDepot, 0);
		flapFunnel(scene, util, funnelL, true, 0);
		showText(scene, util, 60,
			"De l'autre côté, la Leaf est transformée en Blend via un Millstone",
			[2.5, 3.5, 1.5], PonderPalette.WHITE, 80);
			
		showSection(scene, util, blendDepl, "UP", 10);
		showSection(scene, util, stove, "DOWN", 20);
		
		// Animation process
		modifyTileNBT(scene, util, [3, 2, 1], { HeldItem: enderBlend }, 20);
		moveDeployer(scene, util, [3, 2, 1], 1, 19, 20);
		restoreBlocks(scene, util, stove, 0);
		modifyTileNBT(scene, util, [3, 2, 1], { HeldItem: emptyStack }, 0);
		moveDeployer(scene, util, [3, 2, 1], -1, 19, 5);
		showText(scene, util, 60,
			"Le Blend est cuit sur un Stove pour donner la ressource associée",
			[3.5, 5, 1.5], PonderPalette.WHITE, 80);
		
		// Sortie de la ressouce
		scene.addKeyframe();
		scene.idle(10);
		showSection(scene, util, vacuum, "DOWN", 5);
		showSection(scene, util, outDepot, "DOWN", 5);
		showSection(scene, util, outFunnel, "DOWN", 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(4.5, 4.5, 1), PonderPointing.RIGHT).withItem(filter), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(4.5, 4.5, 1), PonderPointing.LEFT).withItem(enderDust).showing(AllIcons.I_WHITELIST), 30);
		scene.idle(40);
		
		modifyTileNBT(scene, util, stove, { Inventory: { Items: [new CompoundNBT()] }}, 0);
		let dustIE = createItemEntity(scene, util, [3.5, 5, 1.5], [0, 0.1, 0], enderDust, 20);
		showText(scene, util, 60,
			"La ressouce est aspirée par le Vacuumulator à la fin de la cuisson",
			[4.5, 4.5, 1], PonderPalette.WHITE, 40);
		modifyEntity(scene, dustIE, e => e.kill(), 30);
		createItemOnBeltLike(scene, util, outDepot, "WEST", enderDust, 40);
		rotateCameraY(scene, 20, 20);
		
		// Design flush
		scene.addKeyframe();
		showSection(scene, util, fact2, "NORTH", 10);
		showSection(scene, util, fact3, "NORTH", 20);
		showText(scene, util, 60, "Le design peut être répété",
			[3.5, 5, 2.5], PonderPalette.WHITE, 80);
		
		// Autres ressources
		showText(scene, util, 60, "3 types de Ferns pour 3 ressources différentes",
			[142], PonderPalette.OUTPUT, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 4, 1), PonderPointing.DOWN).withItem(enderFern), 30);
		scene.idle(5);
		createItemOnBeltLike(scene, util, [1, 4, 1], "WEST", enderFern, 0);
		scene.overlay().showControls(new PonderInput(util.vector().of(6, 3 + 5.5 / 16.0, 1.5), PonderPointing.UP).withItem(enderDust), 30);
		scene.idle(40);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 4, 2), PonderPointing.DOWN).withItem(skyFern), 30);
		scene.idle(5);
		createItemOnBeltLike(scene, util, [1, 4, 2], "WEST", skyFern, 0);
		scene.overlay().showControls(new PonderInput(util.vector().of(6, 3 + 5.5 / 16.0, 2.5), PonderPointing.UP).withItem(boneMeal), 30);
		scene.idle(5);
		createItemOnBeltLike(scene, util, [5, 3, 2], "WEST", boneMeal, 35);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 4, 3), PonderPointing.DOWN).withItem(earthFern), 30);
		scene.idle(5);
		createItemOnBeltLike(scene, util, [1, 4, 3], "WEST", earthFern, 0);
		scene.overlay().showControls(new PonderInput(util.vector().of(6, 3 + 5.5 / 16.0, 3.5), PonderPointing.UP).withItem(gunpowder), 30);
		scene.idle(5);
		createItemOnBeltLike(scene, util, [5, 3, 3], "WEST", gunpowder, 35);
		rotateCameraY(scene, -20, 20);
	})
	.scene("dye_part", "Colorants", "kubejs:ch3_dye", (scene, util) => {
		// Attention, utiliser des Item Pipes de PrettyPipes dans une scene Ponder 
		// fait crash le jeu. Les Pipes visibles ici sont des copies du modele, mis
		// sur les item_pipe de Pipez.
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let pipe = [[1, 1, 1], [1, 2, 1], [1, 3, 1], [2, 3, 1]];
		let grass = [1, 2, 2];
		let flower = [1, 3, 2, 1, 4, 2];
		let depl = [1, 6, 2];
		let vacuum = [1, 1, 2];
		let mill = [2, 3, 2];
		let outFarm = [[2, 2, 2], [3, 2, 2]];
		let fact1 = [0, 1, 3, 3, 6, 3];
		
		// Utilities
		let boneMeal= Item.of("minecraft:bone_meal");
		let goldenrod = Item.of("biomesoplenty:goldenrod");
		let yDye = Item.of("minecraft:yellow_dye");
		let gDye = Item.of("minecraft:green_dye");
		let filter = Item.of("thermal:item_filter_augment");
		let emptyStack = Item.getEmpty();
		
		// Conditions initiales
		modifyBlock(scene, util, [1, 2, 1], "south", "none", 0);
		
		// Flower part
		showSection(scene, util, grass, "DOWN", 10);
		showSection(scene, util, flower, "DOWN", 20);
		showText(scene, util, 60, "Ferme à fleur pour\nobtenir des Dyes",
			[25], PonderPalette.WHITE, 80);
		showText(scene, util, 60, "Le design marche avec n'importe quelle grande fleur",
			[1.5, 4.5, 2.5], PonderPalette.WHITE, 70);
		
		// Animation deployer a boneMeal
		scene.addKeyframe();
		showSection(scene, util, depl, "DOWN", 20);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 6, 2), PonderPointing.DOWN).withItem(boneMeal), 30);
		scene.idle(15);
		modifyTileNBT(scene, util, depl, { HeldItem: boneMeal }, 20);
		
		moveDeployer(scene, util, depl, 1, 19, 20);
		modifyTileNBT(scene, util, depl, { HeldItem: emptyStack }, 0);
		let itemFlower = createItemEntity(scene, util, [1.5, 4.5, 2.5], [-0.075, 0.1, 0], goldenrod, 0);
		moveDeployer(scene, util, depl, -1, 19, 20);
		
		// Process flower
		scene.addKeyframe();
		showSection(scene, util, vacuum, "SOUTH", 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(1.5, 1.5, 2), PonderPointing.RIGHT).withItem(filter), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(1.5, 1.5, 2), PonderPointing.LEFT).withItem(goldenrod).showing(AllIcons.I_WHITELIST), 30);
		scene.idle(40);
		
		showText(scene, util, 60, "La fleur est aspirée\npar le Vacuumulator…",
			[1, 1.5, 2.5], PonderPalette.WHITE, 35);
		modifyEntity(scene, itemFlower, e => e.kill(), 35);
		rotateCameraY(scene, 70, 35);
		
		scene.addKeyframe();
		showSection(scene, util, mill, "DOWN", 20);
		showCompound(scene, util, pipe, "SOUTH", 3, 20);
		showText(scene, util, 60, "…puis remontée vers le\nMillstone via des Pipes",
			[2.5, 3.5, 1.25], PonderPalette.WHITE, 70);
		
		// Sortie des colorants
		showCompound(scene, util, outFarm, "UP", 5, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(3.5, 2.5, 2), PonderPointing.DOWN).withItem(yDye), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(3.5, 2.5, 2), PonderPointing.UP).withItem(gDye), 30);
		scene.idle(40);
		
		rotateCameraY(scene, 20, 20);
		
		// Conseil de placement
		scene.addKeyframe();
		showSection(scene, util, fact1, "NORTH", 20);
		showText(scene, util, 60,
			"Le design peut être mis à la suite de la génération des Ressources utiles",
			[1.5, 4 + 13 / 16.0, 3.5], PonderPalette.WHITE, 80);
		hideSection(scene, util, fact1, "SOUTH", 20);
		rotateCameraY(scene, -20, 0);
	})
	.scene("sing_part", "Production de Singularities", "kubejs:ch3_sings", (scene, util) => {
		scene.configureBasePlate(1, 0, 5);
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let outerRim = 
		 [[1, 4, 0], [1, 3, 0], [1, 2, 0], [2, 2, 0],
			[2, 1, 0], [3, 1, 0], [4, 1, 0], [4, 2, 0],
			[5, 2, 0], [5, 3, 0], [5, 4, 0], [4, 4, 0],
			[4, 5, 0], [3, 5, 0], [2, 5, 0], [2, 4, 0]];
		let core = [[3, 3, 0], [3, 4, 0], [2, 3, 0], [3, 2, 0], [4, 3, 0]];
		let stickLine = [2, 2, 1, 2, 3, 3];
		let cobbleLine = [5, 2, 1, 5, 3, 3];
		let waterGen = [5, 3, 4];
		let lavaGen = [4, 3, 3];
		let belt = [1, 5, 0, 1, 5, 4];
		let crushers = [[0, 5, 2, 0, 6, 2], [2, 5, 2, 2, 6, 2]];
		
		// Utilities
		let stick = Item.of("minecraft:stick");
		let cobble = Item.of("minecraft:cobblestone");
		let cobble16 = Item.of("minecraft:cobblestone", 16);
		let crushingWheels = Item.of("create:crushing_wheel", 2);
		let sings = Item.of("appliedenergistics2:singularity", 2);
		
		// Conditions initiales
		// Comme on ne peut pas inclure d'items dans les crafters en javascript,
		// on enregistre le schematic AVEC les items deja presents dans les crafters,
		// et sans rotational power.
		// On efface les items ici, en mettant un CompoundNBT vide dans le bon tag, et
		// on alimente les blocs individuellement. Plus tard, on "simulera" l'inclusion
		// d'items via restoreBlocks, et il faudra refaire les modifications qu'on a 
		// fait en cours de script. (connectCrafterInvs et setKineticSpeed)
		for(let y = 1; y <= 5; y++)
			for(let x = 1; x <= 5; x++) {
				modifyTileNBT(scene, util, [x, y, 0], { Inventory: { Items: new CompoundNBT() }}, 0);
				setKineticSpeed(scene, util, [x, y, 0], (x + y) % 2 == 0 ? 64 : -64, 0);
			}
		
		// Apparition du Crafter
		for(let y = 4; y >= 2; y--)
			showSection(scene, util, [1, y, 0], "UP", 2);
		for(let x = 2; x <= 4; x++) 
			for(let y = 5; y >= 1; y--) {
				if(x != 3) showSection(scene, util, [x, 6 - y, 0], "DOWN", 2);
				else showSection(scene, util, [x, y, 0], "UP", 2);
			}
		for(let y = 4; y >= 2; y--) 
			showSection(scene, util, [5, y, 0], "UP", 2);
		scene.idle(20);
		rotateCameraY(scene, -110, 50);
		
		// Affichage pour connecter deux crafters ensemble
		scene.addKeyframe();
		showText(scene, util, 60, "Connecter les Crafters de\nla bordure extérieure",
			[1.5, 4.5, 1], PonderPalette.WHITE, 70);
		
		let target = AABB.of(1, 4 - 2 / 16.0, 0, 2, 4 + 2 / 16.0, 1);
		chaseBoundingBoxOutline(scene, PonderPalette.OUTPUT, target, 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2, 4, 1), PonderPointing.LEFT).withWrench().rightClick(), 30);
		scene.idle(50);
		
		// Connexion de la bordure exterieure
		for(let i = 0; i < outerRim.length - 1; i++) 
			connectCrafterInvs(scene, util, outerRim[i], outerRim[i+1], 2);
		scene.idle(20);
		
		// Connexion du coeur du crafter
		scene.addKeyframe();
		showText(scene, util, 50, "Pareil pour le coeur", 
			[3.5, 4.5, 1], PonderPalette.WHITE, 60);
		for(let i = 1; i < core.length; i++) 
			connectCrafterInvs(scene, util, core[0], core[i], 2);
		scene.idle(40);
		
		// Materiaux pour Crushing Wheels - Sticks
		scene.addKeyframe();
		showSection(scene, util, stickLine, "DOWN", 20);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 3, 3), PonderPointing.DOWN).withItem(stick), 60);
		scene.idle(15);
		showText(scene, util, 60, "N'importe quelle ferme à\narbre donne des Sticks",
			[80], PonderPalette.OUTPUT, 80);
		showText(scene, util, 60, "Les Sticks sont amenés\ndans le coeur",
			[3.5, 4.5, 1], PonderPalette.WHITE, 70);
		rotateCameraY(scene, -70, 35);
		
		// Materiaux - Cobble
		showSection(scene, util, cobbleLine, "DOWN", 20);
		showSection(scene, util, lavaGen, "DOWN", 5);
		showSection(scene, util, waterGen, "DOWN", 20);
		modifyBlock(scene, util, [5, 3, 3], "active", "true", 0);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(5, 3, 3), PonderPointing.DOWN).withItem(cobble), 60);
		showText(scene, util, 60,
			"De la Cobble est amenée dans\nla bordure extérieure",
			[3.5, 5.5, 1], PonderPalette.WHITE, 70);
		rotateCameraY(scene, -110, 50);
		
		// Craft
		scene.addKeyframe();
		createItemOnBeltLike(scene, util, [5, 2, 2], "DOWN", cobble16, 32);
		removeItemsFromBelt(scene, util, [5, 2, 1], 0);
		// Bordure - On restoreBlocks pour simuler l'inclusion d'items dans
		// les crafters, et on refait les modifications sans attente.
		outerRim.forEach(bp => restoreBlocks(scene, util, bp, 0));
		for(let i = 0; i < outerRim.length - 1; i++) 
			connectCrafterInvs(scene, util, outerRim[i], outerRim[i+1], 0);
		for(let y = 1; y <= 5; y++) 
			for(let x = 1; x <= 5; x++) 
				setKineticSpeed(scene, util, [x, y, 0], (x + y) % 2 == 0 ? 64 : -64, 0);
		scene.idle(20);
		
		// Coeur - On restoreBlocks pour simuler l'inclusion d'items dans
		// les crafters, et on refait les modifications sans attente.
		core.forEach(bp => restoreBlocks(scene, util, bp, 0));
		for(let i = 1; i < core.length; i++) 
			connectCrafterInvs(scene, util, core[0], core[i], 0);
		for(let y = 2; y <= 4; y++) 
			for(let x = 2; x <= 4; x++) 
				setKineticSpeed(scene, util, [x, y, 0], 64, 0);
		scene.idle(30);
		
		// Craft des Crushing Wheels & Belt de sortie
		setCraftingResult(scene, util, outerRim[0], crushingWheels, 27);
		for(let i = 0; i < 70; i++) {
			if(i == 23) {
				restoreBlocks(scene, util, [1, 5, 0], 0);
				showSection(scene, util, belt, "DOWN", 0);
			}
			if(i == 33) showCompound(scene, util, crushers, "DOWN", 0, 0);
			rotateCameraY(scene, -1, 1);
		}
		scene.idle(28);
		
		// Transformation en Singularities
		scene.addKeyframe();
		showText(scene, util, 60,
			"Les Crushing Wheels sont crushées à leur tour, pour\ndonner des Singularities",
			[1.5, 6 + 14 / 16.0, 2.5], PonderPalette.WHITE, 70);
		createItemOnBeltLike(scene, util, [1, 5, 3], "DOWN", sings, 0);
		rotateCameraY(scene, -35, 25);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 5, 4), PonderPointing.DOWN).withItem(sings), 30);
		scene.idle(40);
		rotateCameraY(scene, 35, 0);
	})
	.scene("tnt_part", "Automatisation du TNT", "kubejs:ch3_tnt", (scene, util) => {
		// On refait grosso-modo la scene 2 du Mechanical Arm 
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let gDepot = [0, 1, 3];
		let sDepot = [1, 1, 3];
		let arm = [3, 1, 3];
		
		// Utilities
		let sand = Item.of("minecraft:sand", 64);
		let gunpowder = Item.of("minecraft:gunpowder", 64);
		let tnt = Item.of("minecraft:tnt");
		let emptyStack = Item.getEmpty();
		
		let restoreWithSpeed = (pos, speed) => {
			flapFunnel(scene, util, [pos[0], pos[1], pos[2] + 1], false, 0);
			restoreBlocks(scene, util, pos, 0);
			setKineticSpeed(scene, util, pos, speed, 0);
		}
		
		// Conditions initiales
		for(let y = 1; y <= 3; y++) 
			for(let x = 2; x <= 4; x++) {
				modifyTileNBT(scene, util, [x, y, 0], { Inventory: { Items: new CompoundNBT() }}, 0);
				setKineticSpeed(scene, util, [x, y, 0], (x + y) % 2 == 0 ? 48 : -48, 0);
			}
		
		// Depots
		showSection(scene, util, gDepot, "DOWN", 3);
		showSection(scene, util, sDepot, "DOWN", 3);
		
		// Crafter
		for(let y = 1; y <= 3; y++) 
			for(let x = 0; x <= 2; x++) 
				showSection(scene, util, [y == 2 ? x + 2 : 4 - x, y, 0], "DOWN", 3);
			
		// Dispenser
		showSection(scene, util, [1, 1, 0], "EAST", 20);
		createItemOnBeltLike(scene, util, gDepot, "SOUTH", gunpowder, 5);
		createItemOnBeltLike(scene, util, sDepot, "SOUTH", sand, 20);
		rotateCameraY(scene, -120, 50);
		
		// Funnels
		scene.addKeyframe();
		for(let y = 1; y <= 3; y++) 
			showSection(scene, util, [2, y, 1, 4, y, 1], "NORTH", 3);
		scene.idle(20);
		
		// Filters
		for(let y = 3; y >= 1; y--) 
			for(let x = 4; x >= 2; x--) {
				let item = (x + y) % 2 == 0 ? sand : gunpowder;
				showFilterSlotInput(scene, util, [x + 0.5, y + 0.7, 1 + 0.6], 5, 0)
				scene.overlay().showControls(new PonderInput(util.vector().of(x + 0.5, y + 0.7, 1 + 0.6), PonderPointing.LEFT).rightClick().withItem(item), 5);
				scene.idle(7);
				setFilterData(scene, util, [x, y, 1], FTE, item, 4);
			}
		scene.idle(20);
		
		// Arm ins & outs
		scene.addKeyframe();
		let input1 = AABB.of(0, 1 + 1 / 16.0, 3, 1, 1 + 13 / 16.0, 4);
		let input2 = AABB.of(1, 1 + 1 / 16.0, 3, 2, 1 + 13 / 16.0, 4);
		chaseBoundingBoxOutline(scene, PonderPalette.INPUT, input1, 70, 5);
		chaseBoundingBoxOutline(scene, PonderPalette.INPUT, input2, 68, 10);
		
		let count = 0;
		for(let y = 1; y <= 3; y++) 
			for(let x = 2; x <= 4; x++) {
				let output = AABB.of(x, y, 1, x + 1, y + 1, 1 + 0.6);
				chaseBoundingBoxOutline(scene, PonderPalette.OUTPUT, output, 56 - count, 5);
				count += 2;
			}
		scene.idle(15);
		
		showSection(scene, util, arm, "DOWN", 15);
		indicateSuccess(scene, util, arm, 0);
		setKineticSpeed(scene, util, arm, 48, 20);
		
		// Arm animation - sand
		scene.addKeyframe();
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_INPUT, emptyStack, 1, 24);
		removeItemsFromBelt(scene, util, sDepot, 0);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_OUTPUTS, sand, -1, 20);
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_OUTPUT, sand, 0, 24);
		restoreWithSpeed([3, 1, 0], 48);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_INPUTS, sand, -1, 10);		
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_OUTPUT, sand, 1, 24);
		restoreWithSpeed([4, 2, 0], 48);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_INPUTS, sand, -1, 10);		
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_OUTPUT, sand, 2, 24);
		restoreWithSpeed([2, 2, 0], 48);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_INPUTS, sand, -1, 10);
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_OUTPUT, sand, 3, 24);
		restoreWithSpeed([3, 3, 0], 48);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_INPUTS, emptyStack, -1, 10);
		
		// Arm animation - gunpowder
		scene.addKeyframe();
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_INPUT, emptyStack, 0, 24);
		removeItemsFromBelt(scene, util, [0, 1, 3], 0);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_OUTPUTS, gunpowder, -1, 20);
		rotateCameraY(scene, 120, 0);
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_OUTPUT, gunpowder, 4, 24);
		restoreWithSpeed([2, 1, 0], -48);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_INPUTS, gunpowder, -1, 10);
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_OUTPUT, gunpowder, 5, 24);
		restoreWithSpeed([4, 1, 0], -48);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_INPUTS, gunpowder, -1, 10);
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_OUTPUT, gunpowder, 6, 24);
		restoreWithSpeed([3, 2, 0], -48);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_INPUTS, gunpowder, -1, 10);
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_OUTPUT, gunpowder, 7, 24);
		restoreWithSpeed([2, 3, 0], -48);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_INPUTS, gunpowder, -1, 10);	
		instructArm(scene, util, arm, ATE.Phase.MOVE_TO_OUTPUT, gunpowder, 8, 24);
		restoreWithSpeed([4, 3, 0], -48);
		setCraftingResult(scene, util, [2, 1, 0], tnt, 0);
		instructArm(scene, util, arm, ATE.Phase.SEARCH_INPUTS, emptyStack, -1, 150);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 1, 0), PonderPointing.DOWN).withItem(tnt), 30);
	})
	.scene("qes_part", "Conversion en Entangled Singularities", "kubejs:ch3_qes", (scene, util) => {
		scene.setSceneOffsetY(-1.5);
		scene.rotateCameraY(70);
		scene.showBasePlate();
		scene.idle(30);
		
		// Sections & Positions
		let disp = [[1, 2, 3], [1, 1, 2, 1, 2, 2]];
		let support = [[2, 1, 2, 2, 2, 3], [2, 3, 2]];
		let chutes = [[2, 4, 3], [2, 4, 2]];
		let depots = [[2, 5, 3], [2, 5, 2]];
		let barrels = [[1, 6, 3], [1, 6, 2]];
		let funnels = [[2, 6, 3], [2, 6, 2]];
		let vacuum = [3, 3, 2];
		
		let plateLogic = [1, 1, 0, 2, 2, 1];
		let vacuumLogic = [3, 3, 3, 4, 3, 3];
		let sDepotLogic = [3, 5, 2, 4, 5, 2];
		let gDepotLogic = [3, 5, 3, 4, 5, 3];
		let sChuteLogic = [3, 4, 2];
		let gChuteLogic = [3, 4, 3];
		
		// Utilities
		let tnt = Item.of("minecraft:tnt");
		let sings = Item.of("appliedenergistics2:singularity", 32);
		let enderDust = Item.of("appliedenergistics2:ender_dust", 32);
		let qes = Item.of("appliedenergistics2:quantum_entangled_singularity", 64);
		let qesUnit = Item.of("appliedenergistics2:quantum_entangled_singularity");
		let filter = Item.of("thermal:item_filter_augment");
		
		// Conditions initiales
		toggleRedstonePower(scene, util, [3, 4, 2, 3, 4, 3], 0);
		modifyBlock(scene, util, [1, 2, 2], "east", "side", 0);
		modifyBlock(scene, util, [1, 2, 2], "west", "side", 0);
		
		// Mise en place 
		showCompound(scene, util, disp, "DOWN", 5, 15);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 2, 3), PonderPointing.DOWN).withItem(tnt), 30);
		scene.idle(40);
		
		showCompound(scene, util, support, "DOWN", 10, 10);
		rotateCameraY(scene, 20, 20);
		
		showCompound(scene, util, chutes, "DOWN", 3, 20);
		showFilterSlotInput(scene, util, [3, 4 + 0.75, 2 + 0.5], 40, 5);
		showFilterSlotInput(scene, util, [3, 4 + 0.75, 3 + 0.5], 40, 5);
		showText(scene, util, 30, "Régler la valeur sur 32",
			[3, 4 + 0.75, 2 + 0.5], PonderPalette.WHITE, 0);
		scene.overlay().showControls(new PonderInput(util.vector().of(3, 4 + 0.75, 3 + 0.5), PonderPointing.RIGHT).withWrench().scroll(), 30);
		scene.idle(50);
		
		// Apparition depots, barrels & funnels
		showCompound(scene, util, depots, "DOWN", 3, 10);
		showCompound(scene, util, barrels, "DOWN", 3, 10);
		showCompound(scene, util, funnels, "DOWN", 3, 10);
		showFilterSlotInput(scene, util, [2 + 0.6, 6 + 0.7, 2 + 0.5], 40, 5);
		showFilterSlotInput(scene, util, [2 + 0.6, 6 + 0.7, 3 + 0.5], 40, 5);
		showText(scene, util, 30, "Régler la valeur sur 32",
			[2 + 0.6, 6 + 0.7, 2 + 0.5], PonderPalette.WHITE, 0);
		scene.overlay().showControls(new PonderInput(util.vector().of(2 + 0.6, 6 + 0.7, 3 + 0.5), PonderPointing.RIGHT).withWrench().scroll(), 30);
		scene.idle(50);
		
		showText(scene, util, 100,
			"Pour générer des Quantum Entangled Singularities (QES),\nil faut qu'une Singularity\nET une Ender Dust soient prises\ndans §6une explosion",
			[40], PonderPalette.OUTPUT, 110);
		
		// Animation explosion
		scene.addKeyframe();
		createItemOnBeltLike(scene, util, depots[0], "WEST", enderDust, 5);
		createItemOnBeltLike(scene, util, depots[1], "WEST", sings, 20);
		removeItemsFromBelt(scene, util, depots[0], 0);
		removeItemsFromBelt(scene, util, depots[1], 10);
		let singIE = createItemEntity(scene, util, [2.5, 3.5, 2.5], [0,0,0], sings, 0);
		let dustIE = createItemEntity(scene, util, [2.5, 3.5, 3.5], [0,0,0], enderDust, 10);
		toggleRedstonePower(scene, util, [1, 2, 3], 5);
		
		let primedtnt = createEntity(scene, util, "minecraft:tnt", [2 + 9/16.0, 2 + 9/16.0, 3 + 9/16.0], 0);
		modifyEntity(scene, primedtnt, { Fuse: 80 }, 10);
		showText(scene, util, 60,
			"Le TNT explose dans le bloc d'Obsidian, ce qui évite les\ndégâts collatéraux",
			[2.5, 2.5, 3.5], PonderPalette.WHITE, 70);
		
		modifyEntity(scene, singIE, e => e.kill(), 0);
		modifyEntity(scene, dustIE, e => e.kill(), 0);
		let qesIE = createItemEntity(scene, util, [2.5, 3, 2.5], [0,0,0], qes, 20);
		showText(scene, util, 60,
			"Les QES est créées là ou se trouvaientt les Singularities.\n\nIci, on veut le résultat au-dessus de la Pressure Plate",
			[2.5, 3, 2.5], PonderPalette.WHITE, 80);
		rotateCameraY(scene, -20, 20);
		
		// Sortie des QES
		scene.addKeyframe();
		showSection(scene, util, vacuum, "DOWN", 10);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(3.5, 3.5, 2), PonderPointing.RIGHT).withItem(filter), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().of(3.5, 3.5, 2), PonderPointing.LEFT).withItem(qes).showing(AllIcons.I_WHITELIST), 30);
		scene.idle(40);
		
		showText(scene, util, 60, "Les QES sont aspirées\npar le Vacuumulator",
			[3.5, 3.5, 2], PonderPalette.WHITE, 35);
		modifyEntity(scene, qesIE, e => e.kill(), 0);
		toggleRedstonePower(scene, util, [1, 2, 3], 45);
		
		showText(scene, util, 80,
			"Attention ! Les QES ne se stackent que par 2. Ici, nous aurons 32 STACKS de QES",
			[50], PonderPalette.RED, 90);
		hideSection(scene, util, vacuum, "UP", 0);
		rotateCameraY(scene, 20, 20);
		
		// Logique Depots
		scene.addKeyframe();
		showSection(scene, util, gChuteLogic, "WEST", 5);
		showSection(scene, util, sChuteLogic, "WEST", 20);
		showText(scene, util, 80,
			"Le but du jeu consiste à gérer\nles timings des chutes pour ne\npas sur-générer des QES",
			[50], PonderPalette.GREEN, 100);
		
		showSection(scene, util, gDepotLogic, "WEST", 0);
		toggleRedstonePower(scene, util, [3, 4, 2, 3, 4, 3], 5);
		showSection(scene, util, sDepotLogic, "WEST", 20);
		showText(scene, util, 80,
			"1) Les chutes sont bloquées tant qu'on n'a pas les deux ressources prêtes sur les Depots",
			[2.5, 4.5, 2], PonderPalette.WHITE, 100);
		
		createItemOnBeltLike(scene, util, depots[0], "WEST", enderDust, 0);
		toggleRedstonePower(scene, util, [4, 5, 3], 5);
		createItemOnBeltLike(scene, util, depots[1], "WEST", sings, 0);
		toggleRedstonePower(scene, util, [4, 5, 2], 0);
		toggleRedstonePower(scene, util, [3, 4, 2, 3, 4, 3], 20);
		
		showText(scene, util, 40, "Réglage: 2％ Inverted",
			[3.5, 6, 2.5], PonderPalette.INPUT, 50);
		hideSection(scene, util, gDepotLogic, "EAST", 5);
		hideSection(scene, util, sDepotLogic, "EAST", 0);
		rotateCameraY(scene, -20, 40);
		
		// Logique Pressure Plate
		scene.addKeyframe();
		showSection(scene, util, plateLogic, "UP", 10);
		modifyBlock(scene, util, [1, 2, 2], "east", "none", 0);
		modifyBlock(scene, util, [1, 2, 2], "west", "none", 10);
		let qesUnitIE = createItemEntity(scene, util, [2.5, 3.5, 2.5], [0,0,0], qesUnit, 10);
		
		toggleRedstonePower(scene, util, [1, 2, 2], 0);
		toggleRedstonePower(scene, util, [3, 4, 2, 3, 4, 3], 0);
		toggleRedstonePower(scene, util, [2, 2, 1], 0);
		showText(scene, util, 80,
			"2) Les chutes sont bloquées tant qu'il y a un item sur la Pressure Plate, ET pendant l'explosion",
			[2.5, 4.5, 2], PonderPalette.WHITE, 60);
		
		toggleRedstonePower(scene, util, [1, 2, 0, 1, 2, 1], 0);
		toggleRedstonePower(scene, util, [2, 2, 0], 30);
		
		showScrollInput(scene, util, [1 + 0.5, 2 + 1 / 8.0, 1 + 0.5], "DOWN", 40, 0);
		showText(scene, util, 30, "Réglage: 3 secondes",
			[1.25, 2 + 1 / 8.0, 1.25], PonderPalette.INPUT, 50);
		modifyEntity(scene, qesUnitIE, e => e.kill(), 0);
		toggleRedstonePower(scene, util, plateLogic, 0);
		toggleRedstonePower(scene, util, [3, 4, 2, 3, 4, 3], 0);
		toggleRedstonePower(scene, util, [1, 2, 2], 0);
		rotateCameraY(scene, 20, 40);
		
		// Logique Vacuumulator
		scene.addKeyframe();
		showSection(scene, util, vacuum, "DOWN", 5);
		showSection(scene, util, vacuumLogic, "DOWN", 20);
		showText(scene, util, 80,
			"3) Les chutes sont bloquées tant qu'il y a un item dans le Vacuumulator",
			[2.5, 4.5, 2], PonderPalette.WHITE, 90);

		toggleRedstonePower(scene, util, [3, 4, 2, 3, 4, 3], 0);
		toggleRedstonePower(scene, util, [4, 3, 3], 0);
		showText(scene, util, 40, "Réglage: 2％",
			[3.5, 4, 3.5], PonderPalette.INPUT, 60);
		
		showSection(scene, util, gDepotLogic, "WEST", 5);
		showSection(scene, util, sDepotLogic, "WEST", 0);
		rotateCameraY(scene, -20, 20);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 3, 2), PonderPointing.DOWN).withItem(qes), 30);
		scene.idle(20);
	})
	.scene("paint_prod", "Production de Paintballs", "kubejs:ch3_paintballs", (scene, util) => {
		// scene.scaleSceneView(.9);
		scene.setSceneOffsetY(-2);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let inSys = [[3, 4, 2, 4, 4, 2], [2, 5, 3]];
		let inFunnel = [3, 5, 2];
		let basin = [2, 5, 2];
		let press = [2, 7, 2];
		let smartChute = [2, 4, 2];
		let outSys = [[2, 3, 1, 2, 3, 3], 
			[2, 2, 2], [2, 1, 2, 0, 1, 2]];
		let power = [[3, 2, 0, 4, 3, 4], [3, 1, 1, 3, 1, 3], [2, 2, 1], [2, 2, 3]];

		// Utilities
		let yDye = Item.of("minecraft:yellow_dye");
		let qes = Item.of("appliedenergistics2:quantum_entangled_singularity");
		let chromSing = Item.of("kubejs:dye_entangled_singularity");
		let mpb = Item.of("appliedenergistics2:magenta_paint_ball");
		let bpb = Item.of("appliedenergistics2:blue_paint_ball");
		let gpb = Item.of("appliedenergistics2:green_paint_ball");
		let ypb = Item.of("appliedenergistics2:yellow_paint_ball");
		let rpb = Item.of("appliedenergistics2:red_paint_ball");
		let paintballs = [mpb, bpb, gpb, ypb, rpb];
		
		// Conditions initiales
		modifyTileNBT(scene, util, press, { Mode: 2 }, 0); // Mode.BASIN
		
		// Inputs
		showCompound(scene, util, inSys, "DOWN", 5, 15);
		indicateSuccess(scene, util, [4, 4, 2], 0);
		createItemOnBeltLike(scene, util, [4, 4, 2], "EAST", qes, 15);
		let dyeIE = createItemEntity(scene, util, [2.5, 8.5, 3.5], [0, 0.1, 0], yDye, 15);
		modifyEntity(scene, dyeIE, e => e.kill(), 0);		
		showSection(scene, util, inFunnel, "DOWN", 10);
		
		// Process Chromatic Singularity
		showSection(scene, util, basin, "DOWN", 20);
		showText(scene, util, 60,
			"§dPressing §fd'une QES avec du colorant, pour obtenir une\nChromatic Singularity",
			[2.5, 5.5, 2], PonderPalette.WHITE, 80);
		
		showFilterSlotInput(scene, util, [2 + 0.5, 5 + 0.75, 2], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2 + 0.5, 5 + 0.75, 2), PonderPointing.RIGHT).rightClick().withItem(chromSing), 30);
		scene.idle(40);
		setFilterData(scene, util, basin, BTE, chromSing, 10);
		
		flapFunnel(scene, util, inFunnel, false, 0);
		removeItemsFromBelt(scene, util, [3, 4, 2], 0);
		showSection(scene, util, smartChute, "UP", 20);
		
		showFilterSlotInput(scene, util, [2 + 0.5, 4 + 0.75, 2], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(2 + 0.5, 4 + 0.75, 2), PonderPointing.RIGHT).rightClick().withItem(chromSing), 30);
		scene.idle(40);
		setFilterData(scene, util, smartChute, SCTE, chromSing, 10);
		
		// Animation Press
		scene.addKeyframe();
		showSection(scene, util, press, "DOWN", 20);
		createItemOnBeltLike(scene, util, basin, "DOWN", yDye, 0);
		createItemOnBeltLike(scene, util, basin, "DOWN", qes, 0);
		
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(2, 5, 2), PonderPointing.RIGHT).withItem(qes), 30);
		scene.idle(10);
		scene.overlay().showControls(new PonderInput(util.vector().centerOf(2, 5, 2), PonderPointing.LEFT).withItem(yDye), 30);
		scene.idle(40);
		
		modifyTileNBT(scene, util, press, { Running: true }, 40);
		restoreBlocks(scene, util, basin, 0);
		setFilterData(scene, util, basin, BTE, chromSing, 40);
		
		// Process Paintballs
		scene.addKeyframe();
		showCompound(scene, util, outSys, "UP", 5, 15);
		showText(scene, util, 60,
			"Les Chromatic Singularities sont crushées pour donner différentes Paintballs",
			[2, 3.5, 2.5], PonderPalette.WHITE, 70);
		let pb1 = createItemOnBelt(scene, util, [2, 1, 2], "DOWN", ypb, 31);
		let pb2 = createItemOnBelt(scene, util, [2, 1, 2], "DOWN", gpb, 31);
		stallBeltItem(scene, pb1, true, 11);
		stallBeltItem(scene, pb2, true, 20);
		
		// Outputs
		scene.addKeyframe();
		for(let x = 0; x <= 4; x++) 
			showSection(scene, util, [x, 1, 0], "SOUTH", 3);
		scene.idle(10);
		for(let x = 0; x <= 4; x++) 
			createItemOnBeltLike(scene, util, [x, 1, 0], "SOUTH", paintballs[x], 3);
		scene.idle(20);
		showText(scene, util, 60,
			"Chaque Paintball a une chance aléatoire d'être générée",
			[0.5, 1 + 13 / 16.0, 0.5], PonderPalette.WHITE, 70);
		showText(scene, util, 60,
			"Attention ! Les Paintballs\nne sont pas stackables",
			[150], PonderPalette.RED, 80);
		
		for(let x = 0; x <= 4; x++)
			hideSection(scene, util, [x, 1, 0], "NORTH", 3);
		scene.idle(20);
		rotateCameraY(scene, 90, 40);
		
		// Alimentation
		scene.addKeyframe();
		showCompound(scene, util, power, "WEST", 0, 20);
		showText(scene, util, 60,
			"Seule partie de l'usine qui est alimentée indépendamment",
			[4 + 1 / 8.0, 2.5, 2.5], PonderPalette.WHITE, 70);
		rotateCameraY(scene, -90, 0);
	})	
	.scene("paint_drain", "Drainage de Paintballs", "kubejs:ch3_drain", (scene, util) => {
		scene.configureBasePlate(0, 0, 8);
		scene.setSceneOffsetY(-1);
		scene.scaleSceneView(.9);
		scene.showBasePlate();
		scene.idle(20);
		
		// Partie Demo ------------------------------------------------------
		// Sections & Positions
		let demoDepot = [0, 5, 2];
		let demoShift = [0, -4, 0];
		
		// Utilities
		let wasteB = Item.of("tconstruct:molten_ender_bucket");
		let mpb = Item.of("appliedenergistics2:magenta_paint_ball");
		let bpb = Item.of("appliedenergistics2:blue_paint_ball");
		let gpb = Item.of("appliedenergistics2:green_paint_ball");
		let ypb = Item.of("appliedenergistics2:yellow_paint_ball");
		let rpb = Item.of("appliedenergistics2:red_paint_ball");
		let npb = Item.of("appliedenergistics2:black_paint_ball");
		let paintballs = [mpb, bpb, gpb, ypb, rpb];
		let indySects = []; // Pour les links des sections independantes anonymes
		
		// Rappel sur les Paintballs
		for(let x = 1; x <= 5; x++) {
			let IS = scene.world().showIndependentSection(util.select().position(x, 5, 4), "NORTH");
			moveSection(scene, util, IS, demoShift, 0, 3);
			indySects.push(IS);
		}	
		scene.idle(10);
		for(let x = 1; x <= 5; x++) 
			createItemOnBeltLike(scene, util, [x, 5, 4], "SOUTH", paintballs[x-1], 3);
		scene.idle(20);
		showText(scene, util, 60,
			"5 couleurs de Paintballs différentes en entrée",
			[75], PonderPalette.INPUT, 70);
		
		let mDepot = AABB.of(1, 1 + 1 / 16.0, 4, 2, 1 + 13 / 16.0, 5);
		chaseBoundingBoxOutline(scene, PonderPalette.OUTPUT, mDepot, 60, 0);
		showText(scene, util, 60,
			"On ne veut que des Magenta Paintballs en sortie",
			[75], PonderPalette.OUTPUT, 80);
		
		// Exemple Blue -> Magenta
		scene.addKeyframe();
		for(let x = 0; x <= 1; x++) {
			let IS = scene.world().showIndependentSection(util.select().position(x, 5, 2), "DOWN");
			moveSection(scene, util, IS, demoShift, 0, 3);
			indySects.push(IS);
		}	
		let beltIS = scene.world().showIndependentSection(util.select().fromTo(6, 5, 2, 7, 5, 2), "DOWN");
		moveSection(scene, util, beltIS, [-4, -4, 0], 0, 20);
		showText(scene, util, 60,
			"En passant sur un Item Drain, une Paintball change de couleur",
			[1.5, 1 + 13 / 16.0, 2.5], PonderPalette.WHITE, 30);
		// Blue Paintball sur la Belt
		createItemOnBeltLike(scene, util, [7, 5, 2], "DOWN", bpb, 39);
		// Saut de la Paintball sur le Drain
		removeItemsFromBelt(scene, util, [6, 5, 2], 0);
		createItemOnBeltLike(scene, util, [1, 5, 2], "EAST", bpb, 50);
		
		// Infos sur le cycle
		showText(scene, util, 100, "Le cycle de changement de couleur est le suivant:",
			[0], PonderPalette.WHITE, 30);
		showText(scene, util, 75, "§cRed §f-> §eYellow", [25], PonderPalette.WHITE, 5);
		showText(scene, util, 75, "§eYellow §f-> §aGreen", [41], PonderPalette.WHITE, 5);
		showText(scene, util, 75, "§aGreen §f-> §9Blue", [57], PonderPalette.WHITE, 5);
		showText(scene, util, 75, "§9Blue §f-> §dMagenta", [73], PonderPalette.WHITE, 5);
		showText(scene, util, 75, "§dMagenta §f-> §8Black", [89], PonderPalette.WHITE, 25);
		
		// Exemple complet Red -> Magenta
		scene.addKeyframe();
		moveSection(scene, util, beltIS, [4, 0, 0], 20, 23);
		for(let x = 2; x <= 5; x++) {
			let IS = scene.world().showIndependentSection(util.select().position(x, 5, 2), "DOWN");
			moveSection(scene, util, IS, demoShift, 0, 3);
			indySects.push(IS);
		}	
		scene.idle(20);
		restoreBlocks(scene, util, [0, 5, 2, 1, 5, 2], 0);
		createItemOnBeltLike(scene, util, [7, 5, 2], "DOWN", rpb, 200);
		let depotBB = AABB.of(0, 1, 2, 1, 1 + 13 / 16.0, 3);
		chaseBoundingBoxOutline(scene, PonderPalette.RED, depotBB, 60, 0);
		showText(scene, util, 60,
			"Il faut donc faire attention à ne pas trop drainer une Paintball",
			[0, 1 + 5.5 / 16.0, 2.5], PonderPalette.RED, 80);
		
		// Chromatic Waste
		scene.addKeyframe();
		showText(scene, util, 80,
			"Chaque nettoyage génère du Chromatic Waste, dont il faut\nse débarrasser",
			[3.5, 1 + 13 / 16.0, 2.5], PonderPalette.WHITE, 70);
		
		for(let x = 1; x <= 7; x++) {
			let IS = scene.world().showIndependentSection(util.select().position(x, 5, 1), "SOUTH");
			moveSection(scene, util, IS, demoShift, 0, 3);
			indySects.push(IS);
		}
		scene.idle(20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(7, 1, 1), PonderPointing.DOWN).withItem(wasteB), 30);
		scene.idle(70);
		
		scene.world().hideIndependentSection(beltIS, "UP");
		indySects.forEach(IS => scene.world().hideIndependentSection(IS, "UP"));
		scene.idle(30);
		
		// Partie Usine -------------------------------------
		// Sections & Positions
		let inBelt = [1, 3, 7, 6, 3, 7];
		let outBelt = [1, 3, 1, 5, 3, 1];
		let outDepot = [6, 3, 1];
		let pump1 =[[3, 1, 0, 3, 1, 3], [2, 1, 2]];
		let pump2 = [4, 1, 0, 4, 1, 4];
		let pump3 = [5, 1, 0, 5, 1, 5];

		// Inputs
		scene.addKeyframe();
		showSection(scene, util, inBelt, "DOWN", 20);
		
		// Process belts
		for(let x = 5; x >= 1; x--) {
			showSection(scene, util, [x,2,x+1, x,2,7], "UP", 3); // Belts
			for(let z = x; z >= 2; z--) 
				showSection(scene, util, [x, 2, z], "UP", 3); // Drains
		}
		scene.idle(20);
		
		// Funnels
		for(let x = 5; x >= 1; x--) 
			showSection(scene, util, [x, 3, 6], "DOWN", 3);
		scene.addKeyframe();
		showText(scene, util, 60, "Chaque couleur a sa\npiste associée",
			[3.5, 2 + 13 / 16.0, 4.5], PonderPalette.WHITE, 70);
		
		// Filtres
		for(let x = 1; x <= 5; x++) {
			showFilterSlotInput(scene, util, [x+0.5, 3+13/16.0, 6+0.5], 10, 0);
			scene.overlay().showControls(new PonderInput(util.vector().of(x + 0.5, 3 + 13 / 16.0, 6 + 0.5), PonderPointing.RIGHT).rightClick().withItem(paintballs[x-1]), 10);
			scene.idle(12);
			setFilterData(scene, util, [x, 3, 6], FTE, paintballs[x-1], 5);
		}
		scene.idle(20);
		
		// Items sur la belt		
		scene.addKeyframe();
		for(let i = 0; i <= 4; i++) {
			createItemOnBeltLike(scene, util, [6, 3, 7], "DOWN", paintballs[i], 0);
			indicateSuccess(scene, util, [6, 3, 7], 32);
		}
		
		// Animation process
		for(let x = 1; x <= 5; x++) {
			removeItemsFromBelt(scene, util, [x, 3, 7], 0);
			createItemOnBeltLike(scene, util, [x, 2, 6], "SOUTH", paintballs[x-1], 0);
		}
		scene.idle(140);
				
		// Funnels
		for(let x = 1; x <= 5; x++) 
			showSection(scene, util, [x, 3, 2], "DOWN", 3);
		scene.idle(20);
		
		// Outputs
		scene.addKeyframe();
		showSection(scene, util, outBelt, "DOWN", 5);
		showSection(scene, util, outDepot, "DOWN", 20);
		for(let x = 1; x <= 5; x++) {
			restoreBlocks(scene, util, [x, 2, 2], 0);
			createItemOnBeltLike(scene, util, [x, 3, 1], "SOUTH", mpb, 0);
		}
		scene.idle(17);
		for(let i = 0; i <= 4; i++) {
			removeItemsFromBelt(scene, util, [6, 3, 1], 0);
			indicateRedstone(scene, util, [6, 3, 1], 32);
		}
		
		// Evacuation du Chromatic Waste
		showCompound(scene, util, pump1, "WEST", 0, 5);
		showSection(scene, util, pump2, "WEST", 5);
		showSection(scene, util, pump3, "WEST", 20);
		showText(scene, util, 60, "Evacuation du Chromatic Waste",
			[3, 1.5, 0.5], PonderPalette.WHITE, 80);
		
		// Reglages additionnels
		scene.addKeyframe();
		showText(scene, util, 60, "Comme on peut générer jusqu'à\n5 Paintballs d'un coup…",
			[50], PonderPalette.WHITE, 70);
		showText(scene, util, 60, "…La distribution doit\nse faire rapidement",
			[1, 3.5, 7.5], PonderPalette.INPUT, 35);
		multiplyKineticSpeed(scene, util, inBelt, 4, 35);
		showText(scene, util, 60, "Pareil pour l'évacuation",
			[1, 3.5, 1.5], PonderPalette.OUTPUT, 35);
		multiplyKineticSpeed(scene, util, outBelt, 4, 35);
	})
	.scene("coil_part", "Production d'Induction Coil", "kubejs:ch3_coil", (scene, util) => {
		scene.configureBasePlate(0, 0, 7); // The name's Bond
		scene.setSceneOffsetY(-1);
		scene.scaleSceneView(.9);
		scene.showBasePlate();
		scene.idle(20);
	
		// Sections & Positions
		let inBelt = [2, 1, 0, 2, 1, 4];
		let crafters = [[3, 2, 0], [4, 2, 0], [3, 3, 0], [4, 3, 0]];
		let inMCFunnel = [2, 2, 0];
		let depot = [4, 4, 0];
		let chute = [4, 5, 1];
		let inChuteFunnel = [4, 5, 0];
		let beacon = [4, 2, 1];
		let beaconBase = [3, 1, 0, 5, 1, 2];
		let processBelt = [4, 3, 2, 4, 3, 5];
		let inBeltFunnel = [4, 3, 1];
		let press = [4, 5, 2];
		let crafter = [4, 4, 3];
		let inMCBrassFunnel = [4, 4, 2];
		let splitBelt = [3, 3, 4, 3, 3, 5];
		let tunnel = [3, 4, 4, 4, 4, 4];
		let barrels = [3, 4, 6, 4, 4, 6];
		let inFunnels = [3, 4, 5, 4, 4, 5];
		
		// Utilities
		// Attention : A cause de l'effet d'enchantement sur les items 
		// create:refined_radiance, kubejs:radiant_sheet et kubejs:radiant_coil,
		// des comportements imprevus peuvent avoir lieu : 
		//
		// Utiliser create:refined_radiance pour createItemEntity fait crash le jeu. 
		// Utiliser kubejs:radiant_sheet et kubejs:radiant_coil cause des glitchs visuels. 
		//
		// Pour contourner le probleme, 3 nouveaux items custom ont ete crees, avec
		// des textures fixes, via KubeJS.
		let mpb = Item.of("appliedenergistics2:magenta_paint_ball");
		let chromCompound = Item.of("create:chromatic_compound");
		let rRadiance = Item.of("kubejs:ponder_refined_radiance");
		let rSheet = Item.of("kubejs:ponder_radiant_sheet");
		let rCoil = Item.of("kubejs:ponder_radiant_coil");
		
		// Conditions initiales
		crafters.forEach(s => modifyTileNBT(scene, util, s, { Inventory: { Items: new CompoundNBT() }}, 0));
		setKineticSpeed(scene, util, crafters[0],  48, 0);
		setKineticSpeed(scene, util, crafters[1], -48, 0);
		setKineticSpeed(scene, util, crafters[2], -48, 0);
		setKineticSpeed(scene, util, crafters[3],  48, 0);
		modifyTileNBT(scene, util, crafter, { Inventory: { Items: new CompoundNBT() }}, 0);
		setKineticSpeed(scene, util, crafter, 32, 0);
		modifyTileNBT(scene, util, press, { Mode: 1 }, 0); // Mode BELT
		
		// Chromatic Compound
		showSection(scene, util, inBelt, "DOWN", 20);
		showCompound(scene, util, crafters, "DOWN", 3, 20);
		showSection(scene, util, inMCFunnel, "DOWN", 20);
		rotateCameraY(scene, -110, 45);
		
		// Affichage pour connecter deux crafters ensemble
		scene.addKeyframe();
		showText(scene, util, 50, "Connecter tous les Crafters",
			[3.5, 3.5, 1], PonderPalette.WHITE, 60);
		
		let target = AABB.of(3, 3 - 2 / 16.0, 0, 4, 3 + 2 / 16.0, 1);
		chaseBoundingBoxOutline(scene, PonderPalette.OUTPUT, target, 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(4, 3, 1), PonderPointing.LEFT).withWrench().rightClick(), 30);
		scene.idle(50);
		
		connectCrafterInvs(scene, util, crafters[2], crafters[0], 3);
		connectCrafterInvs(scene, util, crafters[0], crafters[1], 3);
		connectCrafterInvs(scene, util, crafters[1], crafters[3], 20); 
		rotateCameraY(scene, 110, 45);
		
		// Animation craft Chromatic Compound
		scene.addKeyframe();		
		for(let z = 1; z <= 4; z++) {
			createItemOnBeltLike(scene, util, [2, 1, z], "DOWN", mpb, 0);
			indicateSuccess(scene, util, [2, 1, z], 3);
		}
		scene.idle(20);
		
		for(let i = 3; i >= 0; i--) {	
			flapFunnel(scene, util, inMCFunnel, false, 0);
			removeItemsFromBelt(scene, util, [2, 1, 0], 0);
			restoreBlocks(scene, util, crafters[i], 0);
			switch(i) {
				case 3: connectCrafterInvs(scene, util, crafters[1], crafters[3], 0); 
								setKineticSpeed(scene, util, crafters[3], 48, 0);
								break;
				case 2: setKineticSpeed(scene, util, crafters[2], -48, 0); break;
				case 1: connectCrafterInvs(scene, util, crafters[0], crafters[1], 0); break;
				case 0: connectCrafterInvs(scene, util, crafters[1], crafters[0], 0); break;
				default: break;
			}
			scene.idle(i != 0 ? 35 : 1);
		}
		
		setKineticSpeed(scene, util, crafters[0],  48, 0);
		setKineticSpeed(scene, util, crafters[1], -48, 0);
		setKineticSpeed(scene, util, crafters[2], -48, 0);
		setKineticSpeed(scene, util, crafters[3],  48, 0);
		setCraftingResult(scene, util, crafters[3], chromCompound, 50);
		showSection(scene, util, depot, "DOWN", 60);
		
		scene.addKeyframe();
		showText(scene, util, 60,
			"Rappel: Les Paintballs ne sont pas stackables. Donc, elles doivent être process le plus vite possible",
			[3, 3.5, 0.5], PonderPalette.WHITE, 70);
		
		multiplyKineticSpeed(scene, util, inBelt, 4, 0);
		setKineticSpeed(scene, util, crafters[0],  192, 0);
		setKineticSpeed(scene, util, crafters[1], -192, 0);
		setKineticSpeed(scene, util, crafters[2], -192, 0);
		setKineticSpeed(scene, util, crafters[3],  192, 40);
		
		hideSection(scene, util, inBelt, "WEST", 0);
		hideSection(scene, util, inMCFunnel, "WEST", 0);
		hideSection(scene, util, [3, 2, 0, 4, 3, 0], "WEST", 0);
		rotateCameraY(scene, 90, 40);
		
		// Beacon
		scene.addKeyframe();
		showSection(scene, util, chute, "DOWN", 5);
		showSection(scene, util, inChuteFunnel, "SOUTH", 20);
		showSection(scene, util, beaconBase, "DOWN", 5);
		showSection(scene, util, beacon, "DOWN", 20);
		showText(scene, util, 80,
			"Le but est de faire passer le Chromatic Compound à travers le rayon du §bBeacon §fpour le transformer en Refined Radiance",
			[4.5, 3, 1.5], PonderPalette.WHITE, 90);
		
		// Fake beacon beam
		for(let dx = 6; dx < 12; dx++)
			for(let dz = 6; dz < 12; dz++) {
				scene.overlay().showLine(
					PonderPalette.WHITE, 
					util.vector().of(4 + dx / 16.0, 3, 1 + dz / 16.0), 
					util.vector().of(4 + dx / 16.0, 13, 1 + dz / 16.0), 
					40);
			}
		scene.idle(20);
		
		// Simulation de la transformation
		flapFunnel(scene, util, inChuteFunnel, false, 0);
		removeItemsFromBelt(scene, util, depot, 5);
		let rRad = createItemEntity(scene, util, [4.5, 4.5, 1.5], [0, -0.1, 0], rRadiance, 30);
		showText(scene, util, 80,
			"Attention, l'item de Refined Radiance n'est pas soumis à la gravité, mais conserve la direction qu'avait le Chromatic Compound",
			[100], PonderPalette.RED, 90);
		
		chaseBoundingBoxOutline(scene, PonderPalette.WHITE, AABB.of(4,5,1, 5,6,2), 80, 0);
		showText(scene, util, 80,
			"Ici, la Chute le pousse vers le\nbas, donc l'item finit sa course au-dessus du §bBeacon",
			[4.5, 3.35, 1.5], PonderPalette.WHITE, 100);
		hideSection(scene, util, depot, "UP", 5);
		hideSection(scene, util, chute, "UP", 5);
		hideSection(scene, util, inChuteFunnel, "UP", 20);
		
		// Process Radiant Sheet
		scene.addKeyframe();
		showSection(scene, util, processBelt, "DOWN", 5);
		showSection(scene, util, inBeltFunnel, "DOWN", 5);
		showSection(scene, util, press, "DOWN", 20);
		flapFunnel(scene, util, inBeltFunnel, false, 0);
		modifyEntity(scene, rRad, e => e.kill(), 0);
		let beltItem = createItemOnBelt(scene, util, [4, 3, 2], "DOWN", rRadiance, 20);
		showText(scene, util, 60,
			"§dPressing §fde la Refined Radiance\nen Radiant Sheet…",
			[4.5, 3 + 13 / 16.0, 2.5], PonderPalette.WHITE, 70);
		
		// Animation Sheet
		modifyTileNBT(scene, util, press, { Running: true }, 40);
		changeBeltItemTo(scene, beltItem, rSheet, 40);
		
		// Craft Coil
		scene.addKeyframe();
		showSection(scene, util, crafter, "DOWN", 5);
		showSection(scene, util, inMCBrassFunnel, "DOWN", 20);
		hideSection(scene, util, press, "UP", 0);
		rotateCameraY(scene, -20, 20);
		
		showFilterSlotInput(scene, util, [4 + 0.5, 4 + 13 / 16.0, 2 + 0.5], 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(4+0.5, 4+13/16.0, 2+0.5), 
			PonderPointing.LEFT).rightClick().withItem(rSheet), 30);
		scene.idle(40);
		setFilterData(scene, util, inMCBrassFunnel, FTE, rSheet, 20);
		
		showSection(scene, util, press, "DOWN", 0);
		rotateCameraY(scene, 20, 20);
		
		// Animation Crafter
		flapFunnel(scene, util, inMCBrassFunnel, false, 0);
		removeItemsFromBelt(scene, util, [4, 3, 2], 0);
		restoreBlocks(scene, util, crafter, 0);
		showText(scene, util, 60, "…Puis transformée\nen Induction Coil",
			[5, 4.5, 3.5], PonderPalette.WHITE, 70);
		
		setCraftingResult(scene, util, crafter, rCoil, 0);
		setKineticSpeed(scene, util, crafter, 32, 100);
		removeItemsFromBelt(scene, util, [4, 3, 3], 0);
		rotateCameraY(scene, 90, 40);
		
		// Tunnels et Outputs
		scene.addKeyframe();
		showSection(scene, util, splitBelt, "DOWN", 20);
		showSection(scene, util, tunnel, "DOWN", 20);
		
		// Config du Tunnel - Round-Robin
		showScrollInput(scene, util, [4 + 0.5, 4 + 1, 4 + 0.5], "DOWN", 50, 10);
		scene.overlay().showControls(new PonderInput(util.vector().of(4+0.5, 4+1.25, 4+0.5), 
			PonderPointing.DOWN).withWrench().showing(AllIcons.I_TUNNEL_ROUND_ROBIN), 40);
		scene.idle(60);
		
		createItemOnBeltLike(scene, util, [4, 3, 5], "NORTH", rCoil, 20);
		createItemOnBeltLike(scene, util, [3, 3, 4], "NORTH", rCoil, 0);
		
		// Vue finale, reapparition des elements caches
		scene.addKeyframe();
		for(let i = 0; i < 170; i++) {
			switch(i) {
				case 65: showSection(scene, util, inBelt, "EAST", 0); break;
				case 75: showSection(scene, util, inMCFunnel, "EAST", 0); break;
				case 85: showSection(scene, util, [3, 2, 0, 4, 3, 0], "EAST", 0); break;
				case 95: 
					showSection(scene, util, depot, "DOWN", 0);
					showSection(scene, util, chute, "DOWN", 0);
					showSection(scene, util, inChuteFunnel, "DOWN", 0);
					break;
				case 125: showSection(scene, util, inFunnels, "DOWN", 0); break;
				case 135: showSection(scene, util, barrels, "DOWN", 0); break;
				case 150: 
					removeItemsFromBelt(scene, util, [3, 3, 5], 0);
					removeItemsFromBelt(scene, util, [4, 3, 5], 0);
					flapFunnel(scene, util, [3, 4, 5], false, 0);
					flapFunnel(scene, util, [4, 4, 5], false, 0);
					break;
				default: break;					
			}
			rotateCameraY(scene, 2, 1);
		}
		scene.idle(10);
		
		scene.overlay().showControls(new PonderInput(util.vector().of(4, 5, 6.5), PonderPointing.DOWN).withItem(rCoil), 30);
		scene.idle(20);
	})
	.scene("inductive_part", "Production d'Inductive Mechanisms", "kubejs:ch3_mechanism", (scene, util) => {
		scene.setSceneOffsetY(-1);
		scene.showBasePlate();
		scene.idle(20);
		
		// Sections & Positions
		let inFunnel = [0, 2, 1];
		
		// Utilities
		let rCoil = Item.of("kubejs:ponder_radiant_coil");
		let resonator = Item.of("kubejs:chromatic_resonator");
		let precMech = Item.of("create:precision_mechanism");
		let iIndMech = Item.of("kubejs:incomplete_inductive_mechanism");
		let indMech = Item.of("kubejs:inductive_mechanism");
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
		
		// Radiant coil, Radiant coil et resonator dans les deployers
		scene.overlay().showControls(new PonderInput(util.vector().topOf(3, 3, 1), PonderPointing.DOWN).withItem(rCoil), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(2, 3, 1), PonderPointing.DOWN).withItem(rCoil), 30);
		scene.idle(5);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(1, 3, 1), PonderPointing.DOWN).withItem(resonator), 30);
		scene.idle(30);
		
		modifyTileNBT(scene, util, [3, 3, 1], { HeldItem: rCoil }, 5);
		modifyTileNBT(scene, util, [2, 3, 1], { HeldItem: rCoil }, 5);
		modifyTileNBT(scene, util, [1, 3, 1], { HeldItem: resonator }, 15);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(4, 2, 2), PonderPointing.DOWN).withItem(precMech), 30);
		scene.idle(40);
		
		// Sequenced Assembly de Precision Mechanism vers Inductive Mechanism
		scene.addKeyframe();
		let sequence = createItemOnBelt(scene, util, [4, 1, 1], "SOUTH", precMech, 30);
		
		moveDeployer(scene, util, [3, 3, 1], 1, 19, 20);
		changeBeltItemTo(scene, sequence, iIndMech, 0);
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
		
		changeBeltItemTo(scene, sequence, indMech, 0);
		stallBeltItem(scene, sequence, false, 0);
		moveDeployer(scene, util, [1, 3, 1], -1, 19, 20);
		
		removeItemsFromBelt(scene, util, [0, 1, 1], 0);
		flapFunnel(scene, util, inFunnel, false, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(0, 2, 2), PonderPointing.DOWN).withItem(indMech), 30);
		scene.idle(40);
	})
	.scene("overview_3", "Usine complète", "kubejs:ch3_overview", (scene, util) => {
		// Attention, utiliser des Item Pipes de PrettyPipes dans une scene Ponder 
		// fait crash le jeu. Les Pipes visibles ici sont des copies du modele, mis
		// sur les item_pipe de Pipez.
		let baseEven = [[4, 0, 4], [3, 0, 5], [5, 0, 5], [4, 0, 6]];
		let baseOdd = [[3, 0, 4], [5, 0, 4], [4, 0, 5], [3, 0, 6], [5, 0, 6]];
		baseEven.forEach(s => replaceBlocks(scene, util, s, "minecraft:gray_concrete", false, 0));
		baseOdd.forEach(s => replaceBlocks(scene, util, s, "minecraft:cyan_terracotta", false, 0));
		
		scene.configureBasePlate(0, 0, 16);
		scene.scaleSceneView(0.5);
		scene.setSceneOffsetY(-3);
		scene.rotateCameraY(-90);
		scene.showBasePlate();
		scene.idle(30);
		
		// Partie chaine de production ---------------------------------------------------
		// Sections & Positions
		let singProd = [[4, 4, 9, 4, 7, 13], [4, 8, 10, 4, 8, 12],
			[4, 8, 13, 10, 10, 13], [6, 8, 12, 6, 9, 14],
			[5, 5, 8, 8, 6, 10], [5, 5, 11, 6, 6, 13]];
		let tntProd = [[7, 5, 12, 9, 7, 13], [9, 9, 12, 10, 10, 12],
			[7, 9, 12], [8, 8, 10], [10, 6, 13]];
		let qesProd = [[10, 5, 10, 11, 5, 13], [10, 6, 10, 11, 6, 12],
			[11, 6, 13], [11, 7, 12, 11, 10, 13], [12, 7, 12, 13, 9, 13]];
		let paintProd = [[12, 4, 6, 12, 7, 11],
			[11, 5, 6, 13, 5, 7], [10, 4, 6, 14, 4, 8],
			[12, 3, 1, 12, 3, 7], [12, 9, 6], [11, 5, 8, 11, 6, 8]];
		let paintDrain = [[7, 2, 2, 12, 2, 6],
			[12, 2, 7, 13, 2, 7], [6, 3, 2, 11, 3, 6],
			[5, 1, 3, 10, 1, 6], [5, 2, 6, 5, 3, 6], [13, 3, 7]];
		let pbOverflow = [12, 4, 0, 12, 4, 1];
		let coilProd = [[4, 4, 1, 5, 7, 6],
			[4, 6, 0, 5, 6, 0], [6, 5, 1, 6, 7, 3],
			[6, 4, 6], [5, 3, 3], [4, 1, 5]];
		let seqAssembly = [[1, 1, 0, 12, 3, 0],
			[1, 3, 0, 6, 5, 0], [5, 2, 1, 6, 2, 4]];
		
		// Utilities
		let stick = Item.of("minecraft:stick");
		let sand = Item.of("minecraft:sand", 16);
		let gunpowder = Item.of("minecraft:gunpowder", 1);
		let precMech = Item.of("create:precision_mechanism");
		
		// Conditions initiales
		modifyTileNBT(scene, util, [2, 4, 0], { Value: 0.79 }, 0);
		
		showText(scene, util, 60, "Commençons par la ligne\nde production",
			[25], PonderPalette.INPUT, 70);
		
		// Production Singularities
		scene.addKeyframe();
		showCompound(scene, util, singProd, "DOWN", 0, 20);
		showText(scene, util, 60, "Production de Singularities",
			[4.5, 6.5, 14], PonderPalette.WHITE, 70);
		rotateCameraY(scene, -35, 25);		
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(5, 6, 13), PonderPointing.DOWN).withItem(stick), 30);
		scene.idle(60);
		
		// Crafter TNT
		scene.addKeyframe();
		showCompound(scene, util, tntProd, "SOUTH", 0, 20);
		showText(scene, util, 60, "Automatisation du TNT",
			[8.5, 6.5, 14], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(7, 9, 12), PonderPointing.DOWN).withItem(sand), 30);
		scene.idle(15);
		createItemOnBeltLike(scene, util, [7, 9, 12], "NORTH", sand, 0);
		scene.overlay().showControls(new PonderInput(util.vector().topOf(9, 9, 12), PonderPointing.DOWN).withItem(gunpowder), 30);
		scene.idle(15);
		createItemOnBeltLike(scene, util, [9, 9, 12], "EAST", gunpowder, 40);		
		rotateCameraY(scene, -55, 30);
		
		// Production QES
		scene.addKeyframe();
		showCompound(scene, util, qesProd, "DOWN", 0, 20);
		showText(scene, util, 60, "Conversion en Entangled Singularities",
			[13, 7.5, 12.5], PonderPalette.WHITE, 80);
		showText(scene, util, 80,
			"Le même Vacuumulator est utilisé pour la Gunpowder et l'Ender Dust",
			[10.5, 11, 12.5], PonderPalette.OUTPUT, 90);
		rotateCameraY(scene, -90, 40);
		
		// Fabrication Paintballs
		scene.addKeyframe();
		showCompound(scene, util, paintProd, "DOWN", 0, 20);
		showText(scene, util, 60, "Production de Paintballs",
			[12.5, 5.5, 6], PonderPalette.WHITE, 80);
			
		let limitBelt = AABB.of(12, 6+3/16.0, 7, 13, 6+13/16.0, 12);
		chaseBoundingBoxOutline(scene, PonderPalette.OUTPUT, limitBelt, 160, 0);
		showText(scene, util, 80,
			"La vitesse de cette Belt limite la surproduction de QES en amont…",
			[12.5, 6 + 13 / 16.0, 9.5], PonderPalette.OUTPUT, 90);
		showText(scene, util, 60,
			"…Ainsi que la surproduction de Paintballs en aval",
			[140], PonderPalette.OUTPUT, 70);
		rotateCameraY(scene, -20, 20);
		
		// Drain Paintballs
		scene.addKeyframe();
		showCompound(scene, util, paintDrain, "SOUTH", 0, 20);
		showText(scene, util, 60, "Drainage de Paintballs",
			[9.5, 2 + 13 / 16.0, 4.5], PonderPalette.WHITE, 70);
		rotateCameraY(scene, -70, 35);
		
		// Quelques securites en plus
		showSection(scene, util, pbOverflow, "DOWN", 20);
		showText(scene, util, 60,	"Le (rare) surplus de\nPaintballs est jeté…",
			[12, 4.5, 0.5], PonderPalette.WHITE, 70);
		showText(scene, util, 80,
			"…Ainsi que les (rares) Paintballs de la mauvaise couleur en sortie",
			[5.5, 3.5, 6.5], PonderPalette.WHITE, 100);
		
		// Craft Induction Coil
		scene.addKeyframe();
		showCompound(scene, util, coilProd, "DOWN", 0, 0);
		restoreBlocks(scene, util, [3, 0, 4, 5, 0, 6], 20);
		showText(scene, util, 60, "Production d'Induction Coil",
			[4, 6.5, 3.5], PonderPalette.WHITE, 70);
		hideSection(scene, util, pbOverflow, "UP", 20);
		
		// Ligne d'assemblage des Inductive Mechanisms
		scene.addKeyframe();
		showCompound(scene, util, seqAssembly, "SOUTH", 0, 20);
		showText(scene, util, 60, "Ligne d'assemblage des\nInductive Mechanisms",
			[4.5, 3.5, 0], PonderPalette.WHITE, 70);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(12, 3, 0), PonderPointing.DOWN).withItem(precMech), 30);
		scene.idle(40);
		showSection(scene, util, pbOverflow, "DOWN", 20);
		
		// Partie ressources -------------------------------------------------------------
		// Sections & Positions
		let gpFarm = [[9, 6, 8, 9, 12, 11], [10, 10, 10, 10, 10, 11],
			[10, 7, 9, 10, 7, 13], [10, 8, 9, 10, 11, 9], [8, 8, 8, 8, 9, 8],
			[9, 8, 7, 9, 9, 7], [10, 8, 8, 10, 9, 8]];
		let edFarm = [[11, 7, 8, 11, 12, 11], [11, 6, 9],
			[11, 8, 7, 11, 9, 7], [12, 8, 8, 12, 9, 8]];
		let dyeFarm = [[11, 6, 5, 11, 12, 5], [11, 11, 4],
			[12, 6, 5, 12, 9, 5], [12, 8, 6], [10, 7, 7, 10, 7, 8],
			[10, 7, 6, 11, 9, 6], [10, 7, 5, 10, 11, 5],
			[10, 6, 4, 10, 6, 5], [11, 8, 4, 11, 9, 4]];
		let bmFarm = [[9, 6, 3, 9, 12, 6], [8, 8, 6, 8, 9, 6],
			[10, 9, 2, 12, 10, 3], [10, 7, 3, 10, 7, 4], [7, 7, 3, 8, 7, 3]];
		let bmArm = [8, 8, 4];
		let sandTNT = [[5, 9, 2, 8, 9, 4], [6, 8, 3], [8, 8, 3],
			[7, 8, 3, 7, 8, 11], [7, 9, 11], [7, 6, 11, 7, 7, 11],
			[4, 8, 9, 8, 9, 9], [6, 8, 5, 8, 9, 5]];
		
		// Utilities
		let enderFern = Item.of("tconstruct:ender_slime_fern");
		let skyFern = Item.of("tconstruct:sky_slime_fern");
		let earthFern = Item.of("tconstruct:earth_slime_fern");
		
		showText(scene, util, 60, "Ensuite, les Ressources Utiles",
			[145], PonderPalette.GREEN, 70);
		rotateCameraY(scene, -110, 45);
		
		// Production Gunpowder & Ender Dust
		scene.addKeyframe();
		showText(scene, util, 60, "Au fond, il nous faut de la Gunpowder pour le TNT…",
			[10.5, 11, 12.5], PonderPalette.WHITE, 70);
		showCompound(scene, util, gpFarm, "DOWN", 0, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(9, 9, 9), PonderPointing.DOWN).withItem(earthFern), 30);
		scene.idle(15);
		createItemOnBeltLike(scene, util, [9, 9, 9], "EAST", earthFern, 45);
		rotateCameraY(scene, -70, 35);
		
		showText(scene, util, 60, "…Ainsi que de l'Ender\nDust pour les QES",
			[10.5, 11, 12.5], PonderPalette.WHITE, 70);
		showCompound(scene, util, edFarm, "DOWN", 0, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(11, 9, 9), PonderPointing.DOWN).withItem(enderFern), 30);
		scene.idle(15);
		createItemOnBeltLike(scene, util, [11, 9, 9], "WEST", enderFern, 45);
		rotateCameraY(scene, -110, 45);
		
		// Production Colorant et Bone Meal
		scene.addKeyframe();
		showText(scene, util, 60, "Devant, il nous faut la production de colorants…",
			[12.5, 7.5, 6], PonderPalette.WHITE, 70);
		showCompound(scene, util, dyeFarm, "DOWN", 0, 40);
		rotateCameraY(scene, -70, 35);
		showText(scene, util, 60, "…Ainsi que de la Bone\nMeal, pour les fleurs",
			[11.5, 11.5, 4.5], PonderPalette.WHITE, 70);
		showCompound(scene, util, bmFarm, "DOWN", 0, 20);
		
		scene.overlay().showControls(new PonderInput(util.vector().topOf(9, 9, 5), PonderPointing.DOWN).withItem(skyFern), 30);
		scene.idle(15);
		createItemOnBeltLike(scene, util, [9, 9, 5], "EAST", skyFern, 45);
		
		// Ajout du Mechanical Arm pour distribuer la Bone Meal
		let input = AABB.of(10, 9, 3, 11, 9 + 13 / 16.0, 4);
		let output = AABB.of(11, 11, 4.4, 12, 12, 5);
		chaseBoundingBoxOutline(scene, PonderPalette.INPUT, input, 47, 10);
		chaseBoundingBoxOutline(scene, PonderPalette.OUTPUT, output, 40, 25);
		showSection(scene, util, bmArm, "DOWN", 15);
		indicateSuccess(scene, util, bmArm, 20);
		showText(scene, util, 60, "La Bone Meal est distribuée\navec un Mechanical Arm",
			[8.5, 8.5, 4.5], PonderPalette.WHITE, 70);
		rotateCameraY(scene, -20, 30);
		
		// Production Sand
		scene.addKeyframe();
		showCompound(scene, util, sandTNT, "DOWN", 0, 20);
		showText(scene, util, 60, "Enfin, on ajoute une production\nde Sand pour le TNT",
			[7.5, 8 + 13 / 16.0, 7.5], PonderPalette.WHITE, 70);
		rotateCameraY(scene, 20, 30);
		
		// Taille globale 13x15
		scene.addKeyframe();
		showSelectionWithText(scene, util, [1,1,0, 13,12,14], 60,
			"L'usine complète peut tenir\nsur un seul chunk",
			[1, 6.5, 0], PonderPalette.GREEN, 80);
		
		// Stress Impact: 203.0x RPM
		let stressometer = AABB.of(2, 4, 0, 3, 5, 1);
		chaseBoundingBoxOutline(scene, PonderPalette.FAST, stressometer, 90, 0);
		showText(scene, util, 80, "Stress Impact:", [160], PonderPalette.WHITE, 10);
		showText(scene, util, 70, "203.0x RPM", [176], PonderPalette.FAST, 80);
		
		// Vue finale
		scene.addKeyframe();
		for(let i = 0; i < 145; i++) 
			rotateCameraY(scene, -2, 1);
	});
	
})
