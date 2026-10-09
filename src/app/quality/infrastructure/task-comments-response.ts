import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a comment.
 */
export interface TaskCommentResource extends BaseResource {
  /**
   * Unique identifier of the comment.
   */
  id: number;
  /**
   * Record discussed.
   */
  recordCode: string;
  /**
   * Author.
   */
  author: string;
  /**
   * Initials of the author.
   */
  initials: string;
  /**
   * When it was posted (ISO 8601).
   */
  postedAt: string;
  /**
   * Comment text.
   */
  text: string;
}

/**
 * Response envelope for comment collection queries.
 */
export interface TaskCommentsResponse extends BaseResponse {
  /**
   * Array of comment resources included in the response.
   */
  taskComments: TaskCommentResource[];
}
