import { useState } from "react";
import BookCard from "./components/BookCard";
import { toast } from "react-toastify";
import EditModal from "./EditModal";

function App() {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBook, setEditBook] = useState(null);

  // modali ele alma
  const handleModal = (id) => {
    // idiyi state aktarma
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = (deletingId) => {
    // silinecek id ye esit olmayan objeleri al ve bir diziye aktar
    const filtred = books.filter((item) => item.id !== deletingId);
    // olusan diziyi state aktar
    setBooks(filtred);
    //bildirim ver
    toast.error("Kitap silindi", { autoClose: 3000 });
  };

  const handleEditBook = () => {
    // degisecek elamanin sirasini bulur
    const index = books.findIndex((book) => book.id == editBook.id);

    // kitaplar dizisinin kopyasini olusturur
    const cloneBooks = [...books];

    // eski kitabi cikar yerine yenisini koy
    cloneBooks.splice(index, 1, editBook);

    // statei guncelle > kopya diziyi state aktar
    setBooks(cloneBooks);

    // modali kapat
    setShowEditModal(false);
  };
  // sil butonuna bsatiginda calisir
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookName) {
      //  input bos ise bildirim verme
      toast.warn("Lutfen kitap ismi giriniz", { autoClose: 2000 });
      // Fonk durdur
      return;
    }

    // kitap icin gerekli bilgilere sahip obje olusturma

    const newBook = {
      id: new Date().getTime(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };
    //olusturulan kitap objesini kitaplar dizisine aktar
    // spread operator onceden eklenenleri muhafaza eder
    setBooks([...books, newBook]);
    // eleman eklenince inputu sifirla
    setBookName("");
    // bildirim ver
    toast.success("Kitap eklendi", { autoClose: 2000 });
  };

  // okundu butonuna bsainca calisir
  // 1- okundu degerini tersine cevir
  // 2- books dizisini bir kopyasini olustur
  // 3- duzenlenecek olan kitabin dizideki sirasini bul > FindIndex ile
  // 4-  eski kitabi kopya diziden cikar yerine guncellenmis versionu koy > Splice ile
  // 5- guncel olan kopya diziyi state aktar
  const handleRead = (book) => {
    const updateBook = { ...book, isRead: !book.isRead };
    const cloneBooks = [...books];
    const index = books.findIndex((item) => item.id === book.id);
    cloneBooks.splice(index, 1, updateBook);
    setBooks(cloneBooks);
  };

  return (
    <div>
      {/* header */}
      <div className="bg-dark text-light px-5 py-2 fs-5 text-center shadow">
        Kutuphane
      </div>
      {/* container */}
      <div className="container ">
        {/* form */}
        <form onSubmit={handleSubmit} className="d-flex gap-3 mt-4">
          <input
            onChange={(e) => setBookName(e.target.value)}
            className="form-control shadow"
            type="text"
            value={bookName}
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>
        <div className="d-flex flex-column gap-3 py-4 text-center">
          {/* eger state iclerisi bos ise ekrana bunu yaz */}
          {books.length === 0 && <h4>Henuz herhangi bir kitap eklenmedi</h4>}
          {/* eger state icersinde elaman varsa onlari listele */}
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              handleModal={handleModal}
              handleRead={handleRead}
              setEditBook={setEditBook}
              setShowEditModal={setShowEditModal}
            />
          ))}
        </div>
      </div>
      {/* modali tanimlama */}
      {showConfirm && (
        <div className="confirm-modal">
          <div className="modal-inner ">
            <h5>Silmek istiyormusunuz ?</h5>
            <button
              className="btn btn-warning"
              onClick={() => setShowConfirm(false)}
            >
              Vazgec
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDelete(deleteId);
                setShowConfirm(false);
              }}
            >
              Onayla
            </button>
          </div>
        </div>
      )}

      {/* duzenleme modali */}
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          setEditBook={setEditBook}
          editBook={editBook}
          handleEditBook={handleEditBook}
        />
      )}
    </div>
  );
}

export default App;
