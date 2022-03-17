;function lastListElement(arr) {; if (arr.length > 0) return arr[arr.length - 1]; else return null;};;;function randomListElement(arr) {; const r = Math.floor(Math.random() * arr.length); return arr[r];};;;function setListElement(arr, index, value) {; arr[index < 0 ? arr.length + index : index] = value; return arr;};;;function deleteListValue(arr, value) {; return arr.filter(function (e) {; return e !== value; });};;;function listContains(arr, value) {; return arr.indexOf(value) >= 0;};;;function subList(arr, index, len) {; return arr.slice().splice(index, len);};;;function listRemoveDuplicates(arr) {; const seen = {}; return arr.filter(function (item) {; return seen.hasOwnProperty(item) ? false : (seen[item] = true); });};;;function listCopy(arr) {; return arr.slice();};;;function listShuffle(arr) {; var j, x, i; for (i = arr.length; i; i--) {; j = Math.floor(Math.random() * i); x = arr[i - 1]; arr[i - 1] = arr[j]; arr[j] = x; }; return arr;};;;function listMerge(source, target) {; return source.concat(target.slice());};;;function listCompare(arr, arrCompare) {; return (JSON.stringify(arr.slice().sort()) === JSON.stringify(arrCompare.slice().sort()));};