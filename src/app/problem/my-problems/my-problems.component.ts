import { PaginatorService } from './../../shared/paginator/paginator.service';
import { Router } from '@angular/router';
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
  filteredProblems = [];

  constructor(private paginatorService: PaginatorService, private router: Router,
    private problemService: ProblemService, private toastService: ToastrService,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.problemService.findAll().subscribe((problems: [Problem]) => {
      this.problems = problems;
    });
  }

  removeProblem(problem: Problem) {
    this.dialogService.confirm('Atención', '¿Está seguro?', 'Si', 'No')
    .then((result: boolean) => {
      if (result) {
        this.problemService.deleteById(problem.id).subscribe(() => {
          this.toastService.success('Ejercicio eliminado.', 'Operación exitosa');

          this.problems = this.problems.filter((p: Problem) => {
            return p.id !== problem.id;
          });

          this.filteredProblems = this.filteredProblems.filter((p: Problem) => {
            return p.id !== problem.id;
          });

          if (this.problems.length === 0) {
            this.toastService.warning('No hay ejercicios.', 'Atención');
            this.router.navigate(['home/start']);
          } else {
            this.paginatorService.refresh.next({id: null, data: this.problems});
          }

        });
      }
    });
  }

  see(problem: Problem) {
    this.dialogService.problemInfo(problem, 'lg');
  }

  onPageChanged(data: [Problem]) {
    setTimeout(() => {
      this.filteredProblems = data;
    }, 100);
  }
}
