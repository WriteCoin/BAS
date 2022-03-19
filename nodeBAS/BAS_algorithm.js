_call_function(function() {
  for (var i = 0; i < files.length; i++) {
      const file = files[i]
      const path = dir + '/' + file + '/'
      log('Папка: ' + path)
      native_async("filesystem", "search", JSON.stringify({folder: path, mask: "*.js",contains:"",include_folders:true,include_files:true,recursive:false}))!
      const scripts = JSON.parse(_result())["d"]
      log(scripts)
      for (var j = 0; j < scripts.length; j++) {
          const script = scripts[j]
          log('Файл: ' + script)
          const scriptContent = native('filesystem', 'readfile', JSON.stringify({
              value: script,
              base64: false,
              from: 0,
              to: 0
          }))
          eval(scriptContent)
      }
      log()
  }
}, {})