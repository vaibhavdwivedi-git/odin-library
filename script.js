
const read = 'linear-gradient(135deg, rgba(24, 77, 104, 0.8) 0%, rgba(87, 202, 133, 0.8) 100%)';
const unread = 'linear-gradient(315deg, #90d5ec 0%, #fc575e 74%)';

var number = 0;

var overlay = document.getElementById('overlay');

var add_book = document.getElementById('add-book');

document.getElementById('submit_info').addEventListener('click', addBookToLibrary);

function Book(title, author, pages, language, published_date, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.language = language;
  this.published_date = published_date;
  this.status = status;
}

primary_book = new Book('The Subtle Art of Not Giving a F*ck', 'Mark Manson', 224,'English','13-09-2016','unchecked')
let myLibrary = [primary_book];
function addBookToLibrary() {
  var title = document.getElementById('title').value;
  var author = document.getElementById('author').value;
  var pages = document.getElementById('pages').value;
  var language = document.getElementById('language').value;
  var published_date = document.getElementById('published_date').value;
  var status = (document.getElementById('status').checked==true) ? 'checked' : 'unchecked';
  temp = new Book(title, author, pages, language, published_date, status);
  myLibrary.push(temp);
  number++;
  displayCard(temp);
  reset();
}


function showBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    displayCard(myLibrary[i]);

  }
}

function color(status) {
  if (status == 'checked') {
    return read;
  }
  return unread;
}

function displayCard(Book) {
  const self = document.querySelector('#book-self');
  const card = document.createElement('div');
  card.setAttribute('id', `Book-${number}`)
  card.classList.add('book-card');
  card.style.background = (Book.status == 'checked') ? read : unread;
  card.innerHTML = `<button id="Book-${number}-close" class="close-btn">&times</button><p style="font-size:24px;font-weight:500;">${Book.title}</p><p>By: ${Book.author}</p><p>Number of pages: ${Book.pages}</p><p>Language: ${Book.language}</p><p>Published: ${Book.published_date}</p><p class="marker">Mark as read :<label class="switch"><input type="checkbox" id="check-${number}" ${Book.status}><span class="slider round"></span></label></p>`
  self.appendChild(card);
  
  document.querySelector(`#Book-${number}-close`).addEventListener('click', (e) => {
    document.getElementById(`Book-${e.target.id.split('-')[1]}`).style.display = 'none';
    const index = myLibrary.indexOf(Book);
    myLibrary.splice(index, 1);
  });

  document.getElementById(`check-${number}`).addEventListener('click',(e)=>{
    if(e.target.checked==true){
      card.style.background = read;
    }
    if(e.target.checked==false){
      card.style.background = unread;
    }
  });

  overlay.style.display = "none";
}



window.onclick = function (event) {
  if (event.target == overlay) {
    overlay.style.display = "none";
  }
}

function reset(){
  const properties = ['title', 'author', 'pages', 'language', 'published_date'];
  for(let i=0;i<5;i++){
    document.getElementById(properties[i]).value="";
  }
  document.getElementById('status').checked = false;
}


add_book.onclick = () => { overlay.style.display = 'flex' };

showBooks();


