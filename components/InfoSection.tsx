import Image from 'next/image';

export default function InfoSection() {
  return (
    <>
      <div className="w-full max-w-6xl mx-auto mt-2 sm:mt-14 lg:mt-20 px-4 pb-6 sm:pb-10 pt-3 sm:pt-10 border-t border-neon-line">

        {/* 3 Paragraph Section - Mobilde alt alta liste, masaüstünde 3 kolon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-10">

          {/* Madde 1 */}
          <div className="neon-card flex flex-row sm:flex-col items-center text-left sm:text-center gap-4 sm:gap-0 p-4 sm:p-6 rounded-md">
            <div className="w-12 h-12 sm:w-12 sm:h-12 bg-neon-surface-2 text-neon-cyan rounded-md flex items-center justify-center mb-0 sm:mb-5 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-sm md:text-lg font-bold text-neon-ink mb-1 sm:mb-3 leading-tight text-center">Relevant Chats</h3>
              <p className="text-xs sm:text-sm text-neon-ink-2 leading-relaxed text-justify">
                Add your interests and get matched with strangers who share your vibe. No more awkward small talk to start a conversation.
              </p>
            </div>
          </div>

          {/* Madde 2 */}
          <div className="neon-card flex flex-row sm:flex-col items-center text-left sm:text-center gap-4 sm:gap-0 p-4 sm:p-6 rounded-md">
            <div className="w-12 h-12 sm:w-12 sm:h-12 bg-neon-surface-2 text-neon-violet rounded-md flex items-center justify-center mb-0 sm:mb-5 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-sm md:text-lg font-bold text-neon-ink mb-1 sm:mb-3 leading-tight text-center">Safety & Privacy</h3>
              <p className="text-xs sm:text-sm text-neon-ink-2 leading-relaxed text-justify">
                Chats are anonymous by default and require no registration. You can end any conversation instantly, whenever you want.
              </p>
            </div>
          </div>

          {/* Madde 3 */}
          <div className="neon-card flex flex-row sm:flex-col items-center text-left sm:text-center gap-4 sm:gap-0 p-4 sm:p-6 rounded-md">
            <div className="w-12 h-12 sm:w-12 sm:h-12 bg-neon-surface-2 text-amber-400 rounded-md flex items-center justify-center mb-0 sm:mb-5 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-sm md:text-lg font-bold text-neon-ink mb-1 sm:mb-3 leading-tight text-center">AI Moderation</h3>
              <p className="text-xs sm:text-sm text-neon-ink-2 leading-relaxed text-justify">
                Every chat is moderated by AI and human teams to keep things safe. This preserves the classic random chat experience you know.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* About Section - Hibrit Tasarım (Mobil: Cam Kart, Masaüstü: Başlık Ortada, Split Screen) */}
      <div className="w-full bg-neon-surface/40 py-8 sm:py-12 md:py-24 lg:py-10 border-t border-neon-line">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

          {/* MASAÜSTÜ İÇİN ORTALANMIŞ BAŞLIK */}
          <div className="hidden lg:flex flex-col items-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold md:font-extrabold text-neon-ink mb-6 leading-tight text-center">
              About Omegletest App
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-neon-cyan to-neon-violet rounded-full"></div>
          </div>

          {/* MOBİL İÇİN KAPSAYICI */}
          <div className="relative w-full flex items-center lg:block p-6 sm:p-10 lg:p-0">

            {/* İÇERİK: Masaüstünde Split Screen, Mobilde düz metin */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-12 w-full">

              {/* SOL TARAF (Metinler) */}
              <div className="w-full lg:w-[55%] flex flex-col justify-center">

                {/* MOBİL İÇİN BAŞLIK (Masaüstünde yukarıda gösterildiği için burada gizli) */}
                <div className="lg:hidden">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold md:font-extrabold text-neon-ink mb-6 leading-tight whitespace-nowrap">
                    About Omegletest App
                  </h2>
                  <div className="w-16 h-1.5 bg-gradient-to-r from-neon-cyan to-neon-violet rounded-full mb-6"></div>
                </div>

                <div className="text-justify text-neon-ink-2 text-xs sm:text-base lg:text-lg leading-relaxed space-y-5 lg:space-y-6">
                  <p>
                    <strong className="text-neon-ink font-extrabold lg:font-bold">Omegletest</strong> is a premier free online chat platform designed to connect you with random strangers from all corners of the globe. Born out of the desire to keep the classic random chat spirit alive, our platform offers a seamless, instant connection without the hassle of registrations or hidden fees.
                  </p>
                  <p>
                    What sets us apart is our commitment to both <strong className="text-neon-ink font-extrabold lg:font-bold">freedom and safety</strong>. We understand that anonymity is the core of random chatting. We pair this freedom with state-of-the-art AI moderation and a dedicated reporting system, ensuring that while you enjoy the thrill of the unknown, you are fully protected.
                  </p>
                  <p>
                    Whether you are looking to make new friends, practice a new language, or simply have a fun conversation, our platform provides the perfect environment. Join our growing community today and experience the excitement of truly spontaneous interactions, all within a secure and user-friendly interface.
                  </p>
                </div>
              </div>

              {/* SAĞ TARAF (Masaüstü Görseli) */}
              <div className="hidden lg:block lg:w-[45%]">
                <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden shadow-2xl transform transition-transform hover:-translate-y-2 duration-500 border border-neon-line">
                  <Image
                    src="/about_illustration.png"
                    alt="Omegletest Online Global Connectivity"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-neon-violet/15 to-transparent pointer-events-none"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}