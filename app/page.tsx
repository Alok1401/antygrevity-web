"use client";

import { motion } from "framer-motion";
import { Download, PlayCircle, Star, Users, BrainCircuit, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-black text-white">
      {/* Background Particles / Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-green/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-blue/20 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Image src="/icon.png" alt="AntyGrevity AI Logo" width={36} height={36} className="rounded-xl shadow-lg border border-white/10" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight leading-tight">AntyGrevity AI</span>
            <span className="text-[10px] font-medium text-brand-green tracking-widest uppercase">Powered by Alok</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <span className="text-white/50 text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 font-mono">antygrevity-ai.com</span>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#demo" className="hover:text-white transition-colors">Demo</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
        </div>
        <a href="/app" className="px-5 py-2.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all border border-white/10">
          Sign In / Web App
        </a>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 lg:pt-32 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Side: Content */}
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            AntyGrevity AI 2.0 is Live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
          >
            Your Personal <br />
            <span className="text-gradient">AI Career Assistant</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed"
          >
            Master your interviews, optimize your resume, and accelerate your career growth with the most advanced AI-powered career platform on the market.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a 
              href="/app"
              className="group relative w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-green text-brand-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all neon-glow-green overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <BrainCircuit className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Use Web App (Free)</span>
            </a>
            <a 
              href="https://drive.google.com/uc?export=download&id=1Ozgu5oyVSW1l_VBx51ZRgrHPAbeyO1no" 
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-md"
            >
              <Download className="w-5 h-5 group-hover:text-brand-green transition-colors" />
              Download APK
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-8 mt-16 pt-8 border-t border-white/10 w-full"
          >
            <div>
              <div className="text-3xl font-bold text-white mb-1">50K+</div>
              <div className="text-sm text-gray-400 flex items-center gap-1"><Users className="w-4 h-4" /> Active Users</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
              <div className="text-sm text-gray-400 flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" /> App Rating</div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visuals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative w-full max-w-lg lg:max-w-none"
        >
          {/* Main App Mockup */}
          <div className="relative z-20 w-full aspect-[9/19] max-w-[320px] mx-auto bg-brand-dark rounded-[3rem] border-[8px] border-white/10 shadow-2xl overflow-hidden glass-card">
            {/* Dynamic Island Notch */}
            <div className="absolute top-0 inset-x-0 h-7 bg-black w-32 mx-auto rounded-b-3xl z-30" />
            
            {/* Fake App Content */}
            <div className="absolute inset-0 p-6 pt-16 flex flex-col bg-gradient-to-b from-brand-dark to-brand-black">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold">Hello, Alex 👋</h3>
                  <p className="text-xs text-brand-green">Ready for your interview?</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10" />
              </div>
              
              <div className="glass-card rounded-2xl p-4 mb-4 border border-brand-green/30 relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">AI Mock Interview</span>
                  <ChevronRight className="w-4 h-4 text-brand-green" />
                </div>
                <div className="h-2 w-full bg-black rounded-full overflow-hidden">
                  <div className="h-full w-[75%] bg-brand-green rounded-full" />
                </div>
                <p className="text-xs text-gray-400 mt-2">75% readiness score</p>
              </div>

              <div className="glass-card rounded-2xl p-4 mb-4 border border-brand-blue/30 relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-brand-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Resume Analyzer</span>
                  <ChevronRight className="w-4 h-4 text-brand-blue" />
                </div>
                <p className="text-xs text-gray-400">Score: 89/100 (Excellent)</p>
              </div>

              {/* Chat Interface Preview */}
              <div className="flex-1 bg-black/50 rounded-2xl p-4 mt-auto border border-white/5 flex flex-col gap-3 justify-end">
                <div className="bg-white/10 self-start p-2 rounded-xl rounded-bl-none text-xs text-gray-300 max-w-[80%]">
                  "Tell me about a time you faced a difficult challenge."
                </div>
                <div className="bg-brand-green/20 self-end p-2 rounded-xl rounded-br-none text-xs text-brand-green max-w-[80%]">
                  "In my previous role, we had a major production bug..."
                </div>
                <div className="h-10 mt-2 rounded-full bg-white/5 border border-white/10 flex items-center px-4">
                  <div className="w-4 h-4 rounded-full bg-brand-green animate-pulse" />
                  <span className="text-xs text-gray-500 ml-2">Listening...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 -left-12 lg:-left-20 glass-card p-4 rounded-2xl z-30 border border-brand-green/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-brand-green" />
              </div>
              <div>
                <p className="text-sm font-bold">Offer Received!</p>
                <p className="text-xs text-gray-400">Just now</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 -right-12 lg:-right-20 glass-card p-4 rounded-2xl z-30 border border-brand-blue/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-brand-blue" />
              </div>
              <div>
                <p className="text-sm font-bold">AI Analysis Ready</p>
                <p className="text-xs text-gray-400">View resume feedback</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Features Preview Section (Below Hero) */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 pb-32 pt-20">
         <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Ultimate AI Ecosystem</h2>
            <p className="text-gray-400 text-lg">Every tool you need to ace your career, built right into the app.</p>
         </div>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI Tutor", desc: "Ask anything, anytime. A 24/7 intelligent companion for all your doubts and career questions.", icon: BrainCircuit, color: "text-brand-blue" },
              { title: "Interview Prep", desc: "Tailored preparation for Core Technical, System Design, HR & Behavioral, and Project Management roles.", icon: PlayCircle, color: "text-brand-green" },
              { title: "Pro Resume Builder", desc: "Craft stunning A4 resumes with AI auto-generated professional content for your specific subject.", icon: Star, color: "text-yellow-400" },
              { title: "Mock Interview", desc: "Practice in real-time with an adaptive AI recruiter. Get instant readiness scores and feedback.", icon: Users, color: "text-purple-400" },
              { title: "Quiz Generator", desc: "Test your knowledge dynamically on any topic to ensure you're fully prepared before the big day.", icon: ChevronRight, color: "text-orange-400" },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group border border-white/5 hover:border-white/20">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                   <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
         </div>
      </section>

      {/* Footer / Branding */}
      <footer className="relative z-10 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/icon.png" alt="AntyGrevity AI Logo" width={28} height={28} className="rounded-lg border border-white/5" />
            <span className="font-bold">AntyGrevity AI</span>
          </div>
          <div className="text-sm text-gray-400 font-mono">
            https://antygrevity-ai.com
          </div>
          <div className="px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-bold flex items-center gap-2">
            <Star className="w-4 h-4" />
            Powered by Alok
          </div>
        </div>
      </footer>

    </div>
  );
}
