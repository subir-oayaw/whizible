export const uploadImage = async (imageData) => {
  try {
    const userdata = JSON.parse(sessionStorage.getItem("user"));
    const employeeId = userdata?.employeeId;
    const formData = new FormData();

    // Append the file to the FormData object
    formData.append("formFile", imageData, imageData.name); // Ensure `imageData` is a File object

    const accessToken = sessionStorage.getItem("access_token");
    const response = await fetch(
      `https://pms.whizible.com/INI_API_Main_Dev/api/FileUpDown/UserProfile?LogId=${employeeId}`,
      {
        method: "PUT",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${accessToken}`
        },
        body: formData
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        `Failed to upload image: ${errorResponse.errors?.formFile?.[0] || "Unknown error"}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
