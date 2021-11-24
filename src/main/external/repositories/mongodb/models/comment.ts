/* eslint-disable no-underscore-dangle */
import { CollectionNames, Comment } from '../../../../../constants';
import { MongoHelper } from '../helpers/mongo-helper';
import { CommentDocument } from './model.types';
import SchemaConstructor from './schema-constructor';

const commentSchema = SchemaConstructor({
  [Comment.Text]: { type: String, required: true, trim: true },
  [Comment.MissingPoster]: { type: String, required: true, ref: CollectionNames.MissingPosters },
  [Comment.PostedBy]: { type: String, required: true, ref: CollectionNames.Users },
});

commentSchema.set('toObject', {
  virtuals: true,
});

commentSchema.set('toJSON', {
  virtuals: true,
});

export default MongoHelper.getModel<CommentDocument>(CollectionNames.Comments, commentSchema);
