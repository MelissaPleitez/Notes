// variables

const form = document.querySelector('#form')
const notes_container = document.querySelector('#notes_list')
let notes = []
// events

form.addEventListener('submit', add_notes)
document.addEventListener('DOMContentLoaded', ()=>{
    notes = JSON.parse(localStorage.getItem('notes'))
    create_notes()
})
// functions
function add_notes(e){
    e.preventDefault()

    const note = document.querySelector('#note').value

    if(note.trim() === ''){
        alert_message('The input in empty')
        return
    }

 const list_notes= {
    id: Date.now(),
    data: note
 }

  notes = [...notes, list_notes]
   form.reset()
   create_notes()
}


function alert_message(message){
    const alert = document.createElement('h4')
    alert.innerText= message
    alert.classList.add('alert')

    notes_container.appendChild(alert)


    setTimeout(() => {
        alert.remove()
    }, 3000);
}


function create_notes(){
    remove_notes()

  if(notes.length > 0){
    notes.forEach(note =>{
        const remove_btn = document.createElement('i')
        remove_btn.classList.add('btn_remove','bi','bi-trash-fill' )
        // remove_btn.innerText= 'x'
      
        remove_btn.onclick = () =>{
            btn_click(note.id)
        }
      
        const note_element = document.createElement('p')
        note_element.innerText= note.data
        note_element.appendChild(remove_btn)
        notes_container.appendChild(note_element)
      
        })  
      
  }  
 

console.log(notes)
save_locally()

}


function save_locally(){
    localStorage.setItem('notes', JSON.stringify(notes))
}




function remove_notes(){
    while(notes_container.firstChild){
        notes_container.removeChild(notes_container.firstChild)
    }
}


function btn_click(id){

     notes = notes.filter(note => note.id !== id)

     create_notes()
    }
    