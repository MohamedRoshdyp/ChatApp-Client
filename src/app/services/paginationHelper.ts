import { HttpClient, HttpParams } from "@angular/common/http";
import { PaginatedResult } from "../models/Pagination";
import { map } from "rxjs";

export function getPaginatedResult<T>(url: any, params: any, http: HttpClient) {
    const paginatedResult: PaginatedResult<T | null> = new PaginatedResult<T>();

    return http.get<T>(url, { observe: 'response', params })
        .pipe(
            map(response => {
                paginatedResult.result = response.body;
                let _pagination = response.headers.get('Pagination');
                if (_pagination !== null) {
                    paginatedResult.pagniation = JSON.parse(_pagination);
                }
                return paginatedResult;
            })
        );
}

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
}