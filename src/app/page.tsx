import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-xl w-full z-10 text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-lg shadow-pink-600/20 mb-4">
          <span className="text-4xl font-bold text-white tracking-tighter">I</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
          INSPIRE <span className="text-pink-500">CLUB</span>
        </h1>
        
        <p className="text-lg text-slate-400 max-w-md mx-auto">
          Закритий клуб для тих, хто хоче зростати, навчатися та досягати більшого. 
        </p>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://t.me/insidebyinspire_bot"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-pink-600/20 flex items-center justify-center gap-2"
          >
            Оплатити / Долучитися <ArrowRight size={20} />
          </a>
          
          <Link 
            href="/admin/login"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <LogIn size={20} className="text-slate-400" /> Увійти в кабінет
          </Link>
        </div>
        
        <div className="pt-12 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Inspire Club. Всі права захищено.</p>
        </div>
      </div>
    </div>
  );
}
