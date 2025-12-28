export interface MedicationRecommendation {
  medicineName: string;
  activeIngredient: string;
  matchReason: string;
  commonBrands: string[];
  dosageNote: string;
  warnings: string[];
  type: 'Analgesic' | 'Anti-inflammatory' | 'Antibiotic' | 'Antihistamine' | 'Other';
}

export interface AdviceResponse {
  summary: string;
  recommendations: MedicationRecommendation[];
  careAdvice: string[];
  generalDisclaimer: string;
  shouldVisitDoctor: boolean;
}

export interface PatientProfile {
  age: string;
  gender: 'Hombre' | 'Mujer' | 'Otro';
  weight: string;
}

export interface SymptomInputProps {
  onSubmit: (symptoms: string) => void;
  isLoading: boolean;
}

export interface RecommendationCardProps {
  data: MedicationRecommendation;
}