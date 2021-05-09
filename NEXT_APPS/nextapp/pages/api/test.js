import initDb from 'server/initDb';
import { User } from 'server/modals';

initDb();
export default async (req, res) => {
    try {
        if (req.method === "POST") {
            const data = await User.create(req.body);
            return res.status(201).json(data)
        }
        if (req.method === 'GET') {
            const data = await User.find();
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}