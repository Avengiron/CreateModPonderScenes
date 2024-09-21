// Creation du tag quete principale
onEvent("ponder.tag.registry", event => {
	event.create("main_quest", "kubejs:computation_matrix", 
		"Chapitres de la quête principale", 
		`Quelques usines personnelles, avec 2 recettes uniques. §6Les scènes sont muettes.`);
})

// Global utilities - Charge une fois, utilise dans tous les Chapitres
const Minecart = java("net.minecraft.entity.item.minecart.MinecartEntity");
const HopperMinecart = java("net.minecraft.entity.item.minecart.HopperMinecartEntity");	
const AllIcons = java("com.simibubi.create.foundation.gui.AllIcons");
const STE = java("com.simibubi.create.content.contraptions.components.saw.SawTileEntity");
const BTE = java("com.simibubi.create.content.contraptions.processing.BasinTileEntity");
const FTE = java("com.simibubi.create.content.logistics.block.funnel.FunnelTileEntity");
const ATE = java("com.simibubi.create.content.logistics.block.mechanicalArm.ArmTileEntity");
const SCTE = java("com.simibubi.create.content.logistics.block.chute.SmartChuteTileEntity");
const SSTE = java("com.simibubi.create.content.logistics.block.redstone.StockpileSwitchTileEntity");
const SFPTE = java("com.simibubi.create.content.contraptions.fluids.pipes.SmartFluidPipeTileEntity");
const CompoundNBT = java("net.minecraft.nbt.CompoundNBT");

// Fonctions generiques pour simplifier la synthaxe
// Trois objectifs avec ces methodes :
// - Appeler directement les méthodes concernées, au lieu de préciser
//		 scene.world(), scene.effects(), scene.overlay() ou scene.special()
//	 En contrepartie, on doit passer scene et/ou util en paramètres
// - Ne plus faire de distinctions entre Selection, BlockPos et Vector3d
//		 util.select().position(x, y, z) ou .fromTo(x1, y1, z1, x2, y2, z2)
//		 util.grid().at(x, y, z)
//		 util.vector().of(x, y, z), .centerOf(x, y, z) ou .topOf(x, y, z)
// 	 Au lieu de ça, on utilise un array [x, y, z], ou [x1, y1, z1, x2, y2, z2]
//	 comme sur PonderJS 1.18+
// - Inclure un idleTick à chaque methode. Ainsi, on evite d'avoir des scene.idle(t)
//   apres chaque instruction

// General
const rotateCameraY = (scene, angle, idleTick) => {
	scene.rotateCameraY(angle);
	if(idleTick != 0) scene.idle(idleTick);
}

// Effects
const indicateRedstone = (scene, util, pos, idleTick) => {
	let p = util.grid().at(pos[0], pos[1], pos[2]);
	scene.effects().indicateRedstone(p);
	if(idleTick != 0) scene.idle(idleTick);
}

const indicateSuccess = (scene, util, pos, idleTick) => {
	let p = util.grid().at(pos[0], pos[1], pos[2]);
	scene.effects().indicateSuccess(p);
	if(idleTick != 0) scene.idle(idleTick);
}

// Overlay	
const showText = (scene, util, time, text, pos, pColor, idleTick) => {
	if(pos.length == 1)
		scene.overlay().showText(time).text(text)
			.independent(pos[0])
			.colored(pColor).placeNearTarget();
	else if(pos.length == 3) 
		scene.overlay().showText(time).text(text)
			.pointAt(util.vector().of(pos[0], pos[1], pos[2]))
			.colored(pColor).placeNearTarget();
	if(idleTick != 0) scene.idle(idleTick);
}

const showSelectionWithText = (scene, util, sel, time, text, pos, pColor, idleTick) => {
	let s;
	if(sel.length == 3) 
		s = util.select().position(sel[0], sel[1], sel[2]);
	else if(sel.length == 6) 
		s = util.select().fromTo(sel[0], sel[1], sel[2], sel[3], sel[4], sel[5]);
	if(pos.length == 1)
		scene.overlay().showSelectionWithText(s, time).text(text)
			.independent(pos[0])
			.colored(pColor).placeNearTarget();
	else if(pos.length == 3) 
		scene.overlay().showSelectionWithText(s, time).text(text)
			.pointAt(util.vector().of(pos[0], pos[1], pos[2]))
			.colored(pColor).placeNearTarget();
	if(idleTick != 0) scene.idle(idleTick);
}

const chaseBoundingBoxOutline = (scene, pColor, aabb, duration, idleTick) => {
	scene.overlay().chaseBoundingBoxOutline(pColor, new Object(), aabb, duration);
	if(idleTick != 0) scene.idle(idleTick);
}

const showScrollInput = (scene, util, pos, direction, duration, idleTick) => {
	let v = util.vector().of(pos[0], pos[1], pos[2]);
	scene.overlay().showScrollInput(v, direction, duration);
	if(idleTick != 0) scene.idle(idleTick);
}

