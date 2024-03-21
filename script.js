document.addEventListener("DOMContentLoaded", function () {
    const belumDibacaTable = document.getElementById("belumdibaca");
    const selesaiDibacaTable = document.getElementById("selesaidibaca");
    const form = document.querySelector("form");
    let books = JSON.parse(localStorage.getItem("books")) || [];
  
    const saveToLocalStorage = () => {
      localStorage.setItem("books", JSON.stringify(books));
    };
  
    const renderBooks = () => {
        belumDibacaTable.querySelector("tbody").innerHTML = "";
        selesaiDibacaTable.querySelector("tbody").innerHTML = "";
      
        books.forEach((book) => {
          const row = `
            <tr data-id="${book.id}">
              <td><span class="text-warning-emphasis fw-semibold">${book.title}</span></td>
              <td>${book.author}</td>
              <td class="fw-semibold">${book.year}</td>
              <td>
                <a href="" class="move-btn" id="move-book">${book.isComplete ? '<i class="bi bi-arrow-counterclockwise text-success me-3 fs-5"></i>' : '<i class="bi bi-check2-circle text-success me-3 fs-5"></i>'}</a>
                <a href="" class="delete-btn" id="delete-book" data-id="${book.id}"><i class="bi bi-trash2 text-danger fs-5"></i></a>
              </td>
            </tr>
          `;
          if (book.isComplete) {
            selesaiDibacaTable.querySelector("tbody").innerHTML += row;
          } else {
            belumDibacaTable.querySelector("tbody").innerHTML += row;
          }
        });
      };
      
    const addBook = (title, author, year, isComplete) => {
      const newBook = {
        id: +new Date(),
        title,
        author,
        year,
        isComplete,
      };
      books.push(newBook);
      saveToLocalStorage();
      renderBooks();
    };

    const moveBook = (id) => {
        const index = books.findIndex((book) => book.id === id);
        if (index !== -1) {
            books[index].isComplete = !books[index].isComplete;
            saveToLocalStorage();
            renderBooks();
        }
    };
    
    document.addEventListener("click", function (e) {
        if (e.target && e.target.matches(".move-btn")) {
            e.preventDefault();
            const id = e.target.parentElement.parentElement.dataset.id;
            moveBook(+id);
        }
    });
    document.addEventListener("click", function (e) {
        const moveBtn = e.target.closest(".move-btn");
        if (moveBtn) {
            e.preventDefault();
            const id = moveBtn.parentElement.parentElement.dataset.id;
            moveBook(+id);
        }
    });
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const title = document.getElementById("judul").value;
      const author = document.getElementById("penulis").value;
      const year = document.getElementById("tahun").value;
      const isComplete = document.getElementById("floatingSelect").value === "2";
  
      if (title && author && year) {
        addBook(title, author, year, isComplete);
        form.reset();
      } else {
        alert("Isi semua kolom");
      }
    });

    const deleteBook = (id) => {
        books = books.filter((book) => book.id !== id);
        saveToLocalStorage();
        renderBooks();
    };
    
    document.addEventListener("click", function (e) {
        if (e.target && e.target.matches(".bi-trash2")) {
            e.preventDefault();
            const id = e.target.parentElement.parentElement.parentElement.dataset.id;
            deleteBook(+id);
        }   
    });
    
    renderBooks();
  });
  
/*search*/
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search');
  const belumDibacaTable = document.getElementById('belumdibaca');
  const selesaiDibacaTable = document.getElementById('selesaidibaca');

  searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();

    searchInTable(belumDibacaTable, searchTerm);
    searchInTable(selesaiDibacaTable, searchTerm);
  });

  function searchInTable(table, term) {
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const title = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
      const author = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
      const year = row.querySelector('td:nth-child(3)').textContent.toLowerCase();

      if (title.includes(term) || author.includes(term) || year.includes(term)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
<<<<<<< HEAD
}); 
=======
}); 
>>>>>>> b4cf409351385d5666775a206537abd87aa29606
