import { Component, OnInit } from '@angular/core';
import { AccesoriosserviceService } from '../servicios/accesoriosservice.service';
import { CartService } from '../servicios/cart.service';

declare var $:any

@Component({
  selector: 'app-accesorios',
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.css']
})
export class AccesoriosComponent implements OnInit{

  data:any[] = []
  cart:any[] = []
  item:any[] = []
  totalGeneral:number = 0
  total:any


  constructor(private accesorios:AccesoriosserviceService, private cartService:CartService){}

  ngOnInit(): void {
    this.accesorios.getData().subscribe((data:any)=>{
      this.data = data
    })

    this.cart = this.cartService.getCart().map(item=>({
      ...item,quantity:1,
      total:item.PRECIO
    }))
    this.calcularTotalGeneral()
  }

  actualizarCantidad(item:any):void{
    this.calcularTotalGeneral()
  }

  calcularTotalGeneral():void{
    //this.total = this.cart.reduce((acc,item)=> acc += (item.PRECIO * item.quantity),0);
    this.totalGeneral = this.cartService.getTotal()
  }

  removeItemFromCart(item:any):void{
    this.cart = this.cart.filter(cartItem => cartItem != item)
    this.cartService.removeFromCart(item)
    this.calcularTotalGeneral()
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
    this.calcularTotalGeneral()
    for (let item of this.cart){
      if(item.quantity == undefined){
        item.quantity = 1
      }
      this.total+=item.PRECIO
    }
    $('#cartModal').modal('show')
  }
  isChecked(item: any): boolean {
    return this.cartService.isInCart(item);
  }

  updateQuantity(item:any){}
  closeCart(): void{
    $('#cartModal').modal('hide')
  }

  sendWhatsApp(): void {
    let message = 'Hola, quisiera comprar:\n';
    for (let item of this.cart) {
      message += `\n- ${item.DESCRIPCION} x ${item.quantity} unidades\n`;
    }
    message += `por un total de $ ${(this.totalGeneral*0.985).toFixed(2)}`
    const whatsappUrl = `https://api.whatsapp.com/send?phone=+5493816121337&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

}
