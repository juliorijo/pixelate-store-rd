const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
  productoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  nombre: String,
  precio: Number,
  cantidad: Number,
  subtotal: Number,
});

const orderSchema = new mongoose.Schema(
  {
    numeroPedido: {
      type: String,
      unique: true,
      required: true,
    },
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Datos del cliente
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    ciudad: {
      type: String,
      required: true,
    },
    codigoPostal: {
      type: String,
      default: '',
    },

    // Detalles del pedido
    items: [orderDetailSchema],

    // Totales
    subtotal: {
      type: Number,
      required: true,
    },
    impuesto: {
      type: Number,
      default: 0,
    },
    costoDelvery: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },

    // Pago
    metodoPago: {
      type: String,
      enum: ['efectivo', 'transferencia'],
      required: true,
    },

    // Estado del pedido
    estado: {
      type: String,
      enum: ['pendiente', 'confirmado', 'preparando', 'en_camino', 'entregado', 'cancelado'],
      default: 'pendiente',
    },

    // Delivery
    fechaEntrega: Date,
    tipoEntrega: {
      type: String,
      enum: ['mismo_dia', 'siguiente_dia'],
    },

    // Notas
    notas: String,
    notasAdmin: String,

    // Seguimiento
    horaCompra: {
      type: Date,
      default: Date.now,
    },
    horaConfirmacion: Date,
    horaEntrega: Date,
  },
  { timestamps: true }
);

// Generar número de pedido único
orderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.numeroPedido = `ORD-${Date.now()}-${count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
