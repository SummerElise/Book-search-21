const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

//pulled from user-controller file

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
           if (context.user) {
        const userData = await User.findOne({_id: context.user_id })
        .select('-__v -password')
        .populate('books')
     
        return userData
    }

    throw new AuthenticationError("You need to be logged in!");
}
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
       
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("No user with this email address exists!")
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError ("Password is incorrect!")
            }

            const token = signToken(user);
            return { token, user};
        },

        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookData } },
                { new: true }  
                );

                return user;
            }
            throw new AuthenticationError ("Please Log In to save your books!")
        },

        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }    
                );

                return updatedUser;
            }

            throw new AuthenticationError("Your book was not deleted! Please try again.")
        }
    },   
};

module.exports = resolvers;