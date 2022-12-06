function gameLoop() {
	var temp = (Date.now() - player.lastUpdate) / 1000
	genLoop(temp)
	updateUI()
	player.lastUpdate = Date.now()
}

function genLoop(t) {
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
	return temp
}

function getUpg2Effect() {
	var temp = player.resetTime.div(10).max(1).min(1000)
	return temp
}
function getUpg4Effect() {
	var temp = player.resetTime.div(15).max(1).min(1000)
	return temp
}
function getUpg6Effect() {
	var temp = player.resetTime.div(20).max(1).min(1000)
	return temp
}
function getUpg8Effect() {
	var temp = player.points.root(20).max(1)
	return temp
}
function getUpg11Effect() {
	var temp = player.resetTime.div(15).max(1).min(1000)
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

function getPresPointGain() {
	var temp = player.points.pow(0.2)
	if (player.upgrade[9]) temp = temp.mul(2)
	if (player.upgrade[12]) temp = temp.mul(3)
	if (player.upgrade['p4']) temp = temp.mul(getPresUpg4Effect())
	if (player.upgrade['p5']) temp = temp.mul(2)
	temp = temp.floor()
	return temp
}

function prestige() {
	if (!getPresPointGain().gte(1)) return
	player.prestigePoints = player.prestigePoints.add(getPresPointGain())
	player.points = new Decimal(0)
	player.resetTime = new Decimal(0)
	for (i=0; i<12; i++) {
		player.upgrade[i] = false
	}
}

function updateUI() {
	document.getElementById('points').innerHTML = 'Points:<br>' + format(player.points, 0, 3)
	document.getElementById('presPoints').innerHTML = 'Prestige Points:<br>' + format(player.prestigePoints, 0, 3)

	if (player.upgrade[2])
		document.getElementById('upg2desc').innerHTML = 'Currently: x' + format(getUpg2Effect(), 1, 0)
	else document.getElementById('upg2desc').innerHTML = '25 Points'

	if (player.upgrade[4])
		document.getElementById('upg4desc').innerHTML = 'Currently: x' + format(getUpg4Effect(), 1, 0)
	else document.getElementById('upg4desc').innerHTML = '150 Points'

	if (player.upgrade[6])
		document.getElementById('upg6desc').innerHTML = 'Currently: x' + format(getUpg6Effect(), 1, 0)
	else document.getElementById('upg6desc').innerHTML = '4,200 Points'

	if (player.upgrade[8])
		document.getElementById('upg8desc').innerHTML = 'Currently: x' + format(getUpg8Effect(), 1, 0)
	else document.getElementById('upg8desc').innerHTML = '1e7 Points'

	if (player.upgrade[11])
		document.getElementById('upg11desc').innerHTML = 'Currently: x' + format(getUpg11Effect(), 1, 0)
	else document.getElementById('upg11desc').innerHTML = '1e11 Points'

	if (player.upgrade['p2'])
		document.getElementById('presupg2desc').innerHTML = 'Currently: x' + format(getPresUpg2Effect(), 1, 0)
	else document.getElementById('presupg2desc').innerHTML = '250 Prestige Points'

	if (player.upgrade['p3'])
		document.getElementById('presupg3desc').innerHTML = 'Currently: x' + format(getPresUpg3Effect(), 1, 0)
	else document.getElementById('presupg3desc').innerHTML = '1,000 Prestige Points'

	if (player.upgrade['p4'])
		document.getElementById('presupg4desc').innerHTML = 'Currently: x' + format(getPresUpg4Effect(), 1, 0)
	else document.getElementById('presupg4desc').innerHTML = '10,000 Prestige Points'

	for (i=0; i<13; i++) {
		if (player.upgrade[i]) document.getElementById('upg'+i).className = 'upgBought'
		else document.getElementById('upg'+i).className = 'upg'
	}

	for (i=1; i<6; i++) {
		if (player.upgrade['p' + i]) document.getElementById('presUpg'+i).className = 'presUpgBought'
		else document.getElementById('presUpg'+i).className = 'presUpg'
	}
	
	document.getElementById('prestigedesc').innerHTML = '+ ' + format(getPresPointGain()) + ' Prestige Points'
}

setInterval(gameLoop, 1000/60)