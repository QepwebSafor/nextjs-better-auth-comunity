import Link from "next/link";

export default function Footer() {
  return (
    <footer >
   
    
   <div className="  pt-8 text-center">
  <h6 className="text-sm text-muted-foreground">
              <Link href="/privacy-policy">
                Política de Privacidad  {"  "} |
              </Link>

              <Link href="/terms-of-service">
              {"  "}  Condiciones del Servicio {"  "}
              </Link>

   </h6>
     </div>
        <div className="   text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All right reserved 
          </p>
        </div>
        <div className=" text-center">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ by{"Quica Espi Puig "}
          </p>
     </div>
    </footer>
  );
}
