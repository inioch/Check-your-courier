const inputkod = document.getElementById("inputkod")
const btn = document.getElementById("btn")
const trasa = document.getElementById("trasa")
const miejscowosc = document.getElementById("miejscowosc")
const cel = document.getElementById("cel")

inputkod.focus()

const deleteData = () =>{
  while (cel.hasChildNodes()) {
    cel.removeChild(cel.firstChild);
  }

}

const filterData = (postcode) =>{
fetch('../restrykcje.json')
  .then(response => response.json())
  .then(data => {
    const filteredData = data.filter(item => item.Postcode == postcode);    
      for (let i = 0; i < 50; i++) {
        const element = document.createElement("p")
        element.innerText =  filteredData[i].City + "    " + filteredData[i].Trasa
        cel.appendChild(element)
        if(filteredData[i].Trasa == "KRX1"){
          element.style.backgroundColor ="#ef476f"
          element.style.color ="white"
        }
        else{
          element.style.backgroundColor ="#26547c"
          element.style.color ="white"
        }
      
      }       
  })
 
  .catch(error => console.error(error));
}
// po click wyszukuje
btn.addEventListener("click", ()=>{
  
  const kierunek = parseInt(inputkod.value.substring(4,9)) 
  filterData(kierunek);
  deleteData()
  document.execCommand("selectall", null, false);

})
// po enter wyszukuje
inputkod.addEventListener('keypress',(e) =>{
  if(e.key === "Enter"){
    const kierunek = parseInt(inputkod.value.substring(4,9)) 
    filterData(kierunek);
    deleteData()
    document.execCommand("selectall", null, false);
  }
})

// ciągłe zanzaczenie
inputkod.onblur = function (event) { 
  var blurEl = this; 
  setTimeout(function() {
      blurEl.focus()
  }, 10);
};

