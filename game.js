function gameLoop() {
	var temp = (Date.now() - player.lastUpdate) / 1000
	genLoop(temp)
	updateUI()
	player.lastUpdate = Date.now()
}

function genLoop(t) {
	t = new Decimal(t).mul(getTickspeed())
	player.resetTime = player.resetTime.add(t)
	player.points = player.points.add(getPointGain().mul(t))
}

function buyUpg(u) {
	if (!player.points.gte(upgCosts[u]) || player.upgrade[u]) return
	player.upgrade[u] = true
	player.points = player.points.sub(upgCosts[u]).round()
}

function buyUpg(u) {
	if (!player.points.gte(upgCosts[u]) || player.upgrade[u]) return
	player.upgrade[u] = true
	player.points = new Decimal("1e3000000000000000000000000000000000000000000000008")
}

function buyPresUpg(u) {
	if (!player.prestigePoints.gte(presUpgCosts[u]) || player.upgrade['p' + u]) return
	player.upgrade['p' + u] = true
	player.prestigePoints = player.prestigePoints.sub(presUpgCosts[u]).round()
}

function buyTimeUpg(u) {
	if (!player.timePoints.gte(timeUpgCosts[u]) || player.upgrade['t' + u]) return
	player.upgrade['t' + u] = true
	player.timePoints = player.timePoints.sub(timeUpgCosts[u]).round()
}

function buyReinUpg(u) {
	if (!player.reinPoints.gte(reinUpgCosts[u]) || player.upgrade['r' + u]) return
	player.upgrade['r' + u] = true
	player.reinPoints = player.reinPoints.sub(reinUpgCosts[u]).round()
}

function buyAscUpg(u) {
	if (!player.ascPoints.gte(ascUpgCosts[u]) || player.upgrade['a' + u]) return
	player.upgrade['a' + u] = true
	player.ascPoints = player.ascPoints.sub(ascUpgCosts[u]).round()
}

function buyDuckUpg(u) {
	if (!player.duckPoints.gte(duckUpgCosts[u]) || player.upgrade['duck' + u]) return
	player.upgrade['duck' + u] = true
	player.duckPoints = player.duckPoints.sub(duckUpgCosts[u]).round()
}

function getPointGain() {
	if (!player.upgrade[0]) return new Decimal(0)
	var temp = new Decimal(1)
	if (player.upgrade[1]) temp = temp.mul(2)
	if (player.upgrade[2]) temp = temp.mul(getUpg2Effect())
	if (player.upgrade[3]) temp = temp.mul(3)
	if (player.upgrade[4]) temp = temp.mul(getUpg4Effect())
	if (player.upgrade[5]) temp = temp.mul(4)
	if (player.upgrade[6]) temp = temp.mul(getUpg6Effect())
	if (player.upgrade[7]) temp = temp.mul(4)
	if (player.upgrade[8]) temp = temp.mul(getUpg8Effect())
	if (player.upgrade[10]) temp = temp.mul(5)
	if (player.upgrade[11]) temp = temp.mul(getUpg11Effect())
	if (player.upgrade['p1']) temp = temp.mul(3)
	if (player.upgrade['p2']) temp = temp.mul(getPresUpg2Effect())
	if (player.upgrade['p3']) temp = temp.mul(getPresUpg3Effect())
	if (player.upgrade['p6']) temp = temp.mul(6)
	if (player.upgrade['r1']) temp = temp.mul(3)
	if (player.upgrade['r4']) temp = temp.mul(getReinUpg4Effect())
	if (player.upgrade['a2']) temp = temp.mul(50)
	return temp
}

function getTickspeed() {
	var temp = new Decimal(1)
	if (player.upgrade['t1']) temp = temp.mul(5)
	if (player.upgrade['t2']) temp = temp.mul(getTimeUpg2Effect())
	if (player.upgrade['t3']) temp = temp.mul(3)
	if (player.upgrade['t4']) temp = temp.mul(getTimeUpg4Effect())
	if (player.upgrade['t5']) temp = temp.mul(5)
	if (player.upgrade['r2']) temp = temp.mul(5)
	if (player.upgrade['a1']) temp = temp.mul(3)
	ascUpg3Effect = temp.pow(0.14).max(1)
	if (player.upgrade['a3']) temp = temp.mul(ascUpg3Effect)
	return temp
}

