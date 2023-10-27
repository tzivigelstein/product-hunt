import admin from "firebase-admin"

export default async function handler(req, res) {
  const { username } = req.query

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY.replace(/\\n/g, "\n"),
        clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      }),
    })
  }

  try {
    const { users } = await admin.auth().listUsers()

    const userRecord = users.find(
      user => user.displayName.toLowerCase() === username
    )

    res.status(200).json({ userRecord })
  } catch (error) {
    console.error("Error fetching user data:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
