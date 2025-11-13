import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = () => {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [date, setDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    // dummy submit
    alert('Booking submitted!');
  };

  return (
    <section id="booking" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif text-center mb-12 text-gray-800">Book Your Appointment</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            >
              <option value="">Select Service</option>
              <option>Bridal Makeover</option>
              <option>Hair Styling</option>
              <option>Facials & Skincare</option>
              <option>Manicure & Pedicure</option>
              <option>Hair Treatments</option>
            </select>
            <DatePicker
              selected={date}
              onChange={setDate}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <textarea
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-rose-600 text-white p-3 rounded-lg hover:bg-rose-700 transition-colors font-medium"
            >
              Submit Booking
            </button>
          </form>
          <div className="space-y-8">
            <a
              href="https://wa.me/1234567890?text=Hello, I would like to book an appointment."
              className="block bg-green-600 text-white text-center p-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Book Now on WhatsApp
            </a>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Find Us</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153168!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1a32f4e!2sMelbourne%20CBD!5e0!3m2!1sen!2sau!4v1633072800000!5m2!1sen!2sau"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;