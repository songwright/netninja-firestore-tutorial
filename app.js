// Get the cafes collection and docs.
db.collection('cafes').get().then((snapshot) => {
    console.log(snapshot.docs);
});