"use client";

import { createContactAction } from "@/actions/contact-action";
import { Euro, MapPin, Phone, Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ContactFormValues, contactFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const AddContactForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const defaultValues: Partial<ContactFormValues> = {
    postername: "",
    email: "",
    phone: "",
    message: "",
  };

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async ({
    postername,
    email,
    phone,
    message,
  }: ContactFormValues) => {
    setLoading(true);
    await createContactAction({ postername, email, phone, message });
    setLoading(false);
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto gap-6 items-stretch">
      <div className="flex-1 flex flex-col justify-center">
        <Card className="bg-cyan-950 shadow-lg rounded-lg h-full">
          <CardHeader>
            <CardTitle className="text-2xl text-cyan-400">
              Deje su mensaje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="postername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Deje su mensaje aquí"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end text-left p-2">
                  <Button
                    type="submit"
                    className="space-x-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner /> Guardando
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="flex-1 flex flex-col justify-center h-full rounded-lg shadow p-6 mb-6 md:mb-0 ">
        <h2 className="text-2xl mb-4">Info parking Esoma</h2>
        <div className="flex items-center">
          <MapPin />
          <span className="font-semibold">Accesos:</span>
        </div>
        <h2 className="mb-1">C/ Sant Francesc de Borja, 50 baix.</h2>
        <h2 className="mb-1">C/ Sant Rafael, 14.</h2>
        <h2 className="mb-4">46701 Gandia (Valencia)</h2>
        <div className="flex items-center gap-2 mb-2">
          <Phone />
          <span className="font-semibold">Móvil:</span>
          <span>690029812</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Euro />
          <span className="font-semibold">Cuota mensual:</span>
        </div>
        <div className="ml-7 mb-1">
          Sótano: <span>60&#8364; + IVA al 21%</span>
        </div>
        <div className="ml-7 mb-4">
          Superficie: <span>65&#8364; + IVA al 21%</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail />
          <span className="font-semibold">Email:</span>
          <span>parkingesoma@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default AddContactForm;
