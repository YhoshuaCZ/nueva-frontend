import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {RegulatoryReport} from '../domain/model/regulatory-report.entity';
import {RegulatoryReportResource, RegulatoryReportsResponse} from './regulatory-reports-response';
import {RegulatoryReportAssembler} from './regulatory-report-assembler';

/**
 * Endpoint client for regulatory report CRUD operations.
 */
export class RegulatoryReportsApiEndpoint extends BaseApiEndpoint<RegulatoryReport, RegulatoryReportResource, RegulatoryReportsResponse, RegulatoryReportAssembler> {
  /**
   * Creates an instance of RegulatoryReportsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderRegulatoryReportsEndpointPath}`, new RegulatoryReportAssembler());
  }
}
