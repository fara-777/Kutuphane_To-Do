const BookCard = ({
  book,
  handleModal,
  handleRead,
  setEditBook,
  setShowEditModal,
}) => {
  return (
    <div className="d-flex justify-content-between  shadow align-items-center py-4 px-3 rounded">
      <div>
        <h5 style={{ textDecoration: book.isRead ? "line-through" : "none" }}>
          {book.title}
        </h5>
        <p>{book.date}</p>
      </div>
      <div className="d-flex btn-group">
        <button className="btn btn-danger" onClick={() => handleModal(book.id)}>
          Sil
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            // guncellenecek kitai App.js gonder
            setEditBook(book);
            // modali ac
            setShowEditModal(true);
          }}
        >
          Duzenle
        </button>
        <button className="btn btn-success" onClick={() => handleRead(book)}>
          {book.isRead ? "Okundu" : "Okunmadi"}
        </button>
      </div>
    </div>
  );
};
export default BookCard;
