const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  qty: { type: Number, required: true },
  name: { type: String, required: true },
  prices_usd: { type: Number, required: true },
  img_uris_normal: { type: String, required: true },
  purchase_uris_tcgplayer: { type: String, required: false },
  type_line: { type: String, required: true },
  mana_cost: { type: String, required: true },
  power: { type: String, required: false },
  toughness: { type: String, required: false },
  oracle_text: { type: String, required: true },
  cmc: { type: Number, required: true },
  list: { type: String, required: true }
},)

module.exports = mongoose.model("Card", cardSchema)