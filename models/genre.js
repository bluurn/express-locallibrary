import { Schema, model } from 'mongoose';


const GenreSchema = new Schema({
  name: { type: Schema.Types.String, required: true, min: 3, max: 10 }
});

GenreSchema
.virtual('url')
.get(function () {
  return '/catalog/genre/' + this._id;
});

export default model('Genre', GenreSchema);
