import jwt from 'jsonwebtoken';

const authenticate = (nextFn) => {
    return (req, res) => {
        const { token } = req.body;
        console.log('hello-----------')
        console.log(token)
        console.log('token------------')
        if (token === '' || token === null || token === undefined) {
            console.log('token not found');
            return res.status(401).json({ error: 'You must be logged in' });
        }
        try {
            const { user } = jwt.verify(token, process.env.SECRET);
            req.userid = user;
            return nextFn(req, res);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};

export default authenticate;