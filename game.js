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
	if (!player.prestigePoints.gte(presUpgCosts[u]) || player.upgrade['p'+u]) return
	player.upgrade['p'+u] = true
	player.points = player.prestigePoints.sub(presUpgCosts[u])
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
	if (player.upgrade['p1']) temp = temp.mul(3)
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
	var temp = player.points.root(8).max(1)
	return temp
}

function getPresPointGain() {
	var temp = player.points.pow(0.2).sub(25).floor()
	if (player.upgrade[9]) temp = temp.mul(2)
	return temp
}

function prestige() {
	if (!getPresPointGain().gte(1)) return
	player.prestigePoints = player.prestigePoints.add(getPresPointGain())
	player.points = new Decimal(0)
	player.resetTime = new Decimal(0)
	player.upgrade[0] = false
	player.upgrade[1] = false
	player.upgrade[2] = false
	player.upgrade[3] = false
	player.upgrade[4] = false
	player.upgrade[5] = false
	player.upgrade[6] = false
	player.upgrade[7] = false
	player.upgrade[8] = false
	player.upgrade[9] = false
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

	for (i=0; i<10; i++) {
		if (player.upgrade[i]) document.getElementById('upg'+i).className = 'upgBought'
		else document.getElementById('upg'+i).className = 'upg'
	}

	for (i=1; i<2; i++) {
		if (player.upgrade['p' + i]) document.getElementById('presUpg'+i).className = 'presUpgBought'
		else document.getElementById('presUpg'+i).className = 'presUpg'
	}
	
	document.getElementById('prestigedesc').innerHTML = '+ ' + format(getPresPointGain()) + ' Prestige Points'
}

setInterval(gameLoop, 1000/60)