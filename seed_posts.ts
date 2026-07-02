import { connectMongoDB } from "./lib/mongodb";
import Post from "./models/Post";
import mongoose from "mongoose";

const posts = [
  {
    title: "Chatrandom: A Comprehensive Review",
    slug: "chatrandom-review",
    description: "Discover Chatrandom, one of the leading alternatives to Omegle for random video chatting.",
    content: "<p>Chatrandom has been around for quite a while, offering users the ability to connect instantly with strangers from all over the world via webcam. It features various chat rooms, geographical filters, and even gender filters (though some require a premium subscription).</p><p>With a user base that is constantly active, you're almost guaranteed to find someone to talk to at any hour. The interface is somewhat dated but functional.</p>",
    coverImage: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Jane Doe",
    rating: 4.2,
    voteCount: 1250,
    pros: ["Large active user base", "Geographical filtering available", "Specific chat rooms"],
    cons: ["Premium required for gender filter", "Interface looks a bit old", "High number of bots occasionally"],
    faqs: [
      { question: "Is Chatrandom free to use?", answer: "Yes, the basic random video chat is completely free." },
      { question: "Do I need to register?", answer: "No, registration is not required unless you want to use premium features." }
    ]
  },
  {
    title: "OmeTV: Mobile Friendly Video Chat",
    slug: "ometv-app-review",
    description: "OmeTV is arguably the most popular mobile-friendly alternative to Omegle today.",
    content: "<p>OmeTV stands out due to its strict moderation rules and excellent mobile application. Unlike other platforms, OmeTV requires users to verify their accounts, which significantly cuts down on bots and inappropriate behavior.</p><p>The platform is clean, fast, and connects you instantly. You can swipe to the next person effortlessly, making the mobile experience very similar to popular dating apps.</p>",
    coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Mark Smith",
    rating: 4.6,
    voteCount: 3420,
    pros: ["Excellent mobile app", "Strict moderation for safety", "Ad-free experience in chat"],
    cons: ["Can get banned easily if rules are broken", "Account verification required", "Less anonymity compared to Omegle"],
    faqs: [
      { question: "Is OmeTV safe?", answer: "Yes, it has active moderation and requires account verification." },
      { question: "Is there an iOS app?", answer: "Yes, OmeTV has apps for both iOS and Android." }
    ]
  },
  {
    title: "Emerald Chat: The Anti-Bot Platform",
    slug: "emerald-chat-review",
    description: "Emerald Chat focuses on matching users by interests and aggressively banning bots.",
    content: "<p>Emerald Chat was built from the ground up to combat the bot problem that plagues other random chat sites. It features a unique karma system that rewards good behavior and punishes trolls.</p><p>You can chat via text or video, and there's a strong emphasis on matching people with shared interests. The community feels much more conversational and less random.</p>",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Emily White",
    rating: 4.8,
    voteCount: 890,
    pros: ["Very few bots", "Karma system encourages good behavior", "Interest matching works well"],
    cons: ["Smaller user base than OmeTV", "Can take longer to match sometimes", "Some features require Gold subscription"],
    faqs: [
      { question: "What is Emerald Chat Gold?", answer: "It's a premium subscription that offers gender filtering and priority matching." },
      { question: "How does the Karma system work?", answer: "Users can upvote or downvote you based on your behavior in chats." }
    ]
  },
  {
    title: "Shagle: Fast and Anonymous",
    slug: "shagle-anonymous-chat",
    description: "Shagle offers rapid video connections and complete anonymity for its users.",
    content: "<p>Shagle is designed for speed. There is no sign-up process, and you are immediately thrown into a video chat with a random stranger upon clicking start.</p><p>It also offers virtual gifts and a highly active community. However, the lack of moderation means you must be prepared for anything, much like the original Omegle unmoderated section.</p>",
    coverImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Chris Taylor",
    rating: 3.9,
    voteCount: 2100,
    pros: ["Extremely fast connection times", "No registration whatsoever", "Virtual gifts add a fun element"],
    cons: ["Very little moderation", "High number of inappropriate users", "Lots of bots"],
    faqs: [
      { question: "Is Shagle completely anonymous?", answer: "Yes, no personal information is required to start chatting." },
      { question: "Can I use text chat only?", answer: "Yes, you can choose text-only mode before starting." }
    ]
  },
  {
    title: "CamSurf: Community Guidelines Focused",
    slug: "camsurf-video-chat",
    description: "CamSurf emphasizes family-friendly rules and AI-powered moderation for a safer environment.",
    content: "<p>CamSurf utilizes advanced AI to detect inappropriate behavior and automatically bans offenders. This makes it one of the safest platforms for random video chatting.</p><p>The interface is lightweight and works exceptionally well on mobile browsers. It's a great platform if you just want to have normal, friendly conversations without the typical random-chat surprises.</p>",
    coverImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Jane Doe",
    rating: 4.5,
    voteCount: 4500,
    pros: ["Great AI moderation", "Family-friendly environment", "Lightweight and fast loading"],
    cons: ["AI can sometimes falsely ban users", "Can't filter by gender for free", "Some users find rules too strict"],
    faqs: [
      { question: "Is CamSurf safe for teenagers?", answer: "CamSurf is intended for users 18+, though its strict moderation makes it safer than most alternatives." },
      { question: "How long do bans last?", answer: "Bans can range from a few hours to permanent, depending on the severity of the violation." }
    ]
  }
];

async function seed() {
  try {
    await connectMongoDB();
    console.log("Connected to DB, inserting posts...");
    
    for (const post of posts) {
      await Post.findOneAndUpdate({ slug: post.slug }, post, { upsert: true, new: true });
      console.log(`Inserted: ${post.title}`);
    }
    
    console.log("Done!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
