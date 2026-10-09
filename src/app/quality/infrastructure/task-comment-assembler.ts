import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {TaskComment} from '../domain/model/task-comment.entity';
import {TaskCommentResource, TaskCommentsResponse} from './task-comments-response';

/**
 * Maps comment entities to and from API resources.
 */
export class TaskCommentAssembler implements BaseAssembler<TaskComment, TaskCommentResource, TaskCommentsResponse> {
  /**
   * Converts a TaskCommentsResponse to an array of TaskComment entities.
   * @param response - The API response containing comment resources.
   * @returns An array of TaskComment entities.
   */
  toEntitiesFromResponse = (response: TaskCommentsResponse): TaskComment[] =>
    response.taskComments.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a TaskCommentResource to a TaskComment entity.
   * @param resource - The resource to convert.
   * @returns The converted TaskComment entity.
   */
  toEntityFromResource = (resource: TaskCommentResource): TaskComment =>
    new TaskComment({
      id: resource.id,
      recordCode: resource.recordCode,
      author: resource.author,
      initials: resource.initials,
      postedAt: resource.postedAt,
      text: resource.text
    });

  /**
   * Converts a TaskComment entity to a TaskCommentResource.
   * @param entity - The entity to convert.
   * @returns The converted TaskCommentResource.
   */
  toResourceFromEntity = (entity: TaskComment): TaskCommentResource =>
    ({
      id: entity.id,
      recordCode: entity.recordCode,
      author: entity.author,
      initials: entity.initials,
      postedAt: entity.postedAt,
      text: entity.text
    } as TaskCommentResource);
}
