var mongoose   = require('mongoose')
    , Schema     = mongoose.Schema
    , env        = process.env.NODE_ENV || 'development'
    ;

var unionSchema = new Schema({
  _id: String,
  name: String,
  description: {
    type: String,
    default: ''
  },
  small_image: String,
  large_image: String
});

unionSchema.statics = {
  findById: function(id, cb) {
    this
        .findOne({_id: id})
        .exec(cb);
  }
}
module.exports = mongoose.model('Union', unionSchema);;

