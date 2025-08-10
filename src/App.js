import React, { useState } from "react";
import "./App.css";


export default function App() {
  const [dogImage, setDogImage] = useState("");
  const [catImage, setCatImage] = useState("");
  const [joke, setJoke] = useState({ setup: "", punchline: ""});
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDogImage = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await res.json();
      setDogImage(data.message);
    } catch (err) {
      alert("Error fetching dog image.");
    }
    setLoading(false);
  };

  const fetchCatImage = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.thecatapi.com/v1/images/search");  
      const data = await res.json();
      setCatImage(data[0].url);
    } catch (err) {
      alert("Error fetching cat image.");
    }
    setLoading(false);
  };

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");
      const data = await res.json();
      setJoke({ setup: data.setup, punchline: data.punchline });
    } catch (err) {
      alert("Error fetching joke.");
    }
    setLoading(false);
  };

  const handleClick = () => {
    if (mode === "Dog") fetchDogImage();
    else if (mode === "Cat") fetchCatImage();
    else if (mode === "Joke") fetchJoke();
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">
          Random {mode ? `${mode.charAt(0).toUpperCase() + mode.slice(1)} Generator` : "Generator"}
        </h1>

        <div className="toggle-buttons">
          <button
            className={`toggle-button ${mode === "Dog" ? "active" : ""}`}
            onClick={() => setMode("Dog")} >
            🐶 Dog
          </button>

          <button
            className={`toggle-button ${mode === "Cat" ? "active" : ""}`}
            onClick={() => setMode("Cat")}>
            🐱 Cat
          </button>

          <button
            className={`toggle-button ${mode === "Joke" ? "active" : ""}`}
            onClick={() => setMode("Joke")}>
            😂 Joke
          </button>

        </div>

        <button
          className="fetch-button" onClick={handleClick} disabled={!mode || loading}>
          {loading ? "Loading..." : mode ? `Get ${mode}` : "Choose Mode"}
        </button>

        <div className="content">
          {mode === "Dog" && dogImage && (
            <img src={dogImage} alt="Dog" className="animal-image" />
          )}
          {mode === "Cat" && catImage && (
            <img src={catImage} alt="Cat" className="animal-image" />
          )}
          {mode === "Joke" && joke.setup && (
            <div className="joke-box">
              <p><strong>Setup:</strong> {joke.setup}</p>
              <p><strong>Punchline:</strong> {joke.punchline}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
