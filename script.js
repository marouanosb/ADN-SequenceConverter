let inputs = document.getElementsByTagName('input');

for(let element of inputs){
    element.addEventListener('input',() =>
    {
        element.value=element.value.toUpperCase();
        if(element.className == "seq_units"){
            element.setAttribute("maxlength","1");
        }
    })
    element.addEventListener('click',() =>
    {
        element.setSelectionRange(0, element.value.length);
    })
}

function convert() {
    let seq = document.getElementById("seq_full").value;
    console.log(seq);
    seq = seq.split("");
    let changesDom = document.getElementsByClassName("seq_units")
    let changes = [];
    for(element of changesDom){
        changes.push(element.value);
    }
    console.log(changes);
    
    let new_seq = seq.map(s => commute(s,changes));
    new_seq = new_seq.join("");
    show(new_seq);
}

function commute(s, c){
    switch(s){
        case "A" : return c[0];
        case "T" : return c[1];
        case "C" : return c[2];
        case "G" : return c[3];
    }
}

function show(s){
    let new_s = document.getElementById("new_seq");
    new_s.innerHTML = s;
    let div = document.getElementById("new_seq_div");
    if(s != ""){
        div.style.contentVisibility = "visible";
    } else if (s == "") div.style.contentVisibility = "hidden";
}

async function paste(){
    const permission = await navigator.permissions.query({ name: 'clipboard-read' ,  allowWithoutGesture: false });
    let text = await navigator.clipboard.readText();
    text = text.toUpperCase();
    let s = document.getElementById("seq_full");
    s.value = text;
}

function invert(){
    let new_s = document.getElementById("new_seq");
    new_s.innerText = new_s.innerText.split("").reverse().join("");
}

async function copy(){
    let s = document.getElementById("new_seq").innerHTML;
    navigator.clipboard.writeText(s);
    $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );

}
