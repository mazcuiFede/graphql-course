const graphql = require("graphql")
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLBoolean, GraphQLList, GraphQLID, GraphQLInt} = graphql
const Course = require("./../models/course")

// const courses = [
//     { id: '1', name: "design patterns", languaje: 'c#', date: '2022', professorId: "1"},
//     { id: '2', name: "POO", languaje: 'Java', date: '2022', professorId: "2"},
//     { id: '3', name: "Clean Code", languaje: 'GO', date: '2022', professorId: "2"},
// ]

const professors = [
    { id: '1', name: "John", age: 23, active: true, date: '2022' },
    { id: '2', name: "Ray", age: 26, active: true, date: '2022' },
    { id: '3', name: "Peter", age: 21, active: true, date: '2022' },
    { id: '4', name: "Matias", age: 56 , active: true, date: '2022' },
]


const users = [
    { id: '1', email: "John@gmail.com", password: 'testeo123', age: 10, date: '2022' },
    { id: '2', email: "hola@gmail.com", password: 'testeo123', age: 10, date: '2022' },
    { id: '3', email: "matias@gmail.com", password: 'testeo123', age: 10, date: '2022' },
    { id: '4', email: "pedro@gmail.com", password: 'testeo123', age: 10, date: '2022' },
    { id: '5', email: "laura@gmail.com", password: 'testeo123', age: 10, date: '2022' },
]

const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        languaje: {type: GraphQLString},
        date: {type:GraphQLString},
        professor: {
            type: ProfessorType,
            resolve (parent, args) {
                return professors.find(x => x.id === parent.professorId)
            }
        }
    })
})

const ProfessorType = new GraphQLObjectType({
    name: 'professor',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        active: {type: GraphQLBoolean},
        date: {type: GraphQLString},
        courses: {
            type: new GraphQLList(CourseType),
            resolve (parent, args) {
                return courses.filter(x => x.professorId === parent.id)
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        age: {type: GraphQLInt},
        date: {type: GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        course: {
            type: CourseType,
            args:{
                id: {type: GraphQLID}
            },
            resolve(resolve, args) {
                return courses.find((x) => x.id === args.id)
            }
        },
        courses: {
            type: new GraphQLList(CourseType),
            args: {},
            resolve (resolve, args) {
                return courses
            }
        },
        professor: {
            type: ProfessorType,
            args:{
                name: {type: GraphQLID}
            },
            resolve(resolve, args) {
                return professors.find((x) => x.name === args.name)
            }
        },
        professors: {
            type: new GraphQLList(ProfessorType),
            args: {},
            resolve (resolve, args) {
                return professors
            }
        },
        user: {
            type: UserType,
            args:{
                id: {type: GraphQLID}
            },
            resolve(resolve, args) {
                return users.find((x) => x.id === args.id)
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery
})