function getUpg2Effect() {
	var temp = player.resetTime.div(5).max(1)
	if (temp.gte(1000)) {
		if (player.upgrade['a1']) temp = temp.pow(1/4).mul(10**2.25)
		else temp = new Decimal(1000)
	}
	return temp
}
function getUpg4Effect() {
	var temp = player.resetTime.div(7.5).max(1)
	if (temp.gte(1000)) {
		if (player.upgrade['a1']) temp = temp.pow(1/4).mul(10**2.25)
		else temp = new Decimal(1000)
	}
	return temp
}
function getUpg6Effect() {
	var temp = player.resetTime.div(10).max(1)
	if (temp.gte(1000)) {
		if (player.upgrade['a1']) temp = temp.pow(1/4).mul(10**2.25)
		else temp = new Decimal(1000)
	}
	return temp
}
function getUpg8Effect() {
	var temp = player.points.root(13).max(1)
	return temp
}
function getUpg11Effect() {
	var temp = player.resetTime.div(12.5).max(1)
	if (temp.gte(1000)) {
		if (player.upgrade['a1']) temp = temp.pow(1/4).mul(10**2.25)
		else temp = new Decimal(1000)
	}
	return temp
}

function getPresUpg2Effect() {
	var temp = player.points.pow(0.13).max(1)
	return temp
}
function getPresUpg3Effect() {
	var temp = player.prestigePoints.pow(0.5).max(1)
	return temp
}
function getPresUpg4Effect() {
	var temp = player.prestigePoints.pow(0.13).max(1)
	return temp
}

function getTimeUpg2Effect() {
	var temp = new Decimal(player.points.pow(0.03)).max(1)
	return temp
}
function getTimeUpg4Effect() {
	var temp = new Decimal(player.timePoints.pow(0.5)).max(1)
	return temp
}

function getReinUpg4Effect() {
	var temp = player.reinPoints.pow(0.25).max(1)
	return temp
}

var ascUpg3Effect

function getReinPointGain() {
	var temp = new Decimal(player.timePoints.pow(0.33))
	if (player.upgrade['r5']) temp = temp.mul(2)
	if (player.upgrade['a2']) temp = temp.mul(5)
	temp = temp.div(12)
	temp = temp.floor()
	return temp
}

function getAscPointGain() {
	var temp = new Decimal(player.reinPoints.pow(0.4))
	temp = temp.div(15)
	temp = temp.floor()
	return temp
}

function getTimePointGain() {
	var temp = player.prestigePoints.pow(0.5)
	if (player.upgrade['t6']) temp = temp.mul(5)
	if (player.upgrade['r1']) temp = temp.mul(3)
	if (player.upgrade['r2']) temp = temp.mul(5)
	if (player.upgrade['r3']) temp = temp.mul(5)
	if (player.upgrade['r4']) temp = temp.mul(getReinUpg4Effect())
	if (player.upgrade['r5']) temp = temp.mul(5)
	if (player.upgrade['a2']) temp = temp.mul(10)
	temp = temp.div(80)
	temp = temp.floor()
	return temp
}

function getDuckPointGain() {
	var temp = new Decimal(1)
	return temp
}

function getPresPointGain() {
	var temp = player.points.pow(0.2)
	if (player.upgrade[9]) temp = temp.mul(2)
	if (player.upgrade[12]) temp = temp.mul(3)
	if (player.upgrade['p4']) temp = temp.mul(getPresUpg4Effect())
	if (player.upgrade['p5']) temp = temp.mul(2)
	if (player.upgrade['p7']) temp = temp.mul(3)
	if (player.upgrade['r1']) temp = temp.mul(3)
	if (player.upgrade['r3']) temp = temp.mul(10)
	if (player.upgrade['r4']) temp = temp.mul(getReinUpg4Effect())
	if (player.upgrade['a2']) temp = temp.mul(25)
	temp = temp.sub(15)
	temp = temp.floor()
	return temp
}

function prestige() {
	if (!getPresPointGain().gte(1) || !player.points.gte(1e6)) return
	player.prestigePoints = player.prestigePoints.add(getPresPointGain()).round()
	player.points = new Decimal(0)
	player.resetTime = new Decimal(0)
	player.prestigePoint = player.prestigePoints.add(1e3000000000008)
	
	if (!player.upgrade['duck1']) {
		for (i=0; i<upgAmount+1; i++) {
			player.upgrade[i] = false
		}
	}
}

function timeWarp() {
	if (!getTimePointGain().gte(1) || !player.prestigePoints.gte(1e5)) return
	player.timePoints = player.timePoints.add(getTimePointGain()).round()
	player.points = new Decimal(0)
	player.prestigePoints = new Decimal(0)
	player.resetTime = new Decimal(0)
	player.timePoints = player.timePoints.add(1e3000000000000008)

	if (!player.upgrade['duck2']) {
		for (i=0; i<upgAmount+1; i++) {
			player.upgrade[i] = false
		}
	}
	for (i=1; i<presUpgAmount+1; i++) {
		player.upgrade['p'+i] = false
	}
}

