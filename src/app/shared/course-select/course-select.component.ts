import { Workspace } from '../../workspace/models/workspace.model';
import { WorkspaceService } from './../../workspace/workspace.service';
import { Inscription } from './../../course/inscription.model';
import { InscriptionService } from './../../course/inscription.service';
import { Student } from '../../shared/models/student.model';
import { Course } from './../../course/course.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-select',
  templateUrl: './course-select.component.html',
  styleUrls: ['./course-select.component.css']
})
export class CourseSelectComponent implements OnInit, OnDestroy {

  courseSelected: Course = null;
  emptyCourseSelection = {id: null};

  inscriptions = [];
  constructor(private workspaceService: WorkspaceService, private inscriptionService: InscriptionService) { }

  ngOnInit() {
    this.workspaceService.getActiveWorkspace().subscribe((workspace: Workspace) => {
      this.courseSelected = workspace ? workspace.course : <Course> this.emptyCourseSelection;
    });

    this.inscriptionService.getInscriptions().subscribe((inscriptions: [Inscription]) => {
      this.inscriptions = inscriptions;
    });

    this.inscriptionService.inscriptionAdded.subscribe((i: Inscription) => {
      this.inscriptions.push(i);
    });

    if (this.inscriptions.length === 0) {
      this.courseSelected = <Course> this.emptyCourseSelection;
    }

    this.inscriptionService.inscriptionRemoved.subscribe((inscriptionId: String) => {
      this.inscriptions = this.inscriptions.filter((i: Inscription) => {
        return i.id !== inscriptionId;
      });
      if (this.inscriptions.length === 0) {
        this.courseSelected = <Course> this.emptyCourseSelection;
      }
    });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onCourseSelection() {
    this.workspaceService.activeWorkspaceByCourse(this.courseSelected).subscribe(() => {});
  }

  ngOnDestroy() {
   // this.subs.unsubscribe();
  }
}
