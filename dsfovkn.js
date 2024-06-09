const ConvertToDirectDownloadLink = ({ googleDriveLink }) => {
    // Extract file ID from the input URL
    const fileIdIndex = googleDriveLink.indexOf("/d/") + 3; // Find the index of "/d/" and add 3 to get the starting index of the file ID
    const fileIdEndIndex = googleDriveLink.indexOf("/view"); // Find the end index of the file ID
    const file_id = googleDriveLink.substring(fileIdIndex, fileIdEndIndex);

    // Construct the direct download link
    const directDownloadLink = `https://drive.google.com/uc?export=download&id=${file_id}`;
    return directDownloadLink;
};

// Call the function and log the result
console.log(ConvertToDirectDownloadLink({ googleDriveLink: "https://drive.google.com/file/d/1mgyWMFg_ULMhHhOMScBDDjetEEwvvUz9/view?usp=drive_link" }));
