import { SlideIcon } from "./SlideIcon";

export function TitleSlide({ content }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center animate-fade-in p-8">
      <div className="mb-8 animate-float text-primary">
        <SlideIcon name={content.icon} size={96} />
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-primary">
        {content.title}
      </h1>
      <p className="text-2xl text-gray-400 font-light">{content.subtitle}</p>
    </div>
  );
}
