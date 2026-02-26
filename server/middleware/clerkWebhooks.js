const { data, type } = req.body
console.log("data is", data);
console.log("type is", type);

switch (type) {
    case 'user.created': {
        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            user_name: data.first_name + ' ' + data.last_name,
            image: data.image_url
        }
        await User.create(userData);
        break;
    }
    case 'user.updated': {
        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            user_name: data.first_name + ' ' + data.last_name,
            image: data.image_url
        }
        await User.findByIdAndUpdate(data.id, userData)
        break;
    }
    case 'user.deleted': {
        // data only has id for delete events
        await User.findByIdAndDelete(data.id)
        break;
    }
    default:
        break;
}