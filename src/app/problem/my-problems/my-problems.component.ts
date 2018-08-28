import { DialogService } from '../../dialog/dialog.service';
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

  problems = [];

  constructor(private problemService: ProblemService, private toastService: ToastrService,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.problemService.findAll().subscribe((problems: [Problem]) => {
      this.problems = problems;
    });
  }

  removeProblem(problem: Problem) {
    this.dialogService.confirm('Atención', '¿Está seguro?', 'Aceptar', 'Cancelar')
    .then((result: boolean) => {
      if (result) {
        this.problemService.deleteById(problem.id).subscribe(() => {
          this.toastService.success('Ejercicio eliminado.', 'Operación exitosa');
          this.problems = this.problems.filter((p: Problem) => {
            return p.id !== problem.id;
          });

        });
      }
    });
  }

  see(problem: Problem) {
    this.dialogService.problemInfo(problem, 'lg');
  }
}
