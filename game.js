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
	player.points = player.points.sub(upgCosts[u])
}

function buyPresUpg(u) {
	if (!player.prestigePoints.gte(presUpgCosts[u]) || player.upgrade['p' + u]) return
	player.upgrade['p' + u] = true
	player.prestigePoints = player.prestigePoints.sub(presUpgCosts[u])
}

function buyTimeUpg(u) {
	if (!player.timePoints.gte(timeUpgCosts[u]) || player.upgrade['t' + u]) return
	player.upgrade['t' + u] = true
	player.timePoints = player.timePoints.sub(timeUpgCosts[u])
}

function buyReinUpg(u) {
	if (!player.reinPoints.gte(reinUpgCosts[u]) || player.upgrade['r' + u]) return
	player.upgrade['r' + u] = true
	player.reinPoints = player.reinPoints.sub(reinUpgCosts[u])
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
	if (player.upgrade['t6']) temp = temp.mul(8)
	if (player.upgrade['r1']) temp = temp.mul(5)
	if (player.upgrade['r4']) temp = temp.mul(5)
	return temp
}

function getTickspeed() {
	var temp = new Decimal(1)
	if (player.upgrade['t1']) temp = temp.mul(3)
	if (player.upgrade['t2']) temp = temp.mul(getTimeUpg2Effect())
	if (player.upgrade['t3']) temp = temp.mul(3)
	if (player.upgrade['t4']) temp = temp.mul(getTimeUpg4Effect())
	if (player.upgrade['t5']) temp = temp.mul(2)
	if (player.upgrade['r2']) temp = temp.mul(3)
	if (player.upgrade['r4']) temp = temp.mul(5)
	return temp
}

function getUpg2Effect() {
	var temp = player.resetTime.div(5).max(1).min(1000)
	return temp
}
function getUpg4Effect() {
	var temp = player.resetTime.div(7.5).max(1).min(1000)
	return temp
}
function getUpg6Effect() {
	var temp = player.resetTime.div(10).max(1).min(1000)
	return temp
}
function getUpg8Effect() {
	var temp = player.points.root(13).max(1)
	return temp
}
function getUpg11Effect() {
	var temp = player.resetTime.div(12.5).max(1).min(1000)
	return temp
}

function getPresUpg2Effect() {
	var temp = player.points.root(8).max(1)
	return temp
}
function getPresUpg3Effect() {
	var temp = player.prestigePoints.root(2).max(1)
	return temp
}
function getPresUpg4Effect() {
	var temp = player.prestigePoints.root(8).max(1)
	return temp
}

function getTimeUpg2Effect() {
	var temp = new Decimal(player.points.pow(0.05)).max(1)
	return temp
}
function getTimeUpg4Effect() {
	var temp = new Decimal(player.timePoints.pow(0.5)).max(1)
	return temp
}

function getReinPointGain() {
	var temp = new Decimal(player.timePoints.pow(0.2))
	temp = temp.floor()
	return temp
}

function getTimePointGain() {
	var temp = player.prestigePoints.pow(0.2)
	if (player.upgrade['r2']) temp = temp.mul(5)
	if (player.upgrade['r3']) temp = temp.mul(5)
	temp = temp.floor()
	return temp
}

function getPresPointGain() {
	var temp = player.points.pow(0.2)
	if (player.upgrade[9]) temp = temp.mul(2)
	if (player.upgrade[12]) temp = temp.mul(3)
	if (player.upgrade['p4']) temp = temp.mul(getPresUpg4Effect())
	if (player.upgrade['p5']) temp = temp.mul(2)
	if (player.upgrade['p7']) temp = temp.mul(3)
	if (player.upgrade['r1']) temp = temp.mul(5)
	if (player.upgrade['r3']) temp = temp.mul(10)
	temp = temp.floor()
	return temp
}

function prestige() {
	if (!getPresPointGain().gte(1)) return
	player.prestigePoints = player.prestigePoints.add(getPresPointGain())
	player.points = new Decimal(0)
	player.resetTime = new Decimal(0)
	for (i=0; i<upgAmount+1; i++) {
		player.upgrade[i] = false
	}
}

function timeWarp() {
	if (!getTimePointGain().gte(1) || !player.prestigePoints.gte(1e6)) return
	player.timePoints = player.timePoints.add(getTimePointGain())
	player.points = new Decimal(0)
	player.prestigePoints = new Decimal(0)
	player.resetTime = new Decimal(0)
	for (i=0; i<upgAmount+1; i++) {
		player.upgrade[i] = false
	}
	for (i=1; i<presUpgAmount+1; i++) {
		player.upgrade['p'+i] = false
	}
}

