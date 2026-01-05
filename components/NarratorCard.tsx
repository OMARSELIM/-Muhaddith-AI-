import React from 'react';
import { Narrator } from '../types';
import { User, BookOpen, UserMinus, ShieldCheck, ShieldAlert, HelpCircle } from 'lucide-react';

interface Props {
  narrator: Narrator;
  isLast: boolean;
  index: number;
}

const NarratorCard: React.FC<Props> = ({ narrator, isLast, index }) => {
  const getStatusIcon = (color: string) => {
    switch (color) {
      case 'green': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'yellow': return <ShieldAlert className="w-5 h-5 text-amber-500" />;
      case 'red': return <UserMinus className="w-5 h-5 text-red-500" />;
      default: return <HelpCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getBorderColor = (color: string) => {
    switch (color) {
      case 'green': return 'border-l-emerald-500';
      case 'yellow': return 'border-l-amber-400';
      case 'red': return 'border-l-red-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <div className="relative flex gap-6 pb-12 last:pb-0">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute top-10 right-[1.65rem] bottom-0 w-0.5 bg-gray-200" />
      )}

      {/* Number Badge */}
      <div className="relative z-10 flex-shrink-0">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-[#fdfbf7] shadow-md ${
          narrator.statusColor === 'green' ? 'bg-emerald-100 text-emerald-800' :
          narrator.statusColor === 'yellow' ? 'bg-amber-100 text-amber-800' :
          narrator.statusColor === 'red' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-700'
        }`}>
          <span className="font-serif font-bold text-xl">{index + 1}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className={`flex-grow bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden border-l-4 ${getBorderColor(narrator.statusColor)} transition-all hover:shadow-md`}>
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold font-serif text-gray-900">{narrator.name}</h3>
                {getStatusIcon(narrator.statusColor)}
              </div>
              <p className="text-sm text-gray-500 font-medium">{narrator.role} {narrator.deathYear && `• تـ ${narrator.deathYear}`}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              narrator.statusColor === 'green' ? 'bg-emerald-50 text-emerald-700' :
              narrator.statusColor === 'yellow' ? 'bg-amber-50 text-amber-700' :
              narrator.statusColor === 'red' ? 'bg-red-50 text-red-700' :
              'bg-gray-50 text-gray-600'
            }`}>
              {narrator.status}
            </span>
          </div>
          
          <p className="text-gray-700 leading-relaxed text-sm mb-4 border-t border-gray-50 pt-2 mt-2">
            {narrator.bio}
          </p>

          {(narrator.teachers?.length || narrator.students?.length) ? (
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
              {narrator.teachers && narrator.teachers.length > 0 && (
                <div className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span className="font-bold">روى عن:</span> {narrator.teachers.slice(0, 3).join('، ')}
                </div>
              )}
               {narrator.students && narrator.students.length > 0 && (
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span className="font-bold">روى عنه:</span> {narrator.students.slice(0, 3).join('، ')}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NarratorCard;