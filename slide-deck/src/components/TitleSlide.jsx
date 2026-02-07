export function TitleSlide({ content }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center animate-fade-in p-8">
      <div className="text-8xl mb-8 animate-float">{content.emoji}</div>
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {content.title}
      </h1>
      <p className="text-2xl text-gray-400 font-light">{content.subtitle}</p>
    </div>
  );
}
