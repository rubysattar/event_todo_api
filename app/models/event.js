const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  productImage: {
    data: Buffer,
    contentType: String
  }
})

const guestSchema = new mongoose.Schema({
  guestName: {
    type: String,
    required: true
  },
  accommodations: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true,
    min: 1000000000,
    max: 9999999999
  }
})

const eventSchema = new mongoose.Schema({
  eventType: {
    type: String,
    enum: ['wedding', 'sweet 16', 'baby shower', 'birthday', 'bah mitzvah', 'quinces', 'wake'],
    default: 'wedding',
    required: true
  },
  eventGuests: [guestSchema],
  eventDate: {
    type: Date,
    min: Date.now
  },
  eventBudget: {
    type: Number,
    min: 0
  },
  eventVenue: [vendorSchema],
  eventFood: [vendorSchema],
  eventDecor: [vendorSchema],
  eventEntertainment: [vendorSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Event', eventSchema)
