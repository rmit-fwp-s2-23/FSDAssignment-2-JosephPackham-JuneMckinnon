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

    //get all sessiontimes
    rest.get('http://localhost:4000/api/sessiontimes', async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                [
                    {
                        sessiontime_id: 1,
                        sessiontime_movie: "Test Movie",
                        sessiontime_day: "01/01/2022",
                        sessiontime_time: "12:00",
                        sessiontime_available_seats: 10
                    },
                    {
                        sessiontime_id: 2,
                        sessiontime_movie: "Test Movie",
                        sessiontime_day: "01/01/2022",
                        sessiontime_time: "13:00",
                        sessiontime_available_seats: 10
                    },
                ]
            )
        )
    }),

    //get all movies
    rest.get('http://localhost:4000/api/movies', async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                [
                    {
                        movie_id: 1,
                        movie_name: "Test Movie",
                        movie_image: "Test Image"
                    },
                    {
                        movie_id: 2,
                        movie_name: "Test Movie 2",
                        movie_image: "Test Image 2"
                    },
                ]
            )
        )
    }),

    //get reviews by movie
    rest.get('http://localhost:4000/api/reviews/:movie', async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                [
                    {
                        review_id: 1,
                        movie: 'Test Movie',
                        author_name: 'Test User',
                        author_email: 'test@example.com',
                        review_rating: 4,
                        review_text: 'Test review text',
                        review_date: '2022-01-01T00:00:00.000Z',
                      },
                      {
                        review_id: 2,
                        movie: 'Test Movie',
                        author_name: 'Test User 2',
                        author_email: 'test2@example.com',
                        review_rating: 3,
                        review_text: 'Test review text 2',
                        review_date: '2022-01-02T00:00:00.000Z',
                      }
                    ]
            )
        )
    }
    ),

    



]