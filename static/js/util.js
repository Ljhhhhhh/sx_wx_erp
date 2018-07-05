function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function getCookie(name)
{
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

  if(arr=document.cookie.match(reg))

    return unescape(arr[2]);
  else
    return null;
};

export function mapChange(lat, lng) {
  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  var x = parseFloat(lng);
  var y = parseFloat(lat);
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  lng = z * Math.cos(theta) + 0.0065;
  lat = z * Math.sin(theta) + 0.006;
  return lat + ',' + lng
}