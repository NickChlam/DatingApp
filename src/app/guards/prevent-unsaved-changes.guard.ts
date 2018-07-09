import { CanDeactivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { MemberEditComponent } from "../members/member-edit/member-edit.component";


@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent>{
     canDeactivate(comp: MemberEditComponent) {
         if(comp.editForm.dirty){
             return confirm("Are you sure? Unsaved Changes will be lost")
         }
         return true;
     }
}