// priority: 0

// Visit the wiki for more info - https://kubejs.com/

let MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith("#") ? "#" : "") + domain + ":" + id.replace("#", "")
let KJ = (id, x) => MOD("kubejs", id, x)

ServerEvents.recipes(event => {
	madMaths(event)
})

function madMaths(event) {
	let types = ["three", "eight", "plus", "minus", "multiply", "divide"]
	types.forEach(e => {
		event.custom({
			"type": "tconstruct:casting_table",
			"cast": {
				"item": KJ(e + "_cast")
			},
			"fluid": {
				"name": "kubejs:raw_logic",
				"amount": 1
			},
			"result": Item.of(KJ(e)),
			"cooling_time": 10
		})
	})
	
	let melt = (id, out, outAmount) => {
		event.custom({
			"type": "tconstruct:melting",
			"ingredient": { "item": id },
			"result": {
				"fluid": out,
				"amount": outAmount
			},
			"temperature": 200,
			"time": 20
		})
	}
	
	melt(KJ("calculation_mechanism"), KJ("raw_logic"), 30)
	melt(KJ("zero"), KJ("number_0"), 1)
	melt(KJ("one"), KJ("number_1"), 1)
	melt(KJ("two"), KJ("number_2"), 1)
	melt(KJ("three"), KJ("number_3"), 1)
	melt(KJ("four"), KJ("number_4"), 1)
	melt(KJ("five"), KJ("number_5"), 1)
	melt(KJ("six"), KJ("number_6"), 1)
	melt(KJ("seven"), KJ("number_7"), 1)
	melt(KJ("eight"), KJ("number_8"), 1)
	melt(KJ("nine"), KJ("number_9"), 1)
	
	let alloyAmount = 10
	let outAmount = 50
	event.custom({
		"type": "tconstruct:alloy",
		"inputs": [
			{ "name": "kubejs:number_0", "amount": alloyAmount },
			{ "name": "kubejs:number_1", "amount": alloyAmount },
			{ "name": "kubejs:number_2", "amount": alloyAmount },
			{ "name": "kubejs:number_3", "amount": alloyAmount },
			{ "name": "kubejs:number_4", "amount": alloyAmount },
			{ "name": "kubejs:number_5", "amount": alloyAmount },
			{ "name": "kubejs:number_6", "amount": alloyAmount },
			{ "name": "kubejs:number_7", "amount": alloyAmount },
			{ "name": "kubejs:number_8", "amount": alloyAmount },
			{ "name": "kubejs:number_9", "amount": alloyAmount }
		],
		"result": {
			"fluid": "kubejs:matrix",
			"amount": outAmount
		},
		"temperature": 200
	})
	
	event.custom({
		"type": "tconstruct:casting_basin",
		"fluid": {
			"name": "kubejs:matrix",
			"amount": 1000
		},
		"result": Item.of(KJ("computation_matrix")),
		"cooling_time": 20
	})
	
	let nums = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
	let ops = [(a, b) => a + b, (a, b) => a - b, (a, b) => a * b, (a, b) => b == 0 ? "error" : a / b]
	let opNames = ["plus", "minus", "multiply", "divide"]

	for (var a = 0; a < 10; a++) {
		for (var b = 0; b < 10; b++) {
			for (var op = 0; op < ops.length; op++) {

				let result = ops[op](a, b)
				var output;

				if (result == "error")
					output = KJ("missingno")
				else if (result < 0)
					continue
				else if (result > 9)
					continue
				else if (result % 1 != 0)
					continue
				else
					output = KJ(nums[result])

				event.custom({
					"type": "create:mechanical_crafting",
					"pattern": ["AOB"],
					"key": {
						"A": { "item": KJ(nums[a]) },
						"O": { "item": KJ(opNames[op]) },
						"B": { "item": KJ(nums[b]) }
					},
					"result": { "item": output },
					"acceptMirrored": false
				})
			}
		}
	}
}
