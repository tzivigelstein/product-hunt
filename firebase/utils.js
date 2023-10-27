import firebase from "./firebase"

export async function getPostBySlug(slug) {
  const query = await firebase.db
    .collection("products")
    .where("slug", "==", slug)
    .get()

  const docs = []

  query.forEach(doc => {
    docs.push(doc.data())
  })

  if (docs.length > 0) {
    return docs[0]
  } else {
    throw new Error("Post not found")
  }
}
