import jwt from "jsonwebtoken"

export function signJwtToken(payload, options = {}) {
    const secret = process.env.NEXTAUTH_SECRET
    const token = jwt.sign(payload, secret, options)

    return token
}

export function verifyJwtToken(sessionToken) {
    try {
        const decoded = jwt.verify(sessionToken, process.env.NEXTAUTH_SECRET)

        return decoded
    } catch (error) {
        console.log(error)
        return null
    }
}

export function authorize(req) {
    const accessToken = req.headers.get('authorization')

    const token = accessToken.split(" ")[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(
            JSON.stringify({ message: "unauthorized (wrong or expired token)" }),
            { status: 403 }
        )
    }

    return decodedToken
}

