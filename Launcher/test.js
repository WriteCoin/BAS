log('abc');
const filesystem = {
    readfile: function(options) {
        return native('filesystem', 'readfile', JSON.stringify(options))
    }
};