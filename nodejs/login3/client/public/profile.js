
window.addEventListener("load", () => {
    var getItem = document.cookie;
    document.getElementById('name').innerHTML = 'Welcome back, ' + getItem.slice(9,getItem.length);
})