import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(1);
  const [films, setFilms] = useState("");
  const [people, setPeople] = useState("");

  const fetchFilms = async () => {
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    // console.log(data.results);
    setFilms(data.results);
  };

  const fetchPeople = async () => {
    const response = await fetch("https://swapi.dev/api/people?page=" + count);
    const data = await response.json();
    console.log(data.results);
    setPeople(data.results);
  };

  useEffect(() => {
    fetchFilms();
    fetchPeople();
  }, [count]);

  return (
    <div className="App">
      <h1>Star Wars Films</h1>

      {count > 1 ? (
        <button
          className="btn btn-warning m-5"
          onClick={() => {
            setCount(count - 1);
          }}
        >
          Previous Page of people
        </button>
      ) : (
        ""
      )}

      <button
        className="btn btn-warning m-5"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Next Page of people
      </button>

      <div className="d-flex justify-content-around">
        {people === ""
          ? "waiting"
          : people.map((person, i) => (
              <button
                className="btn btn-primary m-1 mb-5 p-3"
                style={{ width: "300px" }}
                key={i}
              >
                <h5>{person.name}</h5>
              </button>
            ))}
      </div>

      {films === ""
        ? "waiting"
        : films.map((film, i) => (
            <div key={i}>
              <h2>{film.title}</h2>
              <p>{film.opening_crawl}</p>
            </div>
          ))}
    </div>
  );
}

export default App;
