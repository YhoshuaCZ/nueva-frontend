import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {CollaborationTask} from '../domain/model/collaboration-task.entity';
import {CollaborationTaskResource, CollaborationTasksResponse} from './collaboration-tasks-response';

/**
 * Maps task entities to and from API resources.
 */
export class CollaborationTaskAssembler implements BaseAssembler<CollaborationTask, CollaborationTaskResource, CollaborationTasksResponse> {
  /**
   * Converts a CollaborationTasksResponse to an array of CollaborationTask entities.
   * @param response - The API response containing task resources.
   * @returns An array of CollaborationTask entities.
   */
  toEntitiesFromResponse = (response: CollaborationTasksResponse): CollaborationTask[] =>
    response.collaborationTasks.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a CollaborationTaskResource to a CollaborationTask entity.
   * @param resource - The resource to convert.
   * @returns The converted CollaborationTask entity.
   */
  toEntityFromResource = (resource: CollaborationTaskResource): CollaborationTask =>
    new CollaborationTask({
      id: resource.id,
      title: resource.title,
      recordCode: resource.recordCode,
      detail: resource.detail,
      owner: resource.owner,
      dueAt: resource.dueAt,
      status: resource.status
    });

  /**
   * Converts a CollaborationTask entity to a CollaborationTaskResource.
   * @param entity - The entity to convert.
   * @returns The converted CollaborationTaskResource.
   */
  toResourceFromEntity = (entity: CollaborationTask): CollaborationTaskResource =>
    ({
      id: entity.id,
      title: entity.title,
      recordCode: entity.recordCode,
      detail: entity.detail,
      owner: entity.owner,
      dueAt: entity.dueAt,
      status: entity.status
    } as CollaborationTaskResource);
}