const showFilterSlotInput = (scene, util, pos, duration, idleTick) => {
	let v = util.vector().of(pos[0], pos[1], pos[2]);
	scene.overlay().showFilterSlotInput(v, duration);
	if(idleTick != 0) scene.idle(idleTick);
}

// World
const showSection = (scene, util, pos, direction, idleTick) => {
	let s;
	if(pos.length == 3) 
		s = util.select().position(pos[0], pos[1], pos[2]);
	else if(pos.length == 6) 
		s = util.select().fromTo(pos[0], pos[1], pos[2], pos[3], pos[4], pos[5]);
	scene.world().showSection(s, direction);
	if(idleTick != 0) scene.idle(idleTick);
}

const hideSection = (scene, util, pos, direction, idleTick) => {
	let s;
	if(pos.length == 3) 
		s = util.select().position(pos[0], pos[1], pos[2]);
	else if(pos.length == 6) 
		s = util.select().fromTo(pos[0], pos[1], pos[2], pos[3], pos[4], pos[5]);
	scene.world().hideSection(s, direction);
	if(idleTick != 0) scene.idle(idleTick);
}

const restoreBlocks = (scene, util, pos, idleTick) => {
	let s;
	if(pos.length == 3) 
		s = util.select().position(pos[0], pos[1], pos[2]);
	else if(pos.length == 6) 
		s = util.select().fromTo(pos[0], pos[1], pos[2], pos[3], pos[4], pos[5]);
	scene.world().restoreBlocks(s);
	if(idleTick != 0) scene.idle(idleTick);
}

const moveSection = (scene, util, link, pos, duration, idleTick) => {
	let v = util.vector().of(pos[0], pos[1], pos[2]);
	scene.world().moveSection(link, v, duration);
	if(idleTick != 0) scene.idle(idleTick);
}

const moveDeployer = (scene, util, pos, distance, duration, idleTick) => {
	let p = util.grid().at(pos[0], pos[1], pos[2]);
	scene.world().moveDeployer(p, distance, duration);
	if(idleTick != 0) scene.idle(idleTick);
}

const setBlock = (scene, util, pos, newBlock, particles, idleTick) => {
	let p = util.grid().at(pos[0], pos[1], pos[2]);
	scene.world().setBlock(p, util.getDefaultState(newBlock), particles);
	if(idleTick != 0) scene.idle(idleTick);
}

const replaceBlocks = (scene, util, pos, newBlock, particles, idleTick) => {
	let s;
	if(pos.length == 3) 
		s = util.select().position(pos[0], pos[1], pos[2]);
	else if(pos.length == 6) 
		s = util.select().fromTo(pos[0], pos[1], pos[2], pos[3], pos[4], pos[5]);
	scene.world().replaceBlocks(s, util.getDefaultState(newBlock), particles);
	if(idleTick != 0) scene.idle(idleTick);
}	

const modifyBlock = (scene, util, pos, property, newState, idleTick) => {
	let p = util.grid().at(pos[0], pos[1], pos[2]);
	scene.world().modifyBlock(p, s => s.with(property, newState));
	if(idleTick != 0) scene.idle(idleTick);
}

const toggleRedstonePower = (scene, util, pos, idleTick) => {
	let s;
	if(pos.length == 3) 
		s = util.select().position(pos[0], pos[1], pos[2]);
	else if(pos.length == 6) 
		s = util.select().fromTo(pos[0], pos[1], pos[2], pos[3], pos[4], pos[5]);
	scene.world().toggleRedstonePower(s);
	if(idleTick != 0) scene.idle(idleTick);
}	

const modifyEntity = (scene, link, func, idleTick) => {
	scene.world().modifyEntity(link, func);
	if(idleTick != 0) scene.idle(idleTick);
}

const createEntity = (scene, util, entity, pos, idleTick) => {
	let v = util.vector().of(pos[0], pos[1], pos[2]);
	let link = scene.world().createEntity(entity, v);
	if(idleTick != 0) scene.idle(idleTick);
	return link;
}

const createItemEntity = (scene, util, pos, motion, item, idleTick) => {
	let v1 = util.vector().of(pos[0], pos[1], pos[2]);
	let v2 = util.vector().of(motion[0], motion[1], motion[2]);
	let link = scene.world().createItemEntity(v1, v2, item);
	if(idleTick != 0) scene.idle(idleTick);
	return link;
}

const createItemOnBeltLike = (scene, util, pos, direction, item, idleTick) => {
	let p = util.grid().at(pos[0], pos[1], pos[2]);
	scene.world().createItemOnBeltLike(p, direction, item);
	if(idleTick != 0) scene.idle(idleTick);
}

const createItemOnBelt = (scene, util, pos, direction, item, idleTick) => {
	let p = util.grid().at(pos[0], pos[1], pos[2]);
	let link = scene.world().createItemOnBelt(p, direction, item);
	if(idleTick != 0) scene.idle(idleTick);
	return link;
}

