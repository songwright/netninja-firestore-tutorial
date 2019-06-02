const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element and render cafe
function renderCafe(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let cross = document.createElement('div');

  li.setAttribute('data-id', doc.id); // Get id from Firebase.
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'x';

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);

  // Delete data.
  cross.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event from bubbling up.
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('cafes').doc(id).delete() // Use .doc() to get a single document.
  })
}

// Get the cafes collection and docs.
// where() queries a document.
db.collection('cafes').where('city', '==', 'Manchester').orderBy('name').get().then((snapshot) => {
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