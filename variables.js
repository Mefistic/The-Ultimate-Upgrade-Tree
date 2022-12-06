const upgAmount = 12

const upgCosts = {
	0: new Decimal(0),
	1: new Decimal(10),
	2: new Decimal(25),
	3: new Decimal(60),
	4: new Decimal(150),
	5: new Decimal(500),
	6: new Decimal(4200),
	7: new Decimal(1e5),
	8: new Decimal(1e6),
	9: new Decimal(1e8),
	10: new Decimal(1e9),
	11: new Decimal(1e11),
	12: new Decimal(1e13),
}

const presUpgAmount = 7

const presUpgCosts = {
	1: new Decimal(10),
	2: new Decimal(25),
	3: new Decimal(100),
	4: new Decimal(5000),
	5: new Decimal(10000),
	6: new Decimal(50000),
	7: new Decimal(1e5),
}

const timeUpgAmount = 6

const timeUpgCosts = {
	1: new Decimal(5),
	2: new Decimal(15),
	3: new Decimal(50),
	4: new Decimal(100),
	5: new Decimal(500),
	6: new Decimal(1000),
}

const reinUpgAmount = 5

const reinUpgCosts = {
	1: new Decimal(1),
	2: new Decimal(3),
	3: new Decimal(5),
	4: new Decimal(10),
	5: new Decimal(25),
}

var player = {}

if (localStorage.getItem('TUUT')) {
	player = JSON.parse(localStorage.getItem('TUUT'))
}

player.lastUpdate = player.lastUpdate ?? Date.now()
player.resetTime = player.resetTime ?? new Decimal(0)

if (!player.upgrade) {
	player.upgrade = {}
	for (i=0; i<201; i++) {
		if (!player.upgrade[i]) {
			player.upgrade[i] = false
		}
	}
}

if (!player.points) player.points = new Decimal(0)
if (!player.prestigePoints) player.prestigePoints = new Decimal(0)
if (!player.timePoints) player.timePoints = new Decimal(0)
if (!player.reinPoints) player.reinPoints = new Decimal(0)

player.resetTime = new Decimal(player.resetTime)
player.points = new Decimal(player.points)
player.prestigePoints = new Decimal(player.prestigePoints)
player.timePoints = new Decimal(player.timePoints)
player.reinPoints = new Decimal(player.reinPoints)

function save() {
	localStorage.setItem('TUUT', JSON.stringify(player))
}

setInterval(save, 1000)