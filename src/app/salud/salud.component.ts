import { Component, OnInit } from '@angular/core';
import { HigieneService } from '../servicios/higiene.service';
import { CartService } from '../servicios/cart.service';

declare var $:any

@Component({
  selector: 'app-salud',
  templateUrl: './salud.component.html',
  styleUrls: ['./salud.component.css']
})
export class SaludComponent implements OnInit{

  data:any[] = []
  cart:any[] = []
  item:any[] = []
  total:number = 0

  constructor(private higieneService:HigieneService, private cartService:CartService){

  }
  ngOnInit(): void {
    this.higieneService.getData().subscribe((data:any)=>{
      this.data=data
    })
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

    for (let item of this.cart){
      this.total+=item.PRECIO
    }
    $('#cartModal').modal('show')
  }
  isChecked(item: any): boolean {
    return this.cartService.isInCart(item);
  }
  removeItemFromCart(item: any): void {
    this.cartService.removeFromCart(item);
    this.cart = this.cartService.getCart();  // Update local cart variable
    this.total-=item.PRECIO
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
