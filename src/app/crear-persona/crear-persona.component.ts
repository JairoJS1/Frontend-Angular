import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ComunesService } from '../services/comunes/comunes.service';
import { EstadosService } from '../services/estados/estados.service';
import { PaisesService } from '../services/paises/paises.service';
import { PersonaService } from '../services/persona/persona.service';
@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.scss']
})
export class CrearPersonaComponent implements OnInit {
  isLinear = false;
  personaForm: FormGroup;
  paises: any;
  estados: any;
  personas: any;

  genero: any[] = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Femenino', viewValue: 'Femenino' },
    { value: 'No especificar', viewValue: 'No especificar' }
  ];

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
      direccion: ["", Validators.required],
      fechaNacimiento: ["", Validators.required],
      genero: ["", Validators.required],
      telefono: ["", Validators.required]
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

      this.personaForm.get('pais')?.valueChanges.subscribe(value => {
        this.estadosService.getAllEstadosByPais(value.id).subscribe(resp => {
          this.estados = resp;
        },
          error => { console.error(error) }
        );
      })

    })
  }





  public limpiar() {
    this.personaForm.reset();
    this.regresar();
  }

  guardar(): void {
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
      this.regresar();
    },
      error => { console.error(error) }
    )
  }


  public regresar() {
    this.ruta.forcedNavigate(['menu']);
  }
}
