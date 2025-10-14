"use client";
import Image from "next/image";
import { BASE_URL } from "../../constants/baseUrl";
import Link from "next/link";
import {
  FileSearchIcon,
  MagnifyingGlass,
  MagnifyingGlassIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [numberOfLeadsByStatus, setNumberOfLeadsByStatus] = useState([]);
  const [showList, setShowList] = useState("leads");

  useEffect(() => {
    loadLeads();
    getNumberOfLeadsByStatus();
  }, []);

  async function loadLeads() {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/lead`);
      const data = await response.json();
      console.log(data)
      setLeads(data);
    } catch (error) {
      alert("erro ao buscar leads:", error);
    } finally {
      setLoading(false);
    }
  }

  async function getNumberOfLeadsByStatus() {
    try {
      const response = await fetch(`${BASE_URL}/lead/number-by-status`);
      const data = await response.json();
      setNumberOfLeadsByStatus(data);
    } catch (error) {
      alert("erro ao buscar leads:", error);
    }
  }

  async function searchByName(name) {
    try {
      if(searchName === ''){
        loadLeads()
      }
      const response = await fetch(`${BASE_URL}/lead/search-by-name/${name}`);
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      alert("erro ao buscar leads por nome:", error);
    }
  }

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
    <div className="h-screen bg-[#F0F4F3] text-gray-700 flex flex-col  items-center whitespace-nowrap">
      <div className="w-full max-w-6xl mb-4 mt-12 flex gap-4 overflow-x-scroll">
        <button
          onClick={() => {
            setShowList("leads");
          }}
          className="bg-white inline py-2 px-8 rounded-xl hover:cursor-pointer hover:bg-blue-200"
        >
          Todos
        </button>
        <button
          onClick={() => {
            setShowList("leadsByStatus");
          }}
          className="bg-white inline py-2 px-8 rounded-xl hover:cursor-pointer hover:bg-blue-200"
        >
          Número de leads por status
        </button>
        <div className="bg-white py-2 px-4 rounded-xl inline-flex items-center gap-2">
          <MagnifyingGlassIcon size={24} color="black" />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Procurar por nome"
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
            className="outline-0"
          />
        </div>
        <button
          onClick={() => {
            searchByName(searchName);
          }}
          className="bg-blue-700 inline py-1 px-6 text-white rounded-xl hover:cursor-pointer"
        >
          Procurar
        </button>
      </div>

      <main className="bg-white w-full justify-center max-w-6xl rounded-md px-6 py-3 overflow-x-scroll">
        {showList === "leads" && (
          <table className="table w-full text-left ">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            {showList === "leads" && (
              <tbody>
                {Array.isArray(leads) && leads.map((lead) => (
                  <tr key={lead.id}>
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
            )}
          </table>
        )}
        {showList === "leadsByStatus" && (
          <table className="table w-full text-left">
            <thead>
              <tr>
                <th>Status</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {numberOfLeadsByStatus.map(({ status, _count }) => (
                <tr key={status}>
                  <td>{status}</td>
                  <td>{_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {loading && <ClipLoader className="mx-auto" size={32} color="black" />}
      </main>
    </div>
  );
}
