import { cargaPersonajes } from "./utils.js";

const renderizarCards = async (textoBusqueda) =>{
    const respuesta = await cargaPersonajes();
   
    const textoLimpio= textoBusqueda.toLowerCase();
    console.log(textoLimpio)

     //Traigo el section del index
     const Personaje = document.querySelector(".Personaje");
     Personaje.innerHTML="";
     Personaje.classList.add("personaje");

     let seEncontraronPersonajes = false
   
     for (const item of respuesta) {
       //Card es el que contiene la img, los textos y el boton
       const card = document.createElement("div");
       card.classList.add("card");
   
       //Div de la imagen del personaje
       const divPersoIma = document.createElement("div");
       const imgPersonaje = document.createElement("div");
   
       const img = document.createElement("img");
       img.src = item.displayIcon;
       img.alt = item.displayName;
       imgPersonaje.appendChild(img);
       divPersoIma.classList.add("img");
   
       divPersoIma.addEventListener("click", () => {
         window.location.href = `./detail.html?id=${item.uuid}`;
       });
   
       divPersoIma.appendChild(imgPersonaje);
       card.appendChild(divPersoIma);
      //  Personaje.appendChild(card);
   
       //Div de los textos y botones
       const divPersoTxt = document.createElement("div");
       divPersoTxt.classList.add("texto");
   
       const title = document.createElement("H1");
       title.textContent = item.displayName;
   
       const subTitle = document.createElement("p");
       subTitle.textContent = item.description;
       subTitle.classList.add("p");
   
       divPersoTxt.appendChild(title);
       divPersoTxt.appendChild(subTitle);
       card.appendChild(divPersoTxt);
      //  Personaje.appendChild(card);
   
       //Div del boton y la img
       const divBtnIcon = document.createElement("div");
       divBtnIcon.classList.add("contenedorbtn");
   
       const btn = document.createElement("button");
       btn.src = "#";
       btn.textContent = "See details";
       btn.classList.add("btn");
   
       btn.addEventListener("click", () => {
         window.location.href = `./detail.html?id=${item.uuid}`;
       });
   
       const basurita = document.createElement("img");
       basurita.src = "Resources/trash3.svg";
       basurita.alt = "trash";
       basurita.classList.add("basurita");


        divBtnIcon.appendChild(btn);
        divPersoTxt.appendChild(divBtnIcon);
        card.appendChild(divPersoTxt);
        divBtnIcon.appendChild(basurita);
        divPersoTxt.appendChild(divBtnIcon);
        card.appendChild(divPersoTxt);

        let seEncontraronPersonajes = false

        if( textoLimpio === "" || item.displayName.toLowerCase().includes(textoLimpio)){
          Personaje.appendChild(card);
          seEncontraronPersonajes=true
       
       }
   
       //Se borra el card en específico
       basurita.addEventListener("click", () => {
         card.remove();
       });
     }
     if(!seEncontraronPersonajes){
    const error = document.createElement("img");
    error.src= "Resources/error.png";
    error.alt= "error";
    error.classList.add("ima");

    const mensaje1 = document.createElement("H1");
    mensaje1.textContent = "¡OOPS!";
    mensaje1.classList.add("H1");
    const mensaje2 = document.createElement("p");
    mensaje2.textContent = "No se encontró ningún personaje";
    mensaje2.classList.add("p2");

    Personaje.appendChild(error);
    Personaje.appendChild(mensaje1);
    Personaje.appendChild(mensaje2);
       }
}

const render = async () => {
 await renderizarCards("");

 const barraBusqueda = document.querySelector(".barraBusqueda");
 barraBusqueda.addEventListener ("input" , async (event) =>{
     const textoBusqueda = event.target.value;
     await renderizarCards(textoBusqueda);

 });
 

};
document.addEventListener("DOMContentLoaded", render);