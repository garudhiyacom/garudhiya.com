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
        const snapshot = await db.collection('blogPosts').get();
        const posts = [];
        snapshot.forEach(doc => {
            posts.push({ id: doc.id, ...doc.data() });
        });
        // Sort by date on client side
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
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
        if (comment.id) {
            // Update existing comment
            await db.collection('comments').doc(comment.id).set(comment);
            console.log('✅ Comment updated in Firebase');
        } else {
            // Create new comment
            const docRef = await db.collection('comments').add(comment);
            comment.id = docRef.id;
            console.log('✅ Comment saved to Firebase');
        }
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
            .get();
        const comments = [];
        snapshot.forEach(doc => {
            comments.push({ id: doc.id, ...doc.data() });
        });
        // Sort by timestamp on client side (newest first)
        comments.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
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

// Alias for compatibility
async function getPostStatsFromFirebase(postId) {
    return await getPostStats(postId);
}

// Increment post views
async function incrementPostViewsInFirebase(postId) {
    try {
        const stats = await getPostStats(postId);
        await updatePostStats(postId, (stats.views || 0) + 1, stats.likes || 0);
        console.log('✅ Post views incremented');
    } catch (error) {
        console.error('❌ Error incrementing views:', error);
        throw error;
    }
}

// Increment post likes
async function incrementPostLikesInFirebase(postId, delta = 1) {
    try {
        const stats = await getPostStats(postId);
        const newLikes = Math.max(0, (stats.likes || 0) + delta);
        await updatePostStats(postId, stats.views || 0, newLikes);
        console.log('✅ Post likes updated');
    } catch (error) {
        console.error('❌ Error updating likes:', error);
        throw error;
    }
}
