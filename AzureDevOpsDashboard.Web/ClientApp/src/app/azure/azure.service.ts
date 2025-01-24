import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { environment } from '../../environments/environment';

import { WorkItemDTO } from './workItem.dto';

@Injectable({
  providedIn: 'root',
})
export class AzureService {
  private httpClient: HttpClient = inject(HttpClient);
  private organization: string | null | undefined = environment.organization;

  async getInterationInfo(user: string, pat: string): Promise<WorkItemDTO[]> {
    const url = `https://dev.azure.com/${this.organization}/_apis/wit/wiql?api-version=5.1`;
    const query = {
      "query": "Select [Id], [Title] From WorkItems Where [AgileAnx.Iteration#] = 168 And [Work Item Type] = 'User Story' And [System.State] <> 'Closed' Order By [Id] Desc"
    }

    const iterationData: any = await firstValueFrom(
      this.httpClient.post(
        url,
        query, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ` + btoa(`${user}:${pat}`)
        }
      }
      ));

    let ids = [];

    for (let i = 0; i < iterationData.workItems.length; i++) {
      ids.push(iterationData.workItems[i].id);
    }

    let workItemData = await this.getWorkItemsInfo(user, pat, ids.toString());
    workItemData = workItemData.sort((n1,n2) => n1.status > n2.status ? 1 : -1);
    return workItemData;
  }

  private async getWorkItemsInfo(user: string, pat: string, ids: string): Promise<WorkItemDTO[]> {
    const fields = 'System.Id,System.Title,System.WorkItemType,System.TeamProject,System.State,System.AssignedTo';
    const url = `https://dev.azure.com/${this.organization}/_apis/wit/workitems?ids=${ids}&fields=${fields}&api-version=7.2-preview.3`;

    const data: any = await firstValueFrom(
      this.httpClient.get(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ` + btoa(`${user}:${pat}`)
          }
        }
      )
    );

    const azureWrokItems: any = data.value;
    let workItems: WorkItemDTO[] = [];

    azureWrokItems.forEach((item: any) => {
      const assignedTo = item.fields['System.AssignedTo'];
      workItems.push({
        id: item.id,
        title: item.fields['System.Title'],
        url: item.url,
        status: item.fields['System.State'],
        porject: item.fields['System.TeamProject'],
        assignee: assignedTo?.displayName
      })
    });

    return workItems;

  }
}
