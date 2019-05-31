const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element and render cafe
function renderCafe(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');

  li.setAttribute('data-id', doc.id); // Get id from Firebase.
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;

  li.appendChild(name);
  li.appendChild(city);

  cafeList.appendChild(li);
}

// Get the cafes collection and docs.
db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      renderCafe(doc);
    })
});

// Save data.
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent submission from refreshing the page.
  db.collection('cafes').add({ // Add name and city to cafes collection.
    name: form.name.value,
    city: form.city.value
  });
  form.name.value = ''; // Clear values from the input fields.
  form.city.value = '';
})