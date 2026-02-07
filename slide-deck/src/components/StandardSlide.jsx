export function StandardSlide({ content }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center animate-fade-in p-8 w-full">
      <div className="max-w-3xl w-full mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-5xl">{content.emoji}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            {content.title}
          </h1>
        </div>
        <ul className="space-y-4">
          {content.points.map((point, i) => (
            <li
              key={i}
              className="text-xl md:text-2xl text-gray-200 flex items-start gap-3"
            >
              <span className="text-secondary font-bold">→</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
