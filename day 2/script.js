// ================= DATA (use your Week 1 products array if you already have one) =================
const products = [
  { name: "Turmeric",     price: 120, stock: 25, category: "Spice" },
  { name: "Black Pepper", price: 450, stock: 10, category: "Spice" },
  { name: "Cardamom",     price: 900, stock: 0,  category: "Spice" },
  { name: "Tulsi",        price: 60,  stock: 40, category: "Herb"  },
  { name: "Mint",         price: 40,  stock: 0,  category: "Herb"  },
  { name: "Cinnamon",     price: 300, stock: 15, category: "Spice" }
];

const grid = document.getElementById("productGrid");
const messageEl = document.getElementById("message");

// ================= DAY 1 – DOM MANIPULATION =================
// Task 1: select heading by id, textContent, setAttribute, classList.toggle
let altHeading = false;
function updatePage() {
  const heading = document.getElementById("pageTitle");
  const img = document.getElementById("heroImg");
  altHeading = !altHeading;
  heading.textContent = altHeading ? "Fresh Herbs & Spices from Kerala" : "EL Herbs and Spices Shop";
  img.setAttribute("alt", altHeading ? "Spices" : "Herbs");
  img.setAttribute("title", "Hero image");
  heading.classList.toggle("highlight");
}
document.getElementById("changeBtn").addEventListener("click", updatePage);

// Task 2: renderProducts(list)
function renderProducts(list) {
  grid.textContent = "";                         // clear old cards
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    const name = document.createElement("h3");
    name.textContent = p.name;
    const price = document.createElement("p");
    price.textContent = "Price: ₹" + p.price;
    const stock = document.createElement("p");
    stock.textContent = "Stock: " + p.stock;
    const cat = document.createElement("p");
    cat.textContent = "Category: " + p.category;
    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";

    if (p.stock === 0) { card.classList.add("out-of-stock"); btn.disabled = true; }

    // ---- DAY 2 Task 1 & 2: events (handlers attached here because cards are created dynamically)
    btn.addEventListener("click", function (e) {
      console.log(e);
      // Event properties: e.type -> "click"; e.target -> the button clicked; e.clientX -> mouse X position
      showMessage(p.name + " added to cart!");
    });
    card.addEventListener("mouseenter", function (e) {
      console.log(e);
      // e.type -> "mouseenter"; e.target -> the card; e.relatedTarget -> element the mouse came from
      card.classList.add("zoom");
    });
    card.addEventListener("mouseleave", function (e) {
      console.log(e);
      // e.type -> "mouseleave"; e.target -> the card; e.relatedTarget -> element the mouse moved to
      card.classList.remove("zoom");
    });

    card.append(name, price, stock, cat, btn);
    grid.appendChild(card);
  });
}

function showMessage(text) {
  messageEl.textContent = text;
  setTimeout(() => (messageEl.textContent = ""), 2000);
}

// Task 3: corrected program
// BUGGY version:
//   document.querySelector("productGrid")            // missing #
//   document.getElementById(".card")                 // id searched using a class name
//   document.querySelectorAll(".card").style.color = "red";   // style on NodeList directly
function fixedSelectors() {
  const g = document.querySelector("#productGrid");           // # added for id selector
  const first = document.querySelector(".card");              // class searched with "." (or use getElementById("productGrid"))
  document.querySelectorAll(".card").forEach(c => {           // loop over NodeList, style each element
    c.style.borderLeft = "4px solid #2e5d34";
  });
  return { g, first };
}
// textContent vs innerHTML:
// textContent treats the value as plain text (tags are shown literally, safe).
// innerHTML parses the value as HTML (tags become real elements, risky with user input -> XSS).

// ================= DAY 2 – EVENT HANDLING (search box) =================
const searchBox = document.getElementById("searchBox");
searchBox.addEventListener("keydown", function (e) {
  console.log(e);
  // e.type -> "keydown"; e.target -> the search input; e.key -> "Enter" / "Escape" / pressed key
  if (e.key === "Enter") {
    showMessage("Searching for: " + searchBox.value);
  } else if (e.key === "Escape") {
    searchBox.value = "";
    applyFilters();
  }
});

// Task 3: form + preventDefault
document.getElementById("newsletterForm").addEventListener("submit", function (e) {
  e.preventDefault();                       // stops the page from reloading
  console.log(e);                           // e.type -> "submit"; e.target -> form; e.defaultPrevented -> true
  document.getElementById("newsMsg").textContent =
    "Thanks for subscribing, " + document.getElementById("newsEmail").value + "!";
});
// addEventListener is preferred over the onclick attribute because it lets us attach MULTIPLE
// handlers to one event, keeps JS separate from HTML, supports options (once, capture) and can be removed
// with removeEventListener. onclick allows only one handler (the last one overwrites the earlier).

