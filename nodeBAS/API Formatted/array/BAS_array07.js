function listRemoveDuplicates(arr) { const seen = {}; return arr.filter(function (item) { return seen.hasOwnProperty(item) ? false : (seen[item] = true); });};