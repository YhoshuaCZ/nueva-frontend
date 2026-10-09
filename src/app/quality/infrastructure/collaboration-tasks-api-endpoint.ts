import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {CollaborationTask} from '../domain/model/collaboration-task.entity';
import {CollaborationTaskResource, CollaborationTasksResponse} from './collaboration-tasks-response';
import {CollaborationTaskAssembler} from './collaboration-task-assembler';

/**
 * Endpoint client for task CRUD operations.
 */
export class CollaborationTasksApiEndpoint extends BaseApiEndpoint<CollaborationTask, CollaborationTaskResource, CollaborationTasksResponse, CollaborationTaskAssembler> {
  /**
   * Creates an instance of CollaborationTasksApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderCollaborationTasksEndpointPath}`, new CollaborationTaskAssembler());
  }
}
