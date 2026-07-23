import Image from 'next/image';

const items = [
  {
    num: '01',
    band: 'band-white',
    title: 'Relevant Chats',
    description: 'Add your interests and get matched with strangers who share your vibe. No more awkward small talk to start a conversation.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
    ),
  },
  {
    num: '02',
    band: 'band-cream',
    title: 'Safety & Privacy',
    description: 'Chats are anonymous by default and require no registration. You can end any conversation instantly, whenever you want.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
    ),
  },
  {
    num: '03',
    band: 'band-white',
    title: 'AI Moderation',
    description: 'Every chat is moderated by AI and human teams to keep things safe. This preserves the classic random chat experience you know.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
    ),
  },
];

export default function InfoSection() {
  return (
    <>
      {/* 3 Madde — kart grid'i yerine kenardan kenara, dönüşümlü renkli bantlar */}
      {items.map((item) => (
        <div key={item.num} className={`${item.band} w-full border-b border-v6-line`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex items-center gap-5 sm:gap-8 relative overflow-hidden">
            <span className="ch-num text-v6-ink text-6xl sm:text-8xl absolute -left-2 sm:left-2 select-none pointer-events-none">{item.num}</span>
            <div className="relative z-10 shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-v6-coral/10 text-v6-coral flex items-center justify-center ml-10 sm:ml-16">
              {item.icon}
            </div>
            <div className="relative z-10 min-w-0">
              <h3 className="ch-display text-lg sm:text-2xl font-bold text-v6-ink mb-1 sm:mb-2 leading-tight">{item.title}</h3>
              <p className="text-sm sm:text-base text-v6-ink-2 leading-relaxed max-w-xl">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* About Bandı — koyu lacivert, split görsel */}
      <div className="band-navy w-full py-10 sm:py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full">

            <div className="w-full lg:w-[55%] flex flex-col justify-center">
              <span className="text-v6-coral font-bold text-xs tracking-[0.2em] uppercase mb-3 block">About</span>
              <h2 className="ch-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                About Omegletest App
              </h2>

              <div className="text-white/70 text-xs sm:text-base lg:text-lg leading-relaxed space-y-5 lg:space-y-6">
                <p>
                  <strong className="text-white font-extrabold">Omegletest</strong> is a premier free online chat platform designed to connect you with random strangers from all corners of the globe. Born out of the desire to keep the classic random chat spirit alive, our platform offers a seamless, instant connection without the hassle of registrations or hidden fees.
                </p>
                <p>
                  What sets us apart is our commitment to both <strong className="text-white font-extrabold">freedom and safety</strong>. We understand that anonymity is the core of random chatting. We pair this freedom with state-of-the-art AI moderation and a dedicated reporting system, ensuring that while you enjoy the thrill of the unknown, you are fully protected.
                </p>
                <p>
                  Whether you are looking to make new friends, practice a new language, or simply have a fun conversation, our platform provides the perfect environment. Join our growing community today and experience the excitement of truly spontaneous interactions, all within a secure and user-friendly interface.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-[45%]">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/about_illustration.png"
                  alt="Omegletest Online Global Connectivity"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
