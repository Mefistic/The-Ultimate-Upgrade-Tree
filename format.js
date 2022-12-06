function number(x){return new Decimal(x)}
function format(x, d1=0, d2=2)
{
    ret = number(x)
    if (Number(ret.toFixed(d1)) < 1e6) return ret.toFixed(d1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    if (ret.m.toFixed(d2) == 10) return number(1).toFixed(d2) + 'e' + (ret.e+1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return ret.m.toFixed(d2) + 'e' + ret.e.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function time(duration) {

	if (duration < 1000) {
		return Math.ceil(duration) + 'ms'
	}

	const portions = [];
  
	const msInHour = 1000 * 60 * 60;
	const hours = Math.trunc(duration / msInHour);
	if (hours > 0) {
	  portions.push(hours + 'h');
	  duration = duration - (hours * msInHour);
	}
  
	const msInMinute = 1000 * 60;
	const minutes = Math.trunc(duration / msInMinute);
	if (minutes > 0) {
	  portions.push(minutes + 'm');
	  duration = duration - (minutes * msInMinute);
	}
  
	const seconds = Math.trunc(duration / 1000);
	if (seconds > 0) {
	  portions.push(seconds + 's');
	}
  
	return portions.join(' ');
  }