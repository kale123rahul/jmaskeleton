import * as Jma from '../interfaces/all-interfaces';
import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import * as moment from 'moment';
import { UiService } from './ui-service';


@inject(HttpClient, 'MockService')
export class ApiClient implements Jma.IApiClient {
    constructor(
        private http: HttpClient, private mockService:any
    ) {
        http.configure(config => {
            config
                .withBaseUrl(`/api`)
                .withDefaults({ credentials: "same-origin" })
                .withInterceptor({
                    responseError: (error) => {
                        UiService.notify('There is a network error, the server could not be reached.<br/>Therefore updates and requests failed', 'danger')
                        return error;
                    }
                })
                .rejectErrorResponses();
        })
    }

    private mockedContainers: Jma.IMediaContainer[];
    private mockedProviders: Jma.IMediaProvider[];

    private mockAll() {
        if (this.mockedProviders && this.mockedProviders.length) return;
        this.mockedProviders = this.mockService.mockProviders(10);
        this.mockedContainers = [];
        this.mockedProviders.forEach(p => this.mockedContainers.push(...this.mockService.mockMediaContainers(p.id, -1)));
    }


    private cUser = <Jma.IUser><any>{
        email: 'jma-skeleton@example.com',
        firstName: 'JMA',
        lastName: 'Skeleton'
    }


    getCurrentUser(): Promise<Jma.IUser> {
        return Promise.resolve(this.cUser)
    }

    getAllProviders(): Promise<Jma.IMediaProvider[]>{
        return this.http.fetch('providers',{method:'GET'})
        .then(response => <any>json(response))
    }


    getAllProvidersMock(): Promise<Jma.IMediaProvider[]> {
        return Promise.resolve(this.mockService.mockProviders(20));
    }

    getSingleProviders(id: string): Promise<Jma.IMediaProvider> {
        var provider = this.mockService.mockProviders(1)[0];
        return Promise.resolve(provider);
    }

    getContainersByProvider(providerId): Promise<Jma.IMediaContainer[]> {
        return Promise.resolve(this.mockService.mockMediaContainers(providerId, 30));
    }



}

