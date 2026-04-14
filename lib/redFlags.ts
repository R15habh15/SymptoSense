// Red flag symptoms that immediately trigger HIGH urgency
export const RED_FLAGS = [
  "chest_pain",
  "chest_tightness",
  "shortness_of_breath",
  "difficulty_breathing",
  "loss_of_consciousness",
  "fainting",
  "severe_bleeding",
  "coughing_blood",
  "vomiting_blood",
  "stroke_symptoms",
  "sudden_severe_headache",
  "paralysis",
  "face_drooping",
  "arm_weakness",
  "speech_difficulty",
  "severe_chest_pressure",
  "heart_palpitations_severe",
  "anaphylaxis",
  "severe_allergic_reaction",
  "unresponsive",
  "seizure",
  "suicidal_thoughts",
  "severe_abdominal_pain",
  "high_fever_infant",
] as const;

export type RedFlag = (typeof RED_FLAGS)[number];

export function isRedFlag(symptomId: string): boolean {
  return RED_FLAGS.includes(symptomId as RedFlag);
}

export const RED_FLAG_LABELS: Record<string, string> = {
  chest_pain: "Chest Pain",
  chest_tightness: "Chest Tightness",
  shortness_of_breath: "Shortness of Breath",
  difficulty_breathing: "Difficulty Breathing",
  loss_of_consciousness: "Loss of Consciousness",
  fainting: "Fainting",
  severe_bleeding: "Severe Bleeding",
  coughing_blood: "Coughing Blood",
  vomiting_blood: "Vomiting Blood",
  stroke_symptoms: "Stroke Symptoms",
  sudden_severe_headache: "Sudden Severe Headache",
  paralysis: "Paralysis",
  face_drooping: "Face Drooping",
  arm_weakness: "Sudden Arm Weakness",
  speech_difficulty: "Sudden Speech Difficulty",
  severe_chest_pressure: "Severe Chest Pressure",
  heart_palpitations_severe: "Severe Heart Palpitations",
  anaphylaxis: "Anaphylaxis",
  severe_allergic_reaction: "Severe Allergic Reaction",
  unresponsive: "Unresponsive",
  seizure: "Seizure",
  suicidal_thoughts: "Suicidal Thoughts",
  severe_abdominal_pain: "Severe Abdominal Pain",
  high_fever_infant: "High Fever in Infant",
};
