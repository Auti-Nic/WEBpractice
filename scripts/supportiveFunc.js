function createTag(tagName, className) {
    var elem = document.createElement(tagName);
    if(className){
        elem.className = className;
    }else {
        return elem;
    }
    return elem;
}
function createP(title, content) {
    var p = document.createElement("p");
    var b = document.createElement("b");
    var bText = document.createTextNode(title);
    var pText = document.createTextNode(content);
    var span = document.createElement("span");
    b.appendChild(bText);
    span.appendChild(pText);
    p.appendChild(b);
    p.appendChild(span);
    return p;
}

function addClass(element, value) {
    if (!element.className){
        element.className = vlaue;
    }else{
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function'){
        window.onload = func;
    }else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}