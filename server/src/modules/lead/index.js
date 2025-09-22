import {z} from 'zod'
import { prisma } from '../../database/prisma.js'

export default {
    async create(request, response){

        try {
            const createLeadBody = z.object({
                name: z.string().min(2),
                email: z.string().email(),
                phone: z.string(),
            })

            const { name, email, phone } = createLeadBody.parse(request.body)

            const oneHourAgo = new Date(Date.now() - 3600000)

            const leadExists = await prisma.lead.findFirst({
                where: {
                    email,
                    createdAt: {
                        gte: oneHourAgo
                    }
                }
            })

            if(leadExists){
                return response.status(409).json({error: 'the email provided has already been registered in the last hour'})
            }

            const newLead = await prisma.lead.create({
                data: {
                    name,
                    email,
                    phone,
                    status: "Novo"
                }
            })

            return response.status(201).json(newLead)

        } catch (error) {
            if(error instanceof z.ZodError){
                return response.status(400).json({error: 'invalid data'})
            }
            return response.status(500).json({ error: "internal server error" });
        }
    }
}