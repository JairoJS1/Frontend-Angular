import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ActuPersona } from '../componentes-comunes/classes/ActuPersona.class';
import { ComunesService } from '../services/comunes/comunes.service';
import { EstadosService } from '../services/estados/estados.service';
import { PaisesService } from '../services/paises/paises.service';
import { PersonaService } from '../services/persona/persona.service';
declare let $: any;

@Component({
  selector: 'app-editar-component',
  templateUrl: './editar-component.component.html',
  styleUrls: ['./editar-component.component.scss']
})
export class EditarComponentComponent implements OnInit {

  personaForm: FormGroup;
  paises: any;
  estados: any;
  personas: any;



  headerColumnNames: string[] = ['id', 'nombre', 'apellido', 'edad', 'pais', 'estado', 'dpi', 'correo', 'telefono', 'direccion', 'accion'];
  dataSource = new MatTableDataSource();

  constructor(

    private fb: FormBuilder,
    private estadosService: EstadosService,
    private paisesService: PaisesService,
    private personaService: PersonaService,
    private ruta: ComunesService
  ) {
    this.personaForm = this.fb.group({
      id: [""],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      edad: ["", Validators.required],
      pais: ["", Validators.required],
      estado: ["", Validators.required],
      dpi: ["", Validators.required],
      correo: ["", Validators.required],
      telefono: ["", Validators.required],
      direccion: ["", Validators.required],
      fechaNacimiento: ["", Validators.required],
      genero: ["", Validators.required]
    });
  }

  ngOnInit(): void {

    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp;
    },
      error => { console.error(error) }
    );

    this.personaService.getAllPersonas().subscribe(resp => {
      this.personas = resp;
      this.dataSource.data = resp;
      console.log(resp)
    },
      error => { console.error(error) }
    );

    this.personaForm.get('pais')?.valueChanges.subscribe(value => {
      this.estadosService.getAllEstadosByPais(value.id).subscribe(resp => {
        this.estados = resp;
        console.log(this.estados)
        console.log(value.id)
      },
        error => { console.error(error) }
      );
    })
  }

  eliminar(persona: { id: String; }) {

    Swal.fire({
      title: 'Confirmar Eliminación',
      text: "¿Está seguro que quiere eliminar este registro?",
      icon: 'question',
      showDenyButton: true,
      confirmButtonColor: "#1369A0",
      confirmButtonText: "Si",
      denyButtonText: "No",
      denyButtonColor: "#F44336",
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.deletePersona(persona.id).subscribe(resp => {
          if (resp === true) {
            this.personas.pop(persona)
            this.ruta.forcedNavigate(['editar']);
          }
        })
        Swal.fire({
          titleText: `Se ha borrado la información`,
          icon: 'success',
          showCloseButton: true,
          showConfirmButton: false
        });
      }
    })


  }

  public editar(persona: ActuPersona) {
    this.personaForm.setValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      edad: persona.edad,
      pais: persona.pais,
      estado: persona.estado,
      dpi: persona.dpi,
      correo: persona.correo,
      telefono: persona.telefono,
      direccion: persona.direccion,
      genero: persona.genero,
      fechaNacimiento: (persona.fechaNacimiento)
    })
    console.log(persona)
  }

  public limpiar() {
    this.personaForm.reset();
  }

  public guardar() {
    this.personaService.savePersona(this.personaForm.value).subscribe(resp => {
      this.personaForm.reset();
      this.personas = this.personas.filter((persona: { id: any; }) => resp.id !== persona.id);
      this.personas.push(resp);
      Swal.fire({
        titleText: `Información Guardada con exito`,
        icon: "success",
        showCloseButton: true,
        showConfirmButton: false,
      });
      this.ruta.forcedNavigate(['editar']);
    },
      error => { console.error(error) }
    )
  }



}
