function BAS_write_file(filepath, data, isLn, isAppend, isBase64) { native("filesystem", "writefile", JSON.stringify({ path: filepath, value: data.toString() + "\r" + (isLn ? "\n" : ""), base64: isBase64, append: isAppend; }));};