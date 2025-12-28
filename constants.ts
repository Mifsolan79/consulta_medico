import { Schema, Type } from "@google/genai";

export const SYSTEM_INSTRUCTION = `
Eres un asistente farmacéutico virtual experto y amable. Tu objetivo es ayudar a los usuarios a entender qué medicamento de venta libre (OTC) es más adecuado para sus síntomas comunes y qué cuidados adicionales deben tener.

Reglas CRÍTICAS:
1. NUNCA recetes medicamentos con receta (como antibióticos fuertes o estupefacientes). Si el usuario sugiere algo grave, deriva al médico inmediatamente.
2. Aclara siempre el principio activo. Ejemplo: Si recomiendas "Gelocatil", aclara que es "Paracetamol".
3. Explica la diferencia clave. Por ejemplo: "El Ibuprofeno desinflama, el Paracetamol es mejor solo para fiebre/dolor sin inflamación".
4. **PERSONALIZACIÓN VITAL**: Usa los datos del paciente (Edad, Peso, Género) proporcionados.
   - Si es NIÑO: Recomienda presentaciones pediátricas y dosis exactas.
   - Si es MUJER: Ten en cuenta posibles embarazos.
   - Ajusta advertencias según peso y edad.
5. **CUIDADOS NO FARMACOLÓGICOS**: Proporciona siempre consejos prácticos (frío/calor, hidratación, postura, dieta blanda, etc.) que ayuden a aliviar el síntoma sin medicación.
6. El tono debe ser empático, claro y profesional. Responde SIEMPRE en Español.

Estructura tu respuesta estrictamente en JSON.
`;

export const ADVICE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "Un resumen breve y empático de 2-3 frases sobre la situación del usuario y el enfoque general.",
    },
    shouldVisitDoctor: {
      type: Type.BOOLEAN,
      description: "True si los síntomas parecen graves o requieren atención profesional inmediata.",
    },
    recommendations: {
      type: Type.ARRAY,
      description: "Lista de 1 a 3 opciones de medicamentos recomendados.",
      items: {
        type: Type.OBJECT,
        properties: {
          medicineName: { type: Type.STRING, description: "Nombre genérico principal o tipo de medicamento." },
          activeIngredient: { type: Type.STRING, description: "El principio activo (ej. Ibuprofeno, Paracetamol)." },
          matchReason: { type: Type.STRING, description: "Por qué este medicamento es bueno para este síntoma específico." },
          commonBrands: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Marcas comerciales comunes." 
          },
          dosageNote: { type: Type.STRING, description: "Consejo breve sobre la toma, adaptado a la edad/peso." },
          warnings: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Lista de precauciones." 
          },
          type: { 
            type: Type.STRING, 
            enum: ['Analgesic', 'Anti-inflammatory', 'Antibiotic', 'Antihistamine', 'Other'],
            description: "Categoría del medicamento."
          }
        },
        required: ["medicineName", "activeIngredient", "matchReason", "commonBrands", "dosageNote", "warnings", "type"]
      },
    },
    careAdvice: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de 3 a 5 consejos prácticos de cuidado en casa (ej. 'Aplicar hielo local', 'Elevar las piernas', 'Beber mucha agua', 'Evitar luces fuertes').",
    },
    generalDisclaimer: {
      type: Type.STRING,
      description: "Un texto legal breve recordándoles que esto no es una consulta médica oficial.",
    }
  },
  required: ["summary", "recommendations", "careAdvice", "generalDisclaimer", "shouldVisitDoctor"],
};