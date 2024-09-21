// priority: 0

onEvent('item.registry', event => {

	event.create('ponder_radiant_coil').texture("kubejs:item/ponder_radiant_coil").displayName('Radiant Induction Coil (Ponder)')
	event.create('ponder_radiant_sheet').texture("kubejs:item/ponder_radiant_sheet").displayName('Radiant Sheet (Ponder)')
	event.create('ponder_refined_radiance').texture("kubejs:item/ponder_refined_radiance").displayName('Refined Radiance (Ponder)')

})

onEvent('block.registry', event => {
	
	event.create('red_laser_lamp').model('kubejs:block/red_laser_lamp').notSolid().renderType("translucent").displayName('Laser Lamp (Ponder)')
	event.create('red_laser_lamp_on').model('kubejs:block/red_laser_lamp_on').notSolid().renderType("translucent").displayName('Laser Lamp On (Ponder)')

})
