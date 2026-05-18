"use client";

import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { BrainCircuit, LogOut, PlayCircle, Star, Users, ChevronRight, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (!user) return <div className="min-h-screen bg-brand-black flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-brand-black text-white p-6">
      <nav className="max-w-7xl mx-auto flex items-center justify-between mb-12 py-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-brand-green" />
          <span className="text-xl font-bold">AntyGrevity AI</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-gray-400 text-sm">Welcome, {user.displayName || "User"}</span>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold">Your Workspace</h1>
          <a 
            href="/apk/antygrevity-ai.apk" 
            download="antygrevity_ai.apk"
            className="inline-flex items-center justify-center gap-2 bg-brand-green text-brand-black px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-all neon-glow-green"
          >
            <Download className="w-4 h-4" />
            Download App
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI Tutor", desc: "Ask anything, anytime. A 24/7 intelligent companion for all your doubts and career questions.", icon: BrainCircuit, color: "text-brand-blue" },
              { title: "Interview Prep", desc: "Tailored preparation for Core Technical, System Design, HR & Behavioral, and Project Management roles.", icon: PlayCircle, color: "text-brand-green" },
              { title: "Pro Resume Builder", desc: "Craft stunning A4 resumes with AI auto-generated professional content for your specific subject.", icon: Star, color: "text-yellow-400" },
              { title: "Mock Interview", desc: "Practice in real-time with an adaptive AI recruiter. Get instant readiness scores and feedback.", icon: Users, color: "text-purple-400" },
              { title: "Quiz Generator", desc: "Test your knowledge dynamically on any topic to ensure you're fully prepared before the big day.", icon: ChevronRight, color: "text-orange-400" },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group border border-white/5 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors relative z-10">
                   <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
         </div>
      </main>
    </div>
  );
}
