

function addBook(event) {
    event.preventDefault();
    
   
    const name = document.getElementById("search").value;
    document.getElementById("search").value = ""; 
  
 
    const taken_on = new Date().toISOString();
    
 
    const return_date = new Date();
    return_date.setHours(return_date.getHours() + 1);
    const return_date_ISO = return_date.toISOString();
    
    
    axios
      .post("http://localhost:4000/books/add-book", {
        name: name,
        taken_on: taken_on,
        return_date: return_date_ISO
      })
      .then((res) => {
       
        getBook();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  

function getBook() {
    const ele1 = document.getElementById("notreturn");
    ele1.innerHTML = "";
    const ele2 = document.getElementById("return");
    ele2.innerHTML = "";
  axios
    .get("http://localhost:4000/books/get-books")
    .then((res) => {
      debugger;
      res.data.forEach((book) => {
        if (book.return_status === false) {
          displayNotReturnBooks(book);
        } else {
          displayReturnBooks(book);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function displayNotReturnBooks(book) {
  const ele = document.getElementById("notreturn");


  const card = document.createElement("div");
  card.className = "card";
  card.style.display = "inline-block"; 

  
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";


  const name = document.createElement("h5");
  name.className = "card-title";
  name.textContent = `Book Name: ${book.name}`;

  const takenOn = document.createElement("p");
  takenOn.className = "card-text";
  takenOn.textContent = `Taken On: ${book.taken_on}`;

  const returnDate = document.createElement("p");
  returnDate.className = "card-text";
  returnDate.textContent = `Return Date: ${book.return_date}`;

  const now = new Date();
  const returnDateObj = new Date(book.return_date);
  
 
  const timeDifferenceMs = now - returnDateObj;
  

  const timeDifferenceHours = Math.ceil(timeDifferenceMs / (1000 * 60 * 60));
  
  
  const fine = Math.max(0, timeDifferenceHours) * 10;

  const currentFine = document.createElement("p");
  currentFine.className = "card-text";
  currentFine.textContent = `Current Fine: ${fine}`;

  const returnbtn = document.createElement('button');
  returnbtn.className = "btn btn-success"
  returnbtn.textContent = "Return";
  returnbtn.style.width = "30%";
  returnbtn.style.height = "40px"; 
  returnbtn.style.marginTop = "10px"
  returnbtn.addEventListener('click' ,()=>{
      returnBook(book.id)
  })


  cardBody.appendChild(name);
  cardBody.appendChild(takenOn);
  cardBody.appendChild(returnDate);
  cardBody.appendChild(currentFine);
  cardBody.appendChild(returnbtn);

 
  card.appendChild(cardBody);


  ele.appendChild(card);
}

function displayReturnBooks(book) {
  const ele = document.getElementById("return");


  const card = document.createElement("div");
  card.className = "card";

 
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  
  const name = document.createElement("h5");
  name.className = "card-title";
  name.textContent = `Book Name: ${book.name}`;

  const takenOn = document.createElement("p");
  takenOn.className = "card-text";
  takenOn.textContent = `Taken On: ${book.taken_on}`;

  const returnDate = document.createElement("p");
  returnDate.className = "card-text";
  returnDate.textContent = `Return Date: ${book.return_date}`;

  const currentFine = document.createElement("p");
  currentFine.className = "card-text";
  currentFine.textContent = `Current Fine: ${book.current_fine}`;

  cardBody.appendChild(name);
  cardBody.appendChild(takenOn);
  cardBody.appendChild(returnDate);
  cardBody.appendChild(currentFine);

  
  card.appendChild(cardBody);


  ele.appendChild(card);
}

function returnBook(id) {
    axios.put(`http://localhost:4000/books/update-return-status/${id}`,{

    })
    .then((res) => {
       
        getBook();
      })
      .catch((err) => {
        console.error(err);
      });
}



window.onload = getBook;