function rein() {
	if (!getTimePointGain().gte(1) || !player.timePoints.gte(100)) return
	player.reinPoints = player.reinPoints.add(getReinPointGain())
	player.points = new Decimal(0)
	player.prestigePoints = new Decimal(0)
	player.timePoints = new Decimal(0)
	player.resetTime = new Decimal(0)
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

function updateUI() {
	document.getElementById('points').innerHTML = 'Points:<br>' + format(player.points, 0, 3)
	document.getElementById('presPoints').innerHTML = 'Prestige Points:<br>' + format(player.prestigePoints, 0, 3)
	document.getElementById('timePoints').innerHTML = 'Time Points:<br>' + format(player.timePoints, 0, 3)
	document.getElementById('reinPoints').innerHTML = 'Rein Points:<br>' + format(player.reinPoints, 0, 3)

	if (player.upgrade[2])
		if (getUpg2Effect().eq(1000))
			document.getElementById('upg2desc').innerHTML = 'Capped: x' + format(getUpg2Effect(), 1, 0)
		else document.getElementById('upg2desc').innerHTML = 'Currently: x' + format(getUpg2Effect(), 1, 0)
	else document.getElementById('upg2desc').innerHTML = '25 Points'

	if (player.upgrade[4])
		if (getUpg4Effect().eq(1000))
			document.getElementById('upg4desc').innerHTML = 'Capped: x' + format(getUpg4Effect(), 1, 0)
		else document.getElementById('upg4desc').innerHTML = 'Currently: x' + format(getUpg4Effect(), 1, 0)
	else document.getElementById('upg4desc').innerHTML = '150 Points'

	if (player.upgrade[6])
		if (getUpg6Effect().eq(1000))
			document.getElementById('upg6desc').innerHTML = 'Capped: x' + format(getUpg6Effect(), 1, 0)
		else document.getElementById('upg6desc').innerHTML = 'Currently: x' + format(getUpg6Effect(), 1, 0)
	else document.getElementById('upg6desc').innerHTML = '4,200 Points'

	if (player.upgrade[8])
		document.getElementById('upg8desc').innerHTML = 'Currently: x' + format(getUpg8Effect(), 1, 0)
	else document.getElementById('upg8desc').innerHTML = '1e6 Points'

	if (player.upgrade[11])
		if (getUpg11Effect().eq(1000))
			document.getElementById('upg11desc').innerHTML = 'Capped: x' + format(getUpg11Effect(), 1, 0)
		else document.getElementById('upg11desc').innerHTML = 'Currently: x' + format(getUpg11Effect(), 1, 0)
	else document.getElementById('upg11desc').innerHTML = '1e12 Points'

	if (player.upgrade['p2'])
		document.getElementById('presupg2desc').innerHTML = 'Currently: x' + format(getPresUpg2Effect(), 1, 0)
	else document.getElementById('presupg2desc').innerHTML = '250 Prestige Points'

	if (player.upgrade['p3'])
		document.getElementById('presupg3desc').innerHTML = 'Currently: x' + format(getPresUpg3Effect(), 1, 0)
	else document.getElementById('presupg3desc').innerHTML = '1,000 Prestige Points'

	if (player.upgrade['p4'])
		document.getElementById('presupg4desc').innerHTML = 'Currently: x' + format(getPresUpg4Effect(), 1, 0)
	else document.getElementById('presupg4desc').innerHTML = '10,000 Prestige Points'

	if (player.upgrade['t2'])
		document.getElementById('timeupg2desc').innerHTML = 'Currently: x' + format(getTimeUpg2Effect(), 1, 0)
	else document.getElementById('timeupg2desc').innerHTML = '30 Time Points'

	if (player.upgrade['t4'])
		document.getElementById('timeupg4desc').innerHTML = 'Currently: x' + format(getTimeUpg4Effect(), 1, 0)
	else document.getElementById('timeupg4desc').innerHTML = '100 Time Points'

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
	
	document.getElementById('prestigedesc').innerHTML = '+ ' + format(getPresPointGain()) + ' Prestige Points'

	if (player.prestigePoints.gte(1e6))
		document.getElementById('timewarpdesc').innerHTML = '+ ' + format(getTimePointGain()) + ' Time Points'
	else document.getElementById('timewarpdesc').innerHTML = '1e6 Prestige Points Required'

	if (player.timePoints.gte(100))
		document.getElementById('reindesc').innerHTML = '+ ' + format(getReinPointGain()) + ' Rein Points'
	else document.getElementById('reindesc').innerHTML = '100 Time Points Required'
}

setInterval(gameLoop, 1000/60)