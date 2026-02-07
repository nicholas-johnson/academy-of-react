export function WelcomeSlide({ content }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center animate-fade-in p-8 w-full">
      <div className="max-w-3xl w-full mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">
          {content.title}
        </h1>
        <ul className="space-y-4">
          {content.points.map((point, i) => (
            <li key={i} className="text-xl md:text-2xl text-gray-200">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
