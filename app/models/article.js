var mongoose   = require('mongoose')
    , Schema     = mongoose.Schema
    , env        = process.env.NODE_ENV || 'development'
    ;

//TODO: Should be able to upload images with the articles, thus the model needs to be able to remove these files 
//      when the article is deleted (use imager).

/*Should fix foreign key stuff for article schema, liek: {
    type: Schema.ObjectId, 
    ref: 'StudentUnion'
  },*/

var articleSchema = new Schema({
  title: String,
  body:  String,
  description: {
    type: String,
    default: ''
  },
  union_id: String,
  slug: String,
  priority: Number,
  small_image: String,
  large_image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

articleSchema.path('title').required('true', 'Title is a required field');
articleSchema.path('body').required('true', 'Body is a required field');

// Add methods for putting data the db

articleSchema.statics = {
  findBySlug: function (slug, union_id, cb){
    this
      .find({ union_id: union_id, slug: slug })
      .sort('-priority')
      .exec(cb);
  },

  listUnionArticles: function(limit, union_id, cb) {
    this
      .find({ union_id: union_id }, 'title description priority small_image')
      .sort('-priority')
      .limit(limit)
      .exec(cb);
  }
}

var Article = mongoose.model('Article', articleSchema);


// DEBUG OBJECTS:

Article.remove({}, function(err) {
  if (err) console.error(err);
});

var testArticle2 = new Article({
  title: 'Hei',
  body: 'Hei2',
  description: 'Hei3',
  union_id: 'Abakus',
  priority: 5,
  small_image: 'Url1',
  large_image: 'Url2',
});
var testArticle = new Article({
  title: 'Hei',
  body: 'Hei2',
  description: 'Hei3',
  union_id: 'Abakus',
  priority: 10,
  small_image: 'Url1',
  large_image: 'Url2',
});

var testArticle3 = new Article({
  title: 'Hei',
  body: 'Hei2',
  description: 'Hei3',
  union_id: 'Abakus',
  slug: 'hei',
  priority: 1,
  small_image: 'Url1',
  large_image: 'Url2',
});
testArticle3.save(function (err) {
  if (err) return handleError(err);
  console.log('saved');
});
testArticle2.save(function (err) {
  if (err) return handleError(err);
  console.log('saved');
});
testArticle.save(function (err) {
  if (err) return handleError(err);
  console.log('saved');
});