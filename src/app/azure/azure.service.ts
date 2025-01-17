import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AzureService {
  private httpClient: HttpClient = inject(HttpClient);

  async getInterationInfo(user: string, pat: string) {
    const url = 'https://dev.azure.com/annexus/_apis/wit/wiql?api-version=5.1'
    const query = { 
      "query": "Select [Id], [Title] From WorkItems Where [AgileAnx.Iteration#] = 168 And [Work Item Type] = 'User Story' And [System.State] <> 'Closed'   Order By [Id] Desc"
    }

    const data = await firstValueFrom(
      this.httpClient.post(
        url, 
        query, {
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Basic ` + btoa(`${user}:${pat}`)
          }}
        ));
  }
}