export interface HindiMedicineTranslation {
  genericName: string;
  alternativeName?: string;
  pediatricDose: string;
  ageRestriction?: string;
  dosageForm: string;
  availableStrength: string;
  pregnancyPrecautions?: string;
  diabetesPrecautions?: string;
  hypertensionPrecautions?: string;
  otherPrecautions?: string;
  routes: string[];
}

export const MEDICINE_TRANSLATIONS_HI: Record<
  string,
  HindiMedicineTranslation
> = {
  '01': {
    genericName: 'एसीक्लोफेनाक',
    pediatricDose:
      '12 वर्ष से कम बच्चों में अनुशंसित नहीं; ऑफ-लेबल: 3-5 mg/kg/day, 2 विभाजित खुराकों में',
    ageRestriction: '12 वर्ष से कम बच्चों में अनुशंसित नहीं',
    dosageForm: 'टैबलेट',
    availableStrength: '100 mg',
    pregnancyPrecautions:
      'वर्जित (विशेषकर तीसरी तिमाही में - समय से पहले डक्टस बंद होना, ओलिगोहाइड्राम्नियोस)',
    hypertensionPrecautions:
      'बचें/सावधानी (द्रव/सोडियम रुकना, एंटीहाइपरटेंसिव दवाओं का प्रभाव कम होना)',
    otherPrecautions:
      'बाल चिकित्सा में ऑफ-लेबल उपयोग। किडनी की कार्यक्षमता और जठरांत्र संबंधी सहनशीलता की निगरानी करें।',
    routes: ['मुंह से'],
  },

  '02': {
    genericName: 'एड्रेनालिन',
    alternativeName: 'एपिनेफ्रिन',
    pediatricDose:
      'एनाफिलैक्सिस/कार्डियक अरेस्ट: 0.01 mg/kg या 1:1000 का 0.01 ml/kg IM/SC, अधिकतम 0.5 mg; IV: 1:10,000 का 0.01 mg/kg',
    dosageForm: 'इंजेक्शन',
    availableStrength: '1 mg/ml (1:1000)',
    hypertensionPrecautions:
      'सापेक्ष निषेध/सावधानी (गंभीर तीव्र रक्तचाप बढ़ना)',
    diabetesPrecautions:
      'सावधानी (ग्लाइकोजनोलिसिस और तीव्र हाइपरग्लाइसीमिया कर सकता है)',
    otherPrecautions:
      'उच्च-सतर्कता वाली आपातकालीन पुनर्जीवन दवा। एनाफिलैक्सिस में जांघ के बाहरी-पार्श्व भाग में IM देना प्राथमिकता है। IV के लिए 1:10,000 तक dilute करना आवश्यक है।',
    routes: ['IM', 'SC', 'IV'],
  },

  '03': {
    genericName: 'एल्बेंडाजोल',
    pediatricDose:
      '> 2 वर्ष: 400 mg एकल खुराक; 1-2 वर्ष: 200 mg एकल खुराक [सिस्टमिक कृमि संक्रमण में लगभग 10-15 mg/kg]',
    ageRestriction:
      '1-2 वर्ष: 200 mg एकल खुराक; > 2 वर्ष: 400 mg एकल खुराक',
    dosageForm: 'टैबलेट',
    availableStrength: '400 mg',
    pregnancyPrecautions:
      'पहली तिमाही में वर्जित (भ्रूण पर हानिकारक प्रभाव का जोखिम)',
    otherPrecautions:
      'छोटे बच्चों में टैबलेट को निगलने से पहले चबाएं या कुचलकर दें।',
    routes: ['मुंह से'],
  },

  '04': {
    genericName: 'एमिकासिन',
    pediatricDose:
      '15-20 mg/kg/day IV/IM, दिन में एक बार या q12h में विभाजित; नवजात: 15 mg/kg लोडिंग, फिर 10 mg/kg q24h',
    dosageForm: 'इंजेक्शन',
    availableStrength: '100 mg, 250 mg, 500 mg',
    pregnancyPrecautions:
      'वर्जित/बचें (भ्रूण में कान और किडनी को नुकसान का जोखिम)',
    otherPrecautions:
      'उच्च-जोखिम वाली एमिनोग्लाइकोसाइड दवा। पर्याप्त hydration रखें, प्रारंभिक renal function जांचें और श्रवण विषाक्तता की निगरानी करें।',
    routes: ['IV', 'IM'],
  },

  '05': {
    genericName: 'एम्लोडिपिन / एम्लोडिपिन बेसिलेट',
    alternativeName: 'एम्लोडिपिन बेसिलेट',
    pediatricDose:
      '0.1-0.3 mg/kg/day मुंह से दिन में एक बार, अधिकतम 0.6 mg/kg/day और 5-10 mg तक',
    dosageForm: 'टैबलेट',
    availableStrength: '5 mg, 10 mg',
    pregnancyPrecautions:
      'जब तक विकल्प उपलब्ध न हों, बचें (CCB)',
    hypertensionPrecautions: 'मुख्य उपयोग; मधुमेह में सुरक्षित',
    diabetesPrecautions: 'मधुमेह में सुरक्षित',
    routes: ['मुंह से'],
  },

  '06': {
    genericName: 'एमोक्सिसिलिन',
    pediatricDose:
      'हल्के-मध्यम संक्रमण: 25-50 mg/kg/day, q8h या q12h में विभाजित; गंभीर/ओटाइटिस: 80-90 mg/kg/day',
    dosageForm: 'कैप्सूल',
    availableStrength: '250 mg, 500 mg',
    pregnancyPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    diabetesPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    hypertensionPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    otherPrecautions:
      'उपचार शुरू करने से पहले पेनिसिलिन से एलर्जी की जांच करें।',
    routes: ['मुंह से'],
  },

  '07': {
    genericName: 'एमोक्सीक्लैव',
    alternativeName: 'एमोक्सिसिलिन + पोटैशियम क्लैवुलानेट',
    pediatricDose:
      'एमोक्सिसिलिन घटक के आधार पर 30-50 mg/kg/day, q8h या q12h में विभाजित; उच्च खुराक: 80-90 mg/kg/day',
    dosageForm: 'टैबलेट',
    availableStrength: '625 mg',
    pregnancyPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    diabetesPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    hypertensionPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    otherPrecautions:
      'अवशोषण बेहतर करने और पेट की परेशानी कम करने के लिए भोजन के साथ दें।',
    routes: ['मुंह से'],
  },

  '08': {
    genericName: 'एम्पिसिलिन',
    pediatricDose:
      'मुंह से: 50-100 mg/kg/day q6h में विभाजित; IV/IM: 100-200 mg/kg/day q6h में विभाजित, मेनिन्जाइटिस में अधिकतम 400 mg/kg/day',
    dosageForm: 'कैप्सूल',
    availableStrength: '500 mg',
    pregnancyPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    diabetesPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    hypertensionPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    otherPrecautions:
      'ओरल कैप्सूल भोजन से 1 घंटा पहले खाली पेट दें।',
    routes: ['मुंह से', 'IV', 'IM'],
  },

  '09': {
    genericName: 'एस्पिरिन',
    alternativeName: 'गैस्ट्रो-रेजिस्टेंट',
    pediatricDose:
      'सूजन-रोधी: 60-80 mg/kg/day q6h में विभाजित; एंटीप्लेटलेट: 3-5 mg/kg/day; वायरल बुखार में Reye syndrome के कारण बचें',
    ageRestriction:
      'वायरल बुखार/16 वर्ष से कम बच्चों में Reye syndrome के जोखिम के कारण बचें',
    dosageForm: 'टैबलेट',
    availableStrength: '75 mg',
    pregnancyPrecautions:
      'तीसरी तिमाही में उच्च/पूर्ण खुराक वर्जित (भ्रूण/मातृ रक्तस्राव, डक्टस बंद होने का जोखिम)',
    hypertensionPrecautions:
      'अनियंत्रित उच्च रक्तचाप में अत्यधिक सावधानी (इंट्राक्रेनियल रक्तस्राव का जोखिम)',
    otherPrecautions:
      'चिकनपॉक्स, इन्फ्लुएंजा या अज्ञात कारण के बुखार वाले बच्चों में न दें (Reye syndrome का खतरा)।',
    routes: ['मुंह से'],
  },

  '10': {
    genericName: 'एटेनोलोल',
    pediatricDose:
      '0.5-1 mg/kg/day मुंह से दिन में एक बार या q12h में विभाजित, अधिकतम 2 mg/kg/day',
    dosageForm: 'टैबलेट',
    availableStrength: '50 mg',
    pregnancyPrecautions:
      'वर्जित/बचें (IUGR, भ्रूण में ब्रैडीकार्डिया, प्लेसेंटल रक्त प्रवाह कम होना)',
    diabetesPrecautions:
      'सावधानी (टैकीकार्डिया जैसे hypoglycemia के चेतावनी संकेतों को छिपा सकता है)',
    hypertensionPrecautions:
      'कार्डियोसेलेक्टिव बीटा-ब्लॉकर। हृदय गति और रक्तचाप की नजदीकी निगरानी करें।',
    otherPrecautions:
      'अचानक दवा बंद करने से टैकीकार्डिया या उच्च रक्तचाप बढ़ सकता है।',
    routes: ['मुंह से'],
  },

  '11': {
    genericName: 'एट्रोपिन सल्फेट',
    pediatricDose:
      '0.01-0.02 mg/kg IV/IM/SC, न्यूनतम 0.1 mg, अधिकतम एकल खुराक 0.5 mg; ऑर्गेनोफॉस्फेट विषाक्तता: 0.05-0.1 mg/kg हर 15 मिनट',
    dosageForm: 'इंजेक्शन',
    availableStrength: '0.6 mg/ml',
    hypertensionPrecautions:
      'सावधानी (अधिक टैकीकार्डिया और हृदय पर अधिक कार्यभार)',
    otherPrecautions:
      'न्यूनतम एकल खुराक 0.1 mg रखें (छोटी खुराक से विरोधाभासी ब्रैडीकार्डिया हो सकता है)। ऑर्गेनोफॉस्फेट विषाक्तता में एट्रोपिनाइजेशन के लक्षणों के अनुसार खुराक समायोजित करें।',
    routes: ['IV', 'IM', 'SC'],
  },

  '12': {
    genericName: 'एज़िथ्रोमाइसिन',
    pediatricDose:
      '10 mg/kg/day मुंह से दिन में एक बार 3-5 दिनों तक; स्ट्रेप फैरिंजाइटिस: 12 mg/kg/day 5 दिनों तक',
    dosageForm: 'ओरल सस्पेंशन',
    availableStrength: 'बाल चिकित्सा ओरल सस्पेंशन (CHC स्टॉक)',
    pregnancyPrecautions:
      'चिकित्सकीय रूप से आवश्यक होने पर सामान्यतः सुरक्षित',
    diabetesPrecautions:
      'चिकित्सकीय रूप से आवश्यक होने पर सामान्यतः सुरक्षित',
    hypertensionPrecautions:
      'चिकित्सकीय रूप से आवश्यक होने पर सामान्यतः सुरक्षित',
    otherPrecautions:
      'भोजन से 1 घंटा पहले या भोजन के 2 घंटे बाद दें। ऊतकों में लंबा आधा-जीवन होने के कारण कम अवधि का उपचार संभव है।',
    routes: ['मुंह से'],
  },

  '13': {
    genericName: 'बेटाहिस्टीन डाइहाइड्रोक्लोराइड',
    pediatricDose:
      'बाल चिकित्सा आयु वर्ग में खुराक स्थापित/अनुशंसित नहीं है',
    ageRestriction:
      'बाल चिकित्सा में स्थापित/अनुशंसित नहीं',
    dosageForm: 'टैबलेट',
    availableStrength: '8 mg',
    pregnancyPrecautions:
      'बचें (पर्याप्त नैदानिक सुरक्षा डेटा उपलब्ध नहीं)',
    routes: ['मुंह से'],
  },

  '14': {
    genericName: 'बेटामेथासोन',
    pediatricDose:
      '0.0175-0.25 mg/kg/day मुंह से, हर 6-12 घंटे में विभाजित खुराकों में [सूजन-रोधी]',
    dosageForm: 'टैबलेट',
    availableStrength: '0.5 mg',
    diabetesPrecautions:
      'सापेक्ष निषेध/सावधानी (स्टेरॉयड से हाइपरग्लाइसीमिया हो सकता है)',
    hypertensionPrecautions:
      'सावधानी (कॉर्टिकोस्टेरॉयड से द्रव और सोडियम रुक सकता है)',
    otherPrecautions:
      'शक्तिशाली प्रणालीगत कॉर्टिकोस्टेरॉयड। लंबे समय तक उपचार में वृद्धि की निगरानी करें।',
    routes: ['मुंह से'],
  },

  '15': {
    genericName: 'बिसाकोडिल',
    pediatricDose:
      '6 वर्ष से अधिक बच्चे: 5 mg [लगभग 0.2-0.3 mg/kg एकल खुराक]; शिशुओं में बचें',
    ageRestriction:
      '6 वर्ष से अधिक बच्चे: 5 mg; शिशुओं में उपयोग से बचें',
    dosageForm: 'टैबलेट',
    availableStrength: '5 mg',
    pregnancyPrecautions:
      'अल्पकालिक उपयोग स्वीकार्य; गर्भावस्था में लंबे समय तक उपयोग से बचें',
    otherPrecautions:
      'पानी के साथ पूरी गोली निगलें; गोली को कुचलें नहीं और दूध/एंटासिड के साथ न लें।',
    routes: ['मुंह से'],
  },

  '16': {
    genericName: 'ब्रोमहेक्सिन + ग्वाइफेनेसिन + टरब्यूटालिन',
    alternativeName: 'खांसी की एक्सपेक्टोरेंट फॉर्मूलेशन',
    pediatricDose:
      'टरब्यूटालिन: 0.075-0.1 mg/kg/dose दिन में 3 बार; ब्रोमहेक्सिन: 0.3-0.5 mg/kg/day विभाजित खुराकों में',
    dosageForm: 'सिरप',
    availableStrength: '(4 + 50 + 1.25) mg / 5 ml',
    hypertensionPrecautions:
      'टरब्यूटालिन के साथ सावधानी (टैकीकार्डिया और उच्च रक्तचाप का जोखिम)',
    diabetesPrecautions:
      'सावधानी (बीटा-2 एगोनिस्ट रक्त शर्करा बढ़ा सकता है)',
    otherPrecautions:
      'इसमें सिम्पैथोमिमेटिक ब्रोंकोडायलेटर है। हृदय गति की निगरानी करें।',
    routes: ['मुंह से'],
  },

  '17': {
    genericName: 'बुडेसोनाइड',
    alternativeName: 'नेब्युलाइज़र सस्पेंशन',
    pediatricDose:
      'नेब्युलाइज़र सस्पेंशन: 0.25-0.5 mg प्रति नेब्युलाइजेशन दिन में 1-2 बार; तीव्र क्रूप: 2 mg एकल खुराक',
    dosageForm: 'रेस्पिरेटरी सस्पेंशन',
    availableStrength: '0.5 mg रेस्प्यूल',
    pregnancyPrecautions:
      'इनहेलेशन द्वारा सामान्यतः सुरक्षित; शरीर में अवशोषण कम',
    otherPrecautions:
      'स्थानीय थ्रश/आवाज में बदलाव से बचने के लिए नेब्युलाइजेशन के बाद मुंह या चेहरा धोएं।',
    routes: ['इनहेलेशन'],
  },

  '18': {
    genericName: 'कैल्शियम और विटामिन D3',
    pediatricDose:
      'एलिमेंटल कैल्शियम: 40-50 mg/kg/day विभाजित खुराकों में; विटामिन D3: 400-800 IU/day',
    dosageForm: 'टैबलेट',
    availableStrength: '500 mg + 250 IU',
    pregnancyPrecautions:
      'कोई मानक निषेध नहीं; इन स्थितियों में सामान्यतः सुरक्षित',
    diabetesPrecautions:
      'इन स्थितियों में सामान्यतः सुरक्षित',
    hypertensionPrecautions:
      'इन स्थितियों में सामान्यतः सुरक्षित',
    routes: ['मुंह से'],
  },

  '19': {
    genericName: 'कैल्शियम ग्लूकोनेट',
    pediatricDose:
      'हाइपोकैल्सीमिया/कार्डियक अरेस्ट: 100 mg/kg/dose [10% सॉल्यूशन का 1 ml/kg] धीमे IV से 5-10 मिनट में, अधिकतम 10 ml',
    dosageForm: 'इंजेक्शन',
    availableStrength: '100 mg/ml (9.3 mg एलिमेंटल कैल्शियम)',
    otherPrecautions:
      'उचित संकेत होने पर सुरक्षित; हृदय रोगियों में सावधानीपूर्वक निगरानी करें। धीमे IV से दें (एक्स्ट्रावैसेशन से ऊतक क्षति हो सकती है)।',
    routes: ['IV'],
  },

  '20': {
    genericName: 'सेफिक्सिम / सेफिक्सिम डिस्पर्सिबल',
    alternativeName: 'सेफिक्सिम डिस्पर्सिबल',
    pediatricDose:
      '8 mg/kg/day मुंह से दिन में एक बार या हर 12 घंटे में विभाजित, अधिकतम 400 mg/day',
    dosageForm: 'टैबलेट',
    availableStrength: '100 mg, 200 mg (डिस्पर्सिबल)',
    pregnancyPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    diabetesPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    hypertensionPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    routes: ['मुंह से'],
  },
  '21': {
    genericName: 'सेफोटैक्सिम',
    pediatricDose:
      '100-150 mg/kg/day IV/IM, हर 6-8 घंटे में विभाजित; गंभीर संक्रमण/मेनिन्जाइटिस: 200 mg/kg/day',
    dosageForm: 'इंजेक्शन',
    availableStrength: '500 mg, 1000 mg',
    pregnancyPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    diabetesPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    hypertensionPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    otherPrecautions:
      'नवजात सेप्सिस और मेनिन्जाइटिस में उपयोग की जाने वाली तीसरी पीढ़ी की सेफालोस्पोरिन दवा।',
    routes: ['IV', 'IM'],
  },

  '22': {
    genericName: 'सेफ्ट्रियाक्सोन',
    pediatricDose:
      '50-75 mg/kg/day IV/IM दिन में एक बार या हर 12 घंटे में विभाजित; मेनिन्जाइटिस: 100 mg/kg/day, अधिकतम 4 g/day',
    dosageForm: 'इंजेक्शन',
    availableStrength: '500 mg, 1000 mg',
    pregnancyPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    diabetesPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    hypertensionPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    otherPrecautions:
      'हाइपरबिलीरुबिनेमिया वाले नवजातों या साथ में IV कैल्शियम इन्फ्यूजन लेने वाले नवजातों में बचें।',
    routes: ['IV', 'IM'],
  },

  '23': {
    genericName: 'सेटिरीज़िन HCl',
    pediatricDose:
      '0.25 mg/kg/day मुंह से दिन में एक बार; 2-6 वर्ष: 2.5-5 mg/day; > 6 वर्ष: 5-10 mg/day',
    ageRestriction:
      '2-6 वर्ष: 2.5-5 mg/day; > 6 वर्ष: 5-10 mg/day',
    dosageForm: 'टैबलेट',
    availableStrength: '10 mg',
    pregnancyPrecautions:
      'आवश्यक होने पर सामान्यतः सुरक्षित/स्वीकार्य',
    routes: ['मुंह से'],
  },

  '24': {
    genericName: 'क्लोरैम्फेनिकॉल',
    alternativeName: 'नेत्र मरहम',
    pediatricDose:
      'नेत्र संबंधी स्थानीय उपयोग: 1 सेमी पट्टी दिन में 3-4 बार लगाएं; नवजातों में प्रणालीगत उपयोग वर्जित - ग्रे बेबी सिंड्रोम',
    ageRestriction:
      'नवजातों में प्रणालीगत उपयोग वर्जित (ग्रे बेबी सिंड्रोम)',
    dosageForm: 'मरहम',
    availableStrength: '1% w/v',
    pregnancyPrecautions:
      'गर्भावस्था: प्रसव के आसपास सावधानी (सिस्टम में अवशोषण कम, लेकिन ग्रे बेबी सिंड्रोम का सैद्धांतिक जोखिम)',
    otherPrecautions:
      'प्रणालीगत उपयोग से बोन मैरो दमन और अप्लास्टिक एनीमिया का जोखिम होता है। स्थानीय उपयोग को प्राथमिकता दें।',
    routes: ['नेत्र संबंधी'],
  },

  '25': {
    genericName: 'क्लोरफेनिरामाइन मेलिएट',
    pediatricDose:
      '0.1-0.2 mg/kg/dose धीमे IV/IM/SC से, दिन में 3-4 बार विभाजित; अधिकतम 12 mg/day',
    dosageForm: 'इंजेक्शन',
    availableStrength: '10 mg/ml',
    otherPrecautions:
      'उचित चिकित्सकीय सावधानी के साथ सामान्यतः स्वीकार्य। नींद और एंटीमस्कैरिनिक प्रभाव हो सकते हैं।',
    routes: ['IV', 'IM', 'SC'],
  },

  '26': {
    genericName: 'सिनारिज़िन',
    pediatricDose:
      '5 वर्ष से अधिक: 0.5-1 mg/kg/dose या 12.5 mg हर 8 घंटे; छोटे शिशुओं में अनुशंसित नहीं',
    ageRestriction:
      '5 वर्ष से अधिक; छोटे शिशुओं में अनुशंसित नहीं',
    dosageForm: 'टैबलेट',
    availableStrength: '25 mg',
    pregnancyPrecautions:
      'गर्भावस्था में बचें (मानव गर्भावस्था में सुरक्षा संबंधी सीमित जानकारी)',
    routes: ['मुंह से'],
  },

  '27': {
    genericName: 'सिप्रोफ्लॉक्सासिन',
    pediatricDose:
      'मुंह से: 20-30 mg/kg/day हर 12 घंटे में विभाजित; IV: 10-20 mg/kg/day हर 12 घंटे में विभाजित, अधिकतम 800-1000 mg/day',
    dosageForm: 'टैबलेट',
    availableStrength: '250 mg',
    pregnancyPrecautions:
      'वर्जित/बचें (भ्रूण में उपास्थि क्षति/आर्थ्रोपैथी का जोखिम)',
    otherPrecautions:
      'जटिल संक्रमणों में सुरक्षित विकल्प प्रभावी न होने पर ही उपयोग के लिए सुरक्षित रखें, क्योंकि आर्थ्रोपैथी का सैद्धांतिक जोखिम है।',
    routes: ['मुंह से', 'IV'],
  },

  '28': {
    genericName: 'क्लिंडामाइसिन हाइड्रोक्लोराइड',
    pediatricDose:
      'मुंह से: 10-25 mg/kg/day हर 6 या 8 घंटे में विभाजित; IV/IM: 20-40 mg/kg/day हर 6-8 घंटे में विभाजित',
    dosageForm: 'कैप्सूल',
    availableStrength: '150 mg',
    otherPrecautions:
      'चिकित्सकीय रूप से आवश्यक होने पर सामान्यतः स्वीकार्य। गंभीर दस्त/स्यूडोमेम्ब्रेनस कोलाइटिस की निगरानी करें।',
    routes: ['मुंह से', 'IV', 'IM'],
  },

  '29': {
    genericName: 'क्लोपिडोग्रेल',
    pediatricDose:
      'बाल चिकित्सा एंटीप्लेटलेट उपयोग: 0.2 mg/kg/day मुंह से दिन में एक बार, अधिकतम 1 mg/kg/day या 75 mg/day',
    dosageForm: 'टैबलेट',
    availableStrength: '75 mg',
    pregnancyPrecautions:
      'जब तक विशेष रूप से आवश्यक न हो, बचें (मातृ रक्तस्राव का बढ़ा हुआ जोखिम)',
    otherPrecautions:
      'प्लेटलेट एकत्रीकरण को रोकने वाली दवा। रक्तस्राव या आसानी से नीला पड़ने के संकेतों की निगरानी करें।',
    routes: ['मुंह से'],
  },

  '30': {
    genericName: 'क्लोट्रिमाज़ोल',
    alternativeName: 'योनि पेसरी / टैबलेट',
    pediatricDose:
      'यौवन-पूर्व बच्चों में सामान्यतः संकेतित नहीं; यौवन के बाद: 100 mg पेसरी प्रतिदिन 6 दिनों तक या 500 mg एकल खुराक',
    ageRestriction:
      'यौवन-पूर्व बच्चों में सामान्यतः संकेतित नहीं; यौवन के बाद उपयोग',
    dosageForm: 'पेसरी',
    availableStrength: '500 mg',
    pregnancyPrecautions:
      'गर्भावस्था में स्थानीय उपयोग सामान्यतः स्वीकार्य; चिकित्सकीय आवश्यकता के अनुसार उपयोग करें',
    routes: ['योनि मार्ग'],
  },
  '31': {
    genericName: 'कोट्रिमोक्साज़ोल',
    alternativeName: 'सल्फामेथॉक्साज़ोल + ट्राइमेथोप्रिम',
    pediatricDose:
      'TMP 6-10 mg/kg/day + SMZ 30-50 mg/kg/day हर 12 घंटे में विभाजित; PCP संक्रमण: TMP 20 mg/kg/day हर 6 घंटे में विभाजित; 6 सप्ताह से कम आयु में वर्जित',
    ageRestriction:
      '6 सप्ताह से कम आयु के शिशुओं में वर्जित (कर्निक्टेरस का जोखिम)',
    dosageForm: 'टैबलेट',
    availableStrength: '(400 + 80) mg, (800 + 160) mg',
    pregnancyPrecautions:
      'पहली तिमाही में वर्जित (टेराटोजेन/फोलेट एंटागोनिस्ट) और प्रसव के आसपास वर्जित (कर्निक्टेरस)',
    otherPrecautions:
      'क्रिस्टल यूरिया से बचने के लिए पर्याप्त पानी दें। त्वचा पर चकत्ते/स्टीवंस-जॉनसन सिंड्रोम की निगरानी करें।',
    routes: ['मुंह से'],
  },

  '32': {
    genericName: 'डेक्सामेथासोन / डेक्सामेथासोन सोडियम फॉस्फेट',
    alternativeName: 'डेक्सामेथासोन सोडियम फॉस्फेट',
    pediatricDose:
      'क्रूप: 0.15-0.6 mg/kg एकल खुराक मुंह से/IM/IV; सूजन-रोधी: 0.08-0.3 mg/kg/day हर 6-12 घंटे में विभाजित',
    dosageForm: 'टैबलेट',
    availableStrength: 'टैबलेट: 0.5 mg; इंजेक्शन: 4 mg/ml, 8 mg/2 ml',
    diabetesPrecautions:
      'सापेक्ष निषेध/सावधानी (महत्वपूर्ण हाइपरग्लाइसीमिया कर सकता है)',
    hypertensionPrecautions:
      'सावधानी (कॉर्टिकोस्टेरॉयड से द्रव और सोडियम रुक सकता है)',
    otherPrecautions:
      'लंबे समय तक प्रभाव रखने वाला ग्लूकोकॉर्टिकोइड। तीव्र क्रूप में एकल मुंह से/IM खुराक से तेजी से वायुमार्ग में सुधार हो सकता है।',
    routes: ['मुंह से', 'IM', 'IV'],
  },

  '33': {
    genericName: 'डेक्स्ट्रोमेथॉर्फन HBr',
    pediatricDose:
      '1-2 mg/kg/day मुंह से 3-4 विभाजित खुराकों में; 4 वर्ष से कम बच्चों में अनुशंसित नहीं',
    ageRestriction:
      '4 वर्ष से कम बच्चों में अनुशंसित नहीं',
    dosageForm: 'सिरप',
    availableStrength: '13.5 mg / 5 ml',
    pregnancyPrecautions:
      'अल्पकालिक लक्षणात्मक राहत के लिए सामान्यतः स्वीकार्य',
    otherPrecautions:
      'खांसी रोकने वाली दवा। बलगम वाली खांसी या ब्रोंकियल अस्थमा में बचें।',
    routes: ['मुंह से'],
  },

  '34': {
    genericName: 'डायजेपाम',
    pediatricDose:
      'स्टेटस एपिलेप्टिकस: 0.2-0.3 mg/kg धीमा IV, 5 वर्ष से कम में अधिकतम 5 mg और 5 वर्ष से अधिक में 10 mg; रेक्टल: 0.5 mg/kg',
    dosageForm: 'इंजेक्शन',
    availableStrength: '10 mg / 2 ml (5 mg/ml)',
    pregnancyPrecautions:
      'पहली तिमाही और प्रसव के आसपास वर्जित (नवजात CNS अवसाद, फ्लॉपी इन्फेंट सिंड्रोम)',
    otherPrecautions:
      'उच्च-सतर्कता वाली एंटीकन्वल्सेंट दवा। 2-3 मिनट में धीमा IV दें। श्वसन दर और ऑक्सीजन स्तर की निगरानी करें।',
    routes: ['IV', 'रेक्टल'],
  },

  '35': {
    genericName: 'डाइक्लोफेनाक सोडियम',
    pediatricDose:
      '2-3 mg/kg/day मुंह से/रेक्टल हर 8 या 12 घंटे में विभाजित; 1 वर्ष से कम शिशुओं में अनुशंसित नहीं',
    ageRestriction:
      '1 वर्ष से कम शिशुओं में अनुशंसित नहीं',
    dosageForm: 'टैबलेट',
    availableStrength: 'टैबलेट: 50 mg; इंजेक्शन: 75 mg/ml',
    pregnancyPrecautions:
      'तीसरी तिमाही में वर्जित (समय से पहले डक्टस बंद होना, ओलिगोहाइड्राम्नियोस)',
    hypertensionPrecautions:
      'सावधानी/बचें (रीनल प्रोस्टाग्लैंडिन प्रभावित करता है और रक्तचाप बढ़ा सकता है)',
    otherPrecautions:
      'NSAID। पर्याप्त hydration रखें; किडनी की खराबी या सक्रिय पेप्टिक अल्सर में बचें।',
    routes: ['मुंह से', 'रेक्टल', 'IM'],
  },

  '36': {
    genericName: 'डाइक्लोफेनाक सोडियम + पैरासिटामोल',
    pediatricDose:
      'डाइक्लोफेनाक 2-3 mg/kg/day + पैरासिटामोल 30-40 mg/kg/day विभाजित खुराकों में; बच्चों में सावधानी से उपयोग करें',
    ageRestriction:
      'बच्चों में सावधानी से उपयोग करें; 1 वर्ष से कम में बचें',
    dosageForm: 'टैबलेट',
    availableStrength: '(50 + 325) mg',
    pregnancyPrecautions:
      'तीसरी तिमाही में वर्जित (डाइक्लोफेनाक घटक के कारण)',
    hypertensionPrecautions:
      'सावधानी/बचें (द्रव रुकने और रक्तचाप बढ़ने का जोखिम)',
    otherPrecautions:
      'फिक्स्ड-डोज संयोजन। ओवरडोज से बचने के लिए सभी स्रोतों से कुल पैरासिटामोल और डाइक्लोफेनाक की मात्रा जांचें।',
    routes: ['मुंह से'],
  },

  '37': {
    genericName: 'डाइसाइक्लोमाइन / डाइसाइक्लोमाइन HCl',
    alternativeName: 'डाइसाइक्लोमाइन HCl',
    pediatricDose:
      '6 महीने से अधिक: 0.5 mg/kg/dose मुंह से दिन में 3-4 बार; 6 महीने से कम शिशुओं में एपनिया/दौरे के जोखिम के कारण वर्जित',
    ageRestriction:
      '6 महीने से कम शिशुओं में एपनिया और दौरे के जोखिम के कारण वर्जित',
    dosageForm: 'टैबलेट',
    availableStrength: 'टैबलेट: 10 mg; इंजेक्शन: 10 mg/ml',
    otherPrecautions:
      '6 महीने से अधिक बच्चों में उचित खुराक के साथ सामान्यतः स्वीकार्य। एंटीकोलिनर्जिक प्रभाव।',
    routes: ['मुंह से', 'IM'],
  },

  '38': {
    genericName: 'डाइसोडियम हाइड्रोजन साइट्रेट',
    pediatricDose:
      'सिस्टमिक क्षारीकरण: 1-2 ml/kg/day सिरप, पानी में मिलाकर हर 6-8 घंटे में विभाजित',
    dosageForm: 'सिरप',
    availableStrength: '1.25 gm / 5 ml',
    hypertensionPrecautions:
      'सावधानी (अधिक सोडियम की मात्रा उच्च रक्तचाप और सूजन बढ़ा सकती है)',
    otherPrecautions:
      'पेट में जलन से बचने के लिए पीने से पहले पर्याप्त पानी में अच्छी तरह मिलाएं।',
    routes: ['मुंह से'],
  },

  '39': {
    genericName: 'डोम्पेरिडोन',
    pediatricDose:
      '0.2-0.4 mg/kg/dose मुंह से हर 8 घंटे में, भोजन से पहले; अधिकतम 0.8 mg/kg/day या 30 mg/day',
    dosageForm: 'टैबलेट',
    availableStrength: '10 mg',
    otherPrecautions:
      'कम अवधि के लिए स्वीकार्य। QT prolongation के कारण हृदय की अनियमित धड़कन में बचें।',
    routes: ['मुंह से'],
  },

  '40': {
    genericName: 'डॉक्सीसाइक्लिन',
    pediatricDose:
      '8 वर्ष से अधिक: 2.2-4.4 mg/kg/day हर 12 घंटे में विभाजित, अधिकतम 200 mg/day; 8 वर्ष से कम में वर्जित',
    ageRestriction:
      '8 वर्ष से कम बच्चों में वर्जित (दांतों के इनेमल का अविकास और हड्डियों की वृद्धि दबने का जोखिम)',
    dosageForm: 'कैप्सूल',
    availableStrength: '100 mg',
    pregnancyPrecautions:
      'पूर्ण निषेध (स्थायी दांतों का रंग बदलना, इनेमल का अविकास, हड्डियों की वृद्धि में बाधा)',
    otherPrecautions:
      'टेट्रासाइक्लिन एंटीबायोटिक। भोजन/पानी के साथ पर्याप्त पानी लेकर और सीधे बैठकर/खड़े होकर लें, ताकि इसोफैजाइटिस से बचा जा सके।',
    routes: ['मुंह से'],
  },
  '41': {
    genericName: 'ड्रोटावेरिन HCl',
    pediatricDose:
      '1-6 वर्ष: 20 mg दिन में 2-3 बार; > 6 वर्ष: 40 mg दिन में 3 बार [लगभग 1-2 mg/kg/dose दिन में 3 बार]',
    ageRestriction:
      '1-6 वर्ष: 20 mg दिन में 2-3 बार; > 6 वर्ष: 40 mg दिन में 3 बार',
    dosageForm: 'टैबलेट',
    availableStrength: '40 mg',
    pregnancyPrecautions:
      'पहली तिमाही में बचें, जब तक स्पष्ट चिकित्सकीय आवश्यकता न हो',
    otherPrecautions:
      'पित्त या जठरांत्र मार्ग की चिकनी मांसपेशियों की ऐंठन के लिए एंटीस्पास्मोडिक दवा।',
    routes: ['मुंह से'],
  },

  '42': {
    genericName: 'एटैम्साइलेट',
    pediatricDose:
      'केशिका रक्तस्राव के लिए 10-15 mg/kg/dose मुंह से/IV दिन में 3-4 बार',
    dosageForm: 'टैबलेट',
    availableStrength: '250 mg',
    pregnancyPrecautions:
      'पहली तिमाही में बचें',
    otherPrecautions:
      'केशिका एंडोथीलियम और प्लेटलेट चिपकने की क्षमता पर कार्य करने वाली हेमोस्टैटिक दवा।',
    routes: ['मुंह से', 'IV'],
  },

  '43': {
    genericName: 'एटोफिलीन + थियोफिलीन',
    alternativeName: 'डेरिफाइलिन',
    pediatricDose:
      'थियोफिलीन घटक: 10-15 mg/kg/day हर 8-12 घंटे में विभाजित; सीरम स्तर की निगरानी करें',
    dosageForm: 'टैबलेट',
    availableStrength: 'टैबलेट: (77 + 23) mg; इंजेक्शन: (170 + 50) mg / 2 ml',
    hypertensionPrecautions:
      'सावधानी (सकारात्मक इनोट्रोपिक/क्रोनोट्रोपिक प्रभाव; अतालता और धड़कन बढ़ने का जोखिम)',
    otherPrecautions:
      'उपचारात्मक सीमा कम है। बेचैनी, उल्टी, टैकीकार्डिया और दौरे की निगरानी करें।',
    routes: ['मुंह से', 'IV'],
  },

  '44': {
    genericName: 'फेरिक कार्बोक्सीमाल्टोज',
    pediatricDose:
      '15 mg/kg IV इन्फ्यूजन एकल खुराक के रूप में, अधिकतम 1000 mg; 1 वर्ष से कम में सुरक्षा स्थापित नहीं है',
    ageRestriction:
      '1 वर्ष से कम शिशुओं में सुरक्षा स्थापित नहीं है',
    dosageForm: 'इंजेक्शन',
    availableStrength: '500 mg / 5 ml',
    pregnancyPrecautions:
      'पहली तिमाही में वर्जित (दूसरी और तीसरी तिमाही में सुरक्षित और प्रभावी)',
    otherPrecautions:
      'केवल स्टेराइल 0.9% NaCl में dilute करके धीमे IV इन्फ्यूजन के रूप में दें। 30 मिनट तक अतिसंवेदनशीलता की निगरानी करें।',
    routes: ['IV'],
  },

  '45': {
    genericName: 'फोलिक एसिड',
    pediatricDose:
      'उपचारात्मक: 0.1-0.2 mg/kg/day मुंह से; रखरखाव: 0.05-0.1 mg/day [50-100 mcg/day]',
    dosageForm: 'टैबलेट',
    availableStrength: '400 mcg',
    pregnancyPrecautions:
      'गर्भावस्था में आवश्यक/संकेतित; मधुमेह और उच्च रक्तचाप में सुरक्षित',
    diabetesPrecautions:
      'मधुमेह में सुरक्षित',
    hypertensionPrecautions:
      'उच्च रक्तचाप में सुरक्षित',
    routes: ['मुंह से'],
  },

  '46': {
    genericName: 'फ्यूरोसेमाइड',
    pediatricDose:
      'मुंह से: 1-2 mg/kg/dose हर 12-24 घंटे में, अधिकतम 6 mg/kg/day; IV/IM: 0.5-1 mg/kg/dose धीमा बोलस, अधिकतम 2 mg/kg',
    dosageForm: 'इंजेक्शन',
    availableStrength: '10 mg/ml (20 mg / 2 ml)',
    pregnancyPrecautions:
      'सापेक्ष निषेध/सावधानी (प्लेसेंटल रक्त प्रवाह कम करता है)',
    diabetesPrecautions:
      'सावधानी (हाइपोकैलिमिया करता है और ग्लूकोज़ सहनशीलता कम करता है)',
    otherPrecautions:
      'शक्तिशाली लूप डाययूरेटिक। इलेक्ट्रोलाइट्स (पोटैशियम, सोडियम) और द्रव स्थिति की नियमित जांच करें।',
    routes: ['IV', 'IM', 'मुंह से'],
  },

  '47': {
    genericName: 'जेंटामाइसिन',
    pediatricDose:
      '5-7.5 mg/kg/day IV/IM दिन में एक बार या हर 8 घंटे में विभाजित; नवजात: 4-5 mg/kg हर 24-36 घंटे',
    dosageForm: 'इंजेक्शन',
    availableStrength: '40 mg/ml',
    pregnancyPrecautions:
      'वर्जित/बचें (जन्मजात बहरापन/भ्रूण में वेस्टिबुलोटॉक्सिसिटी का जोखिम)',
    otherPrecautions:
      'एमिनोग्लाइकोसाइड। कान और किडनी पर विषाक्त प्रभाव का उच्च जोखिम। पर्याप्त hydration सुनिश्चित करें।',
    routes: ['IV', 'IM'],
  },

  '48': {
    genericName: 'ग्लिमेपिराइड',
    pediatricDose:
      'बाल चिकित्सा रोगियों में संकेतित/अनुशंसित नहीं; इंसुलिन मानक उपचार है',
    ageRestriction:
      'बाल चिकित्सा रोगियों में संकेतित/अनुशंसित नहीं; इंसुलिन मानक उपचार है',
    dosageForm: 'टैबलेट',
    availableStrength: '1 mg',
    pregnancyPrecautions:
      'वर्जित (नवजात में लंबे समय तक गंभीर हाइपोग्लाइसीमिया का जोखिम; इंसुलिन पसंदीदा है)',
    routes: ['मुंह से'],
  },

  '49': {
    genericName: 'ग्वाइफेनेसिन + एम्ब्रोक्सोल + टरब्यूटालिन',
    alternativeName: 'म्यूकोलिटिक ब्रोंकोडायलेटर सिरप',
    pediatricDose:
      'टरब्यूटालिन: 0.075-0.1 mg/kg/dose दिन में 3 बार; एम्ब्रोक्सोल: 1.2-1.6 mg/kg/day; ग्वाइफेनेसिन: 10-15 mg/kg/day',
    dosageForm: 'सिरप',
    availableStrength: '(15 + 50 + 1.25) mg / 5 ml',
    hypertensionPrecautions:
      'टरब्यूटालिन के साथ सावधानी (टैकीकार्डिया और उच्च रक्तचाप का जोखिम)',
    diabetesPrecautions:
      'सावधानी (बीटा-2 एगोनिस्ट रक्त शर्करा बढ़ाता है)',
    otherPrecautions:
      'सिम्पैथोमिमेटिक दुष्प्रभावों में कंपकंपी, टैकीकार्डिया और धड़कन बढ़ना शामिल हो सकता है।',
    routes: ['मुंह से'],
  },

  '50': {
    genericName: 'हाइड्रोकॉर्टिसोन सोडियम सक्सिनेट',
    pediatricDose:
      'एड्रिनल क्राइसिस/शॉक: 2-4 mg/kg IV बोलस, फिर 2-4 mg/kg/day हर 6 घंटे में विभाजित; गंभीर अस्थमा: 4-8 mg/kg/day',
    dosageForm: 'इंजेक्शन',
    availableStrength: '100 mg, 200 mg वायल',
    diabetesPrecautions:
      'सावधानी (कॉर्टिकोस्टेरॉयड हाइपरग्लाइसीमिया करता है)',
    hypertensionPrecautions:
      'सावधानी (मिनरलोकॉर्टिकोइड के कारण सोडियम/द्रव रुक सकता है)',
    otherPrecautions:
      'तीव्र शॉक, गंभीर अस्थमा और एड्रिनल अपर्याप्तता के लिए तेजी से प्रभाव करने वाला IV कॉर्टिकोस्टेरॉयड।',
    routes: ['IV'],
  },
  '51': {
    genericName: 'हाइड्रॉक्सीयूरिया',
    pediatricDose:
      'सिकल सेल रोग: 15-20 mg/kg/day मुंह से दिन में एक बार; 5 mg/kg की वृद्धि करके अधिकतम 35 mg/kg/day तक बढ़ाएं',
    dosageForm: 'कैप्सूल',
    availableStrength: '500 mg',
    pregnancyPrecautions:
      'पूर्ण निषेध (अत्यधिक टेराटोजेनिक और म्यूटाजेनिक)',
    otherPrecautions:
      'मायलोसप्रेसिव साइटोटॉक्सिक दवा। नियमित CBC, डिफरेंशियल काउंट और रेटिकुलोसाइट काउंट आवश्यक है।',
    routes: ['मुंह से'],
  },

  '52': {
    genericName: 'आइबुप्रोफेन',
    pediatricDose:
      'बुखार/दर्द: 5-10 mg/kg/dose हर 6-8 घंटे में मुंह से, अधिकतम 40 mg/kg/day; 6 महीने से कम में वर्जित',
    ageRestriction:
      '6 महीने से कम आयु के शिशुओं में वर्जित',
    dosageForm: 'टैबलेट',
    availableStrength: '400 mg',
    pregnancyPrecautions:
      'तीसरी तिमाही में वर्जित (ओलिगोहाइड्राम्नियोस, डक्टस आर्टेरियोसस बंद होने का जोखिम)',
    hypertensionPrecautions:
      'सावधानी/बचें (द्रव रुकने और एंटीहाइपरटेंसिव दवाओं के प्रभाव को कम करने का जोखिम)',
    otherPrecautions:
      'निर्जलित बच्चों या डेंगू बुखार में उपयोग न करें। भोजन या दूध के साथ दें।',
    routes: ['मुंह से'],
  },

  '53': {
    genericName: 'आयरन + फोलिक एसिड',
    alternativeName: 'IFA फॉर्मूलेशन',
    pediatricDose:
      'एलिमेंटल आयरन: एनीमिया के उपचार के लिए 3-6 mg/kg/day एलिमेंटल आयरन, 2-3 विभाजित खुराकों में',
    dosageForm: 'टैबलेट',
    availableStrength:
      'टैबलेट: (60 mg एलिमेंटल Fe + 500 mcg FA); सिरप: (20 mg Fe + 0.1 mg FA) / ml',
    pregnancyPrecautions:
      'गर्भावस्था में आवश्यक/संकेतित; मधुमेह और उच्च रक्तचाप में सुरक्षित',
    diabetesPrecautions:
      'मधुमेह में सुरक्षित',
    hypertensionPrecautions:
      'उच्च रक्तचाप में सुरक्षित',
    otherPrecautions:
      'मल का रंग गहरा और हल्की कब्ज हो सकती है। बेहतर अवशोषण के लिए भोजन के बीच विटामिन C युक्त तरल के साथ दें।',
    routes: ['मुंह से'],
  },

  '54': {
    genericName: 'आयरन सुक्रोज',
    pediatricDose:
      'कुल खुराक की गणना Ganzoni सूत्र के आधार पर: लगभग 3 mg/kg IV टेस्ट/धीमा इन्फ्यूजन 15-30 मिनट में',
    dosageForm: 'इंजेक्शन',
    availableStrength: '100 mg / 5 ml (20 mg/ml)',
    pregnancyPrecautions:
      'पहली तिमाही में वर्जित (दूसरी और तीसरी तिमाही में सुरक्षित और अनुशंसित)',
    otherPrecautions:
      'केवल स्टेराइल 0.9% NaCl में dilute करें। कभी भी तेज IV push न दें। पुनर्जीवन उपकरण उपलब्ध होना चाहिए।',
    routes: ['IV'],
  },

  '55': {
    genericName: 'लेबेटालोल HCl',
    pediatricDose:
      'बाल चिकित्सा उच्च रक्तचाप संकट: 0.2-1 mg/kg/dose IV 5 मिनट में या 0.25-1.5 mg/kg/hr IV निरंतर इन्फ्यूजन',
    dosageForm: 'इंजेक्शन',
    availableStrength: '5 mg/ml',
    pregnancyPrecautions:
      'गर्भावस्था संबंधी उच्च रक्तचाप और प्री-एक्लेम्पसिया में पसंदीदा दवा',
    diabetesPrecautions:
      'सावधानी (बीटा-ब्लॉकर हाइपोग्लाइसीमिया के कंपकंपी/टैकीकार्डिया जैसे संकेतों को छिपा सकता है)',
    hypertensionPrecautions:
      'तीव्र उच्च रक्तचाप संकट में आपातकालीन एंटीहाइपरटेंसिव उपचार की प्रथम-पंक्ति दवा।',
    otherPrecautions:
      'अल्फा और बीटा-ब्लॉकर। इन्फ्यूजन के दौरान रक्तचाप और ECG की लगातार निगरानी करें।',
    routes: ['IV'],
  },

  '56': {
    genericName: 'लेवोसेटिरीज़िन',
    pediatricDose:
      '0.125-0.25 mg/kg/day; 6 माह-5 वर्ष: 1.25 mg दिन में एक बार; 6-11 वर्ष: 2.5 mg दिन में एक बार; > 12 वर्ष: 5 mg',
    ageRestriction:
      '6 माह-5 वर्ष: 1.25 mg; 6-11 वर्ष: 2.5 mg; > 12 वर्ष: 5 mg',
    dosageForm: 'टैबलेट',
    availableStrength: '10 mg',
    otherPrecautions:
      'सामान्यतः सुरक्षित मानी जाती है। दूसरी पीढ़ी की गैर-नींद वाली एंटीहिस्टामिन दवा।',
    routes: ['मुंह से'],
  },

  '57': {
    genericName: 'लेवोनॉरजेस्ट्रेल',
    alternativeName: 'ईज़ी-पिल',
    pediatricDose:
      'यौवन के बाद आपातकालीन गर्भनिरोध: 1.5 mg एकल खुराक, 72 घंटे के भीतर; यौवन-पूर्व बच्चों में लागू नहीं',
    ageRestriction:
      'केवल यौवन के बाद; यौवन-पूर्व बच्चों में लागू नहीं',
    dosageForm: 'टैबलेट',
    availableStrength: 'लेवोनॉरजेस्ट्रेल 1.5 mg',
    pregnancyPrecautions:
      'स्थापित गर्भावस्था में वर्जित (प्रभावी नहीं)',
    routes: ['मुंह से'],
  },

  '58': {
    genericName: 'लेवोनॉरजेस्ट्रेल + एथिनाइलएस्ट्राडियोल + आयरन',
    alternativeName: 'माला-N',
    pediatricDose:
      'यौवन के बाद हार्मोनल गर्भनिरोध; यौवन-पूर्व बच्चों में लागू नहीं',
    ageRestriction:
      'केवल यौवन के बाद; यौवन-पूर्व बच्चों में लागू नहीं',
    dosageForm: 'टैबलेट',
    availableStrength: '(150 mcg LNG + 30 mcg EE + Fe)',
    pregnancyPrecautions:
      'पूर्ण निषेध',
    hypertensionPrecautions:
      'अनियंत्रित या गंभीर उच्च रक्तचाप में पूर्ण निषेध (एस्ट्रोजन से थ्रोम्बोएम्बोलिक जोखिम)',
    routes: ['मुंह से'],
  },

  '59': {
    genericName: 'लिग्नोकेन (लिडोकेन)',
    alternativeName: 'लिडोकेन',
    pediatricDose:
      'स्थानीय इन्फिल्ट्रेशन: 3-5 mg/kg [सादा] अधिकतम 300 mg; एपिनेफ्रिन के साथ: अधिकतम 7 mg/kg, अधिकतम 500 mg',
    dosageForm: 'इंजेक्शन',
    availableStrength: '2% w/v (20 mg/ml)',
    pregnancyPrecautions:
      'स्थानीय एनेस्थीसिया के लिए सामान्यतः सुरक्षित; एड्रेनालिन के संयोजन में सावधानी रखें',
    otherPrecautions:
      'गलती से रक्त वाहिका में इंजेक्शन जाने से बचने के लिए इंजेक्शन से पहले aspiration करें। CNS विषाक्तता (कान में आवाज, मुंह के आसपास सुन्नपन) के संकेतों पर नजर रखें।',
    routes: ['इन्फिल्ट्रेशन', 'SC', 'IV'],
  },

  '60': {
    genericName: 'मैग्नीशियम सल्फेट',
    alternativeName: 'MgSO4',
    pediatricDose:
      'हाइपोमैग्नीसीमिया: 25-50 mg/kg/dose IV/IM हर 4-6 घंटे; गंभीर अस्थमा: 25-50 mg/kg IV इन्फ्यूजन 20-30 मिनट में, अधिकतम 2 g',
    dosageForm: 'इंजेक्शन',
    availableStrength: '500 mg/ml (50% w/v)',
    pregnancyPrecautions:
      'एक्लेम्पसिया और गंभीर प्री-एक्लेम्पसिया में प्रथम-पंक्ति उपचार; श्वसन की निगरानी के साथ सुरक्षित',
    otherPrecautions:
      'इन्फ्यूजन के दौरान श्वसन दर, पटेलर रिफ्लेक्स और मूत्र मात्रा की निगरानी करें। कैल्शियम ग्लूकोनेट इसका antidote है।',
    routes: ['IV', 'IM'],
  },
  '61': {
    genericName: 'मेड्रॉक्सीप्रोजेस्टेरोन एसीटेट',
    alternativeName: 'अंतरा',
    pediatricDose:
      'यौवन के बाद डिपो गर्भनिरोधक; 150 mg IM हर 3 महीने; यौवन-पूर्व बच्चों में लागू नहीं',
    ageRestriction:
      'यौवन के बाद डिपो गर्भनिरोधक; यौवन-पूर्व बच्चों में लागू नहीं',
    dosageForm: 'इंजेक्शन',
    availableStrength: '150 mg / ml (Subcutaneous / IM)',
    pregnancyPrecautions:
      'पूर्ण निषेध',
    hypertensionPrecautions:
      'सावधानी / सापेक्ष निषेध यदि उच्च रक्तचाप गंभीर हो या हृदय संबंधी रोग से जटिल हो',
    routes: ['IM', 'SC'],
  },

  '62': {
    genericName: 'मेटफॉर्मिन HCl',
    pediatricDose:
      '10 वर्ष या अधिक: 500 mg मुंह से दिन में एक या दो बार; प्रति सप्ताह 500 mg बढ़ाकर अधिकतम 2000 mg/day [लगभग 15-20 mg/kg/day]',
    ageRestriction:
      'केवल 10 वर्ष या अधिक आयु के बच्चे',
    dosageForm: 'टैबलेट',
    availableStrength: '500 mg',
    pregnancyPrecautions:
      'टाइप 2 मधुमेह में प्रथम-पंक्ति दवा; चिकित्सकीय निगरानी में गर्भावधि मधुमेह में स्वीकार्य',
    diabetesPrecautions:
      '10 वर्ष या अधिक आयु के बच्चों में टाइप 2 मधुमेह की प्रथम-पंक्ति मौखिक रक्त शर्करा कम करने वाली दवा।',
    otherPrecautions:
      'जठरांत्र संबंधी दुष्प्रभाव कम करने के लिए भोजन के साथ या भोजन के बाद लें।',
    routes: ['मुंह से'],
  },

  '63': {
    genericName: 'मेथाइलप्रेडनिसोलोन',
    pediatricDose:
      'सूजन-रोधी: 0.5-1 mg/kg/day हर 6-12 घंटे में विभाजित; स्टेटस अस्थमेटिकस: पहले 1-2 mg/kg/day लोडिंग, फिर 1 mg/kg हर 6 घंटे',
    dosageForm: 'टैबलेट',
    availableStrength: '16 mg',
    diabetesPrecautions:
      'सापेक्ष निषेध / सावधानी (महत्वपूर्ण हाइपरग्लाइसीमिया)',
    hypertensionPrecautions:
      'सावधानी (द्रव/सोडियम रुकना)',
    otherPrecautions:
      'मध्यम अवधि का ग्लूकोकॉर्टिकोइड, जिसमें उच्च सूजन-रोधी क्षमता होती है।',
    routes: ['मुंह से'],
  },

  '64': {
    genericName: 'मेटोक्लोप्रामाइड',
    pediatricDose:
      '0.1-0.15 mg/kg/dose मुंह से/IV/IM हर 6-8 घंटे, अधिकतम 0.5 mg/kg/day [बच्चों में एक्स्ट्रापाइरामिडल लक्षणों के कारण सावधानी]',
    dosageForm: 'टैबलेट',
    availableStrength: '10 mg',
    pregnancyPrecautions:
      'सामान्यतः सुरक्षित / हाइपरएमेसिस ग्रेविडेरम में स्वीकार्य',
    otherPrecautions:
      'बच्चों में तीव्र डिस्टोनिक और एक्स्ट्रापाइरामिडल प्रतिक्रियाओं की उच्च संभावना। प्रोमेथाज़िन या डिफेनहाइड्रामाइन उपलब्ध रखें।',
    routes: ['मुंह से', 'IV', 'IM'],
  },

  '65': {
    genericName: 'मेट्रोनिडाज़ोल',
    pediatricDose:
      'अमीबायसिस: 35-50 mg/kg/day हर 8 घंटे में विभाजित, 7-10 दिनों तक; जिआर्डियासिस: 15-20 mg/kg/day हर 8 घंटे में विभाजित, 5 दिनों तक; एनारोबिक संक्रमण: 30 mg/kg/day',
    dosageForm: 'टैबलेट',
    availableStrength: '400 mg',
    pregnancyPrecautions:
      'गर्भावस्था: पहली तिमाही में उच्च-खुराक वाली योजनाओं से बचें, जब तक कड़ाई से आवश्यक न हो',
    otherPrecautions:
      'मुंह में धातु जैसा स्वाद और जठरांत्र संबंधी परेशानी हो सकती है। भोजन के साथ दें।',
    routes: ['मुंह से'],
  },

  '66': {
    genericName: 'मिसोप्रोस्टोल',
    pediatricDose:
      'बाल चिकित्सा में सामान्यतः संकेतित नहीं; NSAID अल्सर रोकथाम के लिए ऑफ-लेबल: 2-3 mcg/kg/dose हर 6 घंटे',
    ageRestriction:
      'बाल चिकित्सा में सामान्यतः संकेतित नहीं; केवल विशेषज्ञ की निगरानी में विशेष ऑफ-लेबल उपयोग',
    dosageForm: 'टैबलेट',
    availableStrength: '100 mcg, 200 mcg',
    pregnancyPrecautions:
      'यदि गर्भावस्था को बनाए रखना उद्देश्य हो तो पूर्ण निषेध (शक्तिशाली गर्भपातकारी और टेराटोजेन)',
    routes: ['मुंह से'],
  },

  '67': {
    genericName: 'मोक्सीफ्लॉक्सासिन',
    alternativeName: 'आई ड्रॉप्स',
    pediatricDose:
      '1 वर्ष या अधिक बच्चों में बैक्टीरियल कंजंक्टिवाइटिस: प्रभावित आंख में 1 बूंद दिन में 3 बार, 7 दिनों तक',
    ageRestriction:
      '1 वर्ष या अधिक आयु के बच्चे',
    dosageForm: 'आई ड्रॉप',
    availableStrength: '0.5% w/v',
    pregnancyPrecautions:
      'स्थानीय नेत्र संबंधी फॉर्मूलेशन; शरीर में अवशोषण बहुत कम और सुरक्षित',
    routes: ['नेत्र संबंधी'],
  },

  '68': {
    genericName: 'मल्टीविटामिन सिरप',
    pediatricDose:
      'मानक बाल चिकित्सा मल्टीविटामिन सप्लीमेंट: आयु/वजन के RDA के अनुसार 2.5-5 ml प्रतिदिन',
    dosageForm: 'सिरप',
    availableStrength: 'मानक बाल चिकित्सा फॉर्मूलेशन',
    pregnancyPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सुरक्षित',
    diabetesPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सुरक्षित',
    hypertensionPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सुरक्षित',
    routes: ['मुंह से'],
  },

  '69': {
    genericName: 'नियोस्टिग्मिन मिथाइलसल्फेट',
    pediatricDose:
      'न्यूरोमस्कुलर रिवर्सल: 0.04-0.08 mg/kg IV के साथ एट्रोपिन 0.02 mg/kg; मायस्थीनिया: 0.01-0.04 mg/kg/dose IM/SC',
    dosageForm: 'इंजेक्शन',
    availableStrength: '0.5 mg/ml',
    otherPrecautions:
      'गंभीर हृदय संबंधी रोग और ब्रैडीअर्थमिया में सापेक्ष सावधानी। मस्कैरिनिक प्रभावों को रोकने के लिए हमेशा एट्रोपिन के साथ दें।',
    routes: ['IV', 'IM', 'SC'],
  },

  '70': {
    genericName: 'निफेडिपिन',
    pediatricDose:
      'बाल चिकित्सा उच्च रक्तचाप: 0.25-0.5 mg/kg/day हर 6-8 घंटे में विभाजित, अधिकतम 3 mg/kg/day या 10-20 mg/dose',
    dosageForm: 'कैप्सूल',
    availableStrength: '5 mg',
    pregnancyPrecautions:
      'गर्भावस्था से संबंधित उच्च रक्तचाप और टॉकोलाइसिस में संकेतित',
    hypertensionPrecautions:
      'गर्भावस्था से संबंधित उच्च रक्तचाप में संकेतित। अचानक गंभीर हाइपोटेंशन के जोखिम के कारण sublingual फॉर्म से बचें।',
    otherPrecautions:
      'बहुत अधिक और अनियंत्रित रक्तचाप गिरने के कारण sublingual उपयोग सख्ती से न करें।',
    routes: ['मुंह से'],
  },
  '71': {
    genericName: 'नॉरफ्लॉक्सासिन',
    pediatricDose:
      '10-15 mg/kg/day मुंह से हर 12 घंटे में विभाजित; आर्थ्रोपैथी के जोखिम के कारण बच्चों में नियमित रूप से अनुशंसित नहीं',
    ageRestriction:
      'आर्थ्रोपैथी के जोखिम के कारण बच्चों में नियमित रूप से अनुशंसित नहीं',
    dosageForm: 'टैबलेट',
    availableStrength: '200 mg, 400 mg',
    pregnancyPrecautions:
      'वर्जित/बचें (विकासशील भ्रूण में उपास्थि क्षति/आर्थ्रोपैथी का जोखिम)',
    otherPrecautions:
      'फ्लुओरोक्विनोलोन एंटीबायोटिक; केवल उन विशेष स्थितियों में सीमित रखें जहां वैकल्पिक एंटीमाइक्रोबियल उपचार उपयुक्त न हो।',
    routes: ['मुंह से'],
  },

  '72': {
    genericName: 'ओफ्लॉक्सासिन',
    pediatricDose:
      '15 mg/kg/day मुंह से हर 12 घंटे में विभाजित, अधिकतम 400 mg/day; बहु-दवा प्रतिरोध/टाइफाइड के लिए आरक्षित उपयोग',
    dosageForm: 'टैबलेट',
    availableStrength: '200 mg, 400 mg',
    pregnancyPrecautions:
      'वर्जित/बचें (विकासशील भ्रूण में उपास्थि क्षति/आर्थ्रोपैथी का जोखिम)',
    otherPrecautions:
      'बहु-दवा प्रतिरोध या जटिल टाइफाइड बुखार के लिए उपयोग आरक्षित रखें।',
    routes: ['मुंह से'],
  },

  '73': {
    genericName: 'ऑन्डैन्सेट्रॉन',
    pediatricDose:
      '0.1-0.15 mg/kg/dose IV/IM/मुंह से हर 8 घंटे, बच्चों में अधिकतम एकल खुराक 4 mg और किशोरों में 8 mg',
    dosageForm: 'टैबलेट',
    availableStrength:
      'टैबलेट: 4 mg; इंजेक्शन: 2 mg/ml (4 mg / 2 ml); ओरल सॉल्यूशन: 2 mg / 5 ml',
    pregnancyPrecautions:
      'गर्भावस्था: पहली तिमाही में सावधानी (ओरोफेशियल क्लेफ्ट का संभावित छोटा जोखिम; दूसरी-पंक्ति उपयोग)',
    otherPrecautions:
      'सेरोटोनिन 5-HT3 रिसेप्टर एंटागोनिस्ट। अत्यधिक प्रभावी एंटीएमेटिक। QT बढ़ाने वाली अन्य दवाओं के साथ सावधानी रखें।',
    routes: ['मुंह से', 'IV', 'IM'],
  },

  '74': {
    genericName: 'पैंटोप्राज़ोल / पैंटोप्राज़ोल (IV)',
    alternativeName: 'पैंटोप्राज़ोल सोडियम',
    pediatricDose:
      '0.5-1 mg/kg/day मुंह से या IV दिन में एक बार, अधिकतम 40 mg/day; 5 वर्ष या अधिक आयु के बच्चों में स्वीकृत',
    ageRestriction:
      '5 वर्ष या अधिक आयु के बच्चों में स्वीकृत',
    dosageForm: 'टैबलेट',
    availableStrength:
      'टैबलेट: 40 mg; इंजेक्शन: 40 mg वायल',
    pregnancyPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    diabetesPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    hypertensionPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सामान्यतः सुरक्षित',
    routes: ['मुंह से', 'IV'],
  },

  '75': {
    genericName: 'पैंटोप्राज़ोल + डोम्पेरिडोन',
    pediatricDose:
      'पैंटोप्राज़ोल 0.5-1 mg/kg + डोम्पेरिडोन 0.2-0.4 mg/kg; बड़े बच्चों/किशोरों के लिए फॉर्मूलेटेड',
    ageRestriction:
      'बड़े बच्चों और किशोरों के लिए फॉर्मूलेटेड',
    dosageForm: 'टैबलेट',
    availableStrength: '(40 + 10) mg',
    otherPrecautions:
      'बड़े बच्चों और किशोरों में मानक संकेतों के अनुसार सामान्यतः स्वीकार्य।',
    routes: ['मुंह से'],
  },

  '76': {
    genericName: 'पैरासिटामोल',
    alternativeName: 'एसीटामिनोफेन',
    pediatricDose:
      '10-15 mg/kg/dose मुंह से/रेक्टल हर 4-6 घंटे आवश्यकतानुसार, अधिकतम 60-75 mg/kg/day; IV: 15 mg/kg/dose हर 6 घंटे',
    dosageForm: 'टैबलेट',
    availableStrength:
      'टैबलेट: 500 mg; इंजेक्शन: 150 mg/ml; ओरल सस्पेंशन: 125 mg / 5 ml',
    pregnancyPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में प्रथम-पसंद दर्दनाशक और ज्वरनाशक',
    diabetesPrecautions:
      'मधुमेह में सुरक्षित',
    hypertensionPrecautions:
      'उच्च रक्तचाप में सुरक्षित',
    otherPrecautions:
      'बाल चिकित्सा में प्रथम-पंक्ति ज्वरनाशक/दर्दनाशक। हेपाटोटॉक्सिसिटी से बचने के लिए अधिकतम 75 mg/kg/day या 4000 mg/day से अधिक न दें।',
    routes: ['मुंह से', 'रेक्टल', 'IV'],
  },

  '77': {
    genericName: 'पैराडाइक्लोरोबेंज़ीन',
    alternativeName: 'कान की बूंदें (सेरुमिनोलाइटिक)',
    pediatricDose:
      'स्थानीय सेरुमिनोलाइटिक: प्रभावित कान में 3-5 बूंदें दिन में 2 बार, 3-4 दिनों तक डालें',
    dosageForm: 'ईयर ड्रॉप',
    availableStrength: '2% w/v',
    pregnancyPrecautions:
      'स्थानीय सेरुमिनोलाइटिक कान की बूंदें; कोई प्रणालीगत निषेध नहीं',
    otherPrecautions:
      'यदि कान के पर्दे में छेद होने का संदेह हो तो उपयोग न करें।',
    routes: ['कान में'],
  },

  '78': {
    genericName: 'पेंटाज़ोसिन',
    pediatricDose:
      '1 वर्ष से अधिक बच्चे: 0.5 mg/kg/dose IM/SC या धीमे IV से, आवश्यकतानुसार हर 3-4 घंटे में दोहराएं',
    ageRestriction:
      '1 वर्ष से अधिक बच्चे; 1 वर्ष से कम शिशुओं में बचें',
    dosageForm: 'इंजेक्शन',
    availableStrength: '30 mg/ml',
    pregnancyPrecautions:
      'प्रसव के निकट/प्रसव के समय वर्जित (नवजात में श्वसन अवसाद)',
    hypertensionPrecautions:
      'सावधानी (सिस्टमिक और पल्मोनरी धमनी दबाव बढ़ा सकता है)',
    otherPrecautions:
      'ओपिओइड एगोनिस्ट-एंटागोनिस्ट। ओपिओइड पर निर्भर व्यक्तियों में विदड्रॉल शुरू कर सकता है। नालोक्सोन उपलब्ध रखें।',
    routes: ['IM', 'SC', 'IV'],
  },

  '79': {
    genericName: 'फेनिटोइन',
    pediatricDose:
      'स्टेटस एपिलेप्टिकस: 15-20 mg/kg IV लोडिंग; रखरखाव: 5-8 mg/kg/day मुंह से/IV हर 12 घंटे में विभाजित',
    dosageForm: 'टैबलेट',
    availableStrength: '100 mg',
    pregnancyPrecautions:
      'सापेक्ष निषेध (टेराटोजेनिक: फीटल हाइडेंटोइन सिंड्रोम; अपरिहार्य होने पर स्तर की निगरानी करें)',
    diabetesPrecautions:
      'सावधानी (इंसुलिन रिलीज को रोककर हाइपरग्लाइसीमिया बढ़ा सकता है)',
    otherPrecautions:
      'IV लोडिंग खुराक 0.9% सलाइन फिल्टर के साथ धीरे दें (दर ≤ 1 mg/kg/min)। हृदय संबंधी अतालता का उच्च जोखिम।',
    routes: ['मुंह से', 'IV'],
  },

  '80': {
    genericName: 'फाइटोमेनाडायोन',
    alternativeName: 'विटामिन K1',
    pediatricDose:
      'नवजात प्रोफिलैक्सिस: जन्म के समय 0.5-1 mg IM; कोएगुलोपैथी: 0.25-0.5 mg/kg/dose SC/IV/IM',
    ageRestriction:
      'जन्म के समय प्रोफिलैक्सिस और कोएगुलोपैथी के लिए सभी बाल चिकित्सा आयु वर्ग',
    dosageForm: 'इंजेक्शन',
    availableStrength: '1 mg/0.5 ml, 10 mg/ml',
    pregnancyPrecautions:
      'नवजात प्रोफिलैक्सिस और कोएगुलोपैथी में सुरक्षित और संकेतित',
    routes: ['IM', 'SC', 'IV'],
  },
  '81': {
    genericName: 'पोविडोन-आयोडीन',
    pediatricDose:
      'बाल चिकित्सा में संकेतित नहीं; केवल त्वचा पर लगाने वाला स्थानीय एंटीसेप्टिक',
    ageRestriction:
      'बाल चिकित्सा में संकेतित नहीं; केवल त्वचा पर लगाने वाला स्थानीय एंटीसेप्टिक',
    dosageForm: 'पेसरी',
    availableStrength: '200 mg',
    pregnancyPrecautions:
      'वर्जित/बचें (आयोडीन के प्रणालीगत अवशोषण से भ्रूण में हाइपोथायरॉइडिज्म/गलगंड हो सकता है)',
    otherPrecautions:
      'त्वचा पर लगाने वाला एंटीसेप्टिक फॉर्मूलेशन। छोटे शिशुओं में बड़े जलने या खुले घावों पर उपयोग न करें, क्योंकि आयोडीन का प्रणालीगत अवशोषण हो सकता है।',
    routes: ['स्थानीय', 'योनि मार्ग'],
  },

  '82': {
    genericName: 'प्रालिडॉक्सिम क्लोराइड',
    alternativeName: 'PAM',
    pediatricDose:
      '25-50 mg/kg IV लोडिंग इन्फ्यूजन 15-30 मिनट में, फिर 10-20 mg/kg/hr निरंतर इन्फ्यूजन',
    dosageForm: 'इंजेक्शन',
    availableStrength: '500 mg / 20 ml वायल',
    pregnancyPrecautions:
      'ऑर्गेनोफॉस्फेट विषाक्तता में आपातकालीन antidote; कोई पूर्ण निषेध नहीं',
    otherPrecautions:
      'ऑर्गेनोफॉस्फेट विषाक्तता में विशिष्ट कोलिनेस्टरेज़ रिएक्टिवेटर। इसे एट्रोपिन के साथ देना आवश्यक है।',
    routes: ['IV'],
  },

  '83': {
    genericName: 'रैनिटिडिन',
    pediatricDose:
      'मुंह से: 2-4 mg/kg/dose हर 12 घंटे में विभाजित; IV: 1-2 mg/kg/dose धीमे बोलस के रूप में हर 8 घंटे',
    dosageForm: 'टैबलेट',
    availableStrength: '150 mg',
    otherPrecautions:
      'सामान्यतः स्वीकार्य माना जाता है। हिस्टामिन H2-रिसेप्टर एंटागोनिस्ट।',
    routes: ['मुंह से', 'IV'],
  },

  '84': {
    genericName: 'सालबुटामोल सल्फेट / सालबुटामोल MDI',
    alternativeName: 'सालबुटामोल MDI / एल्ब्यूटेरोल',
    pediatricDose:
      'मुंह से: 0.1-0.15 mg/kg/dose दिन में 3-4 बार; MDI: 100-200 mcg [1-2 पफ] स्पेसर के साथ; नेब्युलाइजेशन: 0.15 mg/kg/dose [न्यूनतम 1.25 mg, अधिकतम 5 mg]',
    dosageForm: 'टैबलेट',
    availableStrength:
      'टैबलेट: 4 mg; इनहेलर: 100 mcg/dose (200 doses); सिरप: 2 mg / 5 ml',
    hypertensionPrecautions:
      'मुंह से/सिस्टमिक फॉर्म में सावधानी (टैकीकार्डिया और धड़कन बढ़ा सकता है)',
    diabetesPrecautions:
      'मुंह से/सिस्टमिक फॉर्म में सावधानी (ग्लाइकोजनोलिसिस/हाइपरग्लाइसीमिया बढ़ा सकता है)',
    otherPrecautions:
      'हृदय संबंधी दुष्प्रभाव और कंपकंपी कम करने के लिए मुंह से देने की तुलना में इनहेलेशन मार्ग को प्राथमिकता दें।',
    routes: ['इनहेलेशन', 'मुंह से'],
  },

  '85': {
    genericName: 'इंजेक्शन के लिए स्टेराइल वॉटर',
    pediatricDose:
      'Diluent/vehicle; पुनर्गठन के निर्देशों के अनुसार आवश्यक मात्रा निर्धारित करें',
    dosageForm: 'सॉल्यूशन/ड्रॉपर',
    availableStrength: '5 ml, 15 ml ड्रॉपर',
    pregnancyPrecautions:
      'सॉल्वेंट/डिल्यूएंट; औषधीय रूप से सक्रिय नहीं',
    otherPrecautions:
      'केवल सॉल्वेंट/डिल्यूएंट। बिना घुले पदार्थ के plain sterile water को सीधे IV कभी न दें (घातक हेमोलिसिस हो सकता है)।',
    routes: ['वाहक / डिल्यूएंट'],
  },

  '86': {
    genericName: 'टेल्मिसार्टन',
    pediatricDose:
      '6 वर्ष या अधिक: 0.5-1 mg/kg/day मुंह से दिन में एक बार, अधिकतम 40 mg/day',
    ageRestriction:
      '6 वर्ष या अधिक आयु के बच्चे',
    dosageForm: 'टैबलेट',
    availableStrength: '40 mg',
    pregnancyPrecautions:
      'दूसरी और तीसरी तिमाही में पूर्ण निषेध (ARB भ्रूण-विषाक्तता: रीनल एजेनेसिस, ओलिगोहाइड्राम्नियोस, खोपड़ी का हाइपोप्लेसिया, मृत्यु)',
    hypertensionPrecautions:
      'एंजियोटेंसिन II रिसेप्टर ब्लॉकर। उच्च रक्तचाप में संकेतित।',
    otherPrecautions:
      'सीरम क्रिएटिनिन और पोटैशियम स्तर की निगरानी करें।',
    routes: ['मुंह से'],
  },

  '87': {
    genericName: 'ट्रानेक्सामिक एसिड',
    pediatricDose:
      'मुंह से: 15-25 mg/kg/dose दिन में 3 बार; IV: 10-15 mg/kg/dose धीमे IV बोलस के रूप में हर 8 घंटे',
    dosageForm: 'टैबलेट',
    availableStrength:
      'टैबलेट: 500 mg; इंजेक्शन: 100 mg/ml (500 mg / 5 ml)',
    pregnancyPrecautions:
      'पहली तिमाही में बचें, जब तक गंभीर मातृ रक्तस्राव को रोकने के लिए आवश्यक न हो',
    otherPrecautions:
      'एंटीफाइब्रिनोलिटिक दवा। IV को 10-15 मिनट में धीरे दें (तेजी से इंजेक्शन से चक्कर और हाइपोटेंशन हो सकता है)।',
    routes: ['मुंह से', 'IV'],
  },

  '88': {
    genericName: 'विटामिन B-कॉम्प्लेक्स',
    pediatricDose:
      'आयु के अनुसार दैनिक चिकित्सीय सप्लीमेंटेशन; सामान्यतः प्रतिदिन 1/2 से 1 टैबलेट/चम्मच',
    dosageForm: 'टैबलेट',
    availableStrength: 'चिकित्सीय फॉर्मूलेशन',
    pregnancyPrecautions:
      'आवश्यक सूक्ष्म पोषक तत्व; इन स्थितियों में सुरक्षित',
    diabetesPrecautions:
      'इन स्थितियों में सुरक्षित',
    hypertensionPrecautions:
      'इन स्थितियों में सुरक्षित',
    routes: ['मुंह से'],
  },

  '89': {
    genericName: 'विटामिन C (एस्कॉर्बिक एसिड)',
    alternativeName: 'एस्कॉर्बिक एसिड',
    pediatricDose:
      'स्कर्वी का उपचार: 100-300 mg/day [लगभग 10-20 mg/kg/day]; दैनिक आवश्यकता: 25-50 mg/day',
    dosageForm: 'टैबलेट',
    availableStrength: '500 mg',
    pregnancyPrecautions:
      'मानक चिकित्सीय खुराक में सुरक्षित',
    diabetesPrecautions:
      'मानक चिकित्सीय खुराक में सुरक्षित',
    hypertensionPrecautions:
      'मानक चिकित्सीय खुराक में सुरक्षित',
    routes: ['मुंह से'],
  },

  '90': {
    genericName: 'जिंक सल्फेट',
    pediatricDose:
      'तीव्र दस्त WHO: 6 महीने से कम: 10 mg/day, 14 दिनों तक; 6 महीने या अधिक: 20 mg/day, 14 दिनों तक [लगभग 1-2 mg/kg/day]',
    ageRestriction:
      '6 महीने से कम: 10 mg/day; 6 महीने या अधिक: 20 mg/day, 14 दिनों तक',
    dosageForm: 'टैबलेट',
    availableStrength: '10 mg, 20 mg',
    pregnancyPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सुरक्षित',
    diabetesPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सुरक्षित',
    hypertensionPrecautions:
      'गर्भावस्था, मधुमेह और उच्च रक्तचाप में सुरक्षित',
    otherPrecautions:
      'बाल चिकित्सा के तीव्र दस्त के लिए मानक WHO प्रोटोकॉल: दस्त रुकने के बाद भी पूरे 14 दिनों का कोर्स जारी रखें।',
    routes: ['मुंह से'],
  },
};