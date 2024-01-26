const addButton = document.querySelector("#add");

const updateSData =()=>{
    const textareaData = document.querySelectorAll('textarea');
    const notes = [];
    textareaData.forEach((note)=>{
        // console.log(note)
        return notes.push(note.value);
    })
    localStorage.setItem('notes', JSON.stringify(notes));
}
const addNewNotes = (text = '')=>{
    const note = document.createElement("div");
    note.classList.add("note");
    const htmlData = `
    <div class="operation">
            <button class="edit"> <i class="fas fa-edit"></i></button> 
            <button class="delete"> <i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text? '':'hidden'}"></div>
        <textarea class="${text? 'hidden':'' }"></textarea> `;
    note.insertAdjacentHTML('afterbegin',htmlData,);


    // getting refernce
    const editBtn= note.querySelector('.edit');
    const delBtn= note.querySelector('.delete') ;
    const mainDiv= note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    // deleting 
    delBtn.addEventListener('click',()=>{
        note.remove();
        updateSData();
    })

    // toggle using edit button
    textarea.value = text;
    mainDiv.innerHTML = text;
    editBtn.addEventListener('click',()=>{
        mainDiv.classList.toggle("hidden");
        textarea.classList.toggle("hidden");
    })
    textarea.addEventListener('change',(event)=>{
        const value = event.target.value;
        mainDiv.innerHTML = value;
        // console.log(value);
        updateSData();
    })

    document.body.appendChild(note);
}
const notes = JSON.parse(localStorage.getItem('notes'))
if(notes){
    notes.forEach((note)=>addNewNotes(note))
}

addButton.addEventListener('click',()=>addNewNotes())