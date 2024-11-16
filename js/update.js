// Import necessary Firestore SDK components
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";

// Initialize Firestore and Auth
const db = getFirestore();
const auth = getAuth();

// const update = document.getElementById("update");
// update.addEventListener("click", function (event) {
async function updateProfile(
  userId,
  name,
  email,
  prevPassword,
  newPassword,
  nim,
  faculty
) {
  try {
    // Reference to the user document in Firestore
    const userDocRef = doc(db, "user", userId);

    // Update Firestore user profile data
    await updateDoc(userDocRef, {
      name: name,
      email: email,
      password: newpass,
      nim: nim,
      faculty: faculty,
    });

    // If profile picture is provided, update profile picture URL in Firestore (assuming URL is being saved)
    // if (profilePic) {
    //   const profilePicUrl = await uploadProfilePic(userId, profilePic);
    //   await updateDoc(userDocRef, {
    //     profilePicUrl: profilePicUrl,
    //   });
    // }

    // Update email if it has changed
    if (auth.currentUser && auth.currentUser.email !== email) {
      await updateEmail(auth.currentUser, email);
    }

    // Update password if provided
    if (newPassword != prevPassword) {
      await updatePassword(auth.currentUser, newPassword);
    }

    console.log("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile: ", error);
  }
}

// Function to upload the profile picture to storage
// async function uploadProfilePic(userId, file) {
//   // Implement the profile picture upload here (e.g., using Firebase Storage)
//   // For the purpose of this example, we assume the function returns the download URL of the uploaded image
//   const downloadUrl = "https://example.com/path/to/uploaded/image.jpg";
//   return downloadUrl;
// }

// Usage
const email = document.getElementById("email").value;
const prevpass = document.getElementById("prevpass").value;
const newpass = document.getElementById("newpass").value;
const name = document.getElementById("name").value;
const nim = document.getElementById("upNIM").value;
const faculty = document.getElementById("upFac").value;

// Call the function to update the profile

const update = document.getElementById("update");

update.addEventListener("click", async (e) => {
  e.preventDefault();
  await updateProfile(userId, name, email, prevpass, newpass, nim, faculty);
});
// });
