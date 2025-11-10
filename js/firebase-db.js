// Firebase Database Helper Functions

// Blog Posts Functions
async function saveBlogPostToFirebase(post) {
    try {
        if (post.id) {
            // Update existing post
            await db.collection('blogPosts').doc(post.id.toString()).set(post);
        } else {
            // Create new post
            const docRef = await db.collection('blogPosts').add(post);
            post.id = docRef.id;
        }
        console.log('✅ Blog post saved to Firebase');
        return post;
    } catch (error) {
        console.error('❌ Error saving blog post:', error);
        throw error;
    }
}

async function getBlogPostsFromFirebase() {
    try {
        const snapshot = await db.collection('blogPosts').orderBy('date', 'desc').get();
        const posts = [];
        snapshot.forEach(doc => {
            posts.push({ id: doc.id, ...doc.data() });
        });
        return posts;
    } catch (error) {
        console.error('❌ Error getting blog posts:', error);
        return [];
    }
}

async function deleteBlogPostFromFirebase(id) {
    try {
        await db.collection('blogPosts').doc(id.toString()).delete();
        console.log('✅ Blog post deleted from Firebase');
    } catch (error) {
        console.error('❌ Error deleting blog post:', error);
        throw error;
    }
}

// Products Functions
async function saveProductToFirebase(product) {
    try {
        if (product.id) {
            // Update existing product
            await db.collection('products').doc(product.id.toString()).set(product);
        } else {
            // Create new product
            const docRef = await db.collection('products').add(product);
            product.id = docRef.id;
        }
        console.log('✅ Product saved to Firebase');
        return product;
    } catch (error) {
        console.error('❌ Error saving product:', error);
        throw error;
    }
}

async function getProductsFromFirebase() {
    try {
        const snapshot = await db.collection('products').get();
        const products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return products;
    } catch (error) {
        console.error('❌ Error getting products:', error);
        return [];
    }
}

async function deleteProductFromFirebase(id) {
    try {
        await db.collection('products').doc(id.toString()).delete();
        console.log('✅ Product deleted from Firebase');
    } catch (error) {
        console.error('❌ Error deleting product:', error);
        throw error;
    }
}

// Comments Functions
async function saveCommentToFirebase(comment) {
    try {
        const docRef = await db.collection('comments').add(comment);
        comment.id = docRef.id;
        console.log('✅ Comment saved to Firebase');
        return comment;
    } catch (error) {
        console.error('❌ Error saving comment:', error);
        throw error;
    }
}

async function getCommentsFromFirebase(postId) {
    try {
        const snapshot = await db.collection('comments')
            .where('postId', '==', postId)
            .orderBy('timestamp', 'desc')
            .get();
        const comments = [];
        snapshot.forEach(doc => {
            comments.push({ id: doc.id, ...doc.data() });
        });
        return comments;
    } catch (error) {
        console.error('❌ Error getting comments:', error);
        return [];
    }
}

async function deleteCommentFromFirebase(id) {
    try {
        await db.collection('comments').doc(id).delete();
        console.log('✅ Comment deleted from Firebase');
    } catch (error) {
        console.error('❌ Error deleting comment:', error);
        throw error;
    }
}

// Post Stats Functions
async function updatePostStats(postId, views = 0, likes = 0) {
    try {
        const statsRef = db.collection('postStats').doc(postId.toString());
        const doc = await statsRef.get();
        
        if (doc.exists) {
            const currentStats = doc.data();
            await statsRef.update({
                views: currentStats.views + views,
                likes: currentStats.likes + likes
            });
        } else {
            await statsRef.set({ views, likes });
        }
    } catch (error) {
        console.error('❌ Error updating post stats:', error);
    }
}

async function getPostStats(postId) {
    try {
        const doc = await db.collection('postStats').doc(postId.toString()).get();
        return doc.exists ? doc.data() : { views: 0, likes: 0 };
    } catch (error) {
        console.error('❌ Error getting post stats:', error);
        return { views: 0, likes: 0 };
    }
}
