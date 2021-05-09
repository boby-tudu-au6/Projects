import { Schema, model, models } from 'mongoose';

const productSchema = new Schema({
    name: String,
    price: String,
    desc: String,
    media: String,
});

export default models.product || model('product', productSchema);
// export default model("product", productSchema);