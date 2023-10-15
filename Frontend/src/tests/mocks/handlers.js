import { rest } from 'msw'

// handlers is a list that contains all the mock responses
export const handlers = [

    rest.get('http://localhost:4000/api/users/select/:email', async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                name: "June",
                email: "june@email.com",
                joined: "10/10/2023"
            })
        )
    }),


    rest.post('http://localhost:4000/api/users/', async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                name: "Test User",
                email: "Test@Email.com",
                password: "TestPassword",
                joined: "01/01/2022"
            })
        )
    } ),

    // rest.get('http://localhost:4000/api/tickets/email/:email', async (req, res, ctx) => {
        
    //     return res(
    //         ctx.status(200),
    //         ctx.json({
    //             ticket_id: 1,
    //             movie: "Test Movie",
    //             author_name: "Test User",
    //             author_email: "june@email.com",
    //             ticket_quantity: 1,
    //             ticket_day: "01/01/2022",
    //             ticket_time: "12:00",
    //         },
    //         {
    //             ticket_id: 1,
    //             movie: "Test Movie",
    //             author_name: "Test User",
    //             author_email: "june@email.com",
    //             ticket_quantity: 1,
    //             ticket_day: "01/01/2022",
    //             ticket_time: "12:00",
    //         })
    //         )
    //     } ),
    


]