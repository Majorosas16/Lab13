export const cargaPersonajes = async () => {
    const response = await fetch("https://valorant-api.com/v1/agents"); // el fetch para cargar archivos json o apis
    const info = await response.json();
    
    return info.data;
};

export const personajePorId = async (id) => {
    const personaje = await cargaPersonajes();
  
    for (const item of personaje){
      if(item.uuid === id) {
        return item;
      }
    }
  
    throw new Error ("Personaje no encontrado");
}