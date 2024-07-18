import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})

export class CartService{//crea la clase
  private storagreKey = 'shoppingCart';

  getCart(): any[] {//método para ver el carrito
    const cart = localStorage.getItem(this.storagreKey)
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(item:any):void{

    const cart = this.getCart();
    cart.push(item);
    localStorage.setItem(this.storagreKey, JSON.stringify(cart))

  }
  getTotal(): number {
    const cart = this.getCart();
    return cart.reduce((acc, item) => acc + (item.PRECIO * (item.quantity || 1)), 0);
  }
   removeFromCart(item:any):void{
    let cart = this.getCart();
    cart = cart.filter(cartItem => cartItem.DESCRIPCION !== item.DESCRIPCION);
    localStorage.setItem(this.storagreKey, JSON.stringify(cart))
   }
   isInCart(item: any): boolean {
    const cart = this.getCart();
    return cart.some(cartItem => JSON.stringify(cartItem) === JSON.stringify(item));
  }

   clearCart():void{
    localStorage.removeItem(this.storagreKey)
   }

}
