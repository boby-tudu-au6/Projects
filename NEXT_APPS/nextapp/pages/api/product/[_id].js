import initDb from 'server/initDb';
initDb();
import { Product } from 'server/modals'
export default async (req, res) => {
    try {
        // console.log(req.query)
        if (req.method === "GET") {
            const data = await Product.findOne({ _id: req.query._id });
            return res.status(200).json(data);
        }
        return res.status(404).json({ data: 'url not found' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}