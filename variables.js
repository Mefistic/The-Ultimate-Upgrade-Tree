const upgCosts = {
	0: new Decimal(0),
	1: new Decimal(10),
	2: new Decimal(25),
	3: new Decimal(60),
	4: new Decimal(150),
	5: new Decimal(500),
	6: new Decimal(4200),
	7: new Decimal(1e5),
	8: new Decimal(1e7),
	9: new Decimal(1e9),
}

const presUpgCosts = {
	1: new Decimal(5)
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
if (!player.reincarnationPoints) player.reincarnationPoints = new Decimal(0)

player.resetTime = new Decimal(player.resetTime)
player.points = new Decimal(player.points)
player.prestigePoints = new Decimal(player.prestigePoints)
player.timePoints = new Decimal(player.timePoints)
player.reincarnationPoints = new Decimal(player.reincarnationPoints)

function save() {
	localStorage.setItem('TUUT', JSON.stringify(player))
}

setInterval(save, 1000)