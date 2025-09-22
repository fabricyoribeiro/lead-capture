import { z } from "zod";
import { prisma } from "../../database/prisma.js";
import { startOfDay, endOfDay } from "date-fns";

export default {
  async create(request, response) {
    try {
      const createLeadBody = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string(),
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
          error:
            "the email provided has already been registered in the last hour",
        });
      }

      const newLead = await prisma.lead.create({
        data: {
          name,
          email,
          phone,
          status: "novo",
        },
      });

      return response.status(201).json(newLead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({ error: "invalid data" });
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
};
