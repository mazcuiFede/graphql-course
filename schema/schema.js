const graphql = require("graphql")

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql

const courses = [
    { id: '1', name: "design patterns", languaje: 'c#', date: '2022' },
    { id: '2', name: "POO", languaje: 'Java', date: '2022' },
]

const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        languaje: {type: GraphQLString},
        date: {type:GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        course: {
            type: CourseType,
            args:{
                id: {type: GraphQLString}
            },
            resolve(resolve, args) {
                return courses.find((x) => x.id === args.id)
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery
})