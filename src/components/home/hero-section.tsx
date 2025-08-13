"use client";
import Image from "next/image";



const HeroSection = () => {
  return (
<section className="relative min-h-[600px] w-full">
  {/* Gradient overlay */}
  <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:bg-gradient-to-r before:from-sky-600/20 before:to-cyan-600/20 before:blur-3xl" />

  <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 py-12 md:flex-row md:items-start md:py-20">
    {/* Texto */}
    <div className="flex-1 space-y-8 text-left md:text-left">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        Parking privado en el centro de
        <span className="bg-gradient-to-r from-cyan-700 to-cyan-400 bg-clip-text text-transparent">
          {" "}Gandia
        </span>
      </h1>

      <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl font-semibold">
        Reserva parking en Gandia, asegura tu plaza de aparcamiento y deja
        de dar vueltas con el coche. El aparcamiento Esoma S.L es la mejor
        opci&oacute;n de parking en Gandia si eres residente o comerciante
        del centro hist&oacute;rico.
      </p>
    </div>

    {/* Logo */}
    <div className="flex-1 mt-10 md:mt-0 flex justify-center">
      <div className="relative rounded-2xl overflow-hidden">
        <Image
          src="/img/logoEsoma2.png"
          alt="Logo"
          width={220}
          height={220}
          className="w-auto"
        />
      </div>
    </div>
  </div>
</section>

  );
};
export default HeroSection;
