"use client";
import Image from "next/image";
import { BASE_URL } from "../../constants/baseUrl";
import Link from "next/link";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function Leads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    async function loadLeads() {
      try {
        const response = await fetch(`${BASE_URL}/lead`);
        const data = await response.json();
        setLeads(data);
      } catch (error) {
        alert("erro ao buscar leads:", error);
      }
    }
    loadLeads();
  }, []);

  async function handleStatusChange(leadId, newStatus) {
    try {
      await fetch(`${BASE_URL}/lead/update-status/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      alert("Erro ao atualizar status. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="h-screen bg-[#F0F4F3] text-gray-700 flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl">
        <div className="bg-white inline py-4 px-8 rounded-xl">Todos</div>
        <div>
          <input type="text" name="" id="" />
        </div>
      </div>
      <main className="bg-white w-full max-w-6xl h-3/5 rounded-md px-6 py-3">
        <table className="table w-full text-left">
          <thead className="">
            <tr className="   ">
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr className="">
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td className="pr-4">
                  <select
                    className="px-4 py-1 rounded-md outline-0 border border-gray-400"
                    name="status"
                    id="status"
                    onChange={(e) =>
                      handleStatusChange(lead.id, e.target.value)
                    }
                  >
                    <option value={lead.status}>{lead.status}</option>
                    <option value="CONVERTIDO">CONVERTIDO</option>
                    <option value="EM_CONTATO">EM_CONTATO</option>
                    <option value="NOVO">NOVO</option>
                  </select>
                </td>
                <td>
                  <Link
                    target="_blank"
                    href={`https://api.whatsapp.com/send?phone=${lead.phone}&text=Ol%C3%A1`}
                  >
                    <button className="flex items-center gap-2 bg-blue-700 px-4 py-1 rounded-sm text-white hover:bg-blue-700/70 hover:cursor-pointer transition-colors">
                      <WhatsappLogoIcon size={20} color="white" />
                      <span>Conversar</span>
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
