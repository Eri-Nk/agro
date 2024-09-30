import { useState } from "react";
import FunFactsData from "../data/FunFactsData.json";
import { GiPalmTree } from "react-icons/gi";

const FunFacts = () => {
  // page to view per screen
  const [currentPage, setCurrentPage] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const factsPerPage = 3;

  // Get the total number of pages
  const totalPages = Math.ceil(FunFactsData.length / factsPerPage);

  // Get the current slice of fun facts to display viz: 0 to 2,3 to 5, 6 to 8, etc
  // start index=0*3, 1*3, 2*3, 3*3
  const startIndex = currentPage * factsPerPage;
  const currentFacts = FunFactsData.slice(
    startIndex,
    startIndex + factsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else setCurrentPage(0);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(totalPages - 1);
    }
    setAnimationKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="fun-facts">
      <h2>Fun Facts About Agriculture</h2>
      <p className="do-you-know">
        Do you know ?
        <span
          className="palm-icon"
          style={{
            position: "relative",
            display: "inline-block",
            margin: "0 10px",
            backgroundColor: "#hhh",
          }}
        >
          <GiPalmTree
            style={{
              color: "#34a853",
              position: "absolute",
              top: "0",
              left: "1px",
            }}
          />
          <GiPalmTree
            style={{ color: "#8b4513", clipPath: "inset(50% 0 0 0)" }}
          />
        </span>
      </p>

      <ul key={animationKey} className="facts-per-page">
        {currentFacts.map((fact) => (
          <li key={fact.id}>
            <h3>{fact.title}</h3>
            <p>{fact.description}</p>
          </li>
        ))}
      </ul>

      <div className="prev-next-facts">
        <div className="button button-cta" onClick={handlePrev}>
          Prev Facts
        </div>
        <div className="button button-cta" onClick={handleNext}>
          Next Facts
        </div>
      </div>
    </div>
  );
};

export default FunFacts;
