const graphql = require("graphql")
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLBoolean, GraphQLList, GraphQLID, GraphQLInt} = graphql
const Course = require("./../models/course")
const Professor = require("./../models/professor")



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
                return Professor.findById(parent.professorId)
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
                return Course.find({professorId: parent.id})
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
                return Course.findById(args.id)
            }
        },
        courses: {
            type: new GraphQLList(CourseType),
            args: {},
            resolve (resolve, args) {
                return Course.find()
            }
        },
        professor: {
            type: ProfessorType,
            args:{
                name: {type: GraphQLID}
            },
            resolve(resolve, args) {
                //return professor.find((x) => x.name === args.name)
                return Professor.findOne({name: args.name})
            }
        },
        professors: {
            type: new GraphQLList(ProfessorType),
            args: {},
            resolve (resolve, args) {
                return Professor.find()
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

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProfessor: {
            type: ProfessorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                active: {type: GraphQLBoolean},
                date: {type: GraphQLString}
            },
            resolve (parent, args) {
                let professor = new Professor({
                    name: args.name,
                    age: args.age,
                    active: args.active,
                    date: args.date
                })
                return professor.save()
            }
        },
        updateProfessor: {
            type: ProfessorType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                active: {type: GraphQLBoolean},
                date: {type: GraphQLString}
            },
            resolve (parent, args) {
                return Professor.findByIdAndUpdate(args.id, args, {new: true})
            }
        },
        deleteProfessor: {
            type: ProfessorType,
            args: {
                id: {type: GraphQLID},
            },
            resolve (parent, args) {
                return Professor.findByIdAndDelete(args.id)
            }
        },
        updateCourse: {
            type: CourseType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                languaje: {type: GraphQLString},
                date: {type: GraphQLString},
                professorId: {type: GraphQLID}
            },
            resolve (parent, args){
                return Course.findByIdAndUpdate(args.id, {
                    name: args.name,
                    languaje: args.languaje,
                    date: args.date,
                    professorId: args.professorId
                },
                {new: true})
            }
            
        },
        deleteCourse: {
            type: CourseType,
            args: {
                id: {type: GraphQLID}
            },
            resolve (parent, args){
                return Course.findByIdAndDelete(args.id)
            }
        },
        deleteAllCourse: {
            type: CourseType,
            resolve (parent, args){
                return Course.deleteMany({})
            }
        },
        addCourse: {
            type: CourseType,
            args: {
                name: {type: GraphQLString},
                languaje: {type: GraphQLString},
                date: {type: GraphQLString},
                professorId: {type: GraphQLID}
            },
            resolve(parent, args){
                let course = new Course({
                    name: args.name,
                    languaje: args.languaje,
                    date: args.date,
                    professorId: args.professorId
                })
                
                return course.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,   
    mutation: Mutation
})