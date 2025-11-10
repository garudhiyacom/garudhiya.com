// Firebase Storage Helper Functions

// Upload image to Firebase Storage
async function uploadImageToFirebase(file, folder = 'images') {
    try {
        // Create unique filename
        const timestamp = Date.now();
        const filename = `${folder}/${timestamp}_${file.name}`;
        
        // Create storage reference
        const storageRef = storage.ref(filename);
        
        // Upload file
        const snapshot = await storageRef.put(file);
        
        // Get download URL
        const downloadURL = await snapshot.ref.getDownloadURL();
        
        console.log('✅ Image uploaded to Firebase Storage');
        return downloadURL;
    } catch (error) {
        console.error('❌ Error uploading image:', error);
        throw error;
    }
}

// Delete image from Firebase Storage
async function deleteImageFromFirebase(imageUrl) {
    try {
        // Extract path from URL
        const path = getPathFromUrl(imageUrl);
        if (!path) return;
        
        // Create storage reference
        const storageRef = storage.ref(path);
        
        // Delete file
        await storageRef.delete();
        
        console.log('✅ Image deleted from Firebase Storage');
    } catch (error) {
        console.error('❌ Error deleting image:', error);
        // Don't throw error if image doesn't exist
    }
}

// Helper function to extract path from Firebase Storage URL
function getPathFromUrl(url) {
    try {
        if (!url || !url.includes('firebase')) return null;
        
        const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/';
        if (!url.startsWith(baseUrl)) return null;
        
        const path = url.split('/o/')[1]?.split('?')[0];
        return path ? decodeURIComponent(path) : null;
    } catch (error) {
        console.error('Error parsing URL:', error);
        return null;
    }
}

// Upload image with progress tracking
async function uploadImageWithProgress(file, folder = 'images', onProgress) {
    try {
        const timestamp = Date.now();
        const filename = `${folder}/${timestamp}_${file.name}`;
        const storageRef = storage.ref(filename);
        
        // Create upload task
        const uploadTask = storageRef.put(file);
        
        // Track progress
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (onProgress) onProgress(progress);
            },
            (error) => {
                console.error('Upload error:', error);
                throw error;
            }
        );
        
        // Wait for upload to complete
        await uploadTask;
        
        // Get download URL
        const downloadURL = await storageRef.getDownloadURL();
        
        console.log('✅ Image uploaded with progress tracking');
        return downloadURL;
    } catch (error) {
        console.error('❌ Error uploading image:', error);
        throw error;
    }
}

// Validate image file
function validateImageFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload an image (JPEG, PNG, GIF, or WebP).');
    }
    
    if (file.size > maxSize) {
        throw new Error('File too large. Maximum size is 5MB.');
    }
    
    return true;
}
