import { Component, OnInit } from '@angular/core';
import { AlimentosService } from '../servicios/alimentos';
import { CartService } from '../servicios/cart.service';

declare var $: any;

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.css']
})
export class AlimentosComponent implements OnInit{
  data:any[] = []
  cart: any[] = [];
  marcas: any[] = [];
  filtroAnimal: string[] = [];
  filtroMarca: string[] = [];
  dataFiltrada: any[] = [];
  item: any;



  constructor(private alimentosService:AlimentosService, private cartService: CartService){}

  ngOnInit(): void {
    this.alimentosService.getData().subscribe((data: any)=>{
      this.data = data;
      this.marcas = this.data.map(item=> item.MARCA)
      this.marcas = Array.from(new Set(this.marcas))
      this.dataFiltrada = this.data
      this.cart = this.cartService.getCart();
    })
  }
  aplicarFiltros(): void {
    // Reiniciar filtros
    this.filtroAnimal = [];
    this.filtroMarca = [];

    // Obtener filtros seleccionados
    const perroCheckbox = document.getElementById('perro') as HTMLInputElement;
    const gatoCheckbox = document.getElementById('gato') as HTMLInputElement;

    if (perroCheckbox.checked) {
      this.filtroAnimal.push('PERRO');
    }
    if (gatoCheckbox.checked) {
      this.filtroAnimal.push('GATO');
    }

    // Obtener marcas seleccionadas
    const checkboxesMarcas = document.querySelectorAll('#filtroMarca input[type="checkbox"]:checked') as NodeListOf<HTMLInputElement>;
    checkboxesMarcas.forEach((checkbox: HTMLInputElement) => {
      this.filtroMarca.push(checkbox.name);
    });

    // Aplicar los filtros
    this.filtrarDatos();
  }

  filtrarDatos(): void {
    if (this.filtroAnimal.length === 0 && this.filtroMarca.length === 0) {
      this.dataFiltrada = this.data;
      return;
    }
    // Filtrar datos según los filtros aplicados
    // Por ejemplo, filtrar por animal y marca
    this.dataFiltrada = this.data.filter(item => {
      const pasaFiltroAnimal = this.filtroAnimal.length === 0 || this.filtroAnimal.includes(item.ANIMAL.toUpperCase());
      const pasaFiltroMarca = this.filtroMarca.length === 0 || this.filtroMarca.includes(item.MARCA);
      return pasaFiltroAnimal.valueOf() && pasaFiltroMarca.valueOf();
    });
  }
  toggleItemSelection(item: any, event: any): void {
    if (event.target.checked) {
      this.cartService.addToCart(item);
    } else {
      this.cartService.removeFromCart(item)
    }
    this.cart = this.cartService.getCart();
  }

  openCart(): void{
    $('#cartModal').modal('show')
  }
  isChecked(item: any): boolean {
    return this.cartService.isInCart(item);
  }
  removeItemFromCart(item: any): void {
    this.cartService.removeFromCart(item);
    this.cart = this.cartService.getCart();  // Update local cart variable
  }

  sendWhatsApp(): void {
    let message = 'Hola, quisiera comprar:\n';
    for (let item of this.cart) {
      message += `\n- ${item.DESCRIPCION} `;
    }
    //x ${item.CANTIDAD} Kg
    const whatsappUrl = `https://api.whatsapp.com/send?phone=+5493816121337&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

}
