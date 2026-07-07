import Image from 'next/image';

export default function InfoSection() {
  return (
    <>
      <div className="w-full max-w-6xl mx-auto mt-20 px-4 pb-10">

        {/* 3 Paragraph Section - Temiz & Renksiz 3 Kolon Düzeni */}
        <div className="grid grid-cols-3 gap-2 sm:gap-10">

          {/* Madde 1 */}
          <div className="flex flex-col items-center text-center p-2 sm:p-6 bg-white border border-slate-200 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-slate-100 text-slate-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-5 shrink-0">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <h3 className="text-[10px] sm:text-lg font-bold text-slate-800 mb-1 sm:mb-3 leading-tight">Relevant Chats</h3>
            <p className="text-[8px] sm:text-sm text-slate-500 leading-tight sm:leading-relaxed text-justify">
              Add your interests on Omegletest Online to instantly connect with strangers who share your vibe! Skip the awkward intros and dive into conversations about things you both love. It&apos;s a smarter way to meet new people.
            </p>
          </div>

          {/* Madde 2 */}
          <div className="flex flex-col items-center text-center p-2 sm:p-6 bg-white border border-slate-200 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-slate-100 text-slate-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-5 shrink-0">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h3 className="text-[10px] sm:text-lg font-bold text-slate-800 mb-1 sm:mb-3 leading-tight">Safety & Privacy</h3>
            <p className="text-[8px] sm:text-sm text-slate-500 leading-tight sm:leading-relaxed text-justify">
              Your safety matters on Omegletest.online. Chats are anonymous by default, and you can end any chat instantly. See our Chat Rules for clear guidelines on how to interact. For more, check our Blog or FAQ.
            </p>
          </div>

          {/* Madde 3 */}
          <div className="flex flex-col items-center text-center p-2 sm:p-6 bg-white border border-slate-200 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-slate-100 text-slate-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-5 shrink-0">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h3 className="text-[10px] sm:text-lg font-bold text-slate-800 mb-1 sm:mb-3 leading-tight">AI Moderation</h3>
            <p className="text-[8px] sm:text-sm text-slate-500 leading-tight sm:leading-relaxed text-justify">
              Omegletest Online&apos;s video and text chats are moderated by both AI and human teams. This helps us create a safer space that still feels like the classic chat experience. Remember, you&apos;re responsible for your actions.
            </p>
          </div>

        </div>
      </div>

      {/* About Section - Hibrit Tasarım (Mobil: Cam Kart, Masaüstü: Başlık Ortada, Split Screen) */}
      <div className="w-full relative py-16 md:py-24 lg:bg-gradient-to-br lg:from-indigo-100 lg:via-purple-50 lg:to-pink-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* MASAÜSTÜ İÇİN ORTALANMIŞ BAŞLIK */}
          <div className="hidden lg:flex flex-col items-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 mb-6 leading-tight text-center">
              About Omegletest App
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>

          {/* MOBİL İÇİN KAPSAYICI (Arkaplan Görseli ve Cam Kart efekti bu div'de) */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-2xl lg:shadow-none lg:rounded-none lg:overflow-visible min-h-[500px] lg:min-h-0 flex items-center lg:block">
            
            {/* MOBİL: Arka Plan Görseli */}
            <div className="absolute inset-0 lg:hidden">
              <Image 
                src="/about_illustration.png" 
                alt="Omegletest Online Global Connectivity" 
                fill 
                className="object-cover"
              />
              {/* Metnin rahat okunabilmesi için çok hafif bir karanlık katman */}
              <div className="absolute inset-0 bg-slate-900/20"></div>
            </div>

            {/* İÇERİK: Mobilde cam kart, Masaüstünde Split Screen */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 p-4 sm:p-10 lg:p-0 w-full">
              
              {/* SOL TARAF (Metinler) */}
              <div className="w-full lg:w-1/2 bg-white/80 lg:bg-transparent backdrop-blur-lg lg:backdrop-blur-none rounded-xl lg:rounded-none p-6 sm:p-10 lg:p-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] lg:shadow-none border border-white/60 lg:border-none flex flex-col justify-center">
                
                {/* MOBİL İÇİN BAŞLIK (Masaüstünde yukarıda gösterildiği için burada gizli) */}
                <div className="lg:hidden">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6 leading-tight">
                    About Omegletest App
                  </h2>
                  <div className="w-16 h-1.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6"></div>
                </div>
                
                <div className="text-slate-800 lg:text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed space-y-5 lg:space-y-6">
                  <p>
                    <strong className="text-slate-900 lg:text-slate-800 font-extrabold lg:font-bold">Omegletest</strong> is a premier free online chat platform designed to connect you with random strangers from all corners of the globe. Born out of the desire to keep the classic random chat spirit alive, our platform offers a seamless, instant connection without the hassle of registrations or hidden fees.
                  </p>
                  <p>
                    What sets us apart is our commitment to both <strong className="text-slate-900 lg:text-slate-800 font-extrabold lg:font-bold">freedom and safety</strong>. We understand that anonymity is the core of random chatting. We pair this freedom with state-of-the-art AI moderation and a dedicated reporting system, ensuring that while you enjoy the thrill of the unknown, you are fully protected.
                  </p>
                </div>
              </div>

              {/* SAĞ TARAF (Masaüstü Görseli) */}
              <div className="hidden lg:block lg:w-1/2">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl transform transition-transform hover:-translate-y-2 duration-500 border-4 border-white/60">
                  <Image 
                    src="/about_illustration.png" 
                    alt="Omegletest Online Global Connectivity" 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent pointer-events-none"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}