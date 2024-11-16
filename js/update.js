// Import necessary Firestore SDK components
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";

// Initialize Firestore and Auth
const db = getFirestore();
const auth = getAuth();

// Function to update user profile
async function updateProfile(userId, name, email, newPassword, profilePic) {
  try {
    // Reference to the user document in Firestore
    const userDocRef = doc(db, "user", userId);

    // Update Firestore user profile data
    await updateDoc(userDocRef, {
      name: name,
      email: email,
    });

    // If profile picture is provided, update profile picture URL in Firestore (assuming URL is being saved)
    if (profilePic) {
      const profilePicUrl = await uploadProfilePic(userId, profilePic);
      await updateDoc(userDocRef, {
        profilePicUrl: profilePicUrl,
      });
    }

    // Update email if it has changed
    if (auth.currentUser && auth.currentUser.email !== email) {
      await updateEmail(auth.currentUser, email);
    }

    // Update password if provided
    if (newPassword) {
      await updatePassword(auth.currentUser, newPassword);
    }

    console.log("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile: ", error);
  }
}

// Function to upload the profile picture to storage
async function uploadProfilePic(userId, file) {
  // Implement the profile picture upload here (e.g., using Firebase Storage)
  // For the purpose of this example, we assume the function returns the download URL of the uploaded image
  const downloadUrl = "https://example.com/path/to/uploaded/image.jpg";
  return downloadUrl;
}

// Usage
const userId = "your_user_id_here";
const name = "New Name";
const email = "new_email@example.com";
const newPassword = "new_password_here";
const profilePic = document.querySelector("input[type='file']").files[0];

// Call the function to update the profile
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  await updateProfile(userId, name, email, newPassword, profilePic);
});
