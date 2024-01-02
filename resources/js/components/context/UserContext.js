import { createContext } from "react";

const UserContext = createContext({ user: null, isUserAuthorized: false });

export default UserContext;
