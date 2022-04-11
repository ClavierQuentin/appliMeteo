//Fonction de création d'éléments HTML
function ultimateHTMLGenerator(typeElement, contenu, tableauClassCss, id, destinationElement) {
    // on crée un élément html donné en paramètre (1er paramètre)
    var ultimateElement = document.createElement(typeElement);
    // on attribut du contenu (paramètre 2) à l'element html précedement fabriqué
    if (contenu != null){
        ultimateElement.textContent = contenu;
    }
    // on souhaite ajouter plusieurs class CSS à l'element html précedement créé
    for (var i = 0; i < tableauClassCss.length; i++) {
        // on ajoute la class css contenu dans le tableau de class css passé en paramètre 3
        ultimateElement.classList.add(tableauClassCss[i]);
    }
    if (id != null){
        ultimateElement.id = id;
    }
    if (destinationElement != null){
    // on fait apparaitre l'element dans celui passé en 4ème paramètre
        destinationElement.appendChild(ultimateElement);
    }
    return ultimateElement;
}

//Fonction pour lire si la touche entrée est utilisée
function validerFormulaire(){
    if (window.event.keyCode == '13') {
        ville = input.value.toLowerCase();
        lancerLaRequete(ville)
    }
}


let WeatherData; // Stockera le JSON
let APIKey = "9588f0efcbaac5b879f57fd3b25ebe26"; // Clé API à transmettre


function lancerLaRequete(para){
    let xhr = new XMLHttpRequest();
    xhr.open("GET","http://api.openweathermap.org/data/2.5/weather?q="+para+"&appid="+APIKey+"&units=metric&lang=fr", true);
    xhr.send();
    xhr.onreadystatechange = function(){ // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){ // Si la requête se termine
        console.log(xhr.responseText);
        WeatherData = JSON.parse(xhr.responseText); // on récupère le résultat de la requête dans l'objet indiqué, et on la convertit en objet JSON
        console.log(WeatherData);
    }
    generate();
    }
}

//On créer le formulaire et le bouton
let myContainer = ultimateHTMLGenerator('div', null, ['container-fluid'], 'cf', document.body);
let inputGroup = ultimateHTMLGenerator('div', null, ['input-group'], null, myContainer);
let input = ultimateHTMLGenerator('input', null, ['form-control'], 'input', inputGroup);
let btn = ultimateHTMLGenerator('button', 'Valider', ['btn', 'btn-success'], 'btn', inputGroup);

let ville = '';

//Gestionnaire d'evennement au clique 
btn.addEventListener('click', () =>{
    ville = input.value.toLowerCase();
    lancerLaRequete(ville);
})

//Création des zones d'affichages des résultats
let premiereLigne = ultimateHTMLGenerator('div', null, ['row'], null, myContainer);
let col1 = ultimateHTMLGenerator('div', null, ['col-3'], null, premiereLigne);
let colResultats = ultimateHTMLGenerator('div', null, ['col-6'], null, premiereLigne);
let col3 = ultimateHTMLGenerator('div', null, ['col-3'], null, premiereLigne);

//Fonction pour rechercher les résultats
 function generate(){
     //On réucpère le format en TimeStamp des heures du soleil, multiplie par 1000 pour passer en millisecondes
     let sunRise = WeatherData.sys.sunrise;
     let date =  new Date(sunRise * 1000);

     let sunSet = WeatherData.sys.sunset;
     let date2 = new Date(sunSet * 1000);

     colResultats.innerHTML = "";
     col1.innerHTML ='';
    let titre = ultimateHTMLGenerator('h1', 'Ville : '+ WeatherData.name, [], null, colResultats);
    let tempActuel = ultimateHTMLGenerator('p', 'Température actuelle : ' + WeatherData.main.temp + "°C", [], null, colResultats);
    let tempMin = ultimateHTMLGenerator('p', 'Minimale : ' + WeatherData.main.temp_min + "°C", [], null, colResultats);
    let tempMax = ultimateHTMLGenerator('p', 'Maximale : ' + WeatherData.main.temp_max + "°C", [], null, colResultats);
    let tempRessentie = ultimateHTMLGenerator('p', "Ressenti : " + WeatherData.main.feels_like + "°C", [], null, colResultats);
    let vitesseVent = ultimateHTMLGenerator('p','Vitesse du vent : ' + WeatherData.wind.speed + 'm/s', [], null, colResultats);
    let leverSoleil = ultimateHTMLGenerator('p','Lever du soleil : ' + date.getHours()+ 'h'+ date.getMinutes(), [], null, colResultats);
    let coicherSoleil = ultimateHTMLGenerator('p','Coucher du soleil : ' + date2.getHours()+ 'h'+ date2.getMinutes(), [], null, colResultats);

    if(WeatherData.weather[0].main === 'Clear'){
        let img = document.createElement('img');
        img.src = 'clear-day.svg';
        img.style.height = '250px';
        col1.appendChild(img);
    }
    if(WeatherData.weather[0].main === 'Clouds'){
        let img = document.createElement('img');
        img.src = 'overcast.svg';
        img.style.height = '250px';
        col1.appendChild(img);
    }
    if(WeatherData.weather[0].main === 'Mist'){
        let img = document.createElement('img');
        img.src = "mist.svg";
        img.style.height = '250px';
        col1.appendChild(img);
    }
    if(WeatherData.weather[0].main === 'Snow'){
        let img = document.createElement('img');
        img.src = "snow.svg";
        img.style.height = '250px';
        col1.appendChild(img);
    }
 }