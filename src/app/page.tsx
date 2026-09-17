import Link from "next/link";
import { ArrowRight, LogIn, CheckCircle2, Star, Zap, Users, Video } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-slate-200 selection:bg-pink-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-black text-xl tracking-tighter text-white">
            INSPIRE <span className="text-pink-500">CLUB</span>
          </div>
          <Link 
            href="/admin/login"
            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            <LogIn size={16} /> Увійти
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-pink-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            Набір відкрито
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-tight">
            Твоє оточення для <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
              масштабного росту
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Закритий клуб для тих, хто хоче пробити фінансову стелю, отримати покрокові стратегії та знайти однодумців. Почни діяти вже сьогодні.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://t.me/insidebyinspire_bot"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-pink-600/20 flex items-center justify-center gap-2 text-lg"
            >
              Долучитися до клубу <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-950 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Що ви отримаєте?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Тільки практичні знання та інструменти, які приносять реальний результат.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-pink-500/30 transition-colors">
              <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-500 mb-6">
                <Video size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Щотижневі розбори</h3>
              <p className="text-slate-400">Прямі ефіри з розбором ваших ситуацій, помилок та побудовою стратегії на тиждень.</p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-yellow-500/30 transition-colors">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Сильне ком'юніті</h3>
              <p className="text-slate-400">Закритий чат учасників, де ви знайдете партнерів, клієнтів та підтримку однодумців.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/30 transition-colors">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">База знань</h3>
              <p className="text-slate-400">Доступ до бібліотеки матеріалів, записів майстер-класів та корисних гайдів.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[80px] pointer-events-none" />
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
            Готові вийти на новий рівень?
          </h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10">
            Кількість місць обмежена. Приєднуйтесь сьогодні, щоб не пропустити наступний закритий розбір.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <a 
              href="https://t.me/insidebyinspire_bot"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-white text-black hover:bg-slate-200 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-lg"
            >
              Оплатити підписку <ArrowRight size={20} />
            </a>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500 relative z-10">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-500" /> Миттєвий доступ</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-500" /> Скасування будь-коли</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Inspire Club. Всі права захищено.</p>
      </footer>
    </div>
  );
}
