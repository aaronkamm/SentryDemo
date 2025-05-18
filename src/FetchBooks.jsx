import { useState, useEffect, useCallback } from 'react';
import * as Sentry from '@sentry/react';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [avgRating, setAvgRating] = useState(0);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        'https://example-data.draftbit.com/books?_limit=4000'
      );
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Fetch books error:', error);
    }
  };
  // const filteredBooks = books
  //   .filter((book) => (filter === 'all' ? true : book.format.includes(filter)))
  //   .sort((a, b) => {
  //     if (sortBy === 'title') return a.title.localeCompare(b.title);
  //     return (a.rating || 0) - (b.rating || 0);
  //   });

  const computeAverageRating = useCallback(() => {
    try {
      let sum = 0;
      for (let i = 0; i < filteredBooks.length; i++) {
        for (let j = 0; j < 1000; j++) {
          sum += Number(filteredBooks[i].rating) || 0;
        }
      }
      const avg = books.length ? sum / (books.length * 1000) : 0;
      console.log(books, 'BOOKS', sum, 'SUM');
      setAvgRating(avg);
    } catch (error) {
      Sentry.captureException(error);
    }
  }, [books, filteredBooks]);
  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (typeof computeAverageRating === 'function') {
      computeAverageRating();
    } else {
      console.error(
        'computeAveragePrice is not a function:',
        computeAverageRating
      );
    }
  }, [books, computeAverageRating, filter]);

  useEffect(() => {
    const updatedFilteredBooks = books
      .filter((book) =>
        filter === 'all' ? true : book.format?.includes(filter)
      )
      .sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return (a.rating || 0) - (b.rating || 0);
      });
    setFilteredBooks(updatedFilteredBooks);
  }, [filter, books, sortBy]);

  return (
    <div className="book-list">
      <h2>Book List Demo</h2>
      <div>
        <label>
          Filter by Format:
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="Paperback">Paperback</option>
            <option value="Hardcover">Hardcover</option>
          </select>
        </label>
        <label>
          Sort by:
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="title">Title</option>
            <option value="rating">Rating</option>
          </select>
        </label>
      </div>
      <p>Average Price: {avgRating.toFixed(2)}</p>
      <div style={{ height: '500px', overflow: 'auto' }}>
        {filteredBooks.map((book, index) => (
          <div className="book-item" key={book.id || index}>
            <h3>{book.title}</h3>
            <p>Genre: {book.genre}</p>
            <p>Rating: {book.rating || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sentry.withProfiler(BookList, { name: 'BookList' });