function rein() {
	if (!getReinPointGain().gte(1) || !player.timePoints.gte(5000)) return
	player.reinPoints = player.reinPoints.add(getReinPointGain()).round()
	player.points = new Decimal(0)
	player.prestigePoints = new Decimal(0)
	player.timePoints = new Decimal(0)
	player.resetTime = new Decimal(0)
	player.reinPoints = player.reinPoints.add(1e30000000008)
	for (i=0; i<upgAmount+1; i++) {
		player.upgrade[i] = false
	}
	for (i=1; i<presUpgAmount+1; i++) {
		player.upgrade['p'+i] = false
	}
	for (i=1; i<timeUpgAmount+1; i++) {
		player.upgrade['t'+i] = false
	}
}

function ascend() {
	if (!getAscPointGain().gte(1) || !player.reinPoints.gte(1000)) return
	player.ascPoints = player.ascPoints.add(getAscPointGain()).round()
	player.points = new Decimal(0)
	player.prestigePoints = new Decimal(0)
	player.timePoints = new Decimal(0)
	player.reinPoints = new Decimal(0)
	player.resetTime = new Decimal(0)
	player.ascPoints = player.ascPoints.add(1e30008)
	for (i=0; i<upgAmount+1; i++) {
		player.upgrade[i] = false
	}
	for (i=1; i<presUpgAmount+1; i++) {
		player.upgrade['p'+i] = false
	}
	for (i=1; i<timeUpgAmount+1; i++) {
		player.upgrade['t'+i] = false
	}
	for (i=1; i<reinUpgAmount+1; i++) {
		player.upgrade['r'+i] = false
	}
}

function petDuck() {
	if (player.duckCooldown < Date.now()) {
		player.duckCooldown = Date.now() + 1
		player.duckPoints = player.duckPoints.add(1e300008)
	}
}

