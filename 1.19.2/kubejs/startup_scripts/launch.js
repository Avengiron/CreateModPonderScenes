StartupEvents.registry("item", event => {
	
	let number = (name) => {
		let id = name.toLowerCase()
		event.create(id).texture("kubejs:item/" + id).displayName(name)
	}

	number("Zero")
	number("One")
	number("Two")
	number("Three")
	number("Four")
	number("Five")
	number("Six")
	number("Seven")
	number("Eight")
	number("Nine")
	number("Plus")
	number("Minus")
	number("Multiply")
	number("Divide")
	
	event.create("calculation_mechanism").texture("kubejs:item/calculation_mechanism").displayName("Calculation Mechanism").rarity("RARE")
	event.create("missingno").texture("kubejs:item/missingno").displayName("∄")
	event.create("three_cast").texture("kubejs:item/three_cast").displayName("Integer Cast (3)").unstackable()
	event.create("eight_cast").texture("kubejs:item/eight_cast").displayName("Integer Cast (8)").unstackable()
	event.create("plus_cast").texture("kubejs:item/plus_cast").displayName("Operator Cast (+)").unstackable()
	event.create("minus_cast").texture("kubejs:item/minus_cast").displayName("Operator Cast (-)").unstackable()
	event.create("multiply_cast").texture("kubejs:item/multiply_cast").displayName("Operator Cast (x)").unstackable()
	event.create("divide_cast").texture("kubejs:item/divide_cast").displayName("Operator Cast (/)").unstackable()
	event.create("computation_matrix").parentModel("kubejs:item/computation_matrix").displayName("Computation Matrix").rarity("UNCOMMON").unstackable()
})

StartupEvents.registry("block", event => {
	let machine = (name, layer) => {
		let id = name.toLowerCase()
		event.create(id + '_machine')
			.model('kubejs:block/' + id + '_machine')
			.material('lantern')
			.hardness(3.0)
			.displayName(name + ' Machine')
			.notSolid()
			.renderType(layer)
	}

	machine('Andesite', "solid")
	machine('Brass', "translucent")
	machine('Copper', "cutout")
	machine('Zinc', "cutout")
	machine('Enderium', "cutout")
	
	event.create(`substrate_chaos`)
		.material('glass')
		.color(0, "#B200ED")
		.color(1, "#FF66CC")
		.hardness(0.1)
		.box(.25, 0, .25, .75, 14.0 / 16.0, .75, false)
		.model("kubejs:block/chaos_catalyst")
		.displayName("Chaos Catalyst")
		.renderType("cutout")
		.item(e => e.rarity("RARE").color(0, "#B200ED").color(1, "#FF66CC"))
})

StartupEvents.registry("fluid", event => {
	let colors = [0xCBE827, 0xAEE827, 0x68E827, 0x27E86E, 0x27E8B1, 0x27DEE8, 0x27B5E8, 0x2798E8, 0x2778E8, 0x2748E8]
	for(let i = 0; i < 10; i++)
		event.create("number_" + i).displayName("Liquified Logic (" + i + ")").stillTexture("kubejs:fluid/number_still").flowingTexture("kubejs:fluid/number_flow").color(colors[i])
	event.create("matrix").displayName("Liquified Computation Matrix").stillTexture("kubejs:fluid/matrix_still").flowingTexture("kubejs:fluid/matrix_flow").bucketColor(colors[0])
	event.create("raw_logic").displayName("Liquified Logic (Unprocessed)").stillTexture("kubejs:fluid/number_still").flowingTexture("kubejs:fluid/number_flow").color(0xE7FFCB)
})