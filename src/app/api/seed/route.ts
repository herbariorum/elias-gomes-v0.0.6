import { PrismaClient } from "@prisma/client/extension";
import {  NextApiRequest, NextApiResponse } from "next";



const prisma = new PrismaClient();
type Data = {
    name: string;
};


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    await prisma.post.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.createMany({
        data: [{ name: 'José Elias G. de Lima', email: 'eliaspbareia@gmail.com'}]
    });

    const user = await prisma.user.findMany();
    const unoUserId = user.findUnique({
        where: {
            email: 'eliaspbareia@gmail.com',
        },
        select: {
            id: true,
        }
    });

    await prisma.profile.createMany({
        data: [
            { bio: 'Mestre em botância pela UFRPE', userId: unoUserId}
        ]
    })

    await prisma.post.createMany({
        data: [
            {
                title: 'Rudgea longiflora',
                slug: 'rudgea-longiflora',
                content: 'plantas presentes em matas ciliares',               
                main_image: 'https://i.ibb.co/4mV8JPr/frutos-rudgea-longiflora.jpg',
                images: [
                    'https://i.ibb.co/ZGRrft3/sementes-rudgea-longiflora.jpg',
                    'https://i.ibb.co/X2dKKPY/ramos-rudgea-longiflora.jpg',
                    'https://i.ibb.co/4mV8JPr/frutos-rudgea-longiflora.jpg',
                    'https://i.ibb.co/4p7Q8Xg/caule-rudgea-longiflora.jpg',
                    'https://i.ibb.co/tsp2cp4/estipulas-rudgea-longiflora.jpg'
                ],
                authorId: unoUserId,
            }
        ]
    })
}