import { ConfirmationDialogService } from './../../shared/dialog/confirmation-dialog.service';
import { Problem } from './../problem.model';
import { ProblemService } from './../problem.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-problems',
  templateUrl: './my-problems.component.html',
  styleUrls: ['./my-problems.component.css']
})
export class MyProblemsComponent implements OnInit {

  problems: [Problem]

  constructor(private problemService: ProblemService, private toastService: ToastrService,
    private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.problemService.findAll().subscribe((problems: [Problem]) => {
      this.problems = problems;
    });
  }

  removeProblem(problem: Problem) {
    this.confirmationDialogService.confirm('Atención', '¿Está seguro?', 'Aceptar', 'Cancelar')
    .then((result: boolean) => {
      if (result) {
        this.problemService.deleteById(problem.id).subscribe((problems: [Problem]) => {
          this.toastService.success('Ejercicio eliminado.', 'Operación exitosa');
          this.problems = problems;
        });
      } else {
      }
    })
    .catch(() => {});
  }

}
