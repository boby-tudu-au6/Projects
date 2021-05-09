import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    phone: String,
    email: String,
    password: String
});

export default models.user || model('user', userSchema);
// export default model("user", userSchema);