export interface Recipe {
  id: number
  name: string
  nameHindi: string
  cuisine: string
  category: string
  time: string
  prepTime: string
  cookTime: string
  servings: number
  difficulty: "Easy" | "Medium" | "Hard"
  rating: number
  image: string
  description: string
  descriptionHindi: string
  ingredients: {
    item: string
    itemHindi: string
    quantity: string
    quantityHindi: string
  }[]
  steps: {
    step: number
    instruction: string
    instructionHindi: string
    duration: string
    tips?: string
    tipsHindi?: string
  }[]
  whistleCount?: number
  youtubeUrl?: string
  tags: string[]
}

export const recipes: Recipe[] = [
  // ============ NORTH INDIAN ============
  {
    id: 1,
    name: "Paneer Butter Masala",
    nameHindi: "पनीर बटर मसाला",
    cuisine: "North Indian",
    category: "Curries",
    time: "45 mins",
    prepTime: "15 mins",
    cookTime: "30 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.9,
    image: "/paneer-butter-masala-curry-indian.jpg",
    description: "Creamy and rich paneer curry cooked in a tomato-based gravy with butter and cream.",
    descriptionHindi: "मक्खन और क्रीम के साथ टमाटर आधारित ग्रेवी में पकाया गया मलाईदार और समृद्ध पनीर करी।",
    ingredients: [
      { item: "Paneer (cubed)", itemHindi: "पनीर (टुकड़े)", quantity: "250g", quantityHindi: "250 ग्राम" },
      { item: "Tomatoes (pureed)", itemHindi: "टमाटर (प्यूरी)", quantity: "2 large", quantityHindi: "2 बड़े" },
      { item: "Onion (finely chopped)", itemHindi: "प्याज (बारीक कटा)", quantity: "1 large", quantityHindi: "1 बड़ा" },
      { item: "Butter", itemHindi: "मक्खन", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Fresh Cream", itemHindi: "ताजी क्रीम", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Ginger-garlic paste", itemHindi: "अदरक-लहसुन पेस्ट", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Red chili powder", itemHindi: "लाल मिर्च पाउडर", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Turmeric powder", itemHindi: "हल्दी पाउडर", quantity: "1/2 tsp", quantityHindi: "1/2 छोटा चम्मच" },
      { item: "Garam masala", itemHindi: "गरम मसाला", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Kasuri methi", itemHindi: "कसूरी मेथी", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" },
    ],
    steps: [
      {
        step: 1,
        instruction:
          "Cut the paneer into 1-inch cubes. You can lightly fry them in butter for a golden texture, or use them as is for a softer bite.",
        instructionHindi:
          "पनीर को 1 इंच के टुकड़ों में काटें। सुनहरी बनावट के लिए उन्हें मक्खन में हल्का तल सकते हैं, या नरम बाइट के लिए वैसे ही उपयोग करें।",
        duration: "5 mins",
        tips: "For extra soft paneer, soak the cubes in warm water for 10 minutes.",
        tipsHindi: "अतिरिक्त नरम पनीर के लिए, टुकड़ों को 10 मिनट के लिए गर्म पानी में भिगोएं।",
      },
      {
        step: 2,
        instruction:
          "Heat butter in a heavy-bottomed pan over medium heat. Add the finely chopped onions and sauté until they turn golden brown.",
        instructionHindi: "मध्यम आंच पर एक भारी तले वाली कड़ाही में मक्खन गर्म करें। बारीक कटे प्याज डालें और सुनहरा भूरा होने तक भूनें।",
        duration: "8 mins",
        tips: "Don't rush this step - properly caramelized onions are key to the flavor.",
        tipsHindi: "इस स्टेप में जल्दबाजी न करें - ठीक से कैरामेलाइज्ड प्याज स्वाद की कुंजी है।",
      },
      {
        step: 3,
        instruction: "Add the ginger-garlic paste to the onions. Cook for 2 minutes until the raw smell disappears.",
        instructionHindi: "प्याज में अदरक-लहसुन पेस्ट डालें। कच्ची गंध गायब होने तक 2 मिनट पकाएं।",
        duration: "2 mins",
        tips: "Keep stirring to prevent burning.",
        tipsHindi: "जलने से बचाने के लिए हिलाते रहें।",
      },
      {
        step: 4,
        instruction:
          "Add the tomato puree, red chili powder, and turmeric. Cook on medium heat for 8-10 minutes, stirring occasionally, until the oil starts separating from the masala.",
        instructionHindi:
          "टमाटर की प्यूरी, लाल मिर्च पाउडर और हल्दी डालें। मध्यम आंच पर 8-10 मिनट पकाएं, कभी-कभी हिलाते हुए, जब तक मसाले से तेल अलग न होने लगे।",
        duration: "10 mins",
        tips: "The oil separation is a sign that your masala is perfectly cooked.",
        tipsHindi: "तेल का अलग होना इस बात का संकेत है कि आपका मसाला पूरी तरह पक गया है।",
      },
      {
        step: 5,
        instruction:
          "Lower the heat and add the fresh cream. Mix well to create a smooth, creamy gravy. Let it simmer for 3-4 minutes.",
        instructionHindi:
          "आंच धीमी करें और ताजी क्रीम डालें। एक चिकनी, मलाईदार ग्रेवी बनाने के लिए अच्छी तरह मिलाएं। 3-4 मिनट उबलने दें।",
        duration: "4 mins",
        tips: "Add cream slowly while stirring to prevent curdling.",
        tipsHindi: "फटने से बचाने के लिए हिलाते हुए धीरे-धीरे क्रीम डालें।",
      },
      {
        step: 6,
        instruction:
          "Add the paneer cubes to the gravy. Gently fold them in, being careful not to break them. Let them simmer in the gravy for 5 minutes.",
        instructionHindi: "ग्रेवी में पनीर के टुकड़े डालें। उन्हें धीरे से मिलाएं, ध्यान रखें कि वे टूटें नहीं। उन्हें ग्रेवी में 5 मिनट उबलने दें।",
        duration: "5 mins",
        tips: "Don't stir too vigorously - paneer is delicate!",
        tipsHindi: "बहुत जोर से न हिलाएं - पनीर नाजुक है!",
      },
      {
        step: 7,
        instruction:
          "Add garam masala and kasuri methi. Crush the kasuri methi between your palms before adding for maximum aroma.",
        instructionHindi: "गरम मसाला और कसूरी मेथी डालें। अधिकतम सुगंध के लिए डालने से पहले कसूरी मेथी को अपनी हथेलियों के बीच मसलें।",
        duration: "2 mins",
        tips: "Kasuri methi adds an authentic restaurant-style flavor.",
        tipsHindi: "कसूरी मेथी एक प्रामाणिक रेस्तरां शैली का स्वाद जोड़ती है।",
      },
      {
        step: 8,
        instruction:
          "Check the salt, adjust seasoning, and garnish with fresh cream and coriander leaves. Your Paneer Butter Masala is ready to serve!",
        instructionHindi:
          "नमक जांचें, मसाला समायोजित करें, और ताजी क्रीम और धनिया पत्तियों से सजाएं। आपका पनीर बटर मसाला परोसने के लिए तैयार है!",
        duration: "2 mins",
        tips: "Serve hot with naan, roti, or jeera rice.",
        tipsHindi: "नान, रोटी या जीरा राइस के साथ गर्मागर्म परोसें।",
      },
    ],
    tags: ["paneer", "vegetarian", "creamy", "popular", "restaurant-style"],
  },
  {
    id: 2,
    name: "Butter Chicken",
    nameHindi: "बटर चिकन",
    cuisine: "North Indian",
    category: "Curries",
    time: "55 mins",
    prepTime: "20 mins",
    cookTime: "35 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.9,
    image: "/butter-chicken-curry-indian.png",
    description: "Tender chicken pieces in a rich, creamy tomato-based curry with aromatic spices.",
    descriptionHindi: "सुगंधित मसालों के साथ समृद्ध, मलाईदार टमाटर आधारित करी में नरम चिकन के टुकड़े।",
    ingredients: [
      { item: "Chicken (boneless)", itemHindi: "चिकन (बोनलेस)", quantity: "500g", quantityHindi: "500 ग्राम" },
      { item: "Yogurt", itemHindi: "दही", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Tomato puree", itemHindi: "टमाटर प्यूरी", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Butter", itemHindi: "मक्खन", quantity: "4 tbsp", quantityHindi: "4 बड़े चम्मच" },
      { item: "Fresh Cream", itemHindi: "ताजी क्रीम", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Ginger-garlic paste", itemHindi: "अदरक-लहसुन पेस्ट", quantity: "2 tsp", quantityHindi: "2 छोटे चम्मच" },
      { item: "Red chili powder", itemHindi: "लाल मिर्च पाउडर", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Garam masala", itemHindi: "गरम मसाला", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Kashmiri red chili", itemHindi: "कश्मीरी लाल मिर्च", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Kasuri methi", itemHindi: "कसूरी मेथी", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction:
          "Marinate chicken with yogurt, ginger-garlic paste, red chili powder, and salt. Let it rest for 30 minutes or overnight in the refrigerator.",
        instructionHindi: "दही, अदरक-लहसुन पेस्ट, लाल मिर्च पाउडर और नमक के साथ चिकन मैरीनेट करें। 30 मिनट या रात भर फ्रिज में रखें।",
        duration: "30 mins",
        tips: "Overnight marination gives the best flavor.",
        tipsHindi: "रात भर मैरीनेट करने से सबसे अच्छा स्वाद मिलता है।",
      },
      {
        step: 2,
        instruction: "Grill or pan-fry the marinated chicken until cooked through and slightly charred. Set aside.",
        instructionHindi: "मैरीनेट किए हुए चिकन को ग्रिल करें या पैन में तलें जब तक पक न जाए और थोड़ा झुलस न जाए। अलग रखें।",
        duration: "12 mins",
      },
      {
        step: 3,
        instruction: "In a pan, melt butter. Add tomato puree and Kashmiri red chili. Cook until oil separates.",
        instructionHindi: "एक पैन में मक्खन पिघलाएं। टमाटर प्यूरी और कश्मीरी लाल मिर्च डालें। तेल अलग होने तक पकाएं।",
        duration: "15 mins",
      },
      {
        step: 4,
        instruction: "Lower heat, add cream and mix well. Add the cooked chicken pieces.",
        instructionHindi: "आंच धीमी करें, क्रीम डालें और अच्छी तरह मिलाएं। पके हुए चिकन के टुकड़े डालें।",
        duration: "5 mins",
      },
      {
        step: 5,
        instruction: "Add garam masala and kasuri methi. Simmer for 5 minutes. Garnish with cream and serve hot.",
        instructionHindi: "गरम मसाला और कसूरी मेथी डालें। 5 मिनट उबालें। क्रीम से सजाएं और गर्मागर्म परोसें।",
        duration: "5 mins",
      },
    ],
    tags: ["chicken", "non-veg", "creamy", "popular", "restaurant-style"],
  },
  {
    id: 3,
    name: "Dal Makhani",
    nameHindi: "दाल मखनी",
    cuisine: "Punjabi",
    category: "Curries",
    time: "8 hours",
    prepTime: "8 hours",
    cookTime: "60 mins",
    servings: 6,
    difficulty: "Medium",
    rating: 4.9,
    image: "/dal-makhani-lentils-indian.jpg",
    description: "Slow-cooked black lentils and kidney beans in a creamy, buttery tomato gravy.",
    descriptionHindi: "मलाईदार, मक्खनी टमाटर ग्रेवी में धीमी आंच पर पकी काली दाल और राजमा।",
    ingredients: [
      { item: "Black lentils (urad dal)", itemHindi: "काली दाल (उड़द दाल)", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Kidney beans (rajma)", itemHindi: "राजमा", quantity: "1/4 cup", quantityHindi: "1/4 कप" },
      { item: "Butter", itemHindi: "मक्खन", quantity: "4 tbsp", quantityHindi: "4 बड़े चम्मच" },
      { item: "Fresh Cream", itemHindi: "ताजी क्रीम", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Tomato puree", itemHindi: "टमाटर प्यूरी", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Ginger-garlic paste", itemHindi: "अदरक-लहसुन पेस्ट", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Red chili powder", itemHindi: "लाल मिर्च पाउडर", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Garam masala", itemHindi: "गरम मसाला", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Soak black lentils and kidney beans overnight or for at least 8 hours.",
        instructionHindi: "काली दाल और राजमा को रात भर या कम से कम 8 घंटे के लिए भिगोएं।",
        duration: "8 hours",
        tips: "Well-soaked dal cooks faster and better.",
        tipsHindi: "अच्छी तरह भीगी दाल जल्दी और बेहतर पकती है।",
      },
      {
        step: 2,
        instruction: "Pressure cook the soaked dal with salt until soft. It should take about 6-7 whistles.",
        instructionHindi: "भीगी हुई दाल को नमक के साथ नरम होने तक प्रेशर कुक करें। इसमें लगभग 6-7 सीटी लगनी चाहिए।",
        duration: "25 mins",
        tips: "Dal should be completely mushy.",
        tipsHindi: "दाल पूरी तरह गल जानी चाहिए।",
      },
      {
        step: 3,
        instruction: "In a pan, heat butter. Add ginger-garlic paste and sauté until fragrant.",
        instructionHindi: "एक पैन में मक्खन गर्म करें। अदरक-लहसुन पेस्ट डालें और खुशबू आने तक भूनें।",
        duration: "3 mins",
      },
      {
        step: 4,
        instruction: "Add tomato puree and red chili powder. Cook until oil separates.",
        instructionHindi: "टमाटर प्यूरी और लाल मिर्च पाउडर डालें। तेल अलग होने तक पकाएं।",
        duration: "10 mins",
      },
      {
        step: 5,
        instruction: "Add the cooked dal to the masala. Simmer on low heat for 30 minutes, stirring occasionally.",
        instructionHindi: "मसाले में पकी हुई दाल डालें। धीमी आंच पर 30 मिनट उबालें, कभी-कभी हिलाते रहें।",
        duration: "30 mins",
      },
      {
        step: 6,
        instruction: "Add cream and garam masala. Simmer for 5 more minutes. Serve with a dollop of butter.",
        instructionHindi: "क्रीम और गरम मसाला डालें। 5 मिनट और उबालें। मक्खन की टिक्की के साथ परोसें।",
        duration: "5 mins",
      },
    ],
    whistleCount: 7,
    tags: ["dal", "lentils", "vegetarian", "creamy", "punjabi", "slow-cooked"],
  },
  {
    id: 4,
    name: "Chole Bhature",
    nameHindi: "छोले भटूरे",
    cuisine: "Punjabi",
    category: "Street Food",
    time: "60 mins",
    prepTime: "20 mins",
    cookTime: "40 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    image: "/chole-bhature-indian-street-food.jpg",
    description: "Spicy chickpea curry served with deep-fried fluffy bread - a classic Punjabi breakfast.",
    descriptionHindi: "मसालेदार छोले करी जो फूली हुई तली हुई भटूरे के साथ परोसी जाती है - एक क्लासिक पंजाबी नाश्ता।",
    ingredients: [
      { item: "Chickpeas (kabuli chana)", itemHindi: "काबुली चना", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Onion (chopped)", itemHindi: "प्याज (कटा हुआ)", quantity: "2 large", quantityHindi: "2 बड़े" },
      { item: "Tomato (pureed)", itemHindi: "टमाटर (प्यूरी)", quantity: "3 medium", quantityHindi: "3 मध्यम" },
      { item: "Chole masala", itemHindi: "छोले मसाला", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Tea bag", itemHindi: "चाय बैग", quantity: "1", quantityHindi: "1" },
      { item: "All-purpose flour (maida)", itemHindi: "मैदा", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Yogurt", itemHindi: "दही", quantity: "1/4 cup", quantityHindi: "1/4 कप" },
      { item: "Baking powder", itemHindi: "बेकिंग पाउडर", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Soak chickpeas overnight. Pressure cook with tea bag and salt until soft, about 4-5 whistles.",
        instructionHindi: "चने को रात भर भिगोएं। चाय बैग और नमक के साथ नरम होने तक प्रेशर कुक करें, लगभग 4-5 सीटी।",
        duration: "30 mins",
      },
      {
        step: 2,
        instruction:
          "For bhature, mix flour, yogurt, baking powder, salt, and sugar. Knead into soft dough. Rest for 2 hours.",
        instructionHindi: "भटूरे के लिए, मैदा, दही, बेकिंग पाउडर, नमक और चीनी मिलाएं। नरम आटा गूंथें। 2 घंटे आराम दें।",
        duration: "2 hours",
      },
      {
        step: 3,
        instruction: "Heat oil in a pan. Sauté onions until golden. Add ginger-garlic paste and cook.",
        instructionHindi: "पैन में तेल गर्म करें। प्याज को सुनहरा होने तक भूनें। अदरक-लहसुन पेस्ट डालें और पकाएं।",
        duration: "8 mins",
      },
      {
        step: 4,
        instruction:
          "Add tomato puree and chole masala. Cook until oil separates. Add cooked chickpeas with some water.",
        instructionHindi: "टमाटर प्यूरी और छोले मसाला डालें। तेल अलग होने तक पकाएं। कुछ पानी के साथ पके हुए चने डालें।",
        duration: "15 mins",
      },
      {
        step: 5,
        instruction: "Roll bhature dough into oval shapes. Deep fry in hot oil until puffed and golden.",
        instructionHindi: "भटूरे के आटे को अंडाकार आकार में बेलें। फूलने और सुनहरा होने तक गर्म तेल में तलें।",
        duration: "15 mins",
      },
    ],
    whistleCount: 5,
    tags: ["chickpeas", "punjabi", "street-food", "breakfast", "popular"],
  },
  {
    id: 5,
    name: "Aloo Gobi",
    nameHindi: "आलू गोभी",
    cuisine: "North Indian",
    category: "Curries",
    time: "35 mins",
    prepTime: "10 mins",
    cookTime: "25 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    image: "/aloo-gobi-potato-cauliflower-indian.jpg",
    description: "A dry curry made with potatoes and cauliflower, flavored with turmeric and cumin.",
    descriptionHindi: "हल्दी और जीरे के स्वाद वाली आलू और फूलगोभी से बनी सूखी सब्जी।",
    ingredients: [
      { item: "Potatoes (cubed)", itemHindi: "आलू (टुकड़े)", quantity: "2 medium", quantityHindi: "2 मध्यम" },
      { item: "Cauliflower florets", itemHindi: "गोभी के फूल", quantity: "1 medium head", quantityHindi: "1 मध्यम" },
      { item: "Onion (sliced)", itemHindi: "प्याज (कटा)", quantity: "1 large", quantityHindi: "1 बड़ा" },
      { item: "Cumin seeds", itemHindi: "जीरा", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Turmeric powder", itemHindi: "हल्दी पाउडर", quantity: "1/2 tsp", quantityHindi: "1/2 छोटा चम्मच" },
      { item: "Red chili powder", itemHindi: "लाल मिर्च पाउडर", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Garam masala", itemHindi: "गरम मसाला", quantity: "1/2 tsp", quantityHindi: "1/2 छोटा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Heat oil in a pan. Add cumin seeds and let them splutter.",
        instructionHindi: "पैन में तेल गर्म करें। जीरा डालें और चटकने दें।",
        duration: "1 min",
      },
      {
        step: 2,
        instruction: "Add sliced onions and sauté until translucent.",
        instructionHindi: "कटे प्याज डालें और पारदर्शी होने तक भूनें।",
        duration: "5 mins",
      },
      {
        step: 3,
        instruction: "Add potatoes and cauliflower. Mix well with turmeric, red chili powder, and salt.",
        instructionHindi: "आलू और गोभी डालें। हल्दी, लाल मिर्च पाउडर और नमक के साथ अच्छी तरह मिलाएं।",
        duration: "3 mins",
      },
      {
        step: 4,
        instruction: "Cover and cook on low heat until vegetables are tender, stirring occasionally.",
        instructionHindi: "ढककर धीमी आंच पर सब्जियां नरम होने तक पकाएं, कभी-कभी हिलाते रहें।",
        duration: "15 mins",
      },
      {
        step: 5,
        instruction: "Add garam masala, mix well, and garnish with fresh coriander.",
        instructionHindi: "गरम मसाला डालें, अच्छी तरह मिलाएं और ताजे धनिये से सजाएं।",
        duration: "2 mins",
      },
    ],
    tags: ["potato", "cauliflower", "vegetarian", "dry-curry", "easy"],
  },
  {
    id: 6,
    name: "Rajma Chawal",
    nameHindi: "राजमा चावल",
    cuisine: "Punjabi",
    category: "Rice Dishes",
    time: "60 mins",
    prepTime: "8 hours",
    cookTime: "45 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    image: "/rajma-chawal-kidney-beans-rice-indian.jpg",
    description: "Kidney beans cooked in a thick tomato gravy, served over steamed rice.",
    descriptionHindi: "गाढ़ी टमाटर ग्रेवी में पके हुए राजमा, उबले चावल के साथ परोसे जाते हैं।",
    ingredients: [
      { item: "Kidney beans (rajma)", itemHindi: "राजमा", quantity: "1.5 cups", quantityHindi: "1.5 कप" },
      { item: "Basmati rice", itemHindi: "बासमती चावल", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Onion (chopped)", itemHindi: "प्याज (कटा)", quantity: "2 large", quantityHindi: "2 बड़े" },
      { item: "Tomato (pureed)", itemHindi: "टमाटर (प्यूरी)", quantity: "3 large", quantityHindi: "3 बड़े" },
      { item: "Ginger-garlic paste", itemHindi: "अदरक-लहसुन पेस्ट", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Rajma masala", itemHindi: "राजमा मसाला", quantity: "2 tsp", quantityHindi: "2 छोटे चम्मच" },
      { item: "Garam masala", itemHindi: "गरम मसाला", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Soak rajma overnight. Pressure cook until soft, about 5-6 whistles. Reserve the water.",
        instructionHindi: "राजमा को रात भर भिगोएं। नरम होने तक प्रेशर कुक करें, लगभग 5-6 सीटी। पानी बचाकर रखें।",
        duration: "30 mins",
      },
      {
        step: 2,
        instruction: "Heat oil, sauté onions until golden. Add ginger-garlic paste and cook until fragrant.",
        instructionHindi: "तेल गर्म करें, प्याज को सुनहरा होने तक भूनें। अदरक-लहसुन पेस्ट डालें और खुशबू आने तक पकाएं।",
        duration: "8 mins",
      },
      {
        step: 3,
        instruction: "Add tomato puree and cook until oil separates. Add rajma masala and mix well.",
        instructionHindi: "टमाटर प्यूरी डालें और तेल अलग होने तक पकाएं। राजमा मसाला डालें और अच्छी तरह मिलाएं।",
        duration: "10 mins",
      },
      {
        step: 4,
        instruction: "Add cooked rajma with its water. Simmer for 15-20 minutes until gravy thickens.",
        instructionHindi: "पके राजमा को उसके पानी के साथ डालें। ग्रेवी गाढ़ी होने तक 15-20 मिनट उबालें।",
        duration: "20 mins",
      },
      {
        step: 5,
        instruction: "Meanwhile, cook basmati rice. Serve hot rajma over steamed rice with a dollop of butter.",
        instructionHindi: "इस बीच, बासमती चावल पकाएं। उबले चावल पर गर्म राजमा मक्खन के साथ परोसें।",
        duration: "15 mins",
      },
    ],
    whistleCount: 6,
    tags: ["rajma", "kidney-beans", "rice", "punjabi", "comfort-food"],
  },
  // ============ SOUTH INDIAN ============
  {
    id: 7,
    name: "Masala Dosa",
    nameHindi: "मसाला डोसा",
    cuisine: "South Indian",
    category: "Breakfast",
    time: "30 mins",
    prepTime: "8 hours",
    cookTime: "20 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    image: "/masala-dosa-south-indian-crispy.jpg",
    description: "Crispy fermented rice crepe filled with spiced potato filling, served with sambhar and chutney.",
    descriptionHindi: "मसालेदार आलू भरे कुरकुरे किण्वित चावल क्रेप, सांबर और चटनी के साथ परोसे जाते हैं।",
    ingredients: [
      { item: "Dosa batter", itemHindi: "डोसा बैटर", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Potatoes (boiled, mashed)", itemHindi: "आलू (उबले, मैश)", quantity: "4 medium", quantityHindi: "4 मध्यम" },
      { item: "Onion (sliced)", itemHindi: "प्याज (कटा)", quantity: "2 large", quantityHindi: "2 बड़े" },
      { item: "Mustard seeds", itemHindi: "राई", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Curry leaves", itemHindi: "करी पत्ता", quantity: "10-12", quantityHindi: "10-12" },
      { item: "Green chilies", itemHindi: "हरी मिर्च", quantity: "2-3", quantityHindi: "2-3" },
      { item: "Turmeric powder", itemHindi: "हल्दी पाउडर", quantity: "1/2 tsp", quantityHindi: "1/2 छोटा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "For the filling, heat oil and add mustard seeds. Let them splutter.",
        instructionHindi: "भरावन के लिए, तेल गर्म करें और राई डालें। चटकने दें।",
        duration: "1 min",
      },
      {
        step: 2,
        instruction: "Add curry leaves, green chilies, and sliced onions. Sauté until onions are soft.",
        instructionHindi: "करी पत्ता, हरी मिर्च और कटे प्याज डालें। प्याज नरम होने तक भूनें।",
        duration: "5 mins",
      },
      {
        step: 3,
        instruction: "Add turmeric and mashed potatoes. Mix well and cook for 5 minutes. Season with salt.",
        instructionHindi: "हल्दी और मैश किए आलू डालें। अच्छी तरह मिलाएं और 5 मिनट पकाएं। नमक डालें।",
        duration: "5 mins",
      },
      {
        step: 4,
        instruction:
          "Heat a dosa tawa. Spread batter in circular motion to make a thin crepe. Drizzle oil around edges.",
        instructionHindi: "डोसा तवा गर्म करें। पतला क्रेप बनाने के लिए बैटर को गोलाई में फैलाएं। किनारों पर तेल डालें।",
        duration: "3 mins",
      },
      {
        step: 5,
        instruction: "When dosa turns golden, place potato filling in center. Fold and serve with sambhar and chutney.",
        instructionHindi: "जब डोसा सुनहरा हो जाए, बीच में आलू भरावन रखें। मोड़ें और सांबर-चटनी के साथ परोसें।",
        duration: "2 mins",
      },
    ],
    tags: ["dosa", "south-indian", "breakfast", "crispy", "fermented"],
  },
  {
    id: 8,
    name: "Idli Sambhar",
    nameHindi: "इडली सांबर",
    cuisine: "South Indian",
    category: "Breakfast",
    time: "25 mins",
    prepTime: "8 hours",
    cookTime: "20 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.6,
    image: "/idli-sambhar-south-indian-breakfast.jpg",
    description: "Steamed rice cakes served with lentil-based vegetable stew and coconut chutney.",
    descriptionHindi: "दाल आधारित सब्जी स्टू और नारियल चटनी के साथ भाप में पके चावल के केक।",
    ingredients: [
      { item: "Idli batter", itemHindi: "इडली बैटर", quantity: "3 cups", quantityHindi: "3 कप" },
      { item: "Toor dal", itemHindi: "तूर दाल", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Mixed vegetables", itemHindi: "मिली-जुली सब्जियां", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Sambhar powder", itemHindi: "सांबर पाउडर", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Tamarind pulp", itemHindi: "इमली का गूदा", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Mustard seeds", itemHindi: "राई", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Curry leaves", itemHindi: "करी पत्ता", quantity: "10", quantityHindi: "10" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Grease idli molds. Pour batter and steam for 10-12 minutes until a toothpick comes out clean.",
        instructionHindi: "इडली के सांचों में घी लगाएं। बैटर डालें और 10-12 मिनट भाप में पकाएं जब तक टूथपिक साफ न निकले।",
        duration: "12 mins",
      },
      {
        step: 2,
        instruction: "For sambhar, pressure cook toor dal with turmeric until soft, about 3 whistles.",
        instructionHindi: "सांबर के लिए, तूर दाल को हल्दी के साथ नरम होने तक प्रेशर कुक करें, लगभग 3 सीटी।",
        duration: "15 mins",
      },
      {
        step: 3,
        instruction: "Cook vegetables separately. Add to mashed dal along with sambhar powder and tamarind.",
        instructionHindi: "सब्जियां अलग से पकाएं। मैश दाल में सांबर पाउडर और इमली के साथ डालें।",
        duration: "10 mins",
      },
      {
        step: 4,
        instruction: "For tempering, heat oil, add mustard seeds, curry leaves, and dried red chilies.",
        instructionHindi: "तड़के के लिए, तेल गर्म करें, राई, करी पत्ता और सूखी लाल मिर्च डालें।",
        duration: "2 mins",
      },
      {
        step: 5,
        instruction: "Pour tempering over sambhar. Serve hot idlis with sambhar and coconut chutney.",
        instructionHindi: "सांबर पर तड़का डालें। गर्म इडली सांबर और नारियल चटनी के साथ परोसें।",
        duration: "2 mins",
      },
    ],
    whistleCount: 3,
    tags: ["idli", "south-indian", "breakfast", "healthy", "steamed"],
  },
  {
    id: 9,
    name: "Hyderabadi Biryani",
    nameHindi: "हैदराबादी बिरयानी",
    cuisine: "Hyderabadi",
    category: "Rice Dishes",
    time: "90 mins",
    prepTime: "30 mins",
    cookTime: "60 mins",
    servings: 6,
    difficulty: "Hard",
    rating: 4.9,
    image: "/hyderabadi-biryani-rice-indian.jpg",
    description: "Aromatic layered rice dish with marinated meat, saffron, and fried onions.",
    descriptionHindi: "मैरीनेटेड मीट, केसर और तले प्याज के साथ सुगंधित परतदार चावल का व्यंजन।",
    ingredients: [
      { item: "Basmati rice", itemHindi: "बासमती चावल", quantity: "3 cups", quantityHindi: "3 कप" },
      { item: "Chicken/Mutton", itemHindi: "चिकन/मटन", quantity: "750g", quantityHindi: "750 ग्राम" },
      { item: "Yogurt", itemHindi: "दही", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Onion (sliced)", itemHindi: "प्याज (कटा)", quantity: "4 large", quantityHindi: "4 बड़े" },
      { item: "Saffron", itemHindi: "केसर", quantity: "1/4 tsp", quantityHindi: "1/4 छोटा चम्मच" },
      { item: "Warm milk", itemHindi: "गर्म दूध", quantity: "1/4 cup", quantityHindi: "1/4 कप" },
      { item: "Biryani masala", itemHindi: "बिरयानी मसाला", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Ghee", itemHindi: "घी", quantity: "4 tbsp", quantityHindi: "4 बड़े चम्मच" },
      { item: "Mint leaves", itemHindi: "पुदीना", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Ginger-garlic paste", itemHindi: "अदरक-लहसुन पेस्ट", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction:
          "Soak saffron in warm milk. Soak rice for 30 minutes, then parboil with whole spices until 70% cooked.",
        instructionHindi: "गर्म दूध में केसर भिगोएं। चावल 30 मिनट भिगोएं, फिर साबुत मसालों के साथ 70% पकने तक उबालें।",
        duration: "25 mins",
      },
      {
        step: 2,
        instruction: "Fry sliced onions until deep golden brown. Set aside half for garnish.",
        instructionHindi: "कटे प्याज को गहरा सुनहरा भूरा होने तक तलें। गार्निश के लिए आधा अलग रखें।",
        duration: "15 mins",
      },
      {
        step: 3,
        instruction:
          "Marinate meat with yogurt, ginger-garlic paste, biryani masala, mint, and half the fried onions. Rest for 1 hour.",
        instructionHindi: "मांस को दही, अदरक-लहसुन पेस्ट, बिरयानी मसाला, पुदीना और आधे तले प्याज के साथ मैरीनेट करें। 1 घंटा आराम दें।",
        duration: "60 mins",
      },
      {
        step: 4,
        instruction:
          "In a heavy pot, spread marinated meat. Layer parboiled rice on top. Sprinkle saffron milk and ghee.",
        instructionHindi: "भारी बर्तन में मैरीनेटेड मांस फैलाएं। ऊपर अधपके चावल की परत रखें। केसर दूध और घी छिड़कें।",
        duration: "5 mins",
      },
      {
        step: 5,
        instruction: "Seal pot with dough or tight lid. Cook on high heat for 3 mins, then low heat for 40 mins (dum).",
        instructionHindi: "बर्तन को आटे या कसे ढक्कन से सील करें। तेज आंच पर 3 मिनट, फिर धीमी आंच पर 40 मिनट (दम) पकाएं।",
        duration: "45 mins",
      },
      {
        step: 6,
        instruction:
          "Let it rest for 5 mins. Gently mix layers and serve garnished with fried onions, mint, and boiled eggs.",
        instructionHindi: "5 मिनट आराम दें। धीरे से परतें मिलाएं और तले प्याज, पुदीना और उबले अंडे से सजाकर परोसें।",
        duration: "5 mins",
      },
    ],
    tags: ["biryani", "rice", "hyderabadi", "dum", "layered", "aromatic"],
  },
  {
    id: 10,
    name: "Vada",
    nameHindi: "वड़ा",
    cuisine: "South Indian",
    category: "Snacks",
    time: "45 mins",
    prepTime: "4 hours",
    cookTime: "20 mins",
    servings: 6,
    difficulty: "Medium",
    rating: 4.6,
    image: "/medu-vada-south-indian-crispy.jpg",
    description: "Crispy fried lentil donuts, a popular South Indian snack served with sambhar and chutney.",
    descriptionHindi: "कुरकुरे तले हुए दाल के डोनट्स, सांबर और चटनी के साथ परोसा जाने वाला लोकप्रिय दक्षिण भारतीय नाश्ता।",
    ingredients: [
      { item: "Urad dal", itemHindi: "उड़द दाल", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Green chilies", itemHindi: "हरी मिर्च", quantity: "2-3", quantityHindi: "2-3" },
      { item: "Ginger (grated)", itemHindi: "अदरक (कद्दूकस)", quantity: "1 inch", quantityHindi: "1 इंच" },
      { item: "Curry leaves", itemHindi: "करी पत्ता", quantity: "10", quantityHindi: "10" },
      { item: "Onion (chopped)", itemHindi: "प्याज (कटा)", quantity: "1 small", quantityHindi: "1 छोटा" },
      { item: "Black pepper", itemHindi: "काली मिर्च", quantity: "1/2 tsp", quantityHindi: "1/2 छोटा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Soak urad dal for 4 hours. Drain and grind to a thick, fluffy batter using minimal water.",
        instructionHindi: "उड़द दाल को 4 घंटे भिगोएं। छान लें और कम से कम पानी से गाढ़ा, फूला हुआ बैटर पीस लें।",
        duration: "4 hours",
      },
      {
        step: 2,
        instruction: "Add salt, green chilies, ginger, curry leaves, onion, and pepper to the batter. Mix well.",
        instructionHindi: "बैटर में नमक, हरी मिर्च, अदरक, करी पत्ता, प्याज और काली मिर्च डालें। अच्छी तरह मिलाएं।",
        duration: "5 mins",
      },
      {
        step: 3,
        instruction:
          "Heat oil for deep frying. Wet your hands, take a portion of batter, shape into a donut with a hole in center.",
        instructionHindi: "तलने के लिए तेल गर्म करें। हाथ गीले करें, बैटर का हिस्सा लें, बीच में छेद वाला डोनट आकार दें।",
        duration: "2 mins",
      },
      {
        step: 4,
        instruction: "Gently slide vada into hot oil. Fry on medium heat until golden brown and crispy on both sides.",
        instructionHindi: "वड़े को धीरे से गर्म तेल में डालें। मध्यम आंच पर दोनों तरफ से सुनहरा और कुरकुरा होने तक तलें।",
        duration: "5 mins each",
      },
      {
        step: 5,
        instruction: "Drain on paper towels. Serve hot with sambhar and coconut chutney.",
        instructionHindi: "पेपर टॉवल पर निकालें। सांबर और नारियल चटनी के साथ गर्मागर्म परोसें।",
        duration: "2 mins",
      },
    ],
    tags: ["vada", "south-indian", "fried", "snack", "crispy"],
  },
  // ============ STREET FOOD ============
  {
    id: 11,
    name: "Pani Puri",
    nameHindi: "पानी पूरी",
    cuisine: "North Indian",
    category: "Street Food",
    time: "45 mins",
    prepTime: "30 mins",
    cookTime: "15 mins",
    servings: 6,
    difficulty: "Medium",
    rating: 4.9,
    image: "/pani-puri-golgappa-indian-street-food.jpg",
    description: "Crispy hollow puris filled with spiced water, tamarind chutney, and potato filling.",
    descriptionHindi: "मसालेदार पानी, इमली चटनी और आलू भरावन से भरी कुरकुरी खोखली पूरियां।",
    ingredients: [
      { item: "Semolina (sooji)", itemHindi: "सूजी", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "All-purpose flour", itemHindi: "मैदा", quantity: "1/4 cup", quantityHindi: "1/4 कप" },
      { item: "Potatoes (boiled)", itemHindi: "आलू (उबले)", quantity: "2 medium", quantityHindi: "2 मध्यम" },
      { item: "Black chickpeas", itemHindi: "काला चना", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Mint leaves", itemHindi: "पुदीना", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Coriander leaves", itemHindi: "धनिया पत्ता", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Tamarind", itemHindi: "इमली", quantity: "1/4 cup", quantityHindi: "1/4 कप" },
      { item: "Chaat masala", itemHindi: "चाट मसाला", quantity: "2 tsp", quantityHindi: "2 छोटे चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction:
          "Mix semolina and flour with water to make stiff dough. Rest for 20 mins. Roll thin and cut circles.",
        instructionHindi: "सूजी और मैदा को पानी से मिलाकर सख्त आटा गूंथें। 20 मिनट आराम दें। पतला बेलें और गोले काटें।",
        duration: "25 mins",
      },
      {
        step: 2,
        instruction: "Deep fry puris on high heat until they puff up and turn crispy golden.",
        instructionHindi: "तेज आंच पर पूरियां फूलने और कुरकुरा सुनहरा होने तक तलें।",
        duration: "15 mins",
      },
      {
        step: 3,
        instruction:
          "For pani, blend mint, coriander, green chili, cumin, and cold water. Season with black salt and chaat masala.",
        instructionHindi: "पानी के लिए, पुदीना, धनिया, हरी मिर्च, जीरा और ठंडा पानी ब्लेंड करें। काला नमक और चाट मसाला डालें।",
        duration: "10 mins",
      },
      {
        step: 4,
        instruction: "Prepare tamarind-date chutney by cooking tamarind and jaggery together until thick.",
        instructionHindi: "इमली और गुड़ को साथ पकाकर गाढ़ी इमली-खजूर चटनी बनाएं।",
        duration: "10 mins",
      },
      {
        step: 5,
        instruction: "To serve, crack puri top, add potato-chickpea filling, both chutneys, and fill with spiced pani.",
        instructionHindi: "परोसने के लिए, पूरी ऊपर से तोड़ें, आलू-चना भरावन, दोनों चटनी डालें और मसाला पानी भरें।",
        duration: "5 mins",
      },
    ],
    tags: ["pani-puri", "golgappa", "street-food", "chaat", "crispy"],
  },
  {
    id: 12,
    name: "Samosa",
    nameHindi: "समोसा",
    cuisine: "North Indian",
    category: "Snacks",
    time: "60 mins",
    prepTime: "30 mins",
    cookTime: "30 mins",
    servings: 8,
    difficulty: "Medium",
    rating: 4.8,
    image: "/samosa-indian-snack-fried.jpg",
    description: "Crispy triangular pastries filled with spiced potatoes and peas.",
    descriptionHindi: "मसालेदार आलू और मटर से भरी कुरकुरी त्रिकोणीय पेस्ट्री।",
    ingredients: [
      { item: "All-purpose flour", itemHindi: "मैदा", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Potatoes (boiled)", itemHindi: "आलू (उबले)", quantity: "4 medium", quantityHindi: "4 मध्यम" },
      { item: "Green peas", itemHindi: "हरे मटर", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Cumin seeds", itemHindi: "जीरा", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Garam masala", itemHindi: "गरम मसाला", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Green chilies", itemHindi: "हरी मिर्च", quantity: "2-3", quantityHindi: "2-3" },
      { item: "Ginger (grated)", itemHindi: "अदरक (कद्दूकस)", quantity: "1 inch", quantityHindi: "1 इंच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Make dough with flour, oil, salt, and water. Knead until smooth. Rest for 30 mins.",
        instructionHindi: "मैदा, तेल, नमक और पानी से आटा बनाएं। चिकना होने तक गूंथें। 30 मिनट आराम दें।",
        duration: "35 mins",
      },
      {
        step: 2,
        instruction: "Heat oil, add cumin. Add ginger, chilies, peas. Cook 3 mins. Add mashed potatoes and spices.",
        instructionHindi: "तेल गर्म करें, जीरा डालें। अदरक, मिर्च, मटर डालें। 3 मिनट पकाएं। मैश आलू और मसाले डालें।",
        duration: "10 mins",
      },
      {
        step: 3,
        instruction:
          "Divide dough into balls. Roll each into oval, cut in half. Form cone and fill with potato mixture.",
        instructionHindi: "आटे की गोलियां बनाएं। प्रत्येक को अंडाकार बेलें, आधा काटें। कोन बनाएं और आलू मिश्रण भरें।",
        duration: "20 mins",
      },
      {
        step: 4,
        instruction: "Seal edges with water paste. Deep fry on medium-low heat until golden and crispy.",
        instructionHindi: "पानी के पेस्ट से किनारे सील करें। मध्यम-धीमी आंच पर सुनहरा और कुरकुरा होने तक तलें।",
        duration: "20 mins",
      },
      {
        step: 5,
        instruction: "Serve hot with mint chutney and tamarind chutney.",
        instructionHindi: "पुदीने की चटनी और इमली की चटनी के साथ गर्मागर्म परोसें।",
        duration: "2 mins",
      },
    ],
    tags: ["samosa", "snack", "fried", "potato", "popular"],
  },
  {
    id: 13,
    name: "Vada Pav",
    nameHindi: "वड़ा पाव",
    cuisine: "Maharashtrian",
    category: "Street Food",
    time: "45 mins",
    prepTime: "20 mins",
    cookTime: "25 mins",
    servings: 6,
    difficulty: "Easy",
    rating: 4.7,
    image: "/vada-pav-mumbai-street-food.jpg",
    description: "Mumbai's iconic street food - spiced potato fritter in a bread bun with chutneys.",
    descriptionHindi: "मुंबई का प्रतिष्ठित स्ट्रीट फूड - चटनी के साथ पाव में मसालेदार आलू वड़ा।",
    ingredients: [
      { item: "Potatoes (boiled)", itemHindi: "आलू (उबले)", quantity: "4 large", quantityHindi: "4 बड़े" },
      { item: "Gram flour (besan)", itemHindi: "बेसन", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Pav (bread rolls)", itemHindi: "पाव", quantity: "6", quantityHindi: "6" },
      { item: "Garlic (minced)", itemHindi: "लहसुन (कद्दूकस)", quantity: "6-8 cloves", quantityHindi: "6-8 कली" },
      { item: "Green chilies", itemHindi: "हरी मिर्च", quantity: "4-5", quantityHindi: "4-5" },
      { item: "Mustard seeds", itemHindi: "राई", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Turmeric powder", itemHindi: "हल्दी पाउडर", quantity: "1/2 tsp", quantityHindi: "1/2 छोटा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Heat oil, add mustard seeds, curry leaves. Add garlic, green chilies paste, and turmeric.",
        instructionHindi: "तेल गर्म करें, राई, करी पत्ता डालें। लहसुन, हरी मिर्च पेस्ट और हल्दी डालें।",
        duration: "3 mins",
      },
      {
        step: 2,
        instruction: "Add mashed potatoes, salt, and mix well. Shape into round patties.",
        instructionHindi: "मैश आलू, नमक डालें और अच्छी तरह मिलाएं। गोल टिक्की आकार दें।",
        duration: "10 mins",
      },
      {
        step: 3,
        instruction: "Make besan batter with gram flour, salt, turmeric, and water. It should coat the back of spoon.",
        instructionHindi: "बेसन, नमक, हल्दी और पानी से बेसन घोल बनाएं। यह चम्मच के पीछे लगना चाहिए।",
        duration: "5 mins",
      },
      {
        step: 4,
        instruction: "Dip potato patties in batter and deep fry until golden and crispy.",
        instructionHindi: "आलू टिक्की को घोल में डुबोएं और सुनहरा व कुरकुरा होने तक तलें।",
        duration: "15 mins",
      },
      {
        step: 5,
        instruction: "Slice pav, spread dry garlic chutney, add vada, top with green chutney. Serve hot.",
        instructionHindi: "पाव काटें, सूखी लहसुन चटनी लगाएं, वड़ा रखें, हरी चटनी डालें। गर्मागर्म परोसें।",
        duration: "5 mins",
      },
    ],
    tags: ["vada-pav", "mumbai", "street-food", "quick", "popular"],
  },
  {
    id: 14,
    name: "Bhel Puri",
    nameHindi: "भेल पूरी",
    cuisine: "Maharashtrian",
    category: "Street Food",
    time: "15 mins",
    prepTime: "10 mins",
    cookTime: "5 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    image: "/bhel-puri-indian-chaat-snack.jpg",
    description: "A tangy, crunchy snack made with puffed rice, vegetables, and chutneys.",
    descriptionHindi: "मुरमुरे, सब्जियों और चटनी से बना खट्टा, कुरकुरा नाश्ता।",
    ingredients: [
      { item: "Puffed rice", itemHindi: "मुरमुरे", quantity: "3 cups", quantityHindi: "3 कप" },
      { item: "Sev", itemHindi: "सेव", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Onion (chopped)", itemHindi: "प्याज (कटा)", quantity: "1 medium", quantityHindi: "1 मध्यम" },
      { item: "Tomato (chopped)", itemHindi: "टमाटर (कटा)", quantity: "1 medium", quantityHindi: "1 मध्यम" },
      { item: "Boiled potato (diced)", itemHindi: "उबला आलू (कटा)", quantity: "1 medium", quantityHindi: "1 मध्यम" },
      { item: "Green chutney", itemHindi: "हरी चटनी", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" },
      { item: "Tamarind chutney", itemHindi: "इमली चटनी", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" },
      { item: "Chaat masala", itemHindi: "चाट मसाला", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "In a large bowl, add puffed rice, half the sev, onion, tomato, and potato.",
        instructionHindi: "एक बड़े कटोरे में मुरमुरे, आधी सेव, प्याज, टमाटर और आलू डालें।",
        duration: "3 mins",
      },
      {
        step: 2,
        instruction: "Add green chutney, tamarind chutney, chaat masala, and salt. Mix gently.",
        instructionHindi: "हरी चटनी, इमली चटनी, चाट मसाला और नमक डालें। धीरे से मिलाएं।",
        duration: "2 mins",
      },
      {
        step: 3,
        instruction: "Top with remaining sev, fresh coriander, and a squeeze of lemon juice. Serve immediately.",
        instructionHindi: "बची हुई सेव, ताजा धनिया और नींबू का रस डालें। तुरंत परोसें।",
        duration: "2 mins",
      },
    ],
    tags: ["bhel", "chaat", "street-food", "quick", "tangy"],
  },
  {
    id: 15,
    name: "Pav Bhaji",
    nameHindi: "पाव भाजी",
    cuisine: "Maharashtrian",
    category: "Street Food",
    time: "45 mins",
    prepTime: "15 mins",
    cookTime: "30 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.8,
    image: "/pav-bhaji-mumbai-street-food.jpg",
    description: "Spiced mashed vegetable curry served with buttered bread rolls.",
    descriptionHindi: "मक्खन वाले पाव के साथ परोसी जाने वाली मसालेदार मैश सब्जी करी।",
    ingredients: [
      { item: "Potatoes (boiled)", itemHindi: "आलू (उबले)", quantity: "3 medium", quantityHindi: "3 मध्यम" },
      { item: "Cauliflower", itemHindi: "फूलगोभी", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Green peas", itemHindi: "हरे मटर", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Capsicum", itemHindi: "शिमला मिर्च", quantity: "1 medium", quantityHindi: "1 मध्यम" },
      { item: "Tomatoes", itemHindi: "टमाटर", quantity: "4 medium", quantityHindi: "4 मध्यम" },
      { item: "Pav bhaji masala", itemHindi: "पाव भाजी मसाला", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" },
      { item: "Butter", itemHindi: "मक्खन", quantity: "6 tbsp", quantityHindi: "6 बड़े चम्मच" },
      { item: "Pav", itemHindi: "पाव", quantity: "8", quantityHindi: "8" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Boil cauliflower, peas, and capsicum until soft. Mash along with boiled potatoes.",
        instructionHindi: "गोभी, मटर और शिमला मिर्च को नरम होने तक उबालें। उबले आलू के साथ मैश करें।",
        duration: "15 mins",
      },
      {
        step: 2,
        instruction: "Heat butter, add chopped onion and cook until golden. Add ginger-garlic paste.",
        instructionHindi: "मक्खन गर्म करें, कटा प्याज डालें और सुनहरा होने तक पकाएं। अदरक-लहसुन पेस्ट डालें।",
        duration: "8 mins",
      },
      {
        step: 3,
        instruction: "Add chopped tomatoes and pav bhaji masala. Cook until tomatoes are mushy.",
        instructionHindi: "कटे टमाटर और पाव भाजी मसाला डालें। टमाटर गलने तक पकाएं।",
        duration: "10 mins",
      },
      {
        step: 4,
        instruction: "Add mashed vegetables, mix well. Mash everything together on tawa. Add water for consistency.",
        instructionHindi: "मैश सब्जियां डालें, अच्छी तरह मिलाएं। तवे पर सब कुछ साथ मैश करें। कंसिस्टेंसी के लिए पानी डालें।",
        duration: "10 mins",
      },
      {
        step: 5,
        instruction: "Toast pav with butter. Serve bhaji topped with butter, onion, coriander, and lemon.",
        instructionHindi: "पाव को मक्खन के साथ सेकें। मक्खन, प्याज, धनिया और नींबू के साथ भाजी परोसें।",
        duration: "5 mins",
      },
    ],
    tags: ["pav-bhaji", "mumbai", "street-food", "vegetables", "popular"],
  },
  // ============ DESSERTS ============
  {
    id: 16,
    name: "Gulab Jamun",
    nameHindi: "गुलाब जामुन",
    cuisine: "North Indian",
    category: "Sweets",
    time: "50 mins",
    prepTime: "20 mins",
    cookTime: "30 mins",
    servings: 12,
    difficulty: "Medium",
    rating: 4.9,
    image: "/gulab-jamun-indian-dessert.jpg",
    description: "Deep-fried milk dumplings soaked in cardamom-flavored sugar syrup.",
    descriptionHindi: "इलायची स्वाद वाली चीनी की चाशनी में भीगे तले हुए दूध के गोले।",
    ingredients: [
      { item: "Khoya/Mawa", itemHindi: "खोया/मावा", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "All-purpose flour", itemHindi: "मैदा", quantity: "1/4 cup", quantityHindi: "1/4 कप" },
      { item: "Baking soda", itemHindi: "बेकिंग सोडा", quantity: "1/4 tsp", quantityHindi: "1/4 छोटा चम्मच" },
      { item: "Sugar", itemHindi: "चीनी", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Water", itemHindi: "पानी", quantity: "1.5 cups", quantityHindi: "1.5 कप" },
      { item: "Cardamom powder", itemHindi: "इलायची पाउडर", quantity: "1/2 tsp", quantityHindi: "1/2 छोटा चम्मच" },
      { item: "Rose water", itemHindi: "गुलाब जल", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction:
          "Make sugar syrup by boiling sugar and water until it reaches one-string consistency. Add cardamom and rose water.",
        instructionHindi: "चीनी और पानी को एक तार की चाशनी तक उबालकर चाशनी बनाएं। इलायची और गुलाब जल डालें।",
        duration: "10 mins",
      },
      {
        step: 2,
        instruction: "Crumble khoya, add flour and baking soda. Knead into smooth dough without cracks.",
        instructionHindi: "खोया को मसलें, मैदा और बेकिंग सोडा डालें। बिना दरार के चिकना आटा गूंथें।",
        duration: "10 mins",
      },
      {
        step: 3,
        instruction: "Divide dough into 12 equal portions. Roll into smooth balls without any cracks.",
        instructionHindi: "आटे को 12 बराबर भागों में बांटें। बिना दरार के चिकने गोले बनाएं।",
        duration: "5 mins",
      },
      {
        step: 4,
        instruction: "Heat ghee/oil on low flame. Fry balls on very low heat, turning constantly until dark brown.",
        instructionHindi: "धीमी आंच पर घी/तेल गर्म करें। बहुत धीमी आंच पर गोलों को गहरा भूरा होने तक पलटते हुए तलें।",
        duration: "15 mins",
        tips: "Low heat is crucial - high heat will cook outside but leave inside raw.",
        tipsHindi: "धीमी आंच जरूरी है - तेज आंच से बाहर पक जाएगा लेकिन अंदर कच्चा रहेगा।",
      },
      {
        step: 5,
        instruction: "Immediately drop fried balls into warm sugar syrup. Let them soak for at least 2 hours.",
        instructionHindi: "तले हुए गोलों को तुरंत गर्म चाशनी में डालें। कम से कम 2 घंटे भीगने दें।",
        duration: "2 hours",
      },
    ],
    tags: ["gulab-jamun", "dessert", "sweet", "festive", "popular"],
  },
  {
    id: 17,
    name: "Rasmalai",
    nameHindi: "रसमलाई",
    cuisine: "Bengali",
    category: "Sweets",
    time: "60 mins",
    prepTime: "30 mins",
    cookTime: "30 mins",
    servings: 8,
    difficulty: "Hard",
    rating: 4.9,
    image: "/rasmalai.jpg",
    description: "Soft cottage cheese dumplings in sweetened, cardamom-flavored milk.",
    descriptionHindi: "मीठे, इलायची स्वाद वाले दूध में नरम छेना के गोले।",
    ingredients: [
      { item: "Milk (for chenna)", itemHindi: "दूध (छेना के लिए)", quantity: "1 liter", quantityHindi: "1 लीटर" },
      { item: "Lemon juice", itemHindi: "नींबू का रस", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Milk (for rabri)", itemHindi: "दूध (रबड़ी के लिए)", quantity: "1 liter", quantityHindi: "1 लीटर" },
      { item: "Sugar", itemHindi: "चीनी", quantity: "1.5 cups", quantityHindi: "1.5 कप" },
      { item: "Cardamom powder", itemHindi: "इलायची पाउडर", quantity: "1/2 tsp", quantityHindi: "1/2 छोटा चम्मच" },
      { item: "Saffron strands", itemHindi: "केसर", quantity: "few", quantityHindi: "कुछ" },
      { item: "Pistachios (chopped)", itemHindi: "पिस्ता (कटा)", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Boil milk, add lemon juice to curdle. Strain through muslin cloth. Rinse with cold water.",
        instructionHindi: "दूध उबालें, फाड़ने के लिए नींबू का रस डालें। मलमल के कपड़े से छानें। ठंडे पानी से धोएं।",
        duration: "15 mins",
      },
      {
        step: 2,
        instruction: "Knead chenna for 10 minutes until smooth and soft. Shape into small flat discs.",
        instructionHindi: "छेना को 10 मिनट तक चिकना और नरम होने तक गूंथें। छोटी चपटी टिक्की बनाएं।",
        duration: "15 mins",
      },
      {
        step: 3,
        instruction: "Boil water with sugar. Add chenna discs and cook for 15 mins. They will double in size.",
        instructionHindi: "चीनी के साथ पानी उबालें। छेना टिक्की डालें और 15 मिनट पकाएं। वे दोगुनी हो जाएंगी।",
        duration: "15 mins",
      },
      {
        step: 4,
        instruction: "For rabri, boil milk and reduce to half. Add sugar, cardamom, and saffron. Stir continuously.",
        instructionHindi: "रबड़ी के लिए, दूध उबालें और आधा करें। चीनी, इलायची और केसर डालें। लगातार हिलाएं।",
        duration: "30 mins",
      },
      {
        step: 5,
        instruction: "Squeeze cooked chenna discs gently, add to rabri. Chill for 2 hours. Garnish with pistachios.",
        instructionHindi: "पके छेना टिक्की को धीरे से निचोड़ें, रबड़ी में डालें। 2 घंटे ठंडा करें। पिस्ते से सजाएं।",
        duration: "2 hours",
      },
    ],
    tags: ["rasmalai", "bengali", "dessert", "sweet", "festive"],
  },
  {
    id: 18,
    name: "Kheer",
    nameHindi: "खीर",
    cuisine: "North Indian",
    category: "Sweets",
    time: "45 mins",
    prepTime: "5 mins",
    cookTime: "40 mins",
    servings: 6,
    difficulty: "Easy",
    rating: 4.7,
    image: "/kheer.jpg",
    description: "Creamy rice pudding cooked in milk with cardamom, nuts, and saffron.",
    descriptionHindi: "इलायची, मेवे और केसर के साथ दूध में पकी मलाईदार चावल की खीर।",
    ingredients: [
      { item: "Basmati rice", itemHindi: "बासमती चावल", quantity: "1/4 cup", quantityHindi: "1/4 कप" },
      { item: "Full-fat milk", itemHindi: "फुल-फैट दूध", quantity: "1 liter", quantityHindi: "1 लीटर" },
      { item: "Sugar", itemHindi: "चीनी", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Cardamom powder", itemHindi: "इलायची पाउडर", quantity: "1/4 tsp", quantityHindi: "1/4 छोटा चम्मच" },
      { item: "Saffron", itemHindi: "केसर", quantity: "few strands", quantityHindi: "कुछ धागे" },
      { item: "Mixed nuts", itemHindi: "मिले-जुले मेवे", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Raisins", itemHindi: "किशमिश", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Wash and soak rice for 30 minutes. Drain well.",
        instructionHindi: "चावल धोकर 30 मिनट भिगोएं। अच्छी तरह छान लें।",
        duration: "30 mins",
      },
      {
        step: 2,
        instruction: "Boil milk in a heavy-bottomed pan. Add soaked rice and cook on low heat, stirring frequently.",
        instructionHindi: "भारी तले वाली कड़ाही में दूध उबालें। भीगे चावल डालें और धीमी आंच पर बार-बार हिलाते हुए पकाएं।",
        duration: "25 mins",
      },
      {
        step: 3,
        instruction: "When rice is fully cooked and milk has thickened, add sugar. Cook for 5 more minutes.",
        instructionHindi: "जब चावल पूरी तरह पक जाए और दूध गाढ़ा हो जाए, चीनी डालें। 5 मिनट और पकाएं।",
        duration: "5 mins",
      },
      {
        step: 4,
        instruction: "Add cardamom, saffron, and half the nuts. Mix well and turn off heat.",
        instructionHindi: "इलायची, केसर और आधे मेवे डालें। अच्छी तरह मिलाएं और आंच बंद करें।",
        duration: "2 mins",
      },
      {
        step: 5,
        instruction: "Garnish with remaining nuts and raisins. Serve warm or chilled.",
        instructionHindi: "बचे मेवे और किशमिश से सजाएं। गर्म या ठंडा परोसें।",
        duration: "2 mins",
      },
    ],
    tags: ["kheer", "rice-pudding", "dessert", "sweet", "festive"],
  },
  {
    id: 19,
    name: "Jalebi",
    nameHindi: "जलेबी",
    cuisine: "North Indian",
    category: "Sweets",
    time: "12 hours",
    prepTime: "12 hours",
    cookTime: "30 mins",
    servings: 10,
    difficulty: "Hard",
    rating: 4.8,
    image: "/jalebi.jpg",
    description: "Crispy, spiral-shaped sweets soaked in sugar syrup.",
    descriptionHindi: "चीनी की चाशनी में भीगी कुरकुरी, सर्पिल आकार की मिठाई।",
    ingredients: [
      { item: "All-purpose flour", itemHindi: "मैदा", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Corn flour", itemHindi: "कॉर्न फ्लोर", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Yogurt", itemHindi: "दही", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Sugar", itemHindi: "चीनी", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Water", itemHindi: "पानी", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Saffron", itemHindi: "केसर", quantity: "few strands", quantityHindi: "कुछ धागे" },
      { item: "Lemon juice", itemHindi: "नींबू का रस", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Mix flour, corn flour, yogurt, and water to make smooth batter. Ferment for 12 hours.",
        instructionHindi: "मैदा, कॉर्न फ्लोर, दही और पानी मिलाकर चिकना घोल बनाएं। 12 घंटे खमीर उठने दें।",
        duration: "12 hours",
      },
      {
        step: 2,
        instruction: "Make sugar syrup with sugar, water, saffron. Cook until one-string consistency. Add lemon juice.",
        instructionHindi: "चीनी, पानी, केसर से चाशनी बनाएं। एक तार की चाशनी तक पकाएं। नींबू का रस डालें।",
        duration: "10 mins",
      },
      {
        step: 3,
        instruction: "Heat oil for deep frying. Pour batter into a squeeze bottle or piping bag.",
        instructionHindi: "तलने के लिए तेल गर्म करें। घोल को स्क्वीज़ बोतल या पाइपिंग बैग में डालें।",
        duration: "5 mins",
      },
      {
        step: 4,
        instruction: "Squeeze batter into hot oil in spiral shapes. Fry until crispy and golden on both sides.",
        instructionHindi: "घोल को गर्म तेल में सर्पिल आकार में निचोड़ें। दोनों तरफ से कुरकुरा और सुनहरा होने तक तलें।",
        duration: "15 mins",
      },
      {
        step: 5,
        instruction: "Immediately dip hot jalebis in warm sugar syrup for 30 seconds. Serve hot.",
        instructionHindi: "गर्म जलेबियों को तुरंत गर्म चाशनी में 30 सेकंड डुबोएं। गर्मागर्म परोसें।",
        duration: "5 mins",
      },
    ],
    tags: ["jalebi", "sweet", "crispy", "festive", "fermented"],
  },
  {
    id: 20,
    name: "Gajar Ka Halwa",
    nameHindi: "गाजर का हलवा",
    cuisine: "North Indian",
    category: "Sweets",
    time: "60 mins",
    prepTime: "15 mins",
    cookTime: "45 mins",
    servings: 8,
    difficulty: "Medium",
    rating: 4.8,
    image: "/gajar-ka-halwa.jpg",
    description: "Traditional carrot pudding cooked in milk with ghee, sugar, and nuts.",
    descriptionHindi: "घी, चीनी और मेवों के साथ दूध में पकाई गई पारंपरिक गाजर की मिठाई।",
    ingredients: [
      { item: "Carrots (grated)", itemHindi: "गाजर (कद्दूकस)", quantity: "500g", quantityHindi: "500 ग्राम" },
      { item: "Full-fat milk", itemHindi: "फुल-फैट दूध", quantity: "1 liter", quantityHindi: "1 लीटर" },
      { item: "Sugar", itemHindi: "चीनी", quantity: "3/4 cup", quantityHindi: "3/4 कप" },
      { item: "Ghee", itemHindi: "घी", quantity: "4 tbsp", quantityHindi: "4 बड़े चम्मच" },
      { item: "Cardamom powder", itemHindi: "इलायची पाउडर", quantity: "1/2 tsp", quantityHindi: "1/2 छोटा चम्मच" },
      { item: "Mixed nuts", itemHindi: "मिले-जुले मेवे", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" },
      { item: "Khoya (optional)", itemHindi: "खोया (वैकल्पिक)", quantity: "1/4 cup", quantityHindi: "1/4 कप" },
    ],
    steps: [
      {
        step: 1,
        instruction: "In a heavy-bottomed pan, add grated carrots and milk. Cook on medium heat until milk reduces.",
        instructionHindi: "भारी तले वाली कड़ाही में कद्दूकस गाजर और दूध डालें। दूध सूखने तक मध्यम आंच पर पकाएं।",
        duration: "30 mins",
        tips: "Stir frequently to prevent burning at the bottom.",
        tipsHindi: "तले में जलने से बचाने के लिए बार-बार हिलाएं।",
      },
      {
        step: 2,
        instruction: "When milk is almost absorbed, add ghee. Sauté until carrots turn glossy.",
        instructionHindi: "जब दूध लगभग सूख जाए, घी डालें। गाजर चमकदार होने तक भूनें।",
        duration: "8 mins",
      },
      {
        step: 3,
        instruction: "Add sugar and mix well. The halwa will become watery again - keep cooking until it dries.",
        instructionHindi: "चीनी डालें और अच्छी तरह मिलाएं। हलवा फिर से पतला हो जाएगा - सूखने तक पकाते रहें।",
        duration: "10 mins",
      },
      {
        step: 4,
        instruction: "Add khoya (if using) and cardamom powder. Mix well and cook for 5 more minutes.",
        instructionHindi: "खोया (यदि उपयोग कर रहे हैं) और इलायची पाउडर डालें। अच्छी तरह मिलाएं और 5 मिनट और पकाएं।",
        duration: "5 mins",
      },
      {
        step: 5,
        instruction: "Garnish with fried nuts. Serve hot or warm.",
        instructionHindi: "तले मेवों से सजाएं। गर्म या गुनगुना परोसें।",
        duration: "2 mins",
      },
    ],
    tags: ["halwa", "carrot", "dessert", "winter", "festive"],
  },
  // ============ MORE CURRIES ============
  {
    id: 21,
    name: "Palak Paneer",
    nameHindi: "पालक पनीर",
    cuisine: "North Indian",
    category: "Curries",
    time: "40 mins",
    prepTime: "15 mins",
    cookTime: "25 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.8,
    image: "/palak-paneer.jpg",
    description: "Cottage cheese cubes in a creamy spinach gravy.",
    descriptionHindi: "मलाईदार पालक ग्रेवी में पनीर के टुकड़े।",
    ingredients: [
      { item: "Paneer (cubed)", itemHindi: "पनीर (टुकड़े)", quantity: "250g", quantityHindi: "250 ग्राम" },
      { item: "Spinach", itemHindi: "पालक", quantity: "500g", quantityHindi: "500 ग्राम" },
      { item: "Onion", itemHindi: "प्याज", quantity: "1 large", quantityHindi: "1 बड़ा" },
      { item: "Tomato", itemHindi: "टमाटर", quantity: "2 medium", quantityHindi: "2 मध्यम" },
      { item: "Ginger-garlic paste", itemHindi: "अदरक-लहसुन पेस्ट", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Green chilies", itemHindi: "हरी मिर्च", quantity: "2", quantityHindi: "2" },
      { item: "Cream", itemHindi: "क्रीम", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Cumin seeds", itemHindi: "जीरा", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Blanch spinach in boiling water for 2 mins. Transfer to ice water. Blend to smooth puree.",
        instructionHindi: "पालक को उबलते पानी में 2 मिनट ब्लांच करें। बर्फ के पानी में डालें। चिकनी प्यूरी बनाएं।",
        duration: "5 mins",
      },
      {
        step: 2,
        instruction:
          "Heat oil, add cumin. Add onions and cook until golden. Add ginger-garlic paste and green chilies.",
        instructionHindi: "तेल गर्म करें, जीरा डालें। प्याज सुनहरा होने तक पकाएं। अदरक-लहसुन पेस्ट और हरी मिर्च डालें।",
        duration: "8 mins",
      },
      {
        step: 3,
        instruction: "Add chopped tomatoes. Cook until soft and oil separates.",
        instructionHindi: "कटे टमाटर डालें। नरम होने और तेल अलग होने तक पकाएं।",
        duration: "8 mins",
      },
      {
        step: 4,
        instruction: "Add spinach puree, salt, and cook for 5 mins. Add paneer cubes and simmer for 3 mins.",
        instructionHindi: "पालक प्यूरी, नमक डालें और 5 मिनट पकाएं। पनीर के टुकड़े डालें और 3 मिनट उबालें।",
        duration: "8 mins",
      },
      {
        step: 5,
        instruction: "Add cream, garam masala. Mix gently and serve hot with naan or rice.",
        instructionHindi: "क्रीम, गरम मसाला डालें। धीरे से मिलाएं और नान या चावल के साथ गर्मागर्म परोसें।",
        duration: "2 mins",
      },
    ],
    tags: ["palak", "paneer", "spinach", "vegetarian", "healthy"],
  },
  {
    id: 22,
    name: "Malai Kofta",
    nameHindi: "मलाई कोफ्ता",
    cuisine: "North Indian",
    category: "Curries",
    time: "60 mins",
    prepTime: "30 mins",
    cookTime: "30 mins",
    servings: 4,
    difficulty: "Hard",
    rating: 4.7,
    image: "/malai-kofta.jpg",
    description: "Fried paneer and potato dumplings in rich, creamy tomato gravy.",
    descriptionHindi: "समृद्ध, मलाईदार टमाटर ग्रेवी में तले हुए पनीर और आलू के कोफ्ते।",
    ingredients: [
      { item: "Paneer (grated)", itemHindi: "पनीर (कद्दूकस)", quantity: "200g", quantityHindi: "200 ग्राम" },
      { item: "Potatoes (boiled, mashed)", itemHindi: "आलू (उबले, मैश)", quantity: "2 medium", quantityHindi: "2 मध्यम" },
      { item: "Cashews", itemHindi: "काजू", quantity: "10-12", quantityHindi: "10-12" },
      { item: "Raisins", itemHindi: "किशमिश", quantity: "10-12", quantityHindi: "10-12" },
      { item: "Corn flour", itemHindi: "कॉर्न फ्लोर", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Tomato (pureed)", itemHindi: "टमाटर (प्यूरी)", quantity: "4 large", quantityHindi: "4 बड़े" },
      { item: "Cashew paste", itemHindi: "काजू पेस्ट", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Cream", itemHindi: "क्रीम", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
    ],
    steps: [
      {
        step: 1,
        instruction:
          "Mix grated paneer, mashed potato, corn flour, and salt. Stuff with cashew-raisin, roll into balls.",
        instructionHindi: "कद्दूकस पनीर, मैश आलू, कॉर्न फ्लोर और नमक मिलाएं। काजू-किशमिश भरें, गोले बनाएं।",
        duration: "15 mins",
      },
      {
        step: 2,
        instruction: "Deep fry koftas on medium heat until golden. Drain and set aside.",
        instructionHindi: "कोफ्ते को मध्यम आंच पर सुनहरा होने तक तलें। निकालें और अलग रखें।",
        duration: "15 mins",
      },
      {
        step: 3,
        instruction: "For gravy, heat oil. Add onion paste and cook until golden. Add ginger-garlic paste.",
        instructionHindi: "ग्रेवी के लिए, तेल गर्म करें। प्याज पेस्ट डालें और सुनहरा होने तक पकाएं। अदरक-लहसुन पेस्ट डालें।",
        duration: "10 mins",
      },
      {
        step: 4,
        instruction: "Add tomato puree, spices, and cook until oil separates. Add cashew paste and cream.",
        instructionHindi: "टमाटर प्यूरी, मसाले डालें और तेल अलग होने तक पकाएं। काजू पेस्ट और क्रीम डालें।",
        duration: "10 mins",
      },
      {
        step: 5,
        instruction: "Add koftas just before serving to prevent them from becoming soggy.",
        instructionHindi: "गीले होने से बचाने के लिए परोसने से ठीक पहले कोफ्ते डालें।",
        duration: "2 mins",
      },
    ],
    tags: ["kofta", "paneer", "rich", "festive", "restaurant-style"],
  },
  {
    id: 23,
    name: "Kadai Paneer",
    nameHindi: "कड़ाही पनीर",
    cuisine: "North Indian",
    category: "Curries",
    time: "35 mins",
    prepTime: "10 mins",
    cookTime: "25 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    image: "/kadai-paneer.jpg",
    description: "Paneer cooked with bell peppers in a spicy tomato-based gravy with freshly ground spices.",
    descriptionHindi: "ताजा पिसे मसालों के साथ मसालेदार टमाटर आधारित ग्रेवी में शिमला मिर्च के साथ पकाया पनीर।",
    ingredients: [
      { item: "Paneer (cubed)", itemHindi: "पनीर (टुकड़े)", quantity: "250g", quantityHindi: "250 ग्राम" },
      { item: "Bell peppers (cubed)", itemHindi: "शिमला मिर्च (टुकड़े)", quantity: "2 medium", quantityHindi: "2 मध्यम" },
      { item: "Tomatoes (pureed)", itemHindi: "टमाटर (प्यूरी)", quantity: "3 large", quantityHindi: "3 बड़े" },
      { item: "Onion (chopped)", itemHindi: "प्याज (कटा)", quantity: "1 large", quantityHindi: "1 बड़ा" },
      { item: "Coriander seeds", itemHindi: "धनिया बीज", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Dried red chilies", itemHindi: "सूखी लाल मिर्च", quantity: "4-5", quantityHindi: "4-5" },
      { item: "Ginger (julienned)", itemHindi: "अदरक (जुलिएन)", quantity: "2 inch", quantityHindi: "2 इंच" },
      { item: "Kasuri methi", itemHindi: "कसूरी मेथी", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Dry roast coriander seeds and dried red chilies. Grind to coarse powder - this is kadai masala.",
        instructionHindi: "धनिया बीज और सूखी लाल मिर्च को सूखा भूनें। मोटा पाउडर पीसें - यह कड़ाही मसाला है।",
        duration: "5 mins",
      },
      {
        step: 2,
        instruction: "Heat oil in a kadai. Add onions and cook until soft. Add half the ginger.",
        instructionHindi: "कड़ाही में तेल गर्म करें। प्याज नरम होने तक पकाएं। आधा अदरक डालें।",
        duration: "5 mins",
      },
      {
        step: 3,
        instruction: "Add tomato puree and cook until oil separates. Add kadai masala and mix well.",
        instructionHindi: "टमाटर प्यूरी डालें और तेल अलग होने तक पकाएं। कड़ाही मसाला डालें और अच्छी तरह मिलाएं।",
        duration: "10 mins",
      },
      {
        step: 4,
        instruction:
          "Add bell peppers and paneer. Toss on high heat for 5 mins. Add remaining ginger and kasuri methi.",
        instructionHindi: "शिमला मिर्च और पनीर डालें। तेज आंच पर 5 मिनट पलटें। बचा अदरक और कसूरी मेथी डालें।",
        duration: "7 mins",
      },
      {
        step: 5,
        instruction: "Garnish with fresh coriander. Serve hot with naan or paratha.",
        instructionHindi: "ताजे धनिये से सजाएं। नान या पराठे के साथ गर्मागर्म परोसें।",
        duration: "2 mins",
      },
    ],
    tags: ["kadai", "paneer", "bell-pepper", "spicy", "restaurant-style"],
  },
  {
    id: 24,
    name: "Chicken Korma",
    nameHindi: "चिकन कोरमा",
    cuisine: "Mughlai",
    category: "Curries",
    time: "60 mins",
    prepTime: "20 mins",
    cookTime: "40 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    image: "/chicken-korma.jpg",
    description: "Creamy Mughlai-style chicken curry with yogurt and aromatic spices.",
    descriptionHindi: "दही और सुगंधित मसालों के साथ मलाईदार मुगलई शैली का चिकन करी।",
    ingredients: [
      { item: "Chicken", itemHindi: "चिकन", quantity: "500g", quantityHindi: "500 ग्राम" },
      { item: "Yogurt", itemHindi: "दही", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Onion (sliced)", itemHindi: "प्याज (कटा)", quantity: "3 large", quantityHindi: "3 बड़े" },
      { item: "Cashew paste", itemHindi: "काजू पेस्ट", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" },
      { item: "Ginger-garlic paste", itemHindi: "अदरक-लहसुन पेस्ट", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Whole spices", itemHindi: "साबुत मसाले", quantity: "as needed", quantityHindi: "आवश्यकतानुसार" },
      { item: "Cream", itemHindi: "क्रीम", quantity: "1/4 cup", quantityHindi: "1/4 कप" },
      { item: "Saffron", itemHindi: "केसर", quantity: "few strands", quantityHindi: "कुछ धागे" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Fry sliced onions until deep golden brown. Make a paste with half the fried onions.",
        instructionHindi: "कटे प्याज को गहरा सुनहरा भूरा होने तक तलें। आधे तले प्याज का पेस्ट बनाएं।",
        duration: "15 mins",
      },
      {
        step: 2,
        instruction: "Marinate chicken with yogurt, ginger-garlic paste, and salt for 30 minutes.",
        instructionHindi: "चिकन को दही, अदरक-लहसुन पेस्ट और नमक के साथ 30 मिनट मैरीनेट करें।",
        duration: "30 mins",
      },
      {
        step: 3,
        instruction: "Heat ghee, add whole spices. Add onion paste, cashew paste and cook until oil separates.",
        instructionHindi: "घी गर्म करें, साबुत मसाले डालें। प्याज पेस्ट, काजू पेस्ट डालें और तेल अलग होने तक पकाएं।",
        duration: "10 mins",
      },
      {
        step: 4,
        instruction: "Add marinated chicken. Cook covered on low heat for 25 minutes.",
        instructionHindi: "मैरीनेटेड चिकन डालें। ढककर धीमी आंच पर 25 मिनट पकाएं।",
        duration: "25 mins",
      },
      {
        step: 5,
        instruction: "Add cream, saffron, and garam masala. Garnish with remaining fried onions and serve.",
        instructionHindi: "क्रीम, केसर और गरम मसाला डालें। बचे तले प्याज से सजाएं और परोसें।",
        duration: "5 mins",
      },
    ],
    tags: ["korma", "chicken", "mughlai", "creamy", "aromatic"],
  },
  {
    id: 25,
    name: "Egg Curry",
    nameHindi: "अंडा करी",
    cuisine: "North Indian",
    category: "Curries",
    time: "35 mins",
    prepTime: "10 mins",
    cookTime: "25 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    image: "/egg-curry.jpg",
    description: "Hard-boiled eggs in a spiced onion-tomato gravy.",
    descriptionHindi: "मसालेदार प्याज-टमाटर ग्रेवी में उबले अंडे।",
    ingredients: [
      { item: "Eggs (boiled)", itemHindi: "अंडे (उबले)", quantity: "6", quantityHindi: "6" },
      { item: "Onion (chopped)", itemHindi: "प्याज (कटा)", quantity: "2 large", quantityHindi: "2 बड़े" },
      { item: "Tomato (pureed)", itemHindi: "टमाटर (प्यूरी)", quantity: "3 medium", quantityHindi: "3 मध्यम" },
      { item: "Ginger-garlic paste", itemHindi: "अदरक-लहसुन पेस्ट", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Red chili powder", itemHindi: "लाल मिर्च पाउडर", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Turmeric powder", itemHindi: "हल्दी पाउडर", quantity: "1/2 tsp", quantityHindi: "1/2 छोटा चम्मच" },
      { item: "Garam masala", itemHindi: "गरम मसाला", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Boil eggs, peel, and make small slits. Optionally fry until golden.",
        instructionHindi: "अंडे उबालें, छीलें और छोटे चीरे लगाएं। वैकल्पिक रूप से सुनहरा होने तक तलें।",
        duration: "12 mins",
      },
      {
        step: 2,
        instruction: "Heat oil, add onions and cook until golden brown.",
        instructionHindi: "तेल गर्म करें, प्याज डालें और सुनहरा भूरा होने तक पकाएं।",
        duration: "8 mins",
      },
      {
        step: 3,
        instruction: "Add ginger-garlic paste, cook 2 mins. Add tomato puree and all spices.",
        instructionHindi: "अदरक-लहसुन पेस्ट डालें, 2 मिनट पकाएं। टमाटर प्यूरी और सभी मसाले डालें।",
        duration: "10 mins",
      },
      {
        step: 4,
        instruction: "Cook until oil separates. Add water for desired consistency.",
        instructionHindi: "तेल अलग होने तक पकाएं। वांछित गाढ़ापन के लिए पानी डालें।",
        duration: "5 mins",
      },
      {
        step: 5,
        instruction: "Add eggs to the gravy. Simmer for 5 minutes. Garnish with coriander.",
        instructionHindi: "ग्रेवी में अंडे डालें। 5 मिनट उबालें। धनिये से सजाएं।",
        duration: "5 mins",
      },
    ],
    tags: ["egg", "curry", "protein", "quick", "budget-friendly"],
  },
  // ============ RICE DISHES ============
  {
    id: 26,
    name: "Vegetable Pulao",
    nameHindi: "वेजिटेबल पुलाव",
    cuisine: "North Indian",
    category: "Rice Dishes",
    time: "35 mins",
    prepTime: "10 mins",
    cookTime: "25 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    image: "/vegetable-pulao.jpg",
    description: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices.",
    descriptionHindi: "मिली-जुली सब्जियों और सुगंधित मसालों के साथ पकाए गए सुगंधित बासमती चावल।",
    ingredients: [
      { item: "Basmati rice", itemHindi: "बासमती चावल", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Mixed vegetables", itemHindi: "मिली-जुली सब्जियां", quantity: "1.5 cups", quantityHindi: "1.5 कप" },
      { item: "Onion (sliced)", itemHindi: "प्याज (कटा)", quantity: "1 large", quantityHindi: "1 बड़ा" },
      { item: "Whole spices", itemHindi: "साबुत मसाले", quantity: "as needed", quantityHindi: "आवश्यकतानुसार" },
      { item: "Ghee", itemHindi: "घी", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Ginger-garlic paste", itemHindi: "अदरक-लहसुन पेस्ट", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Soak rice for 30 minutes. Drain well.",
        instructionHindi: "चावल को 30 मिनट भिगोएं। अच्छी तरह छान लें।",
        duration: "30 mins",
      },
      {
        step: 2,
        instruction: "Heat ghee, add whole spices. Add sliced onions and sauté until golden.",
        instructionHindi: "घी गर्म करें, साबुत मसाले डालें। कटे प्याज डालें और सुनहरा होने तक भूनें।",
        duration: "5 mins",
      },
      {
        step: 3,
        instruction: "Add ginger-garlic paste and vegetables. Sauté for 3-4 minutes.",
        instructionHindi: "अदरक-लहसुन पेस्ट और सब्जियां डालें। 3-4 मिनट भूनें।",
        duration: "4 mins",
      },
      {
        step: 4,
        instruction: "Add drained rice and sauté gently. Add 4 cups water and salt.",
        instructionHindi: "छाने हुए चावल डालें और धीरे से भूनें। 4 कप पानी और नमक डालें।",
        duration: "3 mins",
      },
      {
        step: 5,
        instruction: "Bring to boil, then cook on low heat until rice is done. Fluff with fork before serving.",
        instructionHindi: "उबाल आने दें, फिर धीमी आंच पर चावल पकने तक पकाएं। परोसने से पहले कांटे से फुलाएं।",
        duration: "15 mins",
      },
    ],
    tags: ["pulao", "rice", "vegetables", "one-pot", "easy"],
  },
  {
    id: 27,
    name: "Jeera Rice",
    nameHindi: "जीरा राइस",
    cuisine: "North Indian",
    category: "Rice Dishes",
    time: "25 mins",
    prepTime: "5 mins",
    cookTime: "20 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.4,
    image: "/jeera-rice.jpg",
    description: "Fragrant basmati rice tempered with cumin seeds.",
    descriptionHindi: "जीरे के तड़के वाले सुगंधित बासमती चावल।",
    ingredients: [
      { item: "Basmati rice", itemHindi: "बासमती चावल", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Cumin seeds", itemHindi: "जीरा", quantity: "1.5 tsp", quantityHindi: "1.5 छोटा चम्मच" },
      { item: "Ghee", itemHindi: "घी", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Bay leaf", itemHindi: "तेज पत्ता", quantity: "1", quantityHindi: "1" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Wash and soak rice for 20 minutes. Drain well.",
        instructionHindi: "चावल धोकर 20 मिनट भिगोएं। अच्छी तरह छान लें।",
        duration: "20 mins",
      },
      {
        step: 2,
        instruction: "Heat ghee in a pot. Add cumin seeds and bay leaf. Let cumin splutter.",
        instructionHindi: "बर्तन में घी गर्म करें। जीरा और तेज पत्ता डालें। जीरा चटकने दें।",
        duration: "2 mins",
      },
      {
        step: 3,
        instruction: "Add drained rice and sauté gently for 2 minutes.",
        instructionHindi: "छाने हुए चावल डालें और 2 मिनट धीरे से भूनें।",
        duration: "2 mins",
      },
      {
        step: 4,
        instruction: "Add 4 cups water and salt. Bring to boil, then cover and cook on low heat.",
        instructionHindi: "4 कप पानी और नमक डालें। उबाल आने दें, फिर ढककर धीमी आंच पर पकाएं।",
        duration: "15 mins",
      },
      {
        step: 5,
        instruction: "Let it rest for 5 minutes. Fluff with fork and serve.",
        instructionHindi: "5 मिनट आराम दें। कांटे से फुलाएं और परोसें।",
        duration: "5 mins",
      },
    ],
    tags: ["jeera", "rice", "cumin", "simple", "side-dish"],
  },
  {
    id: 28,
    name: "Lemon Rice",
    nameHindi: "नींबू राइस",
    cuisine: "South Indian",
    category: "Rice Dishes",
    time: "25 mins",
    prepTime: "5 mins",
    cookTime: "20 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    image: "/lemon-rice.jpg",
    description: "Tangy South Indian rice dish with lemon juice and tempered spices.",
    descriptionHindi: "नींबू के रस और तड़के वाले मसालों के साथ खट्टा दक्षिण भारतीय चावल व्यंजन।",
    ingredients: [
      { item: "Cooked rice", itemHindi: "पके चावल", quantity: "3 cups", quantityHindi: "3 कप" },
      { item: "Lemon juice", itemHindi: "नींबू का रस", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" },
      { item: "Mustard seeds", itemHindi: "राई", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Curry leaves", itemHindi: "करी पत्ता", quantity: "10-12", quantityHindi: "10-12" },
      { item: "Peanuts", itemHindi: "मूंगफली", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Chana dal", itemHindi: "चना दाल", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Turmeric powder", itemHindi: "हल्दी पाउडर", quantity: "1/2 tsp", quantityHindi: "1/2 छोटा चम्मच" },
      { item: "Green chilies", itemHindi: "हरी मिर्च", quantity: "2-3", quantityHindi: "2-3" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Heat oil, add mustard seeds. When they splutter, add chana dal and peanuts. Fry until golden.",
        instructionHindi: "तेल गर्म करें, राई डालें। जब चटके, चना दाल और मूंगफली डालें। सुनहरा होने तक तलें।",
        duration: "3 mins",
      },
      {
        step: 2,
        instruction: "Add curry leaves, green chilies, and turmeric. Sauté for 30 seconds.",
        instructionHindi: "करी पत्ता, हरी मिर्च और हल्दी डालें। 30 सेकंड भूनें।",
        duration: "1 min",
      },
      {
        step: 3,
        instruction: "Add cooked rice and mix gently without breaking grains. Add salt.",
        instructionHindi: "पके चावल डालें और दाने तोड़े बिना धीरे से मिलाएं। नमक डालें।",
        duration: "3 mins",
      },
      {
        step: 4,
        instruction: "Turn off heat. Add lemon juice and mix well. Adjust seasoning.",
        instructionHindi: "आंच बंद करें। नींबू का रस डालें और अच्छी तरह मिलाएं। मसाला समायोजित करें।",
        duration: "2 mins",
      },
    ],
    tags: ["lemon", "rice", "south-indian", "tangy", "quick"],
  },
  // ============ BREAKFAST ============
  {
    id: 29,
    name: "Poha",
    nameHindi: "पोहा",
    cuisine: "Maharashtrian",
    category: "Breakfast",
    time: "20 mins",
    prepTime: "5 mins",
    cookTime: "15 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.6,
    image: "/poha.jpg",
    description: "Flattened rice cooked with onions, potatoes, and tempered with mustard seeds.",
    descriptionHindi: "प्याज, आलू के साथ पके चिवड़े और राई का तड़का।",
    ingredients: [
      { item: "Poha (flattened rice)", itemHindi: "पोहा (चिवड़ा)", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Onion (chopped)", itemHindi: "प्याज (कटा)", quantity: "1 large", quantityHindi: "1 बड़ा" },
      { item: "Potato (cubed)", itemHindi: "आलू (टुकड़े)", quantity: "1 medium", quantityHindi: "1 मध्यम" },
      { item: "Mustard seeds", itemHindi: "राई", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Curry leaves", itemHindi: "करी पत्ता", quantity: "8-10", quantityHindi: "8-10" },
      { item: "Peanuts", itemHindi: "मूंगफली", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Turmeric powder", itemHindi: "हल्दी पाउडर", quantity: "1/4 tsp", quantityHindi: "1/4 छोटा चम्मच" },
      { item: "Green chilies", itemHindi: "हरी मिर्च", quantity: "2", quantityHindi: "2" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Wash poha gently and drain. Add salt and turmeric, mix and set aside.",
        instructionHindi: "पोहा धीरे से धोकर छान लें। नमक और हल्दी डालें, मिलाएं और अलग रखें।",
        duration: "5 mins",
      },
      {
        step: 2,
        instruction: "Heat oil, add mustard seeds. When they splutter, add peanuts and fry until golden.",
        instructionHindi: "तेल गर्म करें, राई डालें। जब चटके, मूंगफली डालें और सुनहरा होने तक तलें।",
        duration: "2 mins",
      },
      {
        step: 3,
        instruction: "Add curry leaves, green chilies, and potato cubes. Cover and cook until potato is done.",
        instructionHindi: "करी पत्ता, हरी मिर्च और आलू के टुकड़े डालें। ढककर आलू पकने तक पकाएं।",
        duration: "8 mins",
      },
      {
        step: 4,
        instruction: "Add onions and sauté until translucent.",
        instructionHindi: "प्याज डालें और पारदर्शी होने तक भूनें।",
        duration: "3 mins",
      },
      {
        step: 5,
        instruction: "Add prepared poha. Mix gently. Garnish with coriander, sev, and squeeze of lemon.",
        instructionHindi: "तैयार पोहा डालें। धीरे से मिलाएं। धनिया, सेव और नींबू निचोड़कर सजाएं।",
        duration: "2 mins",
      },
    ],
    tags: ["poha", "breakfast", "maharashtrian", "quick", "healthy"],
  },
  {
    id: 30,
    name: "Upma",
    nameHindi: "उपमा",
    cuisine: "South Indian",
    category: "Breakfast",
    time: "25 mins",
    prepTime: "5 mins",
    cookTime: "20 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.4,
    image: "/upma.jpg",
    description: "Savory semolina porridge with vegetables and tempered spices.",
    descriptionHindi: "सब्जियों और तड़के वाले मसालों के साथ नमकीन सूजी का दलिया।",
    ingredients: [
      { item: "Semolina (sooji)", itemHindi: "सूजी", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Onion (chopped)", itemHindi: "प्याज (कटा)", quantity: "1 medium", quantityHindi: "1 मध्यम" },
      { item: "Mixed vegetables", itemHindi: "मिली-जुली सब्जियां", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Mustard seeds", itemHindi: "राई", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Curry leaves", itemHindi: "करी पत्ता", quantity: "8-10", quantityHindi: "8-10" },
      { item: "Green chilies", itemHindi: "हरी मिर्च", quantity: "2", quantityHindi: "2" },
      { item: "Ginger (grated)", itemHindi: "अदरक (कद्दूकस)", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Cashews", itemHindi: "काजू", quantity: "10-12", quantityHindi: "10-12" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Dry roast semolina until fragrant and slightly golden. Set aside.",
        instructionHindi: "सूजी को खुशबूदार और हल्का सुनहरा होने तक सूखा भूनें। अलग रखें।",
        duration: "5 mins",
      },
      {
        step: 2,
        instruction: "Heat oil, add mustard seeds. When they splutter, add cashews and fry until golden.",
        instructionHindi: "तेल गर्म करें, राई डालें। जब चटके, काजू डालें और सुनहरा होने तक तलें।",
        duration: "2 mins",
      },
      {
        step: 3,
        instruction: "Add curry leaves, green chilies, ginger, and onion. Sauté until onion is soft.",
        instructionHindi: "करी पत्ता, हरी मिर्च, अदरक और प्याज डालें। प्याज नरम होने तक भूनें।",
        duration: "4 mins",
      },
      {
        step: 4,
        instruction: "Add vegetables and 2.5 cups water with salt. Bring to boil.",
        instructionHindi: "सब्जियां और 2.5 कप पानी नमक के साथ डालें। उबाल आने दें।",
        duration: "5 mins",
      },
      {
        step: 5,
        instruction: "Slowly add roasted semolina while stirring to avoid lumps. Cook until water is absorbed.",
        instructionHindi: "गांठ से बचने के लिए हिलाते हुए धीरे-धीरे भुनी सूजी डालें। पानी सूखने तक पकाएं।",
        duration: "5 mins",
      },
    ],
    tags: ["upma", "breakfast", "south-indian", "healthy", "semolina"],
  },
  // Continue with more recipes...
  {
    id: 31,
    name: "Aloo Paratha",
    nameHindi: "आलू पराठा",
    cuisine: "Punjabi",
    category: "Breakfast",
    time: "40 mins",
    prepTime: "20 mins",
    cookTime: "20 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    image: "/aloo-paratha.jpg",
    description: "Stuffed flatbread filled with spiced mashed potatoes.",
    descriptionHindi: "मसालेदार मैश आलू से भरी स्टफ्ड रोटी।",
    ingredients: [
      { item: "Whole wheat flour", itemHindi: "गेहूं का आटा", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Potatoes (boiled)", itemHindi: "आलू (उबले)", quantity: "4 medium", quantityHindi: "4 मध्यम" },
      { item: "Green chilies", itemHindi: "हरी मिर्च", quantity: "2-3", quantityHindi: "2-3" },
      { item: "Coriander leaves", itemHindi: "धनिया पत्ता", quantity: "1/4 cup", quantityHindi: "1/4 कप" },
      { item: "Cumin powder", itemHindi: "जीरा पाउडर", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Red chili powder", itemHindi: "लाल मिर्च पाउडर", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Amchur (dry mango)", itemHindi: "अमचूर", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Ghee/Butter", itemHindi: "घी/मक्खन", quantity: "for cooking", quantityHindi: "पकाने के लिए" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Make soft dough with flour, salt, and water. Rest for 15 minutes.",
        instructionHindi: "आटा, नमक और पानी से नरम आटा गूंथें। 15 मिनट आराम दें।",
        duration: "20 mins",
      },
      {
        step: 2,
        instruction: "Mash boiled potatoes. Add green chilies, coriander, and all spices. Mix well.",
        instructionHindi: "उबले आलू मैश करें। हरी मिर्च, धनिया और सभी मसाले डालें। अच्छी तरह मिलाएं।",
        duration: "5 mins",
      },
      {
        step: 3,
        instruction:
          "Divide dough and filling into equal portions. Roll dough ball, place filling, seal and roll again.",
        instructionHindi: "आटे और भरावन को बराबर भागों में बांटें। आटे की गोली बेलें, भरावन रखें, बंद करें और फिर बेलें।",
        duration: "10 mins",
      },
      {
        step: 4,
        instruction: "Cook on hot tawa, applying ghee on both sides until golden brown spots appear.",
        instructionHindi: "गर्म तवे पर पकाएं, दोनों तरफ घी लगाकर सुनहरे धब्बे आने तक पकाएं।",
        duration: "5 mins each",
      },
      {
        step: 5,
        instruction: "Serve hot with butter, yogurt, and pickle.",
        instructionHindi: "मक्खन, दही और अचार के साथ गर्मागर्म परोसें।",
        duration: "2 mins",
      },
    ],
    tags: ["paratha", "stuffed", "punjabi", "breakfast", "popular"],
  },
  // Add more recipes to reach 100+
  {
    id: 32,
    name: "Shahi Paneer",
    nameHindi: "शाही पनीर",
    cuisine: "Mughlai",
    category: "Curries",
    time: "45 mins",
    prepTime: "15 mins",
    cookTime: "30 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    image: "/shahi-paneer.jpg",
    description: "Royal paneer curry in a rich cashew and cream based gravy.",
    descriptionHindi: "समृद्ध काजू और क्रीम आधारित ग्रेवी में शाही पनीर करी।",
    ingredients: [
      { item: "Paneer", itemHindi: "पनीर", quantity: "250g", quantityHindi: "250 ग्राम" },
      { item: "Cashews", itemHindi: "काजू", quantity: "15-20", quantityHindi: "15-20" },
      { item: "Onion", itemHindi: "प्याज", quantity: "2 large", quantityHindi: "2 बड़े" },
      { item: "Tomato", itemHindi: "टमाटर", quantity: "2 large", quantityHindi: "2 बड़े" },
      { item: "Cream", itemHindi: "क्रीम", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Saffron", itemHindi: "केसर", quantity: "few strands", quantityHindi: "कुछ धागे" },
      { item: "Green cardamom", itemHindi: "हरी इलायची", quantity: "4-5", quantityHindi: "4-5" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Soak cashews in warm water for 30 mins. Blend to smooth paste.",
        instructionHindi: "काजू को 30 मिनट गर्म पानी में भिगोएं। चिकना पेस्ट बनाएं।",
        duration: "30 mins",
      },
      {
        step: 2,
        instruction: "Sauté onions until golden. Add tomatoes and cook until soft. Blend to paste.",
        instructionHindi: "प्याज को सुनहरा होने तक भूनें। टमाटर डालें और नरम होने तक पकाएं। पेस्ट बनाएं।",
        duration: "10 mins",
      },
      {
        step: 3,
        instruction: "Heat ghee, add cardamom. Add onion-tomato paste and cook until oil separates.",
        instructionHindi: "घी गर्म करें, इलायची डालें। प्याज-टमाटर पेस्ट डालें और तेल अलग होने तक पकाएं।",
        duration: "8 mins",
      },
      {
        step: 4,
        instruction: "Add cashew paste, saffron milk, and cream. Simmer for 5 mins. Add paneer cubes.",
        instructionHindi: "काजू पेस्ट, केसर दूध और क्रीम डालें। 5 मिनट उबालें। पनीर के टुकड़े डालें।",
        duration: "8 mins",
      },
      {
        step: 5,
        instruction: "Garnish with cream, saffron, and chopped nuts. Serve with naan.",
        instructionHindi: "क्रीम, केसर और कटे मेवों से सजाएं। नान के साथ परोसें।",
        duration: "2 mins",
      },
    ],
    tags: ["shahi", "paneer", "mughlai", "rich", "festive"],
  },
  // Add 70 more recipes following the same pattern...
  // For brevity, I'll add a few more key recipes
  {
    id: 33,
    name: "Fish Curry",
    nameHindi: "मछली करी",
    cuisine: "Coastal",
    category: "Curries",
    time: "40 mins",
    prepTime: "15 mins",
    cookTime: "25 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.6,
    image: "/fish-curry.jpg",
    description: "Tangy and spicy fish curry with coconut and tamarind.",
    descriptionHindi: "नारियल और इमली के साथ खट्टी और मसालेदार मछली करी।",
    ingredients: [
      { item: "Fish pieces", itemHindi: "मछली के टुकड़े", quantity: "500g", quantityHindi: "500 ग्राम" },
      { item: "Coconut milk", itemHindi: "नारियल का दूध", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Tamarind pulp", itemHindi: "इमली का गूदा", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Onion", itemHindi: "प्याज", quantity: "2 medium", quantityHindi: "2 मध्यम" },
      { item: "Tomato", itemHindi: "टमाटर", quantity: "2 medium", quantityHindi: "2 मध्यम" },
      { item: "Red chili powder", itemHindi: "लाल मिर्च पाउडर", quantity: "1.5 tsp", quantityHindi: "1.5 छोटा चम्मच" },
      { item: "Mustard seeds", itemHindi: "राई", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Marinate fish with turmeric, salt, and red chili. Let it rest for 15 minutes.",
        instructionHindi: "मछली को हल्दी, नमक और लाल मिर्च से मैरीनेट करें। 15 मिनट आराम दें।",
        duration: "15 mins",
      },
      {
        step: 2,
        instruction: "Heat oil, add mustard seeds and curry leaves. Add sliced onions and cook until golden.",
        instructionHindi: "तेल गर्म करें, राई और करी पत्ता डालें। कटे प्याज डालें और सुनहरा होने तक पकाएं।",
        duration: "8 mins",
      },
      {
        step: 3,
        instruction: "Add tomatoes, ginger-garlic paste, and spices. Cook until oil separates.",
        instructionHindi: "टमाटर, अदरक-लहसुन पेस्ट और मसाले डालें। तेल अलग होने तक पकाएं।",
        duration: "8 mins",
      },
      {
        step: 4,
        instruction: "Add coconut milk, tamarind, and water. Bring to simmer. Add fish pieces gently.",
        instructionHindi: "नारियल दूध, इमली और पानी डालें। उबाल आने दें। मछली के टुकड़े धीरे से डालें।",
        duration: "10 mins",
      },
      {
        step: 5,
        instruction: "Cook fish for 8-10 minutes without stirring much. Garnish with coriander.",
        instructionHindi: "मछली को 8-10 मिनट बिना ज्यादा हिलाए पकाएं। धनिये से सजाएं।",
        duration: "10 mins",
      },
    ],
    tags: ["fish", "curry", "coastal", "seafood", "tangy"],
  },
  {
    id: 34,
    name: "Mutton Rogan Josh",
    nameHindi: "मटन रोगन जोश",
    cuisine: "Kashmiri",
    category: "Curries",
    time: "90 mins",
    prepTime: "20 mins",
    cookTime: "70 mins",
    servings: 4,
    difficulty: "Hard",
    rating: 4.9,
    image: "/rogan-josh.jpg",
    description: "Aromatic Kashmiri lamb curry with rich spices and yogurt.",
    descriptionHindi: "समृद्ध मसालों और दही के साथ सुगंधित कश्मीरी मटन करी।",
    ingredients: [
      { item: "Mutton", itemHindi: "मटन", quantity: "750g", quantityHindi: "750 ग्राम" },
      { item: "Yogurt", itemHindi: "दही", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Kashmiri red chili", itemHindi: "कश्मीरी लाल मिर्च", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Fennel powder", itemHindi: "सौंफ पाउडर", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Dry ginger powder", itemHindi: "सोंठ", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Ghee", itemHindi: "घी", quantity: "4 tbsp", quantityHindi: "4 बड़े चम्मच" },
      { item: "Whole spices", itemHindi: "साबुत मसाले", quantity: "as needed", quantityHindi: "आवश्यकतानुसार" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Heat ghee, add whole spices. Add mutton pieces and sear on high heat until browned.",
        instructionHindi: "घी गर्म करें, साबुत मसाले डालें। मटन के टुकड़े डालें और तेज आंच पर भूरा होने तक सेक करें।",
        duration: "15 mins",
      },
      {
        step: 2,
        instruction: "Add whisked yogurt slowly, stirring continuously to prevent curdling.",
        instructionHindi: "फटने से बचाने के लिए लगातार हिलाते हुए फेंटा हुआ दही धीरे-धीरे डालें।",
        duration: "5 mins",
      },
      {
        step: 3,
        instruction: "Add Kashmiri chili, fennel, dry ginger, and salt. Mix well.",
        instructionHindi: "कश्मीरी मिर्च, सौंफ, सोंठ और नमक डालें। अच्छी तरह मिलाएं।",
        duration: "5 mins",
      },
      {
        step: 4,
        instruction: "Add 2 cups water. Cover and cook on low heat until mutton is tender, about 50-60 minutes.",
        instructionHindi: "2 कप पानी डालें। ढककर धीमी आंच पर मटन नरम होने तक पकाएं, लगभग 50-60 मिनट।",
        duration: "60 mins",
      },
      {
        step: 5,
        instruction: "Garnish with garam masala and serve with steamed rice or naan.",
        instructionHindi: "गरम मसाला से सजाएं और उबले चावल या नान के साथ परोसें।",
        duration: "2 mins",
      },
    ],
    whistleCount: 8,
    tags: ["mutton", "rogan-josh", "kashmiri", "aromatic", "slow-cooked"],
  },
  {
    id: 35,
    name: "Chana Masala",
    nameHindi: "चना मसाला",
    cuisine: "North Indian",
    category: "Curries",
    time: "45 mins",
    prepTime: "8 hours",
    cookTime: "35 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    image: "/chana-masala.jpg",
    description: "Spiced chickpea curry in a tangy tomato-based gravy.",
    descriptionHindi: "खट्टी टमाटर आधारित ग्रेवी में मसालेदार छोले करी।",
    ingredients: [
      { item: "Chickpeas", itemHindi: "काबुली चना", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Onion", itemHindi: "प्याज", quantity: "2 large", quantityHindi: "2 बड़े" },
      { item: "Tomato", itemHindi: "टमाटर", quantity: "3 large", quantityHindi: "3 बड़े" },
      { item: "Chana masala", itemHindi: "चना मसाला", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Amchur", itemHindi: "अमचूर", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Ginger-garlic paste", itemHindi: "अदरक-लहसुन पेस्ट", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
    ],
    steps: [
      {
        step: 1,
        instruction: "Soak chickpeas overnight. Pressure cook with salt and tea bag until soft, about 4-5 whistles.",
        instructionHindi: "चने रात भर भिगोएं। नमक और चाय बैग के साथ नरम होने तक प्रेशर कुक करें, लगभग 4-5 सीटी।",
        duration: "30 mins",
      },
      {
        step: 2,
        instruction: "Heat oil, add onions and cook until deep golden. Add ginger-garlic paste.",
        instructionHindi: "तेल गर्म करें, प्याज डालें और गहरा सुनहरा होने तक पकाएं। अदरक-लहसुन पेस्ट डालें।",
        duration: "10 mins",
      },
      {
        step: 3,
        instruction: "Add tomatoes and cook until soft. Add chana masala and other spices.",
        instructionHindi: "टमाटर डालें और नरम होने तक पकाएं। चना मसाला और अन्य मसाले डालें।",
        duration: "8 mins",
      },
      {
        step: 4,
        instruction: "Add cooked chickpeas with some water. Mash some chickpeas for thick gravy. Simmer for 10 mins.",
        instructionHindi: "पके चने कुछ पानी के साथ डालें। गाढ़ी ग्रेवी के लिए कुछ चने मैश करें। 10 मिनट उबालें।",
        duration: "10 mins",
      },
      {
        step: 5,
        instruction: "Add amchur, garnish with coriander, ginger juliennes, and serve with bhatura or rice.",
        instructionHindi: "अमचूर डालें, धनिया, अदरक जुलिएन से सजाएं और भटूरे या चावल के साथ परोसें।",
        duration: "2 mins",
      },
    ],
    whistleCount: 5,
    tags: ["chana", "chickpeas", "curry", "protein", "vegan"],
  },
  {
    id: 36,
    name: "Khaman Dhokla",
    nameHindi: "खमन ढोकला",
    cuisine: "Gujarati",
    category: "Snacks",
    time: "30 mins",
    prepTime: "10 mins",
    cookTime: "20 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.7,
    image: "/dhokla.jpg",
    description: "Soft steamed gram flour cake tempered with mustard and curry leaves.",
    descriptionHindi: "भाप में पका नरम बेसन ढोकला, राई और करी पत्ते के तड़के के साथ।",
    ingredients: [
      { item: "Gram flour", itemHindi: "बेसन", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Curd", itemHindi: "दही", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "ENO", itemHindi: "ईनो", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Mustard seeds", itemHindi: "राई", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" }
    ],
    steps: [
      { step: 1, instruction: "Mix batter smooth.", instructionHindi: "घोल चिकना मिलाएँ।", duration: "5 min" },
      { step: 2, instruction: "Steam 15 minutes.", instructionHindi: "15 मिनट भाप दें।", duration: "15 min" },
      { step: 3, instruction: "Add tempering.", instructionHindi: "तड़का डालें।", duration: "5 min" }
    ],
    tags: ["steamed", "gujarati", "snack"]
  },
  {
    id: 37,
    name: "Methi Thepla",
    nameHindi: "मेथी थेपला",
    cuisine: "Gujarati",
    category: "Breakfast",
    time: "35 mins",
    prepTime: "15 mins",
    cookTime: "20 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.6,
    image: "/methi-thepla.jpg",
    description: "Spiced fenugreek flatbread.",
    descriptionHindi: "मसालेदार मेथी रोटी।",
    ingredients: [
      { item: "Wheat flour", itemHindi: "आटा", quantity: "2 cup", quantityHindi: "2 कप" },
      { item: "Methi leaves", itemHindi: "मेथी", quantity: "1 cup", quantityHindi: "1 कप" }
    ],
    steps: [
      { step: 1, instruction: "Knead dough.", instructionHindi: "आटा गूंथें।", duration: "10 min" },
      { step: 2, instruction: "Roll and roast.", instructionHindi: "बेलकर सेंकें।", duration: "20 min" }
    ],
    tags: ["flatbread", "travel", "gujarati"]
  },
  {
    id: 38,
    name: "Khandvi",
    nameHindi: "खंडवी",
    cuisine: "Gujarati",
    category: "Snacks",
    time: "35 mins",
    prepTime: "10 mins",
    cookTime: "25 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.6,
    image: "/khandvi.jpg",
    description: "Soft rolled gram flour and yogurt snack tempered with mustard and sesame.",
    descriptionHindi: "बेसन और दही से बना नरम रोल स्नैक, राई और तिल के तड़के के साथ।",
    ingredients: [
      { item: "Gram flour", itemHindi: "बेसन", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Curd", itemHindi: "दही", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Water", itemHindi: "पानी", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Turmeric", itemHindi: "हल्दी", quantity: "1/4 tsp", quantityHindi: "1/4 छोटा चम्मच" },
      { item: "Mustard seeds", itemHindi: "राई", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Sesame seeds", itemHindi: "तिल", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Add gram flour, curd, water, turmeric and salt into a bowl.",
        instructionHindi: "बेसन, दही, पानी, हल्दी और नमक एक बाउल में डालें।",
        duration: "2 mins"
      },
      {
        step: 2,
        instruction: "Whisk continuously until the batter becomes completely smooth and lump-free.",
        instructionHindi: "लगातार फेंटें जब तक घोल बिल्कुल चिकना और बिना गाठ का हो जाए।",
        duration: "3 mins",
        tips: "Lumps will ruin texture — whisk properly.",
        tipsHindi: "गाठें रहेंगी तो रोल नहीं बनेगा।"
      },
      {
        step: 3,
        instruction: "Pour batter into a pan and cook on low flame while stirring constantly.",
        instructionHindi: "घोल को कढ़ाही में डालकर धीमी आंच पर लगातार चलाते हुए पकाएं।",
        duration: "8 mins"
      },
      {
        step: 4,
        instruction: "Continue stirring until mixture thickens and leaves the sides.",
        instructionHindi: "चलाते रहें जब तक मिश्रण गाढ़ा होकर किनारों से छूटने लगे।",
        duration: "5 mins"
      },
      {
        step: 5,
        instruction: "Immediately spread thin layer on greased steel plate using spatula.",
        instructionHindi: "तुरंत चिकनी प्लेट पर पतली परत फैलाएं।",
        duration: "3 mins"
      },
      {
        step: 6,
        instruction: "Let it cool for 5 minutes.",
        instructionHindi: "5 मिनट ठंडा होने दें।",
        duration: "5 mins"
      },
      {
        step: 7,
        instruction: "Cut into long strips and roll gently.",
        instructionHindi: "लंबी पट्टियाँ काटकर धीरे रोल करें।",
        duration: "4 mins"
      },
      {
        step: 8,
        instruction: "Heat oil, add mustard and sesame seeds, pour tempering on rolls.",
        instructionHindi: "तेल गरम करें, राई और तिल डालें, तड़का डालें।",
        duration: "3 mins"
      }
    ],
    tags: ["gujarati", "steamed", "snack", "rolled"]
  },
  {
    id: 39,
    name: "Undhiyu",
    nameHindi: "उंधियू",
    cuisine: "Gujarati",
    category: "Curries",
    time: "60 mins",
    prepTime: "25 mins",
    cookTime: "35 mins",
    servings: 6,
    difficulty: "Hard",
    rating: 4.7,
    image: "/undhiyu.jpg",
    description: "Mixed winter vegetables slow cooked with spices and methi dumplings.",
    descriptionHindi: "मिश्रित सर्दियों की सब्जियाँ मसालों और मेथी पकौड़ी के साथ धीमी आंच पर पकी।",
    ingredients: [
      { item: "Mixed vegetables", itemHindi: "मिक्स सब्जियां", quantity: "4 cups", quantityHindi: "4 कप" },
      { item: "Baby potatoes", itemHindi: "छोटे आलू", quantity: "10", quantityHindi: "10" },
      { item: "Fenugreek dumplings", itemHindi: "मेथी मुठिया", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Coconut", itemHindi: "नारियल", quantity: "1/2 cup", quantityHindi: "1/2 कप" }
    ],
    steps: [
      { step: 1, instruction: "Wash and cut all vegetables into large chunks.", instructionHindi: "सभी सब्जियों को धोकर बड़े टुकड़ों में काटें।", duration: "8 mins" },
      { step: 2, instruction: "Mix coconut, peanuts, coriander, garlic and spices into stuffing masala.", instructionHindi: "नारियल, मूंगफली, धनिया, लहसुन और मसाले मिलाकर भरावन बनाएं।", duration: "6 mins" },
      { step: 3, instruction: "Stuff masala inside potatoes and eggplants.", instructionHindi: "आलू और बैंगन में मसाला भरें।", duration: "6 mins" },
      { step: 4, instruction: "Heat oil in heavy pan and add root vegetables first.", instructionHindi: "भारी बर्तन में तेल गरम करें और कड़ी सब्जियाँ पहले डालें।", duration: "5 mins" },
      { step: 5, instruction: "Add remaining vegetables and methi dumplings.", instructionHindi: "बाकी सब्जियाँ और मेथी मुठिया डालें।", duration: "3 mins" },
      { step: 6, instruction: "Cover and cook on low heat without stirring too much.", instructionHindi: "ढककर धीमी आंच पर पकाएं, ज्यादा न चलाएँ।", duration: "20 mins" },
      { step: 7, instruction: "Check softness and adjust salt.", instructionHindi: "नरम होने पर नमक चेक करें।", duration: "2 mins" }
    ],
    tags: ["gujarati", "festival", "mixed-veg"]
  },
  {
    id: 40,
    name: "Gujarati Kadhi",
    nameHindi: "गुजराती कढ़ी",
    cuisine: "Gujarati",
    category: "Curries",
    time: "25 mins",
    prepTime: "5 mins",
    cookTime: "20 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    image: "/gujarati-kadhi.jpg",
    description: "Sweet and tangy yogurt curry with gram flour.",
    descriptionHindi: "मीठी-खट्टी दही बेसन कढ़ी।",
    ingredients: [
      { item: "Curd", itemHindi: "दही", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Gram flour", itemHindi: "बेसन", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Jaggery", itemHindi: "गुड़", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" }
    ],
    steps: [
      { step: 1, instruction: "Add curd, gram flour and water into a bowl.", instructionHindi: "दही, बेसन और पानी बाउल में डालें।", duration: "2 mins" },
      { step: 2, instruction: "Whisk until smooth liquid batter forms.", instructionHindi: "चिकना घोल बनने तक फेंटें।", duration: "3 mins" },
      { step: 3, instruction: "Pour into pot and start heating on medium flame.", instructionHindi: "बर्तन में डालकर मध्यम आंच पर गरम करें।", duration: "3 mins" },
      { step: 4, instruction: "Add turmeric, salt and jaggery.", instructionHindi: "हल्दी, नमक और गुड़ डालें।", duration: "2 mins" },
      { step: 5, instruction: "Bring to boil while stirring continuously.", instructionHindi: "लगातार चलाते हुए उबालें।", duration: "7 mins" },
      { step: 6, instruction: "Prepare tempering with ghee, mustard and curry leaves.", instructionHindi: "घी, राई और करी पत्ता का तड़का बनाएं।", duration: "3 mins" },
      { step: 7, instruction: "Add tempering to kadhi and simmer 5 minutes.", instructionHindi: "तड़का डालकर 5 मिनट पकाएँ।", duration: "5 mins" }
    ],
    tags: ["kadhi", "gujarati", "yogurt"]
  },
  {
    id: 41,
    name: "Dal Baati Churma",
    nameHindi: "दाल बाटी चूरमा",
    cuisine: "Rajasthani",
    category: "Curries",
    time: "95 mins",
    prepTime: "30 mins",
    cookTime: "65 mins",
    servings: 6,
    difficulty: "Hard",
    rating: 4.8,
    image: "/dal-baati-churma.jpg",
    description: "Traditional Rajasthani meal with baked wheat baati, mixed dal and sweet churma.",
    descriptionHindi: "राजस्थानी पारंपरिक भोजन — बाटी, मिक्स दाल और मीठा चूरमा।",

    ingredients: [
      { item: "Whole wheat flour", itemHindi: "गेहूं का आटा", quantity: "3 cups", quantityHindi: "3 कप" },
      { item: "Semolina", itemHindi: "सूजी", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Ghee", itemHindi: "घी", quantity: "8 tbsp", quantityHindi: "8 बड़े चम्मच" },
      { item: "Mixed lentils", itemHindi: "मिक्स दाल", quantity: "1.5 cups", quantityHindi: "1.5 कप" },
      { item: "Onion", itemHindi: "प्याज", quantity: "1", quantityHindi: "1" },
      { item: "Tomato", itemHindi: "टमाटर", quantity: "1", quantityHindi: "1" },
      { item: "Garlic", itemHindi: "लहसुन", quantity: "6 cloves", quantityHindi: "6 कलियाँ" },
      { item: "Jaggery", itemHindi: "गुड़", quantity: "3/4 cup", quantityHindi: "3/4 कप" }
    ],

    steps: [
      { step: 1, instruction: "Wash mixed lentils thoroughly 3 times.", instructionHindi: "मिक्स दाल को 3 बार अच्छे से धोएं।", duration: "3 mins" },

      { step: 2, instruction: "Soak lentils in water for 20 minutes.", instructionHindi: "दाल को 20 मिनट भिगोकर रखें।", duration: "20 mins" },

      { step: 3, instruction: "Mix flour, semolina, salt and 4 tablespoons ghee.", instructionHindi: "आटा, सूजी, नमक और 4 चम्मच घी मिलाएं।", duration: "5 mins" },

      {
        step: 4, instruction: "Add little water and knead stiff dough.", instructionHindi: "थोड़ा पानी डालकर कड़ा आटा गूंथें।", duration: "6 mins",
        tips: "Dough must be harder than roti dough.",
        tipsHindi: "आटा रोटी के आटे से ज्यादा कड़ा होना चाहिए।"
      },

      { step: 5, instruction: "Divide dough into large lemon sized balls.", instructionHindi: "आटे की बड़ी गोलियां बनाएं।", duration: "4 mins" },

      { step: 6, instruction: "Preheat oven to 200°C.", instructionHindi: "ओवन को 200°C पर गरम करें।", duration: "5 mins" },

      { step: 7, instruction: "Bake baati for 30 minutes, turning once midway.", instructionHindi: "बाटी को 30 मिनट बेक करें, बीच में पलटें।", duration: "30 mins" },

      { step: 8, instruction: "Pressure cook soaked dal with salt and turmeric.", instructionHindi: "भीगी दाल को नमक और हल्दी के साथ कुकर में पकाएं।", duration: "15 mins" },

      { step: 9, instruction: "Cook for 5 whistles.", instructionHindi: "5 सीटी तक पकाएं।", duration: "—" },

      { step: 10, instruction: "Heat ghee and sauté onion, garlic and tomato.", instructionHindi: "घी में प्याज, लहसुन, टमाटर भूनें।", duration: "6 mins" },

      { step: 11, instruction: "Add cooked dal and simmer.", instructionHindi: "पकी दाल डालकर उबालें।", duration: "8 mins" },

      { step: 12, instruction: "Break two baati, mix with ghee and jaggery to make churma.", instructionHindi: "दो बाटी तोड़कर घी और गुड़ मिलाकर चूरमा बनाएं।", duration: "6 mins" },

      { step: 13, instruction: "Dip baked baati in ghee before serving.", instructionHindi: "सर्व करने से पहले बाटी को घी में डुबोएं।", duration: "2 mins" }
    ],

    tags: ["rajasthani", "festival", "dal", "baati", "traditional"],
    whistleCount: 5
  },
  {
    id: 42,
    name: "Gatte ki Sabzi",
    nameHindi: "गट्टे की सब्ज़ी",
    cuisine: "Rajasthani",
    category: "Curries",
    time: "45 mins",
    prepTime: "15 mins",
    cookTime: "30 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.6,
    image: "/gatte-ki-sabzi.jpg",
    description: "Traditional Rajasthani curry made with gram flour dumplings cooked in spiced yogurt gravy.",
    descriptionHindi: "बेसन के गट्टों से बनी पारंपरिक राजस्थानी दही वाली सब्ज़ी।",

    ingredients: [
      { item: "Gram flour", itemHindi: "बेसन", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Curd", itemHindi: "दही", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Red chili powder", itemHindi: "लाल मिर्च", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Turmeric", itemHindi: "हल्दी", quantity: "1/2 tsp", quantityHindi: "1/2 छोटा चम्मच" },
      { item: "Ajwain", itemHindi: "अजवाइन", quantity: "1/2 tsp", quantityHindi: "1/2 छोटा चम्मच" },
      { item: "Oil", itemHindi: "तेल", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" }
    ],

    steps: [
      {
        step: 1,
        instruction: "Take gram flour in a bowl. Add salt, chili powder, turmeric, ajwain, and 1 tablespoon oil.",
        instructionHindi: "एक कटोरे में बेसन लें। नमक, मिर्च, हल्दी, अजवाइन और 1 बड़ा चम्मच तेल मिलाएं।",
        duration: "3 mins"
      },
      {
        step: 2,
        instruction: "Add little water and knead into a stiff dough. Do not make it soft.",
        instructionHindi: "थोड़ा पानी डालकर कड़ा आटा गूंथें। नरम न रखें।",
        duration: "4 mins",
        tips: "Hard dough gives firm gatte texture."
      },
      {
        step: 3,
        instruction: "Roll dough into long cylindrical logs.",
        instructionHindi: "आटे की लंबी रोल जैसी आकृति बनाएं।",
        duration: "3 mins"
      },
      {
        step: 4,
        instruction: "Boil water and cook these rolls for 8 minutes.",
        instructionHindi: "पानी उबालकर इन रोल्स को 8 मिनट पकाएं।",
        duration: "8 mins"
      },
      {
        step: 5,
        instruction: "Remove, cool, and cut into small round pieces.",
        instructionHindi: "ठंडा करके छोटे टुकड़ों में काटें।",
        duration: "3 mins"
      },
      {
        step: 6,
        instruction: "Whisk curd with turmeric and chili powder.",
        instructionHindi: "दही में हल्दी और मिर्च मिलाकर फेंटें।",
        duration: "2 mins"
      },
      {
        step: 7,
        instruction: "Heat oil, add cumin, then curd mixture. Cook on low heat.",
        instructionHindi: "तेल गरम करें, जीरा डालें, फिर दही मिश्रण डालें। धीमी आंच पर पकाएं।",
        duration: "6 mins"
      },
      {
        step: 8,
        instruction: "Add gatte pieces and simmer for 10 minutes.",
        instructionHindi: "गट्टे डालें और 10 मिनट उबालें।",
        duration: "10 mins",
        tips: "Stir gently to avoid breaking gatte."
      }
    ],

    tags: ["rajasthani", "curry", "traditional", "besan"]
  },
  {
    id: 43,
    name: "Laal Maas",
    nameHindi: "लाल मांस",
    cuisine: "Rajasthani",
    category: "Non-Veg Curry",
    time: "60 mins",
    prepTime: "20 mins",
    cookTime: "40 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    image: "/laal-maas.jpg",
    description: "Spicy Rajasthani mutton curry cooked with red chilies and yogurt gravy.",
    descriptionHindi: "लाल मिर्च और दही की ग्रेवी में पका मसालेदार राजस्थानी मटन।",

    ingredients: [
      { item: "Mutton pieces", itemHindi: "मटन", quantity: "500g", quantityHindi: "500 ग्राम" },
      { item: "Curd", itemHindi: "दही", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Onion sliced", itemHindi: "प्याज", quantity: "2", quantityHindi: "2" },
      { item: "Garlic cloves", itemHindi: "लहसुन", quantity: "10", quantityHindi: "10" },
      { item: "Dry red chilies", itemHindi: "सूखी लाल मिर्च", quantity: "8", quantityHindi: "8" },
      { item: "Mustard oil", itemHindi: "सरसों तेल", quantity: "4 tbsp", quantityHindi: "4 बड़े चम्मच" },
      { item: "Coriander powder", itemHindi: "धनिया पाउडर", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],

    steps: [
      { step: 1, instruction: "Soak dry red chilies in hot water for 15 minutes.", instructionHindi: "सूखी लाल मिर्च को 15 मिनट गर्म पानी में भिगोएं।", duration: "15 mins" },
      { step: 2, instruction: "Grind soaked chilies with garlic into a thick paste.", instructionHindi: "भीगी मिर्च और लहसुन को पीसकर पेस्ट बनाएं।", duration: "5 mins", tips: "Use less water for stronger color." },
      { step: 3, instruction: "Heat mustard oil until smoking, then lower flame.", instructionHindi: "सरसों तेल धुआँ निकलने तक गरम करें, फिर आंच कम करें।", duration: "3 mins" },
      { step: 4, instruction: "Add sliced onions and fry until deep golden.", instructionHindi: "प्याज डालकर गहरा सुनहरा होने तक भूनें।", duration: "8 mins" },
      { step: 5, instruction: "Add mutton and sear on high heat.", instructionHindi: "मटन डालकर तेज आंच पर भूनें।", duration: "6 mins" },
      { step: 6, instruction: "Add chili-garlic paste and cook well.", instructionHindi: "मिर्च-लहसुन पेस्ट डालकर पकाएं।", duration: "5 mins" },
      { step: 7, instruction: "Add curd slowly while stirring continuously.", instructionHindi: "दही धीरे-धीरे डालें और चलाते रहें।", duration: "4 mins", tips: "Prevents curdling." },
      { step: 8, instruction: "Add coriander powder, salt and water. Cover and cook till tender.", instructionHindi: "मसाले और पानी डालकर ढककर नरम होने तक पकाएं।", duration: "20 mins" },
      { step: 9, instruction: "Simmer uncovered for thick gravy.", instructionHindi: "गाढ़ी ग्रेवी के लिए बिना ढके पकाएं।", duration: "6 mins" }
    ],

    tags: ["rajasthani", "mutton", "spicy", "festival"]
  },
  {
    id: 44,
    name: "Bajra Roti",
    nameHindi: "बाजरा रोटी",
    cuisine: "Rajasthani",
    category: "Bread",
    time: "25 mins",
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.4,
    image: "/bajra-roti.webp",
    description: "Traditional pearl millet flatbread served with ghee.",
    descriptionHindi: "घी के साथ परोसी जाने वाली पारंपरिक बाजरे की रोटी।",

    ingredients: [
      { item: "Bajra flour", itemHindi: "बाजरा आटा", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Warm water", itemHindi: "गर्म पानी", quantity: "as needed", quantityHindi: "आवश्यकतानुसार" },
      { item: "Salt", itemHindi: "नमक", quantity: "1/2 tsp", quantityHindi: "1/2 छोटा चम्मच" },
      { item: "Ghee", itemHindi: "घी", quantity: "for serving", quantityHindi: "परोसने हेतु" }
    ],

    steps: [
      { step: 1, instruction: "Mix bajra flour and salt in a bowl.", instructionHindi: "बाजरा आटा और नमक मिलाएं।", duration: "2 mins" },
      { step: 2, instruction: "Add warm water gradually and knead soft dough.", instructionHindi: "गर्म पानी डालकर नरम आटा गूंधें।", duration: "6 mins", tips: "Knead while warm — easier binding." },
      { step: 3, instruction: "Divide into equal balls.", instructionHindi: "बराबर गोले बनाएं।", duration: "2 mins" },
      { step: 4, instruction: "Flatten using palms on plastic sheet.", instructionHindi: "हाथ से थपथपाकर बेलें।", duration: "5 mins" },
      { step: 5, instruction: "Cook on hot tawa both sides.", instructionHindi: "गरम तवे पर दोनों तरफ पकाएं।", duration: "6 mins" },
      { step: 6, instruction: "Apply ghee and serve hot.", instructionHindi: "घी लगाकर गरम परोसें।", duration: "2 mins" }
    ],

    tags: ["rajasthani", "roti", "millet", "healthy"]
  },
  {
    id: 45,
    name: "Bengali Aloo Posto",
    nameHindi: "बंगाली आलू पोस्तो",
    cuisine: "Bengali",
    category: "Main Course",
    time: "30 minutes",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    servings: 3,
    difficulty: "Easy",
    rating: 4.4,
    image: "/aloo-posto.jpg",
    description: "A classic Bengali dish of potatoes cooked in a rich poppy seed paste with mild spices and mustard oil.",
    descriptionHindi: "खसखस के गाढ़े पेस्ट और हल्के मसालों के साथ सरसों के तेल में पके आलू की पारंपरिक बंगाली डिश।",
    ingredients: [
      { item: "Potatoes", itemHindi: "आलू", quantity: "3 medium", quantityHindi: "3 मध्यम" },
      { item: "Poppy seeds", itemHindi: "खसखस", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" },
      { item: "Green chilies", itemHindi: "हरी मिर्च", quantity: "3", quantityHindi: "3" },
      { item: "Mustard oil", itemHindi: "सरसों का तेल", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Nigella seeds", itemHindi: "कलौंजी", quantity: "1/2 tsp", quantityHindi: "आधा छोटा चम्मच" },
      { item: "Turmeric powder", itemHindi: "हल्दी पाउडर", quantity: "1/4 tsp", quantityHindi: "चौथाई छोटा चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" },
      { item: "Water", itemHindi: "पानी", quantity: "1/2 cup", quantityHindi: "आधा कप" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Rinse the poppy seeds thoroughly and soak them in warm water for at least fifteen minutes so they soften for grinding.",
        instructionHindi: "खसखस को अच्छी तरह धोकर कम से कम पंद्रह मिनट गुनगुने पानी में भिगो दें ताकि पीसने में आसानी हो।",
        duration: "15 minutes"
      },
      {
        step: 2,
        instruction: "Peel the potatoes and cut them into medium thick cubes. Wash the pieces and keep them in water to prevent discoloration.",
        instructionHindi: "आलू छीलकर मध्यम आकार के टुकड़ों में काट लें। टुकड़ों को धोकर पानी में रखें ताकि रंग न बदले।",
        duration: "5 minutes"
      },
      {
        step: 3,
        instruction: "Drain soaked poppy seeds and grind them with two green chilies and a little water into a smooth thick paste without coarse bits.",
        instructionHindi: "भीगी खसखस और दो हरी मिर्च को थोड़ा पानी डालकर चिकना गाढ़ा पेस्ट पीस लें, दानेदार न रहने दें।",
        duration: "5 minutes",
        tips: "Use minimal water while grinding to keep paste thick.",
        tipsHindi: "पीसते समय कम पानी डालें ताकि पेस्ट गाढ़ा रहे।"
      },
      {
        step: 4,
        instruction: "Heat mustard oil in a pan until it reaches smoking point, then lower the flame slightly.",
        instructionHindi: "पैन में सरसों का तेल धुआं उठने तक गरम करें, फिर आंच थोड़ी कम करें।",
        duration: "2 minutes"
      },
      {
        step: 5,
        instruction: "Add nigella seeds and let them crackle for a few seconds to release aroma.",
        instructionHindi: "तेल में कलौंजी डालें और कुछ सेकंड चटकने दें ताकि खुशबू निकले।",
        duration: "1 minute"
      },
      {
        step: 6,
        instruction: "Add the potato cubes, turmeric, and salt. Stir well to coat all pieces with oil and spices.",
        instructionHindi: "आलू के टुकड़े, हल्दी और नमक डालें। अच्छी तरह मिलाएं ताकि मसाला हर टुकड़े पर लग जाए।",
        duration: "3 minutes"
      },
      {
        step: 7,
        instruction: "Cook the potatoes on medium flame for five to six minutes, stirring occasionally, until edges start to turn light golden.",
        instructionHindi: "मध्यम आंच पर पांच से छह मिनट पकाएं और बीच-बीच में चलाएं, जब तक किनारे हल्के सुनहरे न हो जाएं।",
        duration: "6 minutes"
      },
      {
        step: 8,
        instruction: "Add the poppy seed paste and half cup water. Mix gently so the paste coats the potatoes evenly.",
        instructionHindi: "अब खसखस का पेस्ट और आधा कप पानी डालें। हल्के से मिलाएं ताकि पेस्ट आलू पर बराबर लग जाए।",
        duration: "2 minutes"
      },
      {
        step: 9,
        instruction: "Cover and cook on low flame until potatoes are fully tender and the gravy thickens, stirring carefully in between.",
        instructionHindi: "ढककर धीमी आंच पर पकाएं जब तक आलू पूरी तरह नरम न हो जाएं और ग्रेवी गाढ़ी न हो जाए, बीच में धीरे चलाएं।",
        duration: "8 minutes"
      },
      {
        step: 10,
        instruction: "Add the remaining slit green chili, cook for one more minute, and switch off the flame. Rest for two minutes before serving.",
        instructionHindi: "बची हुई चीरी हरी मिर्च डालें, एक मिनट और पकाएं और गैस बंद करें। परोसने से पहले दो मिनट ढककर रखें।",
        duration: "2 minutes"
      }
    ],
    tags: ["bengali", "potato", "posto", "vegetarian", "regional"]
  },
  {
    id: 46,
    name: "Bengali Luchi",
    nameHindi: "बंगाली लूची",
    cuisine: "Bengali",
    category: "Bread",
    time: "35 minutes",
    prepTime: "20 minutes",
    cookTime: "15 minutes",
    servings: 4,
    difficulty: "Easy",
    rating: 4.6,
    image: "/luchi.webp",
    description: "Soft and fluffy deep-fried Bengali bread made from refined flour, traditionally served with aloo dum or cholar dal.",
    descriptionHindi: "मैदे से बनी नरम और फूली हुई तली हुई बंगाली रोटी, जिसे आमतौर पर आलू दम या छोलेर दाल के साथ परोसा जाता है।",
    ingredients: [
      { item: "Refined flour", itemHindi: "मैदा", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Salt", itemHindi: "नमक", quantity: "1/2 tsp", quantityHindi: "आधा छोटा चम्मच" },
      { item: "Sugar", itemHindi: "चीनी", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Ghee", itemHindi: "घी", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Warm water", itemHindi: "गुनगुना पानी", quantity: "as needed", quantityHindi: "आवश्यकतानुसार" },
      { item: "Oil for frying", itemHindi: "तलने का तेल", quantity: "500 ml", quantityHindi: "500 मिली" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Take refined flour in a wide mixing bowl. Add salt and sugar, and mix them evenly with your fingers.",
        instructionHindi: "एक बड़े बर्तन में मैदा लें। उसमें नमक और चीनी डालकर उंगलियों से अच्छी तरह मिला लें।",
        duration: "3 minutes"
      },
      {
        step: 2,
        instruction: "Add ghee to the flour and rub it into the flour until the mixture resembles breadcrumbs.",
        instructionHindi: "मैदे में घी डालें और हाथों से अच्छी तरह मसलें जब तक मिश्रण ब्रेडक्रम जैसा न लगे।",
        duration: "3 minutes",
        tips: "This step helps make luchi softer and flaky.",
        tipsHindi: "यह कदम लूची को नरम और हल्का परतदार बनाता है।"
      },
      {
        step: 3,
        instruction: "Gradually add warm water little by little and knead into a smooth, soft but not sticky dough.",
        instructionHindi: "थोड़ा-थोड़ा गुनगुना पानी डालते हुए मुलायम लेकिन चिपचिपा नहीं ऐसा आटा गूंध लें।",
        duration: "7 minutes"
      },
      {
        step: 4,
        instruction: "Cover the dough with a damp cloth and let it rest for at least fifteen minutes.",
        instructionHindi: "आटे को गीले कपड़े से ढककर कम से कम पंद्रह मिनट के लिए रख दें।",
        duration: "15 minutes"
      },
      {
        step: 5,
        instruction: "After resting, knead the dough again briefly and divide it into small equal balls.",
        instructionHindi: "आराम के बाद आटे को फिर से हल्का गूंधें और छोटे बराबर गोले बना लें।",
        duration: "3 minutes"
      },
      {
        step: 6,
        instruction: "Apply a drop of oil on each ball and roll it into a smooth round disc about 3 to 4 inches wide. Do not make it too thin.",
        instructionHindi: "हर गोले पर थोड़ा तेल लगाकर 3 से 4 इंच का गोल पूरी जैसा बेलें। इसे बहुत पतला न बेलें।",
        duration: "5 minutes",
        tips: "Keep rolled discs covered so they don’t dry out.",
        tipsHindi: "बेली हुई लूची को ढककर रखें ताकि वे सूखें नहीं।"
      },
      {
        step: 7,
        instruction: "Heat oil in a deep kadai on medium flame until properly hot. Test by dropping a tiny dough piece — it should rise quickly.",
        instructionHindi: "कढ़ाई में तेल मध्यम आंच पर अच्छी तरह गरम करें। थोड़ा सा आटा डालकर जांचें — वह तुरंत ऊपर आना चाहिए।",
        duration: "4 minutes"
      },
      {
        step: 8,
        instruction: "Slide one rolled disc into hot oil and gently press with a slotted spoon so it puffs up fully.",
        instructionHindi: "एक बेली हुई लूची गरम तेल में डालें और झारे से हल्का दबाएं ताकि वह पूरी तरह फूल जाए।",
        duration: "1 minute"
      },
      {
        step: 9,
        instruction: "Flip and fry the other side for a few seconds until very light golden. Remove and drain excess oil.",
        instructionHindi: "पलटकर दूसरी तरफ कुछ सेकंड हल्का सुनहरा होने तक तलें। निकालकर अतिरिक्त तेल छान लें।",
        duration: "1 minute"
      },
      {
        step: 10,
        instruction: "Repeat the same frying process for all remaining discs and serve hot.",
        instructionHindi: "इसी तरह बाकी सभी लूची तलें और गरमागरम परोसें।",
        duration: "5 minutes"
      }
    ],
    tags: ["bengali", "bread", "fried", "festival"]
  },
  {
    id: 47,
    name: "Assamese Masor Tenga",
    nameHindi: "असमिया मासोर टेंगा",
    cuisine: "Assamese",
    category: "Main Course",
    time: "35 minutes",
    prepTime: "10 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.6,
    image: "/masor-tenga.jpg",
    description: "A light and tangy Assamese fish curry made with tomatoes and souring agents, known for its clean and refreshing flavor.",
    descriptionHindi: "टमाटर और खट्टे तत्वों से बनी हल्की और खट्टी असमिया मछली करी, जो अपने ताज़ा और साफ स्वाद के लिए जानी जाती है।",
    ingredients: [
      { item: "Fresh fish pieces", itemHindi: "ताज़ी मछली के टुकड़े", quantity: "500 g", quantityHindi: "500 ग्राम" },
      { item: "Tomatoes chopped", itemHindi: "कटे टमाटर", quantity: "2 medium", quantityHindi: "2 मध्यम" },
      { item: "Lemon juice", itemHindi: "नींबू रस", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Turmeric powder", itemHindi: "हल्दी पाउडर", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Mustard oil", itemHindi: "सरसों का तेल", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" },
      { item: "Fenugreek seeds", itemHindi: "मेथी दाना", quantity: "1/2 tsp", quantityHindi: "आधा छोटा चम्मच" },
      { item: "Green chilies slit", itemHindi: "चीरी हरी मिर्च", quantity: "3", quantityHindi: "3" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" },
      { item: "Water", itemHindi: "पानी", quantity: "2 cups", quantityHindi: "2 कप" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Wash the fish pieces thoroughly and pat them dry. Rub salt and half the turmeric over the fish and keep aside.",
        instructionHindi: "मछली के टुकड़ों को अच्छी तरह धोकर सुखा लें। नमक और आधी हल्दी लगाकर अलग रखें।",
        duration: "5 minutes"
      },
      {
        step: 2,
        instruction: "Heat mustard oil in a kadai until it reaches smoking point, then reduce the flame to medium.",
        instructionHindi: "कढ़ाई में सरसों का तेल धुआं उठने तक गरम करें, फिर आंच मध्यम कर दें।",
        duration: "3 minutes"
      },
      {
        step: 3,
        instruction: "Place the fish pieces in the hot oil and lightly fry them on both sides until lightly golden but not fully cooked. Remove and keep aside.",
        instructionHindi: "गरम तेल में मछली के टुकड़े डालकर दोनों तरफ हल्का सुनहरा होने तक सेकें, पूरी तरह न पकाएं। निकालकर अलग रखें।",
        duration: "6 minutes",
        tips: "Do not over-fry or fish will become tough later.",
        tipsHindi: "ज्यादा न तलें वरना बाद में मछली सख्त हो जाएगी।"
      },
      {
        step: 4,
        instruction: "In the same oil, add fenugreek seeds and let them crackle gently without burning.",
        instructionHindi: "उसी तेल में मेथी दाना डालें और हल्का चटकने दें, जलने न दें।",
        duration: "1 minute"
      },
      {
        step: 5,
        instruction: "Add chopped tomatoes and cook on medium flame until they become soft and pulpy, stirring regularly.",
        instructionHindi: "कटे टमाटर डालें और मध्यम आंच पर नरम और गूदेदार होने तक पकाएं, बीच-बीच में चलाते रहें।",
        duration: "5 minutes"
      },
      {
        step: 6,
        instruction: "Add remaining turmeric and slit green chilies, then mix well with the tomatoes.",
        instructionHindi: "बची हल्दी और चीरी हरी मिर्च डालें और टमाटर के साथ अच्छी तरह मिलाएं।",
        duration: "2 minutes"
      },
      {
        step: 7,
        instruction: "Pour two cups of water and bring the mixture to a rolling boil.",
        instructionHindi: "दो कप पानी डालें और मिश्रण को तेज उबाल आने दें।",
        duration: "3 minutes"
      },
      {
        step: 8,
        instruction: "Gently slide the fried fish pieces into the boiling curry and reduce flame to low.",
        instructionHindi: "तली हुई मछली के टुकड़े धीरे से उबलती करी में डालें और आंच धीमी करें।",
        duration: "2 minutes"
      },
      {
        step: 9,
        instruction: "Simmer uncovered for eight to ten minutes so the fish cooks fully and absorbs the tangy flavors.",
        instructionHindi: "बिना ढके आठ से दस मिनट धीमी आंच पर पकाएं ताकि मछली पूरी तरह पक जाए और खट्टा स्वाद सोख ले।",
        duration: "10 minutes"
      },
      {
        step: 10,
        instruction: "Turn off the heat and add lemon juice. Rest for two minutes before serving.",
        instructionHindi: "गैस बंद करें और नींबू रस डालें। परोसने से पहले दो मिनट ढककर रखें।",
        duration: "2 minutes"
      }
    ],
    tags: ["assamese", "fish", "tangy", "regional", "curry"]
  },
  {
    id: 48,
    name: "Assamese Khar",
    nameHindi: "असमिया खार",
    cuisine: "Assamese",
    category: "Main Course",
    time: "40 minutes",
    prepTime: "15 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.3,
    image: "/assamese-khar.webp",
    description: "A traditional Assamese alkaline curry made with raw papaya and lentils, known for its unique cleansing taste.",
    descriptionHindi: "कच्चे पपीते और दाल से बनी पारंपरिक असमिया क्षारीय करी, जो अपने खास शुद्ध स्वाद के लिए जानी जाती है।",
    ingredients: [
      { item: "Raw papaya cubes", itemHindi: "कच्चा पपीता टुकड़े", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Split black gram dal", itemHindi: "उड़द दाल", quantity: "1/2 cup", quantityHindi: "आधा कप" },
      { item: "Khar water", itemHindi: "खार पानी", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" },
      { item: "Mustard oil", itemHindi: "सरसों का तेल", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Bay leaf", itemHindi: "तेज पत्ता", quantity: "1", quantityHindi: "1" },
      { item: "Garlic crushed", itemHindi: "कुचला लहसुन", quantity: "5 cloves", quantityHindi: "5 कलियां" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" },
      { item: "Water", itemHindi: "पानी", quantity: "3 cups", quantityHindi: "3 कप" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Wash the dal thoroughly and soak it for fifteen minutes to soften.",
        instructionHindi: "दाल को अच्छी तरह धोकर पंद्रह मिनट के लिए भिगो दें।",
        duration: "15 minutes"
      },
      {
        step: 2,
        instruction: "Peel the raw papaya, remove seeds, and cut into medium sized cubes. Rinse and keep ready.",
        instructionHindi: "कच्चा पपीता छीलकर बीज निकालें और मध्यम टुकड़ों में काटकर धो लें।",
        duration: "5 minutes"
      },
      {
        step: 3,
        instruction: "Boil soaked dal with two cups water until half cooked but not mushy.",
        instructionHindi: "भीगी दाल को दो कप पानी के साथ आधा पकने तक उबालें, ज्यादा गलने न दें।",
        duration: "8 minutes"
      },
      {
        step: 4,
        instruction: "Add papaya cubes and continue boiling until both dal and papaya become tender.",
        instructionHindi: "अब पपीते के टुकड़े डालें और दाल व पपीता नरम होने तक उबालते रहें।",
        duration: "10 minutes"
      },
      {
        step: 5,
        instruction: "Heat mustard oil in a pan and add bay leaf and crushed garlic. Sauté until garlic turns light golden.",
        instructionHindi: "पैन में सरसों तेल गरम करें, तेज पत्ता और लहसुन डालकर हल्का सुनहरा होने तक भूनें।",
        duration: "4 minutes"
      },
      {
        step: 6,
        instruction: "Pour the boiled dal and papaya mixture into the pan and mix well.",
        instructionHindi: "उबली दाल और पपीता मिश्रण पैन में डालकर मिलाएं।",
        duration: "2 minutes"
      },
      {
        step: 7,
        instruction: "Add khar water and salt, then simmer on low heat for five minutes.",
        instructionHindi: "खार पानी और नमक डालकर पांच मिनट धीमी आंच पर पकाएं।",
        duration: "5 minutes"
      },
      {
        step: 8,
        instruction: "Turn off heat and rest covered for three minutes before serving.",
        instructionHindi: "गैस बंद कर तीन मिनट ढककर रखें, फिर परोसें।",
        duration: "3 minutes"
      }
    ],
    tags: ["assamese", "traditional", "alkaline", "vegetarian"]
  },

  {
    id: 49,
    name: "Odia Dalma",
    nameHindi: "ओडिया दालमा",
    cuisine: "Odia",
    category: "Main Course",
    time: "45 minutes",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    image: "odia-dalma.webp",
    description: "A wholesome Odia lentil and vegetable stew cooked without onion and garlic.",
    descriptionHindi: "बिना प्याज और लहसुन के बनी पौष्टिक ओडिया दाल और सब्ज़ी की स्टू।",
    ingredients: [
      { item: "Toor dal", itemHindi: "अरहर दाल", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Mixed vegetables cubes", itemHindi: "मिक्स सब्ज़ी टुकड़े", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Cumin seeds", itemHindi: "जीरा", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Bay leaf", itemHindi: "तेज पत्ता", quantity: "1", quantityHindi: "1" },
      { item: "Turmeric", itemHindi: "हल्दी", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Ghee", itemHindi: "घी", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Grated ginger", itemHindi: "कद्दूकस अदरक", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Wash the toor dal and soak it for ten minutes.",
        instructionHindi: "अरहर दाल धोकर दस मिनट भिगो दें।",
        duration: "10 minutes"
      },
      {
        step: 2,
        instruction: "Add dal, vegetables, turmeric, salt, and three cups water to a pressure cooker.",
        instructionHindi: "कुकर में दाल, सब्ज़ियां, हल्दी, नमक और तीन कप पानी डालें।",
        duration: "3 minutes"
      },
      {
        step: 3,
        instruction: "Pressure cook for three whistles until dal and vegetables are soft.",
        instructionHindi: "तीन सीटी तक पकाएं ताकि दाल और सब्ज़ियां नरम हो जाएं।",
        duration: "12 minutes"
      },
      {
        step: 4,
        instruction: "Open cooker and lightly mash a small portion to thicken the stew while keeping chunks visible.",
        instructionHindi: "कुकर खोलकर थोड़ा हिस्सा हल्का मैश करें ताकि गाढ़ापन आए पर टुकड़े दिखें।",
        duration: "3 minutes"
      },
      {
        step: 5,
        instruction: "Heat ghee in a pan and add cumin seeds and bay leaf. Let them crackle.",
        instructionHindi: "पैन में घी गरम कर जीरा और तेज पत्ता डालें, चटकने दें।",
        duration: "2 minutes"
      },
      {
        step: 6,
        instruction: "Add grated ginger and sauté briefly until aromatic.",
        instructionHindi: "अदरक डालकर खुशबू आने तक हल्का भूनें।",
        duration: "2 minutes"
      },
      {
        step: 7,
        instruction: "Pour this tempering over the dal mixture and simmer for five minutes.",
        instructionHindi: "यह तड़का दाल पर डालकर पांच मिनट धीमी आंच पर पकाएं।",
        duration: "5 minutes"
      },
      {
        step: 8,
        instruction: "Rest covered for three minutes and then serve hot.",
        instructionHindi: "तीन मिनट ढककर रखें और गरम परोसें।",
        duration: "3 minutes"
      }
    ],
    tags: ["odia", "dal", "vegetable", "satvik"]
  },

  {
    id: 50,
    name: "Odia Pakhala Bhata",
    nameHindi: "ओडिया पखाला भात",
    cuisine: "Odia",
    category: "Main Course",
    time: "20 minutes",
    prepTime: "10 minutes",
    cookTime: "10 minutes",
    servings: 3,
    difficulty: "Easy",
    rating: 4.2,
    image: "/odi-pakhala-bhata.jpg",
    description: "Fermented rice dish from Odisha served with tempered spices and curd for cooling effect.",
    descriptionHindi: "ओडिशा का किण्वित चावल व्यंजन जिसे तड़के और दही के साथ ठंडक के लिए परोसा जाता है।",
    ingredients: [
      { item: "Cooked rice", itemHindi: "पका चावल", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Water", itemHindi: "पानी", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Curd", itemHindi: "दही", quantity: "1/2 cup", quantityHindi: "आधा कप" },
      { item: "Mustard seeds", itemHindi: "सरसों", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Curry leaves", itemHindi: "करी पत्ता", quantity: "8", quantityHindi: "8" },
      { item: "Green chili chopped", itemHindi: "कटी हरी मिर्च", quantity: "1", quantityHindi: "1" },
      { item: "Oil", itemHindi: "तेल", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Place cooked rice in a deep bowl and add water. Mash lightly with your fingers.",
        instructionHindi: "पके चावल को गहरे बर्तन में डालकर पानी मिलाएं और हाथ से हल्का मसलें।",
        duration: "3 minutes"
      },
      {
        step: 2,
        instruction: "Add curd and salt and mix thoroughly until evenly combined.",
        instructionHindi: "दही और नमक डालकर अच्छी तरह मिलाएं।",
        duration: "2 minutes"
      },
      {
        step: 3,
        instruction: "Let the mixture rest for at least ten minutes for mild fermentation flavor.",
        instructionHindi: "हल्के किण्वन स्वाद के लिए मिश्रण को दस मिनट रखें।",
        duration: "10 minutes"
      },
      {
        step: 4,
        instruction: "Heat oil in a small pan and add mustard seeds until they splutter.",
        instructionHindi: "छोटे पैन में तेल गरम कर सरसों चटकाएं।",
        duration: "2 minutes"
      },
      {
        step: 5,
        instruction: "Add curry leaves and chopped green chili and sauté briefly.",
        instructionHindi: "करी पत्ता और हरी मिर्च डालकर हल्का भूनें।",
        duration: "1 minute"
      },
      {
        step: 6,
        instruction: "Pour the tempering over the rice mixture and stir before serving.",
        instructionHindi: "यह तड़का चावल मिश्रण पर डालें और परोसने से पहले मिलाएं।",
        duration: "2 minutes"
      }
    ],
    tags: ["odia", "rice", "fermented", "summer"]
  },

  {
    id: 51,
    name: "Hyderabadi Bagara Baingan",
    nameHindi: "हैदराबादी बगारा बैंगन",
    cuisine: "Hyderabadi",
    category: "Main Course",
    time: "50 minutes",
    prepTime: "20 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    image: "/hyderabadi-bagara-baingan.webp",
    description: "Small eggplants cooked in a rich peanut, sesame, and coconut gravy.",
    descriptionHindi: "मूंगफली, तिल और नारियल की गाढ़ी ग्रेवी में पके छोटे बैंगन।",
    ingredients: [
      { item: "Small eggplants", itemHindi: "छोटे बैंगन", quantity: "8", quantityHindi: "8" },
      { item: "Peanuts", itemHindi: "मूंगफली", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" },
      { item: "Sesame seeds", itemHindi: "तिल", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Dry coconut", itemHindi: "सूखा नारियल", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Onion sliced", itemHindi: "कटा प्याज", quantity: "2", quantityHindi: "2" },
      { item: "Tamarind pulp", itemHindi: "इमली गूदा", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Oil", itemHindi: "तेल", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Wash eggplants and make cross slits without cutting fully so they stay intact.",
        instructionHindi: "बैंगन धोकर क्रॉस कट लगाएं पर पूरी तरह न काटें।",
        duration: "5 minutes"
      },
      {
        step: 2,
        instruction: "Dry roast peanuts, sesame, and coconut separately until aromatic.",
        instructionHindi: "मूंगफली, तिल और नारियल को अलग-अलग सूखा भूनें।",
        duration: "8 minutes"
      },
      {
        step: 3,
        instruction: "Grind roasted ingredients with little water into a thick paste.",
        instructionHindi: "भुने मिश्रण को थोड़ा पानी डालकर गाढ़ा पेस्ट पीस लें।",
        duration: "5 minutes"
      },
      {
        step: 4,
        instruction: "Heat oil and shallow fry eggplants until lightly browned outside. Remove and keep aside.",
        instructionHindi: "तेल गरम कर बैंगन हल्के भूरे होने तक सेकें, निकाल लें।",
        duration: "8 minutes"
      },
      {
        step: 5,
        instruction: "In same pan cook sliced onions until deep golden.",
        instructionHindi: "उसी पैन में प्याज गहरा सुनहरा होने तक पकाएं।",
        duration: "6 minutes"
      },
      {
        step: 6,
        instruction: "Add ground paste and cook slowly while stirring until oil separates.",
        instructionHindi: "पिसा पेस्ट डालकर तेल अलग होने तक पकाएं।",
        duration: "6 minutes"
      },
      {
        step: 7,
        instruction: "Add tamarind pulp, salt, and half cup water and mix.",
        instructionHindi: "इमली, नमक और आधा कप पानी डालकर मिलाएं।",
        duration: "3 minutes"
      },
      {
        step: 8,
        instruction: "Add fried eggplants, cover, and simmer until they become soft and coated with gravy.",
        instructionHindi: "बैंगन डालकर ढकें और नरम होने तक पकाएं।",
        duration: "9 minutes"
      }
    ],
    tags: ["hyderabadi", "baingan", "gravy", "regional"]
  },
  {
    id: 52,
    name: "Karnataka Bisi Bele Bath",
    nameHindi: "कर्नाटक बिसी बेले भात",
    cuisine: "Karnataka",
    category: "Main Course",
    time: "55 minutes",
    prepTime: "15 minutes",
    cookTime: "40 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    image: "/karnataka-bisi-bele-bath.jpg",
    description: "Hearty Karnataka rice-lentil dish cooked with vegetables and special spice blend.",
    descriptionHindi: "सब्ज़ियों और खास मसाले के साथ पका कर्नाटक का चावल-दाल मिश्रित व्यंजन।",
    ingredients: [
      { item: "Rice", itemHindi: "चावल", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Toor dal", itemHindi: "अरहर दाल", quantity: "1/2 cup", quantityHindi: "आधा कप" },
      { item: "Mixed vegetables", itemHindi: "मिक्स सब्ज़ियां", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Bisi bele masala", itemHindi: "बिसी बेले मसाला", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Tamarind pulp", itemHindi: "इमली गूदा", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Ghee", itemHindi: "घी", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Wash rice and dal together and soak for fifteen minutes.",
        instructionHindi: "चावल और दाल धोकर पंद्रह मिनट भिगो दें।",
        duration: "15 minutes"
      },
      {
        step: 2,
        instruction: "Pressure cook rice, dal, and vegetables with four cups water until very soft.",
        instructionHindi: "चावल, दाल और सब्ज़ियों को चार कप पानी के साथ नरम होने तक कुकर में पकाएं।",
        duration: "15 minutes"
      },
      {
        step: 3,
        instruction: "Mash the cooked mixture lightly to form a thick base.",
        instructionHindi: "पके मिश्रण को हल्का मैश करें।",
        duration: "3 minutes"
      },
      {
        step: 4,
        instruction: "Add tamarind pulp, salt, and bisi bele masala and mix thoroughly.",
        instructionHindi: "इमली, नमक और मसाला डालकर मिलाएं।",
        duration: "3 minutes"
      },
      {
        step: 5,
        instruction: "Simmer on low heat for ten minutes, stirring so it does not stick.",
        instructionHindi: "धीमी आंच पर दस मिनट पकाएं, चिपकने न दें।",
        duration: "10 minutes"
      },
      {
        step: 6,
        instruction: "Finish with melted ghee mixed in before serving hot.",
        instructionHindi: "अंत में घी मिलाकर गरम परोसें।",
        duration: "2 minutes"
      }
    ],
    tags: ["karnataka", "rice", "dal", "one-pot"]
  },

  {
    id: 53,
    name: "Kerala Avial",
    nameHindi: "केरल अवियल",
    cuisine: "Kerala",
    category: "Main Course",
    time: "40 minutes",
    prepTime: "15 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    image: "/kerala-avial.jpg",
    description: "Mixed vegetable coconut curry finished with yogurt and coconut oil.",
    descriptionHindi: "नारियल और दही से बनी केरल की मिक्स सब्ज़ी करी।",
    ingredients: [
      { item: "Mixed vegetables sticks", itemHindi: "मिक्स सब्ज़ी स्टिक्स", quantity: "3 cups", quantityHindi: "3 कप" },
      { item: "Grated coconut", itemHindi: "कद्दूकस नारियल", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Green chilies", itemHindi: "हरी मिर्च", quantity: "4", quantityHindi: "4" },
      { item: "Yogurt", itemHindi: "दही", quantity: "1/2 cup", quantityHindi: "आधा कप" },
      { item: "Coconut oil", itemHindi: "नारियल तेल", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Cook vegetables with little water and salt until just tender.",
        instructionHindi: "सब्ज़ियां नमक और थोड़ा पानी डालकर नरम होने तक पकाएं।",
        duration: "10 minutes"
      },
      {
        step: 2,
        instruction: "Grind coconut and green chilies into a coarse paste.",
        instructionHindi: "नारियल और हरी मिर्च का दरदरा पेस्ट पीसें।",
        duration: "5 minutes"
      },
      {
        step: 3,
        instruction: "Add coconut paste to vegetables and mix gently.",
        instructionHindi: "सब्ज़ियों में नारियल पेस्ट मिलाएं।",
        duration: "3 minutes"
      },
      {
        step: 4,
        instruction: "Cook on low flame for five minutes without adding extra water.",
        instructionHindi: "बिना अतिरिक्त पानी के पांच मिनट धीमी आंच पर पकाएं।",
        duration: "5 minutes"
      },
      {
        step: 5,
        instruction: "Turn off heat and mix beaten yogurt quickly.",
        instructionHindi: "गैस बंद कर फेंटा दही मिलाएं।",
        duration: "2 minutes"
      },
      {
        step: 6,
        instruction: "Drizzle coconut oil on top and rest covered before serving.",
        instructionHindi: "ऊपर से नारियल तेल डालकर ढककर रखें।",
        duration: "3 minutes"
      }
    ],
    tags: ["kerala", "vegetable", "coconut", "traditional"]
  },

  {
    id: 54,
    name: "Kerala Appam",
    nameHindi: "केरल अप्पम",
    cuisine: "Kerala",
    category: "Bread",
    time: "8 hours",
    prepTime: "7 hours",
    cookTime: "1 hour",
    servings: 4,
    difficulty: "Medium",
    rating: 4.6,
    image: "/kerala-appam.jpg",
    description: "Fermented rice pancakes with soft center and lacy edges.",
    descriptionHindi: "बीच से नरम और किनारों से जालीदार किण्वित चावल पैनकेक।",
    ingredients: [
      { item: "Raw rice", itemHindi: "कच्चा चावल", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Cooked rice", itemHindi: "पका चावल", quantity: "1/2 cup", quantityHindi: "आधा कप" },
      { item: "Coconut milk", itemHindi: "नारियल दूध", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Sugar", itemHindi: "चीनी", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "1/2 tsp", quantityHindi: "आधा छोटा चम्मच" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Soak raw rice in water for six hours.",
        instructionHindi: "कच्चा चावल छह घंटे भिगोएं।",
        duration: "6 hours"
      },
      {
        step: 2,
        instruction: "Grind soaked rice with cooked rice and coconut milk into smooth batter.",
        instructionHindi: "भीगा चावल, पका चावल और नारियल दूध पीसकर बैटर बनाएं।",
        duration: "10 minutes"
      },
      {
        step: 3,
        instruction: "Add sugar and salt and mix well.",
        instructionHindi: "चीनी और नमक मिलाएं।",
        duration: "2 minutes"
      },
      {
        step: 4,
        instruction: "Ferment batter in warm place for eight hours until slightly bubbly.",
        instructionHindi: "बैटर को गर्म जगह आठ घंटे किण्वित करें।",
        duration: "8 hours"
      },
      {
        step: 5,
        instruction: "Pour a ladle into hot appam pan and swirl to spread edges thin.",
        instructionHindi: "गरम अप्पम पैन में बैटर डालकर घुमाएं।",
        duration: "2 minutes"
      },
      {
        step: 6,
        instruction: "Cover and cook until center is soft and edges crisp.",
        instructionHindi: "ढककर बीच नरम और किनारे कुरकुरे होने तक पकाएं।",
        duration: "3 minutes"
      }
    ],
    tags: ["kerala", "appam", "fermented", "bread"]
  },
  {
    id: 55,
    name: "Jharkhand Dhuska",
    nameHindi: "झारखंड धुस्का",
    cuisine: "Jharkhand",
    category: "Snack",
    time: "35 minutes",
    prepTime: "20 minutes",
    cookTime: "15 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.3,
    image: "jharkhand-dhuska.jpg",
    description: "Deep fried rice-lentil batter breads.",
    descriptionHindi: "चावल-दाल बैटर की तली रोटी।",
    ingredients: [
      { item: "Rice", itemHindi: "चावल", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Chana dal", itemHindi: "चना दाल", quantity: "1/2 cup", quantityHindi: "आधा कप" },
      { item: "Garlic", itemHindi: "लहसुन", quantity: "4 cloves", quantityHindi: "4 कलियां" },
      { item: "Cumin", itemHindi: "जीरा", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Oil", itemHindi: "तेल", quantity: "for frying", quantityHindi: "तलने के लिए" }
    ],
    steps: [
      { step: 1, instruction: "Soak rice and dal four hours.", instructionHindi: "चार घंटे भिगोएं।", duration: "4 hours" },
      { step: 2, instruction: "Grind with garlic and cumin into thick batter.", instructionHindi: "पीसें।", duration: "8 minutes" },
      { step: 3, instruction: "Heat oil to medium hot.", instructionHindi: "तेल गरम करें।", duration: "3 minutes" },
      { step: 4, instruction: "Pour ladle batter and deep fry until puffed.", instructionHindi: "बैटर तलें।", duration: "8 minutes" }
    ],
    tags: ["jharkhand", "fried"]
  },
  {
    id: 56,
    name: "Andhra Tomato Pappu",
    nameHindi: "आंध्रा टमाटर पप्पू",
    cuisine: "Andhra",
    category: "Main Course",
    time: "35 minutes",
    prepTime: "10 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    image: "/andhra-tomato-pappu.webp",
    description: "Tangy Andhra dal cooked with tomatoes and garlic tempering.",
    descriptionHindi: "टमाटर और लहसुन तड़के वाली खट्टी आंध्रा दाल।",
    ingredients: [
      { item: "Toor dal", itemHindi: "अरहर दाल", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Tomatoes", itemHindi: "टमाटर", quantity: "3", quantityHindi: "3" },
      { item: "Garlic", itemHindi: "लहसुन", quantity: "6 cloves", quantityHindi: "6 कलियां" },
      { item: "Mustard seeds", itemHindi: "सरसों", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Red chili", itemHindi: "सूखी मिर्च", quantity: "2", quantityHindi: "2" },
      { item: "Oil", itemHindi: "तेल", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Pressure cook dal and chopped tomatoes with turmeric and water until soft.",
        instructionHindi: "दाल और टमाटर हल्दी के साथ नरम होने तक कुकर में पकाएं।",
        duration: "12 minutes"
      },
      {
        step: 2,
        instruction: "Mash lightly to combine dal and tomato.",
        instructionHindi: "हल्का मैश करें।",
        duration: "2 minutes"
      },
      {
        step: 3,
        instruction: "Heat oil and add mustard and red chilies.",
        instructionHindi: "तेल गरम कर सरसों और सूखी मिर्च डालें।",
        duration: "2 minutes"
      },
      {
        step: 4,
        instruction: "Add crushed garlic and sauté until light golden.",
        instructionHindi: "लहसुन भूनें।",
        duration: "3 minutes"
      },
      {
        step: 5,
        instruction: "Pour dal into tempering and simmer ten minutes.",
        instructionHindi: "दाल डालकर दस मिनट पकाएं।",
        duration: "10 minutes"
      }
    ],
    tags: ["andhra", "dal", "tomato"]
  },

  {
    id: 57,
    name: "Andhra Gongura Pachadi",
    nameHindi: "आंध्रा गोंगूरा पचड़ी",
    cuisine: "Andhra",
    category: "Side Dish",
    time: "30 minutes",
    prepTime: "15 minutes",
    cookTime: "15 minutes",
    servings: 4,
    difficulty: "Easy",
    rating: 4.4,
    image: "/andhra-gongura-pachadi.jpg",
    description: "Spicy and sour chutney made from gongura leaves.",
    descriptionHindi: "गोंगूरा पत्तों से बनी खट्टी तीखी चटनी।",
    ingredients: [
      { item: "Gongura leaves", itemHindi: "गोंगूरा पत्ते", quantity: "3 cups", quantityHindi: "3 कप" },
      { item: "Dry red chilies", itemHindi: "सूखी मिर्च", quantity: "6", quantityHindi: "6" },
      { item: "Garlic", itemHindi: "लहसुन", quantity: "5 cloves", quantityHindi: "5 कलियां" },
      { item: "Oil", itemHindi: "तेल", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Wash and dry gongura leaves completely.",
        instructionHindi: "गोंगूरा पत्ते धोकर सुखाएं।",
        duration: "8 minutes"
      },
      {
        step: 2,
        instruction: "Heat oil and fry red chilies and garlic.",
        instructionHindi: "मिर्च और लहसुन तलें।",
        duration: "4 minutes"
      },
      {
        step: 3,
        instruction: "Add gongura leaves and cook until wilted and moisture dries.",
        instructionHindi: "पत्ते डालकर नमी सूखने तक पकाएं।",
        duration: "8 minutes"
      },
      {
        step: 4,
        instruction: "Cool and grind with salt into thick chutney.",
        instructionHindi: "ठंडा कर नमक के साथ पीसें।",
        duration: "5 minutes"
      }
    ],
    tags: ["andhra", "chutney", "sour"]
  },
  {
    id: 58,
    name: "Maharashtrian Zunka",
    nameHindi: "महाराष्ट्रीयन झुनका",
    cuisine: "Maharashtrian",
    category: "Main Course",
    time: "25 minutes",
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    servings: 3,
    difficulty: "Easy",
    rating: 4.3,
    image: "/maharashtrian-zunka.webp",
    description: "Dry gram flour scramble cooked with spices and onions.",
    descriptionHindi: "बेसन और मसालों से बनी सूखी भुर्जी शैली डिश।",
    ingredients: [
      { item: "Gram flour", itemHindi: "बेसन", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Onion", itemHindi: "प्याज", quantity: "1", quantityHindi: "1" },
      { item: "Mustard seeds", itemHindi: "सरसों", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Turmeric", itemHindi: "हल्दी", quantity: "1/2 tsp", quantityHindi: "आधा छोटा चम्मच" },
      { item: "Oil", itemHindi: "तेल", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Heat oil and crackle mustard seeds.",
        instructionHindi: "तेल में सरसों चटकाएं।",
        duration: "2 minutes"
      },
      {
        step: 2,
        instruction: "Add chopped onion and cook until soft.",
        instructionHindi: "प्याज नरम होने तक पकाएं।",
        duration: "5 minutes"
      },
      {
        step: 3,
        instruction: "Add turmeric and salt and mix.",
        instructionHindi: "हल्दी और नमक मिलाएं।",
        duration: "1 minute"
      },
      {
        step: 4,
        instruction: "Add gram flour and sprinkle little water while stirring continuously.",
        instructionHindi: "बेसन डालकर थोड़ा पानी छिड़कते हुए चलाएं।",
        duration: "5 minutes"
      },
      {
        step: 5,
        instruction: "Cook until crumbly and fully cooked with no raw taste.",
        instructionHindi: "कच्चापन खत्म होने तक पकाएं।",
        duration: "5 minutes"
      }
    ],
    tags: ["maharashtra", "besan", "dry"]
  },
  {
    id: 59,
    name: "Kashmiri Dum Aloo",
    nameHindi: "कश्मीरी दम आलू",
    cuisine: "Kashmiri",
    category: "Main Course",
    time: "50 minutes",
    prepTime: "20 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    image: "/kashmiri-dum-aloo.webp",
    description: "Baby potatoes slow cooked in yogurt based Kashmiri spice gravy.",
    descriptionHindi: "दही आधारित कश्मीरी मसाला ग्रेवी में धीमी आंच पर पके छोटे आलू।",
    ingredients: [
      { item: "Baby potatoes", itemHindi: "छोटे आलू", quantity: "500 g", quantityHindi: "500 ग्राम" },
      { item: "Yogurt", itemHindi: "दही", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Kashmiri chili powder", itemHindi: "कश्मीरी मिर्च", quantity: "2 tsp", quantityHindi: "2 छोटा चम्मच" },
      { item: "Fennel powder", itemHindi: "सौंफ पाउडर", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Oil", itemHindi: "तेल", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Boil baby potatoes, peel, and prick with fork.",
        instructionHindi: "आलू उबालकर छीलें और कांटे से छेद करें।",
        duration: "12 minutes"
      },
      {
        step: 2,
        instruction: "Deep fry potatoes until golden.",
        instructionHindi: "आलू सुनहरे तलें।",
        duration: "8 minutes"
      },
      {
        step: 3,
        instruction: "Whisk yogurt with spice powders and salt.",
        instructionHindi: "दही में मसाले मिलाएं।",
        duration: "3 minutes"
      },
      {
        step: 4,
        instruction: "Heat little oil, add yogurt mix, and cook on low stirring continuously.",
        instructionHindi: "तेल में दही मसाला धीमी आंच पर चलाते पकाएं।",
        duration: "7 minutes"
      },
      {
        step: 5,
        instruction: "Add potatoes and simmer covered for ten minutes.",
        instructionHindi: "आलू डालकर दस मिनट दम दें।",
        duration: "10 minutes"
      }
    ],
    tags: ["kashmiri", "aloo", "gravy"]
  },
  {
    id: 60,
    name: "Kashmiri Rajma Gogji",
    nameHindi: "कश्मीरी राजमा गोगजी",
    cuisine: "Kashmiri",
    category: "Main Course",
    time: "55 minutes",
    prepTime: "15 minutes",
    cookTime: "40 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.5,
    image: "/kashmiri-rajma-gogji.jpg",
    description: "A traditional Kashmiri curry made with red kidney beans and turnips cooked in aromatic spices.",
    descriptionHindi: "राजमा और शलजम से बनी पारंपरिक कश्मीरी मसालेदार करी।",
    ingredients: [
      { item: "Rajma soaked", itemHindi: "भीगा राजमा", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Turnip cubes", itemHindi: "शलजम टुकड़े", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Mustard oil", itemHindi: "सरसों तेल", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Cumin seeds", itemHindi: "जीरा", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Kashmiri chili powder", itemHindi: "कश्मीरी मिर्च", quantity: "1.5 tsp", quantityHindi: "डेढ़ छोटा चम्मच" },
      { item: "Fennel powder", itemHindi: "सौंफ पाउडर", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Ginger powder", itemHindi: "सोंठ पाउडर", quantity: "1/2 tsp", quantityHindi: "आधा छोटा चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Wash soaked rajma and pressure cook with three cups water until completely soft but not broken.",
        instructionHindi: "भीगे राजमा को धोकर तीन कप पानी के साथ कुकर में पूरी तरह नरम होने तक पकाएं, टूटने न दें।",
        duration: "20 minutes"
      },
      {
        step: 2,
        instruction: "Peel turnips, cut into medium cubes, and rinse to remove bitterness.",
        instructionHindi: "शलजम छीलकर मध्यम टुकड़ों में काटें और कड़वाहट हटाने के लिए धो लें।",
        duration: "5 minutes"
      },
      {
        step: 3,
        instruction: "Heat mustard oil to smoking point, then lower flame and add cumin seeds.",
        instructionHindi: "सरसों तेल धुआं आने तक गरम करें, फिर जीरा डालें।",
        duration: "3 minutes"
      },
      {
        step: 4,
        instruction: "Add turnip cubes and sauté for five minutes until edges lightly brown.",
        instructionHindi: "शलजम डालकर पांच मिनट हल्का भूरा होने तक भूनें।",
        duration: "5 minutes"
      },
      {
        step: 5,
        instruction: "Add chili powder, fennel powder, and ginger powder with two tablespoons water and stir to prevent burning.",
        instructionHindi: "मसाले और दो चम्मच पानी डालकर चलाएं ताकि मसाला जले नहीं।",
        duration: "3 minutes"
      },
      {
        step: 6,
        instruction: "Add cooked rajma with its cooking liquid and salt and mix thoroughly.",
        instructionHindi: "उबला राजमा उसके पानी सहित और नमक डालकर मिलाएं।",
        duration: "2 minutes"
      },
      {
        step: 7,
        instruction: "Simmer uncovered on low heat until turnips are soft and gravy thickens.",
        instructionHindi: "धीमी आंच पर बिना ढके पकाएं जब तक शलजम नरम और ग्रेवी गाढ़ी हो जाए।",
        duration: "12 minutes"
      }
    ],
    tags: ["kashmiri", "rajma", "turnip", "traditional"]
  },

  {
    id: 61,
    name: "Punjabi Sarson Ka Saag",
    nameHindi: "पंजाबी सरसों का साग",
    cuisine: "Punjabi",
    category: "Main Course",
    time: "70 minutes",
    prepTime: "25 minutes",
    cookTime: "45 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    image: "/punjabi-sarson-ka-saag.webp",
    description: "Slow cooked mustard greens blended and tempered with spices and ghee.",
    descriptionHindi: "धीमी आंच पर पका सरसों का साग जिसे पीसकर घी के तड़के से तैयार किया जाता है।",
    ingredients: [
      { item: "Mustard greens", itemHindi: "सरसों के पत्ते", quantity: "4 cups", quantityHindi: "4 कप" },
      { item: "Spinach", itemHindi: "पालक", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Bathua leaves", itemHindi: "बथुआ", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Maize flour", itemHindi: "मक्के का आटा", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Ginger garlic", itemHindi: "अदरक लहसुन", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Ghee", itemHindi: "घी", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Wash all greens thoroughly three times to remove mud and grit.",
        instructionHindi: "सभी पत्तेदार सब्ज़ियों को तीन बार अच्छी तरह धोएं।",
        duration: "8 minutes"
      },
      {
        step: 2,
        instruction: "Chop leaves roughly and add to a pressure cooker with half cup water and salt.",
        instructionHindi: "पत्तों को मोटा काटकर कुकर में नमक और आधा कप पानी के साथ डालें।",
        duration: "5 minutes"
      },
      {
        step: 3,
        instruction: "Pressure cook for three whistles until leaves are fully soft.",
        instructionHindi: "तीन सीटी तक पकाएं जब तक पत्ते नरम हो जाएं।",
        duration: "12 minutes"
      },
      {
        step: 4,
        instruction: "Cool slightly and blend coarsely — do not make a smooth puree.",
        instructionHindi: "थोड़ा ठंडा कर दरदरा पीसें, बिल्कुल चिकना पेस्ट न बनाएं।",
        duration: "4 minutes"
      },
      {
        step: 5,
        instruction: "Transfer to pan and add maize flour mixed with water to avoid lumps.",
        instructionHindi: "पैन में डालकर पानी में घोला मक्के का आटा मिलाएं।",
        duration: "3 minutes"
      },
      {
        step: 6,
        instruction: "Cook on low flame for fifteen minutes, stirring every two minutes.",
        instructionHindi: "धीमी आंच पर पंद्रह मिनट पकाएं और बीच-बीच में चलाते रहें।",
        duration: "15 minutes"
      },
      {
        step: 7,
        instruction: "Heat ghee separately, sauté ginger garlic, and pour tempering over saag.",
        instructionHindi: "अलग से घी गरम कर अदरक लहसुन भूनें और साग पर डालें।",
        duration: "5 minutes"
      }
    ],
    tags: ["punjabi", "saag", "greens"]
  },

  {
    id: 62,
    name: "Punjabi Makki Ki Roti",
    nameHindi: "पंजाबी मक्की की रोटी",
    cuisine: "Punjabi",
    category: "Bread",
    time: "30 minutes",
    prepTime: "15 minutes",
    cookTime: "15 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.6,
    image: "/punjabi-makki-roti.webp",
    description: "Traditional flatbread made from maize flour cooked slowly on griddle.",
    descriptionHindi: "मक्के के आटे से बनी पारंपरिक रोटी जो तवे पर धीरे पकाई जाती है।",
    ingredients: [
      { item: "Maize flour", itemHindi: "मक्के का आटा", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Warm water", itemHindi: "गुनगुना पानी", quantity: "as needed", quantityHindi: "आवश्यकतानुसार" },
      { item: "Salt", itemHindi: "नमक", quantity: "1/2 tsp", quantityHindi: "आधा छोटा चम्मच" },
      { item: "Ghee", itemHindi: "घी", quantity: "for roasting", quantityHindi: "सेकने के लिए" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Mix maize flour and salt in a bowl and add warm water gradually.",
        instructionHindi: "मक्के का आटा और नमक मिलाकर गुनगुना पानी धीरे-धीरे डालें।",
        duration: "5 minutes"
      },
      {
        step: 2,
        instruction: "Knead gently into soft dough by pressing, not stretching.",
        instructionHindi: "दबाते हुए नरम आटा गूंधें, खींचें नहीं।",
        duration: "5 minutes"
      },
      {
        step: 3,
        instruction: "Take a portion and flatten between palms using water to prevent cracks.",
        instructionHindi: "एक हिस्सा लेकर हथेलियों के बीच पानी लगाकर थपथपाएं।",
        duration: "4 minutes"
      },
      {
        step: 4,
        instruction: "Place carefully on hot tawa and cook until edges firm up.",
        instructionHindi: "गरम तवे पर रखकर किनारे सख्त होने तक पकाएं।",
        duration: "3 minutes"
      },
      {
        step: 5,
        instruction: "Flip gently and cook other side, pressing lightly with cloth.",
        instructionHindi: "पलटकर कपड़े से हल्का दबाते हुए पकाएं।",
        duration: "3 minutes"
      },
      {
        step: 6,
        instruction: "Apply ghee and roast both sides until brown spots appear.",
        instructionHindi: "घी लगाकर दोनों तरफ भूरा होने तक सेकें।",
        duration: "3 minutes"
      }
    ],
    tags: ["punjabi", "bread", "maize"]
  },

  {
    id: 63,
    name: "Himachali Madra",
    nameHindi: "हिमाचली मद्रा",
    cuisine: "Himachali",
    category: "Main Course",
    time: "50 minutes",
    prepTime: "15 minutes",
    cookTime: "35 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.5,
    image: "/himachali-madra.webp",
    description: "Yogurt based chickpea curry cooked with whole spices from Himachal.",
    descriptionHindi: "दही आधारित काबुली चना करी, साबुत मसालों के साथ।",
    ingredients: [
      { item: "Chickpeas soaked", itemHindi: "भीगे काबुली चने", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Yogurt", itemHindi: "दही", quantity: "1.5 cups", quantityHindi: "डेढ़ कप" },
      { item: "Ghee", itemHindi: "घी", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Cloves", itemHindi: "लौंग", quantity: "4", quantityHindi: "4" },
      { item: "Cardamom", itemHindi: "इलायची", quantity: "3", quantityHindi: "3" },
      { item: "Coriander powder", itemHindi: "धनिया पाउडर", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Pressure cook chickpeas with salt until fully tender.",
        instructionHindi: "काबुली चने नमक के साथ नरम होने तक कुकर में पकाएं।",
        duration: "18 minutes"
      },
      {
        step: 2,
        instruction: "Whisk yogurt until smooth with no lumps.",
        instructionHindi: "दही को बिना गुठली के फेंटें।",
        duration: "3 minutes"
      },
      {
        step: 3,
        instruction: "Heat ghee and add cloves and cardamom.",
        instructionHindi: "घी गरम कर लौंग और इलायची डालें।",
        duration: "2 minutes"
      },
      {
        step: 4,
        instruction: "Add yogurt slowly while stirring continuously on low heat.",
        instructionHindi: "धीमी आंच पर लगातार चलाते हुए दही डालें।",
        duration: "5 minutes"
      },
      {
        step: 5,
        instruction: "Cook yogurt until it thickens and releases fat.",
        instructionHindi: "दही गाढ़ा होकर घी छोड़ने तक पकाएं।",
        duration: "7 minutes"
      },
      {
        step: 6,
        instruction: "Add chickpeas and coriander powder and simmer covered.",
        instructionHindi: "चना और धनिया पाउडर डालकर ढककर पकाएं।",
        duration: "10 minutes"
      }
    ],
    tags: ["himachali", "chickpea", "yogurt"]
  },
  {
    id: 64,
    name: "Bihari Litti",
    nameHindi: "बिहारी लिट्टी",
    cuisine: "Bihari",
    category: "Main Course",
    time: "60 minutes",
    prepTime: "30 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    image: "/bihari-litti.jpg",
    description: "Baked wheat balls stuffed with spiced sattu filling.",
    descriptionHindi: "मसालेदार सत्तू भरावन से भरी गेहूं की बेक्ड लिट्टी।",
    ingredients: [
      { item: "Wheat flour", itemHindi: "गेहूं आटा", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Sattu", itemHindi: "सत्तू", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Mustard oil", itemHindi: "सरसों तेल", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Ajwain", itemHindi: "अजवाइन", quantity: "1/2 tsp", quantityHindi: "आधा छोटा चम्मच" },
      { item: "Lemon juice", itemHindi: "नींबू रस", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Prepare stiff dough with wheat flour, salt, and water and rest it covered.",
        instructionHindi: "आटे का सख्त लोई बनाकर ढककर रखें।",
        duration: "15 minutes"
      },
      {
        step: 2,
        instruction: "Mix sattu with mustard oil, ajwain, salt, lemon juice, and few spoons water to make moist filling.",
        instructionHindi: "सत्तू में तेल, अजवाइन, नमक, नींबू और थोड़ा पानी मिलाएं।",
        duration: "8 minutes"
      },
      {
        step: 3,
        instruction: "Divide dough balls, flatten, and place filling inside.",
        instructionHindi: "लोई फैलाकर भरावन भरें।",
        duration: "5 minutes"
      },
      {
        step: 4,
        instruction: "Seal edges fully so stuffing does not leak.",
        instructionHindi: "किनारे अच्छी तरह बंद करें।",
        duration: "4 minutes"
      },
      {
        step: 5,
        instruction: "Bake or roast on medium heat turning frequently until evenly browned.",
        instructionHindi: "मध्यम आंच पर घुमाते हुए चारों तरफ से सेकें।",
        duration: "20 minutes"
      },
      {
        step: 6,
        instruction: "Dip hot litti in ghee before serving.",
        instructionHindi: "गरम लिट्टी घी में डुबोकर परोसें।",
        duration: "3 minutes"
      }
    ],
    tags: ["bihari", "litti", "sattu"]
  },

  {
    id: 65,
    name: "Bihari Chokha",
    nameHindi: "बिहारी चोखा",
    cuisine: "Bihari",
    category: "Side Dish",
    time: "25 minutes",
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    image: "/bihari-chokha.jpg",
    description: "Roasted mashed vegetables mixed with mustard oil and spices.",
    descriptionHindi: "भुनी सब्ज़ियों का मसालेदार मैश।",
    ingredients: [
      { item: "Eggplant", itemHindi: "बैंगन", quantity: "1 large", quantityHindi: "1 बड़ा" },
      { item: "Potatoes", itemHindi: "आलू", quantity: "2", quantityHindi: "2" },
      { item: "Tomato", itemHindi: "टमाटर", quantity: "2", quantityHindi: "2" },
      { item: "Mustard oil", itemHindi: "सरसों तेल", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Onion chopped", itemHindi: "कटा प्याज", quantity: "1", quantityHindi: "1" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Roast eggplant and tomatoes directly on flame until charred and soft.",
        instructionHindi: "बैंगन और टमाटर को सीधी आंच पर भूनें।",
        duration: "10 minutes"
      },
      {
        step: 2,
        instruction: "Boil potatoes until tender and peel.",
        instructionHindi: "आलू उबालकर छीलें।",
        duration: "10 minutes"
      },
      {
        step: 3,
        instruction: "Remove charred skin from eggplant and tomatoes.",
        instructionHindi: "जली त्वचा हटाएं।",
        duration: "3 minutes"
      },
      {
        step: 4,
        instruction: "Mash all vegetables together in bowl.",
        instructionHindi: "सबको मैश करें।",
        duration: "3 minutes"
      },
      {
        step: 5,
        instruction: "Add onion, mustard oil, and salt and mix thoroughly.",
        instructionHindi: "प्याज, तेल और नमक मिलाएं।",
        duration: "3 minutes"
      }
    ],
    tags: ["bihari", "chokha", "roasted"]
  },

  {
    id: 66,
    name: "Chhattisgarhi Faraa",
    nameHindi: "छत्तीसगढ़ी फरा",
    cuisine: "Chhattisgarhi",
    category: "Snack",
    time: "45 minutes",
    prepTime: "20 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.3,
    image: "/Chhattisgarhi-faraa.webp",
    description: "Steamed rice dumplings stuffed with spiced lentil mixture.",
    descriptionHindi: "दाल भरावन वाले स्टीम्ड चावल पकौड़े।",
    ingredients: [
      { item: "Rice flour", itemHindi: "चावल आटा", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Chana dal paste", itemHindi: "चना दाल पेस्ट", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Cumin", itemHindi: "जीरा", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Oil", itemHindi: "तेल", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Pour boiling water into rice flour with salt and mix with spoon first.",
        instructionHindi: "चावल आटे में उबलता पानी डालकर चम्मच से मिलाएं।",
        duration: "5 minutes"
      },
      {
        step: 2,
        instruction: "Knead into smooth dough once cool enough to handle.",
        instructionHindi: "ठंडा होने पर आटा गूंधें।",
        duration: "6 minutes"
      },
      {
        step: 3,
        instruction: "Mix dal paste with cumin and salt for stuffing.",
        instructionHindi: "दाल पेस्ट में मसाले मिलाएं।",
        duration: "4 minutes"
      },
      {
        step: 4,
        instruction: "Shape dough into small cups and fill stuffing inside.",
        instructionHindi: "आटे की कटोरी बनाकर भरावन भरें।",
        duration: "8 minutes"
      },
      {
        step: 5,
        instruction: "Seal and steam in greased steamer until firm.",
        instructionHindi: "बंद कर स्टीमर में पकाएं।",
        duration: "15 minutes"
      }
    ],
    tags: ["chhattisgarh", "steamed", "dumpling"]
  },
  {
    id: 67,
    name: "Kolhapuri Chicken",
    nameHindi: "कोल्हापुरी चिकन",
    cuisine: "Maharashtrian",
    category: "Main Course",
    time: "55 minutes",
    prepTime: "20 minutes",
    cookTime: "35 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    image: "/kolhapuri-chicken.jpg",
    description: "Fiery chicken curry with roasted coconut spices.",
    descriptionHindi: "भुने नारियल मसाले वाली तीखी चिकन करी।",
    ingredients: [
      { item: "Chicken", itemHindi: "चिकन", quantity: "700 g", quantityHindi: "700 ग्राम" },
      { item: "Dry coconut", itemHindi: "सूखा नारियल", quantity: "1/2 cup", quantityHindi: "आधा कप" },
      { item: "Red chilies", itemHindi: "लाल मिर्च", quantity: "6", quantityHindi: "6" },
      { item: "Onion", itemHindi: "प्याज", quantity: "2", quantityHindi: "2" },
      { item: "Oil", itemHindi: "तेल", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Roast coconut and chilies and grind to paste.",
        instructionHindi: "नारियल मिर्च भूनकर पीसें।",
        duration: "8 minutes"
      },
      {
        step: 2,
        instruction: "Brown onions deeply.",
        instructionHindi: "प्याज भूरा करें।",
        duration: "10 minutes"
      },
      {
        step: 3,
        instruction: "Add chicken and sear until sealed.",
        instructionHindi: "चिकन भूनें।",
        duration: "8 minutes"
      },
      {
        step: 4,
        instruction: "Add spice paste and water.",
        instructionHindi: "पेस्ट मिलाएं।",
        duration: "4 minutes"
      },
      {
        step: 5,
        instruction: "Cook covered until tender.",
        instructionHindi: "ढककर पकाएं।",
        duration: "15 minutes"
      }
    ],
    tags: ["kolhapuri", "spicy"]
  },
  {
    id: 68,
    name: "Lucknowi Sheermal",
    nameHindi: "लखनऊई शीरमल",
    cuisine: "Awadhi",
    category: "Bread",
    time: "90 minutes",
    prepTime: "60 minutes",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "Hard",
    rating: 4.5,
    image: "/lucknowi-sheermal.jpg",
    description: "Saffron flavored sweet flatbread.",
    descriptionHindi: "केसर सुगंधित मीठी रोटी।",
    ingredients: [
      { item: "Flour", itemHindi: "मैदा", quantity: "3 cups", quantityHindi: "3 कप" },
      { item: "Milk", itemHindi: "दूध", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Sugar", itemHindi: "चीनी", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" },
      { item: "Saffron milk", itemHindi: "केसर दूध", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Ghee", itemHindi: "घी", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Mix flour, sugar, ghee, and milk into soft dough.",
        instructionHindi: "आटा गूंधें।",
        duration: "10 minutes"
      },
      {
        step: 2,
        instruction: "Rest dough covered for one hour.",
        instructionHindi: "एक घंटा रखें।",
        duration: "60 minutes"
      },
      {
        step: 3,
        instruction: "Divide and roll thick discs.",
        instructionHindi: "मोटी रोटी बेलें।",
        duration: "8 minutes"
      },
      {
        step: 4,
        instruction: "Brush saffron milk on top.",
        instructionHindi: "केसर दूध लगाएं।",
        duration: "2 minutes"
      },
      {
        step: 5,
        instruction: "Bake or cook covered on tawa until done.",
        instructionHindi: "पकाएं।",
        duration: "10 minutes"
      }
    ],
    tags: ["awadhi", "bread", "sweet"]
  },
  {
    id: 69,
    name: "Bengali Mishti Doi",
    nameHindi: "बंगाली मिष्टी doi",
    cuisine: "Bengali",
    category: "Dessert",
    time: "8 hours",
    prepTime: "20 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.9,
    image: "/bengali-mishti-doi.webp",
    description: "Caramelized sweet set yogurt.",
    descriptionHindi: "कैरेमलाइज मीठा जमा दही।",
    ingredients: [
      { item: "Milk", itemHindi: "दूध", quantity: "1 liter", quantityHindi: "1 लीटर" },
      { item: "Sugar", itemHindi: "चीनी", quantity: "1/2 cup", quantityHindi: "आधा कप" },
      { item: "Curd starter", itemHindi: "दही जमावन", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Boil milk and reduce slightly.",
        instructionHindi: "दूध उबालें।",
        duration: "10 minutes"
      },
      {
        step: 2,
        instruction: "Caramelize sugar separately.",
        instructionHindi: "चीनी कैरेमल करें।",
        duration: "6 minutes"
      },
      {
        step: 3,
        instruction: "Mix caramel into warm milk.",
        instructionHindi: "दूध में मिलाएं।",
        duration: "2 minutes"
      },
      {
        step: 4,
        instruction: "Cool to lukewarm and add starter.",
        instructionHindi: "गुनगुना कर जमावन मिलाएं।",
        duration: "2 minutes"
      },
      {
        step: 5,
        instruction: "Set covered in warm place 6–8 hours.",
        instructionHindi: "जमने दें।",
        duration: "8 hours"
      }
    ],
    tags: ["bengali", "dessert"]
  },

  {
    id: 70,
    name: "South Indian Curd Rice",
    nameHindi: "साउथ इंडियन दही चावल",
    cuisine: "South Indian",
    category: "Main Course",
    time: "20 minutes",
    prepTime: "10 minutes",
    cookTime: "10 minutes",
    servings: 3,
    difficulty: "Easy",
    rating: 4.5,
    image: "/south-indian-curd-rice.webp",
    description: "Comforting tempered yogurt rice.",
    descriptionHindi: "तड़का लगा दही चावल।",
    ingredients: [
      { item: "Cooked rice", itemHindi: "पका चावल", quantity: "3 cups", quantityHindi: "3 कप" },
      { item: "Yogurt", itemHindi: "दही", quantity: "1.5 cups", quantityHindi: "डेढ़ कप" },
      { item: "Mustard seeds", itemHindi: "सरसों", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Curry leaves", itemHindi: "करी पत्ता", quantity: "8", quantityHindi: "8" },
      { item: "Oil", itemHindi: "तेल", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Mash rice lightly while still warm.",
        instructionHindi: "चावल हल्का मैश करें।",
        duration: "3 minutes"
      },
      {
        step: 2,
        instruction: "Mix yogurt and salt thoroughly.",
        instructionHindi: "दही मिलाएं।",
        duration: "3 minutes"
      },
      {
        step: 3,
        instruction: "Heat oil and crackle mustard and curry leaves.",
        instructionHindi: "तड़का लगाएं।",
        duration: "3 minutes"
      },
      {
        step: 4,
        instruction: "Pour tempering over rice and mix evenly.",
        instructionHindi: "तड़का मिलाएं।",
        duration: "2 minutes"
      }
    ],
    tags: ["south-indian", "rice", "comfort"]
  },
  {
    id: 71,
    name: "Punjabi Kadhi Pakora",
    nameHindi: "पंजाबी कढ़ी पकोड़ा",
    cuisine: "Punjabi",
    category: "Main Course",
    time: "60 minutes",
    prepTime: "20 minutes",
    cookTime: "40 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    image: "/punjabi-kadhi-pakora.webp",
    description: "Yogurt gram flour curry with fried pakoras.",
    descriptionHindi: "दही बेसन कढ़ी पकोड़ों के साथ।",
    ingredients: [
      { item: "Yogurt", itemHindi: "दही", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Gram flour", itemHindi: "बेसन", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Onion slices", itemHindi: "प्याज स्लाइस", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Turmeric", itemHindi: "हल्दी", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Oil", itemHindi: "तेल", quantity: "for frying", quantityHindi: "तलने के लिए" }
    ],
    steps: [
      { step: 1, instruction: "Whisk yogurt, gram flour, turmeric, and water lump-free.", instructionHindi: "दही बेसन फेंटें।", duration: "6 minutes" },
      { step: 2, instruction: "Mix onion with spiced batter and drop pakoras into hot oil.", instructionHindi: "पकोड़े तलें।", duration: "10 minutes" },
      { step: 3, instruction: "Boil kadhi mixture on low stirring often.", instructionHindi: "कढ़ी उबालें।", duration: "15 minutes" },
      { step: 4, instruction: "Add fried pakoras and simmer.", instructionHindi: "पकोड़े डालकर पकाएं।", duration: "10 minutes" }
    ],
    tags: ["punjabi", "kadhi"]
  },

  {
    id: 72,
    name: "Haryanvi Bajra Khichdi",
    nameHindi: "हरियाणवी बाजरा खिचड़ी",
    cuisine: "Haryanvi",
    category: "Main Course",
    time: "45 minutes",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "Easy",
    rating: 4.3,
    image: "/haryanvi-bajra-khichdi.webp",
    description: "Pearl millet and moong dal rustic khichdi.",
    descriptionHindi: "बाजरा मूंग दाल देसी खिचड़ी।",
    ingredients: [
      { item: "Bajra", itemHindi: "बाजरा", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Moong dal", itemHindi: "मूंग दाल", quantity: "1/2 cup", quantityHindi: "आधा कप" },
      { item: "Ghee", itemHindi: "घी", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Cumin", itemHindi: "जीरा", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],
    steps: [
      { step: 1, instruction: "Soak bajra overnight and coarsely crush.", instructionHindi: "बाजरा भिगोकर दरदरा कूटें।", duration: "8 hours" },
      { step: 2, instruction: "Wash dal and combine with bajra.", instructionHindi: "दाल मिलाएं।", duration: "3 minutes" },
      { step: 3, instruction: "Pressure cook with water and salt.", instructionHindi: "कुकर में पकाएं।", duration: "15 minutes" },
      { step: 4, instruction: "Temper with ghee and cumin and mix.", instructionHindi: "घी जीरा तड़का दें।", duration: "4 minutes" }
    ],
    tags: ["haryana", "millet"]
  },
  {
    id: 73,
    name: "Mumbai Misal Pav",
    nameHindi: "मुंबई मिसल पाव",
    cuisine: "Maharashtrian",
    category: "Main Course",
    time: "50 minutes",
    prepTime: "20 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    image: "/mumbai-misal-pav.webp",
    description: "Spicy sprout curry topped with farsan and served with pav.",
    descriptionHindi: "तीखी स्प्राउट करी फरसान और पाव के साथ।",
    ingredients: [
      { item: "Sprouts", itemHindi: "अंकुरित दाने", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Misal masala", itemHindi: "मिसल मसाला", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Onion", itemHindi: "प्याज", quantity: "1", quantityHindi: "1" },
      { item: "Farsan", itemHindi: "फरसान", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Pav", itemHindi: "पाव", quantity: "8", quantityHindi: "8" }
    ],
    steps: [
      { step: 1, instruction: "Pressure cook sprouts with salt until tender.", instructionHindi: "स्प्राउट पकाएं।", duration: "12 minutes" },
      { step: 2, instruction: "Cook onions until brown.", instructionHindi: "प्याज भूनें।", duration: "8 minutes" },
      { step: 3, instruction: "Add misal masala and sauté with splash water.", instructionHindi: "मसाला भूनें।", duration: "4 minutes" },
      { step: 4, instruction: "Add sprouts and simmer to spicy gravy.", instructionHindi: "स्प्राउट डालकर पकाएं।", duration: "10 minutes" },
      { step: 5, instruction: "Serve topped with farsan and toasted pav.", instructionHindi: "फरसान और पाव संग परोसें।", duration: "6 minutes" }
    ],
    tags: ["mumbai", "street-food"]
  },
  {
    id: 74,
    name: "Veg Burger",
    nameHindi: "वेज बर्गर",
    cuisine: "Fast Food",
    category: "Snacks",
    time: "30 mins",
    prepTime: "20 mins",
    cookTime: "10 mins",
    servings: 2,
    difficulty: "Easy",
    rating: 4.5,
    image: "/veg-burger.jpg",
    description: "Crispy vegetable patty burger layered with fresh veggies and sauces.",
    descriptionHindi: "कुरकुरी वेज पैटी वाला बर्गर ताजी सब्जियों और सॉस के साथ।",
    ingredients: [
      { item: "Burger buns", itemHindi: "बर्गर बन", quantity: "2", quantityHindi: "2" },
      { item: "Potato boiled", itemHindi: "उबला आलू", quantity: "2", quantityHindi: "2" },
      { item: "Bread crumbs", itemHindi: "ब्रेड क्रम्ब्स", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Mixed veggies", itemHindi: "मिक्स सब्जियां", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Mayonnaise", itemHindi: "मेयोनीज़", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Tomato ketchup", itemHindi: "टमाटर सॉस", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Oil", itemHindi: "तेल", quantity: "for frying", quantityHindi: "तलने के लिए" }
    ],
    steps: [
      {
        step: 1,
        instruction: "Mash potatoes and mix with vegetables, salt, spices and bread crumbs.",
        instructionHindi: "आलू मैश करें और सब्जियों, नमक, मसाले और ब्रेड क्रम्ब्स मिलाएं।",
        duration: "5 mins"
      },
      {
        step: 2,
        instruction: "Shape into patties and shallow fry until golden.",
        instructionHindi: "पैटी बनाकर सुनहरा होने तक तलें।",
        duration: "6 mins",
        tips: "Keep flame medium for crisp texture.",
        tipsHindi: "करारी बनावट के लिए मध्यम आंच रखें।"
      },
      {
        step: 3,
        instruction: "Toast buns with butter.",
        instructionHindi: "बन को मक्खन लगाकर सेकें।",
        duration: "2 mins"
      },
      {
        step: 4,
        instruction: "Spread sauces, place patty and veggies, assemble burger.",
        instructionHindi: "सॉस लगाएँ, पैटी और सब्जियाँ रखें, बर्गर तैयार करें।",
        duration: "3 mins"
      }
    ],
    tags: ["burger", "fastfood", "snack"]
  },
  {
    id: 75,
    name: "Veg Pizza",
    nameHindi: "वेज पिज़्ज़ा",
    cuisine: "Fast Food",
    category: "Snacks",
    time: "40 mins",
    prepTime: "25 mins",
    cookTime: "15 mins",
    servings: 2,
    difficulty: "Medium",
    rating: 4.7,
    image: "/veg-pizza.jpg",
    description: "Cheesy vegetable loaded pizza baked fresh.",
    descriptionHindi: "चीज़ और सब्जियों से भरा ताज़ा बेक किया पिज़्ज़ा।",
    ingredients: [
      { item: "Pizza base", itemHindi: "पिज़्ज़ा बेस", quantity: "1", quantityHindi: "1" },
      { item: "Pizza sauce", itemHindi: "पिज़्ज़ा सॉस", quantity: "4 tbsp", quantityHindi: "4 बड़े चम्मच" },
      { item: "Mozzarella cheese", itemHindi: "मोज़रेला चीज़", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Capsicum", itemHindi: "शिमला मिर्च", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Onion", itemHindi: "प्याज", quantity: "1/4 cup", quantityHindi: "1/4 कप" },
      { item: "Olives", itemHindi: "ऑलिव", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" }
    ],
    steps: [
      { step: 1, instruction: "Preheat oven to 200°C.", instructionHindi: "ओवन 200°C पर गरम करें।", duration: "5 mins" },
      { step: 2, instruction: "Spread sauce on base.", instructionHindi: "बेस पर सॉस फैलाएँ।", duration: "2 mins" },
      { step: 3, instruction: "Add veggies and cheese.", instructionHindi: "सब्जियाँ और चीज़ डालें।", duration: "3 mins" },
      { step: 4, instruction: "Bake 12–15 minutes.", instructionHindi: "12–15 मिनट बेक करें।", duration: "15 mins" }
    ],
    tags: ["pizza", "fastfood"]
  },
  {
    id: 76,
    name: "Veg Sandwich",
    nameHindi: "वेज सैंडविच",
    cuisine: "Fast Food",
    category: "Breakfast",
    time: "15 mins",
    prepTime: "10 mins",
    cookTime: "5 mins",
    servings: 2,
    difficulty: "Easy",
    rating: 4.4,
    image: "/veg-sandwich.jpg",
    description: "Quick vegetable sandwich toasted or fresh.",
    descriptionHindi: "जल्दी बनने वाला वेज सैंडविच।",
    ingredients: [
      { item: "Bread slices", itemHindi: "ब्रेड", quantity: "4", quantityHindi: "4" },
      { item: "Butter", itemHindi: "मक्खन", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Cucumber", itemHindi: "खीरा", quantity: "1", quantityHindi: "1" },
      { item: "Tomato", itemHindi: "टमाटर", quantity: "1", quantityHindi: "1" }
    ],
    steps: [
      { step: 1, instruction: "Butter bread.", instructionHindi: "ब्रेड पर मक्खन लगाएँ।", duration: "2 mins" },
      { step: 2, instruction: "Add sliced veggies.", instructionHindi: "सब्जियाँ रखें।", duration: "4 mins" },
      { step: 3, instruction: "Toast if desired.", instructionHindi: "चाहें तो सेकें।", duration: "5 mins" }
    ],
    tags: ["sandwich", "quick"]
  },
  {
    id: 77,
    name: "Frankie(Veg Roll)",
    nameHindi: "वेज रोल",
    cuisine: "Street Food",
    category: "Snacks",
    time: "25 mins",
    prepTime: "15 mins",
    cookTime: "10 mins",
    servings: 2,
    difficulty: "Easy",
    rating: 4.6,
    image: "/frankie.jpg",
    description: "Street style stuffed veg frankie roll.",
    descriptionHindi: "स्ट्रीट स्टाइल भरा हुआ वेज फ्रैंकी रोल।",
    ingredients: [
      { item: "Chapati", itemHindi: "रोटी", quantity: "2", quantityHindi: "2" },
      { item: "Mixed veg stuffing", itemHindi: "मिक्स वेज भरावन", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Sauce", itemHindi: "सॉस", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" }
    ],
    steps: [
      { step: 1, instruction: "Cook stuffing.", instructionHindi: "भरावन पकाएँ।", duration: "8 mins" },
      { step: 2, instruction: "Place on roti.", instructionHindi: "रोटी पर रखें।", duration: "2 mins" },
      { step: 3, instruction: "Roll tightly.", instructionHindi: "रोल करें।", duration: "2 mins" }
    ],
    tags: ["roll", "frankie"]
  },
  {
    id: 78,
    name: "Veg Manchurian",
    nameHindi: "वेज मंचूरियन",
    cuisine: "Indo-Chinese",
    category: "Snacks",
    time: "35 mins",
    prepTime: "20 mins",
    cookTime: "15 mins",
    servings: 3,
    difficulty: "Medium",
    rating: 4.7,
    image: "/veg-manchurian.jpg",
    description: "Crispy vegetable balls tossed in spicy Chinese style gravy.",
    descriptionHindi: "मसालेदार चाइनीज़ ग्रेवी में टॉस किए हुए कुरकुरे वेज बॉल्स।",
    ingredients: [
      { item: "Cabbage grated", itemHindi: "पत्ता गोभी", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Carrot grated", itemHindi: "गाजर", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Flour", itemHindi: "मैदा", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" },
      { item: "Cornflour", itemHindi: "कॉर्नफ्लोर", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Soy sauce", itemHindi: "सोया सॉस", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Chili sauce", itemHindi: "चिली सॉस", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" }
    ],
    steps: [
      { step: 1, instruction: "Mix vegetables, flour, cornflour, salt into dough.", instructionHindi: "सब्जियाँ, मैदा, कॉर्नफ्लोर मिलाएँ।", duration: "5 mins" },
      { step: 2, instruction: "Make balls and deep fry.", instructionHindi: "बॉल बनाकर तलें।", duration: "8 mins", tips: "Oil medium hot.", tipsHindi: "तेल मध्यम गरम रखें।" },
      { step: 3, instruction: "Prepare sauce with garlic, sauces, water.", instructionHindi: "सॉस ग्रेवी बनाएं।", duration: "5 mins" },
      { step: 4, instruction: "Add balls and toss.", instructionHindi: "बॉल्स डालकर मिलाएँ।", duration: "3 mins" }
    ],
    tags: ["manchurian", "indo-chinese"]
  },
  {
    id: 79,
    name: "Veg Fried Rice",
    nameHindi: "वेज फ्राइड राइस",
    cuisine: "Indo-Chinese",
    category: "Rice Dishes",
    time: "25 mins",
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: 3,
    difficulty: "Easy",
    rating: 4.6,
    image: "/veg-fried-rice.jpg",
    description: "Quick stir fried rice with vegetables and sauces.",
    descriptionHindi: "सब्जियों और सॉस के साथ झटपट फ्राइड राइस।",
    ingredients: [
      { item: "Cooked rice", itemHindi: "पका चावल", quantity: "3 cups", quantityHindi: "3 कप" },
      { item: "Mixed veggies", itemHindi: "मिक्स सब्जियाँ", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Soy sauce", itemHindi: "सोया सॉस", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" }
    ],
    steps: [
      { step: 1, instruction: "Heat oil and sauté veggies.", instructionHindi: "सब्जियाँ भूनें।", duration: "5 mins" },
      { step: 2, instruction: "Add rice and sauces.", instructionHindi: "चावल और सॉस डालें।", duration: "5 mins" },
      { step: 3, instruction: "Toss on high flame.", instructionHindi: "तेज़ आंच पर चलाएँ।", duration: "5 mins", tips: "Use cold rice.", tipsHindi: "ठंडा चावल लें।" }
    ],
    tags: ["fried-rice"]
  },
  {
    id: 80,
    name: "Triple Schezwan Rice",
    nameHindi: "ट्रिपल शेज़वान राइस",
    cuisine: "Indo-Chinese",
    category: "Rice Dishes",
    time: "40 mins",
    prepTime: "20 mins",
    cookTime: "20 mins",
    servings: 3,
    difficulty: "Medium",
    rating: 4.8,
    image: "/triple-schezwan-rice.jpg",
    description: "Combination of fried rice, noodles and spicy gravy.",
    descriptionHindi: "फ्राइड राइस, नूडल्स और मसालेदार ग्रेवी का कॉम्बो।",
    ingredients: [
      { item: "Fried rice", itemHindi: "फ्राइड राइस", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Noodles", itemHindi: "नूडल्स", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Schezwan sauce", itemHindi: "शेज़वान सॉस", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" }
    ],
    steps: [
      { step: 1, instruction: "Prepare fried rice.", instructionHindi: "फ्राइड राइस बनाएं।", duration: "10 mins" },
      { step: 2, instruction: "Cook noodles.", instructionHindi: "नूडल्स पकाएँ।", duration: "8 mins" },
      { step: 3, instruction: "Make schezwan gravy.", instructionHindi: "ग्रेवी बनाएं।", duration: "10 mins" },
      { step: 4, instruction: "Layer rice, noodles, gravy.", instructionHindi: "लेयर लगाएँ।", duration: "3 mins" }
    ],
    tags: ["triple-rice", "schezwan"]
  },
  {
    id: 81,
    name: "Maggi Masala Deluxe",
    nameHindi: "मसाला मैगी डीलक्स",
    cuisine: "Indian Fast Food",
    category: "Snacks",
    time: "12 mins",
    prepTime: "3 mins",
    cookTime: "9 mins",
    servings: 1,
    difficulty: "Easy",
    rating: 4.6,
    image: "/maggi-masala.jpg",
    description: "Upgraded masala Maggi cooked with vegetables, butter, and extra spices.",
    descriptionHindi: "सब्जियों, मक्खन और अतिरिक्त मसालों के साथ बनी स्पेशल मैगी।",

    ingredients: [
      { item: "Maggi noodles packet", itemHindi: "मैगी पैकेट", quantity: "1", quantityHindi: "1" },
      { item: "Water", itemHindi: "पानी", quantity: "1.5 cups", quantityHindi: "1.5 कप" },
      { item: "Butter", itemHindi: "मक्खन", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Onion chopped", itemHindi: "प्याज", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Capsicum chopped", itemHindi: "शिमला मिर्च", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Chili flakes", itemHindi: "चिली फ्लेक्स", quantity: "1/4 tsp", quantityHindi: "1/4 छोटा चम्मच" }
    ],

    steps: [
      {
        step: 1,
        instruction: "Heat butter in a pan on medium flame.",
        instructionHindi: "मध्यम आंच पर पैन में मक्खन गर्म करें।",
        duration: "1 min"
      },
      {
        step: 2,
        instruction: "Add onions and capsicum and sauté until slightly soft.",
        instructionHindi: "प्याज और शिमला मिर्च डालकर हल्का नरम होने तक भूनें।",
        duration: "3 mins",
        tips: "Do not overcook — keep crunch.",
        tipsHindi: "ज्यादा न पकाएं — हल्की क्रंच रखें।"
      },
      {
        step: 3,
        instruction: "Add water and bring to boil.",
        instructionHindi: "पानी डालकर उबाल आने दें।",
        duration: "2 mins"
      },
      {
        step: 4,
        instruction: "Add Maggi noodles and tastemaker.",
        instructionHindi: "मैगी और मसाला डालें।",
        duration: "3 mins"
      },
      {
        step: 5,
        instruction: "Cook until thick. Add chili flakes and serve hot.",
        instructionHindi: "गाढ़ा होने तक पकाएं। चिली फ्लेक्स डालकर परोसें।",
        duration: "2 mins"
      }
    ],

    tags: ["maggi", "instant", "snack", "fast"]
  },
  {
    id: 82,
    name: "Mixed Pakora",
    nameHindi: "मिक्स पकौड़ा",
    cuisine: "Indian",
    category: "Snacks",
    time: "25 mins",
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: 3,
    difficulty: "Easy",
    rating: 4.6,
    image: "/mixed-pakora.jpg",
    description: "Crispy deep-fried mixed vegetable fritters perfect for tea-time snacks.",
    descriptionHindi: "चाय के समय के लिए कुरकुरे मिक्स सब्ज़ी पकौड़े।",

    ingredients: [
      { item: "Gram flour", itemHindi: "बेसन", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Onion sliced", itemHindi: "प्याज", quantity: "1", quantityHindi: "1" },
      { item: "Potato sliced", itemHindi: "आलू", quantity: "1", quantityHindi: "1" },
      { item: "Spinach", itemHindi: "पालक", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Chili powder", itemHindi: "लाल मिर्च", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Ajwain", itemHindi: "अजवाइन", quantity: "1/2 tsp", quantityHindi: "आधा छोटा चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" },
      { item: "Oil for frying", itemHindi: "तलने का तेल", quantity: "as needed", quantityHindi: "आवश्यकतानुसार" }
    ],

    steps: [
      { step: 1, instruction: "Add gram flour, spices, and salt in a bowl.", instructionHindi: "बेसन और मसाले बर्तन में डालें।", duration: "2 mins" },
      { step: 2, instruction: "Add sliced vegetables and mix well.", instructionHindi: "कटी सब्ज़ियाँ डालकर मिलाएँ।", duration: "3 mins" },
      { step: 3, instruction: "Add little water to form thick batter.", instructionHindi: "थोड़ा पानी डालकर गाढ़ा घोल बनाएं।", duration: "3 mins" },
      { step: 4, instruction: "Heat oil in pan.", instructionHindi: "कड़ाही में तेल गरम करें।", duration: "3 mins" },
      { step: 5, instruction: "Drop spoonful batter and deep fry till golden.", instructionHindi: "चम्मच से घोल डालकर सुनहरा तलें।", duration: "7 mins" }
    ],

    tags: ["pakora", "snack", "fried", "tea-time"]
  },
  {
    id: 83,
    name: "Street Style Chaat",
    nameHindi: "स्ट्रीट स्टाइल चाट",
    cuisine: "Indian",
    category: "Street Food",
    time: "20 mins",
    prepTime: "15 mins",
    cookTime: "5 mins",
    servings: 2,
    difficulty: "Easy",
    rating: 4.7,
    image: "/street-style-chaat.jpg",
    description: "Tangy, spicy, sweet Indian street chaat with chutneys and crunch.",
    descriptionHindi: "खट्टी-मीठी मसालेदार स्ट्रीट चाट।",

    ingredients: [
      { item: "Boiled potato", itemHindi: "उबला आलू", quantity: "2", quantityHindi: "2" },
      { item: "Chickpeas", itemHindi: "चना", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Tamarind chutney", itemHindi: "इमली चटनी", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" },
      { item: "Mint chutney", itemHindi: "पुदीना चटनी", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Sev", itemHindi: "सेव", quantity: "1/2 cup", quantityHindi: "आधा कप" },
      { item: "Chaat masala", itemHindi: "चाट मसाला", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" }
    ],

    steps: [
      { step: 1, instruction: "Dice potatoes and place in bowl.", instructionHindi: "आलू काटकर बर्तन में रखें।", duration: "3 mins" },
      { step: 2, instruction: "Add chickpeas.", instructionHindi: "चना डालें।", duration: "1 min" },
      { step: 3, instruction: "Add chutneys and mix.", instructionHindi: "चटनियाँ डालकर मिलाएँ।", duration: "2 mins" },
      { step: 4, instruction: "Sprinkle chaat masala.", instructionHindi: "चाट मसाला छिड़कें।", duration: "1 min" },
      { step: 5, instruction: "Top with sev and serve.", instructionHindi: "सेव डालकर परोसें।", duration: "1 min" }
    ],

    tags: ["chaat", "street", "snack"]
  },
  {
    id: 84,
    name: "Pasta Red Sauce",
    nameHindi: "रेड सॉस पास्ता",
    cuisine: "Italian",
    category: "Meal",
    time: "30 mins",
    prepTime: "10 mins",
    cookTime: "20 mins",
    servings: 2,
    difficulty: "Easy",
    rating: 4.5,
    image: "/pasta-red-sauce.jpg",
    description: "Classic tomato based red sauce pasta with herbs and vegetables.",
    descriptionHindi: "टमाटर बेस्ड रेड सॉस और सब्जियों के साथ क्लासिक पास्ता।",

    ingredients: [
      { item: "Pasta", itemHindi: "पास्ता", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Tomato puree", itemHindi: "टमाटर प्यूरी", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Garlic", itemHindi: "लहसुन", quantity: "4 cloves", quantityHindi: "4 कली" },
      { item: "Onion", itemHindi: "प्याज", quantity: "1", quantityHindi: "1" },
      { item: "Capsicum", itemHindi: "शिमला मिर्च", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Olive oil", itemHindi: "ऑलिव ऑयल", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Chili flakes", itemHindi: "चिली फ्लेक्स", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Oregano", itemHindi: "ओरिगैनो", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Salt", itemHindi: "नमक", quantity: "to taste", quantityHindi: "स्वादानुसार" }
    ],

    steps: [
      { step: 1, instruction: "Boil pasta in salted water until al dente.", instructionHindi: "नमक वाले पानी में पास्ता उबालें जब तक थोड़ा सख्त रहे।", duration: "8 mins", tips: "Do not overcook.", tipsHindi: "ज्यादा न पकाएँ।" },
      { step: 2, instruction: "Heat oil in pan and sauté chopped garlic.", instructionHindi: "पैन में तेल गर्म कर लहसुन भूनें।", duration: "2 mins" },
      { step: 3, instruction: "Add onion and capsicum and cook till soft.", instructionHindi: "प्याज और शिमला मिर्च डालकर नरम होने तक पकाएँ।", duration: "4 mins" },
      { step: 4, instruction: "Add tomato puree and cook till thick.", instructionHindi: "टमाटर प्यूरी डालकर गाढ़ा होने तक पकाएँ।", duration: "5 mins" },
      { step: 5, instruction: "Add herbs, salt, chili flakes.", instructionHindi: "मसाले और हर्ब्स डालें।", duration: "2 mins" },
      { step: 6, instruction: "Mix boiled pasta into sauce.", instructionHindi: "उबला पास्ता मिलाएँ।", duration: "3 mins" },
      { step: 7, instruction: "Toss well and serve hot.", instructionHindi: "अच्छे से मिलाकर गरम परोसें।", duration: "2 mins" }
    ],

    tags: ["pasta", "italian", "fastfood", "dinner"]
  },
  {
    id: 85,
    name: "Hakka Noodles",
    nameHindi: "हक्का नूडल्स",
    cuisine: "Indo Chinese",
    category: "Meal",
    time: "25 mins",
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: 2,
    difficulty: "Easy",
    rating: 4.6,
    image: "/hakka-noodles.jpg",
    description: "Street style Indo-Chinese stir fried noodles.",
    descriptionHindi: "स्ट्रीट स्टाइल इंडो-चाइनीज स्टिर फ्राइड नूडल्स।",

    ingredients: [
      { item: "Noodles", itemHindi: "नूडल्स", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Cabbage", itemHindi: "पत्ता गोभी", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Carrot", itemHindi: "गाजर", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Capsicum", itemHindi: "शिमला मिर्च", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Soy sauce", itemHindi: "सोया सॉस", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Vinegar", itemHindi: "सिरका", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Garlic", itemHindi: "लहसुन", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" }
    ],

    steps: [
      { step: 1, instruction: "Boil noodles and rinse in cold water.", instructionHindi: "नूडल्स उबालकर ठंडे पानी से धो लें।", duration: "6 mins" },
      { step: 2, instruction: "Heat oil in wok on high heat.", instructionHindi: "कड़ाही तेज आंच पर गर्म करें।", duration: "1 min" },
      { step: 3, instruction: "Add garlic and sauté quickly.", instructionHindi: "लहसुन तेज़ी से भूनें।", duration: "1 min" },
      { step: 4, instruction: "Add all vegetables and stir fry.", instructionHindi: "सब्जियाँ डालकर तेज आंच पर चलाएँ।", duration: "4 mins", tips: "Keep crunch.", tipsHindi: "क्रंच रखें।" },
      { step: 5, instruction: "Add sauces and salt.", instructionHindi: "सॉस और नमक डालें।", duration: "2 mins" },
      { step: 6, instruction: "Add noodles and toss on high heat.", instructionHindi: "नूडल्स डालकर तेज आंच पर मिलाएँ।", duration: "3 mins" },
      { step: 7, instruction: "Serve immediately hot.", instructionHindi: "तुरंत गरम परोसें।", duration: "1 min" }
    ],

    tags: ["noodles", "street", "fastfood"]
  },
  {
    id: 86,
    name: "Pasta White Sauce",
    nameHindi: "व्हाइट सॉस पास्ता",
    cuisine: "Italian",
    category: "Meal",
    time: "30 mins",
    prepTime: "10 mins",
    cookTime: "20 mins",
    servings: 2,
    difficulty: "Medium",
    rating: 4.7,
    image: "/pasta-white-sauce.jpg",
    description: "Creamy white sauce pasta with butter, milk and herbs.",
    descriptionHindi: "मक्खन और दूध की क्रीमी व्हाइट सॉस पास्ता।",

    ingredients: [
      { item: "Pasta", itemHindi: "पास्ता", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Butter", itemHindi: "मक्खन", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Flour", itemHindi: "मैदा", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Milk", itemHindi: "दूध", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Pepper", itemHindi: "काली मिर्च", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Cheese", itemHindi: "चीज़", quantity: "1/2 cup", quantityHindi: "1/2 कप" }
    ],

    steps: [
      { step: 1, instruction: "Boil pasta and keep aside.", instructionHindi: "पास्ता उबालकर अलग रखें।", duration: "8 mins" },
      { step: 2, instruction: "Melt butter in pan.", instructionHindi: "पैन में मक्खन पिघलाएँ।", duration: "1 min" },
      { step: 3, instruction: "Add flour and cook lightly.", instructionHindi: "मैदा डालकर हल्का पकाएँ।", duration: "2 mins" },
      { step: 4, instruction: "Slowly add milk while stirring.", instructionHindi: "दूध धीरे डालते हुए चलाएँ।", duration: "5 mins", tips: "No lumps.", tipsHindi: "गाठें न बनें।" },
      { step: 5, instruction: "Cook till sauce thickens.", instructionHindi: "सॉस गाढ़ी होने तक पकाएँ।", duration: "4 mins" },
      { step: 6, instruction: "Add cheese and pepper.", instructionHindi: "चीज़ और काली मिर्च डालें।", duration: "2 mins" },
      { step: 7, instruction: "Mix pasta and serve.", instructionHindi: "पास्ता मिलाकर परोसें।", duration: "2 mins" }
    ],

    tags: ["pasta", "white-sauce", "creamy"]
  },
  {
    id: 87,
    name: "Dabeli",
    nameHindi: "दाबेली",
    cuisine: "Gujarati",
    category: "Street Food",
    time: "30 mins",
    prepTime: "15 mins",
    cookTime: "15 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    image: "/dabeli.jpg",
    description: "Sweet, spicy and tangy stuffed bun snack from Kutch with masala potato filling.",
    descriptionHindi: "कच्छ का मीठा, मसालेदार और खट्टा भरवां बन स्नैक।",

    ingredients: [
      { item: "Boiled potatoes", itemHindi: "उबले आलू", quantity: "3", quantityHindi: "3" },
      { item: "Dabeli masala", itemHindi: "दाबेली मसाला", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Pav buns", itemHindi: "पाव", quantity: "4", quantityHindi: "4" },
      { item: "Tamarind chutney", itemHindi: "इमली चटनी", quantity: "4 tbsp", quantityHindi: "4 बड़े चम्मच" },
      { item: "Garlic chutney", itemHindi: "लहसुन चटनी", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" },
      { item: "Roasted peanuts", itemHindi: "भुनी मूंगफली", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Pomegranate", itemHindi: "अनार", quantity: "1/4 cup", quantityHindi: "1/4 कप" },
      { item: "Butter", itemHindi: "मक्खन", quantity: "3 tbsp", quantityHindi: "3 बड़े चम्मच" }
    ],

    steps: [
      { step: 1, instruction: "Mash boiled potatoes smoothly without lumps.", instructionHindi: "उबले आलू बिना गाठ के मैश करें।", duration: "3 mins" },
      { step: 2, instruction: "Heat pan, add butter and dabeli masala.", instructionHindi: "पैन में मक्खन और दाबेली मसाला डालें।", duration: "2 mins" },
      { step: 3, instruction: "Add mashed potatoes and mix well.", instructionHindi: "मैश आलू डालकर अच्छी तरह मिलाएँ।", duration: "3 mins", tips: "Add little water if too dry.", tipsHindi: "जरूरत हो तो थोड़ा पानी डालें।" },
      { step: 4, instruction: "Slice pav and toast with butter.", instructionHindi: "पाव काटकर मक्खन में सेकें।", duration: "4 mins" },
      { step: 5, instruction: "Apply chutneys, stuff potato mix, add peanuts and pomegranate.", instructionHindi: "चटनी लगाएँ, आलू भरें, मूंगफली और अनार डालें।", duration: "5 mins" },
      { step: 6, instruction: "Press and serve hot.", instructionHindi: "दबाकर गरम परोसें।", duration: "2 mins" }
    ],

    tags: ["dabeli", "street", "snack", "gujarati"]
  },
  {
    id: 88,
    name: "Dahi Bhalla",
    nameHindi: "दही भल्ला",
    cuisine: "North Indian",
    category: "Snacks",
    time: "50 mins",
    prepTime: "30 mins",
    cookTime: "20 mins",
    servings: 5,
    difficulty: "Medium",
    rating: 4.8,
    image: "/dahi-bhalla.jpg",
    description: "Soft lentil dumplings soaked and served with yogurt and chutneys.",
    descriptionHindi: "दाल के नरम बड़े दही और चटनी के साथ।",

    ingredients: [
      { item: "Urad dal", itemHindi: "उड़द दाल", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Curd", itemHindi: "दही", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Oil", itemHindi: "तेल", quantity: "for frying", quantityHindi: "तलने के लिए" },
      { item: "Tamarind chutney", itemHindi: "इमली चटनी", quantity: "1/2 cup", quantityHindi: "1/2 कप" },
      { item: "Roasted cumin powder", itemHindi: "भुना जीरा", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Red chili powder", itemHindi: "लाल मिर्च", quantity: "1/2 tsp", quantityHindi: "1/2 छोटा चम्मच" }
    ],

    steps: [
      { step: 1, instruction: "Soak urad dal for 6 hours.", instructionHindi: "उड़द दाल 6 घंटे भिगोएँ।", duration: "6 hrs" },
      { step: 2, instruction: "Grind to thick fluffy batter.", instructionHindi: "गाढ़ा फूला हुआ घोल पीसें।", duration: "5 mins", tips: "Whip to add air.", tipsHindi: "फेंटें ताकि हवा भर जाए।" },
      { step: 3, instruction: "Deep fry small vadas till golden.", instructionHindi: "छोटे बड़े तलें।", duration: "10 mins" },
      { step: 4, instruction: "Soak fried vadas in warm water.", instructionHindi: "तले बड़े गर्म पानी में डालें।", duration: "5 mins" },
      { step: 5, instruction: "Squeeze water and place in curd.", instructionHindi: "पानी निचोड़कर दही में डालें।", duration: "3 mins" },
      { step: 6, instruction: "Add chutney and spices on top.", instructionHindi: "ऊपर चटनी और मसाले डालें।", duration: "2 mins" }
    ],

    tags: ["dahi", "vada", "chaat", "snack"]
  },
  {
    id: 89,
    name: "Gujarati Handvo",
    nameHindi: "गुजराती हांडवो",
    cuisine: "Gujarati",
    category: "Snack",
    time: "8 hours",
    prepTime: "7 hours",
    cookTime: "1 hour",
    servings: 5,
    difficulty: "Medium",
    rating: 4.6,
    image: "/gujrati-handvo.webp",
    description: "Fermented lentil rice savory cake with vegetables.",
    descriptionHindi: "दाल चावल का किण्वित नमकीन केक।",
    ingredients: [
      { item: "Rice", itemHindi: "चावल", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Mixed lentils", itemHindi: "मिक्स दाल", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Bottle gourd grated", itemHindi: "कद्दूकस लौकी", quantity: "1 cup", quantityHindi: "1 कप" },
      { item: "Sesame", itemHindi: "तिल", quantity: "1 tbsp", quantityHindi: "1 बड़ा चम्मच" },
      { item: "Oil", itemHindi: "तेल", quantity: "2 tbsp", quantityHindi: "2 बड़े चम्मच" }
    ],
    steps: [
      { step: 1, instruction: "Soak rice and lentils six hours.", instructionHindi: "भिगोएं।", duration: "6 hours" },
      { step: 2, instruction: "Grind into coarse batter and ferment.", instructionHindi: "पीसकर किण्वित करें।", duration: "8 hours" },
      { step: 3, instruction: "Mix grated gourd and salt.", instructionHindi: "लौकी मिलाएं।", duration: "4 minutes" },
      { step: 4, instruction: "Pour into oiled pan and sprinkle sesame.", instructionHindi: "पैन में डालें।", duration: "4 minutes" },
      { step: 5, instruction: "Bake until crisp outside and cooked inside.", instructionHindi: "बेक करें।", duration: "35 minutes" }
    ],
    tags: ["gujarati", "fermented"]
  },
  {
    id: 90,
    name: "UP Bedmi Poori",
    nameHindi: "यूपी बेडमी पूरी",
    cuisine: "Uttar Pradesh",
    category: "Bread",
    time: "45 minutes",
    prepTime: "25 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "Medium",
    rating: 4.6,
    image: "/up-bedmi-poori.webp",
    description: "Stuffed urad dal spiced pooris.",
    descriptionHindi: "उड़द दाल भरी मसालेदार पूरी।",
    ingredients: [
      { item: "Wheat flour", itemHindi: "गेहूं आटा", quantity: "2 cups", quantityHindi: "2 कप" },
      { item: "Urad dal paste", itemHindi: "उड़द पेस्ट", quantity: "1/2 cup", quantityHindi: "आधा कप" },
      { item: "Fennel", itemHindi: "सौंफ", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Red chili powder", itemHindi: "लाल मिर्च", quantity: "1 tsp", quantityHindi: "1 छोटा चम्मच" },
      { item: "Oil", itemHindi: "तेल", quantity: "for frying", quantityHindi: "तलने के लिए" }
    ],
    steps: [
      { step: 1, instruction: "Prepare stiff dough with flour and water and rest.", instructionHindi: "आटा गूंधकर रखें।", duration: "10 minutes" },
      { step: 2, instruction: "Mix dal paste with spices.", instructionHindi: "दाल मसाला मिलाएं।", duration: "5 minutes" },
      { step: 3, instruction: "Stuff small dough balls and seal.", instructionHindi: "भरकर बंद करें।", duration: "8 minutes" },
      { step: 4, instruction: "Roll gently and deep fry until golden.", instructionHindi: "बेलकर तलें।", duration: "12 minutes" }
    ],
    tags: ["up", "poori", "stuffed"]
  },
]

// Recipe categories for filtering
export const cuisineCategories = [
  "All",
  "North Indian",
  "South Indian",
  "Punjabi",
  "Hyderabadi",
  "Maharashtrian",
  "Bengali",
  "Kashmiri",
] as const

export const dishCategories = ["All", "Curries", "Rice Dishes", "Breakfast", "Street Food", "Snacks", "Sweets", "Lunch"] as const

export const difficultyLevels = ["All", "Easy", "Medium", "Hard"] as const

// Search functions
export function searchRecipes(query: string): Recipe[] {
  const lowerQuery = query.toLowerCase()
  return recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(lowerQuery) ||
      recipe.nameHindi.includes(query) ||
      recipe.description.toLowerCase().includes(lowerQuery) ||
      recipe.tags.some((tag) => tag.includes(lowerQuery)) ||
      recipe.ingredients.some((ing) => ing.item.toLowerCase().includes(lowerQuery) || ing.itemHindi.includes(query)),
  )
}

export function searchByIngredients(ingredients: string[]): Recipe[] {
  const lowerIngredients = ingredients.map((i) => i.toLowerCase().trim())
  return recipes.filter((recipe) =>
    lowerIngredients.some((ing) =>
      recipe.ingredients.some(
        (recipeIng) => recipeIng.item.toLowerCase().includes(ing) || recipeIng.itemHindi.includes(ing),
      ),
    ),
  )
}

export function getRecipeById(id: number): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === id)
}

export function getRecipesByCategory(category: string): Recipe[] {
  if (category === "All") return recipes
  return recipes.filter((recipe) => recipe.category === category)
}

export function getRecipesByCuisine(cuisine: string): Recipe[] {
  if (cuisine === "All") return recipes
  return recipes.filter((recipe) => recipe.cuisine === cuisine)
}

export function getRecipesByDifficulty(difficulty: string): Recipe[] {
  if (difficulty === "All") return recipes
  return recipes.filter((recipe) => recipe.difficulty === difficulty)
}
