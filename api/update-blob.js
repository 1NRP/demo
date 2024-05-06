import { withBlob } from "@vercel/blob";

export default withBlob(async function handler(req, res) {
  try {
    // Access the blob storage using Vercel Blob SDK
    await req.blobStorage.put("your_blob_name", req.body);

    // Return success response
    res.status(200).json({ message: "Blob updated successfully!" });
  } catch (error) {
    console.error("Error updating blob:", error);
    res.status(500).json({ message: "Error updating blob" });
  }
});
