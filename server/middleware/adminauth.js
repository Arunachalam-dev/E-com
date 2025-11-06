import jwt from 'jsonwebtoken'


const adminauth = async (req, res, next) => {
    try {

        const { token } = req.headers



        if (!token) {
          return  res.json({ success: false, massage: "not authorise" })
        }


        const token_decoder = jwt.verify(token, process.env.jwt_secret)
        if (token_decoder !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
          return  res.json({ success: false, massage: "not authorizse login agine" })
        }

        next()
    } catch (error) {
        console.log(console.error)
        res.json({ success: false, message: error.massage })

    }



}

export default adminauth