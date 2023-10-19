import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Member } from "../models/member";
import { MembersService } from "../services/members.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class MemberDetailsResolver implements Resolve<Member>{
    constructor(private memberServices:MembersService){}

    resolve(route: ActivatedRouteSnapshot):Observable<Member>|any {
        const _router = route.paramMap.get('userName');
        if(_router){
        return this.memberServices.getMember(_router)          
        }
    }

}