// ================= DAY 4 – ARRAYS AND OBJECTS =================
const students = [
  { name: "Anu",    roll: 1, mark: 82 },
  { name: "Ben",    roll: 2, mark: 35 },
  { name: "Cathy",  roll: 3, mark: 91 },
  { name: "Dev",    roll: 4, mark: 48 },
  { name: "Eldho",  roll: 5, mark: 67 }
];
// Task 1
const names   = students.map(s => s.name);
const passed  = students.filter(s => s.mark >= 40);
const total   = students.reduce((sum, s) => sum + s.mark, 0);
const average = total / students.length;
console.log("Names:", names, "Passed:", passed, "Total:", total, "Average:", average);

// Task 2
const topper    = students.find(s => s.mark === Math.max(...students.map(x => x.mark)));
const anyFailed = students.some(s => s.mark < 40);
const allPassed = students.every(s => s.mark >= 40);
console.log("Topper:", topper, "Anyone failed?", anyFailed, "All passed?", allPassed);
console.log(Object.keys(students[0]));                     // ["name","roll","mark"]
Object.entries(students[0]).forEach(([k, v]) => console.log(k + ": " + v));

const productNames = products.map(p => p.name);
const inStock      = products.filter(p => p.stock > 0).map(p => p.name);
const stockValue   = products.reduce((sum, p) => sum + p.price * p.stock, 0);
console.log("Products:", productNames, "In stock:", inStock, "Total stock value: ₹" + stockValue);

// Task 3: live search + category filter working together
const categoryFilter = document.getElementById("categoryFilter");
[...new Set(products.map(p => p.category))].forEach(c => {
  const o = document.createElement("option");
  o.value = c; o.textContent = c;
  categoryFilter.appendChild(o);
});
function applyFilters() {
  const q = searchBox.value.trim().toLowerCase();
  const cat = categoryFilter.value;
  const result = products.filter(p =>
    p.name.toLowerCase().includes(q) && (cat === "all" || p.category === cat));
  renderProducts(result);
}
searchBox.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
renderProducts(products);

// ================= DAY 5 – FORM VALIDATION =================
const form = document.getElementById("enquiryForm");
const fields = ["name", "email", "password", "confirm", "phone"].map(id => document.getElementById(id));

function setError(input, msg) {
  document.getElementById(input.id + "Err").textContent = msg;   // textContent for safe output
  input.classList.toggle("invalid", msg !== "");
}

// Task 1: manual validation with regular expressions
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateManual() {
  let ok = true;
  const v = id => document.getElementById(id).value.trim();
  const check = (id, bad, msg) => {
    const el = document.getElementById(id);
    setError(el, bad ? msg : "");
    if (bad) ok = false;
  };
  check("name", v("name") === "", "Name is required");
  check("email", !emailRegex.test(v("email")), "Enter a valid email address");
  check("password", v("password").length < 8, "Password must be at least 8 characters");
  check("phone", !/^\d{10}$/.test(v("phone")), "Phone must be exactly 10 digits");
  return ok;
}

// Task 2: Constraint Validation API (validity object + setCustomValidity)
function constraintMessage(el) {
  if (el.id === "confirm") {
    el.setCustomValidity(el.value !== document.getElementById("password").value ? "Passwords do not match" : "");
  }
  const v = el.validity;
  if (v.valueMissing)    return "This field is required";
  if (v.typeMismatch)    return "Enter a valid email address";
  if (v.tooShort)        return "Minimum " + el.minLength + " characters required";
  if (v.patternMismatch) return "Phone must be exactly 10 digits";
  if (v.customError)     return el.validationMessage;
  return "";
}
fields.forEach(el => {
  el.addEventListener("input", () => setError(el, constraintMessage(el)));   // real-time feedback
});
document.getElementById("password").addEventListener("input", () => {
  const c = document.getElementById("confirm");
  if (c.value) setError(c, constraintMessage(c));
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const manualOk = validateManual();
  fields.forEach(el => { const m = constraintMessage(el); if (m) setError(el, m); });
  const status = document.getElementById("formStatus");
  status.textContent = (manualOk && form.checkValidity()) ? "Enquiry submitted successfully!" : "Please fix the errors above.";
});

// Task 3: innerHTML vs textContent
// Step A (innerHTML - UNSAFE): input "<script>alert(1)</script>" does not run via innerHTML but the tag is
// parsed as HTML and disappears from the page; "<img src=x onerror=alert(1)>" DOES run JavaScript.
// Step B (textContent - SAFE): the same input is shown as plain text, nothing executes.
const previewInput = document.getElementById("previewInput");
const preview = document.getElementById("preview");
previewInput.addEventListener("input", function () {
  // preview.innerHTML = previewInput.value;     // Step A: temporary, unsafe version
  preview.textContent = previewInput.value;      // Step B: final, safe version
});
// Safe rendering: never insert user-supplied text with innerHTML. textContent escapes it, so the browser
// treats it as data, not code, which prevents Cross-Site Scripting (XSS) attacks.
