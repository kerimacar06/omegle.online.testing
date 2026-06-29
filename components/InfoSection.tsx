export default function InfoSection() {
  return (
    <div className="w-full max-w-3xl mx-auto mt-12 px-4 pb-12 text-gray-700 leading-relaxed">
      
      {/* 3 Paragraflık Tanıtım ve Güvenlik Metinleri */}
      <div className="space-y-6 text-sm sm:text-base">
        <p>
          <strong>Want more relevant chats?</strong> Add your interests on Omegletest Online to instantly connect with strangers who share your vibe! Skip the awkward intros and dive into conversations about things you both love. It's a smarter way to meet new people and why many see Omegletest.online as a top alternative.
        </p>
        <p>
          Your safety matters on Omegletest.online. Chats are anonymous by default (we recommend keeping it that way!), and you can end any chat instantly. See our Chat Rules for clear guidelines on how to interact. For more, check our Blog or FAQ.
        </p>
        <p>
          Looking for a safer alternative? Omegletest Online's video and text chats are moderated by both AI and human teams. This helps us create a safer space that still feels like the classic chat experience. Remember, you're responsible for your actions while chatting on Omegletest.online.
        </p>
      </div>

      {/* Araya ince bir gri çizgi çekiyoruz */}
      <hr className="my-10 border-gray-200" />

      {/* About Omegle App Kısmı (text-center ile ortaladık) */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          About Omegletest App
        </h2>
        <p className="text-sm sm:text-base max-w-2xl mx-auto">
          Omegletest is a free online chat platform that connects you with random strangers from around the world. With features like instant connection, filtering options, and robust moderation, it provides a safe and engaging way to meet new people and have meaningful conversations. Whether you're looking to make new friends, learn about different cultures, or improve your language skills, Omegletest offers a unique and exciting experience.
        </p>
      </div>

    </div>
  );
}