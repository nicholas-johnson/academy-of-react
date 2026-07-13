/* ⚙️ ENGINE CODE — you don't need to read this */
import "./components.css";

function Section({ children, title }) {
  return (
    <section className="section">
      {title && <h2 className="section__title">{title}</h2>}
      <div className="section__content">{children}</div>
    </section>
  );
}

export default Section;
