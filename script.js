// ---------- RECIPE DATA ----------
const baseIngredients = [
  {name:"fresh tuna or firm white fish", qty:1, unit:"kg"},
  {name:"water", qty:2, unit:"L"},
  {name:"large onion, thinly sliced", qty:1, unit:""},
  {name:"garlic cloves, minced", qty:2, unit:""},
  {name:"ginger, thinly sliced", qty:1, unit:"inch"},
  {name:"green chilies, slit", qty:2, unit:""},
  {name:"black peppercorns", qty:1, unit:"tsp"},
  {name:"cardamom pods (optional)", qty:2, unit:""},
  {name:"salt", qty:1, unit:"tsp (to taste)"},
  {name:"lime juice (optional)", qty:0.5, unit:"tbsp"},
  {name:"fresh curry leaves or cilantro (garnish)", qty:0, unit:""}
];

// ---------- HELPERS ----------
function renderIngredients(servings){
  const list = document.getElementById('ingredientList');
  list.innerHTML = '';
  const scale = servings / 4;          // base recipe assumes 4 servings
  baseIngredients.forEach(item => {
    const qty = (item.qty * scale).toFixed(2).replace(/\.?0+$/,'');
    const line = `${qty}${item.unit ? ' '+item.unit : ''} ${item.name}`;
    const li = document.createElement('li');
    li.textContent = line;
    list.appendChild(li);
  });
  document.getElementById('servingLabel').textContent = servings;
}

// ---------- INTERACTIONS ----------
document.querySelectorAll('.toggle').forEach(btn => {
  btn.addEventListener('click', e => {
    const paragraph = e.target.parentElement.nextElementSibling;
    paragraph.classList.toggle('hidden');
  });
});

document.getElementById('updateBtn').addEventListener('click', () => {
  const count = Math.max(1, parseInt(document.getElementById('servingCount').value) || 4);
  renderIngredients(count);
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const ingredients = Array.from(document.querySelectorAll('#ingredientList li'))
                           .map(li => li.textContent)
                           .join('\n');

  const steps = [
    "1. Prep the fish – Rinse the fish pieces under cold water and pat dry. Set aside.",
    "2. Boil the base – In a large pot, bring 2 L water to a gentle boil. Add sliced onion, garlic, ginger, green chilies, peppercorns, and cardamom (if using). Simmer 5 min.",
    "3. Add the fish – Gently lower the fish chunks into the simmering broth. Reduce heat to low; keep a gentle simmer.",
    "4. Season – Sprinkle salt to taste. Optional: a splash of lime juice for brightness.",
    "5. Cook briefly – Cook 8‑10 min until fish turns opaque and flakes easily. Do not over‑boil.",
    "6. Finish & Serve – Turn off heat. Ladle broth into bowls with a generous piece of fish. Garnish with fresh curry leaves or cilantro if desired. Serve with steamed rice, lime wedges, and optional fried onions."
  ].join('\n');

  const text = `
Garudhiya – Maldivian Clear Fish Broth

Servings: ${document.getElementById('servingLabel').textContent}
Ingredients:
${ingredients}

Directions:
${steps}

Enjoy!`.trim();

  navigator.clipboard.writeText(text).then(() => {
    const msg = document.getElementById('copyMsg');
    msg.textContent = 'Copied!';
    setTimeout(() => msg.textContent = '', 2000);
  });
});

// Initial render (default 4 servings)
renderIngredients(4);
