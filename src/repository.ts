import { RepositoryError } from "./interfaces/error";
import { PaginationMeta } from "./interfaces/pagination";
import { IUser } from "./interfaces/user";
import { User } from "./models";

const getUsers = async (pagination: PaginationMeta) => {
    try {
        const skipSize = (pagination.page-1)*pagination.limit
        const users = await User.find().skip(skipSize).limit(pagination.limit);
        return users
    } catch (error) {
        throw {...(error as Error)} as RepositoryError    
    }
}

const getUser = async (user: Partial<IUser>) => {
    try {
        const result = await User.findOne(user);
        return result
    } catch (error) {
        throw {...(error as Error)} as RepositoryError    
    }
}

const createUser = async (user: IUser) => {
    try {
        const u = (await User.create(user)).save()
        return (await u).toJSON()
    } catch (error) {
        throw {...(error as Error)} as RepositoryError    
    }
}

const updateUser = async (id: string, update: Partial<IUser>) => {
    try {
        const u = await User.findByIdAndUpdate(id, update)
        return u
    } catch (error) {
        throw {...(error as Error)} as RepositoryError    
    }
}

const deleteUser = async (id: string) => {
    try {
        const u = await User.findByIdAndDelete(id)
        return
    } catch (error) {
        throw {...(error as Error)} as RepositoryError    
    }
}

export default {getUsers, getUser, createUser, updateUser, deleteUser}