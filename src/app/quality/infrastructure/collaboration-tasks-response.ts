import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a task.
 */
export interface CollaborationTaskResource extends BaseResource {
  /**
   * Unique identifier of the task.
   */
  id: number;
  /**
   * What has to be done.
   */
  title: string;
  /**
   * Linked record.
   */
  recordCode: string;
  /**
   * Context of the task.
   */
  detail: string;
  /**
   * Accountable owner.
   */
  owner: string;
  /**
   * Due date and time (ISO 8601).
   */
  dueAt: string;
  /**
   * Status (to-do, in-review, ready, pending, open or done).
   */
  status: string;
}

/**
 * Response envelope for task collection queries.
 */
export interface CollaborationTasksResponse extends BaseResponse {
  /**
   * Array of task resources included in the response.
   */
  collaborationTasks: CollaborationTaskResource[];
}
