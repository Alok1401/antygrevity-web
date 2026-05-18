"use client";

import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { BrainCircuit, LogOut, PlayCircle, Star, Users, ChevronRight, Download, Code2, Map, MessageSquare, Sparkles, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [interviewsUsed, setInterviewsUsed] = useState(1);
  const router = useRouter();

  useEffect(() => {
    // 1. Check local storage for guest session or simulated public login
    const guest = localStorage.getItem("guestMode") === "true";
    const simUserStr = localStorage.getItem("userSimulated");

    if (guest) {
      setIsGuest(true);
      setUser({ displayName: "Guest Adventurer", email: "guest@antygrevity.com" });
      return;
    }

    if (simUserStr) {
      try {
        const simUser = JSON.parse(simUserStr);
        setUser(simUser);
        return;
      } catch (e) {
        console.error(e);
      }
    }

    // 2. Standard Firebase auth listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Read local storage to see if guest has done interviews
  useEffect(() => {
    const count = localStorage.getItem("guest_interviews_used");
    if (count) {
      setInterviewsUsed(parseInt(count));
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("guestMode");
    localStorage.removeItem("userSimulated");
    try {
      await signOut(auth);
    } catch (e) {}
    router.push("/");
  };

  if (!user) return <div className="min-h-screen bg-brand-black flex items-center justify-center text-white font-mono">INITIALIZING CONSOLE...</div>;

  return (
    <div className="min-h-screen bg-brand-black text-white p-6 relative">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-brand-green/5 blur-[120px] pointer-events-none" />

      {/* Guest Mode Alert Banner */}
      {isGuest && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto mb-6 p-4 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-brand-green/5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-green/20 flex items-center justify-center text-brand-green">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Running in Free Guest Mode</p>
              <p className="text-xs text-gray-400">Try features instantly. Full analysis reports and premium voice avatars require a free account.</p>
            </div>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem("guestMode");
              router.push("/login");
            }}
            className="bg-brand-green text-brand-black px-5 py-2.5 rounded-xl text-xs font-black hover:scale-105 transition-all neon-glow-green"
          >
            Create Free Account
          </button>
        </motion.div>
      )}

      <nav className="max-w-7xl mx-auto flex items-center justify-between mb-8 py-6 border-b border-white/10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
          <BrainCircuit className="w-8 h-8 text-brand-green" />
          <span className="text-xl font-bold">AntyGrevity AI</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-gray-400 text-sm font-mono hidden md:inline">Welcome, <span className="text-brand-green font-bold">{user.displayName || user.email?.split("@")[0] || "Explorer"}</span></span>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Exit Console
          </button>
        </div>
      </nav>
 
      <main className="max-w-7xl mx-auto">
        {/* Tier Info & Greeting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Workspace Dashboard</h1>
            <p className="text-gray-400 text-sm">Select an AI module to kickstart your preparation.</p>
          </div>
          
          {/* Daily Usage Indicators */}
          <div className="flex flex-wrap items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-3xl backdrop-blur-md">
            <div className="flex items-center gap-2 pr-4 border-r border-white/10">
              <Award className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-[10px] text-gray-500 font-bold uppercase font-mono">CURRENT TIER</div>
                <div className="text-xs font-extrabold text-white flex items-center gap-1">
                  {isGuest ? "FREE GUEST" : "STANDARD PLAN"}
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-[10px] text-gray-500 font-bold uppercase font-mono">DAILY AI INTERVIEWS</div>
              <div className="text-xs font-extrabold text-white">
                <span className="text-brand-green">{interviewsUsed}</span> / 3 <span className="text-gray-500 font-normal">used</span>
              </div>
            </div>

            <a 
              href="https://drive.google.com/uc?export=download&id=1Ozgu5oyVSW1l_VBx51ZRgrHPAbeyO1no" 
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center justify-center gap-1.5 bg-brand-green text-brand-black px-4 py-2 rounded-2xl font-bold text-xs hover:scale-105 transition-all neon-glow-green"
            >
              <Download className="w-3.5 h-3.5" />
              Get APK
            </a>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI Tutor", desc: "Ask anything, anytime. A 24/7 intelligent companion for all your doubts and career questions.", icon: BrainCircuit, color: "text-brand-blue", path: "/app" },
              { title: "Interview Prep Guide", desc: "Tailored preparation for Core Technical, System Design, HR & Behavioral, and Project Management roles.", icon: PlayCircle, color: "text-brand-green", path: "/app" },
              { title: "Pro Resume Builder", desc: "Craft stunning A4 resumes with AI auto-generated professional content for your specific subject.", icon: Star, color: "text-yellow-400", path: "/app" },
              { title: "Mock Interview Studio", desc: "Practice in real-time with an adaptive AI recruiter. Get instant readiness scores and feedback.", icon: Users, color: "text-purple-400", path: "/dashboard/interview" },
              { title: "Coding Interviews", desc: "Practice DSA, live coding, and technical rounds with instant AI grading.", icon: Code2, color: "text-red-400", path: "/app" },
              { title: "Group Discussion", desc: "Join AI-powered GD rooms to debate topics and receive performance reviews.", icon: MessageSquare, color: "text-pink-400", path: "/app" },
              { title: "Career Roadmap", desc: "Receive a personalized vertical career roadmap for your target job.", icon: Map, color: "text-emerald-400", path: "/app" },
              { title: "Quiz Generator", desc: "Test your knowledge dynamically on any topic to ensure you're fully prepared before the big day.", icon: ChevronRight, color: "text-orange-400", path: "/app" },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  if (feature.path === "/dashboard/interview") {
                    router.push(isGuest ? "/dashboard/interview?guest=true" : "/dashboard/interview");
                  } else {
                    router.push(feature.path);
                  }
                }}
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
