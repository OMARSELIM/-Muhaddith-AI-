export interface Narrator {
  id: string;
  name: string;
  role: string; // e.g., Sahabi, Tabi'i
  status: string; // e.g., Thiqah, Saduq, Da'if
  statusColor: 'green' | 'yellow' | 'red' | 'gray'; // For UI visualization
  deathYear?: string;
  bio: string;
  teachers?: string[];
  students?: string[];
}

export interface HadithAnalysis {
  hadithText: string;
  overallVerdict: string; // e.g., Sahih, Hasan, Da'if
  verdictColor: 'green' | 'yellow' | 'red' | 'gray';
  verdictExplanation: string;
  narrators: Narrator[];
}

export interface ErrorResponse {
  message: string;
}