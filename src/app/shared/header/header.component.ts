import { CorrectionService } from './../../correction/correction.service';
import { DialogService } from './../../dialog/dialog.service';
import { interval } from 'rxjs';
import { ConsultationService } from './../../consultation/consultation.service';
import { UserService } from './../../user/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user/user.model';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private correctionService: CorrectionService, private dialogService: DialogService,
    private consultationService: ConsultationService,
    private userService: UserService, private router: Router) { }

  isCollapsed: boolean;
  user: User;

  unreadValue: number;
  correctionsValue: number;

  subsImageUpdated: Subscription;
  subsUnreaded: Subscription;
  subsInterval: Subscription;

  ngOnInit() {
    this.user = this.userService.getStoredUser();

    if (this.user.role === 'ROLE_STUDENT') {
      this.subsInterval = interval(20000).subscribe(x => {
        this.getStudentUnreadResponses();
      });
      this.getStudentUnreadResponses();
    } else {
      this.subsInterval = interval(20000).subscribe(x => {
        this.getTeacherUnreadConsultations();
        this.getCorrectionsAvailables();
      });
      this.getTeacherUnreadConsultations();
      this.getCorrectionsAvailables();
    }

    this.subsUnreaded = this.consultationService.consultationsChanges.subscribe((value: number) => {
      this.unreadValue = value;
    });

    this.subsImageUpdated = this.userService.imageUpdated.subscribe((imageId: string) => {
      this.user.imageId = imageId;
    });

    this.correctionService.correctionsChanges.subscribe((value: number) => {
      this.correctionsValue = value;
    });
  }

  private getTeacherUnreadConsultations() {
    this.consultationService.getTeacherUnreadConsultations().subscribe((value: number) => {
      this.unreadValue = value;
    });
  }

  private getCorrectionsAvailables() {
    this.correctionService.getCorrectionsQuantity().subscribe((value: number) => {
      this.correctionsValue = value;
    });
  }

  private getStudentUnreadResponses() {
    this.consultationService.getStudentUnreadResponses().subscribe((value: number) => {
      this.unreadValue = value;
    });
  }

  ngOnDestroy() {
    this.subsImageUpdated.unsubscribe();
    this.subsUnreaded.unsubscribe();
    this.subsInterval.unsubscribe();
  }

  logout() {
    this.userService.logout().subscribe( () => {
      this.router.navigate(['/user/login']);
    });
  }

  onShowHelp() {

    this.dialogService.showHelp(this.router.routerState.snapshot.url);
  }

}
