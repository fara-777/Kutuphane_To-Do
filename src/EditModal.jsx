const EditModal = ({
  setShowEditModal,
  setEditBook,
  editBook,
  handleEditBook,
}) => {
  return (
    <div className="confirm-modal">
      <div className="modal-inner">
        <h5>Kitap ismini duzenle</h5>
        <div className="d-flex flex-column gap-3">
          <input
            value={editBook.title}
            type="text"
            className="form-control"
            onChange={(e) =>
              setEditBook({
                ...editBook,
                title: e.target.value,
                date: new Date().toLocaleString(),
              })
            }
          />
          <button
            className="btn btn-warning"
            onClick={() => setShowEditModal(false)}
          >
            Vazgec
          </button>
          <button className="btn btn-success" onClick={handleEditBook}>
            kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
