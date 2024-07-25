"use client"; 
import { useState } from "react";
import emailjs from 'emailjs-com';
import './ContactUs.css'; // Asegúrate de importar el archivo CSS

export function ContactUs() {
  const [loading, setLoading] = useState(false);

  async function sendEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    emailjs.sendForm('service_ldc71cv', 'template_a86r3rd', event.target as HTMLFormElement, 'ykw-Uvt0APWu4w7eY')
      .then((result) => {
        console.log(result.text);
        setLoading(false);
        // Reiniciar el formulario
        (event.target as HTMLFormElement).reset();
      }, (error) => {
        console.log(error.text);
        setLoading(false);
      });
  }

  return (
    <div className="contact-us-container">
      <div className="contact-us-form-container">
        <div className="w-full md:w-1/2 h-96 md:h-auto">
          <img 
            src="/assets/Concato.jpg" 
            alt="Contact us" 
            className="contact-us-image"
          />
        </div>
        <form onSubmit={sendEmail} className="contact-us-form">
          <h2>Formulario de Contacto</h2>
          <div className="w-full flex flex-col my-4">
            <label htmlFor="name">
              Nombre
            </label>
            <input
              type="text"
              minLength={3}
              maxLength={150}
              required
              autoComplete="off"
              id="name"
              name="name"
            />
          </div>
          <div className="w-full flex flex-col my-4">
            <label htmlFor="email">
              Correo electrónico
            </label>
            <input
              type="email"
              minLength={5}
              maxLength={150}
              required
              autoComplete="off"
              id="email"
              name="email"
            />
          </div>
          <div className="w-full flex flex-col my-4">
            <label htmlFor="message">
              Mensaje
            </label>
            <textarea
              rows={4}
              required
              minLength={10}
              maxLength={500}
              name="message"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </form>
      </div>
    </div>
  );
}
