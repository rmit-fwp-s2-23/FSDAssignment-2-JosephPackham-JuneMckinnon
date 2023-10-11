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
    })
]