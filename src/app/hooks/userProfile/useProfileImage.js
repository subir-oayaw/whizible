export const uploadImage = async (imageData) => {
  try {
    const response = await fetch("https://whizible.com/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: imageData
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
