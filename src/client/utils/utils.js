exports.fdToJson =  (fd) => {
    let object = {};
    fd.forEach(function(value, key){
        object[key] = value;
    })
    return JSON.stringify(object);
}