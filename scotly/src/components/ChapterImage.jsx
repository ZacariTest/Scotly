export default function ChapterImage({ src }) {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-2xl">
      <img
        src={src}
        alt="scene"
        className="w-full h-[400px] object-cover"
      />
    </div>
  );
}
