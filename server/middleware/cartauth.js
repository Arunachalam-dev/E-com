
import jwt from 'jsonwebtoken'


const cartauth = async (req, res, next) => {

    const { token } = req.headers

    if (!token) {
        return res.json({ success: false, message: "login faild try agine" })
    }

    try {

        const token_decoder = jwt.verify(token, process.env.jwt_secret)

        req.body.userId = token_decoder.id
        next()

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })


    }


}

export default cartauth;