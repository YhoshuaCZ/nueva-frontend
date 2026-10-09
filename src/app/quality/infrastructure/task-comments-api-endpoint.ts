import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {TaskComment} from '../domain/model/task-comment.entity';
import {TaskCommentResource, TaskCommentsResponse} from './task-comments-response';
import {TaskCommentAssembler} from './task-comment-assembler';

/**
 * Endpoint client for comment CRUD operations.
 */
export class TaskCommentsApiEndpoint extends BaseApiEndpoint<TaskComment, TaskCommentResource, TaskCommentsResponse, TaskCommentAssembler> {
  /**
   * Creates an instance of TaskCommentsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderTaskCommentsEndpointPath}`, new TaskCommentAssembler());
  }
}
