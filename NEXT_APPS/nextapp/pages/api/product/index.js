import initDb from 'server/initDb';
initDb();
import { Product } from 'server/modals'

export default async (req, res) => {
    try {
        const type = req.method;
        if (type === 'POST') {
            const data = await Product.create(req.body);
            return res.status(201).json(data);
        }
        if (type ==="GET") {
            const data = await Product.find();
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500)
    }
}