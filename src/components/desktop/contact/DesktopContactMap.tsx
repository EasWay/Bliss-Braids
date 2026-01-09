'use client';

export default function DesktopContactMap() {
  return (
    <section className="py-16 px-8" style={{ backgroundColor: '#020119' }}>
      <div className="max-w-6xl mx-auto">
        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127034.94411433832!2d-0.4664016027343882!3d5.7358811999999935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf0b3a06e27147%3A0x35e8ea4e80d718c7!2sPobiman%20bus%20stop!5e0!3m2!1sen!2sgh!4v1764281105612!5m2!1sen!2sgh"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bliss Braids Location - Pobiman, Accra"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
}