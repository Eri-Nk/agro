const HighlightText = ({ text, searchTerm }) => {
  if (!searchTerm) return <span>{text}</span>;
  const regEx = new RegExp(`(${searchTerm})`, "gi");
  const parts = text.split(regEx);
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <span key={index} style={{ backgroundColor: "var(--cta-primary)" }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default HighlightText;
