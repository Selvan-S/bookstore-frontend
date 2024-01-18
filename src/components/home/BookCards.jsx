import BookSingleCard from "./BookSingleCard";

const BookCards = ({ books, user }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3">
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item} user={user} />
      ))}
    </div>
  );
};

export default BookCards;
