import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {AuditFinding} from '../domain/model/audit-finding.entity';
import {AuditFindingResource, AuditFindingsResponse} from './audit-findings-response';

/**
 * Maps audit finding entities to and from API resources.
 */
export class AuditFindingAssembler implements BaseAssembler<AuditFinding, AuditFindingResource, AuditFindingsResponse> {
  /**
   * Converts a AuditFindingsResponse to an array of AuditFinding entities.
   * @param response - The API response containing audit finding resources.
   * @returns An array of AuditFinding entities.
   */
  toEntitiesFromResponse = (response: AuditFindingsResponse): AuditFinding[] =>
    response.auditFindings.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a AuditFindingResource to a AuditFinding entity.
   * @param resource - The resource to convert.
   * @returns The converted AuditFinding entity.
   */
  toEntityFromResource = (resource: AuditFindingResource): AuditFinding =>
    new AuditFinding({
      id: resource.id,
      auditCode: resource.auditCode,
      code: resource.code,
      title: resource.title,
      classification: resource.classification,
      owner: resource.owner,
      dueAt: resource.dueAt,
      status: resource.status,
      observation: resource.observation,
      response: resource.response,
      closureRequirement: resource.closureRequirement
    });

  /**
   * Converts a AuditFinding entity to a AuditFindingResource.
   * @param entity - The entity to convert.
   * @returns The converted AuditFindingResource.
   */
  toResourceFromEntity = (entity: AuditFinding): AuditFindingResource =>
    ({
      id: entity.id,
      auditCode: entity.auditCode,
      code: entity.code,
      title: entity.title,
      classification: entity.classification,
      owner: entity.owner,
      dueAt: entity.dueAt,
      status: entity.status,
      observation: entity.observation,
      response: entity.response,
      closureRequirement: entity.closureRequirement
    } as AuditFindingResource);
}
