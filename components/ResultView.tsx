import React from 'react';
import { HadithAnalysis } from '../types';
import NarratorCard from './NarratorCard';
import { Quote, ScrollText, CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

interface Props {
  data: HadithAnalysis;
  onReset: () => void;
}

const ResultView: React.FC<Props> = ({ data, onReset }) => {
  const getVerdictBadge = () => {
    switch (data.verdictColor) {
      case 'green':
        return (
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-bold text-lg">صحيح / مقبول</span>
          </div>
        );
      case 'yellow':
        return (
          <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-4 py-2 rounded-lg border border-amber-100">
            <AlertTriangle className="w-6 h-6" />
            <span className="font-bold text-lg">حسن / فيه مقال</span>
          </div>
        );
      case 'red':
        return (
          <div className="flex items-center gap-2 text-red-700 bg-red-50 px-4 py-2 rounded-lg border border-red-100">
            <XCircle className="w-6 h-6" />
            <span className="font-bold text-lg">ضعيف / مردود</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
            <Info className="w-6 h-6" />
            <span className="font-bold text-lg">غير محدد</span>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      {/* Header Result Card */}
      <div className="bg-white rounded-2xl shadow-lg border-t-8 border-t-emerald-800 overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-3xl font-serif font-bold text-gray-800">نتيجة دراسة السند</h2>
            {getVerdictBadge()}
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-6 relative">
            <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-200 rotate-180" />
            <p className="text-gray-700 font-serif text-xl leading-loose text-center px-6">
              {data.hadithText.length > 300 ? data.hadithText.substring(0, 300) + "..." : data.hadithText}
            </p>
          </div>

          <div className="prose prose-lg text-gray-600 max-w-none">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <ScrollText className="w-5 h-5" />
              ملخص الحكم:
            </h3>
            <p>{data.verdictExplanation}</p>
          </div>
        </div>
        <div className="bg-emerald-900/5 p-4 text-center border-t border-emerald-900/10">
          <p className="text-xs text-gray-500">
            تنبيه: هذا التحليل تم بواسطة الذكاء الاصطناعي وقد يحتمل الخطأ. يرجى مراجعة المصادر الأصلية للتحقق النهائي.
          </p>
        </div>
      </div>

      {/* The Chain Visualizer */}
      <div className="relative">
        <h3 className="text-2xl font-serif font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3">
          <div className="h-px bg-gray-300 w-16"></div>
          سلسلة الرواة (الإسناد)
          <div className="h-px bg-gray-300 w-16"></div>
        </h3>

        <div className="space-y-0 px-4 md:px-0">
          {data.narrators.map((narrator, index) => (
            <NarratorCard 
              key={narrator.id || index} 
              narrator={narrator} 
              index={index}
              isLast={index === data.narrators.length - 1} 
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-8 pb-20">
        <button
          onClick={onReset}
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <ScrollText className="w-5 h-5" />
          دراسة حديث آخر
        </button>
      </div>
    </div>
  );
};

export default ResultView;