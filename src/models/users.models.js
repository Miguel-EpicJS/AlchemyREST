const users = [
    {
	id: 0,
	username: "Admin",
	email: "admin@admin.com",
	password: "$2b$10$dNO0XuAB8l18CLq09M0NoucKFxtDocmCawsIkmCCbmaz/mBnBtCbi", // hash bcrypt, 
	// password: "admin",
	deleted: false,
    }
];

const createUser = (props) => {
    users.push(
	{
	    id: users.length-1,
	    ...props,
	    deleted: false,
	}
    );
    return users.at(-1);
};


module.exports = { users, createUser };
