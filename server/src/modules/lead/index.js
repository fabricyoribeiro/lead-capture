import { z } from "zod";
import { prisma } from "../../database/prisma.js";
import { startOfDay, endOfDay } from "date-fns";

export default {
  async create(request, response) {
    try {
      const createLeadBody = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(10).max(15).transform((value) => value.replace(/\D/g, ""))
      });

      const { name, email, phone } = createLeadBody.parse(request.body);

      const oneHourAgo = new Date(Date.now() - 3600000);

      const leadExists = await prisma.lead.findFirst({
        where: {
          email,
          createdAt: {
            gte: oneHourAgo,
          },
        },
      });

      if (leadExists) {
        return response.status(409).json({
          error: "O email informado já foi registrado na última hora",
        });
      }

      const newLead = await prisma.lead.create({
        data: {
          name,
          email,
          phone,
        },
      });

      return response.status(201).json(newLead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({ error: "dados inválidos" });
      }
      return response
        .status(500)
        .json({ error: `internal server error: ${error.message}` });
    }
  },

  async getAll(request, response) {
    try {
      const allLeads = await prisma.lead.findMany();
      return response.status(200).json(allLeads);
    } catch (error) {
      return response
        .status(500)
        .json({ error: `internal server error: ${error.message}` });
    }
  },

  async filterByStatus(request, response) {
    try {
      const { status } = request.params;

      const filteredLeads = await prisma.lead.findMany({
        where: {
          status,
        },
      });

      return response.status(200).json(filteredLeads);
    } catch (error) {
      return response
        .status(500)
        .json({ error: `internal server error: ${error.message}` });
    }
  },

  async findLeadByName(request, response) {
    try {
      const { name } = request.params;

      const filteredLeads = await prisma.lead.findMany({
        where: {
          name: {
            contains: name,
            mode: "insensitive"
          }
        },
      });

      return response.status(200).json(filteredLeads);
    } catch (error) {
      return response
        .status(500)
        .json({ error: `internal server error: ${error.message}` });
    }
  },

  async filterByDate(request, response) {
    try {
      const { date } = request.params;

      const dayStart = startOfDay(new Date(date));
      const dayEnd = endOfDay(new Date(date));

      const filteredLeads = await prisma.lead.findMany({
        where: {
          createdAt: {
            gte: dayStart,
            lte: dayEnd,
          },
        },
      });

      return response.status(200).json(filteredLeads);
    } catch (error) {
      return response
        .status(500)
        .json({ error: `internal server error: ${error.message}` });
    }
  },

  async getNumberOfLeadsByStatus(request, response) {
    try {
      const numberByStatus = await prisma.lead.groupBy({
        by: ["status"],
        _count: true,
      });

      return response.status(200).json(numberByStatus);
    } catch (error) {
      return response
        .status(500)
        .json({ error: `internal server error: ${error.message}` });
    }
  },

  async updateStatus(request, response) {
    try {
      const { id } = request.params;
      const { status } = request.body;

      await prisma.lead.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });
      return response.status(200).send();

    } catch (error) {
      return response
        .status(500)
        .json({ error: `internal server error: ${error.message}` });
    }
  },
};
