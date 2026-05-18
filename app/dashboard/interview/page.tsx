"use client";

import { useEffect, useState, useRef } from "react";
import { auth } from "../../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Mic, MicOff, Video, VideoOff, Upload, 
  Send, BrainCircuit, Play, CheckCircle2, ShieldCheck, 
  AlertTriangle, RefreshCw, BarChart2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  { q: "Tell me about yourself and your key technical expertise in software development.", category: "HR Round" },
  { q: "What is your understanding of RESTful APIs and how do they differ from GraphQL platforms?", category: "Technical Round" },
  { q: "Describe a situation where you had a major technical conflict with a teammate. How did you resolve it?", category: "Behavioral Round" },
  { q: "How do you optimize web application performance, and what is your strategy for handling database latency?", category: "System Design" },
  { q: "Where do you see yourself in the next 5 years in terms of software architecture and technology leadership?", category: "Career Path" }
];

export default function InterviewStudio() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  
  // Hardware and Status State
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isCameraMuted, setIsCameraMuted] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  
  // Interview state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [aiFeedback, setAiFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  
  // Cinematic HUD Telemetry state
  const [isAiSpeaking, setIsAiSpeaking] = useState(true);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState(88);
  const [detectedEmotion, setDetectedEmotion] = useState("Focused & Calm");
  const [speechEnergy, setSpeechEnergy] = useState<number[]>(Array(15).fill(10));
  
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Authentication check
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

  // Handle HTML5 Live Camera Pipeline
  useEffect(() => {
    async function setupCamera() {
      if (isCameraMuted) {
        if (cameraStream) {
          cameraStream.getTracks().forEach(track => track.stop());
          setCameraStream(null);
        }
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, facingMode: "user" },
          audio: false
        });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access blocked: ", err);
      }
    }
    setupCamera();

    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraMuted]);

  // Pulsating Audio Spectrum Modulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAiSpeaking) {
        // AI waveform pulses actively
        setSpeechEnergy(Array(15).fill(0).map(() => Math.floor(Math.random() * 50) + 15));
      } else if (userAnswer.length > 0 && !isMicMuted) {
        // Simulates user speaking waves
        setSpeechEnergy(Array(15).fill(0).map(() => Math.floor(Math.random() * 30) + 5));
      } else {
        // Static hum
        setSpeechEnergy(Array(15).fill(0).map(() => Math.floor(Math.random() * 8) + 4));
      }
    }, 150);
    return () => clearInterval(interval);
  }, [isAiSpeaking, userAnswer, isMicMuted]);

  // AI Interview evaluation pipeline
  const submitAnswer = async () => {
    if (!userAnswer.trim()) return;

    setIsLoadingFeedback(true);
    setShowFeedback(true);
    setIsAiSpeaking(false);
    setIsAiThinking(true);

    // Mock highly realistic AI telemetry grading
    setTimeout(() => {
      const positiveReviews = [
        "Your structure in addressing software scalability shows high engineering poise. Focus on mentioning load balancers earlier. [Score: 9/10]",
        "Excellent details regarding API performance comparison. Good distinction between over-fetching in REST vs. selective loading. [Score: 8/10]",
        "Fantastic resolution methodology. Showcasing objective mediation between conflicting parties demonstrates strong tech leadership. [Score: 9/10]",
        "Good architectural insights. Adding micro-caches like Redis would enhance the completeness of your latency defense plan. [Score: 8/10]"
      ];
      const feedback = positiveReviews[currentIndex % positiveReviews.length];
      
      setIsLoadingFeedback(false);
      setIsAiThinking(false);
      setIsAiSpeaking(true);
      setAiFeedback(feedback);
      setScore(prev => prev + 1);
      setConfidenceScore(Math.floor(Math.random() * 8) + 90);
      setDetectedEmotion("Assertive & Professional");
    }, 2000);
  };

  const nextQuestion = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer("");
      setShowFeedback(false);
      setIsAiSpeaking(true);
      setIsAiThinking(false);
    } else {
      setFinished(true);
    }
  };

  if (!user) return <div className="min-h-screen bg-[#0B1020] flex items-center justify-center text-white">Loading Workspace...</div>;

  return (
    <div className="min-h-screen bg-[#0B1020] text-white p-6 relative overflow-hidden flex flex-col justify-between">
      {/* Background Neon Glow Vectors */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-blue/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[45%] h-[45%] bg-brand-green/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Panel */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between py-4 border-b border-white/5 relative z-10">
        <button 
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <div className="flex items-center gap-3 bg-black/40 px-5 py-2.5 rounded-full border border-brand-green/20">
          <div className="w-2.5 h-2.5 bg-brand-green rounded-full animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-brand-green uppercase font-bold">
            ANTYGREVITY AI HOST ACTIVE
          </span>
        </div>
      </header>

      {/* Main Workspace Stage */}
      <main className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 my-8 flex-grow relative z-10 items-stretch">
        
        {/* Left Stage: AI Recruiter Avatar Frame (Column 7) */}
        <section className="lg:col-span-7 flex flex-col justify-between p-6 bg-white/[0.03] rounded-3xl border border-white/5 backdrop-blur-md relative overflow-hidden min-h-[400px]">
          
          {/* Laser Scanner Bar */}
          <div 
            className="absolute left-0 right-0 h-[2px] bg-brand-blue/80 shadow-[0_0_12px_#00D1FF] pointer-events-none transition-all duration-1000"
            style={{ 
              top: isAiThinking ? "50%" : isAiSpeaking ? "20%" : "85%",
              animation: "scanner-move 4s ease-in-out infinite alternate"
            }} 
          />

          {/* AI Host Core Info Header */}
          <div className="flex items-center justify-between w-full">
            <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold px-3 py-1 rounded-md tracking-wider flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
              LIVE STREAM
            </span>
            <span className="text-gray-400 text-xs font-mono">Telemetry Active</span>
          </div>

          {/* Recruiter Stylized Hologram Center */}
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative flex items-center justify-center">
              {/* Pulsating outer neon border modulated by speech energy */}
              <div 
                className="absolute rounded-full border-2 border-brand-blue/30 transition-all duration-150"
                style={{
                  width: `${140 + (speechEnergy[7] || 5)}px`,
                  height: `${140 + (speechEnergy[7] || 5)}px`,
                  boxShadow: isAiSpeaking ? "0 0 20px rgba(0, 209, 255, 0.2)" : "none"
                }}
              />
              {/* Inner stylized AI Avatar core */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-brand-blue to-purple-500 flex items-center justify-center shadow-lg shadow-brand-blue/35 relative z-10">
                <BrainCircuit className="w-14 h-14 text-white animate-pulse" />
              </div>
            </div>
            
            <h3 className="text-lg font-bold mt-6 tracking-wide">
              {isAiThinking ? "Analyzing response Poise..." : "AntyGrevity AI Recruiter"}
            </h3>
            <p className="text-[10px] font-mono tracking-widest text-brand-blue uppercase mt-1 font-bold">
              {isAiSpeaking ? "• Speaking Live Evaluation" : "• Listening Feed..."}
            </p>
          </div>

          {/* Bottom Live Waveform Visualizer */}
          <div className="w-full bg-black/30 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center justify-center gap-1.5 h-10">
              {speechEnergy.map((energy, index) => (
                <div 
                  key={index}
                  className="w-1 bg-brand-blue rounded-full transition-all duration-150"
                  style={{ 
                    height: `${Math.max(4, energy)}px`,
                    backgroundColor: isAiSpeaking ? "#00D1FF" : "#7B61FF" 
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Right Stage: Interactive Console & Question Hub (Column 5) */}
        <section className="lg:col-span-5 flex flex-col justify-between p-6 bg-white/[0.04] rounded-3xl border border-white/10 backdrop-blur-lg">
          
          {/* Section Tracker */}
          <div className="flex items-center justify-between mb-4">
            <span className="bg-brand-blue/15 text-brand-blue border border-brand-blue/20 text-[10px] font-mono font-bold px-3 py-1 rounded-lg">
              {QUESTIONS[currentIndex].category}
            </span>
            <span className="text-[10px] text-brand-green bg-brand-green/10 border border-brand-green/20 px-2 py-0.5 rounded font-mono font-bold">
              CLARITY: HIGH
            </span>
          </div>

          {/* Active Question Panel */}
          <div className="flex-grow flex flex-col justify-start">
            <span className="text-gray-400 text-xs font-mono mb-2">QUESTION {currentIndex + 1} OF {QUESTIONS.length}</span>
            <h2 className="text-xl font-bold leading-relaxed mb-6">
              {QUESTIONS[currentIndex].q}
            </h2>

            {/* Answer Feed Screen */}
            <div className="space-y-4 flex-grow flex flex-col justify-end">
              {!showFeedback ? (
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <textarea 
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your technical or behavioral answer statement here..."
                      className="w-full bg-transparent border-none outline-none resize-none text-sm text-white placeholder-gray-500 h-28"
                    />
                    <div className="flex items-center justify-between text-xs text-gray-400 border-t border-white/5 pt-3">
                      <span>Live transcription matching...</span>
                      <span>{userAnswer.length} characters</span>
                    </div>
                  </div>
                  <button 
                    onClick={submitAnswer}
                    disabled={!userAnswer.trim()}
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 disabled:bg-gray-700 disabled:text-gray-400 text-brand-black font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-brand-blue/20"
                  >
                    <Send className="w-4 h-4" />
                    SUBMIT RESPONSE
                  </button>
                </div>
              ) : (
                <div className="bg-brand-blue/5 border border-brand-blue/20 p-5 rounded-2xl space-y-4">
                  {isLoadingFeedback ? (
                    <div className="flex flex-col items-center justify-center py-6 gap-3">
                      <RefreshCw className="w-6 h-6 text-brand-blue animate-spin" />
                      <span className="text-xs text-brand-blue font-mono">Analyzing Poise & Vocabulary...</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-brand-green" />
                        <span className="text-xs font-bold text-brand-blue font-mono">AI CRITIQUE LOADED</span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed font-inter">
                        {aiFeedback}
                      </p>
                      <button 
                        onClick={nextQuestion}
                        className="w-full bg-brand-green text-brand-black hover:bg-brand-green/90 font-bold py-3 rounded-xl transition-all text-xs tracking-wider uppercase mt-2 font-mono"
                      >
                        {currentIndex === QUESTIONS.length - 1 ? "FINISH STUDIO SESSION" : "PROCEED TO NEXT CHALLENGE"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Floating Picture-In-Picture User Webcam View */}
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-[96px] right-[24px] z-20 w-32 h-44 bg-[#1E1E2F] border-2 border-brand-blue/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between"
        >
          {isCameraMuted ? (
            <div className="flex-grow flex flex-col items-center justify-center text-gray-500 gap-2">
              <VideoOff className="w-6 h-6 text-white/30" />
              <span className="text-[10px] font-mono tracking-wider font-bold">CAMERA OFF</span>
            </div>
          ) : (
            <div className="w-full h-full relative bg-black">
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
              <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[8px] font-mono tracking-wide text-white border border-white/10">
                USER PIP
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Cinematic Control Dock */}
      <footer className="max-w-md mx-auto w-full bg-[#0F1222]/90 border border-white/10 rounded-full px-6 py-3.5 flex items-center justify-between shadow-2xl relative z-10">
        
        {/* Toggle Mic Button */}
        <button 
          onClick={() => setIsMicMuted(!isMicMuted)}
          className={`p-3 rounded-full border transition-all ${
            isMicMuted 
              ? "bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30" 
              : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
          }`}
        >
          {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Toggle Camera Button */}
        <button 
          onClick={() => setIsCameraMuted(!isCameraMuted)}
          className={`p-3 rounded-full border transition-all ${
            isCameraMuted 
              ? "bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30" 
              : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
          }`}
        >
          {isCameraMuted ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
        </button>

        {/* CV Mock Match upload button */}
        <button 
          onClick={() => alert("📂 CV/Resume uploaded successfully! AI parsing technical alignment parameters.")}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-all"
        >
          <Upload className="w-5 h-5" />
        </button>

        {/* End Call Button */}
        <button 
          onClick={() => setFinished(true)}
          className="p-3 rounded-full bg-red-600 hover:bg-red-500 text-white transition-all shadow-[0_0_12px_rgba(239,68,68,0.5)]"
        >
          <Play className="w-5 h-5 rotate-90" />
        </button>
      </footer>

      {/* Post-Session Performance Analytics Modal */}
      {finished && (
        <div className="fixed inset-0 z-50 bg-[#0B1020]/90 backdrop-blur-md flex items-center justify-center p-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-[#1E1E2F] border-2 border-brand-green/30 p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden"
          >
            {/* Background circular element */}
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-brand-green/10 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center space-y-3">
              <div className="w-24 h-24 rounded-full border-4 border-brand-green/40 mx-auto flex items-center justify-center bg-brand-green/5 shadow-[0_0_16px_rgba(0,230,118,0.2)]">
                <span className="text-3xl font-black text-white font-mono">
                  {Math.round((score / QUESTIONS.length) * 100)}%
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight mt-4">Session Complete!</h2>
              <p className="text-gray-400 text-sm">
                Corporate placement readiness evaluation critique compiled successfully.
              </p>
            </div>

            <div className="bg-white/5 p-5 rounded-2xl space-y-4 border border-white/5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Total Statements:</span>
                <span className="font-bold font-mono">{QUESTIONS.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Good Stance Submissions:</span>
                <span className="font-bold text-brand-green font-mono">{score}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Poise & Gaze Consistency:</span>
                <span className="font-bold text-brand-blue font-mono">High (94%)</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">WPM Speech Energy:</span>
                <span className="font-bold text-yellow-400 font-mono">Balanced</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-brand-green/15 text-brand-green border border-brand-green/20 p-3 rounded-xl">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span className="text-xs leading-relaxed font-semibold">
                You passed corporate baseline standards! Readiness score is high.
              </span>
            </div>

            <button 
              onClick={() => router.push("/dashboard")}
              className="w-full bg-brand-green text-brand-black hover:scale-[1.02] font-black py-4 rounded-2xl transition-all text-sm tracking-widest uppercase font-mono shadow-lg shadow-brand-green/20"
            >
              CLOSE STUDIO
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
