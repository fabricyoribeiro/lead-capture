"use client";
import Image from "next/image";
import { EnvelopeSimple, Phone, User } from "@phosphor-icons/react";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { BASE_URL } from "../constants/baseUrl.js";
import { useRouter } from "next/navigation.js";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, phone);
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      if(!response.ok){
        const {error} = await response.json()
        alert(error)
        return
      }

      router.push(
        "https://api.whatsapp.com/send?phone=5587991770638&text=Ol%C3%A1"
      );

    } catch (error) {
      console.error("Erro na requisição post", error);
      alert("Erro ao conectar com o servidor. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#F0F4F3] flex justify-center items-center">
      <main className="bg-white flex items-center w-full max-w-4xl h-3/5 rounded-md">
        <div className="w-1/2">
          <Image
            className="mx-auto"
            src="home-image.svg"
            width={400}
            height={400}
          />
        </div>

        <div className="w-1/2 flex flex-col items-center p-12">
          <h1 className="text-blue-700 text-2xl font-bold">Cadastro pessoal</h1>

          <p className="text-base text-gray-500 my-3 text-center leading-4">
            Inscreva-se e tenha acesso a benefícios exclusivos.
          </p>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-3"
          >
            <div className="bg-[#F0F4F3] flex items-center gap-2 w-full py-3 px-5 rounded-md">
              <User size={20} color="#6a7282 " weight="bold" />
              <input
                className="text-gray-500 w-full outline-0"
                type="text"
                name="name"
                id="name"
                placeholder="Nome"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="bg-[#F0F4F3] flex items-center gap-2 w-full py-3 px-5 rounded-md">
              <EnvelopeSimple size={20} color="#6a7282 " weight="bold" />
              <input
                className="text-gray-500 w-full outline-0"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="bg-[#F0F4F3] flex items-center gap-2 w-full py-3 px-5 rounded-md">
              <Phone size={20} color="#6a7282 " weight="bold" />
              <input
                className="text-gray-500 w-full outline-0"
                type="tel"
                name="phone"
                id="phone"
                placeholder="Nome"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-700 mt-2 w-3/5 py-3 rounded-4xl hover:bg-blue-700/70 hover:cursor-pointer transition-colors"
            >
              {loading ? (
                <ClipLoader size={20} color="white" />
              ) : (
                <span>Continuar</span>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
