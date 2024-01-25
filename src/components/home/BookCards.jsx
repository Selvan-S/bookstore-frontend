import { useEffect, useState } from "react";
import BookSingleCard from "./BookSingleCard";

const BookCards = ({ books, user, cardsMode }) => {
  const [isDark, setIsDark] = useState(null);
  useEffect(() => {
    setIsDark(cardsMode);
  }, [cardsMode]);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3">
      {books.map((item) => (
        <BookSingleCard
          key={item._id}
          book={item}
          user={user}
          singleCardMode={isDark}
        />
      ))}
    </div>
  );
};

export default BookCards;
