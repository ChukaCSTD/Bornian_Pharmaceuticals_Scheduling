(() => {
  // Utility functions
  const $ = (selector) => document.querySelector(selector);

  // Data (symptoms remain the same)
  const symptoms = {
    'Headache': { diagnosis: 'Tension headache', prescription: 'Ibuprofen' },
    'Chest pain': { diagnosis: 'Possible angina', prescription: 'Nitroglycerin' },
    'Fever': { diagnosis: 'Possible infection', prescription: 'Antibiotics' },
    'Cough': { diagnosis: 'Cold or flu', prescription: 'Acetaminophen' },
    'Stomachache': { diagnosis: 'Indigestion', prescription: 'Antacids' },
    'Back pain': { diagnosis: 'Muscle strain', prescription: 'Pain relievers' },
    'Sore throat': { diagnosis: 'Strep throat', prescription: 'Antibiotics' },
    'Malaria': { diagnosis: 'Malaria management', prescription: 'Antimalarial drugs' },
    'Covid': { diagnosis: 'Possible Covid-19', prescription: 'Pfizer or Johnson & Johnson\'s vaccine' },
    'Ebola': { diagnosis: 'Ebola management', prescription: 'Ebola vaccine' },
    'Diarrhea': { diagnosis: 'Gastroenteritis', prescription: 'Loperamide' },
    'Skin rash': { diagnosis: 'Eczema', prescription: 'Corticosteroids' },
    'Blurred vision': { diagnosis: 'Glaucoma', prescription: 'Eye drops' },
    'Seizures': { diagnosis: 'Epilepsy', prescription: 'Antiepileptic drugs' },
    'Heart palpitations': { diagnosis: 'Palpitations', prescription: 'Beta-blockers medication' },
    'Severe allergic reaction': { diagnosis: 'Anaphylaxis', prescription: 'Epinephrine' },
    'Severe bleeding': { diagnosis: 'Bleeding disorders', prescription: 'Blood transfusion' },
    'Severe pain': { diagnosis: 'Body pain', prescription: 'Pain relievers' },
    'Vomiting': { diagnosis: 'Possible food poisoning', prescription: 'Antiemetics' },
    'Severe cough': { diagnosis: 'Possible tuberculosis', prescription: 'Cough suppressants' },
    'Knee pain': { diagnosis: 'Knee pain management', prescription: 'Pain relievers' },
    'Cold': { diagnosis: 'Cold management', prescription: 'Acetaminophen' },
    'Flu': { diagnosis: 'Flu management', prescription: 'Antiviral drugs' },
    'Diabetes': { diagnosis: 'Diabetes management', prescription: 'Insulin' },
    'High blood pressure': { diagnosis: 'High blood pressure management', prescription: 'Blood pressure medication' },
    'Heart attack': { diagnosis: 'Heart attack management', prescription: 'Blood pressure medication' },
    'Stroke': { diagnosis: 'Stroke management', prescription: 'Blood pressure medication' },
    'Asthma': { diagnosis: 'Asthma management', prescription: 'Inhaled corticosteroids' },
  };

  // Components
  const EmergencyForm = () => `
    <form id="emergencyForm" class="space-y-4">
      <select id="symptomSelect" class="w-full p-2 border rounded">
        <option value="">Select a symptom</option>
        ${Object.keys(symptoms).map(s => `<option value="${s}">${s}</option>`).join('')}
      </select>
      <button type="submit" class="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors">Get Emergency Diagnosis</button>
    </form>
  `;

  const DiagnosisResult = (symptom, diagnosis, prescription) => `
    <div class="mt-8 p-4 bg-white rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Emergency Diagnosis</h2>
      <p><strong>Symptom:</strong> ${symptom}</p>
      <p><strong>Diagnosis:</strong> ${diagnosis}</p>
      <p><strong>Prescribed medication:</strong> ${prescription}</p>
      <p class="mt-4 text-sm text-gray-600">Please purchase this medication from our pharmacy. If symptoms persist or worsen, please consult a physician immediately.</p>
    </div>
  `;

  // Event handlers
  const handleEmergencySubmit = (e) => {
    e.preventDefault();
    const symptom = $('#symptomSelect').value;
    
    if (!symptom) {
      alert('Please select a symptom.');
      return;
    }
    
    const { diagnosis, prescription } = symptoms[symptom];
    
    $('#diagnosisResult').innerHTML = DiagnosisResult(symptom, diagnosis, prescription);
  };

  // Initialization
  const init = () => {
    $('.content-wrapper').innerHTML = `
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-center text-red-800">Emergency Diagnosis</h1>
      <div class="max-w-md mx-auto">
        <p class="mb-4 text-gray-700">Select your primary symptom for an emergency diagnosis and prescription.</p>
        ${EmergencyForm()}
        <div id="diagnosisResult"></div>
      </div>
    `;

    $('#emergencyForm').addEventListener('submit', handleEmergencySubmit);
  };

  // Start the application
  init();
})();
