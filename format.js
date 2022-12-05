function number(x){return new Decimal(x)}
function format(x, d1=0, d2=2)
{
    ret = number(x)
    if (Number(ret.toFixed(d1)) < 1e6) return ret.toFixed(d1).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    if (ret.m.toFixed(d2) == 10) return number(1).toFixed(d2) + 'e' + (ret.e+1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return ret.m.toFixed(d2) + 'e' + ret.e.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}