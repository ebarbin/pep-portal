import { Workspace } from './../../workspace/workspace.model';
import { WorkspaceService } from './../../workspace/workspace.service';
import { Inscription } from './../../course/inscription.model';
import { InscriptionService } from './../../course/inscription.service';
import { StudentService } from '../services/student.service';
import { Student } from '../../shared/models/student.model';
import { UserService } from './../../user/user.service';
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

  subs: Subscription;
  student: Student;

  inscriptions = [];
  constructor(private workspaceService: WorkspaceService, private inscriptionService: InscriptionService) { }

  ngOnInit() {
    this.workspaceService.getActiveWorkspace().subscribe((workspace: Workspace) => {
      this.courseSelected = workspace ? workspace.course : null;
    });

    this.inscriptionService.getInscriptions().subscribe((inscriptions: [Inscription]) => {
      this.inscriptions = inscriptions;
    });

    this.inscriptionService.inscriptionAdded.subscribe((i: Inscription) => {
      this.inscriptions.push(i);
    });

    this.inscriptionService.inscriptionRemoved.subscribe((inscriptionId: String) => {
      this.inscriptions = this.inscriptions.filter((i: Inscription) => {
        return i.id !== inscriptionId;
      });
      if (this.inscriptions.length === 0) {
        this.courseSelected = <Course> this.emptyCourseSelection;
      }
    });

    /*this.studentService.getStoredStudent().subscribe((student: Student) => {
      this.student = student;
    });

    this.subs = this.studentService.studentChanged.subscribe((student: Student) => {
      this.student = student;
    });*/
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onCourseSelection() {
    this.workspaceService.activeWorkspaceByCourse(this.courseSelected).subscribe(() => {});

    // this.studentService.updateSelectedCourse(this.student.selectedCourse).subscribe((student: Student) => {});
  }

  ngOnDestroy() {
   // this.subs.unsubscribe();
  }
}
