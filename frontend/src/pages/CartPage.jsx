import { useCart } from "../context/CartContext";
import { X } from "lucide-react";
import Navbar from "../components/Navbar";

const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 150 : 0;
  const tax = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;

  const total = subtotal + shipping + tax;

  return (
  <div className="min-h-screen flex flex-col bg-neutral">
    <Navbar />
    <div className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
      My Cart
    </h1>

    {cart.length === 0 ? (
      <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 lg:px-10">

        {/* LEFT SECTION - PRODUCTS */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-6 border-b pb-6"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-xl shadow"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold">₹{item.price}</p>

                <div className="flex items-center justify-end mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.productId)}
                    className="px-3 border rounded-l bg-gray-100 text-xl"
                  >
                    -
                  </button>

                  <span className="px-4 border-t border-b text-xl">{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.productId)}
                    className="px-3 border rounded-r bg-gray-100 text-xl"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="mt-2 text-red-500 flex items-center justify-end gap-1"
                >
                  <X size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SECTION – ORDER SUMMARY */}
        <div className="lg:sticky lg:top-20 lg:self-start bg-white shadow-md rounded-xl p-6">

          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal:</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Shipping Estimate:</span>
            <span>₹{shipping}</span>
          </div>

          <div className="flex justify-between text-gray-700 mb-4">
            <span>Tax Estimate:</span>
            <span>₹{tax}</span>
          </div>

          <div className="flex justify-between text-lg font-semibold mb-6">
            <span>Order Total:</span>
            <span>₹{total}</span>
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition">
            Proceed to Checkout
          </button>
        </div>

      </div>
    )}
    </div>
  </div>
);

};

export default CartPage;
