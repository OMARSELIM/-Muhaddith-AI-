import React, { useState } from 'react';
import { Search, Loader2, Sparkles, BookOpenCheck } from 'lucide-react';
import { analyzeHadithText } from './services/geminiService';
import { HadithAnalysis } from './types';
import ResultView from './components/ResultView';

function App() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<HadithAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeHadithText(inputText);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء تحليل الحديث. يرجى المحاولة مرة أخرى أو التأكد من النص المدخل.");
    } finally {
      setIsLoading(false);
    }
  };

  const exampleText = `حدثنا عبد الله بن يوسف أخبرنا مالك عن نافع عن عبد الله بن عمر رضي الله عنهما أن رسول الله صلى الله عليه وسلم قال : صلاة الجماعة تفضل صلاة الفذ بسبع وعشرين درجة`;

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-[#fdfbf7]">
      {/* Header */}
      <header className="bg-emerald-950 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-800 p-2 rounded-lg">
              <BookOpenCheck className="w-8 h-8 text-gold-400" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-gold-400">المحدث الذكي</h1>
              <p className="text-xs text-emerald-200">أداة مساعدة لدراسة الأسانيد</p>
            </div>
          </div>
          <a href="#" className="hidden md:block text-emerald-200 hover:text-white transition-colors text-sm">عن البرنامج</a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {!result ? (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-emerald-900 mb-6 leading-tight">
                دراسة الأسانيد ومعرفة <br />
                <span className="text-emerald-700">أحوال الرجال</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                أدخل نص الحديث مع السند، وسيقوم الذكاء الاصطناعي بتحليل سلسلة الرواة وتوضيح حال كل راوٍ والحكم العام على الحديث.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-2 md:p-6 transition-all hover:shadow-2xl">
              <div className="relative">
                <textarea
                  className="w-full h-48 p-4 md:p-6 text-lg border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none bg-gray-50 placeholder-gray-400"
                  placeholder="ضع نص الحديث هنا..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  dir="rtl"
                />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <button 
                    onClick={() => setInputText(exampleText)}
                    className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full transition-colors"
                  >
                    تجربة مثال
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex flex-col md:flex-row gap-4 items-center justify-between px-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Sparkles className="w-4 h-4 text-gold-500" />
                  <span>مدعوم بنموذج Gemini 3 Pro للتحليل العميق</span>
                </div>
                
                <button
                  onClick={handleAnalyze}
                  disabled={isLoading || !inputText.trim()}
                  className={`
                    w-full md:w-auto px-8 py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105
                    ${isLoading || !inputText.trim() 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-lg hover:shadow-emerald-900/20'}
                  `}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      جاري التحليل...
                    </>
                  ) : (
                    <>
                      <Search className="w-6 h-6" />
                      دراسة السند
                    </>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-3 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                {error}
              </div>
            )}
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-gray-600">
              <div className="p-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-700">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">استخراج الرواة</h3>
                <p className="text-sm">تحديد أسماء الرواة بدقة وتمييز طبقاتهم.</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-700">
                  <BookOpenCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">الجرح والتعديل</h3>
                <p className="text-sm">بيان حال الراوي من الثقة والضعف.</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-700">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">الحكم العام</h3>
                <p className="text-sm">نتيجة استقرائية لصحة السند.</p>
              </div>
            </div>
          </div>
        ) : (
          <ResultView data={result} onReset={() => setResult(null)} />
        )}
      </main>

      <footer className="bg-emerald-950 text-emerald-400 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-serif text-lg mb-2">المحدث الذكي &copy; {new Date().getFullYear()}</p>
          <p className="text-sm opacity-60">
            تم تطوير هذا البرنامج لخدمة طلبة العلم، ولا يغني عن الرجوع للعلماء والكتب المتخصصة.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;