import Image from 'next/image';

export default function InfoSection() {
  return (
    <>
      <div className="w-full max-w-6xl mx-auto mt-2 sm:mt-14 lg:mt-20 px-4 pb-6 sm:pb-10 pt-3 sm:pt-10">

        {/* 3 Madde - kartpostal kartları, pasaport damgası ikon köşesi */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">

          {/* Madde 1 */}
          <div className="pc-card flex flex-col items-center text-center p-4 sm:p-6 -rotate-1">
            <div className="pc-stamp w-12 h-12 sm:w-14 sm:h-14 text-pc-rust flex items-center justify-center mb-3 sm:mb-5 shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <h3 className="pc-display text-sm sm:text-lg text-pc-ink mb-1 sm:mb-3 leading-tight">Relevant Chats</h3>
            <p className="text-xs sm:text-sm text-pc-ink-2 leading-relaxed sm:text-justify">
              Add your interests and get matched with strangers who share your vibe. No more awkward small talk to start a conversation.
            </p>
          </div>

          {/* Madde 2 */}
          <div className="pc-card flex flex-col items-center text-center p-4 sm:p-6">
            <div className="pc-stamp w-12 h-12 sm:w-14 sm:h-14 text-pc-teal flex items-center justify-center mb-3 sm:mb-5 shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h3 className="pc-display text-sm sm:text-lg text-pc-ink mb-1 sm:mb-3 leading-tight">Safety &amp; Privacy</h3>
            <p className="text-xs sm:text-sm text-pc-ink-2 leading-relaxed sm:text-justify">
              Chats are anonymous by default and require no registration. You can end any conversation instantly, whenever you want.
            </p>
          </div>

          {/* Madde 3 */}
          <div className="pc-card flex flex-col items-center text-center p-4 sm:p-6 rotate-1">
            <div className="pc-stamp w-12 h-12 sm:w-14 sm:h-14 text-pc-mustard flex items-center justify-center mb-3 sm:mb-5 shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h3 className="pc-display text-sm sm:text-lg text-pc-ink mb-1 sm:mb-3 leading-tight">AI Moderation</h3>
            <p className="text-xs sm:text-sm text-pc-ink-2 leading-relaxed sm:text-justify">
              Every chat is moderated by AI and human teams to keep things safe. This preserves the classic random chat experience you know.
            </p>
          </div>

        </div>
      </div>

      {/* About Section - eski bir fotoğraf albümü sayfası gibi */}
      <div className="w-full py-8 sm:py-12 md:py-24 lg:py-16 border-t-2 border-dashed border-pc-line">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

          <div className="hidden lg:flex flex-col items-center mb-10">
            <span className="pc-display text-pc-rust text-xs tracking-[0.25em] uppercase mb-2">✈ Postcard from the team</span>
            <h2 className="pc-display text-2xl sm:text-3xl md:text-4xl text-pc-ink leading-tight text-center">
              About Omegletest App
            </h2>
          </div>

          <div className="relative w-full flex items-center lg:block p-6 sm:p-10 lg:p-0">
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-14 w-full">

              <div className="w-full lg:w-[55%] flex flex-col justify-center">
                <div className="lg:hidden">
                  <span className="pc-display text-pc-rust text-xs tracking-[0.2em] uppercase mb-2 block">✈ Postcard from the team</span>
                  <h2 className="pc-display text-2xl sm:text-3xl text-pc-ink mb-4 leading-tight">
                    About Omegletest App
                  </h2>
                </div>

                <div className="text-justify text-pc-ink-2 text-xs sm:text-base lg:text-lg leading-relaxed space-y-5 lg:space-y-6">
                  <p>
                    <strong className="text-pc-ink font-extrabold">Omegletest</strong> is a premier free online chat platform designed to connect you with random strangers from all corners of the globe. Born out of the desire to keep the classic random chat spirit alive, our platform offers a seamless, instant connection without the hassle of registrations or hidden fees.
                  </p>
                  <p>
                    What sets us apart is our commitment to both <strong className="text-pc-ink font-extrabold">freedom and safety</strong>. We understand that anonymity is the core of random chatting. We pair this freedom with state-of-the-art AI moderation and a dedicated reporting system, ensuring that while you enjoy the thrill of the unknown, you are fully protected.
                  </p>
                  <p>
                    Whether you are looking to make new friends, practice a new language, or simply have a fun conversation, our platform provides the perfect environment. Join our growing community today and experience the excitement of truly spontaneous interactions, all within a secure and user-friendly interface.
                  </p>
                </div>
              </div>

              <div className="hidden lg:block lg:w-[45%]">
                <div className="pc-card-static p-3 -rotate-1">
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src="/about_illustration.png"
                      alt="Omegletest Online Global Connectivity"
                      fill
                      className="object-cover sepia-[0.25] contrast-105"
                    />
                  </div>
                  <p className="pc-display text-center text-pc-ink-2 text-xs mt-3 pb-1">— wish you were here —</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
