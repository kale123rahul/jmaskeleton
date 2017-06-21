import { Request, Response } from 'express';
import { HttpError } from '../../utils/http-error';
import * as mockService from '../../services/mock-service';
import * as Jma from '../../interfaces/all-interfaces';

var mockedContainers : Jma.IMediaContainer[];
var mockedProviders : Jma.IMediaProvider[];

function mockAll(){
    if (mockedProviders && mockedProviders.length) return;
    mockedProviders = mockService.mockProviders(10);
    mockedContainers = [];
    mockedProviders.forEach(p=>mockedContainers.push(...mockService.mockMediaContainers(p.id,-1)));
}

export function getAllProviders(req: Request, res: Response, next: Function) {
    mockAll();
    res.json(mockedProviders);
}

export function getSingleProvider(req: Request, res: Response, next: Function) {
    mockAll();
    var id = req.params['id'];
    var p = mockedProviders.find(m=>m.id==id);
    res.json(p);
}

export function getProviderContainers(req: Request, res: Response, next: Function){
    mockAll();
    var id = req.params['id'];
    var cs = mockedContainers.filter(c=>c.providerId==id);
    res.json(cs);
}