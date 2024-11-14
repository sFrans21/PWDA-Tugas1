const incrementLikes = (userId, moduleId) => {
  firestore
    .collection("users")
    .doc(userId)
    .collection("modules")
    .doc(moduleId)
    .update({
      likes: firebase.firestore.FieldValue.increment(1), // Menambah 1 like
    })
    .then(() => {
      console.log("Like berhasil ditambahkan!");
    })
    .catch((error) => {
      console.error("Error menambah like: ", error);
    });
};

const decrementLikes = (userId, moduleId) => {
  firestore
    .collection("users")
    .doc(userId)
    .collection("modules")
    .doc(moduleId)
    .update({
      likes: firebase.firestore.FieldValue.increment(-1), // Mengurangi 1 like
    })
    .then(() => {
      console.log("Like berhasil dikurangi!");
    })
    .catch((error) => {
      console.error("Error mengurangi like: ", error);
    });
};
