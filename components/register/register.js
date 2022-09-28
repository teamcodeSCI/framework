const url = `https://62d3967dafb0b03fc5b45764.mockapi.io/user`
const getAllData = async() => {
    try {
        const response = await fetch(url);
        const data = await response.json()
        return data
    } catch (e) {
        return e
    }
}
const getDataByName = async(username) => {
    try {
        const data = await getAllData();
        const user = data.filter((e) => {
            return e.username === username
        })
        return user[0]
    } catch (e) {
        return e
    }
}
const createData = async(data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'

            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        })
        return response.json();
    } catch (e) {
        return e
    }
}
const register = async(req) => {
    try {
        const { username, password } = req;
        const getUser = await getDataByName(username)
        if (getUser) {
            console.log('user already exist')
            return;
        }
        const newUser = await createData({ username: username, password: password })
        console.log('user is created')
        return newUser
    } catch (e) {
        return e
    }
}