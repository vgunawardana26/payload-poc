import type { FieldHook } from "payload";
import type { User} from "@/payload-types"


export const protectRoles: FieldHook<{id: string} & User> = ({req, data}) => {
    const isAdmin = req.user?.roles?.includes('admin')
    console.log("Here")
    if (!isAdmin) {
        return ['user']
    }

    const userRoles = new Set(data?.roles || [])
    userRoles.add('user')
    console.log(userRoles)
    return [...userRoles.values()]
}