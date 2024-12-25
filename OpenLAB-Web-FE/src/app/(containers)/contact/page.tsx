import MainLayout from "~/components/main-layout";
import ContactForm from "~/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <MainLayout>
      <div>
        <div className="mb-24 xs:mb-14">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7450.523162395312!2d105.78010094231259!3d20.982149040082394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accdab6f3ae7%3A0x60ddfd85d24b0c52!2zTeG7mSBMYW8sIEjDoCDEkMO0bmcsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1734660065520!5m2!1svi!2s"
            width="100%"
            height="350"
            style={{ borderWidth: "none" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </MainLayout>
  );
}