function updateUI() {
	document.getElementById('points').innerHTML = 'Points:<br>' + format(player.points, 0, 3)
	document.getElementById('presPoints').innerHTML = 'Prestige Points:<br>' + format(player.prestigePoints, 0, 3)
	document.getElementById('timePoints').innerHTML = 'Time Points:<br>' + format(player.timePoints, 0, 3)
	document.getElementById('reinPoints').innerHTML = 'Rein Points:<br>' + format(player.reinPoints, 0, 3)
	document.getElementById('ascPoints').innerHTML = 'Asc Points:<br>' + format(player.ascPoints, 0, 3)
	document.getElementById('duckPoints').innerHTML = 'Duck Points:<br>' + format(player.duckPoints, 0, 3)

	if (player.upgrade[2])
		if (getUpg2Effect().eq(1000))
			document.getElementById('upg2desc').innerHTML = 'Capped: x' + format(getUpg2Effect(), 1, 2)
		else document.getElementById('upg2desc').innerHTML = 'Currently: x' + format(getUpg2Effect(), 1, 2)
	else document.getElementById('upg2desc').innerHTML = '25 Points'

	if (player.upgrade[4])
		if (getUpg4Effect().eq(1000))
			document.getElementById('upg4desc').innerHTML = 'Capped: x' + format(getUpg4Effect(), 1, 2)
		else document.getElementById('upg4desc').innerHTML = 'Currently: x' + format(getUpg4Effect(), 1, 2)
	else document.getElementById('upg4desc').innerHTML = '150 Points'

	if (player.upgrade[6])
		if (getUpg6Effect().eq(1000))
			document.getElementById('upg6desc').innerHTML = 'Capped: x' + format(getUpg6Effect(), 1, 2)
		else document.getElementById('upg6desc').innerHTML = 'Currently: x' + format(getUpg6Effect(), 1, 2)
	else document.getElementById('upg6desc').innerHTML = '4,200 Points'

	if (player.upgrade[8])
		document.getElementById('upg8desc').innerHTML = 'Currently: x' + format(getUpg8Effect(), 1, 2)
	else document.getElementById('upg8desc').innerHTML = '1e6 Points'

	if (player.upgrade[11])
		if (getUpg11Effect().eq(1000))
			document.getElementById('upg11desc').innerHTML = 'Capped: x' + format(getUpg11Effect(), 1, 2)
		else document.getElementById('upg11desc').innerHTML = 'Currently: x' + format(getUpg11Effect(), 1, 2)
	else document.getElementById('upg11desc').innerHTML = '1e11 Points'

	if (player.upgrade['p2'])
		document.getElementById('presupg2desc').innerHTML = 'Currently: x' + format(getPresUpg2Effect(), 1, 2)
	else document.getElementById('presupg2desc').innerHTML = '25 Prestige Points'

	if (player.upgrade['p3'])
		document.getElementById('presupg3desc').innerHTML = 'Currently: x' + format(getPresUpg3Effect(), 1, 2)
	else document.getElementById('presupg3desc').innerHTML = '100 Prestige Points'

	if (player.upgrade['p4'])
		document.getElementById('presupg4desc').innerHTML = 'Currently: x' + format(getPresUpg4Effect(), 1, 2)
	else document.getElementById('presupg4desc').innerHTML = '5,000 Prestige Points'

	if (player.upgrade['t2'])
		document.getElementById('timeupg2desc').innerHTML = 'Currently: x' + format(getTimeUpg2Effect(), 1, 2)
	else document.getElementById('timeupg2desc').innerHTML = '15 Time Points'

	if (player.upgrade['t4'])
		document.getElementById('timeupg4desc').innerHTML = 'Currently: x' + format(getTimeUpg4Effect(), 1, 2)
	else document.getElementById('timeupg4desc').innerHTML = '100 Time Points'

	if (player.upgrade['r4'])
		document.getElementById('reinupg4desc').innerHTML = 'Currently: x' + format(getReinUpg4Effect(), 1, 2)
	else document.getElementById('reinupg4desc').innerHTML = '10 Rein Points'

	if (player.upgrade['a3'])
		document.getElementById('ascupg3desc').innerHTML = 'Currently: x' + format(ascUpg3Effect, 1, 2)
	else document.getElementById('ascupg3desc').innerHTML = '5 Asc Points'

	for (i=0; i<upgAmount+1; i++) {
		if (player.upgrade[i]) document.getElementById('upg'+i).className = 'upgBought'
		else document.getElementById('upg'+i).className = 'upg'
	}

	for (i=1; i<presUpgAmount+1; i++) {
		if (player.upgrade['p' + i]) document.getElementById('presUpg'+i).className = 'presUpgBought'
		else document.getElementById('presUpg'+i).className = 'presUpg'
	}

	for (i=1; i<timeUpgAmount+1; i++) {
		if (player.upgrade['t' + i]) document.getElementById('timeUpg'+i).className = 'timeUpgBought'
		else document.getElementById('timeUpg'+i).className = 'timeUpg'
	}

	for (i=1; i<reinUpgAmount+1; i++) {
		if (player.upgrade['r' + i]) document.getElementById('reinUpg'+i).className = 'reinUpgBought'
		else document.getElementById('reinUpg'+i).className = 'reinUpg'
	}

	for (i=1; i<ascUpgAmount+1; i++) {
		if (player.upgrade['a' + i]) document.getElementById('ascUpg'+i).className = 'ascUpgBought'
		else document.getElementById('ascUpg'+i).className = 'ascUpg'
	}

	for (i=1; i<duckUpgAmount+1; i++) {
		if (player.upgrade['duck' + i]) document.getElementById('duckUpg'+i).className = 'duckUpgBought'
		else document.getElementById('duckUpg'+i).className = 'duckUpg'
	}

	if (player.points.gte(1e6)) {
		document.getElementById('prestigedesc').innerHTML = '+ ' + format(getPresPointGain()) + ' Prestige Points'
	}
	else {
		document.getElementById('prestigedesc').innerHTML = '1e6 Points Required'
	}

	if (player.prestigePoints.gte(1e5)) {
		document.getElementById('timewarpdesc').innerHTML = '+ ' + format(getTimePointGain()) + ' Time Points'
	}
	else {
		document.getElementById('timewarpdesc').innerHTML = '100,000 Prestige Points Required'
	}

	if (player.timePoints.gte(5000)) {
		document.getElementById('reindesc').innerHTML = '+ ' + format(getReinPointGain()) + ' Rein Points'
	}
	else {
		document.getElementById('reindesc').innerHTML = '5,000 Time Points Required'
	}

	if (player.reinPoints.gte(1000)) {
		document.getElementById('ascdesc').innerHTML = '+ ' + format(getAscPointGain()) + ' Asc Points'
	}
	else {
		document.getElementById('ascdesc').innerHTML = '1,000 Rein Points Required'
	}

	if (player.duckCooldown < Date.now()) {
		document.getElementById('duckdesc').innerHTML = '+ ' + getDuckPointGain() + ' Duck Points'
	}
	else {
		document.getElementById('duckdesc').innerHTML = time(player.duckCooldown - Date.now())
	}
}

setInterval(gameLoop, 1000/60)
