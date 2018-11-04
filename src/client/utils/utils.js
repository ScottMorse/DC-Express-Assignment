exports.fdToJson =  (fd) => {
    let object = {};
    fd.forEach(function(value, key){
        object[key] = value;
    })
    return JSON.stringify(object);
}

exports.handleLogout = () => {
    fetch('/api/logout',{method:'POST'})
    .then(response => {
        window.location.reload()
    })
}