const removeItemsFromBelt = (scene, util, pos, idleTick) => {
	let p = util.grid().at(pos[0], pos[1], pos[2]);
	scene.world().removeItemsFromBelt(p);
	if(idleTick != 0) scene.idle(idleTick);
}

const stallBeltItem = (scene, link, stalled, idleTick) => {
	scene.world().stallBeltItem(link, stalled);
	if(idleTick != 0) scene.idle(idleTick);
}

const changeBeltItemTo = (scene, link, newItem, idleTick) => {
	scene.world().changeBeltItemTo(link, newItem);
	if(idleTick != 0) scene.idle(idleTick);
}

const setKineticSpeed = (scene, util, pos, speed, idleTick) => {
	let s;
	if(pos.length == 3) 
		s = util.select().position(pos[0], pos[1], pos[2]);
	else if(pos.length == 6) 
		s = util.select().fromTo(pos[0], pos[1], pos[2], pos[3], pos[4], pos[5]);
	scene.world().setKineticSpeed(s, speed);
	if(idleTick != 0) scene.idle(idleTick);
}

const multiplyKineticSpeed = (scene, util, pos, modifier, idleTick) => {
	let s;
	if(pos.length == 3) 
		s = util.select().position(pos[0], pos[1], pos[2]);
	else if(pos.length == 6) 
		s = util.select().fromTo(pos[0], pos[1], pos[2], pos[3], pos[4], pos[5]);
	scene.world().multiplyKineticSpeed(s, modifier);
	if(idleTick != 0) scene.idle(idleTick);
}

const setFilterData = (scene, util, pos, TE, item, idleTick) => {
	let s = util.select().position(pos[0], pos[1], pos[2]);
	scene.world().setFilterData(s, TE, item);
	if(idleTick != 0) scene.idle(idleTick);
}

const modifyTileNBT = (scene, util, pos, nbt, idleTick) => {
	let s = util.select().position(pos[0], pos[1], pos[2]);
	scene.world().modifyTileNBT(s, nbt);
	if(idleTick != 0) scene.idle(idleTick);
}

const instructArm = (scene, util, pos, phase, item, id, idleTick) => {
	let p = util.grid().at(pos[0], pos[1], pos[2]);
	scene.world().instructArm(p, phase, item, id);
	if(idleTick != 0) scene.idle(idleTick);
}

const flapFunnel = (scene, util, pos, outward, idleTick) => {
	let p = util.grid().at(pos[0], pos[1], pos[2]);
	scene.world().flapFunnel(p, outward);
	if(idleTick != 0) scene.idle(idleTick);
}

const setCraftingResult = (scene, util, pos, item, idleTick) => {
	let p = util.grid().at(pos[0], pos[1], pos[2]);
	scene.world().setCraftingResult(p, item);
	if(idleTick != 0) scene.idle(idleTick);
}

const connectCrafterInvs = (scene, util, pos1, pos2, idleTick) => {
	let p1 = util.grid().at(pos1[0], pos1[1], pos1[2]);
	let p2 = util.grid().at(pos2[0], pos2[1], pos2[2]);
	scene.world().connectCrafterInvs(p1, p2);
	if(idleTick != 0) scene.idle(idleTick);
}

// Nouvelles methodes quand on travaille avec des selections multiples (Compound)
// 	 Avant : let myCompound = util.select().position(x1, y1, z1)
//		 				 .add(util.select().position(x2, y2, z2))
//						 	 ...
//		 				 .add(util.select().position(xn, yn, zn));
//					 scene.world().showSection(myCompound, Direction.DOWN);
//					 scene.idle(20);
//	 Apres : let myCompound = [[x1, y1, z1], [x2, y2, z2], ..., [xn, yn, zn]];
//					 showCompound(scene, util, myCompound, Direction.DOWN, 0, 20);
// Ajoute la possibilite d'attendre entre chaque apparition d'elements (idleBetween)

const showCompound = (scene, util, compound, direction, idleBetween, idleTick) => {
	if(typeof compound[0] === "object") {
		compound.forEach(s => showSection(scene, util, s, direction, idleBetween));
		if(idleTick != 0) scene.idle(idleTick);
	} else showSection(scene, util, compound, direction, idleTick);
}

const hideCompound = (scene, util, compound, direction, idleBetween, idleTick) => {
	if(typeof compound[0] === "object") {
		compound.forEach(s => hideSection(scene, util, s, direction, idleBetween));
		if(idleTick != 0) scene.idle(idleTick);
	} else hideSection(scene, util, compound, direction, idleTick);
}

// Cache les blocks et items custom du menu JEI
onEvent('jei.hide.items', event => {
  event.hide('kubejs:ponder_radiant_coil')
  event.hide('kubejs:ponder_radiant_sheet')
  event.hide('kubejs:ponder_refined_radiance')
	
  event.hide('kubejs:red_laser_lamp')
  event.hide('kubejs:red_laser_lamp_on')
})