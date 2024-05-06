import { withBlob } from "@vercel/blob";

export default withBlob(async function handler(req, res) {
  try {
    // Access the blob storage using Vercel Blob SDK
    const blob = await req.blobStorage.get("your_blob_name");

    // Convert the blob to text
    const text = await blob.text();

    // Return the text content as a response
    res.status(200).json(text);
  } catch (error) {
    console.error("Error fetching blob content:", error);
    res.status(500).json({ message: "Error fetching blob content" });
  }
});
