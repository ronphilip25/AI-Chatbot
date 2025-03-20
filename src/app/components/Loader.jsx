export default function Loader() {
  return (
    <div className="flex items-center justify-center p-2">
      <img
        alt="logo"
        src="/avatars/ai_img.ico"
        className="w-10 h-10 rounded-full object-cover mr-2"
      />
      <span className="text-lg font-semibold">
        Tinkering about
        <span className="loading loading-dots loading-lg text-orange-500 ml-2" />
      </span>
    </div>
  );
}
